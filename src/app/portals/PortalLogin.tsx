"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PortalLogin() {
  const [portalType, setPortalType] = useState<"student" | "parent" | "teacher">("student");
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // Redirect logic would go here
      alert(`Login successful for ${portalType} portal!`);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
    }
  };

  const currentPortal = portalInfo[portalType];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Image
            src="/images/logo1.jpg"
            alt="Adorable Babies & Josemaria International School"
            width={120}
            height={60}
            className="h-14 w-auto"
          />
          <h2 className="text-3xl font-bold text-gray-900">ADJIS Portal Login</h2>
          <p className="mt-2 text-sm text-gray-600">
            Adorable Babies & Josemaria International School
          </p>
        </div>

        {/* Portal Selection */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <div className="flex justify-center space-x-4 mb-6">
            {Object.entries(portalInfo).map(([key, info]) => (
              <button
                key={key}
                onClick={() => setPortalType(key as "student" | "parent" | "teacher")}
                className={`flex-1 p-4 rounded-lg border-2 text-center transition-colors ${
                  portalType === key
                    ? `border-${info.color}-500 bg-${info.color}-50`
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="text-2xl mb-2">{info.icon}</div>
                <p className="text-sm font-medium text-gray-900">{info.title}</p>
              </button>
            ))}
          </div>

          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {currentPortal.title}
            </h3>
            <p className="text-sm text-gray-600">{currentPortal.description}</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username / ID
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
                  portalType === "student" ? "Student ID" :
                  portalType === "parent" ? "Parent Email" :
                  "Teacher ID"
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
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
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
                  isLoading ? "bg-gray-400 cursor-not-allowed" : `bg-${currentPortal.color}-600 hover:bg-${currentPortal.color}-700`
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${currentPortal.color}-500`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  `Sign in to ${currentPortal.title}`
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Quick Links */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Quick Links</h4>
          <div className="space-y-3">
            <Link href="/contact" className="block text-sm text-blue-600 hover:text-blue-500">
              Contact School Administration
            </Link>
            <Link href="/about" className="block text-sm text-blue-600 hover:text-blue-500">
              About Adorable Babies & Josemaria International School
            </Link>
            <Link href="/admissions" className="block text-sm text-blue-600 hover:text-blue-500">
              Admissions Information
            </Link>
            <a href="#" className="block text-sm text-blue-600 hover:text-blue-500">
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

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Adorable Babies & Josemaria International School. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
