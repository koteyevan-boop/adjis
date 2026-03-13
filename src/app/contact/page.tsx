'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Send, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <PageLayout title="Contact Us - ADJIS">
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-gis-green to-gis-green-dark text-white">
          <div className="absolute inset-0">
            <Image
              src="/images/hero.jpg"
              alt="Contact ADJIS"
              fill
              className="object-cover opacity-20"
            />
          </div>
          <div className="relative container mx-auto px-4 py-16">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
              <p className="text-xl text-white/90 max-w-2xl">
                Get in touch with Adorable Babies & Josemaria International School. We're here to answer your questions and help you learn more about our educational community.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form and Map */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gis-green focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gis-green focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gis-green focus:border-transparent"
                      placeholder="+233 XXX XXX XXX"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gis-green focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="admissions">Admissions Inquiry</option>
                      <option value="academic">Academic Information</option>
                      <option value="fees">Fee Information</option>
                      <option value="general">General Inquiry</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gis-green focus:border-transparent"
                      placeholder="Type your message here..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gis-green text-white px-6 py-3 rounded-lg font-medium hover:bg-gis-green-dark transition-colors flex items-center justify-center"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </button>
                </form>
              </div>

              {/* Map */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Find Us</h2>
                <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.8038422383!2d-0.0730168!3d5.6431319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf876707c041db%3A0xca6a3e13395b71af!2sJosemaria%20International%20School!5e0!3m2!1sen!2sgh!4v1678901234567!5m2!1sen!2sgh"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 w-full h-full"
                    title="Josemaria International School Location"
                  />
                </div>
                
                {/* Quick Links */}
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Links</h3>
                  <div className="space-y-2">
                    <Link href="/admissions" className="block text-gis-green hover:text-gis-green-dark transition-colors">
                      → Admissions Information
                    </Link>
                    <Link href="/about" className="block text-gis-green hover:text-gis-green-dark transition-colors">
                      → About ADJIS
                    </Link>
                    <Link href="/academics" className="block text-gis-green hover:text-gis-green-dark transition-colors">
                      → Academic Programs
                    </Link>
                    <Link href="/life" className="block text-gis-green hover:text-gis-green-dark transition-colors">
                      → Life In ADJIS
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {/* Address */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="w-6 h-6 text-gis-green mr-3" />
                  <h3 className="text-xl font-bold text-gray-800">Address</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Josemaria International School<br />
                  Impaka Ln Comm. 17 Annex<br />
                  Lashibi<br />
                  Ghana
                </p>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Phone className="w-6 h-6 text-gis-green mr-3" />
                  <h3 className="text-xl font-bold text-gray-800">Contact Info</h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  <p className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    +233 245 894 229
                  </p>
                  <p className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    +233 244 330 890
                  </p>
                  <p className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    <Link href="mailto:admission@josemariaschoolgh.org" className="text-gis-green hover:text-gis-green-dark transition-colors">
                      admission@josemariaschoolgh.org
                    </Link>
                  </p>
                  <p className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    <Link href="mailto:info@josemariaschoolgh.org" className="text-gis-green hover:text-gis-green-dark transition-colors">
                      info@josemariaschoolgh.org
                    </Link>
                  </p>
                </div>
              </div>

              {/* School Hours */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 text-gis-green mr-3" />
                  <h3 className="text-xl font-bold text-gray-800">School Hours</h3>
                </div>
                <div className="text-gray-600">
                  <p className="font-medium mb-2">Monday - Friday</p>
                  <p>8:00 AM - 3:30 PM</p>
                  <p className="font-medium mt-3 mb-2">Weekends</p>
                  <p>Closed</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media */}
        <section className="py-12 bg-gis-green text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Follow us on social media to stay updated with the latest news and events at ADJIS.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="#" className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors" aria-label="Facebook">
                <Facebook className="w-6 h-6" />
              </Link>
              <Link href="#" className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors" aria-label="Instagram">
                <Instagram className="w-6 h-6" />
              </Link>
              <Link href="#" className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-6 h-6" />
              </Link>
              <Link href="#" className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors" aria-label="YouTube">
                <Youtube className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
