'use client';

import { ReactNode } from 'react';
import { 
  Search,
  Bell,
  Settings,
  User,
  Menu,
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
  Info,
  LogOut,
  Shield,
  GraduationCap,
  Briefcase,
  Heart,
  Star,
  MapPin,
  Camera
} from 'lucide-react';

// Shared design tokens
export const designTokens = {
  colors: {
    primary: '#3B82F6',
    secondary: '#10B981',
    accent: '#F59E0B',
    danger: '#EF4444',
    warning: '#F59E0B',
    success: '#10B981',
    info: '#3B82F6',
    neutral: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827'
    }
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem'
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px'
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem'
    }
  }
};

// Shared components
export const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendValue, 
  color = 'primary' 
}: {
  title: string;
  value: string | number;
  icon: any;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: 'primary' | 'secondary' | 'accent' | 'danger' | 'warning' | 'success' | 'info';
}) => {
  const colorClasses = {
    primary: 'bg-blue-100 text-blue-600',
    secondary: 'bg-green-100 text-green-600',
    accent: 'bg-yellow-100 text-yellow-600',
    danger: 'bg-red-100 text-red-600',
    warning: 'bg-yellow-100 text-yellow-600',
    success: 'bg-green-100 text-green-600',
    info: 'bg-blue-100 text-blue-600'
  };

  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600'
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
        {trend && trendValue && (
          <span className={`text-sm font-medium ${trendColors[trend]}`}>
            {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}{trendValue}
          </span>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  );
};

export const ActivityItem = ({ 
  icon: Icon, 
  title, 
  description, 
  time, 
  status = 'normal' 
}: {
  icon: any;
  title: string;
  description: string;
  time: string;
  status?: 'completed' | 'pending' | 'urgent' | 'normal';
}) => {
  const statusColors = {
    completed: 'text-green-600 bg-green-100',
    pending: 'text-yellow-600 bg-yellow-100',
    urgent: 'text-red-600 bg-red-100',
    normal: 'text-gray-600 bg-gray-100'
  };

  return (
    <div className="flex items-start space-x-3">
      <div className={`p-2 rounded-lg ${statusColors[status]}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  );
};

export const ScheduleItem = ({ 
  subject, 
  className: className_, 
  time, 
  room, 
  students, 
  status = 'upcoming' 
}: {
  subject: string;
  className: string;
  time: string;
  room: string;
  students: number;
  status?: 'upcoming' | 'in-progress' | 'completed';
}) => {
  const statusColors = {
    upcoming: 'bg-blue-50 border-blue-200',
    'in-progress': 'bg-green-50 border-green-200',
    completed: 'bg-gray-50 border-gray-200'
  };

  return (
    <div className={`flex items-center justify-between p-4 rounded-lg border ${statusColors[status]}`}>
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-blue-600" />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-900">{className_}</h3>
          <p className="text-sm text-gray-500">{subject} • {room}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-gray-900">{time}</p>
        <p className="text-sm text-gray-500">{students} students</p>
      </div>
    </div>
  );
};

export const AnnouncementCard = ({ 
  title, 
  message, 
  priority, 
  date, 
  author 
}: {
  title: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
  date: string;
  author: string;
}) => {
  const priorityStyles = {
    high: 'border-red-500 bg-red-50',
    medium: 'border-yellow-500 bg-yellow-50',
    low: 'border-green-500 bg-green-50'
  };

  return (
    <div className={`p-4 rounded-lg border-l-4 ${priorityStyles[priority]}`}>
      <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{message}</p>
      <p className="text-xs text-gray-500 mt-2">{date} • {author}</p>
    </div>
  );
};

export const ProfileHeader = ({ 
  name, 
  role, 
  email, 
  phone, 
  avatar, 
  stats 
}: {
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar?: string;
  stats?: Array<{ label: string; value: string }>;
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center space-x-6">
        <div className="flex-shrink-0">
          {avatar ? (
            <img src={avatar} alt={name} className="h-20 w-20 rounded-full object-cover" />
          ) : (
            <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-blue-600" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
          <p className="text-sm text-gray-500">{role}</p>
          <div className="mt-2 space-y-1">
            <p className="text-sm text-gray-600 flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              {email}
            </p>
            <p className="text-sm text-gray-600 flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              {phone}
            </p>
          </div>
        </div>
        <div className="flex space-x-4">
          {stats?.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const NavigationItem = ({ 
  icon: Icon, 
  label, 
  badge, 
  isActive = false, 
  onClick 
}: {
  icon: any;
  label: string;
  badge?: number | string;
  isActive?: boolean;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-left ${
        isActive 
          ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
          : 'hover:bg-gray-100 text-gray-700'
      }`}
    >
      <div className="flex items-center space-x-3">
        <Icon className="h-5 w-5" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      {badge && (
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
          {badge}
        </span>
      )}
    </button>
  );
};

export const SearchBar = ({ 
  placeholder = "Search...", 
  value, 
  onChange 
}: {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};

export const NotificationBell = ({ 
  count, 
  onClick 
}: {
  count?: number;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <Bell className="h-5 w-5 text-gray-600" />
      {count && count > 0 && (
        <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
      )}
    </button>
  );
};

export const UserMenu = ({ 
  name, 
  onLogout 
}: {
  name: string;
  onLogout?: () => void;
}) => {
  return (
    <div className="relative">
      <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
        <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
          <User className="h-4 w-4 text-white" />
        </div>
        <ChevronRight className="h-4 w-4 text-gray-600" />
      </button>
    </div>
  );
};

export default {
  designTokens,
  StatCard,
  ActivityItem,
  ScheduleItem,
  AnnouncementCard,
  ProfileHeader,
  NavigationItem,
  SearchBar,
  NotificationBell,
  UserMenu
};
