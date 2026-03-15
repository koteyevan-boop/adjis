import { NextRequest, NextResponse } from 'next/server';

// GET /api/submissions - Fetch submissions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const assignmentId = searchParams.get('assignmentId');
    const studentId = searchParams.get('studentId');

    // In a real implementation, this would query your hosting platform's database
    const mockSubmissions = [
      {
        id: '1',
        assignmentId: '1',
        studentId: 'current-student-id',
        attachments: [
          {
            filename: 'math_homework.pdf',
            originalName: 'Math Homework.pdf',
            path: '/uploads/math_homework.pdf',
            size: 1024000,
            mimetype: 'application/pdf',
          }
        ],
        comments: 'Completed all problems',
        submittedAt: '2024-03-12T10:30:00Z',
        grade: 85,
        feedback: 'Good work! Keep practicing.',
      }
    ];

    let filteredSubmissions = mockSubmissions;

    if (assignmentId) {
      filteredSubmissions = filteredSubmissions.filter(s => s.assignmentId === assignmentId);
    }
    if (studentId) {
      filteredSubmissions = filteredSubmissions.filter(s => s.studentId === studentId);
    }

    return NextResponse.json(filteredSubmissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 });
  }
}

// POST /api/submissions - Create new submission
export async function POST(request: NextRequest) {
  try {
    const submissionData = await request.json();
    
    // In a real implementation, this would save to your hosting platform's database
    const newSubmission = {
      id: Date.now().toString(),
      ...submissionData,
      submittedAt: new Date().toISOString(),
    };

    return NextResponse.json(newSubmission, { status: 201 });
  } catch (error) {
    console.error('Error creating submission:', error);
    return NextResponse.json({ error: 'Failed to create submission' }, { status: 500 });
  }
}
