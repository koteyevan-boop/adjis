'use client';

import { useState } from 'react';
import { Users, FileText, Calendar, BookOpen, User, Ruler, Weight, Download, Eye, Save, AlertCircle, CheckCircle, Settings } from 'lucide-react';

interface StudentReport {
  id: number;
  name: string;
  class: string;
  attendance: number;
  height: string;
  weight: string;
  classTeacher: string;
  term: string;
  academicYear: string;
  subjects: SubjectGrade[];
  totalScore: number;
  position: number;
  classPosition: number;
  comment: string;
}

interface SubjectGrade {
  subject: string;
  teacher: string;
  test1: number;
  test2: number;
  projectWork: number;
  groupWork: number;
  exam: number;
  totalScore: number;
  grade: string;
  comment: string;
}

interface TeacherAssignment {
  teacherId: string;
  teacherName: string;
  subjects: string[];
  classes: string[];
  role: 'class' | 'subject';
}

export default function ReportGeneration({ userRole, teacherName, teacherId }: { userRole: string; teacherName: string; teacherId: string }) {
  const [activeTab, setActiveTab] = useState("setup");
  const [selectedClass, setSelectedClass] = useState("Grade 7A");
  const [selectedTerm, setSelectedTerm] = useState("Second Term");
  const [selectedYear, setSelectedYear] = useState("2023/2024");
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);

  // Teacher assignments - in real app, this would come from database
  const teacherAssignments: TeacherAssignment[] = [
    {
      teacherId: "teacher1",
      teacherName: "Mr. Johnson",
      subjects: ["Mathematics"],
      classes: ["Grade 7A", "Grade 7B"],
      role: "subject"
    },
    {
      teacherId: "teacher2", 
      teacherName: "Ms. Smith",
      subjects: ["English"],
      classes: ["Grade 7A", "Grade 8A"],
      role: "subject"
    },
    {
      teacherId: "teacher3",
      teacherName: "Mrs. Williams",
      subjects: ["Mathematics", "English"],
      classes: ["Grade 7A"],
      role: "class"
    }
  ];

  // Get current teacher's assignment
  const currentTeacher = teacherAssignments.find(t => t.teacherId === teacherId) || {
    teacherId,
    teacherName,
    subjects: [],
    classes: [],
    role: userRole === 'class_teacher' ? 'class' : 'subject'
  };

  // Filter available classes based on teacher role
  const availableClasses = currentTeacher.role === 'class' 
    ? currentTeacher.classes 
    : currentTeacher.classes;

  // Sample student data with subject grades from different teachers
  const [studentReports, setStudentReports] = useState<StudentReport[]>([
    {
      id: 1,
      name: "Ama Mensah",
      class: "Grade 7A",
      attendance: 95,
      height: "150cm",
      weight: "45kg",
      classTeacher: "Mrs. Williams",
      term: "Second Term",
      academicYear: "2023/2024",
      subjects: [
        {
          subject: "Mathematics",
          teacher: "Mr. Johnson",
          test1: 25,
          test2: 28,
          projectWork: 18,
          groupWork: 19,
          exam: 85,
          totalScore: 87.5,
          grade: "A",
          comment: "Excellent performance in mathematical concepts and problem-solving."
        },
        {
          subject: "English",
          teacher: "Ms. Smith", 
          test1: 24,
          test2: 26,
          projectWork: 17,
          groupWork: 18,
          exam: 82,
          totalScore: 83.5,
          grade: "B+",
          comment: "Good command of language with room for improvement in creative writing."
        }
      ],
      totalScore: 85.5,
      position: 1,
      classPosition: 1,
      comment: "Outstanding student with excellent academic performance and good conduct."
    },
    {
      id: 2,
      name: "Kofi Asante",
      class: "Grade 7A", 
      attendance: 88,
      height: "148cm",
      weight: "42kg",
      classTeacher: "Mrs. Williams",
      term: "Second Term",
      academicYear: "2023/2024",
      subjects: [
        {
          subject: "Mathematics",
          teacher: "Mr. Johnson",
          test1: 22,
          test2: 24,
          projectWork: 16,
          groupWork: 17,
          exam: 78,
          totalScore: 78.5,
          grade: "B+",
          comment: "Good performance with consistent effort in mathematics."
        },
        {
          subject: "English",
          teacher: "Ms. Smith",
          test1: 20,
          test2: 22,
          projectWork: 15,
          groupWork: 16,
          exam: 75,
          totalScore: 74.0,
          grade: "B",
          comment: "Satisfactory progress in English language skills."
        }
      ],
      totalScore: 76.25,
      position: 2,
      classPosition: 2,
      comment: "Good student showing steady improvement in all subjects."
    }
  ]);

  const classes = ["Grade 7A", "Grade 7B", "Grade 8A", "Grade 8B", "Grade 9A", "Grade 9B"];
  const terms = ["First Term", "Second Term", "Third Term"];
  const academicYears = ["2023/2024", "2024/2025"];

  const handleStudentSelection = (studentId: number) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const updateStudentData = (studentId: number, field: keyof StudentReport, value: any) => {
    setStudentReports(prev => prev.map(student => 
      student.id === studentId ? { ...student, [field]: value } : student
    ));
  };

  const generateReports = () => {
    if (currentTeacher.role === 'subject') {
      alert("Subject teachers cannot generate terminal reports. Only class teachers can generate reports.");
      return;
    }

    if (selectedStudents.length === 0) {
      alert("Please select at least one student to generate reports.");
      return;
    }

    alert(`Generating terminal reports for ${selectedStudents.length} students...`);
  };

  const downloadReports = () => {
    if (currentTeacher.role === 'subject') {
      alert("Subject teachers cannot download terminal reports.");
      return;
    }

    // Generate CSV for selected students
    const selectedData = studentReports.filter(s => selectedStudents.includes(s.id));
    const csvContent = [
      "Name,Class,Attendance,Height,Weight,Total Score,Grade,Position,Comment",
      ...selectedData.map(student => 
        `"${student.name}","${student.class}",${student.attendance},"${student.height}","${student.weight}",${student.totalScore},"${student.subjects.reduce((acc, s) => acc + s.totalScore, 0) / student.subjects.length}","${student.position}","${student.comment}"`
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `terminal_reports_${selectedClass}_${selectedTerm}_${selectedYear}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const previewReport = (studentId: number) => {
    const student = studentReports.find(s => s.id === studentId);
    if (!student) return;

    // Open preview modal or navigate to preview page
    alert(`Previewing report for ${student.name}`);
  };

  return (
    <div className="p-6">
      {/* Role Indicator */}
      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`rounded-lg p-3 ${
              currentTeacher.role === 'class' ? 'bg-purple-100' : 'bg-blue-100'
            }`}>
              <User className={`h-6 w-6 ${
                currentTeacher.role === 'class' ? 'text-purple-600' : 'text-blue-600'
              }`} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {currentTeacher.role === 'class' ? 'Class Teacher' : 'Subject Teacher'} Portal
              </h2>
              <p className="text-sm text-gray-600">{currentTeacher.teacherName}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Assigned Classes:</p>
            <p className="text-sm font-medium text-gray-900">
              {currentTeacher.classes.join(", ")}
            </p>
            {currentTeacher.role === 'subject' && (
              <p className="text-xs text-orange-600 mt-1">
                Report generation restricted
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {[
              { id: "setup", label: "Report Setup", icon: Settings },
              { id: "students", label: "Student Data", icon: Users },
              { id: "preview", label: "Preview Reports", icon: Eye },
              { id: "generate", label: "Generate", icon: FileText },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                disabled={tab.id === "generate" && currentTeacher.role === 'subject'}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "setup" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Terminal Report Setup</h3>
              
              {/* Report Configuration */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-md font-medium text-gray-700 mb-4">Report Configuration</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Class</label>
                    <select
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      {availableClasses.map(cls => (
                        <option key={cls} value={cls}>{cls}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      {academicYears.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Term</label>
                    <select
                      value={selectedTerm}
                      onChange={(e) => setSelectedTerm(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      {terms.map(term => (
                        <option key={term} value={term}>{term}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Class Teacher</label>
                    <input
                      type="text"
                      value={currentTeacher.role === 'class' ? currentTeacher.teacherName : "Mrs. Williams"}
                      readOnly={currentTeacher.role === 'subject'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                {currentTeacher.role === 'subject' && (
                  <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-orange-600" />
                      <div>
                        <p className="text-sm text-orange-800 font-medium">Subject Teacher Access</p>
                        <p className="text-xs text-orange-600">
                          You can view student data and input grades, but only class teachers can generate terminal reports.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Subject Information */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h4 className="text-lg font-medium text-gray-900">Subject Information</h4>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-3">Your Subjects</h5>
                      <div className="space-y-2">
                        {currentTeacher.subjects.map((subject, index) => (
                          <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                            <BookOpen className="h-4 w-4 text-blue-600" />
                            <span className="text-sm text-gray-900">{subject}</span>
                            <span className="text-xs text-gray-500 ml-auto">
                              {currentTeacher.classes.join(", ")}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-3">Assigned Classes</h5>
                      <div className="space-y-2">
                        {currentTeacher.classes.map((cls, index) => (
                          <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                            <Users className="h-4 w-4 text-purple-600" />
                            <span className="text-sm text-gray-900">{cls}</span>
                            <span className="text-xs text-gray-500 ml-auto">
                              {studentReports.filter(s => s.class === cls).length} students
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "students" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Student Data Management</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    {selectedStudents.length} of {studentReports.length} students selected
                  </span>
                  <button
                    onClick={() => setSelectedStudents(studentReports.map(s => s.id))}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Select All
                  </button>
                  <button
                    onClick={() => setSelectedStudents([])}
                    className="text-sm text-gray-600 hover:text-gray-800"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Students Table */}
              <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={selectedStudents.length === studentReports.length}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedStudents(studentReports.map(s => s.id));
                            } else {
                              setSelectedStudents([]);
                            }
                          }}
                          className="rounded border-gray-300"
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Height</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Weight</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subjects</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {studentReports
                      .filter(student => currentTeacher.classes.includes(student.class))
                      .map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedStudents.includes(student.id)}
                            onChange={() => handleStudentSelection(student.id)}
                            className="rounded border-gray-300"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {student.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.class}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {currentTeacher.role === 'class' ? (
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={student.attendance}
                              onChange={(e) => updateStudentData(student.id, 'attendance', Number(e.target.value))}
                              className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                            />
                          ) : (
                            <span className="text-sm text-gray-900">{student.attendance}%</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {currentTeacher.role === 'class' ? (
                            <div className="flex items-center gap-1">
                              <Ruler className="h-3 w-3 text-gray-400" />
                              <input
                                type="text"
                                value={student.height}
                                onChange={(e) => updateStudentData(student.id, 'height', e.target.value)}
                                className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                              />
                            </div>
                          ) : (
                            <span className="text-sm text-gray-900">{student.height}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {currentTeacher.role === 'class' ? (
                            <div className="flex items-center gap-1">
                              <Weight className="h-3 w-3 text-gray-400" />
                              <input
                                type="text"
                                value={student.weight}
                                onChange={(e) => updateStudentData(student.id, 'weight', e.target.value)}
                                className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                              />
                            </div>
                          ) : (
                            <span className="text-sm text-gray-900">{student.weight}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="space-y-1">
                            {student.subjects.map((subject, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <span className="text-xs text-gray-600">{subject.subject}:</span>
                                <span className={`text-xs font-medium ${
                                  subject.grade === 'A' ? 'text-green-600' :
                                  subject.grade === 'B+' || subject.grade === 'B' ? 'text-blue-600' :
                                  'text-yellow-600'
                                }`}>
                                  {subject.totalScore.toFixed(1)} ({subject.grade})
                                </span>
                                {currentTeacher.subjects.includes(subject.subject) && (
                                  <span className="text-xs text-purple-600">•</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-bold text-purple-600">
                            {student.totalScore.toFixed(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => previewReport(student.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "preview" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Report Preview</h3>
              
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h4 className="text-lg font-medium text-gray-900">Terminal Report Preview</h4>
                </div>
                
                {/* Sample Report Preview */}
                <div className="p-6">
                  <div className="border-2 border-gray-200 rounded-lg p-8">
                    {/* Report Header */}
                    <div className="text-center mb-6">
                      <h2 className="text-xl font-bold text-gray-900">ADJIS TERMINAL REPORT</h2>
                      <p className="text-sm text-gray-600">Adorable Babies & Josemaria International School</p>
                      <p className="text-xs text-gray-500 mt-1">{selectedTerm} • {selectedYear}</p>
                    </div>

                    {/* Student Information */}
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Student Information</h4>
                        <div className="space-y-1 text-sm">
                          <p><span className="font-medium">Name:</span> Ama Mensah</p>
                          <p><span className="font-medium">Class:</span> {selectedClass}</p>
                          <p><span className="font-medium">Attendance:</span> 95%</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Physical Information</h4>
                        <div className="space-y-1 text-sm">
                          <p><span className="font-medium">Height:</span> 150cm</p>
                          <p><span className="font-medium">Weight:</span> 45kg</p>
                          <p><span className="font-medium">Class Teacher:</span> {currentTeacher.teacherName}</p>
                        </div>
                      </div>
                    </div>

                    {/* Subject Grades */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Academic Performance</h4>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Subject</th>
                            <th className="text-center py-2">Test 1</th>
                            <th className="text-center py-2">Test 2</th>
                            <th className="text-center py-2">Project</th>
                            <th className="text-center py-2">Group</th>
                            <th className="text-center py-2">Exam</th>
                            <th className="text-center py-2">Total</th>
                            <th className="text-center py-2">Grade</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2">Mathematics</td>
                            <td className="text-center">25</td>
                            <td className="text-center">28</td>
                            <td className="text-center">18</td>
                            <td className="text-center">19</td>
                            <td className="text-center">85</td>
                            <td className="text-center font-bold">87.5</td>
                            <td className="text-center">
                              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">A</span>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">English</td>
                            <td className="text-center">24</td>
                            <td className="text-center">26</td>
                            <td className="text-center">17</td>
                            <td className="text-center">18</td>
                            <td className="text-center">82</td>
                            <td className="text-center font-bold">83.5</td>
                            <td className="text-center">
                              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">B+</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Comments */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Comments</h4>
                      <div className="space-y-3">
                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-xs font-medium text-gray-600 mb-1">Mathematics (Mr. Johnson)</p>
                          <p className="text-sm text-gray-700">Excellent performance in mathematical concepts and problem-solving.</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-xs font-medium text-gray-600 mb-1">English (Ms. Smith)</p>
                          <p className="text-sm text-gray-700">Good command of language with room for improvement in creative writing.</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded">
                          <p className="text-xs font-medium text-gray-600 mb-1">Class Teacher (Mrs. Williams)</p>
                          <p className="text-sm text-gray-700">Outstanding student with excellent academic performance and good conduct.</p>
                        </div>
                      </div>
                    </div>

                    {/* Position and Signature */}
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-sm text-gray-600">Position in Class: 1st out of 45</p>
                        <p className="text-sm text-gray-600">Total Score: 85.5%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">_________________________</p>
                        <p className="text-sm text-gray-600">Class Teacher Signature</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "generate" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Generate Terminal Reports</h3>
              
              {currentTeacher.role === 'subject' ? (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-6 w-6 text-orange-600" />
                    <div>
                      <h4 className="text-lg font-medium text-orange-800">Access Restricted</h4>
                      <p className="text-orange-600 mt-1">
                        Subject teachers cannot generate terminal reports. Only class teachers have permission to generate and download terminal reports.
                      </p>
                      <p className="text-orange-600 text-sm mt-2">
                        You can continue to input grades and view student data, but report generation is handled by the class teacher.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Generation Summary */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-md font-medium text-gray-700 mb-4">Report Generation Summary</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-blue-600">{selectedStudents.length}</p>
                        <p className="text-sm text-gray-600">Students Selected</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-green-600">{studentReports.length}</p>
                        <p className="text-sm text-gray-600">Total Students in Class</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-purple-600">
                          {studentReports[0]?.subjects.length || 0}
                        </p>
                        <p className="text-sm text-gray-600">Subjects per Student</p>
                      </div>
                    </div>
                  </div>

                  {/* Report Options */}
                  <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h4 className="text-lg font-medium text-gray-900">Report Options</h4>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                          <label className="text-sm text-gray-700">Include student photographs</label>
                        </div>
                        <div className="flex items-center gap-3">
                          <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                          <label className="text-sm text-gray-700">Include subject teacher comments</label>
                        </div>
                        <div className="flex items-center gap-3">
                          <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                          <label className="text-sm text-gray-700">Include class position</label>
                        </div>
                        <div className="flex items-center gap-3">
                          <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                          <label className="text-sm text-gray-700">Include attendance summary</label>
                        </div>
                        <div className="flex items-center gap-3">
                          <input type="checkbox" className="rounded border-gray-300" />
                          <label className="text-sm text-gray-700">Include conduct assessment</label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={generateReports}
                      disabled={selectedStudents.length === 0}
                      className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FileText className="h-5 w-5" />
                      Generate Reports
                    </button>
                    <button
                      onClick={downloadReports}
                      disabled={selectedStudents.length === 0}
                      className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Download className="h-5 w-5" />
                      Download Reports
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
