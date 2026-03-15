const Comment = require('../models/Comment');
const Student = require('../models/Student');
const Exam = require('../models/Exam');
const Grade = require('../models/Grade');
const aiCommentService = require('../services/aiCommentService');

// Generate AI comment for a subject
const generateAIComment = async (req, res) => {
  try {
    const { studentId, examId, subject } = req.body;

    const student = await Student.findById(studentId).populate('user');
    const exam = await Exam.findById(examId);
    
    if (!student || !exam) {
      return res.status(404).json({ error: 'Student or Exam not found' });
    }

    // Get grade for this subject
    const grade = await Grade.findOne({
      student: studentId,
      examType: exam.examType,
      subject,
      academicYear: exam.academicYear
    });

    if (!grade) {
      return res.status(404).json({ error: 'Grade not found for this subject' });
    }

    // Generate AI comment
    const aiComment = await aiCommentService.generateComments(
      subject,
      grade.marks.obtained,
      grade.marks.total,
      {
        name: student.user.name,
        grade: student.grade,
        section: student.section
      }
    );

    // Find or create comment
    let comment = await Comment.findOne({
      student: studentId,
      exam: examId,
      subject
    });

    if (comment) {
      comment.aiComment = {
        text: aiComment,
        generatedAt: new Date(),
        model: process.env.AI_MODEL || 'rule-based'
      };
      comment.finalComment = {
        text: aiComment,
        source: 'ai'
      };
      await comment.save();
    } else {
      comment = new Comment({
        student: studentId,
        exam: examId,
        subject,
        aiComment: {
          text: aiComment,
          generatedAt: new Date(),
          model: process.env.AI_MODEL || 'rule-based'
        },
        finalComment: {
          text: aiComment,
          source: 'ai'
        },
        marksObtained: grade.marks.obtained,
        totalMarks: grade.marks.total,
        percentage: grade.marks.percentage,
        grade: grade.grade
      });
      await comment.save();
    }

    res.json({
      message: 'AI comment generated successfully',
      comment
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get comments for a student's exam
const getStudentExamComments = async (req, res) => {
  try {
    const { studentId, examId } = req.params;

    const comments = await Comment.find({
      student: studentId,
      exam: examId
    });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update comment (teacher edit)
const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    comment.teacherComment = {
      text,
      editedAt: new Date(),
      editedBy: req.user._id
    };
    comment.finalComment = {
      text,
      source: 'teacher'
    };
    comment.updatedAt = new Date();

    await comment.save();

    res.json({
      message: 'Comment updated successfully',
      comment
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Bulk generate AI comments for a class
const bulkGenerateComments = async (req, res) => {
  try {
    const { examId, grade, section, subjects } = req.body;

    const students = await Student.find({ grade, section }).populate('user');
    const exam = await Exam.findById(examId);

    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    const results = [];

    for (const student of students) {
      for (const subject of subjects) {
        try {
          // Get grade
          const grade = await Grade.findOne({
            student: student._id,
            examType: exam.examType,
            subject,
            academicYear: exam.academicYear
          });

          if (!grade) continue;

          // Generate AI comment
          const aiComment = await aiCommentService.generateComments(
            subject,
            grade.marks.obtained,
            grade.marks.total,
            {
              name: student.user.name,
              grade: student.grade,
              section: student.section
            }
          );

          // Save comment
          await Comment.findOneAndUpdate(
            {
              student: student._id,
              exam: examId,
              subject
            },
            {
              student: student._id,
              exam: examId,
              subject,
              aiComment: {
                text: aiComment,
                generatedAt: new Date(),
                model: process.env.AI_MODEL || 'rule-based'
              },
              finalComment: {
                text: aiComment,
                source: 'ai'
              },
              marksObtained: grade.marks.obtained,
              totalMarks: grade.marks.total,
              percentage: grade.marks.percentage,
              grade: grade.grade
            },
            { upsert: true, new: true }
          );

          results.push({
            studentId: student.studentId,
            subject,
            status: 'success'
          });
        } catch (error) {
          results.push({
            studentId: student.studentId,
            subject,
            status: 'failed',
            error: error.message
          });
        }
      }
    }

    res.json({
      message: 'Bulk comment generation completed',
      results
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get comment templates
const getCommentTemplates = async (req, res) => {
  const templates = {
    excellent: [
      "Outstanding performance! {name} has shown exceptional understanding of {subject} concepts.",
      "Excellent work in {subject}. {name} consistently produces high-quality work.",
      "Superb understanding of {subject} material. Keep up the great work!"
    ],
    good: [
      "Good performance in {subject}. {name} demonstrates solid understanding of key concepts.",
      "Satisfactory work in {subject}. With continued effort, can achieve excellence.",
      "Shows good grasp of {subject} fundamentals. Practice will lead to mastery."
    ],
    average: [
      "Satisfactory performance in {subject}. Needs to focus on regular practice.",
      "Average work in {subject}. Encourage more attention to detail and regular study.",
      "Making steady progress in {subject}. Keep practicing to improve further."
    ],
    needsImprovement: [
      "Needs improvement in {subject}. Focus on basic concepts and regular revision.",
      "Requires additional effort in {subject}. Seek help when facing difficulties.",
      "Struggling with {subject} concepts. Please ensure regular practice and attention."
    ]
  };

  res.json(templates);
};

module.exports = {
  generateAIComment,
  getStudentExamComments,
  updateComment,
  bulkGenerateComments,
  getCommentTemplates
};