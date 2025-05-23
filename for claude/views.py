from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Lead
from .serializers import LeadSerializer
from .permissions import IsOwnerOrAssignedOrAdmin
from rest_framework.parsers import MultiPartParser
import pandas as pd
from io import StringIO
from django.http import HttpResponse
from rest_framework import status


class LeadViewSet(viewsets.ModelViewSet):
    serializer_class = LeadSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAssignedOrAdmin]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'source', 'priority', 'assigned_to']
    search_fields = ['name', 'email', 'phone', 'company']
    ordering_fields = ['created_at', 'updated_at', 'name']
    ordering = ['-created_at']

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser or getattr(user, 'role', None) == 'admin':
            return Lead.objects.all()
        elif getattr(user, 'role', None) == 'manager':
            return Lead.objects.filter(assigned_to=user) | Lead.objects.filter(created_by=user)
        else:
            return Lead.objects.filter(assigned_to=user)

    @action(detail=False, methods=['post'], parser_classes=[MultiPartParser])
    def import_leads(self, request):
        if 'file' not in request.FILES:
            return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            file = request.FILES['file']
            import pandas as pd
            # Read the file based on its type
            if file.name.endswith('.csv'):
                df = pd.read_csv(file)
            elif file.name.endswith(('.xlsx', '.xls')):
                df = pd.read_excel(file)
            else:
                return Response(
                    {'error': 'Unsupported file format'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Process the DataFrame and create leads
            created_count = 0
            for _, row in df.iterrows():
                lead_data = {
                    'name': row.get('name', ''),
                    'email': row.get('email', ''),
                    'phone': row.get('phone', ''),
                    'status': row.get('status', 'New'),
                    'source': row.get('source', 'Website'),
                    'interest': row.get('interest', ''),
                    'priority': row.get('priority', 'Medium'),
                    'company': row.get('company', ''),
                    'position': row.get('position', ''),
                    'budget': row.get('budget', ''),
                    'timeline': row.get('timeline', ''),
                    'requirements': row.get('requirements', ''),
                    'notes': row.get('notes', ''),
                    'tags': row.get('tags', '').split(',') if row.get('tags') else [],
                }
                
                # Assign to current user by default
                lead_data['assigned_to'] = request.user.pk
                serializer = LeadSerializer(data=lead_data)
                if serializer.is_valid():
                    serializer.save(created_by=request.user)
                    created_count += 1
                    
            return Response(
                {'message': f'{created_count} leads imported successfully'},
                status=status.HTTP_201_CREATED
            )
            
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    @action(detail=False, methods=['get'])
    def export(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        
        # Create a DataFrame from the queryset
        data = []
        for lead in queryset:
            data.append({
                'name': lead.name,
                'email': lead.email,
                'phone': lead.phone,
                'status': lead.status,
                'source': lead.source,
                'priority': lead.priority,
                'company': lead.company,
                'position': lead.position,
                'interest': lead.interest,
                'budget': lead.budget,
                'timeline': lead.timeline,
                'requirements': lead.requirements,
                'notes': lead.notes,
                'tags': ','.join(lead.tags),
                'assigned_to': lead.assigned_to.get_full_name() if lead.assigned_to else '',
                'created_at': lead.created_at.strftime('%Y-%m-%d %H:%M:%S'),
                'last_updated': lead.updated_at.strftime('%Y-%m-%d %H:%M:%S'),
            })
        
        df = pd.DataFrame(data)
        
        # Create CSV response
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="leads_export.csv"'
        
        df.to_csv(response, index=False)
        return response

