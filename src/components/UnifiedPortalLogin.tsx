'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  username: string;
  password: string;
  role: 'student' | 'parent' | 'teacher' | 'admin';
  name: string;
  assignedClasses?: string[];
  assignedSubjects?: string[];
}

// Mock user database - in real app, this would come from API
const mockUsers: User[] = [
  {
    id: 'admin1',
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    name: 'Super Admin'
  },
  {
    id: 'teacher1',
    username: 'teacher',
    password: 'teacher123',
    role: 'teacher',
    name: 'Mr. Johnson',
    assignedClasses: ['Grade 7A', 'Grade 7B'],
    assignedSubjects: ['Mathematics']
  },
  {
    id: 'teacher2',
    username: 'johnson',
    password: 'johnson123',
    role: 'teacher',
    name: 'Mrs. Ama Mensah',
    assignedClasses: ['Grade 8A'],
    assignedSubjects: ['English']
  },
  {
    id: 'student1',
    username: 'student',
    password: 'student123',
    role: 'student',
    name: 'Kofi Asante'
  },
  {
    id: 'parent1',
    username: 'parent',
    password: 'parent123',
    role: 'parent',
    name: 'Mr. Asante'
  }
];

export default function UnifiedPortalLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const portalInfo = {
    student: {
      title: "Student Portal",
      description: "Access your assignments, grades, schedule, and more",
      icon: "🎓",
      color: "blue",
      route: "/portals/student"
    },
    parent: {
      title: "Parent Portal",
      description: "Monitor your child's progress, attendance, and communicate with teachers",
      icon: "👨‍👩‍👧‍👦",
      color: "green",
      route: "/portals/parent"
    },
    teacher: {
      title: "Teacher Portal",
      description: "Manage classes, submit grades, and communicate with students and parents",
      icon: "👨‍🏫",
      color: "purple",
      route: "/portals/staff"
    },
    admin: {
      title: "Admin Portal",
      description: "Manage school operations, students, teachers, and administrative tasks",
      icon: "⚙️",
      color: "red",
      route: "/portals/admin"
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate authentication process
    setTimeout(() => {
      // Find user in mock database
      const user = mockUsers.find(
        u => u.username === formData.username && u.password === formData.password
      );

      if (user) {
        // Store authentication in localStorage
        localStorage.setItem(`portal_auth_${user.role}`, 'true');
        localStorage.setItem(`current_user_${user.role}`, JSON.stringify({
          id: user.id,
          username: user.username,
          role: user.role,
          name: user.name,
          assignedClasses: user.assignedClasses,
          assignedSubjects: user.assignedSubjects
        }));

        // Redirect based on user role
        const portalRoute = portalInfo[user.role].route;
        router.push(portalRoute);
      } else {
        setError("Invalid username or password. Please try again.");
      }

      setIsLoading(false);
    }, 1500);
  };

  const handleDemoLogin = (role: 'admin' | 'teacher') => {
    const demoUser = mockUsers.find(u => u.role === role);
    if (demoUser) {
      setFormData({
        username: demoUser.username,
        password: demoUser.password
      });
    }
  };

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

        {/* Quick Demo Access */}
        <div className="mt-6 sm:mt-8 bg-white shadow-lg rounded-lg p-4 sm:p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Quick Demo Access</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleDemoLogin('admin')}
                className="flex flex-col items-center p-3 border-2 border-red-200 rounded-lg hover:bg-red-50 transition-colors"
              >
                <span className="text-2xl mb-1">⚙️</span>
                <span className="text-sm font-medium text-red-700">Admin Demo</span>
                <span className="text-xs text-red-600">admin / admin123</span>
              </button>
              <button
                onClick={() => handleDemoLogin('teacher')}
                className="flex flex-col items-center p-3 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition-colors"
              >
                <span className="text-2xl mb-1">👨‍🏫</span>
                <span className="text-sm font-medium text-purple-700">Teacher Demo</span>
                <span className="text-xs text-purple-600">teacher / teacher123</span>
              </button>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Sign In</h3>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username or Email
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your username"
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Portal Information */}
        <div className="mt-6 sm:mt-8">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {Object.entries(portalInfo).map(([key, portal]) => (
              <div key={key} className="bg-white shadow rounded-lg p-3 text-center">
                <div className="text-xl mb-1">{portal.icon}</div>
                <h4 className="text-sm font-medium text-gray-900">{portal.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
