'use client';

import { useState } from 'react';
import { Users, UserPlus, Edit, Trash2, Mail, Phone, Eye, EyeOff, Key, RefreshCw, Search, Filter, Download, Upload } from 'lucide-react';

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState("students");
  const [showPassword, setShowPassword] = useState<{[key: number]: boolean}>({});
  const [selectedUser, setSelectedUser] = useState(null);

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const sendCredentials = (email: string, phone: string, password: string, userType: string, name: string) => {
    // Simulate sending credentials
    const message = `Credentials sent successfully!\n\nUser: ${name}\nType: ${userType}\nEmail: ${email}\nPhone: ${phone}\nPassword: ${password}\n\nCredentials have been sent to both email and phone.`;
    alert(message);
  };

  const resetPassword = (userId: number, userType: string, email: string, phone: string, name: string) => {
    const newPassword = generatePassword();
    setShowPassword(prev => ({ ...prev, [userId]: true }));
    
    // Update password in state
    if (userType === 'student') {
      setStudents(prev => prev.map(student => 
        student.id === userId ? { ...student, password: newPassword } : student
      ));
    } else if (userType === 'teacher') {
      setTeachers(prev => prev.map(teacher => 
        teacher.id === userId ? { ...teacher, password: newPassword } : teacher
      ));
    } else if (userType === 'parent') {
      setParents(prev => prev.map(parent => 
        parent.id === userId ? { ...parent, password: newPassword } : parent
      ));
    }
    
    // Send credentials
    sendCredentials(email, phone, newPassword, userType, name);
  };

  const [students, setStudents] = useState([
    { id: 1, name: "Ama Mensah", email: "ama.mensah@email.com", phone: "+233241234567", class: "Grade 7A", password: "student123", status: "active" },
    { id: 2, name: "Kofi Asante", email: "kofi.asante@email.com", phone: "+233242345678", class: "Grade 7B", password: "student456", status: "active" },
    { id: 3, name: "Yaa Boateng", email: "yaa.boateng@email.com", phone: "+233243456789", class: "Grade 8A", password: "student789", status: "inactive" },
  ]);

  const [teachers, setTeachers] = useState([
    { id: 1, name: "Mr. Johnson", email: "johnson@adjis.edu.gh", phone: "+233201234567", subject: "Mathematics", password: "teacher123", status: "active" },
    { id: 2, name: "Ms. Smith", email: "smith@adjis.edu.gh", phone: "+233202345678", subject: "English", password: "teacher456", status: "active" },
  ]);

  const [parents, setParents] = useState([
    { id: 1, name: "Mr. Mensah", email: "mensah.parent@email.com", phone: "+233244567890", children: "Ama Mensah", password: "parent123", status: "active" },
    { id: 2, name: "Mrs. Asante", email: "asante.parent@email.com", phone: "+233245678901", children: "Kofi Asante", password: "parent456", status: "active" },
  ]);

  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    phone: "",
    class: "",
    password: "",
  });

  const [newTeacher, setNewTeacher] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    password: "",
  });

  const [newParent, setNewParent] = useState({
    name: "",
    email: "",
    phone: "",
    children: "",
    password: "",
  });

  const addStudent = () => {
    const password = generatePassword();
    const student = {
      id: students.length + 1,
      ...newStudent,
      password,
      status: "active"
    };
    
    setStudents([...students, student]);
    sendCredentials(newStudent.email, newStudent.phone, password, "Student", newStudent.name);
    
    // Reset form
    setNewStudent({ name: "", email: "", phone: "", class: "", password: "" });
  };

  const addTeacher = () => {
    const password = generatePassword();
    const teacher = {
      id: teachers.length + 1,
      ...newTeacher,
      password,
      status: "active"
    };
    
    setTeachers([...teachers, teacher]);
    sendCredentials(newTeacher.email, newTeacher.phone, password, "Teacher", newTeacher.name);
    
    // Reset form
    setNewTeacher({ name: "", email: "", phone: "", subject: "", password: "" });
  };

  const addParent = () => {
    const password = generatePassword();
    const parent = {
      id: parents.length + 1,
      ...newParent,
      password,
      status: "active"
    };
    
    setParents([...parents, parent]);
    sendCredentials(newParent.email, newParent.phone, password, "Parent", newParent.name);
    
    // Reset form
    setNewParent({ name: "", email: "", phone: "", children: "", password: "" });
  };

  return (
    <div className="p-6">
      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {[
              { id: "students", label: "Students", icon: Users },
              { id: "teachers", label: "Teachers", icon: Users },
              { id: "parents", label: "Parents", icon: Users },
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
          {activeTab === "students" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Student Management</h3>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                    <Upload className="h-4 w-4" />
                    Import
                  </button>
                  <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    <Download className="h-4 w-4" />
                    Export
                  </button>
                </div>
              </div>

              {/* Add Student Form */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-md font-medium text-gray-700 mb-4">Add New Student</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={newStudent.name}
                      onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Enter student's full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={newStudent.email}
                      onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={newStudent.phone}
                      onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                    <select
                      value={newStudent.class}
                      onChange={(e) => setNewStudent({...newStudent, class: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">Select Class</option>
                      <option>Grade 7A</option>
                      <option>Grade 7B</option>
                      <option>Grade 8A</option>
                      <option>Grade 8B</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password (Auto-generated)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newStudent.password || "Auto-generated"}
                        readOnly
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                      />
                      <button
                        onClick={() => setNewStudent({...newStudent, password: generatePassword()})}
                        className="p-2 text-blue-600 hover:text-blue-800"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="lg:col-span-3">
                    <button
                      onClick={addStudent}
                      disabled={!newStudent.name || !newStudent.email || !newStudent.phone || !newStudent.class}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add Student & Send Credentials
                    </button>
                  </div>
                </div>
              </div>

              {/* Students List */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h4 className="text-lg font-medium text-gray-900">Students List</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Password</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {students.map((student) => (
                        <tr key={student.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.phone}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.class}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <input
                                type={showPassword[student.id] ? "text" : "password"}
                                value={student.password}
                                readOnly
                                className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                              />
                              <button
                                onClick={() => setShowPassword(prev => ({ ...prev, [student.id]: !prev[student.id] }))}
                                className="text-gray-500 hover:text-gray-700"
                              >
                                {showPassword[student.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              student.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {student.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => resetPassword(student.id, "Student", student.email, student.phone, student.name)}
                              className="text-orange-600 hover:text-orange-900 mr-3"
                            >
                              <Key className="h-4 w-4" />
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

          {activeTab === "teachers" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Teacher Management</h3>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                    <Upload className="h-4 w-4" />
                    Import
                  </button>
                  <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    <Download className="h-4 w-4" />
                    Export
                  </button>
                </div>
              </div>

              {/* Add Teacher Form */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-md font-medium text-gray-700 mb-4">Add New Teacher</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={newTeacher.name}
                      onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Enter teacher's full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={newTeacher.email}
                      onChange={(e) => setNewTeacher({...newTeacher, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={newTeacher.phone}
                      onChange={(e) => setNewTeacher({...newTeacher, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <select
                      value={newTeacher.subject}
                      onChange={(e) => setNewTeacher({...newTeacher, subject: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">Select Subject</option>
                      <option>Mathematics</option>
                      <option>English</option>
                      <option>Science</option>
                      <option>Social Studies</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password (Auto-generated)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newTeacher.password || "Auto-generated"}
                        readOnly
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                      />
                      <button
                        onClick={() => setNewTeacher({...newTeacher, password: generatePassword()})}
                        className="p-2 text-blue-600 hover:text-blue-800"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="lg:col-span-3">
                    <button
                      onClick={addTeacher}
                      disabled={!newTeacher.name || !newTeacher.email || !newTeacher.phone || !newTeacher.subject}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add Teacher & Send Credentials
                    </button>
                  </div>
                </div>
              </div>

              {/* Teachers List */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h4 className="text-lg font-medium text-gray-900">Teachers List</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Password</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {teachers.map((teacher) => (
                        <tr key={teacher.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{teacher.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{teacher.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{teacher.phone}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{teacher.subject}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <input
                                type={showPassword[teacher.id] ? "text" : "password"}
                                value={teacher.password}
                                readOnly
                                className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                              />
                              <button
                                onClick={() => setShowPassword(prev => ({ ...prev, [teacher.id]: !prev[teacher.id] }))}
                                className="text-gray-500 hover:text-gray-700"
                              >
                                {showPassword[teacher.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              teacher.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {teacher.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => resetPassword(teacher.id, "Teacher", teacher.email, teacher.phone, teacher.name)}
                              className="text-orange-600 hover:text-orange-900 mr-3"
                            >
                              <Key className="h-4 w-4" />
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

          {activeTab === "parents" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Parent Management</h3>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                    <Upload className="h-4 w-4" />
                    Import
                  </button>
                  <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    <Download className="h-4 w-4" />
                    Export
                  </button>
                </div>
              </div>

              {/* Add Parent Form */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-md font-medium text-gray-700 mb-4">Add New Parent</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={newParent.name}
                      onChange={(e) => setNewParent({...newParent, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Enter parent's full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={newParent.email}
                      onChange={(e) => setNewParent({...newParent, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={newParent.phone}
                      onChange={(e) => setNewParent({...newParent, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Children</label>
                    <input
                      type="text"
                      value={newParent.children}
                      onChange={(e) => setNewParent({...newParent, children: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Enter children's names"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password (Auto-generated)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newParent.password || "Auto-generated"}
                        readOnly
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                      />
                      <button
                        onClick={() => setNewParent({...newParent, password: generatePassword()})}
                        className="p-2 text-blue-600 hover:text-blue-800"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="lg:col-span-3">
                    <button
                      onClick={addParent}
                      disabled={!newParent.name || !newParent.email || !newParent.phone || !newParent.children}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add Parent & Send Credentials
                    </button>
                  </div>
                </div>
              </div>

              {/* Parents List */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h4 className="text-lg font-medium text-gray-900">Parents List</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Children</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Password</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {parents.map((parent) => (
                        <tr key={parent.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{parent.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{parent.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{parent.phone}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{parent.children}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <input
                                type={showPassword[parent.id] ? "text" : "password"}
                                value={parent.password}
                                readOnly
                                className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                              />
                              <button
                                onClick={() => setShowPassword(prev => ({ ...prev, [parent.id]: !prev[parent.id] }))}
                                className="text-gray-500 hover:text-gray-700"
                              >
                                {showPassword[parent.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              parent.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {parent.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => resetPassword(parent.id, "Parent", parent.email, parent.phone, parent.name)}
                              className="text-orange-600 hover:text-orange-900 mr-3"
                            >
                              <Key className="h-4 w-4" />
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
        </div>
      </div>
    </div>
  );
}
