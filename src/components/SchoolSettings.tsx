'use client';

import { useState } from 'react';
import { Settings, Upload, Save, Eye, EyeOff, Users, Calendar, CheckCircle, XCircle, Clock, AlertCircle, Building, Mail, Phone, MapPin, Globe, Edit, Trash2, Plus } from 'lucide-react';

export default function SchoolSettings() {
  const [activeTab, setActiveTab] = useState("letterhead");
  const [showPassword, setShowPassword] = useState(false);

  const [schoolInfo, setSchoolInfo] = useState({
    name: "Adorable Babies & Josemaria International School",
    logo: "/images/logo1.jpg",
    address: "123 School Street, Accra, Ghana",
    phone: "+233 30 123 4567",
    email: "info@adjis.edu.gh",
    website: "www.adjis.edu.gh",
    motto: "Excellence in Education",
    vision: "To be a leading educational institution",
    mission: "Providing quality education for all students"
  });

  const [todayAttendance] = useState([
    { id: 1, class: "Grade 7A", total: 45, present: 42, absent: 3, late: 2, percentage: 93.3 },
    { id: 2, class: "Grade 7B", total: 44, present: 40, absent: 4, late: 3, percentage: 90.9 },
    { id: 3, class: "Grade 8A", total: 42, present: 38, absent: 4, late: 1, percentage: 90.5 },
    { id: 4, class: "Grade 8B", total: 43, present: 41, absent: 2, late: 2, percentage: 95.3 },
    { id: 5, class: "Grade 9A", total: 40, present: 37, absent: 3, late: 1, percentage: 92.5 },
  ]);

  const [roles] = useState([
    { id: 1, name: "Super Admin", description: "Full system access", permissions: ["all"], users: 2 },
    { id: 2, name: "Administrator", description: "Administrative functions", permissions: ["students", "teachers", "fees", "reports"], users: 3 },
    { id: 3, name: "IT Admin", description: "Technical management", permissions: ["system", "users", "settings"], users: 1 },
    { id: 4, name: "Academic Admin", description: "Academic management", permissions: ["students", "teachers", "academics"], users: 2 },
    { id: 5, name: "Finance Admin", description: "Financial management", permissions: ["fees", "accounting", "reports"], users: 1 },
  ]);

  const [roleUsers] = useState([
    { id: 1, name: "John Doe", email: "john@adjis.edu.gh", role: "Super Admin", status: "active", lastLogin: "2024-03-15 09:30" },
    { id: 2, name: "Jane Smith", email: "jane@adjis.edu.gh", role: "Administrator", status: "active", lastLogin: "2024-03-15 08:45" },
    { id: 3, name: "Mike Johnson", email: "mike@adjis.edu.gh", role: "IT Admin", status: "active", lastLogin: "2024-03-15 10:15" },
    { id: 4, name: "Sarah Williams", email: "sarah@adjis.edu.gh", role: "Academic Admin", status: "inactive", lastLogin: "2024-03-14 16:20" },
  ]);

  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: [] as string[]
  });

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    password: ""
  });

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle logo upload
      const reader = new FileReader();
      reader.onload = (e) => {
        setSchoolInfo(prev => ({
          ...prev,
          logo: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const saveSchoolInfo = () => {
    // Save school information
    alert("School information saved successfully!");
  };

  const addRole = () => {
    // Add new role
    alert("Role added successfully!");
    setNewRole({ name: "", description: "", permissions: [] });
  };

  const addUser = () => {
    // Add new user
    alert("User added successfully!");
    setNewUser({ name: "", email: "", role: "", password: "" });
  };

  return (
    <div className="p-6">
      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {[
              { id: "letterhead", label: "Letterhead Settings", icon: Building },
              { id: "attendance", label: "Today's Attendance", icon: Calendar },
              { id: "roles", label: "Role Management", icon: Users },
              { id: "users", label: "User Management", icon: Users },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "letterhead" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Letterhead Settings</h3>
                <button
                  onClick={saveSchoolInfo}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </button>
              </div>

              {/* Logo Upload */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-md font-medium text-gray-700 mb-4">School Logo</h4>
                <div className="flex items-center gap-6">
                  <div className="w-32 h-32 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center">
                    {schoolInfo.logo ? (
                      <img src={schoolInfo.logo} alt="School Logo" className="max-w-full max-h-full" />
                    ) : (
                      <Building className="h-12 w-12 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <label className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer">
                      <Upload className="h-4 w-4" />
                      Upload Logo
                      <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                    </label>
                    <p className="text-sm text-gray-600 mt-2">Recommended: Square format, max 2MB</p>
                  </div>
                </div>
              </div>

              {/* School Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-md font-medium text-gray-700 mb-4">School Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
                    <input
                      type="text"
                      value={schoolInfo.name}
                      onChange={(e) => setSchoolInfo(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    <input
                      type="text"
                      value={schoolInfo.website}
                      onChange={(e) => setSchoolInfo(prev => ({ ...prev, website: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      value={schoolInfo.address}
                      onChange={(e) => setSchoolInfo(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={schoolInfo.phone}
                      onChange={(e) => setSchoolInfo(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={schoolInfo.email}
                      onChange={(e) => setSchoolInfo(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Motto</label>
                    <input
                      type="text"
                      value={schoolInfo.motto}
                      onChange={(e) => setSchoolInfo(prev => ({ ...prev, motto: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vision</label>
                    <textarea
                      value={schoolInfo.vision}
                      onChange={(e) => setSchoolInfo(prev => ({ ...prev, vision: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      rows={2}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mission</label>
                    <textarea
                      value={schoolInfo.mission}
                      onChange={(e) => setSchoolInfo(prev => ({ ...prev, mission: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="text-md font-medium text-gray-700 mb-4">Letterhead Preview</h4>
                <div className="border-2 border-gray-200 rounded-lg p-8">
                  <div className="text-center mb-6">
                    {schoolInfo.logo && (
                      <img src={schoolInfo.logo} alt="School Logo" className="h-16 w-auto mx-auto mb-4" />
                    )}
                    <h2 className="text-2xl font-bold text-gray-900">{schoolInfo.name}</h2>
                    <p className="text-sm text-gray-600">{schoolInfo.address}</p>
                    <div className="flex justify-center gap-4 mt-2">
                      <span className="text-sm text-gray-600 flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {schoolInfo.phone}
                      </span>
                      <span className="text-sm text-gray-600 flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {schoolInfo.email}
                      </span>
                      <span className="text-sm text-gray-600 flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        {schoolInfo.website}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-center text-sm text-gray-600 italic">
                    <p>"{schoolInfo.motto}"</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "attendance" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Today's Attendance Overview</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Date: {new Date().toLocaleDateString()}</span>
                  <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    <Calendar className="h-4 w-4" />
                    View Calendar
                  </button>
                </div>
              </div>

              {/* Attendance Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Students</p>
                      <p className="text-2xl font-bold text-gray-900">{todayAttendance.reduce((sum, cls) => sum + cls.total, 0)}</p>
                    </div>
                    <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Present</p>
                      <p className="text-2xl font-bold text-green-600">{todayAttendance.reduce((sum, cls) => sum + cls.present, 0)}</p>
                    </div>
                    <div className="flex-shrink-0 bg-green-100 rounded-lg p-3">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Absent</p>
                      <p className="text-2xl font-bold text-red-600">{todayAttendance.reduce((sum, cls) => sum + cls.absent, 0)}</p>
                    </div>
                    <div className="flex-shrink-0 bg-red-100 rounded-lg p-3">
                      <XCircle className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Average Rate</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {(todayAttendance.reduce((sum, cls) => sum + cls.percentage, 0) / todayAttendance.length).toFixed(1)}%
                      </p>
                    </div>
                    <div className="flex-shrink-0 bg-yellow-100 rounded-lg p-3">
                      <Clock className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Class-wise Attendance */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h4 className="text-lg font-medium text-gray-900">Class-wise Attendance Details</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Present</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Absent</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Late</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance %</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {todayAttendance.map((attendance) => (
                        <tr key={attendance.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{attendance.class}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{attendance.total}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{attendance.present}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">{attendance.absent}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">{attendance.late}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{attendance.percentage}%</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              attendance.percentage >= 90 ? 'bg-green-100 text-green-800' :
                              attendance.percentage >= 75 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {attendance.percentage >= 90 ? 'Excellent' :
                               attendance.percentage >= 75 ? 'Good' : 'Needs Attention'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Calendar className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "roles" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Role Management</h3>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  <Plus className="h-4 w-4" />
                  Create New Role
                </button>
              </div>

              {/* Create Role Form */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-md font-medium text-gray-700 mb-4">Create New Role</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
                    <input
                      type="text"
                      value={newRole.name}
                      onChange={(e) => setNewRole(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Enter role name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <input
                      type="text"
                      value={newRole.description}
                      onChange={(e) => setNewRole(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Enter role description"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Permissions</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {['Dashboard', 'Students', 'Teachers', 'Parents', 'Fees', 'Accounting', 'Reports', 'Settings'].map((permission) => (
                        <label key={permission} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={newRole.permissions.includes(permission)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNewRole(prev => ({ ...prev, permissions: [...prev.permissions, permission] }));
                              } else {
                                setNewRole(prev => ({ ...prev, permissions: prev.permissions.filter(p => p !== permission) }));
                              }
                            }}
                            />
                          <span className="text-sm text-gray-700">{permission}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <button
                      onClick={addRole}
                      disabled={!newRole.name || !newRole.description}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Create Role
                    </button>
                  </div>
                </div>
              </div>

              {/* Existing Roles */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h4 className="text-lg font-medium text-gray-900">System Roles</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {roles.map((role) => (
                        <tr key={role.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{role.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{role.description}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex flex-wrap gap-1">
                              {role.permissions.map((permission, index) => (
                                <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                                  {permission}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{role.users}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">User Management</h3>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  <Plus className="h-4 w-4" />
                  Add New User
                </button>
              </div>

              {/* Create User Form */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-md font-medium text-gray-700 mb-4">Create New User</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={newUser.name}
                      onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Enter user's full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">Select Role</option>
                      {roles.map((role) => (
                        <option key={role.id} value={role.name}>{role.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="flex items-center gap-2">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={newUser.password || generatePassword()}
                        onChange={(e) => setNewUser(prev => ({ ...prev, password: e.target.value }))}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="Auto-generated"
                      />
                      <button
                        onClick={() => setNewUser(prev => ({ ...prev, password: generatePassword() }))}
                        className="p-2 text-blue-600 hover:text-blue-800"
                      >
                        <AlertCircle className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="p-2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="lg:col-span-3">
                    <button
                      onClick={addUser}
                      disabled={!newUser.name || !newUser.email || !newUser.role}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Create User
                    </button>
                  </div>
                </div>
              </div>

              {/* Existing Users */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h4 className="text-lg font-medium text-gray-900">System Users</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {roleUsers.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastLogin}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-orange-600 hover:text-orange-900 mr-3">
                              <AlertCircle className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
