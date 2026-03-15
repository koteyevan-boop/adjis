'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, FileText, Download, Calendar, User, Award, CheckCircle, TrendingUp, BookOpen } from 'lucide-react';
import Link from 'next/link';
import PortalGuard from '@/components/PortalGuard';
import { dbService, ReportCard, mockReportCards } from '@/lib/database-service';

export default function ParentReportsPage() {
  const [reportCards, setReportCards] = useState<ReportCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChild, setSelectedChild] = useState('all');
  const [selectedReportCard, setSelectedReportCard] = useState<ReportCard | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [activeTab, setActiveTab] = useState('report-cards');

  const children = [
    { id: 'STU001', name: 'Alex Johnson', grade: '10A' },
    { id: 'STU002', name: 'Sarah Johnson', grade: '8B' },
  ];

  useEffect(() => {
    fetchReportCards();
  }, []);

  const fetchReportCards = async () => {
    try {
      const data = await dbService.getReportCards('current-student-id').catch(() => mockReportCards);
      setReportCards(data);
    } catch (error) {
      console.error('Error fetching report cards:', error);
      setReportCards(mockReportCards);
    } finally {
      setLoading(false);
    }
  };

  const viewDetails = (reportCard: ReportCard) => {
    setSelectedReportCard(reportCard);
    setShowDetailsModal(true);
  };

  const downloadReportCard = (reportCard: ReportCard) => {
    // In a real implementation, this would generate and download a PDF
    alert(`Downloading report card for ${reportCard.term} ${reportCard.year}`);
  };

  const downloadTerminalReport = (childId: string, term: string, year: string) => {
    // In a real implementation, this would generate and download a comprehensive terminal report
    const child = children.find(c => c.id === childId);
    alert(`Downloading terminal report for ${child?.name} - ${term} ${year}\n\nThis report includes:\n- Academic performance across all subjects\n- Attendance records\n- Conduct assessment\n- Teacher remarks\n- Extracurricular activities\n- Overall progress summary`);
  };

  const getOverallGrade = (reportCard: ReportCard) => {
    const totalScore = reportCard.subjects.reduce((sum, subject) => sum + subject.totalScore, 0);
    const averageScore = totalScore / reportCard.subjects.length;
    
    if (averageScore >= 90) return 'A+';
    if (averageScore >= 80) return 'A';
    if (averageScore >= 70) return 'B';
    if (averageScore >= 60) return 'C';
    if (averageScore >= 50) return 'D';
    return 'F';
  };

  const getOverallPercentage = (reportCard: ReportCard) => {
    const totalScore = reportCard.subjects.reduce((sum, subject) => sum + subject.totalScore, 0);
    return Math.round(totalScore / reportCard.subjects.length);
  };

  const getProgressTrend = (childId: string) => {
    // Mock progress calculation - in real implementation, this would compare with previous terms
    const childReports = reportCards.filter(rc => rc.studentId === childId);
    if (childReports.length < 2) return 'stable';
    
    const latest = childReports[childReports.length - 1];
    const previous = childReports[childReports.length - 2];
    
    const latestAvg = getOverallPercentage(latest);
    const previousAvg = getOverallPercentage(previous);
    
    if (latestAvg > previousAvg + 5) return 'improving';
    if (latestAvg < previousAvg - 5) return 'declining';
    return 'stable';
  };

  if (loading) {
    return (
      <PortalGuard portalType="parent">
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </PortalGuard>
    );
  }

  return (
    <PortalGuard portalType="parent">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Link href="/portals/parent" className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                  <ArrowLeft className="w-5 h-5" />
                  Back to Dashboard
                </Link>
                <div className="h-6 w-px bg-gray-300"></div>
                <h1 className="text-xl font-bold text-gray-900">Academic Reports</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Child Selector */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 py-3">
              <span className="text-sm font-medium text-gray-700">Viewing reports for:</span>
              <select
                value={selectedChild}
                onChange={(e) => setSelectedChild(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Children</option>
                {children.map((child) => (
                  <option key={child.id} value={child.id}>
                    {child.name} ({child.grade})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-md mb-6">
            <div className="border-b">
              <div className="flex">
                {[
                  { id: 'report-cards', label: 'Report Cards', icon: FileText },
                  { id: 'terminal-reports', label: 'Terminal Reports', icon: Award },
                  { id: 'progress-tracking', label: 'Progress Tracking', icon: TrendingUp },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Report Cards Tab */}
          {activeTab === 'report-cards' && (
            <div className="grid gap-6">
              {reportCards
                .filter(rc => selectedChild === 'all' || rc.studentId === selectedChild)
                .map((reportCard) => {
                  const child = children.find(c => c.id === reportCard.studentId);
                  return (
                    <div key={reportCard.id} className="bg-white rounded-lg shadow-md">
                      <div className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {reportCard.term} {reportCard.year}
                              </h3>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {child?.name} ({child?.grade})
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="flex items-center gap-2">
                                <Award className="w-4 h-4 text-yellow-500" />
                                <span className="text-sm text-gray-600">
                                  Overall Grade: <span className="font-semibold">{getOverallGrade(reportCard)}</span>
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span className="text-sm text-gray-600">
                                  Percentage: <span className="font-semibold">{getOverallPercentage(reportCard)}%</span>
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-blue-500" />
                                <span className="text-sm text-gray-600">
                                  Generated: {new Date(reportCard.generatedAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                              {reportCard.subjects.slice(0, 3).map((subject, index) => (
                                <div key={index} className="bg-gray-50 rounded-lg p-3">
                                  <p className="text-sm font-medium text-gray-900">{subject.name}</p>
                                  <p className="text-sm text-gray-600">{subject.grade} ({subject.totalScore}%)</p>
                                  <p className="text-xs text-gray-500">{subject.teacher}</p>
                                </div>
                              ))}
                              {reportCard.subjects.length > 3 && (
                                <div className="bg-gray-50 rounded-lg p-3">
                                  <p className="text-sm font-medium text-gray-900">+{reportCard.subjects.length - 3} more</p>
                                  <p className="text-sm text-gray-600">subjects</p>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>Attendance: {reportCard.attendance.percentage}%</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                <span>Conduct: {reportCard.conduct.grade}</span>
                              </div>
                            </div>
                          </div>

                          <div className="ml-4 flex gap-2">
                            <button
                              onClick={() => viewDetails(reportCard)}
                              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                              View Details
                            </button>
                            <button
                              onClick={() => downloadReportCard(reportCard)}
                              className="p-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}

          {/* Terminal Reports Tab */}
          {activeTab === 'terminal-reports' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Terminal Reports</h3>
                <p className="text-blue-800">
                  Comprehensive end-of-term reports including academic performance, attendance, conduct, 
                  teacher remarks, and overall progress summary.
                </p>
              </div>

              {children
                .filter(child => selectedChild === 'all' || child.id === selectedChild)
                .map((child) => (
                  <div key={child.id} className="bg-white rounded-lg shadow-md">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">{child.name} - {child.grade}</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {['Term 1', 'Term 2', 'Term 3'].map((term) => (
                          <div key={term} className="border rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 mb-2">{term} 2024</h4>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Status:</span>
                                <span className="text-sm font-medium text-green-600">Available</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Performance:</span>
                                <span className="text-sm font-medium text-gray-900">85%</span>
                              </div>
                              <button
                                onClick={() => downloadTerminalReport(child.id, term, '2024')}
                                className="w-full mt-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                              >
                                Download Terminal Report
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* Progress Tracking Tab */}
          {activeTab === 'progress-tracking' && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-900 mb-2">Progress Tracking</h3>
                <p className="text-green-800">
                  Monitor your child's academic progress over time with detailed performance trends and improvements.
                </p>
              </div>

              {children
                .filter(child => selectedChild === 'all' || child.id === selectedChild)
                .map((child) => {
                  const trend = getProgressTrend(child.id);
                  return (
                    <div key={child.id} className="bg-white rounded-lg shadow-md">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">{child.name} - {child.grade}</h3>
                          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                            trend === 'improving' ? 'bg-green-100 text-green-800' :
                            trend === 'declining' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            <TrendingUp className="w-4 h-4" />
                            {trend === 'improving' ? 'Improving' : 
                             trend === 'declining' ? 'Needs Attention' : 
                             'Stable'}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-3">Academic Performance</h4>
                            <div className="space-y-2">
                              {['Mathematics', 'English', 'Science'].map((subject) => (
                                <div key={subject} className="flex items-center justify-between">
                                  <span className="text-sm text-gray-600">{subject}</span>
                                  <div className="flex items-center gap-2">
                                    <div className="w-24 bg-gray-200 rounded-full h-2">
                                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                                    </div>
                                    <span className="text-sm font-medium">85%</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-gray-900 mb-3">Key Metrics</h4>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Average Grade</span>
                                <span className="text-sm font-medium">A-</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Attendance Rate</span>
                                <span className="text-sm font-medium">95%</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Conduct Grade</span>
                                <span className="text-sm font-medium">Excellent</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}

          {/* No Reports Message */}
          {reportCards.length === 0 && activeTab === 'report-cards' && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No report cards</h3>
              <p className="text-gray-600">No report cards available at the moment.</p>
            </div>
          )}
        </div>

        {/* Report Card Details Modal */}
        {showDetailsModal && selectedReportCard && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
              <div className="p-6 border-b bg-gray-50">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Report Card - {selectedReportCard.term} {selectedReportCard.year}
                  </h2>
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      setSelectedReportCard(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 100px)' }}>
                {/* Student Info */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Student Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4">
                    <div>
                      <p className="text-sm text-gray-600">Grade</p>
                      <p className="font-medium">{selectedReportCard.grade}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Term</p>
                      <p className="font-medium">{selectedReportCard.term}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Academic Year</p>
                      <p className="font-medium">{selectedReportCard.year}</p>
                    </div>
                  </div>
                </div>

                {/* Subjects */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Academic Performance</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">Subject</th>
                          <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">Teacher</th>
                          <th className="border border-gray-200 px-4 py-2 text-center text-sm font-medium text-gray-700">Score</th>
                          <th className="border border-gray-200 px-4 py-2 text-center text-sm font-medium text-gray-700">Grade</th>
                          <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">Remarks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedReportCard.subjects.map((subject, index) => (
                          <tr key={index}>
                            <td className="border border-gray-200 px-4 py-2 text-sm">{subject.name}</td>
                            <td className="border border-gray-200 px-4 py-2 text-sm">{subject.teacher}</td>
                            <td className="border border-gray-200 px-4 py-2 text-sm text-center">{subject.totalScore}%</td>
                            <td className="border border-gray-200 px-4 py-2 text-sm text-center">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                subject.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                                subject.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                                subject.grade.startsWith('C') ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {subject.grade}
                              </span>
                            </td>
                            <td className="border border-gray-200 px-4 py-2 text-sm">{subject.remarks}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Attendance and Conduct */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Attendance & Conduct</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Attendance</h4>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">
                          Total Days: {selectedReportCard.attendance.totalDays}
                        </p>
                        <p className="text-sm text-gray-600">
                          Present Days: {selectedReportCard.attendance.presentDays}
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          Percentage: {selectedReportCard.attendance.percentage}%
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Conduct</h4>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">
                          Grade: <span className="font-medium">{selectedReportCard.conduct.grade}</span>
                        </p>
                        <p className="text-sm text-gray-600">
                          {selectedReportCard.conduct.remarks}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Remarks */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Remarks</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Class Teacher Remarks</h4>
                      <p className="text-sm text-gray-600">{selectedReportCard.classTeacherRemarks}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Principal Remarks</h4>
                      <p className="text-sm text-gray-600">{selectedReportCard.principalRemarks}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PortalGuard>
  );
}
