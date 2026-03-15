const Grade = require('../models/Grade');
const Student = require('../models/Student');

const addGrade = async (req, res) => {
  try {
    const gradeData = req.body;
    
    // Calculate percentage and grade
    const percentage = (gradeData.marks.obtained / gradeData.marks.total) * 100;
    let grade = '';
    
    if (percentage >= 90) grade = 'A+';
    else if (percentage >= 80) grade = 'A';
    else if (percentage >= 70) grade = 'B+';
    else if (percentage >= 60) grade = 'B';
    else if (percentage >= 50) grade = 'C';
    else grade = 'F';

    const newGrade = new Grade({
      ...gradeData,
      'marks.percentage': percentage,
      grade
    });

    await newGrade.save();

    res.status(201).json({
      message: 'Grade added successfully',
      grade: newGrade
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudentGrades = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { examType, academicYear } = req.query;

    const query = { student: studentId };
    if (examType) query.examType = examType;
    if (academicYear) query.academicYear = academicYear;

    const grades = await Grade.find(query)
      .populate('teacher', 'employeeId')
      .sort({ examDate: -1 });

    // Group by exam type
    const groupedGrades = grades.reduce((acc, grade) => {
      if (!acc[grade.examType]) {
        acc[grade.examType] = [];
      }
      acc[grade.examType].push(grade);
      return acc;
    }, {});

    // Calculate overall statistics
    const allSubjects = grades.map(g => ({
      subject: g.subject,
      percentage: g.marks.percentage,
      grade: g.grade
    }));

    const averagePercentage = grades.length > 0
      ? grades.reduce((sum, g) => sum + g.marks.percentage, 0) / grades.length
      : 0;

    res.json({
      groupedGrades,
      overall: {
        totalSubjects: grades.length,
        averagePercentage,
        subjects: allSubjects
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateReportCard = async (req, res) => {
  try {
    const { studentId, examType, academicYear } = req.params;

    const student = await Student.findOne({ studentId })
      .populate('user', 'name email');

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const grades = await Grade.find({
      student: student._id,
      examType,
      academicYear
    });

    // Calculate subject-wise performance
    const subjects = grades.map(g => ({
      name: g.subject,
      marks: g.marks.obtained,
      total: g.marks.total,
      percentage: g.marks.percentage,
      grade: g.grade
    }));

    // Calculate totals
    const totalMarks = subjects.reduce((sum, s) => sum + s.marks, 0);
    const totalMaxMarks = subjects.reduce((sum, s) => sum + s.total, 0);
    const overallPercentage = (totalMarks / totalMaxMarks) * 100;

    // Determine result
    const failedSubjects = subjects.filter(s => s.percentage < 40);
    const result = failedSubjects.length === 0 ? 'PASS' : 'FAIL';

    res.json({
      studentInfo: {
        name: student.user.name,
        studentId: student.studentId,
        grade: student.grade,
        section: student.section
      },
      examInfo: {
        type: examType,
        year: academicYear
      },
      subjects,
      summary: {
        totalMarks,
        totalMaxMarks,
        overallPercentage: overallPercentage.toFixed(2),
        result,
        remarks: result === 'PASS' ? 'Promoted' : 'Needs Improvement'
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addGrade,
  getStudentGrades,
  generateReportCard
};