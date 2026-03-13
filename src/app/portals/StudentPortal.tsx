"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: "pending" | "submitted" | "graded";
  grade?: string;
}

interface Announcement {
  id: string;
  title: string;
  message: string;
  date: string;
  priority: "low" | "medium" | "high";
}

interface ScheduleItem {
  id: string;
  subject: string;
  teacher: string;
  time: string;
  room: string;
  type: "class" | "break" | "activity";
}

export default function StudentPortal() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [notifications, setNotifications] = useState(3);

  const assignments: Assignment[] = [
    {
      id: "1",
      title: "Mathematics Assignment - Algebra",
      subject: "Mathematics",
      dueDate: "2024-03-15",
      status: "pending"
    },
    {
      id: "2",
      title: "Science Project Report",
      subject: "Science",
      dueDate: "2024-03-18",
      status: "submitted"
    },
    {
      id: "3",
      title: "English Essay - Literature Analysis",
      subject: "English",
      dueDate: "2024-03-20",
      status: "graded",
      grade: "A-"
    }
  ];

  const announcements: Announcement[] = [
    {
      id: "1",
      title: "School Sports Day",
      message: "Annual sports day will be held on March 25th. All students are required to participate.",
      date: "2024-03-10",
      priority: "high"
    },
    {
      id: "2",
      title: "Parent-Teacher Meeting",
      message: "Parent-teacher meetings scheduled for next week. Check your schedule for appointment times.",
      date: "2024-03-08",
      priority: "medium"
    },
    {
      id: "3",
      title: "Library Hours Extended",
      message: "Library will remain open until 6 PM during exam week.",
      date: "2024-03-05",
      priority: "low"
    }
  ];

  const schedule: ScheduleItem[] = [
    {
      id: "1",
      subject: "Mathematics",
      teacher: "Mr. Johnson",
      time: "8:00 - 9:00",
      room: "Room 201",
      type: "class"
    },
    {
      id: "2",
      subject: "Break",
      teacher: "",
      time: "9:00 - 9:15",
      room: "Cafeteria",
      type: "break"
    },
    {
      id: "3",
      subject: "English",
      teacher: "Ms. Smith",
      time: "9:15 - 10:15",
      room: "Room 105",
      type: "class"
    },
    {
      id: "4",
      subject: "Science",
      teacher: "Dr. Brown",
      time: "10:30 - 11:30",
      room: "Lab 301",
      type: "class"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "submitted":
        return "bg-blue-100 text-blue-800";
      case "graded":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-orange-100 text-orange-800";
      case "low":
        return "bg-gray-100 text-gray-800";
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
                alt="Adorable Babies & Josemaria International School"
                width={60}
                height={60}
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Student Portal</h1>
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
                  {notifications > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
              </div>
              
              {/* User Profile */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Alex Johnson</p>
                  <p className="text-xs text-gray-500">Grade 10 - Class A</p>
                </div>
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  AJ
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 border-b">
            {[
              { id: "dashboard", label: "Dashboard", icon: "🏠" },
              { id: "assignments", label: "Assignments", icon: "📚" },
              { id: "schedule", label: "Schedule", icon: "📅" },
              { id: "grades", label: "Grades", icon: "📊" },
              { id: "announcements", label: "Announcements", icon: "📢" }
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
              <h2 className="text-2xl font-bold mb-2">Welcome back, Alex!</h2>
              <p className="text-blue-100">You have 3 assignments due this week. Keep up the great work!</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Pending</p>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Submitted</p>
                    <p className="text-2xl font-bold text-gray-900">5</p>
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
                    <p className="text-2xl font-bold text-gray-900">A-</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Attendance</p>
                    <p className="text-2xl font-bold text-gray-900">95%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
              </div>
              <div className="p-6 space-y-4">
                {assignments.slice(0, 3).map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{assignment.title}</p>
                      <p className="text-sm text-gray-500">{assignment.subject} • Due {assignment.dueDate}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(assignment.status)}`}>
                      {assignment.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Assignments Tab */}
        {activeTab === "assignments" && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h3 className="text-lg font-medium text-gray-900">My Assignments</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assignment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Grade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {assignments.map((assignment) => (
                    <tr key={assignment.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{assignment.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{assignment.subject}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{assignment.dueDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(assignment.status)}`}>
                          {assignment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{assignment.grade || "-"}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                        {assignment.status === "pending" && (
                          <button className="text-green-600 hover:text-green-900">Submit</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === "schedule" && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h3 className="text-lg font-medium text-gray-900">Today's Schedule</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {schedule.map((item) => (
                  <div key={item.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-12 rounded-full mr-4 ${
                      item.type === "class" ? "bg-blue-500" : 
                      item.type === "break" ? "bg-green-500" : "bg-purple-500"
                    }`}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{item.subject}</h4>
                          <p className="text-sm text-gray-500">{item.teacher} • {item.room}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{item.time}</p>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            item.type === "class" ? "bg-blue-100 text-blue-800" : 
                            item.type === "break" ? "bg-green-100 text-green-800" : "bg-purple-100 text-purple-800"
                          }`}>
                            {item.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Grades Tab */}
        {activeTab === "grades" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h3 className="text-lg font-medium text-gray-900">Academic Performance</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Current Semester</h4>
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
                    <h4 className="font-medium text-gray-900 mb-4">Grade Distribution</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">A Grade</span>
                        <span className="text-sm font-medium text-green-600">3</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">B Grade</span>
                        <span className="text-sm font-medium text-blue-600">2</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">C Grade</span>
                        <span className="text-sm font-medium text-yellow-600">0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Announcements Tab */}
        {activeTab === "announcements" && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h3 className="text-lg font-medium text-gray-900">School Announcements</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h4 className="text-lg font-medium text-gray-900 mr-3">{announcement.title}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(announcement.priority)}`}>
                          {announcement.priority}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{announcement.message}</p>
                      <p className="text-sm text-gray-500">Posted on {announcement.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
