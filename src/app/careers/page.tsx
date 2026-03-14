'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Briefcase, Users, Award, Clock, MapPin, Upload, Send } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

export default function CareersPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    class: '',
    employmentMode: '',
    coverLetter: '',
    cv: null as File | null,
    certificates: null as File | null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const departments = [
    'Academic',
    'Administration',
    'Finance',
    'Human Resources',
    'IT Support',
    'Maintenance',
    'Security',
    'Library',
    'Sports',
    'Arts & Music'
  ];

  const classes = [
    'Early Years (Ages 2-5)',
    'Primary (Grades 1-6)',
    'Junior Secondary (Grades 7-9)',
    'Senior Secondary (Grades 10-12)',
    'Administration',
    'Support Staff'
  ];

  const subjects = [
    'Mathematics',
    'English Language',
    'Science',
    'Social Studies',
    'French',
    'ICT',
    'Physical Education',
    'Arts & Music',
    'Business Studies',
    'Economics',
    'Geography',
    'History',
    'Biology',
    'Chemistry',
    'Physics',
    'Other'
  ];

  const employmentModes = [
    'Casual',
    'Part-time',
    'Permanent',
    'Attachment',
    'National Service'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Application submitted successfully! We will contact you soon.');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      position: '',
      department: '',
      class: '',
      employmentMode: '',
      coverLetter: '',
      cv: null,
      certificates: null,
    });
    setIsSubmitting(false);
  };

  return (
    <PageLayout title="Careers at ADJIS" hideHero>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative h-64 md:h-80">
          <Image
            src="/images/hero.jpg"
            alt="Careers at ADJIS"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/75 to-purple-800/75" />
          <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Careers at ADJIS</h1>
              <p className="text-xl text-white/90">Join our team of dedicated educators and professionals</p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Work at ADJIS?</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    At Adorable Babies & Josemaria International School, we believe that our greatest asset is our people. 
                    We are committed to creating a supportive, collaborative, and dynamic work environment where every 
                    team member can thrive and make a meaningful impact on the lives of our students.
                  </p>
                  <p>
                    Since our establishment in 2010, we have built a reputation for educational excellence and innovation. 
                    Our blended curriculum approach combines the best of GES, Montessori, and Cambridge systems, providing 
                    our staff with unique opportunities for professional growth and development.
                  </p>
                  <p>
                    Whether you are an experienced educator, an administrative professional, or just starting your career, 
                    ADJIS offers a range of exciting opportunities to contribute to our mission of providing exceptional 
                    education to the next generation of leaders.
                  </p>
                </div>
              </div>

              {/* Benefits Cards */}
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <Award className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Professional Development</h3>
                  <p className="text-gray-600">
                    Continuous training opportunities, workshops, and career advancement programs
                  </p>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Supportive Community</h3>
                  <p className="text-gray-600">
                    Collaborative work environment with dedicated and passionate colleagues
                  </p>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Briefcase className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Competitive Benefits</h3>
                  <p className="text-gray-600">
                    Attractive salary packages, health benefits, and work-life balance initiatives
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Join Our Team</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="bg-gray-50 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Position Details */}
                <div className="bg-gray-50 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Position Details</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Position/Subject *</label>
                      <select
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Select a position/subject</option>
                        {subjects.map(subject => (
                          <option key={subject} value={subject}>{subject}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Select a department</option>
                        {departments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Class/Level *</label>
                      <select
                        name="class"
                        value={formData.class}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Select a class/level</option>
                        {classes.map(cls => (
                          <option key={cls} value={cls}>{cls}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mode of Employment *</label>
                      <select
                        name="employmentMode"
                        value={formData.employmentMode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Select employment mode</option>
                        {employmentModes.map(mode => (
                          <option key={mode} value={mode}>{mode}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Cover Letter */}
                <div className="bg-gray-50 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Cover Letter</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tell us why you want to join ADJIS *</label>
                    <textarea
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Please describe your qualifications, experience, and why you are interested in working at ADJIS..."
                    />
                  </div>
                </div>

                {/* Document Uploads */}
                <div className="bg-gray-50 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Document Uploads</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CV/Resume *</label>
                      <div className="relative">
                        <input
                          type="file"
                          name="cv"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                        />
                        <Upload className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">PDF, DOC, or DOCX (Max 5MB)</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Certificates</label>
                      <div className="relative">
                        <input
                          type="file"
                          name="certificates"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                        />
                        <Upload className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">PDF, DOC, DOCX, JPG, or PNG (Max 10MB)</p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Submit Application
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Current Openings */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Current Opportunities</h2>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="space-y-6">
                  <div className="border-l-4 border-purple-600 pl-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Mathematics Teacher - Senior Secondary</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        Accra Campus
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Full-time
                      </span>
                    </div>
                    <p className="text-gray-600">We are seeking an experienced Mathematics teacher to join our Senior Secondary team.</p>
                  </div>
                  
                  <div className="border-l-4 border-blue-600 pl-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Early Years Teacher</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        Accra Campus
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Full-time
                      </span>
                    </div>
                    <p className="text-gray-600">Looking for a passionate Early Years educator with Montessori experience.</p>
                  </div>
                  
                  <div className="border-l-4 border-green-600 pl-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">School Administrator</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        Accra Campus
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Full-time
                      </span>
                    </div>
                    <p className="text-gray-600">We need an organized administrator to support our school operations.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
