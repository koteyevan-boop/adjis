'use client';

import { useState, useEffect } from 'react';
import { 
  Search,
  Bell,
  Settings,
  User,
  Menu,
  X,
  Filter,
  Plus,
  Download,
  Calendar,
  Clock,
  TrendingUp,
  Users,
  BookOpen,
  Award,
  Mail,
  Phone,
  LogOut
} from 'lucide-react';
import DashboardSidebar from './DashboardSidebar';
import { 
  StatCard, 
  ActivityItem, 
  ClassSchedule, 
  ProgressBar, 
  QuickActionCard,
  PerformanceChart,
  AnnouncementCard,
  StudentProgress
} from './DashboardWidgets';

interface DashboardData {
  stats: {
    totalStudents: number;
    averageGrade: number;
    assignmentsPending: number;
    upcomingClasses: number;
    attendanceRate: number;
    completionRate: number;
    messagesUnread: number;
    parentMeetings: number;
  };
  activities: Array<{
    id: string;
    type: 'assignment' | 'grade' | 'message' | 'attendance' | 'announcement';
    title: string;
    description: string;
    timestamp: Date;
    priority?: 'high' | 'medium' | 'low';
    status?: 'completed' | 'pending' | 'overdue';
  }>;
  classes: Array<{
    id: string;
    subject: string;
    class: string;
    time: string;
    duration: string;
    room: string;
    students: number;
    status?: 'upcoming' | 'in-progress' | 'completed';
  }>;
  announcements: Array<{
    id: string;
    title: string;
    message: string;
    type: 'info' | 'warning' | 'success' | 'error';
    timestamp: Date;
  }>;
  topStudents: Array<{
    id: string;
    name: string;
    grade: number;
    trend: 'up' | 'down' | 'stable';
    assignments: number;
    attendance: number;
  }>;
}

export default function ComprehensiveDashboard({ 
  teacherName, 
  teacherRole, 
  assignedClasses 
}: { 
  teacherName: string; 
  teacherRole: string; 
  assignedClasses: string[];
}) {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const [dashboardData] = useState<DashboardData>({
    stats: {
      totalStudents: 156,
      averageGrade: 85.5,
      assignmentsPending: 12,
      upcomingClasses: 4,
      attendanceRate: 92.3,
      completionRate: 78.9,
      messagesUnread: 3,
      parentMeetings: 2
    },
    activities: [
      {
        id: '1',
        type: 'assignment',
        title: 'New Assignment Submitted',
        description: 'Ama Mensah submitted Mathematics Assignment #3',
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        priority: 'high',
        status: 'pending'
      },
      {
        id: '2',
        type: 'grade',
        title: 'Grading Completed',
        description: 'Grade 7A English tests have been graded',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        priority: 'medium',
        status: 'completed'
      },
      {
        id: '3',
        type: 'message',
        title: 'Parent Message',
        description: 'Mr. Asante sent a message about student progress',
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        priority: 'low'
      },
      {
        id: '4',
        type: 'attendance',
        title: 'Attendance Updated',
        description: 'Today\'s attendance for Grade 7B has been recorded',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        priority: 'medium',
        status: 'completed'
      },
      {
        id: '5',
        type: 'announcement',
        title: 'Staff Meeting',
        description: 'Tomorrow at 3:00 PM in Conference Room',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
        priority: 'high'
      }
    ],
    classes: [
      {
        id: '1',
        subject: 'Mathematics',
        class: 'Grade 7A',
        time: '09:00 AM',
        duration: '45 min',
        room: 'Room 201',
        students: 25,
        status: 'upcoming'
      },
      {
        id: '2',
        subject: 'Mathematics',
        class: 'Grade 7B',
        time: '10:00 AM',
        duration: '45 min',
        room: 'Room 202',
        students: 23,
        status: 'upcoming'
      },
      {
        id: '3',
        subject: 'Mathematics',
        class: 'Grade 8A',
        time: '11:00 AM',
        duration: '45 min',
        room: 'Room 301',
        students: 28,
        status: 'upcoming'
      },
      {
        id: '4',
        subject: 'Mathematics',
        class: 'Grade 8B',
        time: '02:00 PM',
        duration: '45 min',
        room: 'Room 302',
        students: 26,
        status: 'upcoming'
      }
    ],
    announcements: [
      {
        id: '1',
        title: 'Staff Meeting',
        message: 'Tomorrow at 3:00 PM in Conference Room',
        type: 'info',
        timestamp: new Date()
      },
      {
        id: '2',
        title: 'New Curriculum Update',
        message: 'Math syllabus updated for next term',
        type: 'success',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2)
      },
      {
        id: '3',
        title: 'System Maintenance',
        message: 'Scheduled for this weekend',
        type: 'warning',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24)
      }
    ],
    topStudents: [
      {
        id: '1',
        name: 'Ama Mensah',
        grade: 92,
        trend: 'up',
        assignments: 15,
        attendance: 98
      },
      {
        id: '2',
        name: 'Kofi Asante',
        grade: 88,
        trend: 'up',
        assignments: 14,
        attendance: 95
      },
      {
        id: '3',
        name: 'Yaa Boateng',
        grade: 85,
        trend: 'stable',
        assignments: 13,
        attendance: 92
      },
      {
        id: '4',
        name: 'Kwame Osei',
        grade: 82,
        trend: 'down',
        assignments: 12,
        attendance: 88
      },
      {
        id: '5',
        name: 'Akua Afriyie',
        grade: 79,
        trend: 'up',
        assignments: 11,
        attendance: 90
      }
    ]
  });

  const quickActions = [
    {
      title: 'Create Assignment',
      description: 'Create a new assignment for your classes',
      icon: BookOpen,
      color: 'bg-blue-500',
      onClick: () => console.log('Create Assignment')
    },
    {
      title: 'Take Attendance',
      description: 'Record attendance for today\'s classes',
      icon: Users,
      color: 'bg-green-500',
      onClick: () => console.log('Take Attendance')
    },
    {
      title: 'Grade Assignments',
      description: 'Review and grade student submissions',
      icon: Award,
      color: 'bg-purple-500',
      onClick: () => console.log('Grade Assignments'),
      count: dashboardData.stats.assignmentsPending
    },
    {
      title: 'Send Message',
      description: 'Send message to parents or students',
      icon: Mail,
      color: 'bg-orange-500',
      onClick: () => console.log('Send Message'),
      count: dashboardData.stats.messagesUnread
    }
  ];

  const renderDashboardContent = () => {
    switch (activeItem) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Students"
                value={dashboardData.stats.totalStudents}
                change={12}
                icon={Users}
                color="bg-blue-500"
                subtitle="Across all classes"
              />
              <StatCard
                title="Average Grade"
                value={`${dashboardData.stats.averageGrade}%`}
                change={5.2}
                icon={TrendingUp}
                color="bg-green-500"
                subtitle="This term"
              />
              <StatCard
                title="Pending Grading"
                value={dashboardData.stats.assignmentsPending}
                icon={Award}
                color="bg-purple-500"
                subtitle="Awaiting review"
              />
              <StatCard
                title="Today's Classes"
                value={dashboardData.stats.upcomingClasses}
                icon={Calendar}
                color="bg-orange-500"
                subtitle="Scheduled"
              />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - 2/3 width */}
              <div className="lg:col-span-2 space-y-6">
                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {quickActions.map((action) => (
                        <QuickActionCard
                          key={action.title}
                          title={action.title}
                          description={action.description}
                          icon={action.icon}
                          color={action.color}
                          onClick={action.onClick}
                          count={action.count}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Today's Schedule */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-900">Today's Schedule</h2>
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        View Calendar
                      </button>
                    </div>
                    <ClassSchedule classes={dashboardData.classes} />
                  </div>
                </div>

                {/* Performance Chart */}
                <PerformanceChart
                  title="Performance Overview"
                  period={selectedPeriod}
                  onPeriodChange={setSelectedPeriod}
                />
              </div>

              {/* Right Column - 1/3 width */}
              <div className="space-y-6">
                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        View All
                      </button>
                    </div>
                    <div className="space-y-3">
                      {dashboardData.activities.slice(0, 5).map((activity) => (
                        <ActivityItem key={activity.id} {...activity} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Attendance Overview */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Attendance Overview</h2>
                    <div className="space-y-4">
                      <ProgressBar
                        label="Today's Attendance"
                        value={dashboardData.stats.attendanceRate}
                        max={100}
                        color="bg-green-500"
                      />
                      <ProgressBar
                        label="Assignment Completion"
                        value={dashboardData.stats.completionRate}
                        max={100}
                        color="bg-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Announcements */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Announcements</h2>
                    <div className="space-y-3">
                      {dashboardData.announcements.map((announcement) => (
                        <AnnouncementCard key={announcement.id} {...announcement} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'assignments':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Assignments</h2>
            <p className="text-gray-500">Assignment management interface would go here</p>
          </div>
        );

      case 'gradebook':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Gradebook</h2>
            <p className="text-gray-500">Gradebook interface would go here</p>
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {activeItem.charAt(0).toUpperCase() + activeItem.slice(1)}
            </h2>
            <p className="text-gray-500">Content for {activeItem} would go here</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <DashboardSidebar
        activeItem={activeItem}
        onItemSelect={setActiveItem}
        teacherName={teacherName}
        teacherRole={teacherRole}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                >
                  <Menu className="h-5 w-5" />
                </button>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Notifications */}
                <div className="relative">
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <Bell className="h-5 w-5" />
                    {dashboardData.stats.messagesUnread > 0 && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                  </button>
                  
                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="p-4 border-b border-gray-200">
                        <h3 className="font-medium text-gray-900">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {dashboardData.activities.slice(0, 3).map((activity) => (
                          <div key={activity.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                            <ActivityItem {...activity} />
                          </div>
                        ))}
                      </div>
                      <div className="p-4">
                        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                          View all notifications
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
                  >
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-medium text-gray-900">{teacherName}</p>
                      <p className="text-xs text-gray-500">{teacherRole}</p>
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  </button>
                  
                  {/* User Menu Dropdown */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="p-2">
                        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                          <User className="h-4 w-4" />
                          Profile
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                          <Settings className="h-4 w-4" />
                          Settings
                        </button>
                        <hr className="my-2" />
                        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                          <LogOut className="h-4 w-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderDashboardContent()}
        </main>
      </div>
    </div>
  );
}
