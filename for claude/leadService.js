// src/services/LeadService.js
import authService from './authService';
const api = authService.getApiInstance();

const LeadService = {  // Get leads with pagination and filters
  getLeads: async (params = {}) => {
    try {
      const response = await api.get('/leads/', { params });
      return {
        results: response.data?.results || [],
        count: parseInt(response.data?.count || 0),
        next: response.data?.next,
        previous: response.data?.previous
      };
    } catch (error) {
      console.error('Error fetching leads:', error);
      throw error;
    }
  },

  // Get a single lead by ID
  getLead: async (id) => {
    try {
      const response = await api.get(`/leads/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching lead ${id}:`, error);
      throw error;
    }
  },
  // Create a new lead
  createLead: async (leadData) => {
    try {
      // Format the data according to backend expectations
      const formattedData = {
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone,
        company: leadData.company || '',
        position: leadData.position || '',
        status: leadData.status,
        source: leadData.source,
        interest: leadData.interest || '',
        priority: leadData.priority,
        assigned_to: leadData.assignedToId,
        budget: leadData.budget || '',
        timeline: leadData.timeline || '',
        requirements: leadData.requirements || '',
        notes: leadData.notes || '',
        tags: Array.isArray(leadData.tags) ? leadData.tags : []
      };
      
      const response = await api.post('/leads/', formattedData);
      return response.data;
    } catch (error) {
      console.error('Error creating lead:', error);
      throw error;
    }
  },

  // Update an existing lead
  updateLead: async (id, leadData) => {
    try {
      const response = await api.patch(`/leads/${id}/`, leadData);
      return response.data;
    } catch (error) {
      console.error(`Error updating lead ${id}:`, error);
      throw error;
    }
  },

  // Delete a lead
  deleteLead: async (id) => {
    try {
      await api.delete(`/leads/${id}/`);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting lead ${id}:`, error);
      throw error;
    }
  },

  // Import leads from CSV/Excel
  importLeads: async (formData) => {
    try {
      // Use Django action endpoint
      const response = await api.post('/leads/import_leads/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error importing leads:', error);
      throw error;
    }
  },

  // Export leads to CSV
  exportLeads: async (filters = {}) => {
    try {
      const response = await api.get('/leads/export/', {
        params: filters,
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error('Error exporting leads:', error);
      throw error;
    }
  },

  // Update lead status
  updateLeadStatus: async (id, status) => {
    try {
      const response = await api.post(`/leads/${id}/update_status/`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error updating lead ${id} status:`, error);
      throw error;
    }
  },

  // Assign lead to user
  assignLead: async (id, userId) => {
    try {
      const response = await api.post(`/leads/${id}/assign/`, { user_id: userId });
      return response.data;
    } catch (error) {
      console.error(`Error assigning lead ${id}:`, error);
      throw error;
    }
  },

  // Get lead statistics
  getLeadStatistics: async () => {
    try {
      const response = await api.get('/leads/statistics/');
      return response.data;
    } catch (error) {
      console.error('Error fetching lead statistics:', error);
      throw error;
    }
  },
};

export default LeadService;