'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  FileText, 
  TrendingUp, 
  Clock, 
  Award, 
  Bell, 
  Search,
  Filter,
  Plus,
  MoreVertical,
  ChevronRight,
  Activity,
  Target,
  BarChart3,
  PieChart,
  Download,
  Upload,
  Mail,
  Phone,
  Settings,
  LogOut,
  User,
  Home,
  Briefcase,
  GraduationCap
} from 'lucide-react';

interface DashboardStats {
  totalStudents: number;
  averageGrade: number;
  assignmentsPending: number;
  upcomingClasses: number;
  attendanceRate: number;
  completionRate: number;
}

interface RecentActivity {
  id: string;
  type: 'assignment' | 'grade' | 'message' | 'attendance';
  title: string;
  description: string;
  timestamp: Date;
  priority: 'high' | 'medium' | 'low';
}

interface UpcomingClass {
  id: string;
  subject: string;
  class: string;
  time: string;
  duration: string;
  room: string;
  students: number;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  action: () => void;
}

export default function ModernTeacherDashboard({ 
  teacherName, 
  teacherRole, 
  assignedClasses 
}: { 
  teacherName: string; 
  teacherRole: string; 
  assignedClasses: string[];
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [notifications, setNotifications] = useState(3);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 156,
    averageGrade: 85.5,
    assignmentsPending: 12,
    upcomingClasses: 4,
    attendanceRate: 92.3,
    completionRate: 78.9
  });

  const recentActivities: RecentActivity[] = [
    {
      id: '1',
      type: 'assignment',
      title: 'New Assignment Submitted',
      description: 'Ama Mensah submitted Mathematics Assignment #3',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      priority: 'high'
    },
    {
      id: '2',
      type: 'grade',
      title: 'Grading Completed',
      description: 'Grade 7A English tests have been graded',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      priority: 'medium'
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
      priority: 'medium'
    }
  ];

  const upcomingClasses: UpcomingClass[] = [
    {
      id: '1',
      subject: 'Mathematics',
      class: 'Grade 7A',
      time: '09:00 AM',
      duration: '45 min',
      room: 'Room 201',
      students: 25
    },
    {
      id: '2',
      subject: 'Mathematics',
      class: 'Grade 7B',
      time: '10:00 AM',
      duration: '45 min',
      room: 'Room 202',
      students: 23
    },
    {
      id: '3',
      subject: 'Mathematics',
      class: 'Grade 8A',
      time: '11:00 AM',
      duration: '45 min',
      room: 'Room 301',
      students: 28
    },
    {
      id: '4',
      subject: 'Mathematics',
      class: 'Grade 8B',
      time: '02:00 PM',
      duration: '45 min',
      room: 'Room 302',
      students: 26
    }
  ];

  const quickActions: QuickAction[] = [
    {
      id: '1',
      title: 'Create Assignment',
      description: 'Create a new assignment for your classes',
      icon: FileText,
      color: 'bg-blue-500',
      action: () => console.log('Create Assignment')
    },
    {
      id: '2',
      title: 'Take Attendance',
      description: 'Record attendance for today\'s classes',
      icon: Users,
      color: 'bg-green-500',
      action: () => console.log('Take Attendance')
    },
    {
      id: '3',
      title: 'Grade Assignments',
      description: 'Review and grade student submissions',
      icon: Award,
      color: 'bg-purple-500',
      action: () => console.log('Grade Assignments')
    },
    {
      id: '4',
      title: 'Send Message',
      description: 'Send message to parents or students',
      icon: Mail,
      color: 'bg-orange-500',
      action: () => console.log('Send Message')
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'assignment': return <FileText className="h-4 w-4" />;
      case 'grade': return <Award className="h-4 w-4" />;
      case 'message': return <Mail className="h-4 w-4" />;
      case 'attendance': return <Users className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getActivityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-600 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-600 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-600 border-green-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    return `${Math.floor(hours / 24)} days ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Teacher Dashboard</h1>
                  <p className="text-sm text-gray-500">Welcome back, {teacherName}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
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
              
              {/* Notifications */}
              <div className="relative">
                <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
              </div>
              
              {/* User Menu */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{teacherName}</p>
                  <p className="text-xs text-gray-500">{teacherRole}</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm text-green-600 font-medium">+12%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.totalStudents}</h3>
            <p className="text-sm text-gray-500 mt-1">Total Students</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm text-green-600 font-medium">+5.2%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.averageGrade}%</h3>
            <p className="text-sm text-gray-500 mt-1">Average Grade</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-sm text-orange-600 font-medium">Pending</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.assignmentsPending}</h3>
            <p className="text-sm text-gray-500 mt-1">Assignments to Grade</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <span className="text-sm text-blue-600 font-medium">Today</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.upcomingClasses}</h3>
            <p className="text-sm text-gray-500 mt-1">Upcoming Classes</p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={action.action}
                      className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center`}>
                        <action.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium text-gray-900">{action.title}</h3>
                        <p className="text-sm text-gray-500">{action.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Classes */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Today's Schedule</h2>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {upcomingClasses.map((classItem) => (
                    <div key={classItem.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{classItem.subject}</h3>
                          <p className="text-sm text-gray-500">{classItem.class} • {classItem.room}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{classItem.time}</p>
                        <p className="text-sm text-gray-500">{classItem.duration} • {classItem.students} students</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Performance Overview</h2>
                  <select 
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="text-sm border border-gray-300 rounded-lg px-3 py-1"
                  >
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="term">This Term</option>
                  </select>
                </div>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Performance chart will be displayed here</p>
                    <p className="text-sm text-gray-400 mt-1">Integration with charting library needed</p>
                  </div>
                </div>
              </div>
            </div>
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
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.priority)}`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-xs text-gray-500">{activity.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{formatTimeAgo(activity.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Attendance Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Attendance Overview</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Today's Attendance</span>
                      <span className="text-sm font-medium text-gray-900">{stats.attendanceRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${stats.attendanceRate}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Assignment Completion</span>
                      <span className="text-sm font-medium text-gray-900">{stats.completionRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${stats.completionRate}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Announcements */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Announcements</h2>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-medium text-blue-900">Staff Meeting</p>
                    <p className="text-xs text-blue-700 mt-1">Tomorrow at 3:00 PM in Conference Room</p>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-medium text-green-900">New Curriculum Update</p>
                    <p className="text-xs text-green-700 mt-1">Math syllabus updated for next term</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
