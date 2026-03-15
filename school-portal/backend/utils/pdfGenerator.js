const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

class ReportCardPDF {
  constructor(reportCard, student, exam, schoolInfo) {
    this.reportCard = reportCard;
    this.student = student;
    this.exam = exam;
    this.schoolInfo = schoolInfo;
    this.doc = new PDFDocument({ margin: 50, size: 'A4' });
  }

  async generate() {
    return new Promise((resolve, reject) => {
      try {
        const filename = `report_card_${this.student.studentId}_${Date.now()}.pdf`;
        const filepath = path.join(__dirname, '../uploads/report-cards/', filename);
        
        // Create write stream
        const stream = fs.createWriteStream(filepath);
        this.doc.pipe(stream);

        // Generate content
        this.addHeader();
        this.addStudentInfo();
        this.addExamInfo();
        this.addMarksTable();
        this.addAttendance();
        this.addCoCurricular();
        this.addRemarks();
        this.addFooter();

        this.doc.end();

        stream.on('finish', () => resolve(filepath));
        stream.on('error', reject);
      } catch (error) {
        reject(error);
      }
    });
  }

  addHeader() {
    // School Logo and Name
    this.doc.fontSize(20)
      .font('Helvetica-Bold')
      .text(this.schoolInfo.name, { align: 'center' })
      .fontSize(12)
      .font('Helvetica')
      .text(this.schoolInfo.address, { align: 'center' })
      .text(`${this.schoolInfo.city}, ${this.schoolInfo.state} - ${this.schoolInfo.pincode}`, { align: 'center' })
      .text(`Phone: ${this.schoolInfo.phone} | Email: ${this.schoolInfo.email}`, { align: 'center' })
      .moveDown(2);

    // Report Card Title
    this.doc.fontSize(16)
      .font('Helvetica-Bold')
      .text('ACADEMIC REPORT CARD', { align: 'center' })
      .moveDown(0.5)
      .fontSize(14)
      .text(`${this.exam.examType.toUpperCase()} EXAMINATION - ${this.exam.academicYear}`, { align: 'center' })
      .moveDown(2);

    // Add horizontal line
    this.doc.moveTo(50, this.doc.y)
      .lineTo(550, this.doc.y)
      .stroke();
  }

  addStudentInfo() {
    this.doc.moveDown().fontSize(12);
    
    // Create student info table
    const studentInfo = [
      ['Student Name:', this.student.user.name, 'Roll No:', this.student.rollNo || '-'],
      ['Class:', `${this.student.grade} - ${this.student.section}`, 'Student ID:', this.student.studentId],
      ['Date of Birth:', new Date(this.student.dateOfBirth).toLocaleDateString(), 'Gender:', this.student.gender]
    ];

    studentInfo.forEach(row => {
      this.doc.font('Helvetica-Bold').text(row[0], 50, this.doc.y, { continued: true, width: 120 })
        .font('Helvetica').text(row[1], { continued: true, width: 150 })
        .font('Helvetica-Bold').text(row[2], { continued: true, width: 100 })
        .font('Helvetica').text(row[3], { width: 150 });
    });

    this.doc.moveDown(2);
  }

  addExamInfo() {
    this.doc.fontSize(12)
      .font('Helvetica-Bold')
      .text('Examination Details:', 50, this.doc.y)
      .font('Helvetica')
      .text(`Duration: ${new Date(this.exam.startDate).toLocaleDateString()} to ${new Date(this.exam.endDate).toLocaleDateString()}`)
      .moveDown();
  }

  addMarksTable() {
    // Table headers
    const startY = this.doc.y;
    const colWidths = [150, 80, 80, 80, 80, 150];
    
    this.doc.font('Helvetica-Bold').fontSize(11);
    
    // Draw header background
    this.doc.rect(50, startY, 500, 25).fill('#f0f0f0');
    
    // Header text
    const headers = ['Subject', 'Marks', 'Total', '%', 'Grade', 'Comments'];
    let xPos = 55;
    headers.forEach((header, i) => {
      this.doc.fillColor('black').text(header, xPos, startY + 8, { width: colWidths[i], align: 'left' });
      xPos += colWidths[i];
    });

    // Table rows
    let yPos = startY + 30;
    this.doc.font('Helvetica').fontSize(10);

    this.reportCard.subjects.forEach((subject, index) => {
      xPos = 55;
      
      // Alternate row colors
      if (index % 2 === 0) {
        this.doc.rect(50, yPos - 5, 500, 20).fill('#f9f9f9');
      }
      
      this.doc.fillColor('black');
      
      // Subject
      this.doc.text(subject.name, xPos, yPos, { width: colWidths[0] });
      xPos += colWidths[0];
      
      // Marks Obtained
      this.doc.text(subject.marksObtained.toString(), xPos, yPos, { width: colWidths[1] });
      xPos += colWidths[1];
      
      // Total Marks
      this.doc.text(subject.totalMarks.toString(), xPos, yPos, { width: colWidths[2] });
      xPos += colWidths[2];
      
      // Percentage
      this.doc.text(subject.percentage.toFixed(2) + '%', xPos, yPos, { width: colWidths[3] });
      xPos += colWidths[3];
      
      // Grade
      this.doc.text(subject.grade, xPos, yPos, { width: colWidths[4] });
      xPos += colWidths[4];
      
      // Comments (truncated)
      const comment = subject.comments?.final || subject.comments?.teacher || '-';
      this.doc.text(comment.substring(0, 20) + (comment.length > 20 ? '...' : ''), xPos, yPos, { width: colWidths[5] });
      
      yPos += 20;
    });

    // Draw borders
    this.doc.rect(50, startY, 500, yPos - startY).stroke();

    // Summary
    yPos += 20;
    this.doc.font('Helvetica-Bold').fontSize(11);
    this.doc.text(`Total Percentage: ${this.reportCard.percentage.toFixed(2)}%`, 50, yPos);
    this.doc.text(`Result: ${this.reportCard.result}`, 250, yPos);
    if (this.reportCard.rank) {
      this.doc.text(`Rank: ${this.reportCard.rank}`, 400, yPos);
    }

    this.doc.moveDown(2);
  }

  addAttendance() {
    if (this.reportCard.attendance) {
      this.doc.fontSize(11)
        .font('Helvetica-Bold')
        .text('Attendance Summary:', 50, this.doc.y)
        .font('Helvetica')
        .text(`Total Working Days: ${this.reportCard.attendance.totalDays}`, 70, this.doc.y + 20)
        .text(`Days Present: ${this.reportCard.attendance.presentDays}`, 250, this.doc.y - 10)
        .text(`Attendance Percentage: ${this.reportCard.attendance.percentage.toFixed(2)}%`, 400, this.doc.y - 20)
        .moveDown(3);
    }
  }

  addCoCurricular() {
    if (this.reportCard.coCurricular && this.reportCard.coCurricular.length > 0) {
      this.doc.fontSize(11)
        .font('Helvetica-Bold')
        .text('Co-Curricular Activities:', 50, this.doc.y)
        .font('Helvetica');

      let yPos = this.doc.y + 15;
      this.reportCard.coCurricular.forEach(activity => {
        this.doc.text(`• ${activity.activity}: ${activity.grade} - ${activity.remarks}`, 70, yPos);
        yPos += 15;
      });

      this.doc.moveDown(2);
    }
  }

  addRemarks() {
    this.doc.fontSize(11)
      .font('Helvetica-Bold')
      .text('Remarks:', 50, this.doc.y)
      .font('Helvetica');

    let yPos = this.doc.y + 15;

    if (this.reportCard.classTeacherRemarks) {
      this.doc.text(`Class Teacher: ${this.reportCard.classTeacherRemarks}`, 70, yPos);
      yPos += 15;
    }

    if (this.reportCard.principalRemarks) {
      this.doc.text(`Principal: ${this.reportCard.principalRemarks}`, 70, yPos);
      yPos += 15;
    }

    this.doc.moveDown(2);
  }

  addFooter() {
    // Signatures
    const bottomY = 700;
    
    this.doc.fontSize(10);
    
    // Class Teacher Signature
    this.doc.text('Class Teacher', 100, bottomY)
      .text('_________________', 70, bottomY + 15);
    
    // Principal Signature
    this.doc.text('Principal', 400, bottomY)
      .text('_________________', 370, bottomY + 15);
    
    // Generated Date
    this.doc.fontSize(8)
      .text(`Generated on: ${new Date().toLocaleString()}`, 50, bottomY + 50)
      .text('This is a computer generated report card.', 50, bottomY + 65);
  }
}

module.exports = ReportCardPDF;