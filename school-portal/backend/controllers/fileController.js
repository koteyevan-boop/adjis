const Assignment = require('../models/Assignment');
const Submission = require('../models/Submission');
const Document = require('../models/Document');
const fs = require('fs');
const path = require('path');

// Assignment Controllers
const createAssignment = async (req, res) => {
  try {
    const assignmentData = req.body;
    
    const assignment = new Assignment({
      ...assignmentData,
      createdBy: req.user.teacherId,
      attachments: req.files ? req.files.map(file => ({
        filename: file.filename,
        originalName: file.originalname,
        path: file.path,
        size: file.size,
        mimetype: file.mimetype
      })) : []
    });

    await assignment.save();

    res.status(201).json({
      message: 'Assignment created successfully',
      assignment
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAssignments = async (req, res) => {
  try {
    const { grade, section, subject } = req.query;
    const query = {};

    if (grade) query.grade = grade;
    if (section) query.section = section;
    if (subject) query.subject = subject;

    // For students, only show published assignments
    if (req.user.role === 'student') {
      query.status = 'published';
    }

    const assignments = await Assignment.find(query)
      .populate('createdBy', 'employeeId')
      .sort({ dueDate: 1 });

    // For students, check submission status
    if (req.user.role === 'student') {
      const studentId = req.user.studentId;
      const assignmentsWithStatus = await Promise.all(
        assignments.map(async (assignment) => {
          const submission = await Submission.findOne({
            assignment: assignment._id,
            student: studentId
          });
          
          return {
            ...assignment.toObject(),
            submitted: !!submission,
            submission: submission || null
          };
        })
      );
      
      return res.json(assignmentsWithStatus);
    }

    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate('createdBy', 'employeeId name');

    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    res.json(assignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    res.json({
      message: 'Assignment updated successfully',
      assignment
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    // Delete attached files
    assignment.attachments.forEach(file => {
      fs.unlink(file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    });

    await assignment.remove();

    res.json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Submission Controllers
const submitAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const { comments } = req.body;

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    // Check if already submitted
    const existingSubmission = await Submission.findOne({
      assignment: assignmentId,
      student: req.user.studentId
    });

    if (existingSubmission) {
      return res.status(400).json({ error: 'Assignment already submitted' });
    }

    // Determine if late submission
    const isLate = new Date() > new Date(assignment.dueDate);

    const submission = new Submission({
      assignment: assignmentId,
      student: req.user.studentId,
      comments,
      attachments: req.files ? req.files.map(file => ({
        filename: file.filename,
        originalName: file.originalname,
        path: file.path,
        size: file.size,
        mimetype: file.mimetype
      })) : [],
      status: isLate ? 'late' : 'submitted'
    });

    await submission.save();

    // Emit notification
    const io = req.app.get('io');
    io.to(assignment.createdBy.toString()).emit('newSubmission', {
      assignment: assignment.title,
      student: req.user.name,
      submissionId: submission._id
    });

    res.status(201).json({
      message: 'Assignment submitted successfully',
      submission
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSubmissions = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    const submissions = await Submission.find({ assignment: assignmentId })
      .populate({
        path: 'student',
        populate: { path: 'user', select: 'name email' }
      })
      .sort({ submittedAt: -1 });

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const gradeSubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { marks, remarks } = req.body;

    const submission = await Submission.findById(submissionId)
      .populate('assignment');

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    if (marks > submission.assignment.totalMarks) {
      return res.status(400).json({ error: 'Marks cannot exceed total marks' });
    }

    submission.grade = {
      marks,
      remarks,
      gradedBy: req.user.teacherId,
      gradedAt: new Date()
    };
    submission.status = 'graded';

    await submission.save();

    // Emit notification
    const io = req.app.get('io');
    io.to(submission.student.toString()).emit('assignmentGraded', {
      assignment: submission.assignment.title,
      marks,
      totalMarks: submission.assignment.totalMarks
    });

    res.json({
      message: 'Submission graded successfully',
      submission
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Document Controllers
const uploadDocument = async (req, res) => {
  try {
    const { title, description, category, tags, accessRoles } = req.body;

    const document = new Document({
      title,
      description,
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
      category,
      uploadedBy: req.user._id,
      accessRoles: accessRoles ? JSON.parse(accessRoles) : ['admin', 'teacher', 'student'],
      tags: tags ? JSON.parse(tags) : []
    });

    await document.save();

    res.status(201).json({
      message: 'Document uploaded successfully',
      document
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDocuments = async (req, res) => {
  try {
    const { category, search } = req.query;
    const query = {};

    if (category) query.category = category;
    
    // Filter by access roles
    query.accessRoles = req.user.role;

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const documents = await Document.find(query)
      .populate('uploadedBy', 'name')
      .sort({ createdAt: -1 });

    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const downloadDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Check access
    if (!document.accessRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Increment download count
    document.downloads += 1;
    await document.save();

    res.download(document.path, document.originalName);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Delete file
    fs.unlink(document.path, (err) => {
      if (err) console.error('Error deleting file:', err);
    });

    await document.remove();

    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAssignment,
  getAssignments,
  getAssignment,
  updateAssignment,
  deleteAssignment,
  submitAssignment,
  getSubmissions,
  gradeSubmission,
  uploadDocument,
  getDocuments,
  downloadDocument,
  deleteDocument
};