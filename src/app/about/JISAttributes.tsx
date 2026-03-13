"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Attribute {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  color: string;
}

export default function JISAttributes() {
  const [selectedAttribute, setSelectedAttribute] = useState<string | null>(null);

  const attributes: Attribute[] = [
    {
      id: "think-critically",
      title: "THINK CRITICALLY",
      description: "At Adorable Babies & Josemaria International School, we cultivate analytical minds that question, analyze, and evaluate information from multiple perspectives. Our students develop the ability to think independently, solve complex problems systematically, and make informed decisions based on evidence and logical reasoning. This essential skill prepares them for academic excellence and real-world challenges.",
      image: "/images/stu.jpg",
      icon: "🧠",
      color: "bg-blue-500"
    },
    {
      id: "socially-responsible",
      title: "BE SOCIALLY RESPONSIBLE",
      description: "We nurture compassionate global citizens who understand their role in creating positive change. ADJIS students demonstrate empathy, respect diversity, and actively contribute to their communities. Through service projects, environmental initiatives, and character development programs, they learn the importance of ethical leadership and social justice in today's interconnected world.",
      image: "/images/students-bg.jpg",
      icon: "🤝",
      color: "bg-green-500"
    },
    {
      id: "disciplined",
      title: "BE DISCIPLINED",
      description: "Discipline at ADJIS goes beyond rules – it's about self-mastery, time management, and consistent habits that lead to success. Our students develop strong organizational skills, set meaningful goals, and demonstrate the commitment needed to achieve them. This foundation of discipline creates resilient learners who thrive in academic and personal pursuits.",
      image: "/images/stu.jpg",
      icon: "🎯",
      color: "bg-purple-500"
    },
    {
      id: "creative",
      title: "DISPLAY CREATIVITY",
      description: "Creativity flourishes in our supportive environment where students are encouraged to think outside the box and express their unique perspectives. ADJIS students learn to approach challenges with innovative solutions, adapt to new situations flexibly, and communicate their ideas through various artistic and technological mediums. Creativity here is not just about art – it's a mindset that enhances all areas of learning.",
      image: "/images/students-bg.jpg",
      icon: "🎨",
      color: "bg-orange-500"
    },
    {
      id: "communicate",
      title: "COMMUNICATE EFFECTIVELY",
      description: "Effective communication is the cornerstone of success in the modern world. At ADJIS, students develop confidence in expressing their ideas clearly, listening actively to others, and engaging in meaningful dialogue. They master verbal, written, and digital communication skills, enabling them to collaborate effectively, present persuasively, and build strong relationships across diverse audiences.",
      image: "/images/stu.jpg",
      icon: "💬",
      color: "bg-teal-500"
    },
    {
      id: "internationally-minded",
      title: "BE INTERNATIONALLY MINDED",
      description: "In our globally connected world, ADJIS students embrace cultural diversity with curiosity and respect. They develop a deep understanding of different perspectives, celebrate cultural differences, and recognize their role as global citizens. Through international curricula, exchange programs, and multicultural experiences, they gain the cultural intelligence needed to thrive in an interconnected global community.",
      image: "/images/students-bg.jpg",
      icon: "🌍",
      color: "bg-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="ADJIS 6 Attributes - Adorable Babies & Josemaria International School"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-900/60" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">ADJIS 6 Attributes</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            The core values that define our students at Adorable Babies & Josemaria International School
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Core Attributes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              At Adorable Babies & Josemaria International School, we cultivate these six essential attributes 
              in our students to prepare them for success in an ever-changing world.
            </p>
          </div>
        </div>
      </section>

      {/* Attributes Grid - First Row */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {attributes.slice(0, 3).map((attribute, index) => (
              <div
                key={attribute.id}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-64">
                  <Image
                    src={attribute.image}
                    alt={attribute.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 ${attribute.color} opacity-0 group-hover:opacity-80 transition-opacity duration-300`}></div>
                  <div className="absolute top-4 right-4 w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-lg">
                    {attribute.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {attribute.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {attribute.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Attributes Grid - Second Row */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {attributes.slice(3, 6).map((attribute, index) => (
              <div
                key={attribute.id}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-64">
                  <Image
                    src={attribute.image}
                    alt={attribute.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 ${attribute.color} opacity-0 group-hover:opacity-80 transition-opacity duration-300`}></div>
                  <div className="absolute top-4 right-4 w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-lg">
                    {attribute.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {attribute.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {attribute.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Attribute Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Developing Well-Rounded Individuals
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each attribute is carefully integrated into our curriculum and school culture
            </p>
          </div>

          <div className="space-y-8">
            {attributes.map((attribute, index) => (
              <div
                key={attribute.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="relative">
                  <div className={`absolute inset-0 ${attribute.color} opacity-10 rounded-2xl`}></div>
                  <div className="relative p-8">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl shadow-xl mb-6">
                      {attribute.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">
                      {attribute.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {attribute.description}
                    </p>
                  </div>
                </div>
                <div className="relative h-80 lg:h-96">
                  <Image
                    src={attribute.image}
                    alt={attribute.title}
                    fill
                    className="object-cover rounded-2xl shadow-xl"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Join the ADJIS Community
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-blue-100">
            Discover how Adorable Babies & Josemaria International School nurtures these attributes in every student,
            preparing them for a future of excellence and global citizenship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admissions"
              className="inline-block bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">School Hours</h4>
              <p className="text-gray-300">M-F: 8am – 3:30pm</p>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4">Address</h4>
              <div className="text-gray-300 space-y-1">
                <p>Adorable Babies & Josemaria International School</p>
                <p>2nd Circular Road, Cantonments</p>
                <p>P.O.Box GP 2856</p>
                <p>Accra, Ghana</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4">Contact</h4>
              <div className="text-gray-300 space-y-1">
                <p><a href="mailto:prinoffice@jis.edu.gh" className="hover:text-blue-400">prinoffice@jis.edu.gh</a></p>
                <p>+233 (0)30 397 9198</p>
                <p>+233 (0)30 277 3299</p>
                <p>+233 (0)30 277 5143</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://facebook.com/josemariainternationalschool" className="text-gray-300 hover:text-blue-400">
                  Facebook
                </a>
                <a href="https://twitter.com/josemariaintsch" className="text-gray-300 hover:text-blue-400">
                  Twitter
                </a>
                <a href="https://instagram.com/josemariainternationalschool" className="text-gray-300 hover:text-blue-400">
                  Instagram
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Adorable Babies & Josemaria International School. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
