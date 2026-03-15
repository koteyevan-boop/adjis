import { NextRequest, NextResponse } from 'next/server';
import { mockAssignments } from '@/lib/database-service';

// GET /api/assignments - Fetch assignments
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const grade = searchParams.get('grade');
    const section = searchParams.get('section');
    const subject = searchParams.get('subject');

    // In a real implementation, this would query your hosting platform's database
    let filteredAssignments = mockAssignments;

    if (grade) {
      filteredAssignments = filteredAssignments.filter(a => a.grade === grade);
    }
    if (section) {
      filteredAssignments = filteredAssignments.filter(a => a.section === section);
    }
    if (subject) {
      filteredAssignments = filteredAssignments.filter(a => a.subject === subject);
    }

    return NextResponse.json(filteredAssignments);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    return NextResponse.json({ error: 'Failed to fetch assignments' }, { status: 500 });
  }
}

// POST /api/assignments - Create new assignment
export async function POST(request: NextRequest) {
  try {
    const assignmentData = await request.json();
    
    // In a real implementation, this would save to your hosting platform's database
    const newAssignment = {
      id: Date.now().toString(),
      ...assignmentData,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(newAssignment, { status: 201 });
  } catch (error) {
    console.error('Error creating assignment:', error);
    return NextResponse.json({ error: 'Failed to create assignment' }, { status: 500 });
  }
}
