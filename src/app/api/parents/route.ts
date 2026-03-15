import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

// GET /api/parents - Fetch parents
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = searchParams.get('limit') || '50';

    let query = 'SELECT id, parent_id, fullname, email, phone, relationship, occupation, address, status FROM parents';
    const params: any[] = [];

    // Add filters if provided
    if (status) {
      query += ' WHERE status = ?';
      params.push(status);
    }

    query += ' ORDER BY fullname ASC LIMIT ?';
    params.push(parseInt(limit));

    const parents = await executeQuery(query, params);
    return NextResponse.json(parents);
  } catch (error) {
    console.error('Error fetching parents:', error);
    return NextResponse.json({ error: 'Failed to fetch parents' }, { status: 500 });
  }
}

// POST /api/parents - Create new parent
export async function POST(request: NextRequest) {
  try {
    const parentData = await request.json();
    
    const {
      parent_id,
      fullname,
      email,
      phone,
      relationship,
      occupation,
      address,
      password_hash
    } = parentData;

    const query = `
      INSERT INTO parents (
        parent_id, fullname, email, phone, relationship, 
        occupation, address, password_hash
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      parent_id,
      fullname,
      email,
      phone,
      relationship,
      occupation,
      address,
      password_hash
    ];

    const result = await executeQuery(query, params);
    
    // Return the created parent (without password hash)
    const newParent = await executeQuery(
      'SELECT id, parent_id, fullname, email, phone, relationship, occupation, address, status FROM parents WHERE id = ?',
      [(result as any).insertId]
    );

    return NextResponse.json((newParent as any[])[0], { status: 201 });
  } catch (error) {
    console.error('Error creating parent:', error);
    return NextResponse.json({ error: 'Failed to create parent' }, { status: 500 });
  }
}

// PUT /api/parents - Update parent
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
    const query = `UPDATE parents SET ${fields.join(', ')} WHERE id = ?`;
    
    await executeQuery(query, params);
    
    // Return updated parent
    const updatedParent = await executeQuery(
      'SELECT id, parent_id, fullname, email, phone, relationship, occupation, address, status FROM parents WHERE id = ?',
      [id]
    );

    return NextResponse.json((updatedParent as any[])[0]);
  } catch (error) {
    console.error('Error updating parent:', error);
    return NextResponse.json({ error: 'Failed to update parent' }, { status: 500 });
  }
}

// DELETE /api/parents - Delete parent
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Parent ID is required' }, { status: 400 });
    }

    await executeQuery('DELETE FROM parents WHERE id = ?', [id]);
    
    return NextResponse.json({ message: 'Parent deleted successfully' });
  } catch (error) {
    console.error('Error deleting parent:', error);
    return NextResponse.json({ error: 'Failed to delete parent' }, { status: 500 });
  }
}
