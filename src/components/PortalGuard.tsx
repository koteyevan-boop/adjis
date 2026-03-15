'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PortalLogin from '@/components/PortalLogin';

interface PortalGuardProps {
  children: React.ReactNode;
  portalType: 'student' | 'parent' | 'teacher' | 'admin';
}

export default function PortalGuard({ children, portalType }: PortalGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const authStatus = localStorage.getItem(`portal_auth_${portalType}`);
    setIsAuthenticated(authStatus === 'true');
    setIsLoading(false);
  }, [portalType]);

  const handleLogin = () => {
    localStorage.setItem(`portal_auth_${portalType}`, 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem(`portal_auth_${portalType}`);
    setIsAuthenticated(false);
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
    return <PortalLogin key={`login-${portalType}`} onLogin={handleLogin} portalType={portalType} />;
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
