// lib/config.js

const getBackendUrl = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('backendUrl') + "/api" ||
            process.env.NEXT_PUBLIC_BASE_URL ||
            'http://192.168.1.100:5000/api';
    }
    return process.env.NEXT_PUBLIC_BASE_URL || 'http://192.168.1.100:5000/api';
};

export const API_BASE_URL = getBackendUrl();

// For production, you might want:
// export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://your-backend.com/api';