'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PortalLogin from '@/components/PortalLogin';

// Safe localStorage helper
const getLocalStorage = (key: string, defaultValue: string = '') => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key) || defaultValue;
  }
  return defaultValue;
};

const setLocalStorage = (key: string, value: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value);
  }
};

const removeLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
};

interface PortalGuardProps {
  children: React.ReactNode;
  portalType: 'student' | 'parent' | 'teacher' | 'admin';
}

export default function PortalGuard({ children, portalType }: PortalGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated for this portal type
    const authStatus = getLocalStorage(`portal_auth_${portalType}`);
    const userData = getLocalStorage(`current_user_${portalType}`);
    const isDevMode = process.env.NODE_ENV === 'development';
    
    // In development mode, auto-authenticate for testing
    if (isDevMode) {
      // Create mock user data for development
      const mockUser = {
        id: `${portalType}1`,
        username: portalType,
        role: portalType,
        name: portalType === 'admin' ? 'Super Admin' : 
              portalType === 'teacher' ? 'Mr. Johnson' : 
              portalType === 'student' ? 'Kofi Asante' : 'Mr. Asante',
        assignedClasses: portalType === 'teacher' ? ['Grade 7A', 'Grade 7B'] : [],
        assignedSubjects: portalType === 'teacher' ? ['Mathematics'] : []
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
    } else {
      // In production, check actual authentication
      if (authStatus === 'true' && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error parsing user data:', error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    }
    
    setIsLoading(false);
  }, [portalType]);

  const handleLogin = () => {
    // This will be handled by the UnifiedPortalLogin component
    // which will set the localStorage and redirect
    router.push('/portals');
  };

  const handleLogout = () => {
    // Clear authentication for all portal types
    const portalTypes = ['student', 'parent', 'teacher', 'admin'];
    portalTypes.forEach(type => {
      removeLocalStorage(`portal_auth_${type}`);
      removeLocalStorage(`current_user_${type}`);
    });
    
    setIsAuthenticated(false);
    setUser(null);
    router.push('/portals');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <PortalLogin onLogin={handleLogin} portalType={portalType} />;
  }

  return (
    <>
      {children}
      <button
        onClick={handleLogout}
        className="fixed bottom-4 right-4 z-50 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2 shadow-lg"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Logout
      </button>
    </>
  );
}
