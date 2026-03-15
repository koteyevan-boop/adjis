'use client';

import { useState } from 'react';
import { DollarSign, Users, UserPlus, FileText, Download, Plus, Edit, Trash2, Search, Filter, Calendar, Mail, Phone, Eye, EyeOff, Printer, Calculator, Upload, AlertCircle, CheckCircle, Clock } from 'lucide-react';

export default function EnhancedFeeManagement() {
  const [activeTab, setActiveTab] = useState("payments");
  const [showPassword, setShowPassword] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(null);

  const bills = [
    { id: 1, title: "Tuition Fees - Term 2", amount: 1500, class: "All", dueDate: "2024-03-30", type: "tuition", status: "active" },
    { id: 2, title: "Registration Fees", amount: 200, class: "Grade 7", dueDate: "2024-03-15", type: "registration", status: "active" },
    { id: 3, title: "Examination Fees", amount: 100, class: "Grade 8", dueDate: "2024-03-20", type: "exam", status: "active" },
  ];

  const studentArrears = [
    { id: 1, student: "Ama Mensah", class: "Grade 7A", previousBalance: 500, currentTerm: 1500, totalDue: 2000, paid: 800, balance: 1200 },
    { id: 2, student: "Kofi Asante", class: "Grade 7B", previousBalance: 200, currentTerm: 1500, totalDue: 1700, paid: 1500, balance: 200 },
    { id: 3, student: "Yaa Boateng", class: "Grade 8A", previousBalance: 800, currentTerm: 1600, totalDue: 2400, paid: 1000, balance: 1400 },
  ];

  const recentPayments = [
    { id: 1, student: "Ama Mensah", class: "Grade 7A", amount: 800, date: "2024-03-15", method: "Bank Transfer", status: "completed", receipt: "RCP-2024-001", arrearsCleared: 300 },
    { id: 2, student: "Kofi Asante", class: "Grade 7B", amount: 1500, date: "2024-03-15", method: "Mobile Money", status: "completed", receipt: "RCP-2024-002", arrearsCleared: 200 },
    { id: 3, student: "Yaa Boateng", class: "Grade 8A", amount: 1000, date: "2024-03-14", method: "Cash", status: "completed", receipt: "RCP-2024-003", arrearsCleared: 0 },
  ];

  const paymentVouchers = [
    { id: 1, voucherNo: "PV-2024-001", amount: 500, date: "2024-03-15", purpose: "Office Supplies", approvedBy: "Admin", status: "approved" },
    { id: 2, voucherNo: "PV-2024-002", amount: 1200, date: "2024-03-14", purpose: "School Maintenance", approvedBy: "Admin", status: "approved" },
    { id: 3, voucherNo: "PV-2024-003", amount: 300, date: "2024-03-13", purpose: "Teaching Materials", approvedBy: "Principal", status: "pending" },
  ];

  const accountingData = {
    daily: { income: 4500, expenses: 2000, balance: 2500 },
    weekly: { income: 22500, expenses: 10000, balance: 12500 },
    monthly: { income: 90000, expenses: 40000, balance: 50000 },
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const sendCredentials = (email: string, phone: string, password: string, userType: string) => {
    console.log(`Sending credentials to ${email} and ${phone} for ${userType}`);
    alert(`Credentials sent to ${email} and ${phone}\nPassword: ${password}`);
  };

  const assignBillToStudents = (billId: number, studentIds: number[], isBulk: boolean) => {
    // Logic to assign bills to students
    if (isBulk) {
      alert(`Bill assigned to all students in selected classes`);
    } else {
      alert(`Bill assigned to ${studentIds.length} individual students`);
    }
  };

  const calculateArrears = (studentId: number) => {
    // Logic to calculate arrears based on payment history
    const student = studentArrears.find(s => s.id === studentId);
    return student ? student.balance : 0;
  };

  return (
    <div className="p-6">
      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {[
              { id: "bills", label: "Bill Assignment", icon: FileText },
              { id: "arrears", label: "Arrears Management", icon: AlertCircle },
              { id: "payments", label: "Fee Payments", icon: DollarSign },
              { id: "vouchers", label: "Payment Vouchers", icon: FileText },
              { id: "accounting", label: "Accounting", icon: Calculator },
              { id: "receipts", label: "Receipts", icon: FileText },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "bills" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Bill Assignment</h3>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  <Plus className="h-4 w-4" />
                  Create New Bill
                </button>
              </div>

              {/* Bill Creation Form */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-md font-medium text-gray-700 mb-4">Create New Bill</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bill Title</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Enter bill title" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                    <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Enter amount" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bill Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>Tuition Fees</option>
                      <option>Registration Fees</option>
                      <option>Examination Fees</option>
                      <option>Extra Classes</option>
                      <option>Library Fees</option>
                      <option>Sports Fees</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assignment Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>Bulk Assignment</option>
                      <option>Individual Students</option>
                      <option>By Class</option>
                      <option>By Grade</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Target Class/Grade</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>All Students</option>
                      <option>Grade 7</option>
                      <option>Grade 8</option>
                      <option>Grade 9</option>
                      <option>Grade 7A</option>
                      <option>Grade 7B</option>
                      <option>Grade 8A</option>
                      <option>Grade 8B</option>
                    </select>
                  </div>
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg" rows={3} placeholder="Enter bill description"></textarea>
                  </div>
                  <div className="lg:col-span-3">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                      Create Bill & Assign to Students
                    </button>
                  </div>
                </div>
              </div>

              {/* Existing Bills */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h4 className="text-lg font-medium text-gray-900">Active Bills</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bill Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bills.map((bill) => (
                        <tr key={bill.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{bill.title}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${bill.amount.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bill.class}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bill.dueDate}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bill.type}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              bill.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {bill.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "arrears" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Arrears Management</h3>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700">
                    <AlertCircle className="h-4 w-4" />
                    Send Arrears Reminders
                  </button>
                  <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    <Download className="h-4 w-4" />
                    Export Arrears Report
                  </button>
                </div>
              </div>

              {/* Arrears Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Arrears</p>
                      <p className="text-2xl font-bold text-red-600">$3,800</p>
                      <p className="text-xs text-gray-500">Across {studentArrears.length} students</p>
                    </div>
                    <div className="flex-shrink-0 bg-red-100 rounded-lg p-3">
                      <AlertCircle className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Overdue Payments</p>
                      <p className="text-2xl font-bold text-orange-600">$2,100</p>
                      <p className="text-xs text-gray-500">Due this week</p>
                    </div>
                    <div className="flex-shrink-0 bg-orange-100 rounded-lg p-3">
                      <Clock className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Partial Payments</p>
                      <p className="text-2xl font-bold text-yellow-600">$1,700</p>
                      <p className="text-xs text-gray-500">Awaiting completion</p>
                    </div>
                    <div className="flex-shrink-0 bg-yellow-100 rounded-lg p-3">
                      <DollarSign className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Student Arrears List */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h4 className="text-lg font-medium text-gray-900">Student Arrears Details</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Previous Balance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Term</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Due</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {studentArrears.map((arrears) => (
                        <tr key={arrears.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{arrears.student}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{arrears.class}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${arrears.previousBalance.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${arrears.currentTerm.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">${arrears.totalDue.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">${arrears.paid.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-red-600">${arrears.balance.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900 mr-3">
                              <Mail className="h-4 w-4" />
                            </button>
                            <button className="text-orange-600 hover:text-orange-900">
                              <Phone className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "payments" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Fee Payments</h3>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  <Plus className="h-4 w-4" />
                  Record Payment
                </button>
              </div>

              {/* Payment Form with Arrears Integration */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-md font-medium text-gray-700 mb-4">Record New Payment</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>Select Student</option>
                      <option>Ama Mensah - Grade 7A (Arrears: $1,200)</option>
                      <option>Kofi Asante - Grade 7B (Arrears: $200)</option>
                      <option>Yaa Boateng - Grade 8A (Arrears: $1,400)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Amount</label>
                    <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Enter amount" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>Bank Transfer</option>
                      <option>Mobile Money</option>
                      <option>Cash</option>
                      <option>Cheque</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
                    <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Transaction reference" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Arrears Handling</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>Apply to Oldest Arrears First</option>
                      <option>Apply to Current Term Only</option>
                      <option>Apply to Specific Bill</option>
                      <option>Split Payment</option>
                    </select>
                  </div>
                  <div className="lg:col-span-3">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-blue-600" />
                        <p className="text-sm text-blue-800">
                          <strong>Arrears Auto-Calculation:</strong> System will automatically calculate and apply payments to outstanding arrears based on selected preference.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-3">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                      Record Payment & Generate Receipt
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Payments with Arrears Info */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h4 className="text-lg font-medium text-gray-900">Recent Payments</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Arrears Cleared</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentPayments.map((payment) => (
                        <tr key={payment.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.student}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.class}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${payment.amount.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.method}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">${payment.arrearsCleared.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              payment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {payment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.receipt}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <FileText className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "vouchers" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Payment Vouchers</h3>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  <Plus className="h-4 w-4" />
                  Create Voucher
                </button>
              </div>

              {/* Voucher Creation Form */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-md font-medium text-gray-700 mb-4">Create Payment Voucher</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Voucher Number</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Auto-generated" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                    <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Enter amount" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Purpose of payment" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payee Name</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Payee name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Approved By</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>Admin</option>
                      <option>Principal</option>
                      <option>Accountant</option>
                    </select>
                  </div>
                  <div className="lg:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg" rows={3} placeholder="Detailed description"></textarea>
                  </div>
                  <div className="lg:col-span-3">
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-orange-600" />
                        <p className="text-sm text-orange-800">
                          <strong>Note:</strong> This voucher will automatically reflect in the expenses column of the accounting tab.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-3">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                      Create Voucher
                    </button>
                  </div>
                </div>
              </div>

              {/* Vouchers List */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h4 className="text-lg font-medium text-gray-900">Recent Vouchers</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Voucher No</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approved By</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {paymentVouchers.map((voucher) => (
                        <tr key={voucher.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{voucher.voucherNo}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${voucher.amount.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{voucher.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{voucher.purpose}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{voucher.approvedBy}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              voucher.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {voucher.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <FileText className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "accounting" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Accounting Overview</h3>
              
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h4 className="text-md font-medium text-gray-700 mb-4">Daily Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Income:</span>
                      <span className="text-sm font-bold text-green-600">${accountingData.daily.income.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Expenses:</span>
                      <span className="text-sm font-bold text-red-600">${accountingData.daily.expenses.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-sm font-medium text-gray-900">Balance:</span>
                      <span className="text-sm font-bold text-blue-600">${accountingData.daily.balance.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h4 className="text-md font-medium text-gray-700 mb-4">Weekly Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Income:</span>
                      <span className="text-sm font-bold text-green-600">${accountingData.weekly.income.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Expenses:</span>
                      <span className="text-sm font-bold text-red-600">${accountingData.weekly.expenses.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-sm font-medium text-gray-900">Balance:</span>
                      <span className="text-sm font-bold text-blue-600">${accountingData.weekly.balance.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h4 className="text-md font-medium text-gray-700 mb-4">Monthly Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Income:</span>
                      <span className="text-sm font-bold text-green-600">${accountingData.monthly.income.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Expenses:</span>
                      <span className="text-sm font-bold text-red-600">${accountingData.monthly.expenses.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-sm font-medium text-gray-900">Balance:</span>
                      <span className="text-sm font-bold text-blue-600">${accountingData.monthly.balance.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transaction Details */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h4 className="text-lg font-medium text-gray-900">Recent Transactions</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-03-15</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Fee Payment - Ama Mensah</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Income
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+$1,500</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$25,000</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-03-15</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Office Supplies</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Expense
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">-$500</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$23,500</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "receipts" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Fee Receipts</h3>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                    <Search className="h-4 w-4" />
                    Search
                  </button>
                  <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    <Download className="h-4 w-4" />
                    Export
                  </button>
                </div>
              </div>

              {/* Receipt Preview */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="border-2 border-gray-200 rounded-lg p-8">
                  <div className="text-center mb-6">
                    <h4 className="text-xl font-bold text-gray-900">ADJIS FEE RECEIPT</h4>
                    <p className="text-sm text-gray-600">Adorable Babies & Josemaria International School</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-600">Receipt No:</p>
                      <p className="font-medium">RCP-2024-001</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date:</p>
                      <p className="font-medium">March 15, 2024</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Student Name:</p>
                      <p className="font-medium">Ama Mensah</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Class:</p>
                      <p className="font-medium">Grade 7A</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Description</th>
                          <th className="text-right py-2">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2">Tuition Fees - Term 2</td>
                          <td className="text-right">$1,500.00</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Arrears Cleared</td>
                          <td className="text-right">$300.00</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Registration Fees</td>
                          <td className="text-right">$0.00</td>
                        </tr>
                        <tr className="font-bold">
                          <td className="py-2">Total</td>
                          <td className="text-right">$1,800.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Payment Method: Bank Transfer</p>
                    <p className="text-sm text-gray-600">Transaction ID: TXN-123456789</p>
                  </div>
                </div>

                <div className="flex justify-center gap-4 mt-6">
                  <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    <FileText className="h-4 w-4" />
                    Print Receipt
                  </button>
                  <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    <FileText className="h-4 w-4" />
                    Print Duplicate
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
