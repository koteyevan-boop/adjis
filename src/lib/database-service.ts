// Database service for school portal - works with hosting platform database
// This replaces MongoDB functionality with a generic database interface

export interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  grade: string;
  section: string;
  dueDate: string;
  totalMarks: number;
  attachments?: Array<{
    filename: string;
    originalName: string;
    path: string;
    size: number;
    mimetype: string;
  }>;
  createdBy: string;
  status: 'draft' | 'published' | 'closed';
  createdAt: string;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  attachments: Array<{
    filename: string;
    originalName: string;
    path: string;
    size: number;
    mimetype: string;
  }>;
  comments: string;
  submittedAt: string;
  grade?: number;
  feedback?: string;
}

export interface Exam {
  id: string;
  title: string;
  subject: string;
  grade: string;
  section: string;
  examDate: string;
  duration: number;
  totalMarks: number;
  instructions: string;
  questions: Array<{
    id: string;
    type: 'multiple-choice' | 'short-answer' | 'essay';
    question: string;
    options?: string[];
    correctAnswer?: string;
    marks: number;
  }>;
  createdBy: string;
  status: 'draft' | 'published' | 'completed';
  createdAt: string;
}

export interface ExamResult {
  id: string;
  examId: string;
  studentId: string;
  answers: Array<{
    questionId: string;
    answer: string;
    marks: number;
  }>;
  totalMarks: number;
  percentage: number;
  grade: string;
  submittedAt: string;
  gradedAt?: string;
  gradedBy?: string;
}

export interface FeeRecord {
  id: string;
  studentId: string;
  term: string;
  year: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'pending' | 'paid' | 'overdue';
  paymentMethod?: string;
  transactionId?: string;
  description: string;
}

export interface ReportCard {
  id: string;
  studentId: string;
  term: string;
  year: string;
  grade: string;
  subjects: Array<{
    name: string;
    teacher: string;
    firstTermScore?: number;
    secondTermScore?: number;
    examScore?: number;
    totalScore: number;
    grade: string;
    remarks: string;
  }>;
  attendance: {
    totalDays: number;
    presentDays: number;
    percentage: number;
  };
  conduct: {
    grade: string;
    remarks: string;
  };
  classTeacherRemarks: string;
  principalRemarks: string;
  generatedAt: string;
}

// Generic database service class
class DatabaseService {
  private baseUrl: string;

  constructor() {
    // This will be configured based on your hosting platform
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
  }

  // Generic fetch method with error handling
  private async fetch(endpoint: string, options: RequestInit = {}) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Database service error:', error);
      throw error;
    }
  }

  // Assignment methods
  async getAssignments(filters?: { grade?: string; section?: string; subject?: string }): Promise<Assignment[]> {
    const params = new URLSearchParams(filters as any);
    return this.fetch(`/assignments?${params}`);
  }

  async getAssignment(id: string): Promise<Assignment> {
    return this.fetch(`/assignments/${id}`);
  }

  async createAssignment(assignment: Omit<Assignment, 'id' | 'createdAt'>): Promise<Assignment> {
    return this.fetch('/assignments', {
      method: 'POST',
      body: JSON.stringify(assignment),
    });
  }

  async updateAssignment(id: string, assignment: Partial<Assignment>): Promise<Assignment> {
    return this.fetch(`/assignments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(assignment),
    });
  }

  async deleteAssignment(id: string): Promise<void> {
    return this.fetch(`/assignments/${id}`, {
      method: 'DELETE',
    });
  }

  // Submission methods
  async getSubmissions(assignmentId?: string, studentId?: string): Promise<Submission[]> {
    const params = new URLSearchParams({ assignmentId: assignmentId || '', studentId: studentId || '' });
    return this.fetch(`/submissions?${params}`);
  }

  async createSubmission(submission: Omit<Submission, 'id' | 'submittedAt'>): Promise<Submission> {
    return this.fetch('/submissions', {
      method: 'POST',
      body: JSON.stringify(submission),
    });
  }

  async gradeSubmission(id: string, grade: number, feedback: string): Promise<Submission> {
    return this.fetch(`/submissions/${id}/grade`, {
      method: 'POST',
      body: JSON.stringify({ grade, feedback }),
    });
  }

  // Exam methods
  async getExams(filters?: { grade?: string; section?: string; subject?: string }): Promise<Exam[]> {
    const params = new URLSearchParams(filters as any);
    return this.fetch(`/exams?${params}`);
  }

  async getExam(id: string): Promise<Exam> {
    return this.fetch(`/exams/${id}`);
  }

  async createExam(exam: Omit<Exam, 'id' | 'createdAt'>): Promise<Exam> {
    return this.fetch('/exams', {
      method: 'POST',
      body: JSON.stringify(exam),
    });
  }

  async submitExamResult(result: Omit<ExamResult, 'id' | 'submittedAt'>): Promise<ExamResult> {
    return this.fetch('/exam-results', {
      method: 'POST',
      body: JSON.stringify(result),
    });
  }

  async getExamResults(studentId: string, examId?: string): Promise<ExamResult[]> {
    const params = new URLSearchParams({ studentId, examId: examId || '' });
    return this.fetch(`/exam-results?${params}`);
  }

  // Fee methods
  async getFeeRecords(studentId: string): Promise<any[]> {
    return this.fetch(`/fees?studentId=${studentId}`);
  }

  async createFeeRecord(record: any): Promise<any> {
    return this.fetch('/fees', {
      method: 'POST',
      body: JSON.stringify(record),
    });
  }

  async updateFeePayment(id: string, paymentData: any): Promise<any> {
    return this.fetch('/fees/pay', {
      method: 'POST',
      body: JSON.stringify({ id, ...paymentData }),
    });
  }

  // Report card methods
  async getReportCards(studentId: string): Promise<any[]> {
    return this.fetch(`/report-cards?studentId=${studentId}`);
  }

  async generateReportCard(reportCard: any): Promise<any> {
    return this.fetch('/report-cards', {
      method: 'POST',
      body: JSON.stringify(reportCard),
    });
  }

  // Student/Teacher/Parent methods
  async getStudents(filters?: { grade?: string; section?: string; status?: string }): Promise<any[]> {
    const params = new URLSearchParams(filters as any);
    return this.fetch(`/students?${params}`);
  }

  async createStudent(studentData: any): Promise<any> {
    return this.fetch('/students', {
      method: 'POST',
      body: JSON.stringify(studentData),
    });
  }

  async updateStudent(id: string, studentData: any): Promise<any> {
    return this.fetch('/students', {
      method: 'PUT',
      body: JSON.stringify({ id, ...studentData }),
    });
  }

  async deleteStudent(id: string): Promise<void> {
    return this.fetch(`/students?id=${id}`, {
      method: 'DELETE',
    });
  }

  async getTeachers(filters?: { specialization?: string; status?: string }): Promise<any[]> {
    const params = new URLSearchParams(filters as any);
    return this.fetch(`/teachers?${params}`);
  }

  async createTeacher(teacherData: any): Promise<any> {
    return this.fetch('/teachers', {
      method: 'POST',
      body: JSON.stringify(teacherData),
    });
  }

  async updateTeacher(id: string, teacherData: any): Promise<any> {
    return this.fetch('/teachers', {
      method: 'PUT',
      body: JSON.stringify({ id, ...teacherData }),
    });
  }

  async deleteTeacher(id: string): Promise<void> {
    return this.fetch(`/teachers?id=${id}`, {
      method: 'DELETE',
    });
  }

  async getParents(filters?: { status?: string }): Promise<any[]> {
    const params = new URLSearchParams(filters as any);
    return this.fetch(`/parents?${params}`);
  }

  async createParent(parentData: any): Promise<any> {
    return this.fetch('/parents', {
      method: 'POST',
      body: JSON.stringify(parentData),
    });
  }

  async updateParent(id: string, parentData: any): Promise<any> {
    return this.fetch('/parents', {
      method: 'PUT',
      body: JSON.stringify({ id, ...parentData }),
    });
  }

  async deleteParent(id: string): Promise<void> {
    return this.fetch(`/parents?id=${id}`, {
      method: 'DELETE',
    });
  }

  // File upload method
  async uploadFile(file: File, type: 'assignment' | 'submission'): Promise<{
    filename: string;
    originalName: string;
    path: string;
    size: number;
    mimetype: string;
  }> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const response = await fetch(`${this.baseUrl}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed! status: ${response.status}`);
    }

    return response.json();
  }
}

export const dbService = new DatabaseService();

// Mock data for development (when API is not available)
export const mockAssignments: Assignment[] = [
  {
    id: '1',
    title: 'Algebra Problem Set',
    description: 'Complete exercises 1-20 from Chapter 3',
    subject: 'Mathematics',
    grade: '10',
    section: 'A',
    dueDate: '2024-03-20',
    totalMarks: 100,
    createdBy: 'teacher1',
    status: 'published',
    createdAt: '2024-03-10',
  },
  {
    id: '2',
    title: 'Essay on Shakespeare',
    description: 'Write a 500-word essay on Hamlet\'s tragic flaw',
    subject: 'English',
    grade: '10',
    section: 'A',
    dueDate: '2024-03-22',
    totalMarks: 50,
    createdBy: 'teacher2',
    status: 'published',
    createdAt: '2024-03-12',
  },
];

export const mockExams: Exam[] = [
  {
    id: '1',
    title: 'Mid-Term Mathematics Exam',
    subject: 'Mathematics',
    grade: '10',
    section: 'A',
    examDate: '2024-03-25',
    duration: 120,
    totalMarks: 100,
    instructions: 'Answer all questions. Show your work.',
    questions: [
      {
        id: '1',
        type: 'multiple-choice',
        question: 'What is the derivative of x²?',
        options: ['x', '2x', 'x²', '2'],
        correctAnswer: '2x',
        marks: 5,
      },
    ],
    createdBy: 'teacher1',
    status: 'published',
    createdAt: '2024-03-10',
  },
];

export const mockFeeRecords: FeeRecord[] = [
  {
    id: '1',
    studentId: 'student1',
    term: 'Term 2',
    year: '2024',
    amount: 2500,
    dueDate: '2024-01-15',
    status: 'paid',
    paidDate: '2024-01-10',
    paymentMethod: 'Bank Transfer',
    transactionId: 'TXN001',
    description: 'Tuition Fee - Term 2',
  },
  {
    id: '2',
    studentId: 'student1',
    term: 'Term 3',
    year: '2024',
    amount: 2500,
    dueDate: '2024-04-15',
    status: 'pending',
    description: 'Tuition Fee - Term 3',
  },
];

export const mockReportCards: ReportCard[] = [
  {
    id: '1',
    studentId: 'student1',
    term: 'Term 2',
    year: '2024',
    grade: '10',
    subjects: [
      {
        name: 'Mathematics',
        teacher: 'Mr. Johnson',
        totalScore: 85,
        grade: 'A-',
        remarks: 'Good understanding of concepts',
      },
      {
        name: 'English',
        teacher: 'Ms. Smith',
        totalScore: 78,
        grade: 'B+',
        remarks: 'Improving in writing skills',
      },
    ],
    attendance: {
      totalDays: 60,
      presentDays: 58,
      percentage: 97,
    },
    conduct: {
      grade: 'Excellent',
      remarks: 'Well-behaved and cooperative',
    },
    classTeacherRemarks: 'Good academic performance',
    principalRemarks: 'Keep up the good work',
    generatedAt: '2024-03-01',
  },
];
