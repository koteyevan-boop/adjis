'use client';

import { useState } from 'react';
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Camera,
  Save,
  X,
  Shield,
  GraduationCap,
  Briefcase,
  Heart,
  Star,
  Award,
  BookOpen,
  Users,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Upload,
  Download,
  Settings,
  LogOut,
  Bell,
  Globe,
  Clock,
  TrendingUp,
  BarChart3,
  FileText,
  Key,
  Lock
} from 'lucide-react';
import { ProfileHeader } from './SharedDesignSystem';

interface UniversalProfileProps {
  userType: 'admin' | 'teacher' | 'student' | 'parent';
  userData: {
    name: string;
    email: string;
    phone: string;
    role: string;
    department?: string;
    grade?: string;
    section?: string;
    avatar?: string;
    joinDate?: string;
    lastLogin?: string;
  };
  additionalInfo?: {
    [key: string]: any;
  };
  onEdit?: () => void;
  onSave?: (data: any) => void;
}

export default function UniversalProfile({ 
  userType, 
  userData, 
  additionalInfo = {},
  onEdit,
  onSave 
}: UniversalProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    avatar: userData.avatar
  });

  const [activeTab, setActiveTab] = useState('overview');

  const handleEdit = () => {
    setIsEditing(true);
    if (onEdit) onEdit();
  };

  const handleSave = () => {
    setIsEditing(false);
    if (onSave) onSave(editData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      avatar: userData.avatar
    });
  };

  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin': return Shield;
      case 'teacher': return GraduationCap;
      case 'student': return BookOpen;
      case 'parent': return Users;
      default: return User;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin': return 'bg-red-100 text-red-600';
      case 'teacher': return 'bg-blue-100 text-blue-600';
      case 'student': return 'bg-green-100 text-green-600';
      case 'parent': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const renderOverviewTab = () => {
    const RoleIcon = () => {
      const Icon = getRoleIcon(userData.role);
      return <Icon className="h-5 w-5 text-gray-400" />;
    };

    return (
      <div className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="text-sm font-medium text-gray-900">{userData.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="text-sm font-medium text-gray-900">{userData.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="text-sm font-medium text-gray-900">{userData.phone}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <RoleIcon />
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="text-sm font-medium text-gray-900">{userData.role}</p>
                </div>
              </div>
              {userData.department && (
                <div className="flex items-center space-x-3">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Department</p>
                    <p className="text-sm font-medium text-gray-900">{userData.department}</p>
                  </div>
                </div>
              )}
              {(userData.grade || userData.section) && (
                <div className="flex items-center space-x-3">
                  <GraduationCap className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Grade & Section</p>
                    <p className="text-sm font-medium text-gray-900">
                      {userData.grade} {userData.section && `- ${userData.section}`}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Account Statistics */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {userData.joinDate ? new Date(userData.joinDate).getFullYear() - 2020 + 1 : '1'}
              </p>
              <p className="text-sm text-gray-500">Years Active</p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {userData.lastLogin ? 'Today' : 'N/A'}
              </p>
              <p className="text-sm text-gray-500">Last Login</p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">98%</p>
              <p className="text-sm text-gray-500">Profile Complete</p>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        {Object.keys(additionalInfo).length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
            <div className="space-y-4">
              {Object.entries(additionalInfo).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 capitalize">{key.replace(/_/g, ' ')}</span>
                  <span className="text-sm font-medium text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderSecurityTab = () => (
    <div className="space-y-6">
      {/* Password Change */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter current password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm new password"
            />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Update Password
          </button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Enable 2FA</p>
              <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
            </div>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
              Enable
            </button>
          </div>
        </div>
      </div>

      {/* Login History */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Login History</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Today, 9:30 AM</p>
                <p className="text-sm text-gray-500">Chrome on Windows</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Yesterday, 2:15 PM</p>
                <p className="text-sm text-gray-500">Safari on macOS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      {/* Notification Preferences */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Email Notifications</p>
              <p className="text-sm text-gray-500">Receive email updates about your account</p>
            </div>
            <input type="checkbox" defaultChecked className="rounded border-gray-300" />
          </label>
          <label className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">SMS Notifications</p>
              <p className="text-sm text-gray-500">Get important updates via SMS</p>
            </div>
            <input type="checkbox" className="rounded border-gray-300" />
          </label>
          <label className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Push Notifications</p>
              <p className="text-sm text-gray-500">Receive browser push notifications</p>
            </div>
            <input type="checkbox" defaultChecked className="rounded border-gray-300" />
          </label>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Profile Visibility</p>
              <p className="text-sm text-gray-500">Control who can see your profile</p>
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-lg">
              <option>Everyone</option>
              <option>Only Users</option>
              <option>Private</option>
            </select>
          </label>
          <label className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Show Online Status</p>
              <p className="text-sm text-gray-500">Let others see when you're online</p>
            </div>
            <input type="checkbox" defaultChecked className="rounded border-gray-300" />
          </label>
        </div>
      </div>

      {/* Language and Region */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Language and Region</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
              <option>English</option>
              <option>French</option>
              <option>Spanish</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
              <option>UTC (GMT+0)</option>
              <option>GMT (GMT+0)</option>
              <option>EST (GMT-5)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(userData.role)}`}>
                {userData.role}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Save className="h-4 w-4" />
                    Save
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Header */}
      <div className="px-6 py-8">
        <ProfileHeader
          name={userData.name}
          role={userData.role}
          email={userData.email}
          phone={userData.phone}
          avatar={userData.avatar}
          stats={[
            { label: "Role", value: userData.role },
            { label: "Status", value: "Active" },
            { label: "Member Since", value: userData.joinDate || "2020" }
          ]}
        />
      </div>

      {/* Tabs */}
      <div className="px-6">
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'security'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Security
              </button>
              <button
                onClick={() => setActiveTab('preferences')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'preferences'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Preferences
              </button>
            </nav>
          </div>
          <div className="p-6">
            {activeTab === 'overview' && renderOverviewTab()}
            {activeTab === 'security' && renderSecurityTab()}
            {activeTab === 'preferences' && renderPreferencesTab()}
          </div>
        </div>
      </div>
    </div>
  );
}
