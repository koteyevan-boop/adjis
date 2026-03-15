const ReportCard = require('../models/ReportCard');
const Student = require('../models/Student');
const Exam = require('../models/Exam');
const Grade = require('../models/Grade');
const Attendance = require('../models/Attendance');
const ReportCardPDF = require('../utils/pdfGenerator');
const fs = require('fs');
const path = require('path');

// Generate report card
const generateReportCard = async (req, res) => {
  try {
    const { studentId, examId } = req.params;

    // Fetch data
    const student = await Student.findById(studentId).populate('user');
    const exam = await Exam.findById(examId);
    
    if (!student || !exam) {
      return res.status(404).json({ error: 'Student or Exam not found' });
    }

    // Check if report card already exists
    let reportCard = await ReportCard.findOne({
      student: studentId,
      exam: examId
    });

    if (reportCard) {
      return res.json(reportCard);
    }

    // Fetch grades for this student in this exam
    const grades = await Grade.find({
      student: studentId,
      examType: exam.examType,
      academicYear: exam.academicYear
    });

    // Calculate subject-wise performance
    const subjects = [];
    let totalMarksObtained = 0;
    let totalMarks = 0;

    for (const grade of grades) {
      totalMarksObtained += grade.marks.obtained;
      totalMarks += grade.marks.total;
      
      subjects.push({
        name: grade.subject,
        code: grade.subject,
        marksObtained: grade.marks.obtained,
        totalMarks: grade.marks.total,
        percentage: grade.marks.percentage,
        grade: grade.grade,
        comments: {
          teacher: grade.remarks || ''
        }
      });
    }

    // Calculate attendance for the exam period
    const attendanceRecords = await Attendance.find({
      student: studentId,
      date: { $gte: exam.startDate, $lte: exam.endDate }
    });

    const totalDays = attendanceRecords.length;
    const presentDays = attendanceRecords.filter(a => 
      a.status === 'present' || a.status === 'late'
    ).length;
    const attendancePercentage = totalDays > 0 ? (presentDays / totalDays) * 100 : 0;

    // Determine result
    const percentage = totalMarks > 0 ? (totalMarksObtained / totalMarks) * 100 : 0;
    const failedSubjects = subjects.filter(s => s.percentage < 40);
    const result = failedSubjects.length === 0 ? 'PASS' : 'FAIL';

    // Create report card
    reportCard = new ReportCard({
      student: studentId,
      exam: examId,
      academicYear: exam.academicYear,
      term: exam.examType,
      subjects,
      attendance: {
        totalDays,
        presentDays,
        percentage: attendancePercentage
      },
      result,
      percentage,
      generatedBy: req.user._id
    });

    await reportCard.save();

    res.status(201).json({
      message: 'Report card generated successfully',
      reportCard
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get report cards for a student
const getStudentReportCards = async (req, res) => {
  try {
    const { studentId } = req.params;

    const reportCards = await ReportCard.find({ student: studentId })
      .populate('exam')
      .sort({ academicYear: -1, term: -1 });

    res.json(reportCards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get report card by ID
const getReportCard = async (req, res) => {
  try {
    const reportCard = await ReportCard.findById(req.params.id)
      .populate({
        path: 'student',
        populate: { path: 'user', select: 'name email' }
      })
      .populate('exam');

    if (!reportCard) {
      return res.status(404).json({ error: 'Report card not found' });
    }

    res.json(reportCard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export report card as PDF
const exportReportCardPDF = async (req, res) => {
  try {
    const reportCard = await ReportCard.findById(req.params.id)
      .populate({
        path: 'student',
        populate: { path: 'user', select: 'name email' }
      })
      .populate('exam');

    if (!reportCard) {
      return res.status(404).json({ error: 'Report card not found' });
    }

    // School information
    const schoolInfo = {
      name: process.env.SCHOOL_NAME || 'Your School Name',
      address: process.env.SCHOOL_ADDRESS || 'School Address',
      city: process.env.SCHOOL_CITY || 'City',
      state: process.env.SCHOOL_STATE || 'State',
      pincode: process.env.SCHOOL_PINCODE || '000000',
      phone: process.env.SCHOOL_PHONE || '0000000000',
      email: process.env.SCHOOL_EMAIL || 'school@example.com'
    };

    // Generate PDF
    const pdfGenerator = new ReportCardPDF(
      reportCard,
      reportCard.student,
      reportCard.exam,
      schoolInfo
    );

    const pdfPath = await pdfGenerator.generate();
    
    // Update report card with PDF URL
    const pdfUrl = `/uploads/report-cards/${path.basename(pdfPath)}`;
    reportCard.pdfUrl = pdfUrl;
    await reportCard.save();

    // Send file
    res.download(pdfPath, `report_card_${reportCard.student.studentId}_${reportCard.term}.pdf`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Publish report card
const publishReportCard = async (req, res) => {
  try {
    const reportCard = await ReportCard.findByIdAndUpdate(
      req.params.id,
      {
        isPublished: true,
        publishedAt: new Date()
      },
      { new: true }
    );

    if (!reportCard) {
      return res.status(404).json({ error: 'Report card not found' });
    }

    res.json({
      message: 'Report card published successfully',
      reportCard
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Bulk generate report cards for a class
const bulkGenerateReportCards = async (req, res) => {
  try {
    const { examId, grade, section } = req.body;

    const students = await Student.find({ grade, section });
    const exam = await Exam.findById(examId);

    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    const results = [];

    for (const student of students) {
      try {
        // Check if report card already exists
        let reportCard = await ReportCard.findOne({
          student: student._id,
          exam: examId
        });

        if (!reportCard) {
          // Fetch grades
          const grades = await Grade.find({
            student: student._id,
            examType: exam.examType,
            academicYear: exam.academicYear
          });

          const subjects = [];
          let totalMarksObtained = 0;
          let totalMarks = 0;

          for (const grade of grades) {
            totalMarksObtained += grade.marks.obtained;
            totalMarks += grade.marks.total;
            
            subjects.push({
              name: grade.subject,
              code: grade.subject,
              marksObtained: grade.marks.obtained,
              totalMarks: grade.marks.total,
              percentage: grade.marks.percentage,
              grade: grade.grade,
              comments: {
                teacher: grade.remarks || ''
              }
            });
          }

          const percentage = totalMarks > 0 ? (totalMarksObtained / totalMarks) * 100 : 0;
          const failedSubjects = subjects.filter(s => s.percentage < 40);
          const result = failedSubjects.length === 0 ? 'PASS' : 'FAIL';

          reportCard = new ReportCard({
            student: student._id,
            exam: examId,
            academicYear: exam.academicYear,
            term: exam.examType,
            subjects,
            result,
            percentage,
            generatedBy: req.user._id
          });

          await reportCard.save();
        }

        results.push({
          studentId: student.studentId,
          name: student.user.name,
          status: 'success',
          reportCardId: reportCard._id
        });
      } catch (error) {
        results.push({
          studentId: student.studentId,
          name: student.user.name,
          status: 'failed',
          error: error.message
        });
      }
    }

    res.json({
      message: 'Bulk generation completed',
      results
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  generateReportCard,
  getStudentReportCards,
  getReportCard,
  exportReportCardPDF,
  publishReportCard,
  bulkGenerateReportCards
};