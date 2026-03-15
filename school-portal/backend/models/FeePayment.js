const mongoose = require('mongoose');

const feePaymentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  feeStructure: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FeeStructure',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paidAmount: {
    type: Number,
    required: true
  },
  dueAmount: {
    type: Number,
    required: true
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  dueDate: Date,
  paymentMode: {
    type: String,
    enum: ['cash', 'cheque', 'online', 'dd'],
    required: true
  },
  transactionId: String,
  chequeNumber: String,
  bankName: String,
  status: {
    type: String,
    enum: ['pending', 'paid', 'partial', 'overdue', 'cancelled'],
    default: 'pending'
  },
  remarks: String,
  receivedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  receiptNumber: {
    type: String,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FeePayment', feePaymentSchema);