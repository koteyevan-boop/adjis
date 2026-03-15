'use client';

import { useState } from 'react';
import { Users, BookOpen, Calendar, FileText, Award, BarChart3, Bell, Settings, Plus, Search, Filter, Download, Upload, Edit, Eye, Trash2, CheckCircle, AlertCircle, Clock, TrendingUp, Mail, Phone, MessageSquare } from 'lucide-react';
import AdvancedGradebook from './AdvancedGradebook';
import MobileOptimizedGradebook from './MobileOptimizedGradebook';
import ReportGeneration from './ReportGeneration';
import MobileOptimizedReportGeneration from './MobileOptimizedReportGeneration';
import SubjectTeacherGradebook from './SubjectTeacherGradebook';
import CommunicationHub from './CommunicationHub';
import LearningMaterials from './LearningMaterials';
import InteractiveAssignment from './InteractiveAssignment';
import ModernTeacherDashboard from './ModernTeacherDashboard';
import ComprehensiveDashboard from './ComprehensiveDashboard';
import { useMobileOptimization } from '@/hooks/useMobileOptimization';

export default function TeacherPortal({ 
  teacherRole = 'subject', 
  teacherName = 'Mr. Johnson', 
  teacherId = 'teacher1',
  assignedClasses = ['Grade 7A', 'Grade 7B'],
  assignedSubjects = ['Mathematics']
}: { 
  teacherRole?: string; 
  teacherName?: string; 
  teacherId?: string;
  assignedClasses?: string[];
  assignedSubjects?: string[];
}) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedClass, setSelectedClass] = useState(assignedClasses[0] || "Grade 7A");
  const [selectedSubject, setSelectedSubject] = useState(assignedSubjects[0] || "Mathematics");
  
  const mobileState = useMobileOptimization();
  const isMobile = mobileState.isMobile;

  const teacherStats = {
    totalStudents: 45,
    assignmentsCreated: 12,
    assignmentsGraded: 8,
    averageGrade: 78.5,
    attendanceRate: 92.3,
    upcomingExams: 2,
  };

  const assignments = [
    { id: 1, title: "Mathematics Quiz - Algebra", class: "Grade 7A", dueDate: "2024-03-20", status: "active", submissions: 38, total: 45 },
    { id: 2, title: "English Essay - Creative Writing", class: "Grade 7B", dueDate: "2024-03-22", status: "active", submissions: 42, total: 44 },
    { id: 3, title: "Science Project - Ecosystems", class: "Grade 7A", dueDate: "2024-03-18", status: "graded", submissions: 45, total: 45 },
    { id: 4, title: "History Test - Ancient Civilizations", class: "Grade 7A", dueDate: "2024-03-15", status: "graded", submissions: 44, total: 45 },
  ];

  const students = [
    { id: 1, name: "Ama Mensah", class: "Grade 7A", attendance: 95, averageGrade: 82, status: "excellent" },
    { id: 2, name: "Kofi Asante", class: "Grade 7A", attendance: 88, averageGrade: 75, status: "good" },
    { id: 3, name: "Yaa Boateng", class: "Grade 7B", attendance: 92, averageGrade: 79, status: "good" },
    { id: 4, name: "Kwame Osei", class: "Grade 7B", attendance: 78, averageGrade: 68, status: "needs_improvement" },
  ];

  const gradebookData = [
    { student: "Ama Mensah", math: 85, english: 82, science: 88, history: 79, average: 83.5 },
    { student: "Kofi Asante", math: 78, english: 75, science: 72, history: 76, average: 75.25 },
    { student: "Yaa Boateng", math: 82, english: 79, science: 85, history: 70, average: 79.0 },
    { student: "Kwame Osei", math: 65, english: 70, science: 68, history: 69, average: 68.0 },
  ];

  const upcomingExams = [
    { id: 1, subject: "Mathematics", class: "Grade 7A", date: "2024-03-25", topic: "Linear Equations", duration: "90 minutes" },
    { id: 2, subject: "English", class: "Grade 7B", date: "2024-03-27", topic: "Reading Comprehension", duration: "60 minutes" },
  ];

  return (
    <div className="p-6">
      {/* Teacher Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{teacherStats.totalStudents}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-100 rounded-lg p-3">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Assignments</p>
              <p className="text-2xl font-bold text-gray-900">{teacherStats.assignmentsGraded}/{teacherStats.assignmentsCreated}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-purple-100 rounded-lg p-3">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Average Grade</p>
              <p className="text-2xl font-bold text-gray-900">{teacherStats.averageGrade}%</p>
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
              { id: "gradebook", label: "Gradebook", icon: BookOpen },
              { id: "assignments", label: "Assignments", icon: FileText },
              { id: "materials", label: "Learning Materials", icon: Upload },
              { id: "communication", label: "Communication", icon: Mail },
              { id: "exams", label: "Exams", icon: Calendar },
              ...(teacherRole === 'class' ? [{ id: "reports", label: "Terminal Reports", icon: FileText }] : []),
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
            <ComprehensiveDashboard
              teacherName={teacherName}
              teacherRole={teacherRole}
              assignedClasses={assignedClasses}
            />
          )}

          {activeTab === "materials" && (
            <LearningMaterials
              teacherRole={teacherRole}
              teacherId={teacherId}
              teacherName={teacherName}
            />
          )}

          {activeTab === "communication" && (
            <CommunicationHub />
          )}

          {activeTab === "assignments" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Assignments Management</h3>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  <Plus className="h-4 w-4" />
                  Create Assignment
                </button>
              </div>

              {/* Assignment Creation Form */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-md font-medium text-gray-700 mb-4">Create New Assignment</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assignment Title</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Enter assignment title" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>Grade 7A</option>
                      <option>Grade 7B</option>
                      <option>Grade 8A</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>Mathematics</option>
                      <option>English</option>
                      <option>Science</option>
                      <option>History</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg" rows={3} placeholder="Enter assignment description"></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload File (Optional)</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                      Create Assignment
                    </button>
                  </div>
                </div>
              </div>

              {/* Existing Assignments */}
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-3">Existing Assignments</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submissions</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {assignments.map((assignment) => (
                        <tr key={assignment.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{assignment.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{assignment.class}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{assignment.dueDate}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              assignment.status === 'graded' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {assignment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{assignment.submissions}/{assignment.total}</div>
                          </td>
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

          {activeTab === "assignments" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Interactive Assignment System</h3>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  <Plus className="h-4 w-4" />
                  Create Assignment
                </button>
              </div>
              
              {/* Sample Interactive Assignment */}
              <InteractiveAssignment
                assignment={{
                  id: "1",
                  title: "Math Problem Solving",
                  description: "Solve the following math problems using the drawing tools",
                  subject: selectedSubject,
                  teacher: teacherName,
                  dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                  materials: [],
                  instructions: "Use the drawing tools to show your work step by step. You can use pencils, shapes, and text to explain your solutions.",
                  maxScore: 100
                }}
              />
            </div>
          )}

          {activeTab === "gradebook" && (
            teacherRole === 'subject' ? (
              <SubjectTeacherGradebook
                teacherId={teacherId}
                teacherName={teacherName}
                subject={selectedSubject}
                assignedClasses={assignedClasses}
              />
            ) : (
              isMobile ? (
                <MobileOptimizedGradebook />
              ) : (
                <AdvancedGradebook />
              )
            )
          )}

          {activeTab === "reports" && teacherRole === 'class' && (
            isMobile ? (
              <MobileOptimizedReportGeneration
                userRole={teacherRole}
                teacherName={teacherName}
                teacherId={teacherId}
              />
            ) : (
              <ReportGeneration
                userRole={teacherRole}
                teacherName={teacherName}
                teacherId={teacherId}
              />
            )
          )}

          {activeTab === "exams" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Exam Management</h3>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  <Plus className="h-4 w-4" />
                  Create Exam
                </button>
              </div>

              {/* Exam Creation */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-md font-medium text-gray-700 mb-4">Create New Exam</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Exam Title</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Enter exam title" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>Mathematics</option>
                      <option>English</option>
                      <option>Science</option>
                      <option>History</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>Grade 7A</option>
                      <option>Grade 7B</option>
                      <option>Grade 8A</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Exam Date</label>
                    <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                    <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="60" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Marks</label>
                    <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="100" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
                    <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg" rows={3} placeholder="Enter exam instructions"></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                      Create Exam
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Teacher Settings</h3>
              
              {/* Profile Settings */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-md font-medium text-gray-700 mb-4">Profile Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" value="Mr. Johnson" className="w-full px-3 py-2 border border-gray-300 rounded-lg" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" value="johnson@adjis.edu.gh" className="w-full px-3 py-2 border border-gray-300 rounded-lg" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input type="tel" value="+233201234567" className="w-full px-3 py-2 border border-gray-300 rounded-lg" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input type="text" value="Mathematics" className="w-full px-3 py-2 border border-gray-300 rounded-lg" readOnly />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input type="text" value="123 Teacher Street, Accra" className="w-full px-3 py-2 border border-gray-300 rounded-lg" readOnly />
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-md font-medium text-gray-700 mb-4">Notification Preferences</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                    <span className="text-sm text-gray-700">Email notifications for new assignments</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                    <span className="text-sm text-gray-700">SMS notifications for urgent messages</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                    <span className="text-sm text-gray-700">Class reminders</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-sm text-gray-700">Weekly summary reports</span>
                  </label>
                </div>
              </div>

              {/* Password Settings */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-md font-medium text-gray-700 mb-4">Security Settings</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                    Update Password
                  </button>
                </div>
              </div>

              {/* System Settings */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-md font-medium text-gray-700 mb-4">System Preferences</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Default Grade Scale</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>Ghanaian System (A-F)</option>
                      <option>Percentage System (0-100)</option>
                      <option>GPA System (0-4.0)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>GMT (Accra)</option>
                      <option>GMT+1 (Lagos)</option>
                      <option>GMT+2 (Cairo)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>English</option>
                      <option>French</option>
                      <option>Spanish</option>
                    </select>
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
