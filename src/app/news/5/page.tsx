'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Share2, Heart, BookOpen } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

export default function CambridgeProgramNewsPage() {
  return (
    <PageLayout title="New Cambridge Program Launch - ADJIS" hideHero>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white h-[400px]">
          <div className="absolute inset-0">
            <Image
              src="/images/hero.jpg"
              alt="Cambridge Program Launch"
              fill
              className="object-cover opacity-20"
            />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
            <div className="text-center max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">New Cambridge Program Launch</h1>
              <div className="flex items-center justify-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>February 20, 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>Academic Office</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Back Navigation */}
        <div className="container mx-auto px-4 py-6">
          <Link 
            href="/news" 
            className="inline-flex items-center text-gis-green hover:text-gis-green-dark font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to News & Updates
          </Link>
        </div>

        {/* Article Content */}
        <article className="container mx-auto px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
              <Image
                src="/images/hero.jpg"
                alt="Cambridge Program Launch Event"
                fill
                className="object-cover"
              />
            </div>

            {/* Article Meta */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b">
              <div className="flex items-center gap-6">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Academics
                </span>
                <span className="text-gray-500">Educational Innovation</span>
              </div>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-gray-600 hover:text-gis-green transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
                  <Heart className="w-4 h-4" />
                  Like
                </button>
              </div>
            </div>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                ADJIS introduces enhanced Cambridge International Curriculum with advanced STEM focus, providing our students with cutting-edge educational opportunities for global success.
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">Elevating Academic Excellence</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                We are proud to announce the launch of our enhanced Cambridge International Curriculum, designed to prepare students for the challenges and opportunities of the 21st century. This comprehensive program combines academic rigor with practical skills development.
              </p>

              {/* Program Features Images */}
              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="relative h-[250px] rounded-lg overflow-hidden">
                  <Image
                    src="/images/hero.jpg"
                    alt="Science Laboratory"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-[250px] rounded-lg overflow-hidden">
                  <Image
                    src="/images/hero.jpg"
                    alt="Technology Classroom"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-[250px] rounded-lg overflow-hidden">
                  <Image
                    src="/images/hero.jpg"
                    alt="Engineering Workshop"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Key Program Features</h3>
              <div className="space-y-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-800 mb-2">Advanced STEM Curriculum</h4>
                  <p className="text-gray-600">Enhanced focus on Science, Technology, Engineering, and Mathematics with hands-on learning experiences and industry partnerships.</p>
                </div>
                <div className="bg-cyan-50 p-4 rounded-lg">
                  <h4 className="font-bold text-cyan-800 mb-2">Global Perspective</h4>
                  <p className="text-gray-600">International curriculum that prepares students for global universities and careers, with emphasis on cross-cultural understanding.</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-bold text-indigo-800 mb-2">Personalized Learning</h4>
                  <p className="text-gray-600">Tailored educational pathways that recognize individual strengths and learning styles, ensuring every student reaches their full potential.</p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">STEM Innovation Lab</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our new STEM Innovation Lab provides students with state-of-the-art facilities for hands-on learning in robotics, coding, engineering, and scientific research. This dedicated space fosters creativity and problem-solving skills.
              </p>

              {/* STEM Lab Gallery */}
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                  <Image
                    src="/images/hero.jpg"
                    alt="Robotics Lab"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                  <Image
                    src="/images/hero.jpg"
                    alt="Science Research"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">University Preparation</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                The enhanced curriculum includes comprehensive university preparation programs, ensuring our students are well-prepared for admission to top universities worldwide, including Cambridge, Oxford, Ivy League institutions, and more.
              </p>

              {/* University Partners */}
              <div className="bg-gray-100 rounded-xl p-8 my-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">University Pathways</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-white p-4 rounded-lg">
                    <div className="relative w-16 h-16 mx-auto mb-2">
                      <Image
                        src="/images/yh.png"
                        alt="University Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-sm font-semibold">Cambridge</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="relative w-16 h-16 mx-auto mb-2">
                      <Image
                        src="/images/yh.png"
                        alt="University Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-sm font-semibold">Oxford</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="relative w-16 h-16 mx-auto mb-2">
                      <Image
                        src="/images/yh.png"
                        alt="University Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-sm font-semibold">Harvard</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="relative w-16 h-16 mx-auto mb-2">
                      <Image
                        src="/images/yh.png"
                        alt="University Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-sm font-semibold">Stanford</p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">Teacher Training and Development</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our teachers have undergone extensive training to deliver the enhanced curriculum effectively. Continuous professional development ensures they remain at the forefront of educational best practices.
              </p>

              <blockquote className="border-l-4 border-blue-600 pl-6 my-8 italic text-gray-600">
                "This enhanced Cambridge program represents our commitment to providing world-class education that prepares students not just for exams, but for life."
              </blockquote>

              <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">Enrollment Information</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                The new Cambridge program is available for students from Early Years through Advanced Level. Parents interested in learning more about the enhanced curriculum are invited to schedule a consultation with our academic advisors.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-6">
                <h4 className="font-bold text-blue-800 mb-2">Program Highlights:</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Cambridge International Early Years, Primary & Secondary</li>
                  <li>IGCSE and Advanced Level preparation</li>
                  <li>Enhanced STEM focus with robotics and coding</li>
                  <li>Global citizenship and leadership development</li>
                  <li>Individualized learning pathways</li>
                </ul>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">
                Join us as we embark on this exciting educational journey, providing our students with the knowledge, skills, and confidence to succeed in an increasingly competitive global landscape.
              </p>
            </div>

            {/* Call to Action */}
            <div className="bg-blue-600 text-white rounded-xl p-8 mt-12 text-center">
              <h3 className="text-2xl font-bold mb-4">Learn More About Our Programs</h3>
              <p className="text-lg mb-6">Discover how our enhanced Cambridge curriculum can benefit your child's education.</p>
              <Link 
                href="/admissions" 
                className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </article>
      </div>
    </PageLayout>
  );
}
