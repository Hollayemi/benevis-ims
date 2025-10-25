// contexts/authContext.js
"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    // Get backend URL from localStorage or fallback
    const getBackendUrl = () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('backendUrl') ||
                process.env.NEXT_PUBLIC_BASE_URL ||
                'http://192.168.1.100:5000/api';
        }
        return process.env.NEXT_PUBLIC_BASE_URL || 'http://192.168.1.100:5000/api';
    };

    // Initialize auth state from localStorage
    useEffect(() => {
        const initializeAuth = () => {
            try {
                const storedUser = localStorage.getItem('user');
                const token = localStorage.getItem('accessToken');
                const expiresIn = localStorage.getItem('expiresIn');

                if (storedUser && token && expiresIn) {
                    const expiryDate = new Date(expiresIn);

                    // Check if token is expired
                    if (expiryDate > new Date()) {
                        setUser(JSON.parse(storedUser));
                        setIsAuthenticated(true);
                    } else {
                        // Token expired, clear storage
                        logout();
                    }
                }
            } catch (error) {
                console.error('Error initializing auth:', error);
                logout();
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    // Login function
    const login = async (email, password) => {
        try {
            const backendUrl = getBackendUrl();
            const endpoint = `${backendUrl}/api/superadmin/staffs/login`;

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            console.log(data)

            if (response.ok && data.email) {
                const userData = {
                    _id: data._id,
                    name: data.name || data.ownerName,
                    email: data.email,
                    permission: data.permission,
                    picture: data.picture,
                    phone: data.phone,
                    position: data.position,
                };

                // Calculate expiry (30 days from now)
                const expiryDate = new Date();
                expiryDate.setDate(expiryDate.getDate() + 30);

                // Store in localStorage
                localStorage.setItem('user', JSON.stringify(userData));
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('expiresIn', expiryDate.toISOString());

                setUser(userData);
                setIsAuthenticated(true);

                return { success: true, user: userData };
            } else {
                return {
                    success: false,
                    error: data.errors?.common?.msg || 'Login failed'
                };
            }
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                error: 'Network error. Please check your connection.'
            };
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('expiresIn');
        setUser(null);
        setIsAuthenticated(false);
        router.push('/');
    };

    // Update user profile
    const updateUser = (updatedData) => {
        const newUser = { ...user, ...updatedData };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
    };

    // Get access token
    const getAccessToken = () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('accessToken');
        }
        return null;
    };

    // Check if token is expired
    const isTokenExpired = () => {
        const expiresIn = localStorage.getItem('expiresIn');
        if (!expiresIn) return true;
        return new Date(expiresIn) <= new Date();
    };

    // Set backend URL (for network configuration)
    const setBackendUrl = (url) => {
        localStorage.setItem('backendUrl', url);
    };

    const value = {
        user: {
            ...user,
            accessToken: getAccessToken(),
        },
        loading,
        isAuthenticated,
        login,
        logout,
        updateUser,
        getAccessToken,
        isTokenExpired,
        setBackendUrl,
        getBackendUrl,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// HOC for protected routes
export const withAuth = (Component, options = {}) => {
    return function ProtectedRoute(props) {
        const { user, loading, isAuthenticated } = useAuth();
        const router = useRouter();
        const { redirectTo = '/', requiredPermission = null } = options;

        useEffect(() => {
            if (!loading) {
                if (!isAuthenticated) {
                    router.push(redirectTo);
                } else if (requiredPermission && user?.permission !== requiredPermission) {
                    router.push('/admin/dashboard');
                }
            }
        }, [loading, isAuthenticated, user, router]);

        if (loading) {
            return (
                <div className="flex h-screen items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            );
        }

        if (!isAuthenticated) {
            return null;
        }

        if (requiredPermission && user?.permission !== requiredPermission) {
            return null;
        }

        return <Component {...props} />;
    };
};