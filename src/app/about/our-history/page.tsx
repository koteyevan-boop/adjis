'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Award, Users, BookOpen, Target } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

function useScrollAnimation() {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref) {
      observer.observe(ref);
    }

    return () => observer.disconnect();
  }, [ref]);

  return { ref: setRef, isVisible };
}

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function OurHistoryPage() {
  const milestones = [
    { year: "2010", title: "School Founded", description: "ADJIS established to provide innovative international education to students of all races and creeds." },
    { year: "2012", title: "First Graduation", description: "Celebrated our first cohort of graduates who excelled in Cambridge examinations." },
    { year: "2015", title: "Expansion", description: "Added new facilities including science labs, library, and sports complex." },
    { year: "2018", title: "Accreditation", description: "Received full accreditation from Cambridge International Examinations." },
    { year: "2020", title: "Digital Transformation", description: "Integrated technology throughout curriculum and introduced e-learning platforms." },
    { year: "2025", title: "15th Anniversary", description: "Celebrating 15 years of educational excellence and student achievement." },
  ];

  const achievements = [
    {
      icon: Award,
      title: "Academic Excellence",
      description: "Consistently outstanding results in Cambridge IGCSE and A-Level examinations",
      color: "text-blue-600"
    },
    {
      icon: Users,
      title: "Diverse Community",
      description: "Students from over 20 nationalities learning together in harmony",
      color: "text-green-600"
    },
    {
      icon: BookOpen,
      title: "Innovative Curriculum",
      description: "Blended GES, Montessori, and Cambridge educational approaches",
      color: "text-purple-600"
    },
    {
      icon: Target,
      title: "Holistic Development",
      description: "Focus on academic, social, emotional, and physical growth",
      color: "text-orange-600"
    }
  ];

  return (
    <PageLayout title="Our History - ADJIS" hideHero>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative h-96 md:h-[520px]">
          <Image
            src="/images/hero.jpg"
            alt="ADJIS History"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/75 to-orange-600/75" />
          <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
            <div className="text-center max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Our History</h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                A journey of educational excellence since 2010
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="bg-gray-100 py-3">
          <div className="container mx-auto px-4">
            <nav className="text-sm">
              <Link href="/" className="text-amber-600 hover:underline">Home</Link>
              <span className="mx-2 text-gray-400">/</span>
              <Link href="/about" className="text-amber-600 hover:underline">About</Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-600">Our History</span>
            </nav>
          </div>
        </div>

        {/* Introduction */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Journey</h2>
                <p className="text-lg text-gray-600 leading-relaxed text-center mb-8">
                  Since our establishment in 2010, Adorable Babies & Josemaria International School has been on a remarkable journey 
                  of growth, innovation, and excellence. From a small beginning to becoming a leading educational institution, 
                  our story is one of dedication, perseverance, and commitment to nurturing young minds.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={200}>
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Founding Principles</h3>
                  <p className="text-gray-600 mb-4">
                    Established in 2010, Adorable Babies & Josemaria International School was founded on the principle of 
                    "Nurturing Little Steps to Big Steps" - a motto that continues to guide our educational philosophy today.
                  </p>
                  <p className="text-gray-600">
                    Our founders envisioned a school where students from diverse backgrounds could come together to learn, 
                    grow, and develop into responsible global citizens. They believed in creating an environment that would 
                    foster not just academic excellence, but also character development, creativity, and social responsibility.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Key Milestones</h2>
            </AnimatedSection>
            
            <div className="max-w-4xl mx-auto">
              {milestones.map((milestone, index) => (
                <AnimatedSection key={milestone.year} delay={index * 100}>
                  <div className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className="flex-1">
                      <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Calendar className="w-5 h-5 text-amber-600" />
                          <span className="text-amber-600 font-bold">{milestone.year}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mx-4">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                    <div className="flex-1"></div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Our Achievements</h2>
            </AnimatedSection>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {achievements.map((achievement, index) => (
                <AnimatedSection key={achievement.title} delay={index * 150}>
                  <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                    <div className={`w-16 h-16 ${achievement.color} bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <achievement.icon className={`w-8 h-8 ${achievement.color}`} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3">{achievement.title}</h3>
                    <p className="text-gray-600 text-sm">{achievement.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Looking Forward */}
        <section className="py-16 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <AnimatedSection>
              <h2 className="text-3xl font-bold mb-6">Looking to the Future</h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                As we continue our journey, we remain committed to providing exceptional education that prepares 
                students for the challenges and opportunities of tomorrow. Our vision is to continue growing, innovating, 
                and inspiring generations of learners to become leaders in their chosen fields.
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  href="/admissions"
                  className="bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Join Our Community
                </Link>
                <Link
                  href="/about"
                  className="border border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-amber-600 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
