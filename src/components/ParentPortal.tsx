'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PortalHeader from '@/components/PortalHeader';

interface Child {
  id: string;
  name: string;
  grade: string;
  class: string;
  attendance: number;
  averageGrade: string;
}

interface Payment {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
}

interface TeacherMessage {
  id: string;
  teacherName: string;
  subject: string;
  message: string;
  date: string;
  childName: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "meeting" | "event" | "exam" | "holiday";
  description: string;
}

export default function ParentPortal() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedChild, setSelectedChild] = useState<string>("1");
  const [notifications, setNotifications] = useState(2);

  const children: Child[] = [
    {
      id: "1",
      name: "Alex Johnson",
      grade: "Grade 10",
      class: "Class A",
      attendance: 92,
      averageGrade: "85%"
    },
    {
      id: "2",
      name: "Sarah Johnson",
      grade: "Grade 8",
      class: "Class B",
      attendance: 95,
      averageGrade: "88%"
    }
  ];

  const payments: Payment[] = [
    {
      id: "1",
      description: "Term 3 Tuition Fee",
      amount: 2500,
      dueDate: "2024-03-15",
      status: "paid"
    },
    {
      id: "2",
      description: "School Supplies",
      amount: 150,
      dueDate: "2024-03-20",
      status: "pending"
    },
    {
      id: "3",
      description: "Extracurricular Activities",
      amount: 100,
      dueDate: "2024-03-25",
      status: "pending"
    }
  ];

  const messages: TeacherMessage[] = [
    {
      id: "1",
      teacherName: "Ms. Smith",
      subject: "English",
      message: "Alex has shown great improvement in creative writing this term.",
      date: "2024-03-10",
      childName: "Alex Johnson"
    },
    {
      id: "2",
      teacherName: "Mr. Johnson",
      subject: "Mathematics",
      message: "Sarah is excelling in algebra. Keep up the good work!",
      date: "2024-03-08",
      childName: "Sarah Johnson"
    },
    {
      id: "3",
      teacherName: "Dr. Brown",
      subject: "Science",
      message: "Parent-teacher meeting scheduled for next week to discuss science fair project.",
      date: "2024-03-05",
      childName: "Alex Johnson"
    }
  ];

  const events: Event[] = [
    {
      id: "1",
      title: "Parent-Teacher Meeting",
      date: "2024-03-22",
      time: "2:00 PM",
      type: "meeting",
      description: "Discuss student progress and upcoming term plans"
    },
    {
      id: "2",
      title: "School Sports Day",
      date: "2024-03-25",
      time: "9:00 AM",
      type: "event",
      description: "Annual sports competition - all students participate"
    },
    {
      id: "3",
      title: "Term End Exams",
      date: "2024-04-10",
      time: "8:00 AM",
      type: "exam",
      description: "Final examinations for Term 3"
    }
  ];

  const currentChild = children.find(child => child.id === selectedChild);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "meeting": return "bg-blue-100 text-blue-800";
      case "event": return "bg-purple-100 text-purple-800";
      case "exam": return "bg-orange-100 text-orange-800";
      case "holiday": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PortalHeader
        portalType="parent"
        userName="Mr. Johnson"
        userRole="Parent"
        notifications={notifications}
        onNotificationClick={() => console.log('Parent notifications clicked')}
        onSettingsClick={() => console.log('Parent settings clicked')}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Child Selector */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Child</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {children.map((child) => (
                <button
                  key={child.id}
                  onClick={() => setSelectedChild(child.id)}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    selectedChild === child.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {child.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">{child.name}</p>
                      <p className="text-sm text-gray-500">{child.grade} • {child.class}</p>
                      <p className="text-xs text-gray-400">Attendance: {child.attendance}%</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 border-b">
            {[
              { id: "dashboard", label: "Dashboard", icon: "🏠" },
              { id: "academic", label: "Academic", icon: "📚" },
              { id: "attendance", label: "Attendance", icon: "📅" },
              { id: "payments", label: "Payments", icon: "💳" },
              { id: "messages", label: "Messages", icon: "💬" },
              { id: "events", label: "Events", icon: "📅" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Enhanced Parent Welcome */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold">MJ</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">Welcome back, Mr. Johnson!</h2>
                  <p className="text-green-100">Parent Dashboard • 2 Children Enrolled</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">All Fees Paid</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Good Standing</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">2 New Messages</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Attendance</p>
                    <p className="text-2xl font-bold text-gray-900">{currentChild?.attendance}%</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Average Grade</p>
                    <p className="text-2xl font-bold text-gray-900">{currentChild?.averageGrade}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Pending Fees</p>
                    <p className="text-2xl font-bold text-gray-900">$250</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Messages</p>
                    <p className="text-2xl font-bold text-gray-900">{messages.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-800">Recent Messages</h3>
              </div>
              <div className="p-6 space-y-4">
                {messages.slice(0, 3).map((message) => (
                  <div key={message.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {message.teacherName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900">{message.teacherName}</p>
                        <p className="text-xs text-gray-500">{message.date}</p>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{message.subject} • {message.childName}</p>
                      <p className="text-sm text-gray-700 mt-2">{message.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Other tabs would go here - for now showing placeholder */}
        {activeTab !== "dashboard" && (
          <div className="bg-white rounded-lg shadow p-8">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section</h3>
              <p className="text-gray-500">This section is being enhanced with features from the pages folder.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
