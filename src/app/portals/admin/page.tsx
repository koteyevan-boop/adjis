'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PortalHeader from '@/components/PortalHeader';
import { ArrowLeft, Users, UserPlus, Calendar, FileText, CreditCard, Settings, LogOut, Home, BookOpen, Award, Bell, Shield, Crown } from 'lucide-react';
import PortalGuard from '@/components/PortalGuard';

export default function AdminPortalPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [notifications, setNotifications] = useState(5);

  const adminStats = {
    totalStudents: 1200,
    totalTeachers: 85,
    totalParents: 2400,
    pendingFees: 45000,
    todayAttendance: 1150,
    upcomingEvents: 3,
  };

  const recentActivities = [
    { id: 1, action: 'New student registered', user: 'John Doe', time: '2 hours ago', type: 'student' },
    { id: 2, action: 'Fee payment recorded', user: 'Jane Smith', time: '3 hours ago', type: 'payment' },
    { id: 3, action: 'Teacher added', user: 'Admin', time: '5 hours ago', type: 'staff' },
    { id: 4, action: 'Exam scheduled', user: 'Admin', time: '1 day ago', type: 'exam' },
    { id: 5, action: 'Report card generated', user: 'System', time: '1 day ago', type: 'report' },
  ];

  return (
    <PortalGuard portalType="admin">
      <div className="min-h-screen bg-gray-50">
        <PortalHeader
          portalType="admin"
          userName="Super Admin"
          userRole="Administrator"
          notifications={notifications}
          onNotificationClick={() => console.log('Admin notifications clicked')}
          onSettingsClick={() => console.log('Admin settings clicked')}
        />

        {/* Navigation Tabs */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex space-x-8 overflow-x-auto">
              {[
                { id: "dashboard", label: "Dashboard", icon: Home },
                { id: "students", label: "Students", icon: Users },
                { id: "teachers", label: "Teachers", icon: BookOpen },
                { id: "parents", label: "Parents", icon: Users },
                { id: "fees", label: "Fees", icon: CreditCard },
                { id: "timetable", label: "Timetable", icon: Calendar },
                { id: "events", label: "Events", icon: Calendar },
                { id: "reports", label: "Reports", icon: FileText },
                { id: "settings", label: "Settings", icon: Settings },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-purple-500 text-purple-600"
                      : "border-transparent text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Welcome Card */}
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Welcome to Admin Dashboard</h2>
                <p className="text-purple-100">Manage school operations, students, teachers, and administrative tasks</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Students</p>
                      <p className="text-2xl font-bold text-gray-800">{adminStats.totalStudents}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Teachers</p>
                      <p className="text-2xl font-bold text-gray-800">{adminStats.totalTeachers}</p>
                    </div>
                    <BookOpen className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Parents</p>
                      <p className="text-2xl font-bold text-gray-800">{adminStats.totalParents}</p>
                    </div>
                    <Users className="w-8 h-8 text-purple-500" />
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Pending Fees</p>
                      <p className="text-2xl font-bold text-gray-800">${adminStats.pendingFees.toLocaleString()}</p>
                    </div>
                    <CreditCard className="w-8 h-8 text-yellow-500" />
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Today's Attendance</p>
                      <p className="text-2xl font-bold text-gray-800">{adminStats.todayAttendance}</p>
                    </div>
                    <Calendar className="w-8 h-8 text-indigo-500" />
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Upcoming Events</p>
                      <p className="text-2xl font-bold text-gray-800">{adminStats.upcomingEvents}</p>
                    </div>
                    <Calendar className="w-8 h-8 text-red-500" />
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link 
                      href="/portals/admin/students?action=add"
                      className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <UserPlus className="w-8 h-8 text-blue-500" />
                      <div>
                        <p className="font-medium text-gray-900">Add Student</p>
                        <p className="text-sm text-gray-600">Register new student</p>
                      </div>
                    </Link>
                    
                    <Link 
                      href="/portals/admin/teachers?action=add"
                      className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <UserPlus className="w-8 h-8 text-green-500" />
                      <div>
                        <p className="font-medium text-gray-900">Add Teacher</p>
                        <p className="text-sm text-gray-600">Hire new teacher</p>
                      </div>
                    </Link>
                    
                    <Link 
                      href="/portals/admin/fees?action=record"
                      className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <CreditCard className="w-8 h-8 text-yellow-500" />
                      <div>
                        <p className="font-medium text-gray-900">Record Payment</p>
                        <p className="text-sm text-gray-600">Issue fee receipt</p>
                      </div>
                    </Link>
                    
                    <Link 
                      href="/portals/admin/timetable?action=create"
                      className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Calendar className="w-8 h-8 text-purple-500" />
                      <div>
                        <p className="font-medium text-gray-900">Create Timetable</p>
                        <p className="text-sm text-gray-600">Schedule classes</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-4 p-3 border rounded-lg">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'student' ? 'bg-blue-500' :
                          activity.type === 'payment' ? 'bg-green-500' :
                          activity.type === 'staff' ? 'bg-purple-500' :
                          activity.type === 'exam' ? 'bg-red-500' :
                          'bg-gray-500'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                          <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Students Tab */}
          {activeTab === "students" && (
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Student Management</h3>
                <Link 
                  href="/portals/admin/students" 
                  className="text-purple-600 hover:text-purple-800 font-medium text-sm"
                >
                  Manage Students →
                </Link>
              </div>
              <div className="p-6">
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Student Management</h4>
                  <p className="text-gray-600 mb-4">Add, edit, and manage student records</p>
                  <Link 
                    href="/portals/admin/students" 
                    className="inline-flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    Go to Student Management
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Teachers Tab */}
          {activeTab === "teachers" && (
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Teacher Management</h3>
                <Link 
                  href="/portals/admin/teachers" 
                  className="text-purple-600 hover:text-purple-800 font-medium text-sm"
                >
                  Manage Teachers →
                </Link>
              </div>
              <div className="p-6">
                <div className="text-center py-8">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Teacher Management</h4>
                  <p className="text-gray-600 mb-4">Add, edit, and manage teacher records</p>
                  <Link 
                    href="/portals/admin/teachers" 
                    className="inline-flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    Go to Teacher Management
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Parents Tab */}
          {activeTab === "parents" && (
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Parent Management</h3>
                <Link 
                  href="/portals/admin/parents" 
                  className="text-purple-600 hover:text-purple-800 font-medium text-sm"
                >
                  Manage Parents →
                </Link>
              </div>
              <div className="p-6">
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Parent Management</h4>
                  <p className="text-gray-600 mb-4">Add, edit, and manage parent records</p>
                  <Link 
                    href="/portals/admin/parents" 
                    className="inline-flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    Go to Parent Management
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Fees Tab */}
          {activeTab === "fees" && (
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Fee Management</h3>
                <Link 
                  href="/portals/admin/fees" 
                  className="text-purple-600 hover:text-purple-800 font-medium text-sm"
                >
                  Manage Fees →
                </Link>
              </div>
              <div className="p-6">
                <div className="text-center py-8">
                  <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Fee Management</h4>
                  <p className="text-gray-600 mb-4">Manage fee structures, payments, and receipts</p>
                  <Link 
                    href="/portals/admin/fees" 
                    className="inline-flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    Go to Fee Management
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Timetable Tab */}
          {activeTab === "timetable" && (
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Timetable Management</h3>
                <Link 
                  href="/portals/admin/timetable" 
                  className="text-purple-600 hover:text-purple-800 font-medium text-sm"
                >
                  Manage Timetable →
                </Link>
              </div>
              <div className="p-6">
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Timetable Management</h4>
                  <p className="text-gray-600 mb-4">Create and manage class schedules</p>
                  <Link 
                    href="/portals/admin/timetable" 
                    className="inline-flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    Go to Timetable Management
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === "events" && (
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Event Management</h3>
                <Link 
                  href="/portals/admin/events" 
                  className="text-purple-600 hover:text-purple-800 font-medium text-sm"
                >
                  Manage Events →
                </Link>
              </div>
              <div className="p-6">
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Event Management</h4>
                  <p className="text-gray-600 mb-4">Create and manage school events and calendar</p>
                  <Link 
                    href="/portals/admin/events" 
                    className="inline-flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    Go to Event Management
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === "reports" && (
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Reports & Analytics</h3>
                <Link 
                  href="/portals/admin/reports" 
                  className="text-purple-600 hover:text-purple-800 font-medium text-sm"
                >
                  View Reports →
                </Link>
              </div>
              <div className="p-6">
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Reports & Analytics</h4>
                  <p className="text-gray-600 mb-4">View comprehensive reports and analytics</p>
                  <Link 
                    href="/portals/admin/reports" 
                    className="inline-flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    Go to Reports
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-800">System Settings</h3>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">User Roles</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Super Admin</span>
                        <span className="text-sm text-purple-600 font-medium">Full Access</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Admin</span>
                        <span className="text-sm text-blue-600 font-medium">Limited Access</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">System Configuration</h4>
                    <div className="space-y-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Backup Database</button>
                      <button className="text-blue-600 hover:text-blue-800 text-sm block">Export Reports</button>
                      <button className="text-blue-600 hover:text-blue-800 text-sm block">System Logs</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PortalGuard>
  );
}
