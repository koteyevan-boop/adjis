"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

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

interface SchoolEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: "academic" | "sports" | "cultural" | "meeting";
}

export default function ParentPortal() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedChild, setSelectedChild] = useState("1");

  const children: Child[] = [
    {
      id: "1",
      name: "Alex Johnson",
      grade: "Grade 10",
      class: "Class A",
      attendance: 95,
      averageGrade: "A-"
    },
    {
      id: "2",
      name: "Sarah Johnson",
      grade: "Grade 7",
      class: "Class B",
      attendance: 98,
      averageGrade: "A"
    }
  ];

  const payments: Payment[] = [
    {
      id: "1",
      description: "Tuition Fee - Term 2",
      amount: 2500,
      dueDate: "2024-03-15",
      status: "pending"
    },
    {
      id: "2",
      description: "School Bus Service",
      amount: 200,
      dueDate: "2024-03-10",
      status: "paid"
    },
    {
      id: "3",
      description: "Extracurricular Activities",
      amount: 150,
      dueDate: "2024-03-20",
      status: "pending"
    }
  ];

  const messages: TeacherMessage[] = [
    {
      id: "1",
      teacherName: "Ms. Smith",
      subject: "English",
      message: "Alex has shown significant improvement in his essay writing skills. Keep up the great work!",
      date: "2024-03-08",
      childName: "Alex Johnson"
    },
    {
      id: "2",
      teacherName: "Mr. Johnson",
      subject: "Mathematics",
      message: "Sarah is excelling in algebra. She participates actively in class discussions.",
      date: "2024-03-07",
      childName: "Sarah Johnson"
    },
    {
      id: "3",
      teacherName: "Dr. Brown",
      subject: "Science",
      message: "Please ensure Alex submits his science project by Friday this week.",
      date: "2024-03-05",
      childName: "Alex Johnson"
    }
  ];

  const events: SchoolEvent[] = [
    {
      id: "1",
      title: "Parent-Teacher Meeting",
      date: "2024-03-18",
      time: "2:00 PM - 5:00 PM",
      location: "School Auditorium",
      type: "meeting"
    },
    {
      id: "2",
      title: "School Sports Day",
      date: "2024-03-25",
      time: "9:00 AM - 2:00 PM",
      location: "School Sports Field",
      type: "sports"
    },
    {
      id: "3",
      title: "Science Exhibition",
      date: "2024-03-28",
      time: "10:00 AM - 12:00 PM",
      location: "School Hall",
      type: "academic"
    },
    {
      id: "4",
      title: "Cultural Day Celebration",
      date: "2024-04-05",
      time: "11:00 AM - 3:00 PM",
      location: "School Grounds",
      type: "cultural"
    }
  ];

  const currentChild = children.find(child => child.id === selectedChild);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "academic":
        return "bg-blue-100 text-blue-800";
      case "sports":
        return "bg-green-100 text-green-800";
      case "cultural":
        return "bg-purple-100 text-purple-800";
      case "meeting":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image
                src="/images/logo1.jpg"
                alt="ADJIS Logo"
                width={60}
                height={60}
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Parent Portal</h1>
                <p className="text-sm text-gray-500">Adorable Babies & Josemaria International School</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </div>
              
              {/* User Profile */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Mr. Johnson</p>
                  <p className="text-xs text-gray-500">Parent</p>
                </div>
                <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white font-semibold">
                  MJ
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

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
                  className={`p-4 rounded-lg border-2 text-left transition-colors ${
                    selectedChild === child.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{child.name}</p>
                      <p className="text-sm text-gray-500">{child.grade} • {child.class}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Avg Grade</p>
                      <p className="font-medium text-gray-900">{child.averageGrade}</p>
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
            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Welcome, Mr. Johnson!</h2>
              <p className="text-blue-100">
                Here's an overview of {currentChild?.name}'s progress and school updates.
              </p>
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
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Assignments</p>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Upcoming Events</p>
                    <p className="text-2xl font-bold text-gray-900">4</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Messages */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h3 className="text-lg font-medium text-gray-900">Recent Messages from Teachers</h3>
              </div>
              <div className="p-6 space-y-4">
                {messages.slice(0, 3).map((message) => (
                  <div key={message.id} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-gray-900">{message.teacherName} - {message.subject}</p>
                      <p className="text-sm text-gray-500">{message.date}</p>
                    </div>
                    <p className="text-gray-600">{message.message}</p>
                    <p className="text-sm text-gray-500 mt-1">Re: {message.childName}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h3 className="text-lg font-medium text-gray-900">Upcoming School Events</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {events.slice(0, 3).map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-4 ${
                          event.type === "academic" ? "bg-blue-500" : 
                          event.type === "sports" ? "bg-green-500" : 
                          event.type === "cultural" ? "bg-purple-500" : "bg-orange-500"
                        }`}></div>
                        <div>
                          <p className="font-medium text-gray-900">{event.title}</p>
                          <p className="text-sm text-gray-500">{event.date} • {event.time}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getEventTypeColor(event.type)}`}>
                        {event.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Academic Tab */}
        {activeTab === "academic" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h3 className="text-lg font-medium text-gray-900">
                  Academic Performance - {currentChild?.name}
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Subject Performance</h4>
                    <div className="space-y-3">
                      {["Mathematics", "English", "Science", "History", "Art"].map((subject, index) => (
                        <div key={subject} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{subject}</span>
                          <div className="flex items-center">
                            <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                              <div 
                                className="bg-blue-500 h-2 rounded-full" 
                                style={{ width: `${85 - index * 5}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900">{85 - index * 5}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Recent Assignments</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-gray-900">Mathematics Test</p>
                          <span className="text-sm font-medium text-green-600">A</span>
                        </div>
                        <p className="text-sm text-gray-500">Submitted: March 8, 2024</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-gray-900">English Essay</p>
                          <span className="text-sm font-medium text-blue-600">B+</span>
                        </div>
                        <p className="text-sm text-gray-500">Submitted: March 5, 2024</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-gray-900">Science Project</p>
                          <span className="text-sm font-medium text-yellow-600">Pending</span>
                        </div>
                        <p className="text-sm text-gray-500">Due: March 15, 2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === "attendance" && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h3 className="text-lg font-medium text-gray-900">
                Attendance Overview - {currentChild?.name}
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">142</p>
                  <p className="text-sm text-gray-600">Days Present</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">5</p>
                  <p className="text-sm text-gray-600">Days Absent</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{currentChild?.attendance}%</p>
                  <p className="text-sm text-gray-600">Attendance Rate</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Recent Attendance</h4>
                <div className="space-y-2">
                  {["March 8, 2024 - Present", "March 7, 2024 - Present", "March 6, 2024 - Absent (Sick)", "March 5, 2024 - Present", "March 4, 2024 - Present"].map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">{record.split(" - ")[0]}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        record.includes("Present") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                        {record.split(" - ")[1]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === "payments" && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h3 className="text-lg font-medium text-gray-900">Payment History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payments.map((payment) => (
                    <tr key={payment.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{payment.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${payment.amount}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{payment.dueDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {payment.status === "pending" && (
                          <button className="text-blue-600 hover:text-blue-900">Pay Now</button>
                        )}
                        {payment.status === "paid" && (
                          <button className="text-gray-600 hover:text-gray-900">View Receipt</button>
                        )}
                        {payment.status === "overdue" && (
                          <button className="text-red-600 hover:text-red-900">Pay Now</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h3 className="text-lg font-medium text-gray-900">Messages from Teachers</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {messages.map((message) => (
                <div key={message.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                          {message.teacherName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{message.teacherName}</p>
                          <p className="text-sm text-gray-500">{message.subject} • {message.date}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">{message.message}</p>
                      <p className="text-sm text-gray-500">Re: {message.childName}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-3">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm">
                      Reply
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                      Mark as Read
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === "events" && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h3 className="text-lg font-medium text-gray-900">School Events Calendar</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{event.title}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getEventTypeColor(event.type)}`}>
                        {event.type}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>📅 {event.date}</p>
                      <p>⏰ {event.time}</p>
                      <p>📍 {event.location}</p>
                    </div>
                    <div className="mt-3 flex space-x-3">
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm">
                        RSVP
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                        Add to Calendar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
