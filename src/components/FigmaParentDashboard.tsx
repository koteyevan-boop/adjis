'use client';

import { useState, useEffect } from 'react';
import { 
  Search,
  Bell,
  Settings,
  User,
  Menu,
  Home,
  Users,
  DollarSign,
  Calendar,
  FileText,
  Award,
  TrendingUp,
  Clock,
  ChevronRight,
  MoreVertical,
  Download,
  Upload,
  Eye,
  Plus,
  BarChart3,
  Activity,
  Target,
  Zap,
  Globe,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Info,
  LogOut,
  Heart,
  Star,
  MapPin,
  Camera,
  GraduationCap,
  BookOpen,
  TrendingDown,
  CreditCard
} from 'lucide-react';
import { 
  StatCard,
  ActivityItem,
  ScheduleItem,
  AnnouncementCard,
  ProfileHeader,
  NavigationItem,
  SearchBar,
  NotificationBell,
  UserMenu
} from './SharedDesignSystem';

interface ParentData {
  profile: {
    name: string;
    role: string;
    email: string;
    phone: string;
    children: Array<{
      name: string;
      grade: string;
      section: string;
      avatar?: string;
    }>;
    avatar?: string;
  };
  stats: {
    totalChildren: number;
    totalFees: number;
    paidFees: number;
    pendingFees: number;
    averageGrades: number;
    attendanceRate: number;
    upcomingMeetings: number;
    unreadMessages: number;
  };
  children: Array<{
    id: string;
    name: string;
    grade: string;
    section: string;
    averageGrade: number;
    attendanceRate: number;
    recentActivities: Array<{
      type: string;
      title: string;
      date: string;
      status: string;
    }>;
    upcomingExams: number;
    pendingAssignments: number;
  }>;
  activities: Array<{
    id: string;
    type: 'payment' | 'grade' | 'attendance' | 'meeting' | 'announcement';
    title: string;
    description: string;
    childName: string;
    time: string;
    status: 'completed' | 'pending' | 'urgent' | 'normal';
  }>;
  announcements: Array<{
    id: string;
    title: string;
    message: string;
    priority: 'high' | 'medium' | 'low';
    date: string;
    author: string;
  }>;
  upcomingMeetings: Array<{
    id: string;
    title: string;
    teacher: string;
    childName: string;
    date: string;
    time: string;
    type: string;
  }>;
}

export default function FigmaParentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChild, setSelectedChild] = useState("all");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const [parentData] = useState<ParentData>({
    profile: {
      name: "Mr. Asante",
      role: "Parent",
      email: "asante.parent@adjis.edu",
      phone: "+233 24 987 6543",
      children: [
        { name: "Kofi Asante", grade: "Grade 7", section: "A" },
        { name: "Ama Asante", grade: "Grade 5", section: "B" }
      ]
    },
    stats: {
      totalChildren: 2,
      totalFees: 5000,
      paidFees: 3500,
      pendingFees: 1500,
      averageGrades: 85.5,
      attendanceRate: 93.2,
      upcomingMeetings: 2,
      unreadMessages: 5
    },
    children: [
      {
        id: "1",
        name: "Kofi Asante",
        grade: "Grade 7",
        section: "A",
        averageGrade: 87.5,
        attendanceRate: 95.2,
        recentActivities: [
          { type: "grade", title: "Math Quiz - A", date: "2024-03-18", status: "completed" },
          { type: "assignment", title: "English Essay Submitted", date: "2024-03-17", status: "completed" },
          { type: "attendance", title: "Perfect Week", date: "2024-03-15", status: "completed" }
        ],
        upcomingExams: 2,
        pendingAssignments: 3
      },
      {
        id: "2",
        name: "Ama Asante",
        grade: "Grade 5",
        section: "B",
        averageGrade: 92.0,
        attendanceRate: 98.1,
        recentActivities: [
          { type: "grade", title: "Science Test - A+", date: "2024-03-19", status: "completed" },
          { type: "assignment", title: "Art Project", date: "2024-03-16", status: "completed" },
          { type: "achievement", title: "Star Student", date: "2024-03-14", status: "completed" }
        ],
        upcomingExams: 1,
        pendingAssignments: 2
      }
    ],
    activities: [
      {
        id: "1",
        type: "grade",
        title: "Kofi's Math Quiz Graded",
        description: "Received an A in Algebra Quiz",
        childName: "Kofi Asante",
        time: "2 hours ago",
        status: "completed"
      },
      {
        id: "2",
        type: "payment",
        title: "Fee Payment Processed",
        description: "Term 2 fees payment confirmed",
        childName: "Both Children",
        time: "1 day ago",
        status: "completed"
      },
      {
        id: "3",
        type: "meeting",
        title: "Parent-Teacher Meeting",
        description: "Scheduled with Mrs. Mensah",
        childName: "Ama Asante",
        time: "2 days ago",
        status: "pending"
      },
      {
        id: "4",
        type: "attendance",
        title: "Perfect Attendance",
        description: "Both children achieved perfect attendance",
        childName: "Both Children",
        time: "3 days ago",
        status: "completed"
      }
    ],
    announcements: [
      {
        id: "1",
        title: "End of Term Exams",
        message: "Final exams will begin next week. Please ensure your children are well-prepared.",
        priority: "high",
        date: "2 days ago",
        author: "Principal"
      },
      {
        id: "2",
        title: "Fee Payment Reminder",
        message: "Second installment of school fees is due by end of month.",
        priority: "high",
        date: "3 days ago",
        author: "Finance Office"
      },
      {
        id: "3",
        title: "Parent-Teacher Conference",
        message: "Annual parent-teacher conferences scheduled for next month.",
        priority: "medium",
        date: "1 week ago",
        author: "Academic Office"
      }
    ],
    upcomingMeetings: [
      {
        id: "1",
        title: "Progress Review",
        teacher: "Mrs. Mensah",
        childName: "Ama Asante",
        date: "2024-03-25",
        time: "2:00 PM",
        type: "Academic"
      },
      {
        id: "2",
        title: "Behavioral Discussion",
        teacher: "Mr. Johnson",
        childName: "Kofi Asante",
        date: "2024-03-28",
        time: "10:00 AM",
        type: "General"
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
    { id: 'dashboard', label: 'Dashboard', icon: Home, badge: undefined },
    { id: 'children', label: 'My Children', icon: Users, badge: parentData.stats.totalChildren },
    { id: 'fees', label: 'Fees & Payments', icon: DollarSign, badge: parentData.stats.pendingFees > 0 ? '!' : undefined },
    { id: 'grades', label: 'Grades', icon: Award, badge: undefined },
    { id: 'attendance', label: 'Attendance', icon: CheckCircle, badge: undefined },
    { id: 'meetings', label: 'Meetings', icon: Calendar, badge: parentData.stats.upcomingMeetings },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: parentData.stats.unreadMessages },
    { id: 'profile', label: 'Profile', icon: User, badge: undefined }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'payment': return CreditCard;
      case 'grade': return Award;
      case 'attendance': return CheckCircle;
      case 'meeting': return Calendar;
      case 'announcement': return Info;
      default: return Activity;
    }
  };

  const getFeeStatusColor = (pending: number) => {
    if (pending === 0) return 'text-green-600 bg-green-100';
    if (pending < 1000) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
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
                <h1 className="text-xl font-semibold text-gray-900">Parent Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back, {parentData.profile.name}</p>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <SearchBar
                placeholder="Search children, grades, fees..."
                value={searchQuery}
                onChange={setSearchQuery}
              />
              <NotificationBell count={parentData.stats.unreadMessages} />
              <UserMenu name={parentData.profile.name} />
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-white border-r border-gray-200 fixed left-0 top-16 bottom-0 transition-all duration-300 z-30 overflow-hidden`}>
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => (
              <NavigationItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                badge={item.badge}
                isActive={item.id === 'dashboard'}
              />
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
          <div className="p-6">
            {/* Profile Header */}
            <ProfileHeader
              name={parentData.profile.name}
              role={`Parent of ${parentData.profile.children.length} children`}
              email={parentData.profile.email}
              phone={parentData.profile.phone}
              stats={[
                { label: "Children", value: parentData.stats.totalChildren.toString() },
                { label: "Avg Grades", value: `${parentData.stats.averageGrades}%` },
                { label: "Meetings", value: parentData.stats.upcomingMeetings.toString() }
              ]}
            />

            {/* Children Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {parentData.children.map((child) => (
                <div key={child.id} className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <GraduationCap className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{child.name}</h3>
                        <p className="text-sm text-gray-500">{child.grade} - {child.section}</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Average Grade</p>
                      <p className="text-lg font-semibold text-gray-900">{child.averageGrade}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Attendance</p>
                      <p className="text-lg font-semibold text-gray-900">{child.attendanceRate}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Pending Work</p>
                      <p className="text-lg font-semibold text-gray-900">{child.pendingAssignments}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Upcoming Exams</p>
                      <p className="text-lg font-semibold text-gray-900">{child.upcomingExams}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Fees"
                value={`GHS ${parentData.stats.totalFees}`}
                icon={DollarSign}
                color="primary"
              />
              <StatCard
                title="Paid Fees"
                value={`GHS ${parentData.stats.paidFees}`}
                icon={CheckCircle}
                color="success"
              />
              <StatCard
                title="Pending Fees"
                value={`GHS ${parentData.stats.pendingFees}`}
                icon={AlertCircle}
                color="warning"
              />
              <StatCard
                title="Average Grades"
                value={`${parentData.stats.averageGrades}%`}
                icon={Award}
                trend="up"
                trendValue="3.2%"
                color="info"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activities */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
                      <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    {parentData.activities.map((activity) => {
                      const Icon = getActivityIcon(activity.type);
                      return (
                        <div key={activity.id} className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${
                            activity.status === 'completed' ? 'text-green-600 bg-green-100' :
                            activity.status === 'pending' ? 'text-yellow-600 bg-yellow-100' :
                            activity.status === 'urgent' ? 'text-red-600 bg-red-100' :
                            'text-gray-600 bg-gray-100'
                          }`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                            <p className="text-sm text-gray-500">{activity.description}</p>
                            <p className="text-xs text-gray-400 mt-1">{activity.childName} • {activity.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Upcoming Meetings */}
                <div className="bg-white rounded-xl border border-gray-200 mt-6">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-900">Upcoming Meetings</h2>
                      <button className="text-sm text-blue-600 hover:text-blue-700">Schedule New</button>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    {parentData.upcomingMeetings.map((meeting) => (
                      <div key={meeting.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Calendar className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">{meeting.title}</h3>
                            <p className="text-sm text-gray-500">{meeting.teacher} • {meeting.childName}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{meeting.date}</p>
                          <p className="text-sm text-gray-500">{meeting.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Announcements */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Announcements</h2>
                  </div>
                  <div className="p-6 space-y-4">
                    {parentData.announcements.map((announcement) => (
                      <AnnouncementCard
                        key={announcement.id}
                        title={announcement.title}
                        message={announcement.message}
                        priority={announcement.priority}
                        date={announcement.date}
                        author={announcement.author}
                      />
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
                  </div>
                  <div className="p-6 space-y-3">
                    <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                        <span className="text-sm font-medium text-gray-900">Pay Fees</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-green-600" />
                        <span className="text-sm font-medium text-gray-900">Schedule Meeting</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <MessageSquare className="h-5 w-5 text-purple-600" />
                        <span className="text-sm font-medium text-gray-900">Message Teacher</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <Download className="h-5 w-5 text-orange-600" />
                        <span className="text-sm font-medium text-gray-900">Download Reports</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </button>
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
