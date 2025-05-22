from rest_framework import permissions

class IsOwnerOrAssignedOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        user = request.user
        
        # Admins can do anything
        if user.is_superuser or user.role == 'admin':
            return True
            
        # Managers can edit leads they created or are assigned to
        if user.role == 'manager':
            return obj.created_by == user or obj.assigned_to == user
            
        # Regular users can only edit leads assigned to them
        return obj.assigned_to == user

    def has_permission(self, request, view):
        # Allow users to list and create leads
        return request.user and request.user.is_authenticated
