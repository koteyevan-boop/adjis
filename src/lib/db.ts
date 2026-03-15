import mysql from "mysql2/promise";

// Database connection pool
export const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test database connection
export async function testConnection() {
  try {
    const connection = await db.getConnection();
    await connection.ping();
    connection.release();
    console.log('Database connected successfully');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

// Helper function to execute queries with error handling
export async function executeQuery(sql: string, params?: any[]) {
  try {
    const [rows] = await db.execute(sql, params);
    return rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Initialize database tables if they don't exist
export async function initializeDatabase() {
  try {
    // Create students table
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id VARCHAR(50) UNIQUE NOT NULL,
        fullname VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE,
        phone VARCHAR(50),
        grade VARCHAR(20),
        section VARCHAR(10),
        date_of_birth DATE,
        gender ENUM('Male', 'Female', 'Other'),
        address TEXT,
        parent_id VARCHAR(50),
        enrollment_date DATE,
        status ENUM('Active', 'Inactive', 'Graduated') DEFAULT 'Active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create teachers table
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS teachers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        teacher_id VARCHAR(50) UNIQUE NOT NULL,
        fullname VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(50),
        specialization VARCHAR(255),
        qualification VARCHAR(255),
        experience_years INT,
        subjects TEXT,
        hire_date DATE,
        status ENUM('Active', 'Inactive') DEFAULT 'Active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create parents table
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS parents (
        id INT AUTO_INCREMENT PRIMARY KEY,
        parent_id VARCHAR(50) UNIQUE NOT NULL,
        fullname VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(50) NOT NULL,
        relationship VARCHAR(50),
        occupation VARCHAR(255),
        address TEXT,
        password_hash VARCHAR(255),
        status ENUM('Active', 'Inactive') DEFAULT 'Active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create assignments table
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS assignments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        subject VARCHAR(100) NOT NULL,
        grade VARCHAR(20) NOT NULL,
        section VARCHAR(10),
        due_date DATE NOT NULL,
        total_marks INT NOT NULL,
        teacher_id VARCHAR(50),
        status ENUM('draft', 'published', 'closed') DEFAULT 'published',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id)
      )
    `);

    // Create submissions table
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        assignment_id INT NOT NULL,
        student_id VARCHAR(50) NOT NULL,
        attachments TEXT,
        comments TEXT,
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        grade INT,
        feedback TEXT,
        graded_at TIMESTAMP NULL,
        graded_by VARCHAR(50),
        FOREIGN KEY (assignment_id) REFERENCES assignments(id),
        FOREIGN KEY (student_id) REFERENCES students(student_id)
      )
    `);

    // Create exams table
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS exams (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        subject VARCHAR(100) NOT NULL,
        grade VARCHAR(20) NOT NULL,
        section VARCHAR(10),
        exam_date DATE NOT NULL,
        duration INT NOT NULL,
        total_marks INT NOT NULL,
        instructions TEXT,
        questions TEXT,
        teacher_id VARCHAR(50),
        status ENUM('draft', 'published', 'completed') DEFAULT 'published',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create exam_results table
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS exam_results (
        id INT AUTO_INCREMENT PRIMARY KEY,
        exam_id INT NOT NULL,
        student_id VARCHAR(50) NOT NULL,
        answers TEXT,
        total_marks INT NOT NULL,
        percentage DECIMAL(5,2),
        grade VARCHAR(5),
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        graded_at TIMESTAMP NULL,
        graded_by VARCHAR(50),
        FOREIGN KEY (exam_id) REFERENCES exams(id),
        FOREIGN KEY (student_id) REFERENCES students(student_id)
      )
    `);

    // Create fee_records table
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS fee_records (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id VARCHAR(50) NOT NULL,
        term VARCHAR(20) NOT NULL,
        year VARCHAR(10) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        due_date DATE NOT NULL,
        paid_date DATE NULL,
        status ENUM('pending', 'paid', 'overdue') DEFAULT 'pending',
        payment_method VARCHAR(50),
        transaction_id VARCHAR(100),
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES students(student_id)
      )
    `);

    // Create report_cards table
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS report_cards (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id VARCHAR(50) NOT NULL,
        term VARCHAR(20) NOT NULL,
        year VARCHAR(10) NOT NULL,
        grade VARCHAR(20) NOT NULL,
        subjects TEXT,
        attendance_total_days INT,
        attendance_present_days INT,
        attendance_percentage INT,
        conduct_grade VARCHAR(10),
        conduct_remarks TEXT,
        class_teacher_remarks TEXT,
        principal_remarks TEXT,
        generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES students(student_id)
      )
    `);

    // Create events table
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        event_date DATE NOT NULL,
        event_time TIME,
        location VARCHAR(255),
        type ENUM('academic', 'sports', 'cultural', 'meeting', 'holiday') DEFAULT 'academic',
        status ENUM('upcoming', 'ongoing', 'completed', 'cancelled') DEFAULT 'upcoming',
        created_by VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create timetable table
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS timetable (
        id INT AUTO_INCREMENT PRIMARY KEY,
        day_of_week ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
        time_slot VARCHAR(50) NOT NULL,
        subject VARCHAR(100) NOT NULL,
        teacher_id VARCHAR(50),
        grade VARCHAR(20) NOT NULL,
        section VARCHAR(10),
        room VARCHAR(50),
        term VARCHAR(20),
        year VARCHAR(10),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    console.log('Database tables initialized successfully');
    return true;
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
}
