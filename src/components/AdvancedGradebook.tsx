'use client';

import { useState } from 'react';
import { Download, Upload, Save, Calculator, FileText, Users, Calendar, BookOpen, TrendingUp, AlertCircle, CheckCircle, Edit, Eye, Plus, Trash2 } from 'lucide-react';

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

export default function AdvancedGradebook() {
  const [activeTab, setActiveTab] = useState("gradebook");
  const [selectedClass, setSelectedClass] = useState("Grade 7A");
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");
  const [selectedTerm, setSelectedTerm] = useState("Second Term");
  const [selectedYear, setSelectedYear] = useState("2023/2024");
  const [editingStudent, setEditingStudent] = useState<number | null>(null);

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
      },
      {
        id: 3,
        name: "Yaa Boateng",
        test1: 28,
        test2: 26,
        projectWork: 19,
        groupWork: 18,
        courseworkTotal: 91,
        courseworkPercentage: 45.5,
        exam: 88,
        examPercentage: 44,
        totalScore: 89.5,
        grade: "A",
        comment: "Outstanding performance. Consistently demonstrates strong analytical skills.",
        topicsCovered: ["Algebra", "Geometry", "Statistics"]
      },
      {
        id: 4,
        name: "Kwame Osei",
        test1: 18,
        test2: 20,
        projectWork: 14,
        groupWork: 15,
        courseworkTotal: 67,
        courseworkPercentage: 33.5,
        exam: 65,
        examPercentage: 32.5,
        totalScore: 66,
        grade: "C",
        comment: "Needs improvement in understanding fundamental concepts. Additional support recommended.",
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
      const courseworkPercentage = (courseworkTotal / 100) * 50; // 50% of total
      const examPercentage = (student.exam / 100) * 50; // 50% of total
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

  const generateComment = (student: Student, lessonTopics: string[]) => {
    const performanceLevel = student.totalScore >= 80 ? "excellent" : 
                           student.totalScore >= 70 ? "good" : 
                           student.totalScore >= 60 ? "satisfactory" : "needs improvement";
    
    const strengths = [];
    const weaknesses = [];
    
    if (student.test1 >= 25) strengths.push("test assessments");
    if (student.projectWork >= 17) strengths.push("project work");
    if (student.groupWork >= 17) strengths.push("group collaboration");
    if (student.exam >= 80) strengths.push("examination performance");
    
    if (student.test1 < 20) weaknesses.push("test performance");
    if (student.projectWork < 15) weaknesses.push("project work");
    if (student.groupWork < 15) weaknesses.push("group work");
    if (student.exam < 60) weaknesses.push("examination results");

    let comment = `Student shows ${performanceLevel} performance in ${selectedSubject}. `;
    
    if (strengths.length > 0) {
      comment += `Strengths observed in ${strengths.join(", ")}. `;
    }
    
    if (weaknesses.length > 0) {
      comment += `Areas needing improvement include ${weaknesses.join(", ")}. `;
    }
    
    comment += `Topics covered this term include: ${lessonTopics.slice(0, 3).join(", ")}. `;
    
    if (student.totalScore >= 70) {
      comment += "Continue maintaining good performance and consistent study habits.";
    } else {
      comment += "Additional support and practice recommended to improve understanding.";
    }
    
    return comment;
  };

  const updateStudentScore = (studentId: number, field: keyof Student, value: number) => {
    setGradebookData((prev: GradebookData) => {
      const updatedStudents = prev.students.map((student: Student) => {
        if (student.id === studentId) {
          const updatedStudent = { ...student, [field]: value };
          const recalculated = calculateGradebook([updatedStudent])[0];
          const comment = generateComment(recalculated, prev.lessonPlanTopics);
          return { ...recalculated, comment };
        }
        return student;
      });
      return { ...prev, students: updatedStudents };
    });
  };

  const handleLessonPlanUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate lesson plan processing
      const extractedTopics = [
        "Algebraic Expressions and Equations",
        "Geometric Shapes and Properties", 
        "Statistics and Data Analysis",
        "Probability Basics",
        "Linear Functions",
        "Coordinate Geometry"
      ];
      
      setGradebookData((prev: GradebookData) => {
        const updatedStudents = prev.students.map((student: Student) => ({
          ...student,
          comment: generateComment(student, extractedTopics)
        }));
        
        return {
          ...prev,
          lessonPlanTopics: extractedTopics,
          students: updatedStudents
        };
      });

      alert("Lesson plan uploaded successfully! Topics extracted and comments updated.");
    }
  };

  const exportToExcel = () => {
    // Create CSV content
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

    // Download CSV file
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gradebook_${selectedClass}_${selectedSubject}_${selectedTerm}_${selectedYear}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importFromExcel = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate Excel import
      alert("Excel file imported successfully! Gradebook updated with new data.");
    }
  };

  return (
    <div className="p-6">
      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {[
              { id: "gradebook", label: "Gradebook", icon: Calculator },
              { id: "reports", label: "Reports", icon: FileText },
              { id: "analytics", label: "Analytics", icon: TrendingUp },
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
          {activeTab === "gradebook" && (
            <div className="space-y-6">
              {/* Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                    <select
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg"
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
                      className="px-3 py-2 border border-gray-300 rounded-lg"
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
                      className="px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      {terms.map(term => (
                        <option key={term} value={term}>{term}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      {academicYears.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer">
                    <Upload className="h-4 w-4" />
                    Upload Lesson Plan
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleLessonPlanUpload}
                      className="hidden"
                    />
                  </label>
                  
                  <label className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 cursor-pointer">
                    <Upload className="h-4 w-4" />
                    Import Excel
                    <input
                      type="file"
                      accept=".xlsx,.xls,.csv"
                      onChange={importFromExcel}
                      className="hidden"
                    />
                  </label>
                  
                  <button
                    onClick={exportToExcel}
                    className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
                  >
                    <Download className="h-4 w-4" />
                    Export Excel
                  </button>
                </div>
              </div>

              {/* Gradebook Table */}
              <div className="bg-white rounded-lg shadow overflow-x-auto">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    Gradebook - {selectedClass} | {selectedSubject} | {selectedTerm} | {selectedYear}
                  </h3>
                </div>
                
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Test 1<br/>(30)</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Test 2<br/>(30)</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Project<br/>(20)</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Group<br/>(20)</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">CW<br/>Total</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">CW<br/>50%</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Exam<br/>(100)</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Exam<br/>50%</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Total<br/>Score</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Auto Comment</th>
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
                        
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          {editingStudent === student.id ? (
                            <input
                              type="number"
                              min="0"
                              max="30"
                              value={student.test2}
                              onChange={(e) => updateStudentScore(student.id, 'test2', Number(e.target.value))}
                              className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                            />
                          ) : (
                            <span className="text-sm text-gray-900">{student.test2}</span>
                          )}
                        </td>
                        
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          {editingStudent === student.id ? (
                            <input
                              type="number"
                              min="0"
                              max="20"
                              value={student.projectWork}
                              onChange={(e) => updateStudentScore(student.id, 'projectWork', Number(e.target.value))}
                              className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                            />
                          ) : (
                            <span className="text-sm text-gray-900">{student.projectWork}</span>
                          )}
                        </td>
                        
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          {editingStudent === student.id ? (
                            <input
                              type="number"
                              min="0"
                              max="20"
                              value={student.groupWork}
                              onChange={(e) => updateStudentScore(student.id, 'groupWork', Number(e.target.value))}
                              className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                            />
                          ) : (
                            <span className="text-sm text-gray-900">{student.groupWork}</span>
                          )}
                        </td>
                        
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          <span className="text-sm font-medium text-gray-900">{student.courseworkTotal}</span>
                        </td>
                        
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          <span className="text-sm font-medium text-blue-600">{student.courseworkPercentage.toFixed(1)}%</span>
                        </td>
                        
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          {editingStudent === student.id ? (
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={student.exam}
                              onChange={(e) => updateStudentScore(student.id, 'exam', Number(e.target.value))}
                              className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                            />
                          ) : (
                            <span className="text-sm text-gray-900">{student.exam}</span>
                          )}
                        </td>
                        
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          <span className="text-sm font-medium text-green-600">{student.examPercentage.toFixed(1)}%</span>
                        </td>
                        
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          <span className="text-sm font-bold text-purple-600">{student.totalScore.toFixed(1)}</span>
                        </td>
                        
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            student.grade === 'A' ? 'bg-green-100 text-green-800' :
                            student.grade === 'B+' || student.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                            student.grade === 'C+' || student.grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
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

              {/* Summary Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Class Average</p>
                      <p className="text-2xl font-bold text-gray-900">
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
                      <p className="text-2xl font-bold text-green-600">
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
                      <p className="text-2xl font-bold text-red-600">
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
                      <p className="text-2xl font-bold text-blue-600">
                        {((gradebookData.students.filter(s => s.totalScore >= 50).length / gradebookData.students.length) * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
                      <CheckCircle className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Topics Covered */}
              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Topics Covered (From Lesson Plan)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {gradebookData.lessonPlanTopics.map((topic, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-gray-700">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "reports" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Gradebook Reports</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h4 className="text-md font-medium text-gray-700 mb-4">Class Performance Report</h4>
                  <p className="text-sm text-gray-600 mb-4">Generate comprehensive class performance report with statistics and analysis.</p>
                  <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    <FileText className="h-4 w-4" />
                    Generate Report
                  </button>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h4 className="text-md font-medium text-gray-700 mb-4">Individual Student Reports</h4>
                  <p className="text-sm text-gray-600 mb-4">Generate detailed reports for individual students with comments.</p>
                  <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    <Users className="h-4 w-4" />
                    Generate All Reports
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Gradebook Analytics</h3>
              
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
      </div>
    </div>
  );
}
