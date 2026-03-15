const Exam = require('../models/Exam');
const ExamRegistration = require('../models/ExamRegistration');
const Student = require('../models/Student');
const Grade = require('../models/Grade');

const createExam = async (req, res) => {
  try {
    const examData = req.body;

    const exam = new Exam({
      ...examData,
      createdBy: req.user._id
    });

    await exam.save();

    res.status(201).json({
      message: 'Exam created successfully',
      exam
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getExams = async (req, res) => {
  try {
    const { academicYear, examType, status, grade } = req.query;
    const query = {};

    if (academicYear) query.academicYear = academicYear;
    if (examType) query.examType = examType;
    if (status) query.status = status;
    if (grade) query['classes.grade'] = grade;

    const exams = await Exam.find(query)
      .sort({ startDate: -1 });

    res.json(exams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getExam = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);

    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    // Get registration statistics
    const registrations = await ExamRegistration.find({ exam: exam._id });
    const totalStudents = registrations.length;
    const registeredCount = registrations.filter(r => r.status === 'registered').length;
    const absentCount = registrations.filter(r => r.status === 'absent').length;

    const examWithStats = {
      ...exam.toObject(),
      statistics: {
        totalStudents,
        registeredCount,
        absentCount,
        appearedCount: totalStudents - absentCount
      }
    };

    res.json(examWithStats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    res.json({
      message: 'Exam updated successfully',
      exam
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);

    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    await exam.remove();
    
    res.json({ message: 'Exam deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const publishExam = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);

    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    exam.status = 'published';
    await exam.save();

    // Automatically register eligible students
    const students = await Student.find({
      grade: { $in: exam.classes.map(c => c.grade) }
    });

    const registrations = students.map(student => ({
      exam: exam._id,
      student: student._id,
      subjects: exam.subjects.map(subject => ({
        name: subject.name,
        code: subject.code,
        isEligible: true
      }))
    }));

    await ExamRegistration.insertMany(registrations);

    // Emit notifications
    const io = req.app.get('io');
    students.forEach(student => {
      io.to(student.user.toString()).emit('examPublished', {
        exam: exam.title,
        startDate: exam.startDate
      });
    });

    res.json({
      message: 'Exam published successfully',
      exam
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getExamSchedule = async (req, res) => {
  try {
    const { grade, section } = req.query;
    
    const exams = await Exam.find({
      'classes.grade': grade,
      'classes.sections': section,
      status: 'published'
    }).sort({ startDate: 1 });

    res.json(exams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const registerStudent = async (req, res) => {
  try {
    const { examId } = req.params;
    const { studentId, rollNumber, room } = req.body;

    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Check if already registered
    const existingRegistration = await ExamRegistration.findOne({
      exam: examId,
      student: studentId
    });

    if (existingRegistration) {
      return res.status(400).json({ error: 'Student already registered' });
    }

    // Check eligibility (attendance >= 75%)
    const attendancePercentage = student.attendancePercentage || 0;
    const subjects = exam.subjects.map(subject => ({
      name: subject.name,
      code: subject.code,
      isEligible: attendancePercentage >= 75,
      reason: attendancePercentage < 75 ? 'Insufficient attendance' : undefined
    }));

    const registration = new ExamRegistration({
      exam: examId,
      student: studentId,
      subjects,
      rollNumber,
      room
    });

    await registration.save();

    res.status(201).json({
      message: 'Student registered successfully',
      registration
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getExamRegistrations = async (req, res) => {
  try {
    const { examId } = req.params;

    const registrations = await ExamRegistration.find({ exam: examId })
      .populate({
        path: 'student',
        populate: { path: 'user', select: 'name email' }
      })
      .sort({ rollNumber: 1 });

    res.json(registrations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateHallTicket = async (req, res) => {
  try {
    const { examId, studentId } = req.params;

    const registration = await ExamRegistration.findOne({
      exam: examId,
      student: studentId
    }).populate('exam').populate({
      path: 'student',
      populate: { path: 'user', select: 'name email' }
    });

    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    // Generate hall ticket data
    const hallTicket = {
      registration,
      student: registration.student,
      exam: registration.exam,
      subjects: registration.subjects.filter(s => s.isEligible),
      generatedAt: new Date(),
      isValid: true
    };

    res.json(hallTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const markExamAttendance = async (req, res) => {
  try {
    const { examId, subjectCode } = req.params;
    const { attendance } = req.body; // Array of { studentId, status }

    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    for (const record of attendance) {
      await ExamRegistration.findOneAndUpdate(
        {
          exam: examId,
          student: record.studentId
        },
        {
          $set: {
            [`subjectAttendance.${subjectCode}`]: record.status
          }
        }
      );
    }

    res.json({ message: 'Exam attendance marked successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createExam,
  getExams,
  getExam,
  updateExam,
  deleteExam,
  publishExam,
  getExamSchedule,
  registerStudent,
  getExamRegistrations,
  generateHallTicket,
  markExamAttendance
};