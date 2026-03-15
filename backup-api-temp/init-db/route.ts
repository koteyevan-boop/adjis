import { NextResponse } from 'next/server';
import { testConnection, initializeDatabase } from '@/lib/db';

// GET /api/init-db - Initialize database tables
export async function GET() {
  try {
    // Test database connection first
    const isConnected = await testConnection();
    
    if (!isConnected) {
      return NextResponse.json({ 
        error: 'Database connection failed',
        message: 'Please check your database configuration in .env.local'
      }, { status: 500 });
    }

    // Initialize database tables
    await initializeDatabase();
    
    return NextResponse.json({ 
      success: true,
      message: 'Database initialized successfully',
      tables: [
        'students',
        'teachers', 
        'parents',
        'assignments',
        'submissions',
        'exams',
        'exam_results',
        'fee_records',
        'report_cards',
        'events',
        'timetable'
      ]
    });
  } catch (error) {
    console.error('Database initialization error:', error);
    return NextResponse.json({ 
      error: 'Database initialization failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
