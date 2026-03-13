'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, BookOpen, GraduationCap, Award, Users, ChevronRight, Brain, Globe, Calculator, Palette } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

export default function AcademicsPage() {
  const departments = [
    {
      id: 'preschool',
      title: 'Pre-School',
      description: 'Nurturing young minds through play-based learning and foundational skill development in a safe, stimulating environment.',
      image: '/images/preschool.jpg',
      ageRange: '3-5 years',
      programs: ['Early Years Foundation Stage', 'Play-Based Learning', 'Social & Emotional Development'],
      highlights: ['Small class sizes', 'Experienced early childhood educators', 'Indoor & outdoor play areas'],
      icon: Brain
    },
    {
      id: 'primary',
      title: 'Primary School',
      description: 'Building strong academic foundations with the Cambridge Primary Curriculum while fostering creativity and critical thinking.',
      image: '/images/primary.jpg',
      ageRange: '6-11 years',
      programs: ['Cambridge Primary Curriculum', 'Literacy & Numeracy', 'Science & Technology'],
      highlights: ['Cambridge International accreditation', 'STEM integration', 'Arts & Sports programs'],
      icon: BookOpen
    },
    {
      id: 'lower-secondary',
      title: 'Lower Secondary',
      description: 'Preparing students for higher education with a comprehensive curriculum that balances academics with personal development.',
      image: '/images/lower-secondary.jpg',
      ageRange: '12-14 years',
      programs: ['Cambridge Lower Secondary', 'Subject Specialization', 'Project-Based Learning'],
      highlights: ['Subject specialist teachers', 'Advanced STEM labs', 'Leadership opportunities'],
      icon: GraduationCap
    },
    {
      id: 'upper-secondary',
      title: 'Upper Secondary',
      description: 'Rigorous academic preparation for university and career pathways with IGCSE and Advanced Level programs.',
      image: '/images/upper-secondary.jpg',
      ageRange: '15-18 years',
      programs: ['IGCSE & A-Levels', 'BTEC Pathways', 'University Counseling'],
      highlights: ['University placement success', 'Advanced placement options', 'Career guidance'],
      icon: Award
    }
  ];

  const curriculumFeatures = [
    {
      title: 'Cambridge International Curriculum',
      description: 'Internationally recognized curriculum that develops critical thinking, problem-solving, and analytical skills.',
      icon: Globe,
      color: 'bg-blue-500'
    },
    {
      title: 'STEM Excellence',
      description: 'Strong focus on Science, Technology, Engineering, and Mathematics with modern labs and equipment.',
      icon: Calculator,
      color: 'bg-green-500'
    },
    {
      title: 'Arts & Creativity',
      description: 'Comprehensive arts program including music, drama, visual arts, and creative expression.',
      icon: Palette,
      color: 'bg-purple-500'
    },
    {
      title: 'Holistic Development',
      description: 'Balanced approach to education that nurtures intellectual, emotional, and social growth.',
      icon: Users,
      color: 'bg-orange-500'
    }
  ];

  const achievements = [
    {
      title: '100% Pass Rate',
      subtitle: 'Cambridge IGCSE Examinations',
      value: '100%',
      icon: Award
    },
    {
      title: 'University Placements',
      subtitle: 'Top Universities Worldwide',
      value: '95%',
      icon: GraduationCap
    },
    {
      title: 'Student Satisfaction',
      subtitle: 'Annual Student Survey',
      value: '98%',
      icon: Users
    },
    {
      title: 'Cambridge Accreditation',
      subtitle: 'Full Cambridge International School',
      value: 'A+',
      icon: BookOpen
    }
  ];

  return (
    <PageLayout title="Academics - ADJIS" hideHero>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
          <div className="absolute inset-0">
            <Image
              src="/images/hero.jpg"
              alt="ADJIS Academics"
              fill
              className="object-cover opacity-20"
            />
          </div>
          <div className="relative container mx-auto px-4 py-16">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Academic Excellence</h1>
              <p className="text-xl text-white/90 max-w-2xl">
                Discover our comprehensive academic programs designed to nurture young minds and prepare students for future success. Where learning meets excellence and every child's potential is nurtured.
              </p>
            </div>
          </div>
        </section>

        {/* Academic Departments */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Academic Departments</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our structured academic journey supports students at every stage of their development.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {departments.map((dept) => {
                const Icon = dept.icon;
                return (
                  <div key={dept.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all group">
                    <div className="relative h-64">
                      <Image
                        src={dept.image}
                        alt={dept.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-white/90 text-sm">{dept.ageRange}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white">{dept.title}</h3>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <p className="text-gray-600 mb-4">{dept.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Programs:</h4>
                        <div className="flex flex-wrap gap-2">
                          {dept.programs.map((program, index) => (
                            <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                              {program}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-800 mb-2">Highlights:</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          {dept.highlights.map((highlight, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <ChevronRight className="w-3 h-3 text-blue-600" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Link 
                        href={`/academics/${dept.id}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                      >
                        Learn More <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Curriculum Features */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Curriculum Features</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our curriculum combines international standards with local relevance to provide a world-class education.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {curriculumFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="text-center">
                    <div className={`${feature.color} text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Academic Achievements */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Academic Achievements</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our commitment to excellence is reflected in our outstanding academic results and student achievements.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all">
                    <div className="bg-indigo-100 text-indigo-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-3xl font-bold text-indigo-600 mb-2">{achievement.value}</div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{achievement.title}</h3>
                    <p className="text-sm text-gray-600">{achievement.subtitle}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Academic Support */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Academic Support</h2>
                <p className="text-gray-600 mb-6">
                  We provide comprehensive support services to ensure every student reaches their full academic potential.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Personalized Learning</h3>
                      <p className="text-sm text-gray-600">Tailored instruction to meet individual student needs and learning styles.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Extra Support Classes</h3>
                      <p className="text-sm text-gray-600">Additional help for students who need extra academic assistance.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">University Counseling</h3>
                      <p className="text-sm text-gray-600">Guidance for university applications and career planning.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative h-96 rounded-xl overflow-hidden">
                <Image
                  src="/images/hero.jpg"
                  alt="Academic Support"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-indigo-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Academic Community</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Discover how ADJIS can provide your child with an exceptional educational experience.
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <Link 
                href="/admissions"
                className="flex-1 bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Apply Now
              </Link>
              <Link 
                href="/admissions/apply"
                className="flex-1 border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
              >
                Schedule Tour
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
