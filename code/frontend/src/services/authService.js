import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Send cookies with requests
});

const authService = {
    // Register new user (manager or agent)
    register: async (userData) => {
        const response = await api.post('/auth/register/', userData);
        return response.data;
    },

    // Login user (tokens are set as cookies by backend)
    login: async (credentials) => {
        const response = await api.post('/auth/login/', credentials);
        return response.data;
    },

    // Logout user (clears cookies on backend)
    logout: async () => {
        try {
            await api.post('/auth/logout/');
        } catch (error) {
            console.error('Logout error:', error);
        }
        // Force reload the page to clear any application state
        window.location.href = '/login';
    },

    // Get user profile
    getUserProfile: async () => {
        const response = await api.get('/auth/user/');
        return response.data;
    },

    // Update user profile
    updateUserProfile: async (userData) => {
        const response = await api.patch('/auth/user/', userData);
        return response.data;
    },

    // Update profile image
    updateProfileImage: async (imageFile) => {
        const formData = new FormData();
        formData.append('profile_image', imageFile);
        
        const response = await api.patch('/auth/user/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // Change password
    changePassword: async (passwordData) => {
        const response = await api.post('/auth/password-change/', passwordData);
        return response.data;
    },

    // Request password reset
    requestPasswordReset: async (email) => {
        const response = await api.post('/auth/password-reset/', { email });
        return response.data;
    },

    // Confirm password reset
    confirmPasswordReset: async (resetData) => {
        const response = await api.post('/auth/password-reset/confirm/', resetData);
        return response.data;
    },

    // Get API instance for other services to use
    getApiInstance: () => api,
};

export default authService;

