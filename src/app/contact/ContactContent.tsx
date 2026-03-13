"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface ContactInfo {
  title: string;
  content: string[];
}

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [openAccordion, setOpenAccordion] = useState<string | null>("faq1");
  const [openToggle, setOpenToggle] = useState<string | null>(null);

  const faqItems: FAQItem[] = [
    {
      id: "faq1",
      question: "Does the administration work on weekends?",
      answer: "No. Although we do not work on weekends, we are available via email to address all your concerns."
    },
    {
      id: "faq2",
      question: "What time does your school day begin and what time does it end?",
      answer: "The school day begins at 7.45am and ends at 2.00pm for Infant school students, 2.40pm for Junior school on Mondays, Tuesdays, Thursdays and Fridays and 2.00pm on Wednesdays. The Secondary School students finish at 3.00pm."
    },
    {
      id: "faq3",
      question: "How big are your class sizes?",
      answer: "Class sizes are restricted to no more than 28 in a class. In the Primary Section, each class has a dedicated, qualified teacher and full time teaching assistant. In the Secondary School, form tutors are assigned to each class. Each department also has at least one dedicated full time teaching assistant."
    }
  ];

  const contactInfo: ContactInfo[] = [
    {
      title: "Connect with us",
      content: [
        "Adorable Babies & Josemaria International School",
        "2nd Circular Road, Cantonments",
        "P.O.Box GP 2856",
        "Accra, Ghana.",
        "Tel: +233 (0) 302 777163/ 773299 / 775143",
        "Tel: +233 (0) 303 979198/ 979588 / 979589",
        "Principal's Office: prinoffice@jis.edu.gh",
        "School/Alumni Relations: alumni@jis.edu.gh"
      ]
    },
    {
      title: "Directory - Direct Phone Lines",
      content: [
        "Reception: 030 397 9198",
        "Infant School VP: 030 397 9524",
        "Junior School VP: 030 397 9525",
        "Lower Secondary VP: 030 397 9526",
        "Upper Secondary VP: 030 397 9527",
        "Finance Manager: 030 397 9528",
        "Security Manager: 030 397 9529",
        "IT Systems Manager: 030 397 9530",
        "Admissions: 050 152 9531"
      ]
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", message: "" });
    alert("Thank you for your message. We will get back to you soon!");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt="Contact Adorable Babies & Josemaria International School"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-white/80">Get in Touch</p>
        </div>
      </section>

      {/* Contact Form and Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-center mb-8">
                <h5 className="text-green-600 font-semibold mb-2">Email</h5>
                <h2 className="text-3xl font-bold text-gray-800">Send a Message</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Email Address"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Message"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Submit
                </button>
              </form>
            </div>

            {/* Map */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full min-h-[400px]">
              <div className="w-full h-full relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.7399776097!2d-0.1767963!3d5.5805334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9b2b3c3c3c3c%3A0x0!2zNcKwMzQnNDguNCJOIDDCsDAnMjAuNyJF!5e0!3m2!1d5.5805334!2d-0.1767963!4f13.1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Toggles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md">
                <button
                  onClick={() => setOpenToggle(openToggle === `toggle-${index}` ? null : `toggle-${index}`)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-xl font-semibold text-gray-800">{info.title}</h3>
                  <span className="text-2xl text-green-600">
                    {openToggle === `toggle-${index}` ? "−" : "+"}
                  </span>
                </button>
                {openToggle === `toggle-${index}` && (
                  <div className="p-6 pt-0">
                    <div className="space-y-2">
                      {info.content.map((line, lineIndex) => (
                        <p key={lineIndex} className="text-gray-600">
                          {line.includes(":") ? (
                            <>
                              <strong>{line.split(":")[0]}:</strong> {line.split(":")[1]}
                            </>
                          ) : (
                            line
                          )}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* FAQ Header */}
            <div>
              <h5 className="text-green-600 font-semibold mb-2">FAQ</h5>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
              <Link
                href="/faqs"
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                MORE FAQs
              </Link>
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-4">
              {faqItems.map((faq) => (
                <div key={faq.id} className="bg-white rounded-lg shadow-md">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === faq.id ? null : faq.id)}
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                    <span className="text-2xl text-green-600">
                      {openAccordion === faq.id ? "−" : "+"}
                    </span>
                  </button>
                  {openAccordion === faq.id && (
                    <div className="p-6 pt-0">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Contact Information */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">SCHOOL HOURS</h4>
              <p className="text-gray-300">M-F: 8am – 3:30pm</p>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4">ADDRESS</h4>
              <div className="text-gray-300 space-y-1">
                <p>Adorable Babies & Josemaria International School</p>
                <p>2nd Circular Road, Cantonments</p>
                <p>P.O.Box GP 2856</p>
                <p>Accra, Ghana</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4">EMAIL & NUMBER</h4>
              <div className="text-gray-300 space-y-1">
                <p><a href="mailto:prinoffice@jis.edu.gh" className="hover:text-green-400">prinoffice@jis.edu.gh</a></p>
                <p>+233 (0)30 397 9198</p>
                <p>+233 (0)30 277 3299</p>
                <p>+233 (0)30 277 5143</p>
                <p>+233 (0)30 397 9588</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4">FOLLOW US</h4>
              <div className="flex space-x-4">
                <a href="https://facebook.com/josemariainternationalschool" className="text-gray-300 hover:text-green-400">
                  Facebook
                </a>
                <a href="https://twitter.com/josemariaintsch" className="text-gray-300 hover:text-green-400">
                  Twitter
                </a>
                <a href="https://instagram.com/josemariainternationalschool" className="text-gray-300 hover:text-green-400">
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
