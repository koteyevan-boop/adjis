import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

// GET /api/students - Fetch students
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const grade = searchParams.get('grade');
    const section = searchParams.get('section');
    const limit = searchParams.get('limit') || '50';

    let query = 'SELECT id, student_id, fullname, email, phone, grade, section, status FROM students';
    const params: any[] = [];

    // Add filters if provided
    const conditions = [];
    if (grade) {
      conditions.push('grade = ?');
      params.push(grade);
    }
    if (section) {
      conditions.push('section = ?');
      params.push(section);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY fullname ASC LIMIT ?';
    params.push(parseInt(limit));

    const students = await executeQuery(query, params);
    return NextResponse.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}

// POST /api/students - Create new student
export async function POST(request: NextRequest) {
  try {
    const studentData = await request.json();
    
    const {
      student_id,
      fullname,
      email,
      phone,
      grade,
      section,
      date_of_birth,
      gender,
      address,
      parent_id,
      enrollment_date
    } = studentData;

    const query = `
      INSERT INTO students (
        student_id, fullname, email, phone, grade, section, 
        date_of_birth, gender, address, parent_id, enrollment_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      student_id,
      fullname,
      email,
      phone,
      grade,
      section,
      date_of_birth,
      gender,
      address,
      parent_id,
      enrollment_date || new Date().toISOString().split('T')[0]
    ];

    const result = await executeQuery(query, params);
    
    // Return the created student
    const newStudent = await executeQuery(
      'SELECT * FROM students WHERE id = ?',
      [(result as any).insertId]
    );

    return NextResponse.json((newStudent as any[])[0], { status: 201 });
  } catch (error) {
    console.error('Error creating student:', error);
    return NextResponse.json({ error: 'Failed to create student' }, { status: 500 });
  }
}

// PUT /api/students - Update student
export async function PUT(request: NextRequest) {
  try {
    const { id, ...updateData } = await request.json();
    
    const fields: string[] = [];
    const params: any[] = [];

    // Build dynamic update query
    Object.keys(updateData).forEach(key => {
      if (updateData[key] !== undefined) {
        fields.push(`${key} = ?`);
        params.push(updateData[key]);
      }
    });

    if (fields.length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    params.push(id);
    const query = `UPDATE students SET ${fields.join(', ')} WHERE id = ?`;
    
    await executeQuery(query, params);
    
    // Return updated student
    const updatedStudent = await executeQuery(
      'SELECT * FROM students WHERE id = ?',
      [id]
    );

    return NextResponse.json((updatedStudent as any[])[0]);
  } catch (error) {
    console.error('Error updating student:', error);
    return NextResponse.json({ error: 'Failed to update student' }, { status: 500 });
  }
}

// DELETE /api/students - Delete student
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Student ID is required' }, { status: 400 });
    }

    await executeQuery('DELETE FROM students WHERE id = ?', [id]);
    
    return NextResponse.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    return NextResponse.json({ error: 'Failed to delete student' }, { status: 500 });
  }
}
