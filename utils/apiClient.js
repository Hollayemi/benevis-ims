// utils/apiClient.js
"use client";

class APIClient {
  constructor() {
    this.baseURL = this.getBaseURL();
    this.requestQueue = [];
    this.isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;

    if (typeof window !== 'undefined') {
      // Listen for online/offline events
      window.addEventListener('online', this.handleOnline.bind(this));
      window.addEventListener('offline', this.handleOffline.bind(this));
    }
  }

  getBaseURL() {
    if (typeof window !== 'undefined') {
      // Check localStorage first
      const storedUrl = localStorage.getItem('backendUrl');
      if (storedUrl) return storedUrl;
    }
    return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000/api';
  }

  setBaseURL(url) {
    this.baseURL = url;
    if (typeof window !== 'undefined') {
      localStorage.setItem('backendUrl', url);
    }
  }

  getAccessToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessToken');
    }
    return null;
  }

  handleOnline() {
    console.log('Network is back online');
    this.isOnline = true;
    this.processQueue();
  }

  handleOffline() {
    console.log('Network is offline');
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

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getAccessToken();

    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    // If offline, queue the request
    if (!this.isOnline && options.method !== 'GET') {
      return new Promise((resolve, reject) => {
        this.requestQueue.push({
          request: () => fetch(url, config),
          resolve,
          reject,
        });
      });
    }

    try {
      const response = await fetch(url, config);

      // Handle 401 Unauthorized
      if (response.status === 401) {
        // Token expired, redirect to login
        if (typeof window !== 'undefined') {
          localStorage.removeItem('user');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('expiresIn');
          window.location.href = '/';
        }
        throw new Error('Session expired. Please login again.');
      }

      // Try to parse JSON, but handle non-JSON responses
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.errors?.common?.msg || 'Request failed');
        }

        return data;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error) {
      console.error('API request failed:', error);

      // If it's a network error and the request is not GET, queue it
      if (error.message.includes('Failed to fetch') && options.method !== 'GET') {
        return new Promise((resolve, reject) => {
          this.requestQueue.push({
            request: () => fetch(url, config),
            resolve,
            reject,
          });
        });
      }

      throw error;
    }
  }

  // HTTP Methods
  async get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  async post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async patch(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

// Create singleton instance
const apiClient = new APIClient();

export default apiClient;

// Helper hook for React components
export const useAPI = () => {
  return apiClient;
};