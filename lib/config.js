// lib/config.js

const getBackendUrl = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('backendUrl') + "/api" ||
            'http://192.168.1.100:5000/api';
    }
    return  'http://192.168.1.100:5000/api';
};

export const API_BASE_URL = process.env.NEXT_APP_TYPE !== "exe" ? "https://business-ims-server.onrender.com/api" : getBackendUrl();
