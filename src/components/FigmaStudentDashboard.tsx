'use client';

import { useState, useEffect } from 'react';
import { 
  Search,
  Bell,
  Settings,
  User,
  Menu,
  Home,
  BookOpen,
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
  GraduationCap,
  Star,
  MapPin,
  Camera,
  Users,
  TrendingDown,
  DollarSign,
  Heart
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

interface StudentData {
  profile: {
    name: string;
    role: string;
    email: string;
    phone: string;
    grade: string;
    section: string;
    avatar?: string;
  };
  stats: {
    averageGrade: number;
    attendanceRate: number;
    assignmentsCompleted: number;
    pendingAssignments: number;
    upcomingExams: number;
    achievements: number;
    studyStreak: number;
    classRank: number;
  };
  assignments: Array<{
    id: string;
    title: string;
    subject: string;
    dueDate: string;
    status: 'completed' | 'in-progress' | 'overdue' | 'pending';
    grade?: string;
    submittedDate?: string;
  }>;
  schedule: Array<{
    id: string;
    subject: string;
    teacher: string;
    time: string;
    room: string;
    status: 'upcoming' | 'in-progress' | 'completed';
  }>;
  activities: Array<{
    id: string;
    type: 'assignment' | 'grade' | 'attendance' | 'achievement' | 'announcement';
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
}

export default function FigmaStudentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const [studentData] = useState<StudentData>({
    profile: {
      name: "Kofi Asante",
      role: "Student",
      email: "kofi.asante@adjis.edu",
      phone: "+233 24 123 4567",
      grade: "Grade 7",
      section: "A"
    },
    stats: {
      averageGrade: 87.5,
      attendanceRate: 95.2,
      assignmentsCompleted: 24,
      pendingAssignments: 3,
      upcomingExams: 2,
      achievements: 8,
      studyStreak: 12,
      classRank: 3
    },
    assignments: [
      {
        id: "1",
        title: "Mathematics Quiz - Algebra",
        subject: "Mathematics",
        dueDate: "2024-03-20",
        status: "completed",
        grade: "A",
        submittedDate: "2024-03-18"
      },
      {
        id: "2",
        title: "English Essay - Creative Writing",
        subject: "English",
        dueDate: "2024-03-22",
        status: "in-progress"
      },
      {
        id: "3",
        title: "Science Project - Ecosystems",
        subject: "Science",
        dueDate: "2024-03-25",
        status: "pending"
      },
      {
        id: "4",
        title: "History Test - Ancient Civilizations",
        subject: "History",
        dueDate: "2024-03-15",
        status: "completed",
        grade: "B+",
        submittedDate: "2024-03-14"
      }
    ],
    schedule: [
      {
        id: "1",
        subject: "Mathematics",
        teacher: "Mr. Johnson",
        time: "8:00 AM",
        room: "Room 201",
        status: "upcoming"
      },
      {
        id: "2",
        subject: "English",
        teacher: "Mrs. Mensah",
        time: "9:30 AM",
        room: "Room 202",
        status: "upcoming"
      },
      {
        id: "3",
        subject: "Science",
        teacher: "Dr. Boateng",
        time: "11:00 AM",
        room: "Room 301",
        status: "upcoming"
      },
      {
        id: "4",
        subject: "History",
        teacher: "Mr. Osei",
        time: "2:00 PM",
        room: "Room 203",
        status: "upcoming"
      }
    ],
    activities: [
      {
        id: "1",
        type: "grade",
        title: "Math Quiz Graded",
        description: "Received an A in Algebra Quiz",
        time: "2 hours ago",
        status: "completed"
      },
      {
        id: "2",
        type: "assignment",
        title: "Essay Submitted",
        description: "Submitted English essay on time",
        time: "5 hours ago",
        status: "completed"
      },
      {
        id: "3",
        type: "attendance",
        title: "Perfect Attendance",
        description: "Full week attendance achieved",
        time: "1 day ago",
        status: "completed"
      },
      {
        id: "4",
        type: "achievement",
        title: "Study Streak",
        description: "12 days consecutive study",
        time: "2 days ago",
        status: "completed"
      }
    ],
    announcements: [
      {
        id: "1",
        title: "End of Term Exams",
        message: "Final exams will begin next week. Please prepare well and review all materials.",
        priority: "high",
        date: "2 days ago",
        author: "Principal"
      },
      {
        id: "2",
        title: "Study Group Sessions",
        message: "Extra study sessions available after school for exam preparation.",
        priority: "medium",
        date: "3 days ago",
        author: "Academic Office"
      },
      {
        id: "3",
        title: "Library Hours Extended",
        message: "Library will stay open until 6 PM during exam week.",
        priority: "low",
        date: "1 week ago",
        author: "Library"
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
    { id: 'assignments', label: 'Assignments', icon: FileText, badge: studentData.stats.pendingAssignments },
    { id: 'grades', label: 'Grades', icon: Award, badge: undefined },
    { id: 'schedule', label: 'Schedule', icon: Calendar, badge: undefined },
    { id: 'exams', label: 'Exams', icon: Target, badge: studentData.stats.upcomingExams },
    { id: 'achievements', label: 'Achievements', icon: Star, badge: studentData.stats.achievements },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: undefined },
    { id: 'profile', label: 'Profile', icon: User, badge: undefined }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'assignment': return FileText;
      case 'grade': return Award;
      case 'attendance': return CheckCircle;
      case 'achievement': return Star;
      case 'announcement': return Info;
      default: return Activity;
    }
  };

  const getAssignmentStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-yellow-600 bg-yellow-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-orange-600 bg-orange-100';
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
                <h1 className="text-xl font-semibold text-gray-900">Student Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back, {studentData.profile.name}</p>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <SearchBar
                placeholder="Search assignments, grades..."
                value={searchQuery}
                onChange={setSearchQuery}
              />
              <NotificationBell count={3} />
              <UserMenu name={studentData.profile.name} />
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
              name={studentData.profile.name}
              role={`${studentData.profile.grade} - ${studentData.profile.section}`}
              email={studentData.profile.email}
              phone={studentData.profile.phone}
              stats={[
                { label: "Rank", value: `#${studentData.stats.classRank}` },
                { label: "Streak", value: `${studentData.stats.studyStreak} days` },
                { label: "Achievements", value: studentData.stats.achievements.toString() }
              ]}
            />

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Average Grade"
                value={`${studentData.stats.averageGrade}%`}
                icon={Award}
                trend="up"
                trendValue="2.3%"
                color="success"
              />
              <StatCard
                title="Attendance Rate"
                value={`${studentData.stats.attendanceRate}%`}
                icon={CheckCircle}
                trend="up"
                trendValue="1.2%"
                color="primary"
              />
              <StatCard
                title="Completed Assignments"
                value={studentData.stats.assignmentsCompleted}
                icon={FileText}
                trend="up"
                trendValue="4"
                color="info"
              />
              <StatCard
                title="Pending Assignments"
                value={studentData.stats.pendingAssignments}
                icon={Clock}
                trend="down"
                trendValue="2"
                color="warning"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Today's Schedule */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-900">Today's Schedule</h2>
                      <button className="text-sm text-blue-600 hover:text-blue-700">View Full Week</button>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    {studentData.schedule.map((classItem) => (
                      <ScheduleItem
                        key={classItem.id}
                        subject={classItem.subject}
                        className={`${classItem.teacher} - ${classItem.room}`}
                        time={classItem.time}
                        room={classItem.room}
                        students={0}
                        status={classItem.status}
                      />
                    ))}
                  </div>
                </div>

                {/* Recent Assignments */}
                <div className="bg-white rounded-xl border border-gray-200 mt-6">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-900">Recent Assignments</h2>
                      <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    {studentData.assignments.slice(0, 3).map((assignment) => (
                      <div key={assignment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`p-2 rounded-lg ${getAssignmentStatusColor(assignment.status)}`}>
                            <FileText className="h-4 w-4" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">{assignment.title}</h3>
                            <p className="text-sm text-gray-500">{assignment.subject} • Due: {assignment.dueDate}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          {assignment.grade ? (
                            <span className="text-sm font-medium text-green-600">{assignment.grade}</span>
                          ) : (
                            <span className={`text-sm font-medium ${
                              assignment.status === 'completed' ? 'text-green-600' :
                              assignment.status === 'in-progress' ? 'text-yellow-600' :
                              'text-red-600'
                            }`}>
                              {assignment.status}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Activity & Announcements */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                  </div>
                  <div className="p-6 space-y-4">
                    {studentData.activities.map((activity) => {
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
                    <h2 className="text-lg font-semibold text-gray-900">Announcements</h2>
                  </div>
                  <div className="p-6 space-y-4">
                    {studentData.announcements.map((announcement) => (
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
