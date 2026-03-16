'use client';

import { useState } from 'react';
import { 
  Menu, 
  X, 
  Search, 
  Bell, 
  User, 
  ChevronDown,
  ChevronRight,
  Home,
  Users,
  DollarSign,
  BookOpen,
  Calendar,
  Settings,
  FileText,
  BarChart3,
  TrendingUp,
  Download,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  Activity,
  Database,
  Info,
  LogOut,
  Shield,
  GraduationCap,
  Star,
  MapPin,
  Camera,
  TrendingDown,
  Briefcase,
  PieChart,
  LineChart,
  Globe,
  Zap,
  Video,
  Mail,
  HardDrive,
  Target,
  Award,
  Save,
  ImageIcon,
  MessageSquare,
  Upload,
  Eye
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

  const handleTabChange = (tabId: string) => {
    console.log('🔄 Tab changing to:', tabId);
    setActiveTab(tabId);
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
                onClick={() => handleTabChange(item.id)}
              />
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
          <div className="p-6">
            {/* Debug Info */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <p className="text-yellow-800 text-sm">🔍 Debug: Active Tab = {activeTab}</p>
            </div>
            
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
              <div className="space-y-6">
                {/* Academic Management Header */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Academic Management</h2>
                    <div className="flex space-x-2">
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
                        <Plus className="h-4 w-4" />
                        <span>Add Course</span>
                      </button>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>Academic Calendar</span>
                      </button>
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center space-x-2">
                        <BarChart3 className="h-4 w-4" />
                        <span>Gradebook Overview</span>
                      </button>
                    </div>
                  </div>

                  {/* Academic Statistics Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-blue-600 font-medium">Total Courses</p>
                          <p className="text-2xl font-bold text-blue-900">127</p>
                          <p className="text-xs text-blue-600 mt-1">Active this term</p>
                        </div>
                        <div className="h-12 w-12 bg-blue-200 rounded-full flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-green-600 font-medium">Classes</p>
                          <p className="text-2xl font-bold text-green-900">48</p>
                          <p className="text-xs text-green-600 mt-1">Across all grades</p>
                        </div>
                        <div className="h-12 w-12 bg-green-200 rounded-full flex items-center justify-center">
                          <GraduationCap className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-purple-600 font-medium">Teachers</p>
                          <p className="text-2xl font-bold text-purple-900">87</p>
                          <p className="text-xs text-purple-600 mt-1">Active faculty</p>
                        </div>
                        <div className="h-12 w-12 bg-purple-200 rounded-full flex items-center justify-center">
                          <Users className="h-6 w-6 text-purple-600" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-orange-600 font-medium">Avg Attendance</p>
                          <p className="text-2xl font-bold text-orange-900">94.2%</p>
                          <p className="text-xs text-orange-600 mt-1">This week</p>
                        </div>
                        <div className="h-12 w-12 bg-orange-200 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-6 w-6 text-orange-600" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Academic Calendar Overview */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Academic Period</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>2024-2025</option>
                          <option>2023-2024</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Term/Semester</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>Fall Term</option>
                          <option>Spring Term</option>
                          <option>Summer Term</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Grading Period</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>Quarter 1</option>
                          <option>Quarter 2</option>
                          <option>Mid-Term</option>
                          <option>Final Exams</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Campus/Branch</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>Main Campus</option>
                          <option>North Campus</option>
                          <option>South Campus</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Curriculum Management */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Curriculum Management</h3>
                    </div>
                    <div className="space-y-3">
                      <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Course Catalog</p>
                            <p className="text-sm text-gray-600">Manage all courses</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </button>
                      <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Program Requirements</p>
                            <p className="text-sm text-gray-600">Define completion criteria</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </button>
                      <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Prerequisites</p>
                            <p className="text-sm text-gray-600">Set course requirements</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Gradebook Management */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <BarChart3 className="h-5 w-5 text-purple-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Gradebook Management</h3>
                    </div>
                    <div className="space-y-3">
                      <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Grading Scales</p>
                            <p className="text-sm text-gray-600">Configure grade systems</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </button>
                      <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Gradebook Templates</p>
                            <p className="text-sm text-gray-600">Assignment categories</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </button>
                      <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Grade Publishing</p>
                            <p className="text-sm text-gray-600">Approval workflow</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Assessment & Attendance */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-green-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Assessment & Attendance</h3>
                    </div>
                    <div className="space-y-3">
                      <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Exam Scheduling</p>
                            <p className="text-sm text-gray-600">Plan assessments</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </button>
                      <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Attendance Rules</p>
                            <p className="text-sm text-gray-600">Set policies</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </button>
                      <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Report Cards</p>
                            <p className="text-sm text-gray-600">Generate reports</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Gradebook Overview Dashboard */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Gradebook Overview</h3>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All Classes</button>
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">Export Grades</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Gradebook Heat Map */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Class Gradebook Status</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center space-x-3">
                            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm font-medium text-gray-900">Grade 10A - Mathematics</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-green-600">Complete</span>
                            <span className="text-xs text-gray-600">Avg: 85%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                          <div className="flex items-center space-x-3">
                            <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                            <span className="text-sm font-medium text-gray-900">Grade 10B - Science</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-yellow-600">Missing Grades</span>
                            <span className="text-xs text-gray-600">3 assignments</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center space-x-3">
                            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm font-medium text-gray-900">Grade 11A - English</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-green-600">Complete</span>
                            <span className="text-xs text-gray-600">Avg: 88%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                          <div className="flex items-center space-x-3">
                            <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                            <span className="text-sm font-medium text-gray-900">Grade 9A - History</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-red-600">Overdue</span>
                            <span className="text-xs text-gray-600">5 days late</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Grade Distribution */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Grade Distribution</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600">A (90-100)</span>
                            <span className="text-sm font-medium text-gray-900">23%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{width: '23%'}}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600">B (80-89)</span>
                            <span className="text-sm font-medium text-gray-900">34%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{width: '34%'}}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600">C (70-79)</span>
                            <span className="text-sm font-medium text-gray-900">28%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{width: '28%'}}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600">D (60-69)</span>
                            <span className="text-sm font-medium text-gray-900">12%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-orange-500 h-2 rounded-full" style={{width: '12%'}}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600">F (Below 60)</span>
                            <span className="text-sm font-medium text-gray-900">3%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-red-500 h-2 rounded-full" style={{width: '3%'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Course Schedule Grid */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Master Schedule Viewer</h3>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Week View</button>
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">Day View</button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border">Time</th>
                          <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border">Monday</th>
                          <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border">Tuesday</th>
                          <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border">Wednesday</th>
                          <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border">Thursday</th>
                          <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border">Friday</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900 border">8:00 - 9:00</td>
                          <td className="px-4 py-3 border">
                            <div className="bg-blue-50 p-2 rounded text-xs">
                              <p className="font-medium text-blue-900">Math 10A</p>
                              <p className="text-blue-600">Mrs. Mensah</p>
                              <p className="text-gray-500">Room 201</p>
                            </div>
                          </td>
                          <td className="px-4 py-3 border">
                            <div className="bg-green-50 p-2 rounded text-xs">
                              <p className="font-medium text-green-900">English 10B</p>
                              <p className="text-green-600">Mr. Asante</p>
                              <p className="text-gray-500">Room 203</p>
                            </div>
                          </td>
                          <td className="px-4 py-3 border">
                            <div className="bg-purple-50 p-2 rounded text-xs">
                              <p className="font-medium text-purple-900">Science 10A</p>
                              <p className="text-purple-600">Dr. Boateng</p>
                              <p className="text-gray-500">Lab 101</p>
                            </div>
                          </td>
                          <td className="px-4 py-3 border">
                            <div className="bg-blue-50 p-2 rounded text-xs">
                              <p className="font-medium text-blue-900">Math 10A</p>
                              <p className="text-blue-600">Mrs. Mensah</p>
                              <p className="text-gray-500">Room 201</p>
                            </div>
                          </td>
                          <td className="px-4 py-3 border">
                            <div className="bg-orange-50 p-2 rounded text-xs">
                              <p className="font-medium text-orange-900">History 10B</p>
                              <p className="text-orange-600">Ms. Johnson</p>
                              <p className="text-gray-500">Room 205</p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900 border">9:00 - 10:00</td>
                          <td className="px-4 py-3 border">
                            <div className="bg-green-50 p-2 rounded text-xs">
                              <p className="font-medium text-green-900">English 10A</p>
                              <p className="text-green-600">Mr. Asante</p>
                              <p className="text-gray-500">Room 203</p>
                            </div>
                          </td>
                          <td className="px-4 py-3 border">
                            <div className="bg-purple-50 p-2 rounded text-xs">
                              <p className="font-medium text-purple-900">Science 10B</p>
                              <p className="text-purple-600">Dr. Boateng</p>
                              <p className="text-gray-500">Lab 102</p>
                            </div>
                          </td>
                          <td className="px-4 py-3 border">
                            <div className="bg-blue-50 p-2 rounded text-xs">
                              <p className="font-medium text-blue-900">Math 10B</p>
                              <p className="text-blue-600">Mrs. Mensah</p>
                              <p className="text-gray-500">Room 202</p>
                            </div>
                          </td>
                          <td className="px-4 py-3 border">
                            <div className="bg-green-50 p-2 rounded text-xs">
                              <p className="font-medium text-green-900">English 10A</p>
                              <p className="text-green-600">Mr. Asante</p>
                              <p className="text-gray-500">Room 203</p>
                            </div>
                          </td>
                          <td className="px-4 py-3 border">
                            <div className="bg-purple-50 p-2 rounded text-xs">
                              <p className="font-medium text-purple-900">Science 10A</p>
                              <p className="text-purple-600">Dr. Boateng</p>
                              <p className="text-gray-500">Lab 101</p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Academic Progress Monitoring */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* At-Risk Students */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">At-Risk Students</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 bg-red-500 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Kofi Mensah</p>
                            <p className="text-sm text-gray-600">Grade 10A - Avg: 58%</p>
                          </div>
                        </div>
                        <button className="text-red-600 hover:text-red-700 text-sm">Intervene</button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 bg-orange-500 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Ama Asante</p>
                            <p className="text-sm text-gray-600">Grade 11B - Avg: 65%</p>
                          </div>
                        </div>
                        <button className="text-orange-600 hover:text-orange-700 text-sm">Monitor</button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 bg-yellow-500 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Yaa Boateng</p>
                            <p className="text-sm text-gray-600">Grade 9A - Avg: 72%</p>
                          </div>
                        </div>
                        <button className="text-yellow-600 hover:text-yellow-700 text-sm">Support</button>
                      </div>
                    </div>
                  </div>

                  {/* Academic Achievement */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Achievement</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                            <Award className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Honor Roll</p>
                            <p className="text-sm text-gray-600">45 students (3.6% GPA+)</p>
                          </div>
                        </div>
                        <button className="text-green-600 hover:text-green-700 text-sm">View List</button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <Star className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Perfect Attendance</p>
                            <p className="text-sm text-gray-600">127 students (100% attendance)</p>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 text-sm">View List</button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 bg-purple-500 rounded-full flex items-center justify-center">
                            <Target className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Most Improved</p>
                            <p className="text-sm text-gray-600">23 students (+15% avg improvement)</p>
                          </div>
                        </div>
                        <button className="text-purple-600 hover:text-purple-700 text-sm">View List</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Teacher Tools & Resources */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Teacher Tools & Resources</h3>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Add Resource</button>
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">Schedule Observation</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <h4 className="font-medium text-gray-900">Lesson Plan Repository</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">View and manage lesson plans submitted by teachers</p>
                      <button className="w-full bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 text-sm">
                        View Plans
                      </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Database className="h-5 w-5 text-green-600" />
                        </div>
                        <h4 className="font-medium text-gray-900">Resource Library</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Upload and manage shared teaching resources</p>
                      <button className="w-full bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 text-sm">
                        Browse Resources
                      </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Eye className="h-5 w-5 text-purple-600" />
                        </div>
                        <h4 className="font-medium text-gray-900">Classroom Observations</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Schedule and log classroom observations</p>
                      <button className="w-full bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 text-sm">
                        Schedule Observation
                      </button>
                    </div>
                  </div>
                </div>

                {/* Assessment Management */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Assessment Management</h3>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Schedule Exam</button>
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">View Results</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Upcoming Assessments</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div>
                            <p className="font-medium text-gray-900">Mid-Term Exams</p>
                            <p className="text-sm text-gray-600">All Grades - Oct 15-20</p>
                          </div>
                          <span className="text-xs text-blue-600">5 days</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                          <div>
                            <p className="font-medium text-gray-900">Science Fair</p>
                            <p className="text-sm text-gray-600">Grade 10 - Oct 25</p>
                          </div>
                          <span className="text-xs text-green-600">15 days</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                          <div>
                            <p className="font-medium text-gray-900">Math Competition</p>
                            <p className="text-sm text-gray-600">Selected Students - Nov 5</p>
                          </div>
                          <span className="text-xs text-purple-600">26 days</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Recent Assessment Results</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div>
                            <p className="font-medium text-gray-900">Quarter 1 Tests</p>
                            <p className="text-sm text-gray-600">Completed - Avg: 82%</p>
                          </div>
                          <button className="text-blue-600 hover:text-blue-700 text-sm">View Details</button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div>
                            <p className="font-medium text-gray-900">Reading Assessment</p>
                            <p className="text-sm text-gray-600">Grade 7 - Avg: 78%</p>
                          </div>
                          <button className="text-blue-600 hover:text-blue-700 text-sm">View Details</button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div>
                            <p className="font-medium text-gray-900">Math Quiz</p>
                            <p className="text-sm text-gray-600">Grade 8 - Avg: 85%</p>
                          </div>
                          <button className="text-blue-600 hover:text-blue-700 text-sm">View Details</button>
                        </div>
                      </div>
                    </div>
                  </div>
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
              <div className="space-y-6">
                {/* Reports Header */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Business Intelligence Hub</h2>
                    <div className="flex space-x-2">
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
                        <Plus className="h-4 w-4" />
                        <span>Create Report</span>
                      </button>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                        <BarChart3 className="h-4 w-4" />
                        <span>Dashboard Builder</span>
                      </button>
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center space-x-2">
                        <Download className="h-4 w-4" />
                        <span>Export All</span>
                      </button>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-blue-600 font-medium">Total Reports</p>
                          <p className="text-2xl font-bold text-blue-900">47</p>
                          <p className="text-xs text-blue-600 mt-1">Active this month</p>
                        </div>
                        <div className="h-12 w-12 bg-blue-200 rounded-full flex items-center justify-center">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-green-600 font-medium">Scheduled Reports</p>
                          <p className="text-2xl font-bold text-green-900">12</p>
                          <p className="text-xs text-green-600 mt-1">Automated delivery</p>
                        </div>
                        <div className="h-12 w-12 bg-green-200 rounded-full flex items-center justify-center">
                          <Clock className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-purple-600 font-medium">AI Insights</p>
                          <p className="text-2xl font-bold text-purple-900">8</p>
                          <p className="text-xs text-purple-600 mt-1">Predictive alerts</p>
                        </div>
                        <div className="h-12 w-12 bg-purple-200 rounded-full flex items-center justify-center">
                          <Target className="h-6 w-6 text-purple-600" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-orange-600 font-medium">Subscribers</p>
                          <p className="text-2xl font-bold text-orange-900">156</p>
                          <p className="text-xs text-orange-600 mt-1">Active users</p>
                        </div>
                        <div className="h-12 w-12 bg-orange-200 rounded-full flex items-center justify-center">
                          <Users className="h-6 w-6 text-orange-600" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Report Filters */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Report Category</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>All Categories</option>
                          <option>Academic</option>
                          <option>Financial</option>
                          <option>Operational</option>
                          <option>HR</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>Last 30 Days</option>
                          <option>Last Quarter</option>
                          <option>This Year</option>
                          <option>Custom Range</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>All Formats</option>
                          <option>PDF</option>
                          <option>Excel</option>
                          <option>CSV</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>All Status</option>
                          <option>Completed</option>
                          <option>Running</option>
                          <option>Scheduled</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Dashboards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Executive Dashboard */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Executive Dashboard</h3>
                      <button className="text-blue-600 hover:text-blue-700 text-sm">View Details</button>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm text-blue-600 font-medium">Total Revenue</p>
                          <p className="text-xl font-bold text-blue-900">GHS 456K</p>
                          <p className="text-xs text-blue-600">+12% vs last month</p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-sm text-green-600 font-medium">Active Students</p>
                          <p className="text-xl font-bold text-green-900">1,245</p>
                          <p className="text-xs text-green-600">+5% vs last term</p>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-lg">
                          <p className="text-sm text-purple-600 font-medium">Avg Grade</p>
                          <p className="text-xl font-bold text-purple-900">82.3%</p>
                          <p className="text-xs text-purple-600">+2.1% improvement</p>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-lg">
                          <p className="text-sm text-orange-600 font-medium">Attendance</p>
                          <p className="text-xl font-bold text-orange-900">94.2%</p>
                          <p className="text-xs text-orange-600">Stable</p>
                        </div>
                      </div>
                      <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                        <BarChart3 className="h-8 w-8 text-gray-400" />
                        <span className="text-gray-500 ml-2">Revenue Trend Chart</span>
                      </div>
                    </div>
                  </div>

                  {/* Academic Performance Dashboard */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Academic Performance</h3>
                      <button className="text-blue-600 hover:text-blue-700 text-sm">View Details</button>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-sm text-green-600 font-medium">Pass Rate</p>
                          <p className="text-xl font-bold text-green-900">96.8%</p>
                          <p className="text-xs text-green-600">+1.2% vs last term</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm text-blue-600 font-medium">Honor Roll</p>
                          <p className="text-xl font-bold text-blue-900">45</p>
                          <p className="text-xs text-blue-600">3.6% of students</p>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-lg">
                          <p className="text-sm text-purple-600 font-medium">At Risk</p>
                          <p className="text-xl font-bold text-purple-900">23</p>
                          <p className="text-xs text-purple-600">Requires intervention</p>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-lg">
                          <p className="text-sm text-orange-600 font-medium">Teacher Avg</p>
                          <p className="text-xl font-bold text-orange-900">85.2%</p>
                          <p className="text-xs text-orange-600">Grading consistency</p>
                        </div>
                      </div>
                      <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                        <LineChart className="h-8 w-8 text-gray-400" />
                        <span className="text-gray-500 ml-2">Grade Distribution</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Advanced Report Library */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Advanced Report Library</h3>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Custom Builder</button>
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">Schedule Report</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Academic Reports */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Academic Reports</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                          <div>
                            <p className="font-medium text-gray-900">Grade Distribution Analysis</p>
                            <p className="text-sm text-gray-600">Last run: 2 hours ago</p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-700 text-sm">Run</button>
                            <button className="text-green-600 hover:text-green-700 text-sm">Export</button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                          <div>
                            <p className="font-medium text-gray-900">Teacher Grading Patterns</p>
                            <p className="text-sm text-gray-600">Last run: 1 day ago</p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-700 text-sm">Run</button>
                            <button className="text-green-600 hover:text-green-700 text-sm">Export</button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                          <div>
                            <p className="font-medium text-gray-900">Standards Mastery Report</p>
                            <p className="text-sm text-gray-600">Last run: 3 days ago</p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-700 text-sm">Run</button>
                            <button className="text-green-600 hover:text-green-700 text-sm">Export</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Financial Reports */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Financial Reports</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                          <div>
                            <p className="font-medium text-gray-900">Aging Receivables</p>
                            <p className="text-sm text-gray-600">Last run: 1 hour ago</p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-700 text-sm">Run</button>
                            <button className="text-green-600 hover:text-green-700 text-sm">Export</button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                          <div>
                            <p className="font-medium text-gray-900">Revenue by Fee Type</p>
                            <p className="text-sm text-gray-600">Last run: 4 hours ago</p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-700 text-sm">Run</button>
                            <button className="text-green-600 hover:text-green-700 text-sm">Export</button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                          <div>
                            <p className="font-medium text-gray-900">Expense Variance Analysis</p>
                            <p className="text-sm text-gray-600">Last run: 2 days ago</p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-700 text-sm">Run</button>
                            <button className="text-green-600 hover:text-green-700 text-sm">Export</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Operational Reports */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Operational Reports</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                          <div>
                            <p className="font-medium text-gray-900">Attendance Summaries</p>
                            <p className="text-sm text-gray-600">Last run: 30 min ago</p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-700 text-sm">Run</button>
                            <button className="text-green-600 hover:text-green-700 text-sm">Export</button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                          <div>
                            <p className="font-medium text-gray-900">Transport Route Efficiency</p>
                            <p className="text-sm text-gray-600">Last run: 6 hours ago</p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-700 text-sm">Run</button>
                            <button className="text-green-600 hover:text-green-700 text-sm">Export</button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                          <div>
                            <p className="font-medium text-gray-900">Library Circulation</p>
                            <p className="text-sm text-gray-600">Last run: 1 day ago</p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-700 text-sm">Run</button>
                            <button className="text-green-600 hover:text-green-700 text-sm">Export</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Predictive Analytics & AI Insights */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">AI-Powered Insights</h3>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Configure AI</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <AlertCircle className="h-5 w-5 text-red-600" />
                        </div>
                        <h4 className="font-medium text-gray-900">At-Risk Students</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">AI identified 12 students at risk of dropping out</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Kofi Mensah</span>
                          <span className="text-red-600 font-medium">85% risk</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Ama Asante</span>
                          <span className="text-orange-600 font-medium">72% risk</span>
                        </div>
                      </div>
                      <button className="w-full mt-3 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 text-sm">
                        View Details
                      </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <TrendingUp className="h-5 w-5 text-blue-600" />
                        </div>
                        <h4 className="font-medium text-gray-900">Enrollment Forecast</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Predicted 1,312 students next term (+5.3%)</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Current</span>
                          <span className="text-gray-900 font-medium">1,245</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Predicted</span>
                          <span className="text-blue-600 font-medium">1,312</span>
                        </div>
                      </div>
                      <button className="w-full mt-3 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 text-sm">
                        View Forecast
                      </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <DollarSign className="h-5 w-5 text-green-600" />
                        </div>
                        <h4 className="font-medium text-gray-900">Financial Projections</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Q4 revenue projected: GHS 523,400</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Confidence</span>
                          <span className="text-green-600 font-medium">87%</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Range</span>
                          <span className="text-gray-900 font-medium">±8%</span>
                        </div>
                      </div>
                      <button className="w-full mt-3 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 text-sm">
                        View Projections
                      </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Activity className="h-5 w-5 text-purple-600" />
                        </div>
                        <h4 className="font-medium text-gray-900">Anomaly Detection</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">3 unusual patterns detected this week</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Library fines</span>
                          <span className="text-purple-600 font-medium">+500%</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Math grades</span>
                          <span className="text-orange-600 font-medium">-15%</span>
                        </div>
                      </div>
                      <button className="w-full mt-3 bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 text-sm">
                        Investigate
                      </button>
                    </div>
                  </div>
                </div>

                {/* Report Scheduling & Distribution */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Scheduled Reports</h3>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Add Schedule</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Report Name</th>
                          <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                          <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Format</th>
                          <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Recipients</th>
                          <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm font-medium text-gray-900">Weekly Financial Summary</td>
                          <td className="px-4 py-4 text-sm text-gray-600">Every Friday 4:00 PM</td>
                          <td className="px-4 py-4 text-sm text-gray-600">PDF, Excel</td>
                          <td className="px-4 py-4 text-sm text-gray-600">Finance Team (5)</td>
                          <td className="px-4 py-4">
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
                          </td>
                          <td className="px-4 py-4 text-sm">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-700">Edit</button>
                              <button className="text-red-600 hover:text-red-700">Disable</button>
                            </div>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm font-medium text-gray-900">Monthly Attendance Report</td>
                          <td className="px-4 py-4 text-sm text-gray-600">1st of month 9:00 AM</td>
                          <td className="px-4 py-4 text-sm text-gray-600">PDF</td>
                          <td className="px-4 py-4 text-sm text-gray-600">All Teachers (12)</td>
                          <td className="px-4 py-4">
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
                          </td>
                          <td className="px-4 py-4 text-sm">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-700">Edit</button>
                              <button className="text-red-600 hover:text-red-700">Disable</button>
                            </div>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm font-medium text-gray-900">Academic Performance Dashboard</td>
                          <td className="px-4 py-4 text-sm text-gray-600">Last day of month</td>
                          <td className="px-4 py-4 text-sm text-gray-600">PowerPoint</td>
                          <td className="px-4 py-4 text-sm text-gray-600">Management (8)</td>
                          <td className="px-4 py-4">
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
                          </td>
                          <td className="px-4 py-4 text-sm">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-700">Edit</button>
                              <button className="text-red-600 hover:text-red-700">Disable</button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* System Tab Content */}
            {activeTab === 'system' && (
              <div className="space-y-6">
                {/* System Header */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">System Command Center</h2>
                    <div className="flex space-x-2">
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
                        <Activity className="h-4 w-4" />
                        <span>Health Check</span>
                      </button>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                        <Settings className="h-4 w-4" />
                        <span>Configuration</span>
                      </button>
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center space-x-2">
                        <Database className="h-4 w-4" />
                        <span>Backup Now</span>
                      </button>
                    </div>
                  </div>

                  {/* System Health Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-green-600 font-medium">System Status</p>
                          <p className="text-2xl font-bold text-green-900">Healthy</p>
                          <p className="text-xs text-green-600 mt-1">99.9% uptime</p>
                        </div>
                        <div className="h-12 w-12 bg-green-200 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-blue-600 font-medium">CPU Usage</p>
                          <p className="text-2xl font-bold text-blue-900">42%</p>
                          <p className="text-xs text-blue-600 mt-1">Normal range</p>
                        </div>
                        <div className="h-12 w-12 bg-blue-200 rounded-full flex items-center justify-center">
                          <Activity className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-purple-600 font-medium">Memory</p>
                          <p className="text-2xl font-bold text-purple-900">6.2GB</p>
                          <p className="text-xs text-purple-600 mt-1">62% used</p>
                        </div>
                        <div className="h-12 w-12 bg-purple-200 rounded-full flex items-center justify-center">
                          <Database className="h-6 w-6 text-purple-600" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-orange-600 font-medium">Disk Space</p>
                          <p className="text-2xl font-bold text-orange-900">78%</p>
                          <p className="text-xs text-orange-600 mt-1">156GB free</p>
                        </div>
                        <div className="h-12 w-12 bg-orange-200 rounded-full flex items-center justify-center">
                          <Database className="h-6 w-6 text-orange-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live System Status Dashboard */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Live System Status</h3>
                    <div className="flex space-x-2">
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">Refresh</button>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Export Logs</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Server Status */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-gray-900">Server Performance</h4>
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Online</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Response Time</span>
                          <span className="text-sm font-medium text-gray-900">124ms</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Active Connections</span>
                          <span className="text-sm font-medium text-gray-900">234</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Server Load</span>
                          <span className="text-sm font-medium text-gray-900">0.42</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Uptime</span>
                          <span className="text-sm font-medium text-gray-900">45 days</span>
                        </div>
                      </div>
                    </div>

                    {/* Database Status */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-gray-900">Database Performance</h4>
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Healthy</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Query Response</span>
                          <span className="text-sm font-medium text-gray-900">23ms</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Connection Pool</span>
                          <span className="text-sm font-medium text-gray-900">45/100</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Cache Hit Rate</span>
                          <span className="text-sm font-medium text-gray-900">94.2%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Slow Queries</span>
                          <span className="text-sm font-medium text-gray-900">0</span>
                        </div>
                      </div>
                    </div>

                    {/* Service Status */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-gray-900">Service Health</h4>
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">All OK</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">API Gateway</span>
                          <span className="text-sm font-medium text-green-600">Operational</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Email Server</span>
                          <span className="text-sm font-medium text-green-600">Operational</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Payment Gateway</span>
                          <span className="text-sm font-medium text-green-600">Operational</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">File Storage</span>
                          <span className="text-sm font-medium text-green-600">Operational</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Advanced Configuration */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Advanced Configuration</h3>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All Settings</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Feature Flags */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Zap className="h-5 w-5 text-blue-600" />
                        </div>
                        <h4 className="font-medium text-gray-900">Feature Flags</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Mobile App Beta</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Advanced Analytics</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">AI Insights</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Global Settings */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Globe className="h-5 w-5 text-green-600" />
                        </div>
                        <h4 className="font-medium text-gray-900">Global Settings</h4>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                            <option>GMT (UTC+0)</option>
                            <option>GMT+1 (UTC+1)</option>
                            <option>GMT-5 (UTC-5)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                            <option>MM/DD/YYYY</option>
                            <option>DD/MM/YYYY</option>
                            <option>YYYY-MM-DD</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Default Language</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                            <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Security Settings */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Shield className="h-5 w-5 text-purple-600" />
                        </div>
                        <h4 className="font-medium text-gray-900">Security Settings</h4>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                            <option>30 minutes</option>
                            <option>1 hour</option>
                            <option>2 hours</option>
                            <option>4 hours</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Password Policy</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                            <option>Standard (8 chars)</option>
                            <option>Strong (12 chars + symbols)</option>
                            <option>Enterprise (15 chars + 2FA)</option>
                          </select>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Two-Factor Auth</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Integration Hub */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Integration Hub (iPaaS)</h3>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Add Integration</button>
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">Test All</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* API Gateway */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">API Gateway</h4>
                      <div className="space-y-3">
                        <div className="border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900">API Key Management</span>
                            <button className="text-blue-600 hover:text-blue-700 text-sm">Generate New</button>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">Production API</span>
                              <span className="text-green-600 font-medium">Active</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">Test API</span>
                              <span className="text-green-600 font-medium">Active</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">Last Rotation</span>
                              <span className="text-gray-900 font-medium">15 days ago</span>
                            </div>
                          </div>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900">Rate Limiting</span>
                            <button className="text-blue-600 hover:text-blue-700 text-sm">Configure</button>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">Default Limit</span>
                              <span className="text-gray-900 font-medium">1000/hr</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">Current Usage</span>
                              <span className="text-blue-600 font-medium">342/hr</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">Blocked Requests</span>
                              <span className="text-gray-900 font-medium">0</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pre-built Connectors */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Pre-built Connectors</h4>
                      <div className="space-y-3">
                        <div className="border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Video className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">Zoom Integration</p>
                                <p className="text-sm text-gray-600">Virtual classroom</p>
                              </div>
                            </div>
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Connected</span>
                          </div>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
                                <DollarSign className="h-4 w-4 text-green-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">Stripe Payment</p>
                                <p className="text-sm text-gray-600">Payment processing</p>
                              </div>
                            </div>
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Connected</span>
                          </div>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Mail className="h-4 w-4 text-purple-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">Google Workspace</p>
                                <p className="text-sm text-gray-600">Email & documents</p>
                              </div>
                            </div>
                            <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Setup</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data Management & Compliance */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Data Management & Compliance</h3>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Backup Now</button>
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">Schedule Backup</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Backup & Restore */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Database className="h-5 w-5 text-blue-600" />
                        </div>
                        <h4 className="font-medium text-gray-900">Backup & Restore</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Last Backup</span>
                          <span className="text-gray-900 font-medium">2 hours ago</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Backup Size</span>
                          <span className="text-gray-900 font-medium">2.4GB</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Next Scheduled</span>
                          <span className="text-gray-900 font-medium">6 hours</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Retention Period</span>
                          <span className="text-gray-900 font-medium">30 days</span>
                        </div>
                        <button className="w-full bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 text-sm">
                          Initiate Backup
                        </button>
                      </div>
                    </div>

                    {/* Data Retention */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Clock className="h-5 w-5 text-green-600" />
                        </div>
                        <h4 className="font-medium text-gray-900">Data Retention</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Login Logs</span>
                          <span className="text-gray-900 font-medium">1 year</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Financial Records</span>
                          <span className="text-gray-900 font-medium">7 years</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Academic Data</span>
                          <span className="text-gray-900 font-medium">5 years</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Audit Logs</span>
                          <span className="text-gray-900 font-medium">3 years</span>
                        </div>
                        <button className="w-full bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 text-sm">
                          Configure Policies
                        </button>
                      </div>
                    </div>

                    {/* GDPR Compliance */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Shield className="h-5 w-5 text-purple-600" />
                        </div>
                        <h4 className="font-medium text-gray-900">GDPR Compliance</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Data Portability</span>
                          <span className="text-green-600 font-medium">Enabled</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Right to Forget</span>
                          <span className="text-green-600 font-medium">Enabled</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Consent Tracking</span>
                          <span className="text-green-600 font-medium">Active</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Data Anonymization</span>
                          <span className="text-green-600 font-medium">Configured</span>
                        </div>
                        <button className="w-full bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 text-sm">
                          Manage Compliance
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Logs & Debugging */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Logs & Debugging</h3>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Filter Logs</button>
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">Download Logs</button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">Recent System Events</span>
                        <span className="text-xs text-gray-600">Last 100 entries</span>
                      </div>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        <div className="flex items-start space-x-2 text-xs">
                          <span className="text-green-600 font-medium">[INFO]</span>
                          <span className="text-gray-600">2024-03-16 14:23:45</span>
                          <span className="text-gray-900">System backup completed successfully</span>
                        </div>
                        <div className="flex items-start space-x-2 text-xs">
                          <span className="text-blue-600 font-medium">[DEBUG]</span>
                          <span className="text-gray-600">2024-03-16 14:22:12</span>
                          <span className="text-gray-900">API request processed: GET /api/students</span>
                        </div>
                        <div className="flex items-start space-x-2 text-xs">
                          <span className="text-yellow-600 font-medium">[WARN]</span>
                          <span className="text-gray-600">2024-03-16 14:20:33</span>
                          <span className="text-gray-900">High memory usage detected: 85%</span>
                        </div>
                        <div className="flex items-start space-x-2 text-xs">
                          <span className="text-green-600 font-medium">[INFO]</span>
                          <span className="text-gray-600">2024-03-16 14:18:21</span>
                          <span className="text-gray-900">User login: admin@adjis.edu</span>
                        </div>
                        <div className="flex items-start space-x-2 text-xs">
                          <span className="text-red-600 font-medium">[ERROR]</span>
                          <span className="text-gray-600">2024-03-16 14:15:47</span>
                          <span className="text-gray-900">Database connection timeout</span>
                        </div>
                      </div>
                    </div>
                  </div>
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
              <div className="space-y-6">
                {/* Settings Header */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Branding & Global Configuration</h2>
                    <div className="flex space-x-2">
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
                        <Save className="h-4 w-4" />
                        <span>Save Changes</span>
                      </button>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                        <Download className="h-4 w-4" />
                        <span>Export Config</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Institution Branding */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Institution Branding & Communication</h3>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Preview Changes</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Logo Management */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Logo Management</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Primary Logo (Light Background)</label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors cursor-pointer">
                            <div className="h-16 w-16 bg-gray-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                              <ImageIcon className="h-8 w-8 text-gray-400" />
                            </div>
                            <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                            <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Dark Logo (Dark Background)</label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors cursor-pointer">
                            <div className="h-16 w-16 bg-gray-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                              <ImageIcon className="h-8 w-8 text-gray-400" />
                            </div>
                            <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                            <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Favicon</label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors cursor-pointer">
                            <div className="h-12 w-12 bg-gray-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                              <ImageIcon className="h-6 w-6 text-gray-400" />
                            </div>
                            <p className="text-sm text-gray-600">Upload favicon</p>
                            <p className="text-xs text-gray-500">32x32px, ICO format</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Color Scheme */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Color Scheme</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                          <div className="flex items-center space-x-3">
                            <input type="color" value="#3B82F6" className="h-10 w-20 border border-gray-300 rounded-lg" />
                            <input type="text" value="#3B82F6" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
                          <div className="flex items-center space-x-3">
                            <input type="color" value="#10B981" className="h-10 w-20 border border-gray-300 rounded-lg" />
                            <input type="text" value="#10B981" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Accent Color</label>
                          <div className="flex items-center space-x-3">
                            <input type="color" value="#F59E0B" className="h-10 w-20 border border-gray-300 rounded-lg" />
                            <input type="text" value="#F59E0B" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Custom CSS</label>
                          <textarea 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg h-24 text-sm font-mono"
                            placeholder="/* Add custom CSS here */"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Communication Templates */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Communication Templates</h3>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Add Template</button>
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">Test Email</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Email Templates */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Email Templates</h4>
                      <div className="space-y-2">
                        <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">Welcome Email</span>
                            <button className="text-blue-600 hover:text-blue-700 text-xs">Edit</button>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">New user registration</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">Fee Reminder</span>
                            <button className="text-blue-600 hover:text-blue-700 text-xs">Edit</button>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">Payment due notifications</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">Grade Publication</span>
                            <button className="text-blue-600 hover:text-blue-700 text-xs">Edit</button>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">Grade release notifications</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">Password Reset</span>
                            <button className="text-blue-600 hover:text-blue-700 text-xs">Edit</button>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">Password recovery</p>
                        </div>
                      </div>
                    </div>

                    {/* SMS Templates */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">SMS Templates</h4>
                      <div className="space-y-2">
                        <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">Attendance Alert</span>
                            <button className="text-blue-600 hover:text-blue-700 text-xs">Edit</button>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">Student absence notifications</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">Urgent Closure</span>
                            <button className="text-blue-600 hover:text-blue-700 text-xs">Edit</button>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">Emergency school closure</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">Payment Confirmation</span>
                            <button className="text-blue-600 hover:text-blue-700 text-xs">Edit</button>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">Payment received alerts</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">Event Reminder</span>
                            <button className="text-blue-600 hover:text-blue-700 text-xs">Edit</button>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">Upcoming event notifications</p>
                        </div>
                      </div>
                    </div>

                    {/* PDF Letterheads */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">PDF Letterheads</h4>
                      <div className="space-y-2">
                        <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">Report Card</span>
                            <button className="text-blue-600 hover:text-blue-700 text-xs">Edit</button>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">Student report cards</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">Transcript</span>
                            <button className="text-blue-600 hover:text-blue-700 text-xs">Edit</button>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">Academic transcripts</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">Offer Letter</span>
                            <button className="text-blue-600 hover:text-blue-700 text-xs">Edit</button>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">Admission offers</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">Certificate</span>
                            <button className="text-blue-600 hover:text-blue-700 text-xs">Edit</button>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">Completion certificates</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Global Lists & Lookups */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Global Lists & Lookups (Master Data)</h3>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Add List</button>
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">Bulk Import</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Demographics</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors cursor-pointer">
                          <span className="text-sm text-gray-900">Nationalities</span>
                          <span className="text-xs text-gray-600">45 items</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors cursor-pointer">
                          <span className="text-sm text-gray-900">Languages</span>
                          <span className="text-xs text-gray-600">12 items</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors cursor-pointer">
                          <span className="text-sm text-gray-900">Religions</span>
                          <span className="text-xs text-gray-600">8 items</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors cursor-pointer">
                          <span className="text-sm text-gray-900">Blood Types</span>
                          <span className="text-xs text-gray-600">8 items</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Academic</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors cursor-pointer">
                          <span className="text-sm text-gray-900">Subject Codes</span>
                          <span className="text-xs text-gray-600">23 items</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors cursor-pointer">
                          <span className="text-sm text-gray-900">Grade Levels</span>
                          <span className="text-xs text-gray-600">13 items</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors cursor-pointer">
                          <span className="text-sm text-gray-900">Departments</span>
                          <span className="text-xs text-gray-600">7 items</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors cursor-pointer">
                          <span className="text-sm text-gray-900">Behavior Codes</span>
                          <span className="text-xs text-gray-600">15 items</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Operations</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors cursor-pointer">
                          <span className="text-sm text-gray-900">Relationship Types</span>
                          <span className="text-xs text-gray-600">6 items</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors cursor-pointer">
                          <span className="text-sm text-gray-900">Transport Stops</span>
                          <span className="text-xs text-gray-600">34 items</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors cursor-pointer">
                          <span className="text-sm text-gray-900">Hostel Names</span>
                          <span className="text-xs text-gray-600">4 items</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors cursor-pointer">
                          <span className="text-sm text-gray-900">Leave Types</span>
                          <span className="text-xs text-gray-600">8 items</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Academic Definitions */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Academic Definitions</h3>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Add Definition</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Grade Scale Manager */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <BarChart3 className="h-5 w-5 text-blue-600" />
                        </div>
                        <h4 className="font-medium text-gray-900">Grade Scale Manager</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">IB Scale (1-7)</span>
                          <span className="text-xs text-green-600 font-medium">Active</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">IGCSE (A*-G)</span>
                          <span className="text-xs text-green-600 font-medium">Active</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">US (A-F)</span>
                          <span className="text-xs text-green-600 font-medium">Active</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Percentage (0-100)</span>
                          <span className="text-xs text-gray-600 font-medium">Inactive</span>
                        </div>
                        <button className="w-full bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 text-sm">
                          Manage Scales
                        </button>
                      </div>
                    </div>

                    {/* Subject & Course Codes */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="h-5 w-5 text-green-600" />
                        </div>
                        <h4 className="font-medium text-gray-900">Subject & Course Codes</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Total Subjects</span>
                          <span className="text-gray-900 font-medium">23</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Course Codes</span>
                          <span className="text-gray-900 font-medium">156</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Last Updated</span>
                          <span className="text-gray-900 font-medium">2 weeks ago</span>
                        </div>
                        <button className="w-full bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 text-sm">
                          Manage Subjects
                        </button>
                      </div>
                    </div>

                    {/* Behavior & Conduct Codes */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Award className="h-5 w-5 text-purple-600" />
                        </div>
                        <h4 className="font-medium text-gray-900">Behavior & Conduct Codes</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Positive Codes</span>
                          <span className="text-gray-900 font-medium">8</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Disciplinary Codes</span>
                          <span className="text-gray-900 font-medium">7</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Community Service</span>
                          <span className="text-gray-900 font-medium">3</span>
                        </div>
                        <button className="w-full bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 text-sm">
                          Manage Codes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Financial Definitions */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Financial Definitions</h3>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Add Category</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Fee Type Management */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Fee Type Management</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors cursor-pointer">
                          <div>
                            <span className="text-sm font-medium text-gray-900">Tuition Fees</span>
                            <p className="text-xs text-gray-600">Taxable</p>
                          </div>
                          <button className="text-blue-600 hover:text-blue-700 text-xs">Edit</button>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors cursor-pointer">
                          <div>
                            <span className="text-sm font-medium text-gray-900">Transport Fees</span>
                            <p className="text-xs text-gray-600">Non-taxable</p>
                          </div>
                          <button className="text-blue-600 hover:text-blue-700 text-xs">Edit</button>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors cursor-pointer">
                          <div>
                            <span className="text-sm font-medium text-gray-900">Lab Fees</span>
                            <p className="text-xs text-gray-600">Taxable</p>
                          </div>
                          <button className="text-blue-600 hover:text-blue-700 text-xs">Edit</button>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors cursor-pointer">
                          <div>
                            <span className="text-sm font-medium text-gray-900">Library Fees</span>
                            <p className="text-xs text-gray-600">Non-taxable</p>
                          </div>
                          <button className="text-blue-600 hover:text-blue-700 text-xs">Edit</button>
                        </div>
                      </div>
                    </div>

                    {/* Payment Method Configuration */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Payment Method Configuration</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Cash</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Check</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Credit Card</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Bank Transfer</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Mobile Money</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notification & Alert Rules */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Notification & Alert Rules</h3>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Add Rule</button>
                  </div>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">Attendance Alert</h4>
                          <p className="text-sm text-gray-600">Send SMS to parents if student is marked absent for first period</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-gray-600">
                        <span>Trigger: First period absence</span>
                        <span>Channel: SMS</span>
                        <span>Recipients: Parents</span>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">High Payment Alert</h4>
                          <p className="text-sm text-gray-600">Send email to finance team if payment over $10,000 is received</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-gray-600">
                        <span>Trigger: Payment &gt; GHS 10,000</span>
                        <span>Channel: Email</span>
                        <span>Recipients: Finance Team</span>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">Late Assignment Alert</h4>
                          <p className="text-sm text-gray-600">Send in-app alert to teacher if 5 students submit assignment late</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-gray-600">
                        <span>Trigger: 5+ late submissions</span>
                        <span>Channel: In-App</span>
                        <span>Recipients: Teacher</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Localization */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Localization</h3>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Add Language</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Multi-Language Management */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Multi-Language Management</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">English</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Spanish</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">French</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Date/Time Formats */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Date/Time Formats</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                            <option>MM/DD/YYYY</option>
                            <option>DD/MM/YYYY</option>
                            <option>YYYY-MM-DD</option>
                            <option>DD-MM-YYYY</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Time Format</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                            <option>12-hour (AM/PM)</option>
                            <option>24-hour</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Week Start</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                            <option>Sunday</option>
                            <option>Monday</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Currency Settings */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Currency Settings</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Base Currency</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                            <option>GHS - Ghana Cedi</option>
                            <option>USD - US Dollar</option>
                            <option>EUR - Euro</option>
                            <option>GBP - British Pound</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Symbol Position</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                            <option>Before amount (GHS 100)</option>
                            <option>After amount (100 GHS)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Decimal Places</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                            <option>2 decimal places</option>
                            <option>0 decimal places</option>
                            <option>3 decimal places</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personal Preferences */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Super Admin Personal Preferences</h3>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Edit Profile</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* My Profile */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">My Profile</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                          <input type="text" value="Super Admin" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                          <input type="email" value="admin@adjis.edu" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                          <input type="tel" value="+233 24 123 4567" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                        </div>
                        <div className="flex space-x-2">
                          <button className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 text-sm">
                            Change Password
                          </button>
                          <button className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 text-sm">
                            Setup 2FA
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Dashboard Layout */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Dashboard Layout</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Default View</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                            <option>Default View</option>
                            <option>End-of-Term Review</option>
                            <option>Budget Planning</option>
                            <option>Academic Overview</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Widget Density</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                            <option>Comfortable</option>
                            <option>Compact</option>
                            <option>Spacious</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                            <option>Light</option>
                            <option>Dark</option>
                            <option>Auto</option>
                          </select>
                        </div>
                        <button className="w-full bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 text-sm">
                          Save Layout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          {/* Fallback for unknown tabs */}
            {!['dashboard', 'users', 'academic', 'financial', 'reports', 'system', 'messages', 'settings'].includes(activeTab) && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Tab Content</h2>
                <p className="text-gray-600">Content for "{activeTab}" tab is being loaded...</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
