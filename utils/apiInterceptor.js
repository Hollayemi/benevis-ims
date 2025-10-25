// utils/apiInterceptor.js
"use client";

class APIInterceptor {
    constructor() {
        this.requestQueue = [];
        this.isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;

        if (typeof window !== 'undefined') {
            window.addEventListener('online', this.handleOnline.bind(this));
            window.addEventListener('offline', this.handleOffline.bind(this));
        }
    }

    getBackendUrl() {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('backendUrl') + "/api" ||
                process.env.NEXT_PUBLIC_BASE_URL ||
                'http://192.168.1.100:5000/api';
        }
        return process.env.NEXT_PUBLIC_BASE_URL || 'http://192.168.1.100:5000/api';
    }

    getAccessToken() {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('accessToken');
        }
        return null;
    }

    handleOnline() {
        this.isOnline = true;
        this.processQueue();
    }

    handleOffline() {
        this.isOnline = false;
    }

    async processQueue() {
        while (this.requestQueue.length > 0 && this.isOnline) {
            const { request, resolve, reject } = this.requestQueue.shift();
            try {
                const response = await request();
                resolve(response);
            } catch (error) {
                reject(error);
            }
        }
    }

    async fetch(url, options = {}) {
        console.log({ url, options })
        const token = this.getAccessToken();
        const backendUrl = this.getBackendUrl();

        // Construct full URL
        let fullUrl = url;
        if (!url.startsWith('http')) {
            fullUrl = `${backendUrl}/api${url.startsWith('/') ? url : `${url}`}`;
        }

        // Add authorization header if token exists
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const config = {
            ...options,
            headers,
        };

        // If offline and not a GET request, queue it
        if (!this.isOnline && options.method !== 'GET') {
            return new Promise((resolve, reject) => {
                this.requestQueue.push({
                    request: () => fetch(fullUrl, config),
                    resolve,
                    reject,
                });
            });
        }

        try {
            const response = await fetch(fullUrl, config);

            // Handle 401 Unauthorized (token expired)
            if (response.status === 401) {
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('user');
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('expiresIn');
                    window.location.href = '/';
                }
                throw new Error('Session expired. Please login again.');
            }

            // Parse JSON response
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.errors?.common?.msg || `HTTP error! status: ${response.status}`);
                }

                return data;
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return response;
        } catch (error) {
            console.error('API request failed:', error);

            // Queue non-GET requests that fail due to network issues
            if (error.message.includes('Failed to fetch') && options.method !== 'GET') {
                return new Promise((resolve, reject) => {
                    this.requestQueue.push({
                        request: () => fetch(fullUrl, config),
                        resolve,
                        reject,
                    });
                });
            }

            throw error;
        }
    }

    // HTTP Methods
    async get(url, options = {}) {
        return this.fetch(url, { ...options, method: 'GET' });
    }

    async post(url, data, options = {}) {
        return this.fetch(url, {
            ...options,
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async put(url, data, options = {}) {
        return this.fetch(url, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async patch(url, data, options = {}) {
        return this.fetch(url, {
            ...options,
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }

    async delete(url, options = {}) {
        return this.fetch(url, { ...options, method: 'DELETE' });
    }
}

// Create singleton instance
const apiInterceptor = new APIInterceptor();

export default apiInterceptor;

// For compatibility with existing code
// export const Fetch = (url, options) => apiInterceptor.fetch(url, options);

export const Fetch = async (url, options = {}) => {
    try {


        console.log("herwwwww")
        const token = getAccessToken();
        const backendUrl = getBackendUrl();

        console.log({ backendUrl })

        // Construct full URL
        let fullUrl = url;
        if (!url.startsWith('http')) {
            fullUrl = `${backendUrl}/api${url.startsWith('/') ? url : `${url}`}`;
        }

        console.log({ fullUrl })

        return fetch(fullUrl, {
            ...options,
            headers: {
                ...options?.headers,
                ...(token && {
                    Authorization: `Bearer ${token}`,
                }),
            },
        })
    } catch (error) {
        console.error(error)
    }
};