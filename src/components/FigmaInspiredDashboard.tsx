'use client';

import { useState, useEffect } from 'react';
import { 
  Search,
  Bell,
  Settings,
  User,
  Menu,
  X,
  Home,
  Users,
  BookOpen,
  Calendar,
  FileText,
  Award,
  TrendingUp,
  DollarSign,
  Clock,
  ChevronRight,
  MoreVertical,
  Filter,
  Download,
  Upload,
  Edit,
  Trash2,
  Eye,
  Plus,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Zap,
  Globe,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

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
    time: string;
    status: 'completed' | 'pending' | 'urgent' | 'normal';
  }>;
  classes: Array<{
    id: string;
    name: string;
    subject: string;
    time: string;
    room: string;
    students: number;
    status: 'upcoming' | 'in-progress' | 'completed';
  }>;
  announcements: Array<{
    id: string;
    title: string;
    message: string;
    priority: 'high' | 'medium' | 'low';
    date: string;
    author: string;
  }>;
}

export default function FigmaInspiredDashboard({ 
  teacherName = "Mr. Johnson",
  teacherRole = "subject",
  assignedClasses = ["Grade 7A", "Grade 7B"]
}: {
  teacherName?: string;
  teacherRole?: string;
  assignedClasses?: string[];
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const [dashboardData] = useState<DashboardData>({
    stats: {
      totalStudents: 156,
      averageGrade: 85.4,
      assignmentsPending: 12,
      upcomingClasses: 4,
      attendanceRate: 92.8,
      completionRate: 88.5,
      messagesUnread: 7,
      parentMeetings: 3
    },
    activities: [
      {
        id: "1",
        type: "assignment",
        title: "Math Quiz Graded",
        description: "Grade 7A - Algebra Quiz",
        time: "2 hours ago",
        status: "completed"
      },
      {
        id: "2",
        type: "message",
        title: "Parent Message",
        description: "From Mrs. Asante about Kofi's progress",
        time: "3 hours ago",
        status: "pending"
      },
      {
        id: "3",
        type: "attendance",
        title: "Attendance Updated",
        description: "Grade 7B - Science Class",
        time: "5 hours ago",
        status: "completed"
      },
      {
        id: "4",
        type: "announcement",
        title: "Staff Meeting",
        description: "Tomorrow at 3:00 PM - Conference Room",
        time: "1 day ago",
        status: "urgent"
      }
    ],
    classes: [
      {
        id: "1",
        name: "Grade 7A",
        subject: "Mathematics",
        time: "8:00 AM",
        room: "Room 201",
        students: 28,
        status: "upcoming"
      },
      {
        id: "2",
        name: "Grade 7B",
        subject: "Mathematics",
        time: "9:30 AM",
        room: "Room 202",
        students: 26,
        status: "upcoming"
      },
      {
        id: "3",
        name: "Grade 8A",
        subject: "Advanced Math",
        time: "11:00 AM",
        room: "Room 301",
        students: 22,
        status: "upcoming"
      },
      {
        id: "4",
        name: "Grade 7A",
        subject: "Mathematics",
        time: "2:00 PM",
        room: "Room 201",
        students: 28,
        status: "upcoming"
      }
    ],
    announcements: [
      {
        id: "1",
        title: "End of Term Exams",
        message: "Final exams will begin next week. Please ensure all students are prepared.",
        priority: "high",
        date: "2 days ago",
        author: "Principal"
      },
      {
        id: "2",
        title: "New Grading System",
        message: "Updated grading guidelines have been posted in the staff room.",
        priority: "medium",
        date: "3 days ago",
        author: "Academic Office"
      },
      {
        id: "3",
        title: "Professional Development",
        message: "Math teachers workshop scheduled for next Friday.",
        priority: "low",
        date: "1 week ago",
        author: "HR Department"
      }
    ]
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, badge: null },
    { id: 'classes', label: 'Classes', icon: BookOpen, badge: dashboardData.stats.upcomingClasses },
    { id: 'students', label: 'Students', icon: Users, badge: dashboardData.stats.totalStudents },
    { id: 'assignments', label: 'Assignments', icon: FileText, badge: dashboardData.stats.assignmentsPending },
    { id: 'grades', label: 'Grades', icon: Award, badge: null },
    { id: 'calendar', label: 'Calendar', icon: Calendar, badge: null },
    { id: 'messages', label: 'Messages', icon: Mail, badge: dashboardData.stats.messagesUnread },
    { id: 'reports', label: 'Reports', icon: BarChart3, badge: null }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'assignment': return FileText;
      case 'grade': return Award;
      case 'message': return MessageSquare;
      case 'attendance': return CheckCircle;
      case 'announcement': return Info;
      default: return Activity;
    }
  };

  const getActivityColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'urgent': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-green-500 bg-green-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side */}
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu className="h-5 w-5 text-gray-600" />
              </button>
              <div className="ml-4">
                <h1 className="text-xl font-semibold text-gray-900">Teacher Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back, {teacherName}</p>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Bell className="h-5 w-5 text-gray-600" />
                  {dashboardData.stats.messagesUnread > 0 && (
                    <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
              </div>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-white border-r border-gray-200 fixed left-0 top-16 bottom-0 transition-all duration-300 z-30 overflow-hidden`}>
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-left"
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
          <div className="p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="text-sm text-green-600 font-medium">+12%</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{dashboardData.stats.totalStudents}</h3>
                <p className="text-sm text-gray-600">Total Students</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Award className="h-6 w-6 text-green-600" />
                  </div>
                  <span className="text-sm text-green-600 font-medium">+5.2%</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{dashboardData.stats.averageGrade}%</h3>
                <p className="text-sm text-gray-600">Average Grade</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <FileText className="h-6 w-6 text-yellow-600" />
                  </div>
                  <span className="text-sm text-red-600 font-medium">-3</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{dashboardData.stats.assignmentsPending}</h3>
                <p className="text-sm text-gray-600">Pending Assignments</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <span className="text-sm text-gray-600 font-medium">Today</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{dashboardData.stats.upcomingClasses}</h3>
                <p className="text-sm text-gray-600">Upcoming Classes</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Today's Schedule */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-900">Today's Schedule</h2>
                      <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    {dashboardData.classes.map((classItem) => (
                      <div key={classItem.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <BookOpen className="h-5 w-5 text-blue-600" />
                            </div>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">{classItem.name}</h3>
                            <p className="text-sm text-gray-500">{classItem.subject} • {classItem.room}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{classItem.time}</p>
                          <p className="text-sm text-gray-500">{classItem.students} students</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                  </div>
                  <div className="p-6 space-y-4">
                    {dashboardData.activities.map((activity) => {
                      const Icon = getActivityIcon(activity.type);
                      return (
                        <div key={activity.id} className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${getActivityColor(activity.status)}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                            <p className="text-sm text-gray-500">{activity.description}</p>
                            <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Announcements */}
                <div className="bg-white rounded-xl border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Announcements</h2>
                  </div>
                  <div className="p-6 space-y-4">
                    {dashboardData.announcements.map((announcement) => (
                      <div key={announcement.id} className={`p-4 rounded-lg border-l-4 ${getPriorityColor(announcement.priority)}`}>
                        <h3 className="text-sm font-medium text-gray-900">{announcement.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{announcement.message}</p>
                        <p className="text-xs text-gray-500 mt-2">{announcement.date} • {announcement.author}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
