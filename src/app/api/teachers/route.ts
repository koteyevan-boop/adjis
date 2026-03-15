import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

// GET /api/teachers - Fetch teachers
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const specialization = searchParams.get('specialization');
    const status = searchParams.get('status');
    const limit = searchParams.get('limit') || '50';

    let query = 'SELECT id, teacher_id, fullname, email, phone, specialization, qualification, experience_years, subjects, hire_date, status FROM teachers';
    const params: any[] = [];

    // Add filters if provided
    const conditions = [];
    if (specialization) {
      conditions.push('specialization = ?');
      params.push(specialization);
    }
    if (status) {
      conditions.push('status = ?');
      params.push(status);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY fullname ASC LIMIT ?';
    params.push(parseInt(limit));

    const teachers = await executeQuery(query, params);
    return NextResponse.json(teachers);
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return NextResponse.json({ error: 'Failed to fetch teachers' }, { status: 500 });
  }
}

// POST /api/teachers - Create new teacher
export async function POST(request: NextRequest) {
  try {
    const teacherData = await request.json();
    
    const {
      teacher_id,
      fullname,
      email,
      phone,
      specialization,
      qualification,
      experience_years,
      subjects,
      hire_date
    } = teacherData;

    const query = `
      INSERT INTO teachers (
        teacher_id, fullname, email, phone, specialization, 
        qualification, experience_years, subjects, hire_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      teacher_id,
      fullname,
      email,
      phone,
      specialization,
      qualification,
      experience_years,
      subjects,
      hire_date || new Date().toISOString().split('T')[0]
    ];

    const result = await executeQuery(query, params);
    
    // Return the created teacher
    const newTeacher = await executeQuery(
      'SELECT * FROM teachers WHERE id = ?',
      [(result as any).insertId]
    );

    return NextResponse.json((newTeacher as any[])[0], { status: 201 });
  } catch (error) {
    console.error('Error creating teacher:', error);
    return NextResponse.json({ error: 'Failed to create teacher' }, { status: 500 });
  }
}

// PUT /api/teachers - Update teacher
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
    const query = `UPDATE teachers SET ${fields.join(', ')} WHERE id = ?`;
    
    await executeQuery(query, params);
    
    // Return updated teacher
    const updatedTeacher = await executeQuery(
      'SELECT * FROM teachers WHERE id = ?',
      [id]
    );

    return NextResponse.json((updatedTeacher as any[])[0]);
  } catch (error) {
    console.error('Error updating teacher:', error);
    return NextResponse.json({ error: 'Failed to update teacher' }, { status: 500 });
  }
}

// DELETE /api/teachers - Delete teacher
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Teacher ID is required' }, { status: 400 });
    }

    await executeQuery('DELETE FROM teachers WHERE id = ?', [id]);
    
    return NextResponse.json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    console.error('Error deleting teacher:', error);
    return NextResponse.json({ error: 'Failed to delete teacher' }, { status: 500 });
  }
}
