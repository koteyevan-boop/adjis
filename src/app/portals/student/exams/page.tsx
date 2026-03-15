'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, FileText, Play, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import PortalGuard from '@/components/PortalGuard';
import { dbService, Exam, ExamResult, mockExams } from '@/lib/database-service';

export default function StudentExamsPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [examResults, setExamResults] = useState<ExamResult[]>([]);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [showExamModal, setShowExamModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchExams();
    fetchExamResults();
  }, []);

  const fetchExams = async () => {
    try {
      const data = await dbService.getExams().catch(() => mockExams);
      setExams(data);
    } catch (error) {
      console.error('Error fetching exams:', error);
      setExams(mockExams);
    } finally {
      setLoading(false);
    }
  };

  const fetchExamResults = async () => {
    try {
      const data = await dbService.getExamResults('current-student-id').catch(() => []);
      setExamResults(data);
    } catch (error) {
      console.error('Error fetching exam results:', error);
      setExamResults([]);
    }
  };

  const startExam = (exam: Exam) => {
    setSelectedExam(exam);
    setCurrentQuestion(0);
    setAnswers({});
    setShowExamModal(true);
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const nextQuestion = () => {
    if (selectedExam && currentQuestion < selectedExam.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const submitExam = async () => {
    if (!selectedExam) return;

    setSubmitting(true);
    try {
      // Calculate marks
      const examAnswers = selectedExam.questions.map(question => ({
        questionId: question.id,
        answer: answers[question.id] || '',
        marks: question.correctAnswer === answers[question.id] ? question.marks : 0,
      }));

      const totalMarks = examAnswers.reduce((sum, answer) => sum + answer.marks, 0);
      const percentage = (totalMarks / selectedExam.totalMarks) * 100;
      
      let grade = 'F';
      if (percentage >= 90) grade = 'A+';
      else if (percentage >= 80) grade = 'A';
      else if (percentage >= 70) grade = 'B';
      else if (percentage >= 60) grade = 'C';
      else if (percentage >= 50) grade = 'D';

      await dbService.submitExamResult({
        examId: selectedExam.id,
        studentId: 'current-student-id',
        answers: examAnswers,
        totalMarks,
        percentage,
        grade,
      });

      setShowExamModal(false);
      setSelectedExam(null);
      fetchExamResults();
      
      alert(`Exam submitted successfully! Your score: ${totalMarks}/${selectedExam.totalMarks} (${percentage.toFixed(1)}%)`);
    } catch (error) {
      console.error('Error submitting exam:', error);
      alert('Failed to submit exam. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getExamStatus = (exam: Exam) => {
    const result = examResults.find(r => r.examId === exam.id);
    if (result) {
      return {
        completed: true,
        score: result.totalMarks,
        percentage: result.percentage,
        grade: result.grade,
      };
    }
    
    const examDate = new Date(exam.examDate);
    const now = new Date();
    const endTime = new Date(examDate.getTime() + exam.duration * 60 * 1000);
    
    if (now > endTime) {
      return { completed: true, missed: true };
    }
    
    if (now >= examDate && now <= endTime) {
      return { available: true };
    }
    
    return { upcoming: true };
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
                <h1 className="text-xl font-bold text-gray-900">Exams</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-6">
            {exams.map((exam) => {
              const status = getExamStatus(exam);
              
              return (
                <div key={exam.id} className="bg-white rounded-lg shadow-md">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{exam.title}</h3>
                          {status.completed && !status.missed && (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )}
                          {status.missed && (
                            <AlertCircle className="w-5 h-5 text-red-500" />
                          )}
                          {status.available && (
                            <Play className="w-5 h-5 text-blue-500" />
                          )}
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            <span>{exam.subject}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{exam.duration} minutes</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            <span>{exam.totalMarks} marks</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{new Date(exam.examDate).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-4">{exam.instructions}</p>

                        {status.completed && !status.missed && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                            <p className="text-sm text-green-800 font-medium">Completed</p>
                            <p className="text-sm text-green-600">
                              Score: {status.score}/{exam.totalMarks} ({(status.percentage || 0).toFixed(1)}%)
                            </p>
                            <p className="text-sm text-green-600">Grade: {status.grade}</p>
                          </div>
                        )}

                        {status.missed && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                            <p className="text-sm text-red-800 font-medium">Missed</p>
                            <p className="text-sm text-red-600">This exam was not completed</p>
                          </div>
                        )}

                        {status.available && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                            <p className="text-sm text-blue-800 font-medium">Available Now</p>
                            <p className="text-sm text-blue-600">You can start this exam now</p>
                          </div>
                        )}
                      </div>

                      <div className="ml-4">
                        {status.available ? (
                          <button
                            onClick={() => startExam(exam)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            Start Exam
                          </button>
                        ) : status.completed && !status.missed ? (
                          <div className="text-right">
                            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                              Completed
                            </span>
                          </div>
                        ) : status.missed ? (
                          <div className="text-right">
                            <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                              Missed
                            </span>
                          </div>
                        ) : (
                          <div className="text-right">
                            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                              Upcoming
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

          {exams.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No exams</h3>
              <p className="text-gray-600">You don't have any exams scheduled at the moment.</p>
            </div>
          )}
        </div>

        {/* Exam Modal */}
        {showExamModal && selectedExam && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
              <div className="p-6 border-b bg-gray-50">
                <h2 className="text-xl font-semibold text-gray-900">{selectedExam.title}</h2>
                <p className="text-sm text-gray-600">
                  Question {currentQuestion + 1} of {selectedExam.questions.length}
                </p>
              </div>
              
              <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {selectedExam.questions[currentQuestion].question}
                  </h3>
                  
                  {selectedExam.questions[currentQuestion].type === 'multiple-choice' && (
                    <div className="space-y-3">
                      {selectedExam.questions[currentQuestion].options?.map((option, index) => (
                        <label key={index} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="answer"
                            value={option}
                            checked={answers[selectedExam.questions[currentQuestion].id] === option}
                            onChange={(e) => handleAnswerChange(selectedExam.questions[currentQuestion].id, e.target.value)}
                            className="w-4 h-4 text-blue-600"
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                  
                  {selectedExam.questions[currentQuestion].type === 'short-answer' && (
                    <textarea
                      value={answers[selectedExam.questions[currentQuestion].id] || ''}
                      onChange={(e) => handleAnswerChange(selectedExam.questions[currentQuestion].id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      placeholder="Enter your answer..."
                    />
                  )}
                  
                  {selectedExam.questions[currentQuestion].type === 'essay' && (
                    <textarea
                      value={answers[selectedExam.questions[currentQuestion].id] || ''}
                      onChange={(e) => handleAnswerChange(selectedExam.questions[currentQuestion].id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={8}
                      placeholder="Write your essay..."
                    />
                  )}
                </div>
              </div>
              
              <div className="p-6 border-t bg-gray-50">
                <div className="flex items-center justify-between">
                  <button
                    onClick={prevQuestion}
                    disabled={currentQuestion === 0}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  <span className="text-sm text-gray-600">
                    {selectedExam.questions[currentQuestion].marks} marks
                  </span>
                  
                  {currentQuestion === selectedExam.questions.length - 1 ? (
                    <button
                      onClick={submitExam}
                      disabled={submitting}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Submitting...' : 'Submit Exam'}
                    </button>
                  ) : (
                    <button
                      onClick={nextQuestion}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PortalGuard>
  );
}
