import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

// POST /api/fees/pay - Record payment
export async function POST(request: NextRequest) {
  try {
    const { id, paidDate, paymentMethod, transactionId } = await request.json();
    
    const query = `
      UPDATE fee_records 
      SET paid_date = ?, payment_method = ?, transaction_id = ?, status = 'paid'
      WHERE id = ?
    `;

    const params = [paidDate, paymentMethod, transactionId, id];
    
    await executeQuery(query, params);
    
    // Return updated fee record
    const updatedFee = await executeQuery(
      'SELECT * FROM fee_records WHERE id = ?',
      [id]
    );

    // Type assertion to handle the MySQL result
    const feeRecords = updatedFee as any[];
    return NextResponse.json(feeRecords[0] || null);
  } catch (error) {
    console.error('Error recording payment:', error);
    return NextResponse.json({ error: 'Failed to record payment' }, { status: 500 });
  }
}
