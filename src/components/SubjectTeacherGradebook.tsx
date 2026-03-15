'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Users, Calendar, Save, AlertCircle, CheckCircle, Edit, Eye, TrendingUp } from 'lucide-react';

interface SubjectGrade {
  studentId: number;
  studentName: string;
  studentClass: string;
  test1: number;
  test2: number;
  projectWork: number;
  groupWork: number;
  exam: number;
  courseworkTotal: number;
  courseworkPercentage: number;
  examPercentage: number;
  totalScore: number;
  grade: string;
  comment: string;
  lastModified: string;
  modifiedBy: string;
}

interface SharedGradebook {
  subject: string;
  teacherId: string;
  teacherName: string;
  classes: string[];
  grades: SubjectGrade[];
  lastUpdated: string;
}

export default function SubjectTeacherGradebook({ 
  teacherId, 
  teacherName, 
  subject, 
  assignedClasses 
}: { 
  teacherId: string; 
  teacherName: string; 
  subject: string; 
  assignedClasses: string[]; 
}) {
  const [selectedClass, setSelectedClass] = useState(assignedClasses[0] || "");
  const [selectedTerm, setSelectedTerm] = useState("Second Term");
  const [selectedYear, setSelectedYear] = useState("2023/2024");
  const [editingStudent, setEditingStudent] = useState<number | null>(null);
  const [grades, setGrades] = useState<SubjectGrade[]>([]);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'pending' | 'syncing'>('synced');

  // Initialize sample data
  useEffect(() => {
    const sampleGrades: SubjectGrade[] = [
      {
        studentId: 1,
        studentName: "Ama Mensah",
        studentClass: "Grade 7A",
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
        comment: "Excellent performance in mathematical concepts and problem-solving.",
        lastModified: new Date().toISOString(),
        modifiedBy: teacherName
      },
      {
        studentId: 2,
        studentName: "Kofi Asante",
        studentClass: "Grade 7A",
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
        comment: "Good performance with consistent effort in mathematics.",
        lastModified: new Date().toISOString(),
        modifiedBy: teacherName
      },
      {
        studentId: 3,
        studentName: "Yaa Boateng",
        studentClass: "Grade 7A",
        test1: 24,
        test2: 26,
        projectWork: 17,
        groupWork: 18,
        courseworkTotal: 85,
        courseworkPercentage: 42.5,
        exam: 82,
        examPercentage: 41,
        totalScore: 83.5,
        grade: "B+",
        comment: "Strong performance with good understanding of concepts.",
        lastModified: new Date().toISOString(),
        modifiedBy: teacherName
      }
    ];

    setGrades(sampleGrades.filter(grade => assignedClasses.includes(grade.studentClass)));
  }, [assignedClasses, teacherName]);

  const calculateGrade = (totalScore: number): string => {
    if (totalScore >= 80) return "A";
    if (totalScore >= 75) return "B+";
    if (totalScore >= 70) return "B";
    if (totalScore >= 65) return "C+";
    if (totalScore >= 60) return "C";
    if (totalScore >= 55) return "D+";
    if (totalScore >= 50) return "D";
    if (totalScore >= 45) return "E";
    return "F";
  };

  const generateComment = (student: SubjectGrade): string => {
    const performanceLevel = student.totalScore >= 80 ? "excellent" : 
                           student.totalScore >= 70 ? "good" : 
                           student.totalScore >= 60 ? "satisfactory" : "needs improvement";
    
    let comment = `Student shows ${performanceLevel} performance in ${subject}. `;
    
    if (student.test1 >= 25) comment += "Strong performance in tests. ";
    if (student.projectWork >= 17) comment += "Good project work skills. ";
    if (student.groupWork >= 17) comment += "Excellent collaboration skills. ";
    if (student.exam >= 80) comment += "Outstanding exam results. ";
    
    if (student.totalScore < 70) {
      comment += "Additional practice and support recommended. ";
    }
    
    comment += `Last updated by ${teacherName}.`;
    
    return comment;
  };

  const updateStudentGrade = (studentId: number, field: keyof SubjectGrade, value: number) => {
    setGrades(prev => prev.map(student => {
      if (student.studentId === studentId) {
        const updatedStudent = { ...student, [field]: value };
        
        // Recalculate all dependent values
        const courseworkTotal = updatedStudent.test1 + updatedStudent.test2 + updatedStudent.projectWork + updatedStudent.groupWork;
        const courseworkPercentage = (courseworkTotal / 100) * 50;
        const examPercentage = (updatedStudent.exam / 100) * 50;
        const totalScore = courseworkPercentage + examPercentage;
        const grade = calculateGrade(totalScore);
        const comment = generateComment({ ...updatedStudent, courseworkTotal, courseworkPercentage, examPercentage, totalScore, grade });
        
        return {
          ...updatedStudent,
          courseworkTotal,
          courseworkPercentage,
          examPercentage,
          totalScore,
          grade,
          comment,
          lastModified: new Date().toISOString(),
          modifiedBy: teacherName
        };
      }
      return student;
    }));

    setSyncStatus('pending');
  };

  const saveChanges = () => {
    setSyncStatus('syncing');
    
    // Simulate saving to shared database
    setTimeout(() => {
      setSyncStatus('synced');
      
      // This would automatically update the class teacher's gradebook
      console.log('Grades synced to class teacher gradebook:', {
        subject,
        teacherId,
        teacherName,
        class: selectedClass,
        grades: grades.filter(g => g.studentClass === selectedClass)
      });
      
      alert('Grades saved and synced to class teacher gradebook successfully!');
    }, 1000);
  };

  const filteredGrades = grades.filter(grade => grade.studentClass === selectedClass);

  const classAverage = filteredGrades.length > 0 
    ? filteredGrades.reduce((sum, g) => sum + g.totalScore, 0) / filteredGrades.length 
    : 0;

  const gradeDistribution = {
    A: filteredGrades.filter(g => g.grade === 'A').length,
    'B+': filteredGrades.filter(g => g.grade === 'B+').length,
    B: filteredGrades.filter(g => g.grade === 'B').length,
    'C+': filteredGrades.filter(g => g.grade === 'C+').length,
    C: filteredGrades.filter(g => g.grade === 'C').length,
    D: filteredGrades.filter(g => g.grade === 'D').length,
    E: filteredGrades.filter(g => g.grade === 'E').length,
    F: filteredGrades.filter(g => g.grade === 'F').length,
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 rounded-lg p-3">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Subject Teacher Gradebook</h2>
              <p className="text-sm text-gray-600">{teacherName} • {subject}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                syncStatus === 'synced' ? 'bg-green-500' :
                syncStatus === 'syncing' ? 'bg-yellow-500 animate-pulse' :
                'bg-orange-500'
              }`}></div>
              <span className="text-sm text-gray-600">
                {syncStatus === 'synced' ? 'Synced' :
                 syncStatus === 'syncing' ? 'Syncing...' :
                 'Pending sync'}
              </span>
            </div>
            <button
              onClick={saveChanges}
              disabled={syncStatus === 'syncing'}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {syncStatus === 'syncing' ? 'Saving...' : 'Save & Sync'}
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow mb-6 p-6">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            >
              {assignedClasses.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
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
              <option>First Term</option>
              <option>Second Term</option>
              <option>Third Term</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option>2023/2024</option>
              <option>2024/2025</option>
            </select>
          </div>

          <div className="flex-1"></div>
          
          <div className="text-right">
            <p className="text-sm text-gray-600">Class Average</p>
            <p className="text-2xl font-bold text-blue-600">{classAverage.toFixed(1)}</p>
          </div>
        </div>
      </div>

      {/* Sync Status Alert */}
      {syncStatus === 'pending' && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            <div>
              <p className="text-sm text-orange-800 font-medium">Changes Pending Sync</p>
              <p className="text-xs text-orange-600">
                Your changes will be automatically synced to the class teacher's gradebook when you click "Save & Sync".
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Gradebook Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            {selectedClass} • {subject} • {selectedTerm} • {selectedYear}
          </h3>
        </div>
        
        <table className="min-w-full divide-y divide-gray-200">
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
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Comment</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredGrades.map((student) => (
              <tr key={student.studentId} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  {student.studentName}
                </td>
                
                <td className="px-4 py-3 whitespace-nowrap text-center">
                  {editingStudent === student.studentId ? (
                    <input
                      type="number"
                      min="0"
                      max="30"
                      value={student.test1}
                      onChange={(e) => updateStudentGrade(student.studentId, 'test1', Number(e.target.value))}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                    />
                  ) : (
                    <span className="text-sm text-gray-900">{student.test1}</span>
                  )}
                </td>
                
                <td className="px-4 py-3 whitespace-nowrap text-center">
                  {editingStudent === student.studentId ? (
                    <input
                      type="number"
                      min="0"
                      max="30"
                      value={student.test2}
                      onChange={(e) => updateStudentGrade(student.studentId, 'test2', Number(e.target.value))}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                    />
                  ) : (
                    <span className="text-sm text-gray-900">{student.test2}</span>
                  )}
                </td>
                
                <td className="px-4 py-3 whitespace-nowrap text-center">
                  {editingStudent === student.studentId ? (
                    <input
                      type="number"
                      min="0"
                      max="20"
                      value={student.projectWork}
                      onChange={(e) => updateStudentGrade(student.studentId, 'projectWork', Number(e.target.value))}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                    />
                  ) : (
                    <span className="text-sm text-gray-900">{student.projectWork}</span>
                  )}
                </td>
                
                <td className="px-4 py-3 whitespace-nowrap text-center">
                  {editingStudent === student.studentId ? (
                    <input
                      type="number"
                      min="0"
                      max="20"
                      value={student.groupWork}
                      onChange={(e) => updateStudentGrade(student.studentId, 'groupWork', Number(e.target.value))}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                    />
                  ) : (
                    <span className="text-sm text-gray-900">{student.groupWork}</span>
                  )}
                </td>
                
                <td className="px-4 py-3 whitespace-nowrap text-center">
                  <span className="text-sm font-medium text-blue-600">{student.courseworkPercentage.toFixed(1)}%</span>
                </td>
                
                <td className="px-4 py-3 whitespace-nowrap text-center">
                  {editingStudent === student.studentId ? (
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={student.exam}
                      onChange={(e) => updateStudentGrade(student.studentId, 'exam', Number(e.target.value))}
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
                    onClick={() => setEditingStudent(editingStudent === student.studentId ? null : student.studentId)}
                    className="text-blue-600 hover:text-blue-900 mr-2"
                  >
                    {editingStudent === student.studentId ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
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

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Class Statistics</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Students:</span>
              <span className="text-sm font-medium text-gray-900">{filteredGrades.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Class Average:</span>
              <span className="text-sm font-medium text-blue-600">{classAverage.toFixed(1)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Highest Score:</span>
              <span className="text-sm font-medium text-green-600">
                {Math.max(...filteredGrades.map(g => g.totalScore)).toFixed(1)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Lowest Score:</span>
              <span className="text-sm font-medium text-red-600">
                {Math.min(...filteredGrades.map(g => g.totalScore)).toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Grade Distribution</h4>
          <div className="space-y-2">
            {Object.entries(gradeDistribution).map(([grade, count]) => {
              const percentage = filteredGrades.length > 0 ? (count / filteredGrades.length) * 100 : 0;
              
              return (
                <div key={grade} className="flex items-center gap-3">
                  <div className="w-12 text-sm font-medium text-gray-700">{grade}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full ${
                        grade === 'A' ? 'bg-green-500' :
                        grade === 'B+' || grade === 'B' ? 'bg-blue-500' :
                        grade === 'C+' || grade === 'C' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="w-8 text-sm text-gray-600">{count}</div>
                  <div className="w-12 text-sm text-gray-600">{percentage.toFixed(0)}%</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <div className="flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-sm text-blue-800 font-medium">Automatic Sync to Class Teacher</p>
            <p className="text-xs text-blue-600">
              All grades you input here will automatically appear in the class teacher's gradebook for {selectedClass}. 
              The class teacher can view but cannot modify your subject grades.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
