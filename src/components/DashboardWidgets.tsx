'use client';

import { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  Calendar, 
  Award, 
  Target,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  PieChart,
  Download,
  Upload,
  Mail,
  Phone,
  Star,
  TrendingDown,
  MoreHorizontal
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease';
  icon: any;
  color: string;
  subtitle?: string;
}

export function StatCard({ title, value, change, changeType = 'increase', icon: Icon, color, subtitle }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-sm font-medium ${
            changeType === 'increase' ? 'text-green-600' : 'text-red-600'
          }`}>
            {changeType === 'increase' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        <p className="text-sm text-gray-500 mt-1">{title}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}

interface ActivityItemProps {
  type: 'assignment' | 'grade' | 'message' | 'attendance' | 'announcement';
  title: string;
  description: string;
  timestamp: Date;
  priority?: 'high' | 'medium' | 'low';
  status?: 'completed' | 'pending' | 'overdue';
}

export function ActivityItem({ type, title, description, timestamp, priority, status }: ActivityItemProps) {
  const getActivityIcon = () => {
    switch (type) {
      case 'assignment': return <BookOpen className="h-4 w-4" />;
      case 'grade': return <Award className="h-4 w-4" />;
      case 'message': return <Mail className="h-4 w-4" />;
      case 'attendance': return <Users className="h-4 w-4" />;
      case 'announcement': return <AlertCircle className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getActivityColor = () => {
    if (status === 'completed') return 'bg-green-100 text-green-600 border-green-200';
    if (status === 'overdue') return 'bg-red-100 text-red-600 border-red-200';
    if (priority === 'high') return 'bg-red-100 text-red-600 border-red-200';
    if (priority === 'medium') return 'bg-yellow-100 text-yellow-600 border-yellow-200';
    if (priority === 'low') return 'bg-green-100 text-green-600 border-green-200';
    return 'bg-gray-100 text-gray-600 border-gray-200';
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

  return (
    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${getActivityColor()}`}>
        {getActivityIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{title}</p>
        <p className="text-xs text-gray-500 truncate">{description}</p>
        <p className="text-xs text-gray-400 mt-1">{formatTimeAgo(timestamp)}</p>
      </div>
      {status && (
        <div className="flex items-center gap-1">
          {status === 'completed' && <CheckCircle className="h-4 w-4 text-green-600" />}
          {status === 'pending' && <Clock className="h-4 w-4 text-yellow-600" />}
          {status === 'overdue' && <AlertCircle className="h-4 w-4 text-red-600" />}
        </div>
      )}
    </div>
  );
}

interface ClassScheduleProps {
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
}

export function ClassSchedule({ classes }: ClassScheduleProps) {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'in-progress': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-3">
      {classes.map((classItem) => (
        <div key={classItem.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{classItem.subject}</h3>
              <p className="text-sm text-gray-500">{classItem.class} • Room {classItem.room}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium text-gray-900">{classItem.time}</p>
            <p className="text-sm text-gray-500">{classItem.duration} • {classItem.students} students</p>
            {classItem.status && (
              <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${getStatusColor(classItem.status)}`}>
                {classItem.status.replace('-', ' ')}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

interface ProgressBarProps {
  label: string;
  value: number;
  max: number;
  color: string;
  showPercentage?: boolean;
}

export function ProgressBar({ label, value, max, color, showPercentage = true }: ProgressBarProps) {
  const percentage = (value / max) * 100;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">{label}</span>
        {showPercentage && (
          <span className="text-sm font-medium text-gray-900">{percentage.toFixed(1)}%</span>
        )}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`${color} h-2 rounded-full transition-all duration-300`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: any;
  color: string;
  onClick: () => void;
  count?: number;
}

export function QuickActionCard({ title, description, icon: Icon, color, onClick, count }: QuickActionCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full text-left"
    >
      <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center relative`}>
        <Icon className="h-6 w-6 text-white" />
        {count && count > 0 && (
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {count > 99 ? '99+' : count}
          </span>
        )}
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <MoreHorizontal className="h-4 w-4 text-gray-400" />
    </button>
  );
}

interface PerformanceChartProps {
  title: string;
  period: string;
  onPeriodChange: (period: string) => void;
}

export function PerformanceChart({ title, period, onPeriodChange }: PerformanceChartProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <select 
            value={period}
            onChange={(e) => onPeriodChange(e.target.value)}
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
            <p className="text-gray-500">Performance chart</p>
            <p className="text-sm text-gray-400 mt-1">Chart integration needed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface AnnouncementCardProps {
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: Date;
}

export function AnnouncementCard({ title, message, type, timestamp }: AnnouncementCardProps) {
  const getTypeStyles = () => {
    switch (type) {
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-900';
      case 'success': return 'bg-green-50 border-green-200 text-green-900';
      case 'error': return 'bg-red-50 border-red-200 text-red-900';
      default: return 'bg-blue-50 border-blue-200 text-blue-900';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`p-3 border rounded-lg ${getTypeStyles()}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs mt-1 opacity-80">{message}</p>
        </div>
        <span className="text-xs opacity-60">{formatDate(timestamp)}</span>
      </div>
    </div>
  );
}

interface StudentProgressProps {
  students: Array<{
    id: string;
    name: string;
    grade: number;
    trend: 'up' | 'down' | 'stable';
    assignments: number;
    attendance: number;
  }>;
}

export function StudentProgress({ students }: StudentProgressProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-green-600" />;
      case 'down': return <TrendingDown className="h-3 w-3 text-red-600" />;
      default: return <div className="w-3 h-3 bg-gray-400 rounded-full" />;
    }
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 80) return 'text-green-600';
    if (grade >= 70) return 'text-blue-600';
    if (grade >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-3">
      {students.slice(0, 5).map((student) => (
        <div key={student.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">
                {student.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{student.name}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>{student.assignments} assignments</span>
                <span>•</span>
                <span>{student.attendance}% attendance</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-bold ${getGradeColor(student.grade)}`}>
              {student.grade}%
            </span>
            {getTrendIcon(student.trend)}
          </div>
        </div>
      ))}
    </div>
  );
}
