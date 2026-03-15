'use client';

import { useState } from 'react';
import { DollarSign, Users, UserPlus, FileText, Download, Plus, Edit, Trash2, Search, Filter, Calendar, Mail, Phone, Eye, EyeOff, Calculator } from 'lucide-react';

export default function FeeManagement() {
  const [activeTab, setActiveTab] = useState("payments");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const recentPayments = [
    { id: 1, student: "Ama Mensah", class: "Grade 7A", amount: 1500, date: "2024-03-15", method: "Bank Transfer", status: "completed", receipt: "RCP-2024-001" },
    { id: 2, student: "Kofi Asante", class: "Grade 7B", amount: 1500, date: "2024-03-15", method: "Mobile Money", status: "completed", receipt: "RCP-2024-002" },
    { id: 3, student: "Yaa Boateng", class: "Grade 8A", amount: 1600, date: "2024-03-14", method: "Cash", status: "completed", receipt: "RCP-2024-003" },
    { id: 4, student: "Kwame Osei", class: "Grade 8B", amount: 800, date: "2024-03-14", method: "Bank Transfer", status: "partial", receipt: "RCP-2024-004" },
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
    // Simulate sending credentials
    console.log(`Sending credentials to ${email} and ${phone} for ${userType}`);
    alert(`Credentials sent to ${email} and ${phone}\nPassword: ${password}`);
  };

  return (
    <div className="p-6">
      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {[
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
          {activeTab === "payments" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Fee Payments</h3>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  <Plus className="h-4 w-4" />
                  Record Payment
                </button>
              </div>

              {/* Payment Form */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-md font-medium text-gray-700 mb-4">Record New Payment</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>Select Student</option>
                      <option>Ama Mensah - Grade 7A</option>
                      <option>Kofi Asante - Grade 7B</option>
                      <option>Yaa Boateng - Grade 8A</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>Tuition Fees</option>
                      <option>Registration Fees</option>
                      <option>Examination Fees</option>
                      <option>Extra Classes</option>
                    </select>
                  </div>
                  <div className="lg:col-span-3">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                      Record Payment & Generate Receipt
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Payments */}
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
                          <td className="py-2">Registration Fees</td>
                          <td className="text-right">$0.00</td>
                        </tr>
                        <tr className="font-bold">
                          <td className="py-2">Total</td>
                          <td className="text-right">$1,500.00</td>
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
