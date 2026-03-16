'use client';

import { useState } from 'react';
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
  LineChart,
  BookOpen
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
  const [activeTab, setActiveTab] = useState("dashboard");

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
        head: "Mr. Kwame Asante",
        teachers: 10,
        students: 198,
        performance: 82.3,
        status: "good"
      },
      {
        id: "3",
        name: "Science",
        head: "Dr. Yaa Boateng",
        teachers: 8,
        students: 167,
        performance: 79.8,
        status: "good"
      }
    ],
    activities: [
      {
        id: "1",
        type: "user",
        title: "New teacher registration",
        description: "Ms. Adwoa Mensah joined as Mathematics teacher",
        time: "2 hours ago",
        status: "completed"
      },
      {
        id: "2",
        type: "academic",
        title: "Grade 7A exam results uploaded",
        description: "Mid-term examination results for Grade 7A",
        time: "4 hours ago",
        status: "completed"
      },
      {
        id: "3",
        type: "financial",
        title: "Fee payment reminder sent",
        description: "Automated reminders sent to 45 parents",
        time: "6 hours ago",
        status: "completed"
      },
      {
        id: "4",
        type: "system",
        title: "Database backup completed",
        description: "Scheduled daily backup completed successfully",
        time: "8 hours ago",
        status: "completed"
      },
      {
        id: "5",
        type: "announcement",
        title: "School holiday announced",
        description: "Public holiday on Friday, March 21st",
        time: "1 day ago",
        status: "completed"
      }
    ],
    announcements: [
      {
        id: "1",
        title: "End of Term Exams",
        message: "Final examinations will begin on March 25th. All students should prepare accordingly.",
        priority: "high",
        date: "2024-03-15",
        author: "Academic Office"
      },
      {
        id: "2",
        title: "Parent-Teacher Meeting",
        message: "Scheduled for March 20th at 2:00 PM in the school auditorium.",
        priority: "medium",
        date: "2024-03-14",
        author: "Administration"
      },
      {
        id: "3",
        title: "School Fees Reminder",
        message: "Second installment fees are due by March 30th. Please ensure timely payment.",
        priority: "medium",
        date: "2024-03-13",
        author: "Finance Office"
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
        metric: "API Server",
        value: 98.7,
        status: "healthy",
        lastChecked: "5 minutes ago"
      },
      {
        id: "3",
        metric: "Storage",
        value: 85.3,
        status: "warning",
        lastChecked: "10 minutes ago"
      }
    ]
  });

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
              <h1 className="ml-4 text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search anything..."
              />
              
              <NotificationBell
                count={7}
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              />
              
              <UserMenu
                name={adminData.profile.name}
                onLogout={() => console.log('Logout clicked')}
              />
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
                isActive={item.id === activeTab}
                onClick={() => setActiveTab(item.id)}
              />
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
          <div className="p-6">
            {/* Dashboard Tab Content */}
            {activeTab === 'dashboard' && (
              <>
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
                              <div className="text-sm font-medium text-gray-900">{dept.students} students</div>
                              <div className="text-sm text-gray-600">{dept.performance}% performance</div>
                              <div className={`text-xs font-medium px-2 py-1 rounded-full inline-block mt-1 ${getDepartmentStatusColor(dept.status)}`}>
                                {dept.status}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Recent Activities */}
                  <div>
                    <div className="bg-white rounded-xl border border-gray-200">
                      <div className="p-6 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
                      </div>
                      <div className="p-6 space-y-4">
                        {adminData.activities.slice(0, 5).map((activity) => (
                          <ActivityItem
                            key={activity.id}
                            icon={getActivityIcon(activity.type)}
                            title={activity.title}
                            description={activity.description}
                            time={activity.time}
                            status={activity.status}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Announcements */}
                <div className="mt-6">
                  <div className="bg-white rounded-xl border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">Recent Announcements</h2>
                        <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
                      </div>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {adminData.announcements.slice(0, 3).map((announcement) => (
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
              </>
            )}

            {/* User Management Tab Content */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                {/* User Management Header */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                    <div className="flex space-x-2">
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
                        <Plus className="h-4 w-4" />
                        <span>Add User</span>
                      </button>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                        <Upload className="h-4 w-4" />
                        <span>Bulk Import</span>
                      </button>
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center space-x-2">
                        <Download className="h-4 w-4" />
                        <span>Export Users</span>
                      </button>
                    </div>
                  </div>

                  {/* User Statistics Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-blue-600 font-medium">Total Users</p>
                          <p className="text-2xl font-bold text-blue-900">3,672</p>
                          <p className="text-xs text-blue-600 mt-1">All roles</p>
                        </div>
                        <div className="h-12 w-12 bg-blue-200 rounded-full flex items-center justify-center">
                          <Users className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-green-600 font-medium">Active Users</p>
                          <p className="text-2xl font-bold text-green-900">3,245</p>
                          <p className="text-xs text-green-600 mt-1">88% active</p>
                        </div>
                        <div className="h-12 w-12 bg-green-200 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-purple-600 font-medium">Students</p>
                          <p className="text-2xl font-bold text-purple-900">1,245</p>
                          <p className="text-xs text-purple-600 mt-1">Primary users</p>
                        </div>
                        <div className="h-12 w-12 bg-purple-200 rounded-full flex items-center justify-center">
                          <GraduationCap className="h-6 w-6 text-purple-600" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-orange-600 font-medium">Staff</p>
                          <p className="text-2xl font-bold text-orange-900">327</p>
                          <p className="text-xs text-orange-600 mt-1">Teachers & Admin</p>
                        </div>
                        <div className="h-12 w-12 bg-orange-200 rounded-full flex items-center justify-center">
                          <Shield className="h-6 w-6 text-orange-600" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Advanced Search & Filtering */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Search & Filtering</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Search Users</label>
                        <input
                          type="text"
                          placeholder="Name, ID, Email..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>All Roles</option>
                          <option>Student</option>
                          <option>Parent</option>
                          <option>Teacher</option>
                          <option>Admin</option>
                          <option>Alumni</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>All Status</option>
                          <option>Active</option>
                          <option>Inactive</option>
                          <option>Archived</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>All Departments</option>
                          <option>Academic</option>
                          <option>Administration</option>
                          <option>Support</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Enrollment Year</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>All Years</option>
                          <option>2024</option>
                          <option>2023</option>
                          <option>2022</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Login</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>Any Time</option>
                          <option>Last 7 Days</option>
                          <option>Last 30 Days</option>
                          <option>Last 90 Days</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Class/Grade</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>All Classes</option>
                          <option>Grade 10A</option>
                          <option>Grade 10B</option>
                          <option>Grade 11A</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Academic Grouping */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <GraduationCap className="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Academic Grouping</h3>
                    </div>
                    <div className="space-y-3">
                      <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Enroll Student</p>
                            <p className="text-sm text-gray-600">Add to class & academic year</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </button>
                      <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Change Class/Grade</p>
                            <p className="text-sm text-gray-600">Promote or transfer students</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </button>
                      <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Graduate Students</p>
                            <p className="text-sm text-gray-600">Convert to alumni</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Roles & Permissions */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Shield className="h-5 w-5 text-purple-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Roles & Permissions</h3>
                    </div>
                    <div className="space-y-3">
                      <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Create Custom Role</p>
                            <p className="text-sm text-gray-600">Define specific permissions</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </button>
                      <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Permission Matrix</p>
                            <p className="text-sm text-gray-600">Module & action access</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </button>
                      <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Bulk Role Assignment</p>
                            <p className="text-sm text-gray-600">Assign roles to multiple users</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Security & Audit */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Security & Audit</h3>
                    </div>
                    <div className="space-y-3">
                      <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Login History</p>
                            <p className="text-sm text-gray-600">View authentication logs</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </button>
                      <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Active Sessions</p>
                            <p className="text-sm text-gray-600">Manage logged-in users</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </button>
                      <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Audit Trail</p>
                            <p className="text-sm text-gray-600">Track user actions</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* User Directory Table */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Master User Directory</h3>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Bulk Operations</button>
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">Export Selected</button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3">
                            <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                          </th>
                          <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                          <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                          <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Class/Dept</th>
                          <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                          <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-4">
                            <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                                <User className="h-4 w-4 text-white" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">Kofi Asante</p>
                                <p className="text-sm text-gray-600">kofi.asante@adjis.edu</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Student</span>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">Grade 10A</td>
                          <td className="px-4 py-4">
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">2 hours ago</td>
                          <td className="px-4 py-4 text-sm">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-700">View</button>
                              <button className="text-green-600 hover:text-green-700">Edit</button>
                              <button className="text-red-600 hover:text-red-700">Archive</button>
                            </div>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-4">
                            <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="h-8 w-8 bg-purple-500 rounded-full flex items-center justify-center">
                                <User className="h-4 w-4 text-white" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">Mrs. Ama Mensah</p>
                                <p className="text-sm text-gray-600">ama.mensah@adjis.edu</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">Teacher</span>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">Mathematics</td>
                          <td className="px-4 py-4">
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">1 day ago</td>
                          <td className="px-4 py-4 text-sm">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-700">View</button>
                              <button className="text-green-600 hover:text-green-700">Edit</button>
                              <button className="text-red-600 hover:text-red-700">Archive</button>
                            </div>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-4">
                            <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                                <User className="h-4 w-4 text-white" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">Mr. Kwame Asante</p>
                                <p className="text-sm text-gray-600">kwame.asante@parent.com</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Parent</span>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">Parent of Grade 7A</td>
                          <td className="px-4 py-4">
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">3 days ago</td>
                          <td className="px-4 py-4 text-sm">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-700">View</button>
                              <button className="text-green-600 hover:text-green-700">Edit</button>
                              <button className="text-red-600 hover:text-red-700">Archive</button>
                            </div>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-4">
                            <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="h-8 w-8 bg-orange-500 rounded-full flex items-center justify-center">
                                <User className="h-4 w-4 text-white" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">Dr. Yaa Boateng</p>
                                <p className="text-sm text-gray-600">yaa.boateng@adjis.edu</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">Admin</span>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">Administration</td>
                          <td className="px-4 py-4">
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">5 hours ago</td>
                          <td className="px-4 py-4 text-sm">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-700">View</button>
                              <button className="text-green-600 hover:text-green-700">Edit</button>
                              <button className="text-red-600 hover:text-red-700">Archive</button>
                            </div>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-4">
                            <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="h-8 w-8 bg-gray-500 rounded-full flex items-center justify-center">
                                <User className="h-4 w-4 text-white" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">John Doe</p>
                                <p className="text-sm text-gray-600">john.doe@alumni.com</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Alumni</span>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">Class of 2020</td>
                          <td className="px-4 py-4">
                            <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Archived</span>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">1 year ago</td>
                          <td className="px-4 py-4 text-sm">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-700">View</button>
                              <button className="text-green-600 hover:text-green-700">Restore</button>
                              <button className="text-red-600 hover:text-red-700">Delete</button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Super Admin Tools */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Super Admin Tools</h3>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All Tools</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Camera className="h-5 w-5 text-blue-600" />
                        </div>
                        <h4 className="font-medium text-gray-900">ID Card Generator</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Bulk generate and print student/staff ID cards with photos and barcodes</p>
                      <button className="w-full bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 text-sm">
                        Generate IDs
                      </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Mail className="h-5 w-5 text-green-600" />
                        </div>
                        <h4 className="font-medium text-gray-900">Parent Portal Reset</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Reset parent portal access and resend login instructions</p>
                      <button className="w-full bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 text-sm">
                        Reset Access
                      </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Users className="h-5 w-5 text-purple-600" />
                        </div>
                        <h4 className="font-medium text-gray-900">User Merging Tool</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Detect and merge duplicate user accounts to clean database</p>
                      <button className="w-full bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 text-sm">
                        Find Duplicates
                      </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <MessageSquare className="h-5 w-5 text-orange-600" />
                        </div>
                        <h4 className="font-medium text-gray-900">Bulk Communication</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Send SMS or emails to selected user groups</p>
                      <button className="w-full bg-orange-600 text-white px-3 py-2 rounded-lg hover:bg-orange-700 text-sm">
                        Send Messages
                      </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <Activity className="h-5 w-5 text-red-600" />
                        </div>
                        <h4 className="font-medium text-gray-900">Bulk Status Update</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Activate, deactivate, or archive multiple users at once</p>
                      <button className="w-full bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 text-sm">
                        Update Status
                      </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="h-10 w-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <Clock className="h-5 w-5 text-yellow-600" />
                        </div>
                        <h4 className="font-medium text-gray-900">Session Management</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">View active sessions and force logout users</p>
                      <button className="w-full bg-yellow-600 text-white px-3 py-2 rounded-lg hover:bg-yellow-700 text-sm">
                        Manage Sessions
                      </button>
                    </div>
                  </div>
                </div>

                {/* Alumni Management */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Alumni & Archival Management</h3>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View Alumni Directory</button>
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">Export Alumni</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Alumni Statistics</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-600">Total Alumni</span>
                          <span className="font-semibold text-gray-900">1,234</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-600">This Year Graduates</span>
                          <span className="font-semibold text-gray-900">89</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-600">Active Alumni</span>
                          <span className="font-semibold text-gray-900">456</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Archival Operations</h4>
                      <div className="space-y-3">
                        <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">Graduate Batch</p>
                              <p className="text-sm text-gray-600">Archive graduating class</p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </div>
                        </button>
                        <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">Restore Archived</p>
                              <p className="text-sm text-gray-600">Reactivate archived users</p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </div>
                        </button>
                        <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">Data Cleanup</p>
                              <p className="text-sm text-gray-600">Remove old archived data</p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Academic Tab Content */}
            {activeTab === 'academic' && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Academic Management</h2>
                <p className="text-gray-600">Manage classes, subjects, and academic records.</p>
                <div className="mt-6">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Add New Class
                  </button>
                </div>
              </div>
            )}

            {/* Financial Tab Content */}
            {activeTab === 'financial' && (
              <div className="space-y-6">
                {/* Financial Header */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Financial Management</h2>
                    <div className="flex space-x-2">
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
                        <Plus className="h-4 w-4" />
                        <span>Create Bill</span>
                      </button>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                        <Download className="h-4 w-4" />
                        <span>Export Report</span>
                      </button>
                    </div>
                  </div>

                  {/* Financial Overview Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-green-600 font-medium">Total Revenue</p>
                          <p className="text-2xl font-bold text-green-900">GHS 456,789</p>
                          <p className="text-xs text-green-600 mt-1">+12% from last month</p>
                        </div>
                        <div className="h-12 w-12 bg-green-200 rounded-full flex items-center justify-center">
                          <TrendingUp className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-blue-600 font-medium">Pending Fees</p>
                          <p className="text-2xl font-bold text-blue-900">GHS 123,456</p>
                          <p className="text-xs text-blue-600 mt-1">234 students</p>
                        </div>
                        <div className="h-12 w-12 bg-blue-200 rounded-full flex items-center justify-center">
                          <AlertCircle className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-purple-600 font-medium">Total Expenses</p>
                          <p className="text-2xl font-bold text-purple-900">GHS 234,567</p>
                          <p className="text-xs text-purple-600 mt-1">This month</p>
                        </div>
                        <div className="h-12 w-12 bg-purple-200 rounded-full flex items-center justify-center">
                          <TrendingDown className="h-6 w-6 text-purple-600" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-orange-600 font-medium">Net Position</p>
                          <p className="text-2xl font-bold text-orange-900">GHS 222,222</p>
                          <p className="text-xs text-orange-600 mt-1">Profit</p>
                        </div>
                        <div className="h-12 w-12 bg-orange-200 rounded-full flex items-center justify-center">
                          <Target className="h-6 w-6 text-orange-600" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Filter Controls */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>2024-2025</option>
                          <option>2023-2024</option>
                          <option>2022-2023</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Term</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>Fall Term</option>
                          <option>Spring Term</option>
                          <option>Summer Term</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>All Classes</option>
                          <option>Grade 10A</option>
                          <option>Grade 10B</option>
                          <option>Grade 11A</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>All Reports</option>
                          <option>Billing Summary</option>
                          <option>Payment Collected</option>
                          <option>Receipts Issued</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Billing Operations */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Billing Operations</h3>
                    </div>
                    <div className="space-y-3">
                      <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Create Single Bill</p>
                            <p className="text-sm text-gray-600">Generate bill for individual student</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </button>
                      <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Bulk Bill Generation</p>
                            <p className="text-sm text-gray-600">Create bills for class/grade</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </button>
                      <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Bill Review & Approval</p>
                            <p className="text-sm text-gray-600">Review generated bills</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Payment Processing */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Payment Processing</h3>
                    </div>
                    <div className="space-y-3">
                      <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Manual Payment Entry</p>
                            <p className="text-sm text-gray-600">Record offline payments</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </button>
                      <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Generate Receipt</p>
                            <p className="text-sm text-gray-600">Create official receipt</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </button>
                      <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">View All Transactions</p>
                            <p className="text-sm text-gray-600">Complete payment ledger</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Student Financial */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Users className="h-5 w-5 text-purple-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Student Financial</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 border border-gray-200 rounded-lg">
                        <input
                          type="text"
                          placeholder="Search student..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Student Ledger View</p>
                            <p className="text-sm text-gray-600">Complete financial history</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </button>
                      <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Payment Plan Tracking</p>
                            <p className="text-sm text-gray-600">Installment management</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Recent Transactions Table */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                          <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                          <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm text-gray-900">2024-03-15</td>
                          <td className="px-4 py-4 text-sm text-gray-900">Kofi Asante</td>
                          <td className="px-4 py-4 text-sm">
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Payment</span>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">Tuition Fee - Fall Term</td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-900">GHS 2,500</td>
                          <td className="px-4 py-4 text-sm">
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Paid</span>
                          </td>
                          <td className="px-4 py-4 text-sm">
                            <button className="text-blue-600 hover:text-blue-700">View Receipt</button>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm text-gray-900">2024-03-14</td>
                          <td className="px-4 py-4 text-sm text-gray-900">Ama Mensah</td>
                          <td className="px-4 py-4 text-sm">
                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Bill</span>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">Lab Fees - Science</td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-900">GHS 150</td>
                          <td className="px-4 py-4 text-sm">
                            <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Pending</span>
                          </td>
                          <td className="px-4 py-4 text-sm">
                            <button className="text-blue-600 hover:text-blue-700">View Details</button>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm text-gray-900">2024-03-13</td>
                          <td className="px-4 py-4 text-sm text-gray-900">Yaa Boateng</td>
                          <td className="px-4 py-4 text-sm">
                            <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Refund</span>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">Overpayment Refund</td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-900">GHS 500</td>
                          <td className="px-4 py-4 text-sm">
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Processed</span>
                          </td>
                          <td className="px-4 py-4 text-sm">
                            <button className="text-blue-600 hover:text-blue-700">View Receipt</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Income & Expenditure Summary */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Income Breakdown */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Income Breakdown</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <GraduationCap className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Tuition Fees</p>
                            <p className="text-sm text-gray-600">85% of total income</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">GHS 388,270</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                            <Activity className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Activity Fees</p>
                            <p className="text-sm text-gray-600">8% of total income</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">GHS 36,543</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <BookOpen className="h-4 w-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Lab & Library</p>
                            <p className="text-sm text-gray-600">4% of total income</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">GHS 18,271</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                            <Star className="h-4 w-4 text-orange-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Other Income</p>
                            <p className="text-sm text-gray-600">3% of total income</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">GHS 13,705</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expenditure Breakdown */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Expenditure Breakdown</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                            <Users className="h-4 w-4 text-red-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Salaries & Wages</p>
                            <p className="text-sm text-gray-600">65% of expenses</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">GHS 152,468</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                            <Zap className="h-4 w-4 text-yellow-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Utilities</p>
                            <p className="text-sm text-gray-600">15% of expenses</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">GHS 35,185</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Briefcase className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Operations</p>
                            <p className="text-sm text-gray-600">12% of expenses</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">GHS 28,148</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <Globe className="h-4 w-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Maintenance</p>
                            <p className="text-sm text-gray-600">8% of expenses</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">GHS 18,766</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notifications & Alerts */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Notifications & Alerts</h3>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Configure</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Fee Reminders</h4>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" defaultChecked />
                          <span className="text-sm text-gray-700">Send reminders 7 days before due date</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" defaultChecked />
                          <span className="text-sm text-gray-700">Send reminders 3 days before due date</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" defaultChecked />
                          <span className="text-sm text-gray-700">Send reminder on due date</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Payment Confirmations</h4>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" defaultChecked />
                          <span className="text-sm text-gray-700">Send SMS confirmation</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" defaultChecked />
                          <span className="text-sm text-gray-700">Send email receipt</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                          <span className="text-sm text-gray-700">Notify class teacher</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Reports Tab Content */}
            {activeTab === 'reports' && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Reports & Analytics</h2>
                <p className="text-gray-600">View and generate various school reports.</p>
                <div className="mt-6">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Generate Report
                  </button>
                </div>
              </div>
            )}

            {/* System Tab Content */}
            {activeTab === 'system' && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">System Settings</h2>
                <p className="text-gray-600">Configure system settings and preferences.</p>
                <div className="mt-6">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Update Settings
                  </button>
                </div>
              </div>
            )}

            {/* Messages Tab Content */}
            {activeTab === 'messages' && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Messages & Communication</h2>
                <p className="text-gray-600">Manage school communications and announcements.</p>
                <div className="mt-6">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Send Announcement
                  </button>
                </div>
              </div>
            )}

            {/* Settings Tab Content */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
                <p className="text-gray-600">Manage portal settings and configurations.</p>
                <div className="mt-6">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Update Configuration
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
