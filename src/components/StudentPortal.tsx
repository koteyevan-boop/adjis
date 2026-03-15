"use client";

import { useState } from "react";
import Image from "next/image";
import PortalHeader from '@/components/PortalHeader';
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
  const [scheduleView, setScheduleView] = useState("daily"); // daily, weekly, monthly
  const [scheduleKey, setScheduleKey] = useState(Date.now()); // Force refresh

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
      title: "English Essay - Creative Writing",
      subject: "English",
      dueDate: "2024-03-20",
      status: "pending"
    }
  ];

  const announcements: Announcement[] = [
    {
      id: "1",
      title: "Parent-Teacher Meeting",
      message: "Scheduled for next Friday at 2:00 PM",
      date: "2024-03-10",
      priority: "high"
    },
    {
      id: "2",
      title: "Science Fair",
      message: "Annual science fair next month",
      date: "2024-03-08",
      priority: "medium"
    },
    {
      id: "3",
      title: "Sports Day",
      message: "Annual sports day coming soon",
      date: "2024-03-05",
      priority: "low"
    }
  ];

  const dailySchedule: ScheduleItem[] = [
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
      subject: "English",
      teacher: "Ms. Smith",
      time: "9:00 - 10:00",
      room: "Room 105",
      type: "class"
    },
    {
      id: "3",
      subject: "Break",
      teacher: "",
      time: "10:00 - 10:30",
      room: "Cafeteria",
      type: "break"
    },
    {
      id: "4",
      subject: "Science",
      teacher: "Dr. Brown",
      time: "10:30 - 11:30",
      room: "Lab 301",
      type: "class"
    },
    {
      id: "5",
      subject: "Creative Arts",
      teacher: "Ms. Davis",
      time: "11:30 - 12:00",
      room: "Art Room",
      type: "class"
    },
    {
      id: "6",
      subject: "Lunch",
      teacher: "",
      time: "12:00 - 12:45",
      room: "Cafeteria",
      type: "break"
    },
    {
      id: "7",
      subject: "French",
      teacher: "Mme. Martin",
      time: "12:45 - 1:30",
      room: "Room 203",
      type: "class"
    },
    {
      id: "8",
      subject: "Twi",
      teacher: "Mr. Owusu",
      time: "1:30 - 2:15",
      room: "Room 108",
      type: "class"
    },
    {
      id: "9",
      subject: "Music",
      teacher: "Mr. Adams",
      time: "2:15 - 2:30",
      room: "Music Room",
      type: "class"
    }
  ];

  const weeklySchedule = [
    { day: "Monday", schedule: dailySchedule },
    { 
      day: "Tuesday", 
      schedule: [
        ...dailySchedule.slice(0, 4),
        { ...dailySchedule[4], subject: "Computing", teacher: "Ms. Tech", room: "Computer Lab" },
        ...dailySchedule.slice(5)
      ]
    },
    { 
      day: "Wednesday", 
      schedule: [
        ...dailySchedule.slice(0, 4),
        { ...dailySchedule[4], subject: "Citizenship Education", teacher: "Mr. Amoah", room: "Room 205" },
        ...dailySchedule.slice(5)
      ]
    },
    { day: "Thursday", schedule: dailySchedule },
    { day: "Friday", schedule: dailySchedule }
  ];

  const monthlySchedule = [
    { week: "Week 1", dates: "March 1-5", schedule: weeklySchedule },
    { week: "Week 2", dates: "March 8-12", schedule: weeklySchedule },
    { week: "Week 3", dates: "March 15-19", schedule: weeklySchedule },
    { week: "Week 4", dates: "March 22-26", schedule: weeklySchedule }
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
      <PortalHeader
        portalType="student"
        userName="Alex Johnson"
        userRole="Grade 10 - Class A"
        notifications={notifications}
        onNotificationClick={() => console.log('Notifications clicked')}
        onSettingsClick={() => console.log('Settings clicked')}
      />

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
            {/* Enhanced Student Profile Card */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold">AJ</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">Welcome back, Alex Johnson!</h2>
                  <p className="text-blue-100">Grade 10 - Class A • Student ID: STU001</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">85% Average Grade</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">92% Attendance</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">3 Pending Assignments</span>
                  </div>
                </div>
              </div>
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
          <div key={scheduleKey} className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Schedule</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setScheduleKey(Date.now())}
                    className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh
                  </button>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setScheduleView("daily")}
                      className={`px-4 py-2 text-sm font-medium rounded-md ${
                        scheduleView === "daily"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Daily
                    </button>
                    <button
                      onClick={() => setScheduleView("weekly")}
                      className={`px-4 py-2 text-sm font-medium rounded-md ${
                        scheduleView === "weekly"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Weekly
                    </button>
                    <button
                      onClick={() => setScheduleView("monthly")}
                      className={`px-4 py-2 text-sm font-medium rounded-md ${
                        scheduleView === "monthly"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Monthly
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              {scheduleView === "daily" && (
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-gray-700 mb-4">Today's Schedule (8:00 AM - 2:30 PM)</h4>
                  {dailySchedule.map((item: ScheduleItem) => (
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
              )}

              {scheduleView === "weekly" && (
                <div className="space-y-6">
                  <h4 className="text-md font-medium text-gray-700 mb-4">Weekly Schedule</h4>
                  {weeklySchedule.map((dayData) => (
                    <div key={dayData.day} className="border rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 mb-3">{dayData.day}</h5>
                      <div className="space-y-2">
                        {dayData.schedule.slice(0, 6).map((item: ScheduleItem) => (
                          <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center">
                              <div className={`w-2 h-8 rounded-full mr-3 ${
                                item.type === "class" ? "bg-blue-500" : "bg-green-500"
                              }`}></div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{item.subject}</p>
                                <p className="text-xs text-gray-500">{item.room}</p>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600">{item.time}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {scheduleView === "monthly" && (
                <div className="space-y-6">
                  <h4 className="text-md font-medium text-gray-700 mb-4">Monthly Schedule</h4>
                  {monthlySchedule.map((weekData) => (
                    <div key={weekData.week} className="border rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 mb-2">{weekData.week} ({weekData.dates})</h5>
                      <p className="text-sm text-gray-600 mb-3">Regular weekly schedule applies</p>
                      <div className="grid grid-cols-5 gap-2 text-xs">
                        {weekData.schedule.map((dayData) => (
                          <div key={dayData.day} className="text-center p-2 bg-gray-50 rounded">
                            <p className="font-medium text-gray-700">{dayData.day}</p>
                            <p className="text-gray-500">9 periods</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Grades Tab */}
        {activeTab === "grades" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h3 className="text-lg font-medium text-gray-900">Academic Performance</h3>
                <p className="text-sm text-gray-500 mt-1">Current Semester Grades • Last Updated: March 15, 2024</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Subject Grades</h4>
                    <div className="space-y-3">
                      {["Mathematics", "English", "Science", "Creative Arts", "French", "Twi", "Music", "Computing", "Citizenship Education"].map((subject, index) => (
                        <div key={subject} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-xs font-bold text-blue-600">{subject.charAt(0)}</span>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-900">{subject}</span>
                              <p className="text-xs text-gray-500">Class Score + Exam Score</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold text-gray-900">{85 - index * 2}%</span>
                            <p className="text-xs text-gray-500">{85 - index * 2 >= 70 ? 'A' : 85 - index * 2 >= 60 ? 'B' : 'C'}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Grade Distribution</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-sm font-medium text-green-900">A Grade (70-100%)</span>
                        <span className="text-sm font-bold text-green-600">5 Subjects</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <span className="text-sm font-medium text-blue-900">B Grade (60-69%)</span>
                        <span className="text-sm font-bold text-blue-600">2 Subjects</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                        <span className="text-sm font-medium text-yellow-900">C Grade (50-59%)</span>
                        <span className="text-sm font-bold text-yellow-600">2 Subjects</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <span className="text-sm font-medium text-red-900">Below 50%</span>
                        <span className="text-sm font-bold text-red-600">0 Subjects</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h5 className="font-medium text-blue-900 mb-2">Overall Performance</h5>
                      <div className="text-3xl font-bold text-blue-600">85%</div>
                      <p className="text-sm text-blue-700">Class Average: 82%</p>
                      <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
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
