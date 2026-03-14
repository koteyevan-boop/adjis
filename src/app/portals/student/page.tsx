'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Calendar, Bell, User, LogOut, Home, Settings, FileText, Award } from 'lucide-react';
import PortalGuard from '@/components/PortalGuard';

export default function StudentPortalPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [notifications, setNotifications] = useState(3);

  type ScheduleItem = {
    id: string;
    time: string;
    subject: string;
    teacher: string;
    room: string;
    type: "class" | "break" | "activity";
  };

  const schedule: ScheduleItem[] = [
    { id: "1", time: "8:00 AM", subject: "Mathematics", teacher: "Mr. Johnson", room: "Room 201", type: "class" },
    { id: "2", time: "9:00 AM", subject: "English", teacher: "Ms. Smith", room: "Room 205", type: "class" },
    { id: "3", time: "10:00 AM", subject: "Break", teacher: "", room: "Cafeteria", type: "break" },
    { id: "4", time: "10:30 AM", subject: "Science", teacher: "Dr. Brown", room: "Lab 301", type: "class" },
    { id: "5", time: "11:30 AM", subject: "Social Studies", teacher: "Mr. Davis", room: "Room 210", type: "class" },
  ];

  const assignments = [
    { id: "1", subject: "Mathematics", title: "Algebra Problem Set", dueDate: "2024-03-15", status: "pending" },
    { id: "2", subject: "English", title: "Essay on Shakespeare", dueDate: "2024-03-18", status: "submitted" },
    { id: "3", subject: "Science", title: "Lab Report", dueDate: "2024-03-20", status: "pending" },
  ];

  const grades = [
    { subject: "Mathematics", grade: "A-", percentage: 88 },
    { subject: "English", grade: "B+", percentage: 82 },
    { subject: "Science", grade: "A", percentage: 92 },
    { subject: "Social Studies", grade: "B", percentage: 78 },
  ];

  const announcements = [
    { id: "1", title: "School Sports Day", message: "Annual sports day will be held on March 25th. All students are required to participate.", date: "2024-03-10", priority: "high" },
    { id: "2", title: "Parent-Teacher Meeting", message: "Parent-teacher meetings scheduled for March 22nd. Please inform your parents.", date: "2024-03-08", priority: "medium" },
    { id: "3", title: "Library Hours", message: "Library will remain open until 6 PM during exam week.", date: "2024-03-05", priority: "low" },
  ];

  return (
    <PortalGuard portalType="student">
      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/images/logo1.jpg"
                  alt="ADJIS"
                  width={120}
                  height={60}
                  className="h-12 w-auto"
                />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Student Portal</h1>
                  <p className="text-sm text-gray-500">Adorable Babies & Josemaria International School</p>
                </div>
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <button className="p-2 text-gray-600 hover:text-gray-800 relative">
                  <Bell className="w-5 h-5" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>
              </div>
              <button className="p-2 text-gray-600 hover:text-gray-800">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: "dashboard", label: "Dashboard", icon: Home },
              { id: "schedule", label: "Schedule", icon: Calendar },
              { id: "assignments", label: "Assignments", icon: FileText },
              { id: "grades", label: "Grades", icon: Award },
              { id: "announcements", label: "Announcements", icon: Bell },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
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
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Welcome back, Alex!</h2>
              <p className="text-blue-100">You have 3 assignments due this week. Keep up the great work!</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pending Assignments</p>
                    <p className="text-2xl font-bold text-gray-800">3</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Average Grade</p>
                    <p className="text-2xl font-bold text-gray-800">85%</p>
                  </div>
                  <Award className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Attendance</p>
                    <p className="text-2xl font-bold text-gray-800">92%</p>
                  </div>
                  <Calendar className="w-8 h-8 text-purple-500" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Classes Today</p>
                    <p className="text-2xl font-bold text-gray-800">4</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-orange-500" />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm text-gray-800">Submitted English Essay</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm text-gray-800">New Math Assignment Posted</p>
                    <p className="text-xs text-gray-500">Yesterday</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div>
                    <p className="text-sm text-gray-800">Science Lab Report Graded</p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === "schedule" && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-800">Today's Schedule</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {schedule.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      item.type === "class"
                        ? "bg-blue-50 border border-blue-200"
                        : item.type === "break"
                        ? "bg-green-50 border border-green-200"
                        : "bg-purple-50 border border-purple-200"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-medium text-gray-600 w-20">{item.time}</div>
                      <div>
                        <p className="font-medium text-gray-800">{item.subject}</p>
                        {item.teacher && <p className="text-sm text-gray-600">{item.teacher}</p>}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">{item.room}</div>
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
              <h3 className="text-lg font-semibold text-gray-800">Assignments</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">{assignment.title}</p>
                      <p className="text-sm text-gray-600">{assignment.subject}</p>
                      <p className="text-xs text-gray-500">Due: {assignment.dueDate}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          assignment.status === "submitted"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {assignment.status}
                      </span>
                      <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Grades Tab */}
        {activeTab === "grades" && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-800">Grades</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {grades.map((grade) => (
                  <div key={grade.subject} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">{grade.subject}</p>
                      <p className="text-sm text-gray-600">Current Grade</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-800">{grade.grade}</p>
                      <p className="text-sm text-gray-600">{grade.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Announcements Tab */}
        {activeTab === "announcements" && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-800">Announcements</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{announcement.title}</p>
                        <p className="text-sm text-gray-600 mt-1">{announcement.message}</p>
                        <p className="text-xs text-gray-500 mt-2">{announcement.date}</p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          announcement.priority === "high"
                            ? "bg-red-100 text-red-800"
                            : announcement.priority === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {announcement.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </PortalGuard>
  );
}
