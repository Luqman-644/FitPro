import React, { createContext, useContext, useEffect, useState } from 'react';
import { account } from '../appwrite';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        checkUserStatus();
    }, []);

    const checkUserStatus = async () => {
        try {
            setLoading(true);
            const accountDetails = await account.get();
            setUser(accountDetails);
            setError(null);
        } catch (error) {
            // User is not logged in, which is expected
            if (error.code === 401) {
                setUser(null);
                setError(null);
            } else {
                console.error('Authentication error:', error);
                setError(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            setLoading(true);
            // Updated method name for latest Appwrite SDK
            await account.createEmailPasswordSession(email, password);
            const accountDetails = await account.get();
            setUser(accountDetails);
            setError(null);
            navigate('/');
        } catch (error) {
            console.error('Login failed', error);
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signup = async (email, password, name) => {
        try {
            setLoading(true);
            // Create the account
            await account.create(
                'unique()',
                email,
                password,
                name
            );

            // Log in the user
            await login(email, password);
        } catch (error) {
            console.error('Signup failed', error);
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            // Delete the current session
            await account.deleteSession('current');
            setUser(null);
            setError(null);
            navigate('/');
        } catch (error) {
            console.error('Logout failed', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };


    // Clear error after 5 seconds
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    return (
        <AuthContext.Provider value={{
            user,
            login,
            signup,
            logout,
            loading,
            error
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);