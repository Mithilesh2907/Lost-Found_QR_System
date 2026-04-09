import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const normalizeBaseUrl = (value) => {
    const base = (value || 'http://localhost:8080').replace(/\/+$/, '');
    return base.endsWith('/api/v1') ? base : `${base}/api/v1`;
};

const api = axios.create({
    baseURL: normalizeBaseUrl(BACKEND_URL),
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
