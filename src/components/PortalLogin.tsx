'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface PortalLoginProps {
  onLogin?: () => void;
  portalType?: 'student' | 'parent' | 'teacher' | 'admin';
}

export default function PortalLogin({ onLogin, portalType: initialPortalType = 'student' }: PortalLoginProps) {
  // Use the prop directly instead of state to avoid issues
  const currentPortalType = initialPortalType || 'student';
  
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // Call the onLogin function if provided
      if (onLogin && typeof onLogin === 'function') {
        onLogin();
      } else {
        // Default behavior
        alert(`Login successful for ${currentPortalType} portal!`);
      }
    }, 2000);
  };

  const portalInfo = {
    student: {
      title: "Student Portal",
      description: "Access your assignments, grades, schedule, and more",
      icon: "🎓",
      color: "blue"
    },
    parent: {
      title: "Parent Portal",
      description: "Monitor your child's progress, attendance, and communicate with teachers",
      icon: "👨‍👩‍👧‍👦",
      color: "green"
    },
    teacher: {
      title: "Teacher Portal",
      description: "Manage classes, submit grades, and communicate with students and parents",
      icon: "👨‍🏫",
      color: "purple"
    },
    admin: {
      title: "Admin Portal",
      description: "Manage school operations, students, teachers, and administrative tasks",
      icon: "⚙️",
      color: "red"
    }
  };

  const currentPortal = portalInfo[currentPortalType as keyof typeof portalInfo];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <Image
            className="mx-auto h-12 w-auto sm:h-14"
            src="/images/logo1.jpg"
            alt="ADJIS Logo"
            width={120}
            height={60}
          />
          <h2 className="mt-4 sm:mt-6 text-2xl sm:text-3xl font-bold text-gray-900">ADJIS Portal Login</h2>
          <p className="mt-2 text-sm text-gray-600 px-4 sm:px-0">
            Adorable Babies & Josemaria International School
          </p>
        </div>

        {/* Portal Type Selector - Read Only */}
        <div className="mt-6 sm:mt-8 bg-white shadow-lg rounded-lg p-4 sm:p-6">
          <div className="mb-6">
            <div className="p-3 sm:p-4 rounded-lg border-2 text-center bg-gray-50 border-gray-300">
              <div className="text-2xl mb-2">{currentPortal.icon}</div>
              <h3 className="text-lg font-medium text-gray-900">{currentPortal.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{currentPortal.description}</p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder={
                  currentPortalType === "student" ? "Student ID" :
                  currentPortalType === "parent" ? "Parent Email" :
                  currentPortalType === "teacher" ? "Teacher ID" :
                  "Admin Username"
                }
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isLoading ? "bg-gray-400 cursor-not-allowed" : 
                  currentPortal.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                  currentPortal.color === 'green' ? 'bg-green-600 hover:bg-green-700' :
                  currentPortal.color === 'purple' ? 'bg-purple-600 hover:bg-purple-700' :
                  currentPortal.color === 'red' ? 'bg-red-600 hover:bg-red-700' :
                  'bg-blue-600 hover:bg-blue-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  currentPortal.color === 'blue' ? 'focus:ring-blue-500' :
                  currentPortal.color === 'green' ? 'focus:ring-green-500' :
                  currentPortal.color === 'purple' ? 'focus:ring-purple-500' :
                  currentPortal.color === 'red' ? 'focus:ring-red-500' :
                  'focus:ring-blue-500'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  `Sign in to ${currentPortal.title}`
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link href="/admissions" className="text-sm text-blue-600 hover:text-blue-500">
              Admissions Information
            </Link>
            <a href="#" className="block text-sm text-blue-600 hover:text-blue-500 mt-2">
              Portal User Guide
            </a>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Need help with your portal account?{" "}
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
              Contact IT Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
