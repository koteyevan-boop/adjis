'use client';

import { useState } from 'react';
import { Download, Upload, Save, Calculator, FileText, Users, Calendar, BookOpen, TrendingUp, AlertCircle, CheckCircle, Edit, Eye, Plus, Trash2, Menu, X, Filter, Search } from 'lucide-react';
import { useMobileOptimization, getResponsiveClasses, getMobileOptimizedStyles } from '@/hooks/useMobileOptimization';

interface Student {
  id: number;
  name: string;
  test1: number;
  test2: number;
  projectWork: number;
  groupWork: number;
  courseworkTotal: number;
  courseworkPercentage: number;
  exam: number;
  examPercentage: number;
  totalScore: number;
  grade: string;
  comment: string;
  topicsCovered: string[];
}

interface GradebookData {
  class: string;
  subject: string;
  term: string;
  academicYear: string;
  students: Student[];
  lessonPlanTopics: string[];
}

export default function MobileOptimizedGradebook() {
  const [activeTab, setActiveTab] = useState("gradebook");
  const [selectedClass, setSelectedClass] = useState("Grade 7A");
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");
  const [selectedTerm, setSelectedTerm] = useState("Second Term");
  const [selectedYear, setSelectedYear] = useState("2023/2024");
  const [editingStudent, setEditingStudent] = useState<number | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const mobileState = useMobileOptimization();
  const responsiveClasses = getResponsiveClasses(mobileState);
  const styles = getMobileOptimizedStyles(mobileState);

  const [gradebookData, setGradebookData] = useState<GradebookData>({
    class: selectedClass,
    subject: selectedSubject,
    term: selectedTerm,
    academicYear: selectedYear,
    students: [
      {
        id: 1,
        name: "Ama Mensah",
        test1: 25,
        test2: 28,
        projectWork: 18,
        groupWork: 19,
        courseworkTotal: 90,
        courseworkPercentage: 45,
        exam: 85,
        examPercentage: 42.5,
        totalScore: 87.5,
        grade: "A",
        comment: "Excellent performance across all assessments. Strong understanding of mathematical concepts.",
        topicsCovered: ["Algebra", "Geometry", "Statistics"]
      },
      {
        id: 2,
        name: "Kofi Asante",
        test1: 22,
        test2: 24,
        projectWork: 16,
        groupWork: 17,
        courseworkTotal: 79,
        courseworkPercentage: 39.5,
        exam: 78,
        examPercentage: 39,
        totalScore: 78.5,
        grade: "B+",
        comment: "Good performance with room for improvement in problem-solving skills.",
        topicsCovered: ["Algebra", "Geometry", "Statistics"]
      }
    ],
    lessonPlanTopics: [
      "Algebraic Expressions and Equations",
      "Geometric Shapes and Properties",
      "Statistics and Data Analysis",
      "Probability Basics",
      "Linear Functions",
      "Coordinate Geometry"
    ]
  });

  const classes = ["Grade 7A", "Grade 7B", "Grade 8A", "Grade 8B", "Grade 9A", "Grade 9B"];
  const subjects = ["Mathematics", "English", "Science", "Social Studies", "French", "ICT"];
  const terms = ["First Term", "Second Term", "Third Term"];
  const academicYears = ["2023/2024", "2024/2025"];

  const calculateGradebook = (students: Student[]) => {
    return students.map(student => {
      const courseworkTotal = student.test1 + student.test2 + student.projectWork + student.groupWork;
      const courseworkPercentage = (courseworkTotal / 100) * 50;
      const examPercentage = (student.exam / 100) * 50;
      const totalScore = courseworkPercentage + examPercentage;
      
      let grade = "F";
      if (totalScore >= 80) grade = "A";
      else if (totalScore >= 75) grade = "B+";
      else if (totalScore >= 70) grade = "B";
      else if (totalScore >= 65) grade = "C+";
      else if (totalScore >= 60) grade = "C";
      else if (totalScore >= 55) grade = "D+";
      else if (totalScore >= 50) grade = "D";
      else if (totalScore >= 45) grade = "E";

      return {
        ...student,
        courseworkTotal,
        courseworkPercentage,
        examPercentage,
        totalScore,
        grade
      };
    });
  };

  const updateStudentScore = (studentId: number, field: keyof Student, value: number) => {
    setGradebookData((prev: GradebookData) => {
      const updatedStudents = prev.students.map((student: Student) => {
        if (student.id === studentId) {
          const updatedStudent = { ...student, [field]: value };
          const recalculated = calculateGradebook([updatedStudent])[0];
          return recalculated;
        }
        return student;
      });
      return { ...prev, students: updatedStudents };
    });
  };

  const exportToExcel = () => {
    const headers = [
      "Student Name", "Test 1 (30)", "Test 2 (30)", "Project Work (20)", 
      "Group Work (20)", "Coursework Total", "Coursework %", 
      "Exam (100)", "Exam %", "Total Score", "Grade", "Comment"
    ];
    
    const csvContent = [
      headers.join(","),
      ...gradebookData.students.map(student => [
        student.name,
        student.test1,
        student.test2,
        student.projectWork,
        student.groupWork,
        student.courseworkTotal,
        student.courseworkPercentage.toFixed(1),
        student.exam,
        student.examPercentage.toFixed(1),
        student.totalScore.toFixed(1),
        student.grade,
        `"${student.comment}"`
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gradebook_${selectedClass}_${selectedSubject}_${selectedTerm}_${selectedYear}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const MobileNavigation = () => (
    <div className="bg-white rounded-lg shadow mb-6">
      {/* Mobile Header */}
      {mobileState.isMobile && (
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold text-gray-900">Gradebook</h2>
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2 rounded-lg hover:bg-gray-100"
            style={styles.touchTarget}
          >
            {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className={`${mobileState.isMobile && !showMobileMenu ? 'hidden' : ''} border-b border-gray-200`}>
        <nav className={`${mobileState.isMobile ? 'flex flex-col' : responsiveClasses.navTabs} -mb-px`}>
          {[
            { id: "gradebook", label: "Gradebook", icon: Calculator },
            { id: "reports", label: "Reports", icon: FileText },
            { id: "analytics", label: "Analytics", icon: TrendingUp },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                if (mobileState.isMobile) setShowMobileMenu(false);
              }}
              className={`flex items-center gap-2 ${responsiveClasses.navButton} border-b-2 font-medium ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              style={mobileState.isMobile ? styles.touchTarget : {}}
            >
              <tab.icon className="h-4 w-4" />
              <span className={mobileState.isMobile ? 'text-xs' : 'text-sm'}>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );

  const MobileControls = () => (
    <div className={`${responsiveClasses.card} bg-gray-50 rounded-lg`}>
      {/* Mobile Filter Toggle */}
      {mobileState.isMobile && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-700">Filters</h3>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg"
            style={styles.touchTarget}
          >
            <Filter className="h-4 w-4" />
            {showFilters ? 'Hide' : 'Show'}
          </button>
        </div>
      )}

      {/* Controls */}
      <div className={`${mobileState.isMobile && !showFilters ? 'hidden' : 'space-y-4'}`}>
        <div className={`${mobileState.isMobile ? 'space-y-3' : 'grid grid-cols-2 md:grid-cols-4 gap-4'}`}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className={`w-full ${responsiveClasses.input} border border-gray-300 rounded-lg`}
            >
              {classes.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className={`w-full ${responsiveClasses.input} border border-gray-300 rounded-lg`}
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Term</label>
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className={`w-full ${responsiveClasses.input} border border-gray-300 rounded-lg`}
            >
              {terms.map(term => (
                <option key={term} value={term}>{term}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className={`w-full ${responsiveClasses.input} border border-gray-300 rounded-lg`}
            >
              {academicYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={`${mobileState.isMobile ? 'flex flex-col gap-2' : 'flex items-center gap-2'}`}>
          <label className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
                 style={styles.touchTarget}>
            <Upload className="h-4 w-4" />
            <span className={mobileState.isMobile ? 'text-sm' : ''}>Upload Lesson Plan</span>
            <input type="file" accept=".pdf,.doc,.docx" className="hidden" />
          </label>
          
          <label className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 cursor-pointer"
                 style={styles.touchTarget}>
            <Upload className="h-4 w-4" />
            <span className={mobileState.isMobile ? 'text-sm' : ''}>Import Excel</span>
            <input type="file" accept=".xlsx,.xls,.csv" className="hidden" />
          </label>
          
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
            style={styles.touchTarget}
          >
            <Download className="h-4 w-4" />
            <span className={mobileState.isMobile ? 'text-sm' : ''}>Export</span>
          </button>
        </div>
      </div>
    </div>
  );

  const MobileGradebookTable = () => (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className={`${responsiveClasses.card} border-b border-gray-200`}>
        <h3 className={`${responsiveClasses.subheading} font-medium text-gray-900`}>
          Gradebook - {selectedClass} | {selectedSubject}
        </h3>
      </div>
      
      {/* Mobile Card View */}
      {mobileState.isMobile ? (
        <div className="divide-y divide-gray-200">
          {gradebookData.students.map((student) => (
            <div key={student.id} className="p-4">
              {/* Student Header */}
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{student.name}</h4>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    student.grade === 'A' ? 'bg-green-100 text-green-800' :
                    student.grade === 'B+' || student.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {student.grade}
                  </span>
                  <button
                    onClick={() => setEditingStudent(editingStudent === student.id ? null : student.id)}
                    className="p-1 text-blue-600 hover:text-blue-900"
                    style={styles.touchTarget}
                  >
                    {editingStudent === student.id ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Scores Grid */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-gray-50 p-2 rounded">
                  <p className="text-xs text-gray-600">Test 1 (30)</p>
                  {editingStudent === student.id ? (
                    <input
                      type="number"
                      min="0"
                      max="30"
                      value={student.test1}
                      onChange={(e) => updateStudentScore(student.id, 'test1', Number(e.target.value))}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-center"
                      style={styles.touchTarget}
                    />
                  ) : (
                    <p className="font-medium text-gray-900">{student.test1}</p>
                  )}
                </div>
                
                <div className="bg-gray-50 p-2 rounded">
                  <p className="text-xs text-gray-600">Test 2 (30)</p>
                  {editingStudent === student.id ? (
                    <input
                      type="number"
                      min="0"
                      max="30"
                      value={student.test2}
                      onChange={(e) => updateStudentScore(student.id, 'test2', Number(e.target.value))}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-center"
                      style={styles.touchTarget}
                    />
                  ) : (
                    <p className="font-medium text-gray-900">{student.test2}</p>
                  )}
                </div>
                
                <div className="bg-gray-50 p-2 rounded">
                  <p className="text-xs text-gray-600">Project (20)</p>
                  {editingStudent === student.id ? (
                    <input
                      type="number"
                      min="0"
                      max="20"
                      value={student.projectWork}
                      onChange={(e) => updateStudentScore(student.id, 'projectWork', Number(e.target.value))}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-center"
                      style={styles.touchTarget}
                    />
                  ) : (
                    <p className="font-medium text-gray-900">{student.projectWork}</p>
                  )}
                </div>
                
                <div className="bg-gray-50 p-2 rounded">
                  <p className="text-xs text-gray-600">Group (20)</p>
                  {editingStudent === student.id ? (
                    <input
                      type="number"
                      min="0"
                      max="20"
                      value={student.groupWork}
                      onChange={(e) => updateStudentScore(student.id, 'groupWork', Number(e.target.value))}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-center"
                      style={styles.touchTarget}
                    />
                  ) : (
                    <p className="font-medium text-gray-900">{student.groupWork}</p>
                  )}
                </div>
              </div>

              {/* Exam and Total */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-blue-50 p-2 rounded">
                  <p className="text-xs text-blue-600">Exam (100)</p>
                  {editingStudent === student.id ? (
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={student.exam}
                      onChange={(e) => updateStudentScore(student.id, 'exam', Number(e.target.value))}
                      className="w-full px-2 py-1 border border-blue-300 rounded text-center"
                      style={styles.touchTarget}
                    />
                  ) : (
                    <p className="font-medium text-blue-900">{student.exam}</p>
                  )}
                </div>
                
                <div className="bg-purple-50 p-2 rounded">
                  <p className="text-xs text-purple-600">Total Score</p>
                  <p className="font-bold text-purple-900">{student.totalScore.toFixed(1)}</p>
                </div>
              </div>

              {/* Comment */}
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-xs text-gray-600 mb-1">Comment</p>
                <p className="text-sm text-gray-700 line-clamp-2">{student.comment}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Desktop Table View */
        <div className={responsiveClasses.tableContainer}>
          <table className={`min-w-full divide-y divide-gray-200 ${responsiveClasses.tableMinWidth}`}>
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student Name</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Test 1<br/>(30)</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Test 2<br/>(30)</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Project<br/>(20)</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Group<br/>(20)</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">CW<br/>50%</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Exam<br/>(100)</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Exam<br/>50%</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Total<br/>Score</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Grade</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Auto Comment</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {gradebookData.students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.name}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center">
                    {editingStudent === student.id ? (
                      <input
                        type="number"
                        min="0"
                        max="30"
                        value={student.test1}
                        onChange={(e) => updateStudentScore(student.id, 'test1', Number(e.target.value))}
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                      />
                    ) : (
                      <span className="text-sm text-gray-900">{student.test1}</span>
                    )}
                  </td>
                  {/* Other table cells... */}
                  <td className="px-4 py-3 whitespace-nowrap text-center">
                    <span className="text-sm font-bold text-purple-600">{student.totalScore.toFixed(1)}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      student.grade === 'A' ? 'bg-green-100 text-green-800' :
                      student.grade === 'B+' || student.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {student.grade}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate" title={student.comment}>
                    {student.comment}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center">
                    <button
                      onClick={() => setEditingStudent(editingStudent === student.id ? null : student.id)}
                      className="text-blue-600 hover:text-blue-900 mr-2"
                    >
                      {editingStudent === student.id ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const MobileStatistics = () => (
    <div className={`${mobileState.isMobile ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'}`}>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Class Average</p>
            <p className={`${mobileState.isMobile ? 'text-xl' : 'text-2xl'} font-bold text-gray-900`}>
              {(gradebookData.students.reduce((sum, s) => sum + s.totalScore, 0) / gradebookData.students.length).toFixed(1)}
            </p>
          </div>
          <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
            <Calculator className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Highest Score</p>
            <p className={`${mobileState.isMobile ? 'text-xl' : 'text-2xl'} font-bold text-green-600`}>
              {Math.max(...gradebookData.students.map(s => s.totalScore)).toFixed(1)}
            </p>
          </div>
          <div className="flex-shrink-0 bg-green-100 rounded-lg p-3">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Lowest Score</p>
            <p className={`${mobileState.isMobile ? 'text-xl' : 'text-2xl'} font-bold text-red-600`}>
              {Math.min(...gradebookData.students.map(s => s.totalScore)).toFixed(1)}
            </p>
          </div>
          <div className="flex-shrink-0 bg-red-100 rounded-lg p-3">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Pass Rate</p>
            <p className={`${mobileState.isMobile ? 'text-xl' : 'text-2xl'} font-bold text-blue-600`}>
              {((gradebookData.students.filter(s => s.totalScore >= 50).length / gradebookData.students.length) * 100).toFixed(1)}%
            </p>
          </div>
          <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
            <CheckCircle className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`${responsiveClasses.container}`}>
      <MobileNavigation />
      
      {activeTab === "gradebook" && (
        <div className="space-y-6">
          <MobileControls />
          <MobileGradebookTable />
          <MobileStatistics />
        </div>
      )}

      {activeTab === "reports" && (
        <div className="space-y-6">
          <h3 className={responsiveClasses.heading}>Gradebook Reports</h3>
          <div className={`${mobileState.isMobile ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-2 gap-6'}`}>
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="text-md font-medium text-gray-700 mb-4">Class Performance Report</h4>
              <p className="text-sm text-gray-600 mb-4">Generate comprehensive class performance report.</p>
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                      style={styles.touchTarget}>
                <FileText className="h-4 w-4" />
                Generate Report
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="space-y-6">
          <h3 className={responsiveClasses.heading}>Gradebook Analytics</h3>
          <div className="bg-white rounded-lg shadow p-6">
            <h4 className="text-md font-medium text-gray-700 mb-4">Performance Distribution</h4>
            <div className="space-y-4">
              {['A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'E', 'F'].map(grade => {
                const count = gradebookData.students.filter(s => s.grade === grade).length;
                const percentage = (count / gradebookData.students.length) * 100;
                
                return (
                  <div key={grade} className="flex items-center gap-4">
                    <div className="w-12 text-sm font-medium text-gray-700">{grade}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-6">
                      <div
                        className={`h-6 rounded-full ${
                          grade === 'A' ? 'bg-green-500' :
                          grade === 'B+' || grade === 'B' ? 'bg-blue-500' :
                          grade === 'C+' || grade === 'C' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="w-12 text-sm text-gray-600">{count}</div>
                    <div className="w-12 text-sm text-gray-600">{percentage.toFixed(1)}%</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
