'use client';

import { useState } from 'react';
import { BarChart3, Users, DollarSign, Settings, Award, FileText, BookOpen, Calendar, Building, Shield, Crown, AlertCircle, TrendingUp } from 'lucide-react';

interface RoleBasedPortalProps {
  userRole: string;
  userName: string;
}

export default function RoleBasedPortal({ userRole, userName }: RoleBasedPortalProps) {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Define role-based configurations
  const roleConfigs = {
    "Super Admin": {
      icon: Crown,
      color: "purple",
      permissions: ["all"],
      tabs: [
        { id: "dashboard", label: "Dashboard", icon: BarChart3 },
        { id: "students", label: "Students", icon: Users },
        { id: "teachers", label: "Teachers", icon: BookOpen },
        { id: "parents", label: "Parents", icon: Users },
        { id: "fees", label: "Fees", icon: DollarSign },
        { id: "fee-management", label: "Fee Management", icon: DollarSign },
        { id: "user-management", label: "User Management", icon: Users },
        { id: "roles", label: "Role Management", icon: Shield },
        { id: "settings", label: "Settings", icon: Settings },
        { id: "reports", label: "Reports", icon: FileText },
      ],
      stats: {
        totalStudents: 1245,
        totalTeachers: 87,
        totalParents: 2340,
        totalClasses: 28,
        pendingFees: 45678,
        collectedFees: 234567,
        attendanceRate: 94.2,
        activeUsers: 15,
      }
    },
    "Administrator": {
      icon: Award,
      color: "blue",
      permissions: ["students", "teachers", "fees", "reports"],
      tabs: [
        { id: "dashboard", label: "Dashboard", icon: BarChart3 },
        { id: "students", label: "Students", icon: Users },
        { id: "teachers", label: "Teachers", icon: BookOpen },
        { id: "fees", label: "Fees", icon: DollarSign },
        { id: "reports", label: "Reports", icon: FileText },
        { id: "attendance", label: "Attendance", icon: Calendar },
      ],
      stats: {
        totalStudents: 1245,
        totalTeachers: 87,
        totalClasses: 28,
        pendingFees: 45678,
        collectedFees: 234567,
        attendanceRate: 94.2,
        todayAttendance: 1175,
      }
    },
    "IT Admin": {
      icon: Settings,
      color: "green",
      permissions: ["system", "users", "settings"],
      tabs: [
        { id: "dashboard", label: "Dashboard", icon: BarChart3 },
        { id: "users", label: "User Management", icon: Users },
        { id: "roles", label: "Role Management", icon: Shield },
        { id: "settings", label: "System Settings", icon: Settings },
        { id: "logs", label: "System Logs", icon: FileText },
        { id: "backup", label: "Backup", icon: FileText },
      ],
      stats: {
        totalUsers: 15,
        activeUsers: 12,
        systemHealth: 98,
        lastBackup: "2 hours ago",
        storageUsed: "67%",
        apiCalls: 15420,
      }
    },
    "Academic Admin": {
      icon: BookOpen,
      color: "orange",
      permissions: ["students", "teachers", "academics"],
      tabs: [
        { id: "dashboard", label: "Dashboard", icon: BarChart3 },
        { id: "students", label: "Students", icon: Users },
        { id: "teachers", label: "Teachers", icon: BookOpen },
        { id: "academics", label: "Academics", icon: Award },
        { id: "attendance", label: "Attendance", icon: Calendar },
        { id: "exams", label: "Examinations", icon: FileText },
        { id: "reports", label: "Reports", icon: FileText },
      ],
      stats: {
        totalStudents: 1245,
        totalTeachers: 87,
        totalClasses: 28,
        attendanceRate: 94.2,
        averageGrades: 78.5,
        upcomingExams: 5,
      }
    },
    "Finance Admin": {
      icon: DollarSign,
      color: "yellow",
      permissions: ["fees", "accounting", "reports"],
      tabs: [
        { id: "dashboard", label: "Dashboard", icon: BarChart3 },
        { id: "fees", label: "Fees", icon: DollarSign },
        { id: "fee-management", label: "Fee Management", icon: DollarSign },
        { id: "accounting", label: "Accounting", icon: TrendingUp },
        { id: "vouchers", label: "Payment Vouchers", icon: FileText },
        { id: "reports", label: "Financial Reports", icon: FileText },
      ],
      stats: {
        totalRevenue: 234567,
        pendingFees: 45678,
        expenses: 89000,
        profit: 145567,
        arrears: 12345,
        dailyIncome: 4500,
      }
    }
  };

  const currentRole = roleConfigs[userRole as keyof typeof roleConfigs];
  
  if (!currentRole) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <h3 className="text-lg font-medium text-red-800">Role Not Found</h3>
          </div>
          <p className="text-red-600 mt-2">The role "{userRole}" is not configured in the system.</p>
        </div>
      </div>
    );
  }

  const RoleIcon = currentRole.icon;

  const renderDashboard = () => {
    const stats = currentRole.stats;
    
    return (
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className={`bg-gradient-to-r from-${currentRole.color}-500 to-${currentRole.color}-600 rounded-lg p-6 text-white`}>
          <div className="flex items-center gap-3">
            <RoleIcon className="h-8 w-8" />
            <div>
              <h2 className="text-2xl font-bold">Welcome back, {userName}!</h2>
              <p className={`${currentRole.color}-100`}>
                You have {userRole} privileges with access to {currentRole.permissions.length} main modules.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(stats).map(([key, value]) => (
            <div key={key} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {typeof value === 'number' ? value.toLocaleString() : value}
                  </p>
                </div>
                <div className={`flex-shrink-0 bg-${currentRole.color}-100 rounded-lg p-3`}>
                  <BarChart3 className={`h-6 w-6 text-${currentRole.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentRole.tabs.slice(1, 4).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <tab.icon className={`h-6 w-6 text-${currentRole.color}-600`} />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">{tab.label}</p>
                    <p className="text-sm text-gray-500">Manage {tab.label.toLowerCase()}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard();
      
      case "students":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Student Management</h3>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600">Student management features for {userRole} role.</p>
            </div>
          </div>
        );
      
      case "teachers":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Teacher Management</h3>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600">Teacher management features for {userRole} role.</p>
            </div>
          </div>
        );
      
      case "fees":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Fee Management</h3>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600">Fee management features for {userRole} role.</p>
            </div>
          </div>
        );
      
      case "settings":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">System Settings</h3>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600">System settings for {userRole} role.</p>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">{activeTab}</h3>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600">{activeTab} features for {userRole} role.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="p-6">
      {/* Role Header */}
      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`bg-${currentRole.color}-100 rounded-lg p-3`}>
              <RoleIcon className={`h-6 w-6 text-${currentRole.color}-600`} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{userRole} Portal</h2>
              <p className="text-sm text-gray-600">{userName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 bg-${currentRole.color}-100 text-${currentRole.color}-800 rounded-full text-sm font-medium`}>
              {currentRole.permissions.length} Permissions
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px overflow-x-auto">
            {currentRole.tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? `border-${currentRole.color}-500 text-${currentRole.color}-600`
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
