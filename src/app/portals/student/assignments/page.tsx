'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, FileText, Upload, Download, CheckCircle, Clock, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import PortalGuard from '@/components/PortalGuard';
import { dbService, Assignment, Submission, mockAssignments } from '@/lib/database-service';

export default function StudentAssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchAssignments();
    fetchSubmissions();
  }, []);

  const fetchAssignments = async () => {
    try {
      // Try to fetch from API, fall back to mock data
      const data = await dbService.getAssignments().catch(() => mockAssignments);
      setAssignments(data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
      setAssignments(mockAssignments);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const data = await dbService.getSubmissions().catch(() => []);
      setSubmissions(data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      setSubmissions([]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(Array.from(e.target.files || []));
  };

  const handleSubmit = async (assignmentId: string) => {
    if (files.length === 0) {
      alert('Please select at least one file to submit');
      return;
    }

    setSubmitting(true);
    try {
      // Upload files first
      const uploadedFiles = await Promise.all(
        files.map(file => dbService.uploadFile(file, 'submission'))
      );

      // Create submission
      await dbService.createSubmission({
        assignmentId,
        studentId: 'current-student-id', // This would come from auth context
        attachments: uploadedFiles,
        comments,
      });

      setShowSubmitModal(false);
      setFiles([]);
      setComments('');
      fetchSubmissions();
      
      alert('Assignment submitted successfully!');
    } catch (error) {
      console.error('Error submitting assignment:', error);
      alert('Failed to submit assignment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getSubmissionStatus = (assignmentId: string) => {
    const submission = submissions.find(s => s.assignmentId === assignmentId);
    if (submission) {
      return {
        submitted: true,
        grade: submission.grade,
        feedback: submission.feedback,
        submittedAt: submission.submittedAt,
      };
    }
    return { submitted: false };
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  if (loading) {
    return (
      <PortalGuard portalType="student">
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </PortalGuard>
    );
  }

  return (
    <PortalGuard portalType="student">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Link href="/portals/student" className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                  <ArrowLeft className="w-5 h-5" />
                  Back to Dashboard
                </Link>
                <div className="h-6 w-px bg-gray-300"></div>
                <h1 className="text-xl font-bold text-gray-900">Assignments</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-6">
            {assignments.map((assignment) => {
              const status = getSubmissionStatus(assignment.id);
              const overdue = isOverdue(assignment.dueDate);

              return (
                <div key={assignment.id} className="bg-white rounded-lg shadow-md">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
                          {status.submitted && (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )}
                          {overdue && !status.submitted && (
                            <Clock className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                        
                        <p className="text-gray-600 mb-4">{assignment.description}</p>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            <span>{assignment.subject}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Grade {assignment.grade}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{assignment.totalMarks} marks</span>
                          </div>
                        </div>

                        {assignment.attachments && assignment.attachments.length > 0 && (
                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">Attachments:</p>
                            <div className="flex flex-wrap gap-2">
                              {assignment.attachments.map((attachment, index) => (
                                <button
                                  key={index}
                                  className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                                >
                                  <Download className="w-3 h-3" />
                                  {attachment.originalName}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {status.submitted && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                            <p className="text-sm text-green-800 font-medium mb-1">Submitted</p>
                            <p className="text-xs text-green-600 mb-2">
                              Submitted on: {status.submittedAt ? new Date(status.submittedAt).toLocaleDateString() : 'Unknown date'}
                            </p>
                            {status.grade && (
                              <p className="text-sm text-green-800">Grade: {status.grade}/100</p>
                            )}
                            {status.feedback && (
                              <p className="text-sm text-gray-700 mt-2">Feedback: {status.feedback}</p>
                            )}
                          </div>
                        )}

                        {overdue && !status.submitted && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                            <p className="text-sm text-red-800 font-medium">This assignment is overdue!</p>
                          </div>
                        )}
                      </div>

                      <div className="ml-4">
                        {!status.submitted ? (
                          <button
                            onClick={() => {
                              setSelectedAssignment(assignment);
                              setShowSubmitModal(true);
                            }}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            disabled={overdue}
                          >
                            {overdue ? 'Overdue' : 'Submit'}
                          </button>
                        ) : (
                          <div className="text-right">
                            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                              Submitted
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {assignments.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No assignments</h3>
              <p className="text-gray-600">You don't have any assignments at the moment.</p>
            </div>
          )}
        </div>

        {/* Submit Modal */}
        {showSubmitModal && selectedAssignment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Submit Assignment: {selectedAssignment.title}
              </h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attach Files
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Click to upload or drag and drop</span>
                    <span className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</span>
                  </label>
                </div>
                
                {files.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700">Selected files:</p>
                    <ul className="text-sm text-gray-600">
                      {files.map((file, index) => (
                        <li key={index}>• {file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comments (optional)
                </label>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Add any comments about your submission..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowSubmitModal(false);
                    setSelectedAssignment(null);
                    setFiles([]);
                    setComments('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSubmit(selectedAssignment.id)}
                  disabled={submitting || files.length === 0}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting...' : 'Submit Assignment'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PortalGuard>
  );
}
