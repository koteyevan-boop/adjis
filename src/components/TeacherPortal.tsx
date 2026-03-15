'use client';

import { useState } from 'react';
import { BookOpen, FileText, Users, Award, Calendar, Plus, Edit, Trash2, Upload, Download, CheckCircle, XCircle, Clock, TrendingUp, TrendingDown } from 'lucide-react';

export default function TeacherPortal() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedClass, setSelectedClass] = useState("Grade 7A");
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");

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
              { id: "dashboard", label: "Dashboard", icon: BookOpen },
              { id: "assignments", label: "Assignments", icon: FileText },
              { id: "gradebook", label: "Gradebook", icon: Award },
              { id: "exams", label: "Exams", icon: Calendar },
              { id: "reports", label: "Reports", icon: Download },
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
              <h3 className="text-lg font-medium text-gray-900">Teacher Dashboard</h3>
              
              {/* Recent Assignments */}
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-3">Recent Assignments</h4>
                <div className="space-y-3">
                  {assignments.slice(0, 3).map((assignment) => (
                    <div key={assignment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{assignment.title}</p>
                        <p className="text-sm text-gray-500">{assignment.class} • Due: {assignment.dueDate}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          assignment.status === 'graded' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {assignment.status}
                        </span>
                        <span className="text-sm text-gray-600">
                          {assignment.submissions}/{assignment.total} submitted
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Exams */}
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-3">Upcoming Exams</h4>
                <div className="space-y-3">
                  {upcomingExams.map((exam) => (
                    <div key={exam.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{exam.subject}</p>
                        <p className="text-sm text-gray-500">{exam.class} • {exam.topic}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{exam.date}</p>
                        <p className="text-xs text-gray-500">{exam.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
                  <div className="md:col-span-2">
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

          {activeTab === "gradebook" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Gradebook</h3>
                <div className="flex items-center gap-4">
                  <select 
                    value={selectedClass} 
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option>Grade 7A</option>
                    <option>Grade 7B</option>
                    <option>Grade 8A</option>
                  </select>
                  <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    <Download className="h-4 w-4" />
                    Export Grades
                  </button>
                </div>
              </div>

              {/* Grade Input */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-md font-medium text-gray-700 mb-4">Input Test Results</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Student</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      {students.map((student) => (
                        <option key={student.id}>{student.name}</option>
                      ))}
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Test Score (%)</label>
                    <input type="number" min="0" max="100" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Enter score" />
                  </div>
                  <div className="md:col-span-3">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                      Add Grade
                    </button>
                  </div>
                </div>
              </div>

              {/* Gradebook Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Math</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">English</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Science</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">History</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {gradebookData.map((student, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{student.student}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input type="number" value={student.math} className="w-16 px-2 py-1 border border-gray-300 rounded" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input type="number" value={student.english} className="w-16 px-2 py-1 border border-gray-300 rounded" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input type="number" value={student.science} className="w-16 px-2 py-1 border border-gray-300 rounded" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input type="number" value={student.history} className="w-16 px-2 py-1 border border-gray-300 rounded" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{student.average.toFixed(1)}%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
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

          {activeTab === "reports" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Terminal Reports</h3>
              
              {/* Report Generation */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-md font-medium text-gray-700 mb-4">Generate Terminal Report</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Class</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>Grade 7A</option>
                      <option>Grade 7B</option>
                      <option>Grade 8A</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Term</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>First Term</option>
                      <option>Second Term</option>
                      <option>Third Term</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>2023/2024</option>
                      <option>2024/2025</option>
                    </select>
                  </div>
                  <div className="md:col-span-3">
                    <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                      Generate Reports
                    </button>
                  </div>
                </div>
              </div>

              {/* Report Templates */}
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-3">Report Templates</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2">Student Progress Report</h5>
                    <p className="text-sm text-gray-600 mb-3">Comprehensive report including academic performance, attendance, and conduct.</p>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Generate Template</button>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2">Subject-Specific Report</h5>
                    <p className="text-sm text-gray-600 mb-3">Detailed report for individual subjects with skills assessment.</p>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Generate Template</button>
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
