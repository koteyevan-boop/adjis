"use client";

import { useState } from "react";
import Image from "next/image";
import { toast, Toaster } from "sonner";
import { 
  User, 
  GraduationCap, 
  Users, 
  Shield, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  CheckCircle,
  AlertCircle,
  ArrowRight
} from "lucide-react";

// Portal types configuration
const portalTypes = [
  {
    id: 'student',
    name: 'Student Portal',
    description: 'Access your assignments, grades, schedule, and more',
    icon: GraduationCap,
    color: 'blue',
    credentials: { username: 'student', password: 'student123' }
  },
  {
    id: 'teacher',
    name: 'Teacher Portal',
    description: 'Manage classes, assignments, grades, and student progress',
    icon: Users,
    color: 'green',
    credentials: { username: 'teacher', password: 'teacher123' }
  },
  {
    id: 'parent',
    name: 'Parent Portal',
    description: 'Monitor your child\'s progress, fees, and communicate with teachers',
    icon: User,
    color: 'purple',
    credentials: { username: 'parent', password: 'parent123' }
  },
  {
    id: 'admin',
    name: 'Admin Portal',
    description: 'System administration, user management, and school operations',
    icon: Shield,
    color: 'red',
    credentials: { username: 'admin', password: 'admin123' }
  }
];

export default function HomePage() {
  const [selectedPortal, setSelectedPortal] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const currentPortal = portalTypes.find(p => p.id === selectedPortal);
  const Icon = currentPortal?.icon || GraduationCap;

  const colorClasses = {
    blue: 'border-blue-500 text-blue-600 bg-blue-50',
    green: 'border-green-500 text-green-600 bg-green-50',
    purple: 'border-purple-500 text-purple-600 bg-purple-50',
    red: 'border-red-500 text-red-600 bg-red-50'
  };

  const buttonColors = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    green: 'bg-green-600 hover:bg-green-700',
    purple: 'bg-purple-600 hover:bg-purple-700',
    red: 'bg-red-600 hover:bg-red-700'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      toast.error("Please enter both username and password");
      return;
    }

    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      const expectedCredentials = currentPortal?.credentials;
      
      if (formData.username === expectedCredentials?.username && 
          formData.password === expectedCredentials?.password) {
        // Store authentication in localStorage
        localStorage.setItem(`portal_auth_${selectedPortal}`, 'true');
        localStorage.setItem('current_user_type', selectedPortal);
        localStorage.setItem('login_timestamp', new Date().toISOString());
        
        toast.success("Login successful!", {
          description: `Welcome to ${currentPortal?.name}`,
        });
        
        // Redirect to appropriate portal
        setTimeout(() => {
          if (selectedPortal === 'admin') {
            window.location.href = '/portals/admin';
          } else if (selectedPortal === 'teacher') {
            window.location.href = '/portals/staff';
          } else if (selectedPortal === 'student') {
            window.location.href = '/portals/student';
          } else if (selectedPortal === 'parent') {
            window.location.href = '/portals/parent';
          }
        }, 1500);
      } else {
        toast.error("Invalid credentials", {
          description: "Please check your username and password",
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Toaster position="top-right" richColors />
      
      <div className="w-full max-w-6xl">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/logo1.jpg"
              alt="Adorable Babies & Josemaria International School"
              width={200}
              height={200}
              className="h-32 w-auto"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Adorable Babies & Josemaria International School
          </h1>
          <p className="text-gray-600">
            Portal Login System
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left Side - Portal Selection */}
            <div className="bg-gray-50 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Select Your Portal
              </h2>
              
              <div className="space-y-3">
                {portalTypes.map((portal) => {
                  const PortalIcon = portal.icon;
                  return (
                    <button
                      key={portal.id}
                      onClick={() => setSelectedPortal(portal.id)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        selectedPortal === portal.id
                          ? colorClasses[portal.color as keyof typeof colorClasses]
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <PortalIcon className="h-6 w-6 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {portal.name}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {portal.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Quick Demo Credentials */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">
                  Demo Credentials
                </h4>
                <div className="text-sm text-blue-800">
                  <p><strong>Student:</strong> student / student123</p>
                  <p><strong>Teacher:</strong> teacher / teacher123</p>
                  <p><strong>Parent:</strong> parent / parent123</p>
                  <p><strong>Admin:</strong> admin / admin123</p>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="p-8">
              <div className="text-center mb-6">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${colorClasses[currentPortal?.color as keyof typeof colorClasses]} mb-4`}>
                  <Icon className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {currentPortal?.name}
                </h2>
                <p className="text-gray-600 mt-2">
                  Enter your credentials to access your portal
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your username"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                    Forgot password?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex items-center justify-center px-4 py-3 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    buttonColors[currentPortal?.color as keyof typeof buttonColors]
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>Sign In</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </button>
              </form>

              {/* Help Links */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-600">
                    Need help? Contact the school administration
                  </p>
                  <div className="flex justify-center space-x-4 text-sm">
                    <a href="mailto:info@josemariaschoolgh.org" className="text-blue-600 hover:text-blue-700">
                      Email Support
                    </a>
                    <span className="text-gray-400">•</span>
                    <a href="tel:+233245894229" className="text-blue-600 hover:text-blue-700">
                      Call Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>&copy; 2024 Adorable Babies & Josemaria International School</p>
          <p className="mt-1">
            Secure Portal Login System | All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
}
