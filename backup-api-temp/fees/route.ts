import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

// GET /api/fees - Fetch fee records
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');
    const status = searchParams.get('status');
    const term = searchParams.get('term');
    const year = searchParams.get('year');

    let query = 'SELECT * FROM fee_records';
    const params: any[] = [];

    // Add filters if provided
    const conditions = [];
    if (studentId) {
      conditions.push('student_id = ?');
      params.push(studentId);
    }
    if (status) {
      conditions.push('status = ?');
      params.push(status);
    }
    if (term) {
      conditions.push('term = ?');
      params.push(term);
    }
    if (year) {
      conditions.push('year = ?');
      params.push(year);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY due_date ASC';

    const fees = await executeQuery(query, params);
    return NextResponse.json(fees);
  } catch (error) {
    console.error('Error fetching fees:', error);
    return NextResponse.json({ error: 'Failed to fetch fees' }, { status: 500 });
  }
}

// POST /api/fees - Create new fee record
export async function POST(request: NextRequest) {
  try {
    const feeData = await request.json();
    
    const {
      student_id,
      term,
      year,
      amount,
      due_date,
      description
    } = feeData;

    const query = `
      INSERT INTO fee_records (
        student_id, term, year, amount, due_date, description
      ) VALUES (?, ?, ?, ?, ?, ?)
    `;

    const params = [
      student_id,
      term,
      year,
      amount,
      due_date,
      description
    ];

    const result = await executeQuery(query, params);
    
    // Return the created fee record
    const newFee = await executeQuery(
      'SELECT * FROM fee_records WHERE id = ?',
      [(result as any).insertId]
    );

    return NextResponse.json((newFee as any[])[0], { status: 201 });
  } catch (error) {
    console.error('Error creating fee record:', error);
    return NextResponse.json({ error: 'Failed to create fee record' }, { status: 500 });
  }
}

// PUT /api/fees - Update fee record
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
    const query = `UPDATE fee_records SET ${fields.join(', ')} WHERE id = ?`;
    
    await executeQuery(query, params);
    
    // Return updated fee record
    const updatedFee = await executeQuery(
      'SELECT * FROM fee_records WHERE id = ?',
      [id]
    );

    return NextResponse.json((updatedFee as any[])[0]);
  } catch (error) {
    console.error('Error updating fee record:', error);
    return NextResponse.json({ error: 'Failed to update fee record' }, { status: 500 });
  }
}

// DELETE /api/fees - Delete fee record
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Fee record ID is required' }, { status: 400 });
    }

    await executeQuery('DELETE FROM fee_records WHERE id = ?', [id]);
    
    return NextResponse.json({ message: 'Fee record deleted successfully' });
  } catch (error) {
    console.error('Error deleting fee record:', error);
    return NextResponse.json({ error: 'Failed to delete fee record' }, { status: 500 });
  }
}
