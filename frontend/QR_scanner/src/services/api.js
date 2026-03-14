import axios from 'axios';

const API_URL = import.meta.env.BACKEND_URL;

const api = axios.create({
    baseURL: API_URL || 'http://localhost:8080/api/v1',
});

// Request interceptor to add JWT conditionally
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
