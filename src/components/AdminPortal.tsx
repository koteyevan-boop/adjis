'use client';

import { useState } from 'react';
import { Users, UserPlus, BookOpen, DollarSign, Calendar, FileText, Settings, Award, TrendingUp, AlertCircle, CheckCircle, Clock, BarChart3, PieChart, Activity } from 'lucide-react';

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedPeriod, setSelectedPeriod] = useState("current_term");

  const adminStats = {
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
  };

  const recentActivities = [
    { id: 1, action: 'New student enrolled', user: 'John Doe', time: '2 hours ago', type: 'student', icon: Users },
    { id: 2, action: 'Fee payment received', user: 'Jane Smith', time: '3 hours ago', type: 'payment', icon: DollarSign },
    { id: 3, action: 'Teacher assignment created', user: 'Admin', time: '5 hours ago', type: 'assignment', icon: BookOpen },
    { id: 4, action: 'Exam scheduled', user: 'Admin', time: '1 day ago', type: 'exam', icon: Calendar },
    { id: 5, action: 'Report cards generated', user: 'System', time: '1 day ago', type: 'report', icon: FileText },
    { id: 6, action: 'Parent meeting scheduled', user: 'Admin', time: '2 days ago', type: 'meeting', icon: Users },
  ];

  const departments = [
    { name: 'Mathematics', head: 'Mrs. Ama Mensah', teachers: 12, students: 245 },
    { name: 'English Language', head: 'Mr. Kofi Asante', teachers: 10, students: 234 },
    { name: 'Science', head: 'Dr. Yaa Boateng', teachers: 8, students: 189 },
    { name: 'Social Studies', head: 'Mr. Kwame Osei', teachers: 9, students: 198 },
  ];

  const feeSummary = [
    { class: 'Grade 7A', total: 15000, paid: 13500, pending: 1500, percentage: 90 },
    { class: 'Grade 7B', total: 15000, paid: 12000, pending: 3000, percentage: 80 },
    { class: 'Grade 8A', total: 16000, paid: 14800, pending: 1200, percentage: 92.5 },
    { class: 'Grade 8B', total: 16000, paid: 11200, pending: 4800, percentage: 70 },
  ];

  const performanceData = [
    { subject: 'Mathematics', average: 78.5, improvement: 2.3 },
    { subject: 'English', average: 82.1, improvement: -1.2 },
    { subject: 'Science', average: 76.8, improvement: 3.7 },
    { subject: 'Social Studies', average: 80.3, improvement: 0.8 },
  ];

  return (
    <div className="p-6">
      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{adminStats.totalStudents}</p>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +5.2% from last term
              </p>
            </div>
            <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Teachers</p>
              <p className="text-2xl font-bold text-gray-900">{adminStats.totalTeachers}</p>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                All positions filled
              </p>
            </div>
            <div className="flex-shrink-0 bg-green-100 rounded-lg p-3">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Fees Collected</p>
              <p className="text-2xl font-bold text-gray-900">${adminStats.collectedFees.toLocaleString()}</p>
              <p className="text-xs text-orange-600 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                ${adminStats.pendingFees.toLocaleString()} pending
              </p>
            </div>
            <div className="flex-shrink-0 bg-purple-100 rounded-lg p-3">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
              <p className="text-2xl font-bold text-gray-900">{adminStats.attendanceRate}%</p>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +2.1% improvement
              </p>
            </div>
            <div className="flex-shrink-0 bg-yellow-100 rounded-lg p-3">
              <Activity className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {[
              { id: "dashboard", label: "Dashboard", icon: BarChart3 },
              { id: "students", label: "Students", icon: Users },
              { id: "teachers", label: "Teachers", icon: BookOpen },
              { id: "fees", label: "Fees", icon: DollarSign },
              { id: "academics", label: "Academics", icon: Award },
              { id: "reports", label: "Reports", icon: FileText },
              { id: "settings", label: "Settings", icon: Settings },
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
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Administrative Dashboard</h3>
              
              {/* Performance Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-md font-medium text-gray-700 mb-4">Academic Performance</h4>
                  <div className="space-y-3">
                    {performanceData.map((subject, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm font-medium text-gray-900">{subject.subject}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-900">{subject.average}%</span>
                          <span className={`text-xs flex items-center gap-1 ${
                            subject.improvement > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {subject.improvement > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingUp className="h-3 w-3 rotate-180" />}
                            {Math.abs(subject.improvement)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-md font-medium text-gray-700 mb-4">Department Overview</h4>
                  <div className="space-y-3">
                    {departments.map((dept, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{dept.name}</p>
                          <p className="text-xs text-gray-500">{dept.head}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-900">{dept.teachers} teachers</p>
                          <p className="text-xs text-gray-500">{dept.students} students</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Activities */}
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-4">Recent Activities</h4>
                <div className="space-y-3">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          activity.type === 'student' ? 'bg-blue-100' :
                          activity.type === 'payment' ? 'bg-green-100' :
                          activity.type === 'assignment' ? 'bg-purple-100' :
                          activity.type === 'exam' ? 'bg-yellow-100' :
                          activity.type === 'report' ? 'bg-red-100' : 'bg-gray-100'
                        }`}>
                          <activity.icon className={`h-4 w-4 ${
                            activity.type === 'student' ? 'text-blue-600' :
                            activity.type === 'payment' ? 'text-green-600' :
                            activity.type === 'assignment' ? 'text-purple-600' :
                            activity.type === 'exam' ? 'text-yellow-600' :
                            activity.type === 'report' ? 'text-red-600' : 'text-gray-600'
                          }`} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <p className="text-xs text-gray-500">by {activity.user} • {activity.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "students" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Student Management</h3>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  <UserPlus className="h-4 w-4" />
                  Add New Student
                </button>
              </div>

              {/* Student Registration Form */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-md font-medium text-gray-700 mb-4">Register New Student</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Enter student's full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Generate ID" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>Grade 7</option>
                      <option>Grade 8</option>
                      <option>Grade 9</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Parent/Guardian</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Parent name" />
                  </div>
                  <div className="lg:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg" rows={2} placeholder="Home address"></textarea>
                  </div>
                  <div className="lg:col-span-3">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                      Register Student
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "teachers" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Teacher Management</h3>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  <UserPlus className="h-4 w-4" />
                  Add New Teacher
                </button>
              </div>

              {/* Teacher Registration */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-md font-medium text-gray-700 mb-4">Register New Teacher</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Teacher's full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Generate ID" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Email address" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      {departments.map((dept) => (
                        <option key={dept.name}>{dept.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Highest qualification" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience (years)</label>
                    <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Years of experience" />
                  </div>
                  <div className="lg:col-span-3">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                      Register Teacher
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "fees" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Fee Management</h3>
              
              {/* Fee Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-md font-medium text-gray-700 mb-4">Fee Collection Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-sm font-medium text-gray-600 mb-3">Current Term Overview</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Expected:</span>
                        <span className="text-sm font-bold text-gray-900">$280,144</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Amount Collected:</span>
                        <span className="text-sm font-bold text-green-600">$234,567</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Pending Amount:</span>
                        <span className="text-sm font-bold text-red-600">$45,678</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Collection Rate:</span>
                        <span className="text-sm font-bold text-blue-600">83.7%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-600 mb-3">Class-wise Breakdown</h5>
                    <div className="space-y-2">
                      {feeSummary.map((fee, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-900">{fee.class}</span>
                              <span className="text-sm text-gray-600">{fee.percentage}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${fee.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "academics" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Academic Management</h3>
              
              {/* Academic Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-md font-medium text-gray-700 mb-4">Subject Performance</h4>
                  <div className="space-y-3">
                    {performanceData.map((subject, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">{subject.subject}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${subject.average}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-bold text-gray-900">{subject.average}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-md font-medium text-gray-700 mb-4">Class Distribution</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Grade 7:</span>
                      <span className="text-sm font-bold text-gray-900">479 students (6 classes)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Grade 8:</span>
                      <span className="text-sm font-bold text-gray-900">387 students (5 classes)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Grade 9:</span>
                      <span className="text-sm font-bold text-gray-900">379 students (5 classes)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total:</span>
                      <span className="text-sm font-bold text-gray-900">1,245 students (16 classes)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "reports" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Reports & Analytics</h3>
              
              {/* Report Generation */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-md font-medium text-gray-700 mb-4">Generate Reports</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                    <FileText className="h-6 w-6 text-blue-600 mb-2" />
                    <h5 className="font-medium text-gray-900">Student Progress Report</h5>
                    <p className="text-xs text-gray-600">Individual student academic performance</p>
                  </button>
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                    <BarChart3 className="h-6 w-6 text-green-600 mb-2" />
                    <h5 className="font-medium text-gray-900">Class Performance</h5>
                    <p className="text-xs text-gray-600">Class-wise academic analysis</p>
                  </button>
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                    <DollarSign className="h-6 w-6 text-purple-600 mb-2" />
                    <h5 className="font-medium text-gray-900">Financial Report</h5>
                    <p className="text-xs text-gray-600">Fee collection and financial summary</p>
                  </button>
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                    <Users className="h-6 w-6 text-orange-600 mb-2" />
                    <h5 className="font-medium text-gray-900">Attendance Report</h5>
                    <p className="text-xs text-gray-600">Student and teacher attendance</p>
                  </button>
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                    <Award className="h-6 w-6 text-yellow-600 mb-2" />
                    <h5 className="font-medium text-gray-900">Examination Report</h5>
                    <p className="text-xs text-gray-600">Term and annual exam results</p>
                  </button>
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                    <PieChart className="h-6 w-6 text-red-600 mb-2" />
                    <h5 className="font-medium text-gray-900">Demographics</h5>
                    <p className="text-xs text-gray-600">Student population analysis</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">System Settings</h3>
              
              {/* Settings Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-md font-medium text-gray-700 mb-4">Academic Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Current Academic Year</span>
                      <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                        <option>2023/2024</option>
                        <option>2024/2025</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Current Term</span>
                      <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                        <option>First Term</option>
                        <option>Second Term</option>
                        <option>Third Term</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Grading System</span>
                      <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                        <option>Ghanaian System</option>
                        <option>International System</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-md font-medium text-gray-700 mb-4">System Configuration</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">School Name</span>
                      <input type="text" value="ADJIS" className="px-3 py-1 border border-gray-300 rounded text-sm" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Contact Email</span>
                      <input type="email" value="info@adjis.edu.gh" className="px-3 py-1 border border-gray-300 rounded text-sm" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Phone Number</span>
                      <input type="tel" value="+233 30 123 4567" className="px-3 py-1 border border-gray-300 rounded text-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
