'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  DollarSign, 
  BookOpen, 
  Calendar, 
  FileText, 
  Settings, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Target,
  BarChart3,
  PieChart,
  Download,
  Upload,
  Mail,
  Phone,
  Search,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  Plus,
  MoreHorizontal,
  Home,
  Briefcase,
  GraduationCap,
  Shield,
  Database,
  Globe,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  ChevronRight
} from 'lucide-react';

interface AdminStats {
  totalStudents: number;
  totalTeachers: number;
  totalParents: number;
  totalClasses: number;
  pendingFees: number;
  collectedFees: number;
  attendanceRate: number;
  upcomingEvents: number;
  activeAssignments: number;
  pendingReports: number;
  systemHealth: number;
}

interface ActivityItem {
  id: string;
  type: 'student' | 'payment' | 'assignment' | 'exam' | 'report' | 'meeting' | 'system';
  title: string;
  description: string;
  timestamp: Date;
  user: string;
  priority: 'high' | 'medium' | 'low';
  status?: 'completed' | 'pending' | 'overdue';
}

interface Department {
  name: string;
  head: string;
  teachers: number;
  students: number;
  performance: number;
  budget: number;
}

interface SystemAlert {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  resolved: boolean;
}

export default function ModernAdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('current_term');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const [adminStats] = useState<AdminStats>({
    totalStudents: 1245,
    totalTeachers: 87,
    totalParents: 2340,
    totalClasses: 28,
    pendingFees: 45678,
    collectedFees: 234567,
    attendanceRate: 94.2,
    upcomingEvents: 5,
    activeAssignments: 34,
    pendingReports: 12,
    systemHealth: 98.5
  });

  const recentActivities: ActivityItem[] = [
    {
      id: '1',
      type: 'student',
      title: 'New student enrolled',
      description: 'John Doe enrolled in Grade 7A',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      user: 'Admin',
      priority: 'medium',
      status: 'completed'
    },
    {
      id: '2',
      type: 'payment',
      title: 'Fee payment received',
      description: 'Jane Smith paid Grade 8B fees - $15,000',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
      user: 'Jane Smith',
      priority: 'high',
      status: 'completed'
    },
    {
      id: '3',
      type: 'assignment',
      title: 'Teacher assignment created',
      description: 'Mr. Johnson assigned to Mathematics Grade 7A',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
      user: 'Admin',
      priority: 'medium',
      status: 'completed'
    },
    {
      id: '4',
      type: 'exam',
      title: 'Exam scheduled',
      description: 'Mid-term exams scheduled for next week',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      user: 'Admin',
      priority: 'high',
      status: 'pending'
    },
    {
      id: '5',
      type: 'system',
      title: 'System backup completed',
      description: 'Daily backup completed successfully',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      user: 'System',
      priority: 'low',
      status: 'completed'
    }
  ];

  const departments: Department[] = [
    { name: 'Mathematics', head: 'Mrs. Ama Mensah', teachers: 12, students: 245, performance: 87.5, budget: 45000 },
    { name: 'English Language', head: 'Mr. Kofi Asante', teachers: 10, students: 234, performance: 82.3, budget: 42000 },
    { name: 'Science', head: 'Dr. Yaa Boateng', teachers: 8, students: 189, performance: 91.2, budget: 38000 },
    { name: 'Social Studies', head: 'Mr. Kwame Osei', teachers: 9, students: 198, performance: 78.9, budget: 35000 },
    { name: 'ICT', head: 'Ms. Akua Afriyie', teachers: 6, students: 156, performance: 94.1, budget: 28000 },
    { name: 'French', head: 'M. Pierre Dubois', teachers: 4, students: 89, performance: 76.4, budget: 20000 }
  ];

  const systemAlerts: SystemAlert[] = [
    {
      id: '1',
      type: 'warning',
      title: 'Low disk space',
      message: 'Server storage at 85% capacity',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      resolved: false
    },
    {
      id: '2',
      type: 'info',
      title: 'System update available',
      message: 'New system version 2.1.0 available',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      resolved: false
    },
    {
      id: '3',
      type: 'success',
      title: 'Backup completed',
      message: 'Daily backup completed successfully',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      resolved: true
    }
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'users', label: 'User Management', icon: Users, badge: 3 },
    { id: 'fees', label: 'Fee Management', icon: DollarSign },
    { id: 'academic', label: 'Academic', icon: BookOpen },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'communication', label: 'Communication', icon: Mail },
    { id: 'system', label: 'System', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'student': return <Users className="h-4 w-4" />;
      case 'payment': return <DollarSign className="h-4 w-4" />;
      case 'assignment': return <BookOpen className="h-4 w-4" />;
      case 'exam': return <Calendar className="h-4 w-4" />;
      case 'report': return <FileText className="h-4 w-4" />;
      case 'meeting': return <Users className="h-4 w-4" />;
      case 'system': return <Settings className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'student': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'payment': return 'bg-green-100 text-green-600 border-green-200';
      case 'assignment': return 'bg-purple-100 text-purple-600 border-purple-200';
      case 'exam': return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'report': return 'bg-red-100 text-red-600 border-red-200';
      case 'meeting': return 'bg-indigo-100 text-indigo-600 border-indigo-200';
      case 'system': return 'bg-gray-100 text-gray-600 border-gray-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'error': return 'bg-red-50 border-red-200 text-red-900';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-900';
      case 'info': return 'bg-blue-50 border-blue-200 text-blue-900';
      case 'success': return 'bg-green-50 border-green-200 text-green-900';
      default: return 'bg-gray-50 border-gray-200 text-gray-900';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white border-r border-gray-200 flex flex-col ${
        isSidebarCollapsed ? 'w-16' : 'w-64'
      } transition-all duration-300`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0`}>
              <Shield className="h-6 w-6 text-white" />
            </div>
            
            {!isSidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-gray-900 truncate">ADJIS</h2>
                <p className="text-xs text-gray-500 truncate">Admin Portal</p>
              </div>
            )}

            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-1 rounded-lg hover:bg-gray-100"
            >
              <ChevronRight className={`h-4 w-4 text-gray-500 transition-transform ${
                !isSidebarCollapsed ? 'rotate-180' : ''
              }`} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-red-50 text-red-600'
                  : 'text-gray-700 hover:bg-gray-100'
              } ${isSidebarCollapsed ? 'justify-center' : ''}`}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              
              {!isSidebarCollapsed && (
                <>
                  <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
                  {item.badge && item.badge > 0 && (
                    <span className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {item.badge > 99 ? '99+' : item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          {!isSidebarCollapsed && (
            <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <LogOut className="h-5 w-5" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          )}
          
          {isSidebarCollapsed && (
            <button className="w-full flex items-center justify-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <LogOut className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

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
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 w-64"
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
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                </div>
                
                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
                  >
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-medium text-gray-900">Super Admin</p>
                      <p className="text-xs text-gray-500">Administrator</p>
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-orange-500 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="text-sm text-green-600 font-medium">+12%</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{adminStats.totalStudents.toLocaleString()}</h3>
                  <p className="text-sm text-gray-500 mt-1">Total Students</p>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <span className="text-sm text-green-600 font-medium">+5%</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{adminStats.totalTeachers}</h3>
                  <p className="text-sm text-gray-500 mt-1">Total Teachers</p>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-purple-600" />
                    </div>
                    <span className="text-sm text-red-600 font-medium">Pending</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(adminStats.pendingFees)}</h3>
                  <p className="text-sm text-gray-500 mt-1">Pending Fees</p>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Target className="h-6 w-6 text-orange-600" />
                    </div>
                    <span className="text-sm text-green-600 font-medium">Good</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{adminStats.attendanceRate}%</h3>
                  <p className="text-sm text-gray-500 mt-1">Attendance Rate</p>
                </div>
              </div>

              {/* Main Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - 2/3 width */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Department Performance */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Department Performance</h2>
                        <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                          View All
                        </button>
                      </div>
                      <div className="space-y-4">
                        {departments.map((dept) => (
                          <div key={dept.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                <BookOpen className="h-6 w-6 text-red-600" />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900">{dept.name}</h3>
                                <p className="text-sm text-gray-500">{dept.head} • {dept.teachers} teachers</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-gray-900">{dept.performance}%</p>
                              <p className="text-sm text-gray-500">{dept.students} students</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Financial Overview */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Financial Overview</h2>
                        <select 
                          value={selectedPeriod}
                          onChange={(e) => setSelectedPeriod(e.target.value)}
                          className="text-sm border border-gray-300 rounded-lg px-3 py-1"
                        >
                          <option value="current_term">Current Term</option>
                          <option value="last_term">Last Term</option>
                          <option value="current_year">Current Year</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-sm text-green-600 font-medium">Collected Fees</p>
                          <p className="text-2xl font-bold text-green-900">{formatCurrency(adminStats.collectedFees)}</p>
                        </div>
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-sm text-red-600 font-medium">Pending Fees</p>
                          <p className="text-2xl font-bold text-red-900">{formatCurrency(adminStats.pendingFees)}</p>
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
                        <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                          View All
                        </button>
                      </div>
                      <div className="space-y-3">
                        {recentActivities.slice(0, 5).map((activity) => (
                          <div key={activity.id} className="flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${getActivityColor(activity.type)}`}>
                              {getActivityIcon(activity.type)}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                              <p className="text-xs text-gray-500">{activity.description}</p>
                              <p className="text-xs text-gray-400 mt-1">{formatTimeAgo(activity.timestamp)} • {activity.user}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* System Alerts */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">System Alerts</h2>
                        <span className="text-sm text-red-600">{systemAlerts.filter(a => !a.resolved).length} active</span>
                      </div>
                      <div className="space-y-3">
                        {systemAlerts.slice(0, 3).map((alert) => (
                          <div key={alert.id} className={`p-3 border rounded-lg ${getAlertColor(alert.type)}`}>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="text-sm font-medium">{alert.title}</p>
                                <p className="text-xs mt-1 opacity-80">{alert.message}</p>
                              </div>
                              {!alert.resolved && (
                                <button className="text-xs px-2 py-1 bg-white bg-opacity-20 rounded hover:bg-opacity-30">
                                  Resolve
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* System Health */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="p-6">
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">System Health</h2>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Overall Health</span>
                            <span className="text-sm font-medium text-gray-900">{adminStats.systemHealth}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${adminStats.systemHealth}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-gray-600">Database: Online</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-gray-600">API: Active</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <span className="text-gray-600">Storage: 85%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-gray-600">Backup: OK</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs content */}
          {activeTab !== 'dashboard' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h2>
              <p className="text-gray-500">Content for {activeTab} would go here</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
