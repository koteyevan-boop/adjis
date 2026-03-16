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
  Shield,
  GraduationCap,
  Star,
  MapPin,
  Camera,
  TrendingDown,
  Briefcase,
  Database,
  PieChart,
  LineChart
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

interface AdminData {
  profile: {
    name: string;
    role: string;
    email: string;
    phone: string;
    department: string;
    avatar?: string;
  };
  stats: {
    totalStudents: number;
    totalTeachers: number;
    totalParents: number;
    totalClasses: number;
    attendanceRate: number;
    systemHealth: number;
    pendingFees: number;
    collectedFees: number;
  };
  departments: Array<{
    id: string;
    name: string;
    head: string;
    teachers: number;
    students: number;
    performance: number;
    status: 'excellent' | 'good' | 'average' | 'needs-improvement';
  }>;
  activities: Array<{
    id: string;
    type: 'user' | 'system' | 'academic' | 'financial' | 'announcement';
    title: string;
    description: string;
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
  systemHealth: Array<{
    id: string;
    metric: string;
    value: number;
    status: 'healthy' | 'warning' | 'critical';
    lastChecked: string;
  }>;
}

export default function FigmaAdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const [adminData] = useState<AdminData>({
    profile: {
      name: "Super Admin",
      role: "System Administrator",
      email: "admin@adjis.edu",
      phone: "+233 24 123 4567",
      department: "IT Administration"
    },
    stats: {
      totalStudents: 1245,
      totalTeachers: 87,
      totalParents: 2340,
      totalClasses: 28,
      attendanceRate: 94.2,
      systemHealth: 98.5,
      pendingFees: 45678,
      collectedFees: 234567
    },
    departments: [
      {
        id: "1",
        name: "Mathematics",
        head: "Mrs. Ama Mensah",
        teachers: 12,
        students: 245,
        performance: 87.5,
        status: "excellent"
      },
      {
        id: "2",
        name: "English",
        head: "Mr. Kofi Asante",
        teachers: 10,
        students: 234,
        performance: 82.3,
        status: "good"
      },
      {
        id: "3",
        name: "Science",
        head: "Dr. Yaa Boateng",
        teachers: 8,
        students: 189,
        performance: 91.2,
        status: "excellent"
      },
      {
        id: "4",
        name: "Social Studies",
        head: "Mr. Kwame Osei",
        teachers: 9,
        students: 198,
        performance: 78.9,
        status: "average"
      },
      {
        id: "5",
        name: "ICT",
        head: "Ms. Akua Afriyie",
        teachers: 6,
        students: 156,
        performance: 94.1,
        status: "excellent"
      },
      {
        id: "6",
        name: "French",
        head: "M. Pierre Dubois",
        teachers: 4,
        students: 89,
        performance: 76.4,
        status: "needs-improvement"
      }
    ],
    activities: [
      {
        id: "1",
        type: "user",
        title: "New Teacher Onboarded",
        description: "Ms. Akua Afriyie joined as ICT teacher",
        time: "2 hours ago",
        status: "completed"
      },
      {
        id: "2",
        type: "system",
        title: "System Backup Completed",
        description: "Weekly backup completed successfully",
        time: "5 hours ago",
        status: "completed"
      },
      {
        id: "3",
        type: "financial",
        title: "Fee Payment Processed",
        description: "GHS 15,000 in fee payments processed",
        time: "1 day ago",
        status: "completed"
      },
      {
        id: "4",
        type: "academic",
        title: "Exam Schedule Updated",
        description: "End-of-term exam schedule published",
        time: "2 days ago",
        status: "completed"
      }
    ],
    announcements: [
      {
        id: "1",
        title: "System Maintenance",
        message: "Scheduled system maintenance this weekend. Please save all work.",
        priority: "high",
        date: "2 days ago",
        author: "IT Department"
      },
      {
        id: "2",
        title: "New Academic Year",
        message: "Academic calendar for 2024/2025 has been approved.",
        priority: "medium",
        date: "3 days ago",
        author: "Academic Office"
      },
      {
        id: "3",
        title: "Staff Training",
        message: "Professional development sessions scheduled for next month.",
        priority: "low",
        date: "1 week ago",
        author: "HR Department"
      }
    ],
    systemHealth: [
      {
        id: "1",
        metric: "Database",
        value: 99.2,
        status: "healthy",
        lastChecked: "2 minutes ago"
      },
      {
        id: "2",
        metric: "API Response",
        value: 98.8,
        status: "healthy",
        lastChecked: "1 minute ago"
      },
      {
        id: "3",
        metric: "Storage",
        value: 85.0,
        status: "warning",
        lastChecked: "5 minutes ago"
      },
      {
        id: "4",
        metric: "Backup",
        value: 100.0,
        status: "healthy",
        lastChecked: "1 hour ago"
      },
      {
        id: "5",
        metric: "Security",
        value: 97.5,
        status: "healthy",
        lastChecked: "30 minutes ago"
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
    { id: 'users', label: 'User Management', icon: Users, badge: undefined },
    { id: 'academic', label: 'Academic', icon: GraduationCap, badge: undefined },
    { id: 'financial', label: 'Financial', icon: DollarSign, badge: undefined },
    { id: 'reports', label: 'Reports', icon: BarChart3, badge: undefined },
    { id: 'system', label: 'System', icon: Database, badge: undefined },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: undefined },
    { id: 'settings', label: 'Settings', icon: Settings, badge: undefined }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return Users;
      case 'system': return Database;
      case 'academic': return GraduationCap;
      case 'financial': return DollarSign;
      case 'announcement': return Info;
      default: return Activity;
    }
  };

  const getDepartmentStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'average': return 'text-yellow-600 bg-yellow-100';
      case 'needs-improvement': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
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
                <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back, {adminData.profile.name}</p>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <SearchBar
                placeholder="Search users, reports, system..."
                value={searchQuery}
                onChange={setSearchQuery}
              />
              <NotificationBell count={3} />
              <UserMenu name={adminData.profile.name} />
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
              name={adminData.profile.name}
              role={adminData.profile.role}
              email={adminData.profile.email}
              phone={adminData.profile.phone}
              stats={[
                { label: "System Health", value: `${adminData.stats.systemHealth}%` },
                { label: "Users", value: (adminData.stats.totalStudents + adminData.stats.totalTeachers + adminData.stats.totalParents).toString() },
                { label: "Departments", value: adminData.departments.length.toString() }
              ]}
            />

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Students"
                value={adminData.stats.totalStudents}
                icon={Users}
                trend="up"
                trendValue="12%"
                color="primary"
              />
              <StatCard
                title="Total Teachers"
                value={adminData.stats.totalTeachers}
                icon={GraduationCap}
                trend="up"
                trendValue="3"
                color="success"
              />
              <StatCard
                title="Collected Fees"
                value={`GHS ${adminData.stats.collectedFees.toLocaleString()}`}
                icon={DollarSign}
                trend="up"
                trendValue="15%"
                color="info"
              />
              <StatCard
                title="System Health"
                value={`${adminData.stats.systemHealth}%`}
                icon={Shield}
                color="success"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Department Performance */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-900">Department Performance</h2>
                      <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    {adminData.departments.map((dept) => (
                      <div key={dept.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <Briefcase className="h-5 w-5 text-blue-600" />
                            </div>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">{dept.name}</h3>
                            <p className="text-sm text-gray-500">{dept.head} • {dept.teachers} teachers</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{dept.performance}%</p>
                          <p className="text-sm text-gray-500">{dept.students} students</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System Health */}
                <div className="bg-white rounded-xl border border-gray-200 mt-6">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-900">System Health</h2>
                      <button className="text-sm text-blue-600 hover:text-blue-700">Run Diagnostics</button>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    {adminData.systemHealth.map((health) => (
                      <div key={health.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`p-2 rounded-lg ${getHealthStatusColor(health.status)}`}>
                            <Database className="h-4 w-4" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">{health.metric}</h3>
                            <p className="text-sm text-gray-500">Last checked: {health.lastChecked}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{health.value}%</p>
                          <p className="text-sm text-gray-500 capitalize">{health.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Activities & Announcements */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
                  </div>
                  <div className="p-6 space-y-4">
                    {adminData.activities.map((activity) => {
                      const Icon = getActivityIcon(activity.type);
                      return (
                        <ActivityItem
                          key={activity.id}
                          icon={Icon}
                          title={activity.title}
                          description={activity.description}
                          time={activity.time}
                          status={activity.status}
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">System Announcements</h2>
                  </div>
                  <div className="p-6 space-y-4">
                    {adminData.announcements.map((announcement) => (
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
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
