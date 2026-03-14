'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Users, Calendar, Bell, User, LogOut, Home, Settings, FileText, Award, BookOpen, Mail } from 'lucide-react';
import PortalGuard from '@/components/PortalGuard';

export default function StaffPortalPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  type ClassInfo = {
    id: string;
    grade: string;
    subject: string;
    students: number;
    time: string;
    room: string;
  };

  const classes: ClassInfo[] = [
    { id: "1", grade: "Grade 10A", subject: "Mathematics", students: 25, time: "8:00 AM", room: "Room 201" },
    { id: "2", grade: "Grade 9B", subject: "Mathematics", students: 23, time: "9:00 AM", room: "Room 205" },
    { id: "3", grade: "Grade 11A", subject: "Advanced Math", students: 20, time: "10:30 AM", room: "Room 301" },
    { id: "4", grade: "Grade 8C", subject: "Mathematics", students: 26, time: "11:30 AM", room: "Room 210" },
  ];

  const meetings = [
    { id: "1", title: "Department Meeting", time: "3:00 PM", date: "Today", location: "Conference Room A" },
    { id: "2", title: "Parent-Teacher Conference", time: "2:00 PM", date: "Tomorrow", location: "Room 105" },
    { id: "3", title: "Staff Development", time: "10:00 AM", date: "Friday", location: "Main Hall" },
  ];

  const tasks = [
    { id: "1", title: "Grade Grade 10 Math Tests", dueDate: "2024-03-15", priority: "high" },
    { id: "2", title: "Prepare Lesson Plans for Next Week", dueDate: "2024-03-16", priority: "medium" },
    { id: "3", title: "Submit Student Progress Reports", dueDate: "2024-03-18", priority: "high" },
    { id: "4", title: "Update Class Attendance Records", dueDate: "2024-03-14", priority: "low" },
  ];

  const messages = [
    { id: "1", sender: "Ms. Smith", subject: "Question about Assignment", preview: "Hi, I have a question about the math homework...", time: "2 hours ago", unread: true },
    { id: "2", sender: "Principal", subject: "Staff Meeting Reminder", preview: "Don't forget about tomorrow's department meeting...", time: "5 hours ago", unread: true },
    { id: "3", sender: "Parent", subject: "Student Progress", preview: "I would like to discuss my child's progress...", time: "1 day ago", unread: false },
  ];

  return (
    <PortalGuard portalType="teacher">
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
                  <h1 className="text-xl font-bold text-gray-900">Staff Portal</h1>
                  <p className="text-sm text-gray-500">Adorable Babies & Josemaria International School</p>
                </div>
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <button className="p-2 text-gray-600 hover:text-gray-800 relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    2
                  </span>
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
              { id: "classes", label: "Classes", icon: BookOpen },
              { id: "schedule", label: "Schedule", icon: Calendar },
              { id: "tasks", label: "Tasks", icon: FileText },
              { id: "messages", label: "Messages", icon: Mail },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 transition-colors ${
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
              <h2 className="text-2xl font-bold mb-2">Welcome back, Mr. Johnson!</h2>
              <p className="text-purple-100">You have 4 classes scheduled for today and 3 pending tasks.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Students</p>
                    <p className="text-2xl font-bold text-gray-800">94</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-500" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Classes Today</p>
                    <p className="text-2xl font-bold text-gray-800">4</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pending Tasks</p>
                    <p className="text-2xl font-bold text-gray-800">3</p>
                  </div>
                  <FileText className="w-8 h-8 text-orange-500" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Meetings</p>
                    <p className="text-2xl font-bold text-gray-800">2</p>
                  </div>
                  <Calendar className="w-8 h-8 text-green-500" />
                </div>
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-800">Today's Classes</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {classes.slice(0, 3).map((cls) => (
                    <div key={cls.id} className="flex items-center justify-between p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="text-sm font-medium text-gray-600 w-20">{cls.time}</div>
                        <div>
                          <p className="font-medium text-gray-800">{cls.grade} - {cls.subject}</p>
                          <p className="text-sm text-gray-600">{cls.students} students</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">{cls.room}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Messages */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-800">Recent Messages</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {messages.slice(0, 2).map((message) => (
                    <div key={message.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{message.sender}</p>
                          <p className="text-sm text-gray-600">{message.subject}</p>
                          <p className="text-xs text-gray-500 truncate max-w-md">{message.preview}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">{message.time}</p>
                        {message.unread && (
                          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-1"></span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Classes Tab */}
        {activeTab === "classes" && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-800">My Classes</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {classes.map((cls) => (
                  <div key={cls.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{cls.grade} - {cls.subject}</p>
                        <p className="text-sm text-gray-600">{cls.students} students • {cls.room}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{cls.time}</span>
                      <button className="px-3 py-1 text-sm bg-purple-500 text-white rounded hover:bg-purple-600">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === "schedule" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-800">Weekly Schedule</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {classes.map((cls) => (
                    <div key={cls.id} className="flex items-center justify-between p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="text-sm font-medium text-gray-600 w-20">{cls.time}</div>
                        <div>
                          <p className="font-medium text-gray-800">{cls.grade} - {cls.subject}</p>
                          <p className="text-sm text-gray-600">{cls.students} students</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">{cls.room}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-800">Meetings</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {meetings.map((meeting) => (
                    <div key={meeting.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">{meeting.title}</p>
                        <p className="text-sm text-gray-600">{meeting.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{meeting.date}</p>
                        <p className="text-xs text-gray-500">{meeting.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tasks Tab */}
        {activeTab === "tasks" && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-800">Tasks & Assignments</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${
                        task.priority === "high" ? "bg-red-500" :
                        task.priority === "medium" ? "bg-yellow-500" : "bg-green-500"
                      }`}></div>
                      <div>
                        <p className="font-medium text-gray-800">{task.title}</p>
                        <p className="text-sm text-gray-600">Due: {task.dueDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        task.priority === "high" ? "bg-red-100 text-red-800" :
                        task.priority === "medium" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                      }`}>
                        {task.priority}
                      </span>
                      <button className="px-3 py-1 text-sm bg-purple-500 text-white rounded hover:bg-purple-600">
                        Mark Complete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-800">Messages</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${message.unread ? 'border-blue-200 bg-blue-50' : ''}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-800">{message.sender}</p>
                            {message.unread && (
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{message.subject}</p>
                          <p className="text-xs text-gray-500 truncate max-w-md">{message.preview}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">{message.time}</p>
                      </div>
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
