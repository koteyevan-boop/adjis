"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Check, CheckCircle, Phone, Mail, MapPin, Clock, Users, BookOpen, Award, ChevronDown, FileText, ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";

function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
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

const schoolLevels = [
  {
    title: "Infant School",
    ages: "Ages 0-5",
    description: "Our Infant School provides a nurturing environment for our youngest learners with the Cambridge Early Years curriculum.",
    features: ["Play-based learning", "Small class sizes", "Dedicated infant facilities"],
    image: "/images/hero.jpg",
  },
  {
    title: "Primary School",
    ages: "Ages 6-13",
    description: "The Primary School builds foundational skills through the Cambridge Primary programme.",
    features: ["Cambridge Primary", "Specialist teachers", "Extra-curricular activities"],
    image: "/images/hero.jpg",
  },
];

const admissionSteps = [
  { step: 1, title: "Submit Application", description: "Complete the online application form with required documents." },
  { step: 2, title: "Assessment", description: "Students undergo academic assessment and interview." },
  { step: 3, title: "Admission Decision", description: "Receive admission decision within 2 weeks." },
  { step: 4, title: "Enrollment", description: "Complete enrollment and welcome to ADJIS!" },
];

const requirements = [
  "Completed application form",
  "Birth certificate copy",
  "Passport-sized photographs",
  "Previous school reports (2 years)",
  "Immunization records",
  "Recommendation letter from current school",
];

const faqs = [
  {
    question: "What is the application deadline?",
    answer: "Applications are accepted year-round, but we recommend applying at least 3 months before the intended start date for the best chance of placement.",
  },
  {
    question: "Is financial aid available?",
    answer: "Yes, ADJIS offers merit-based scholarships and need-based financial assistance to qualified students. Contact our admissions office for more information.",
  },
  {
    question: "What language is used for instruction?",
    answer: "English is the primary language of instruction at ADJIS. We offer additional language classes in French and other languages.",
  },
  {
    question: "Do you offer boarding facilities?",
    answer: "No, ADJIS does not offer boarding facilities. We are a day school serving students from ages 0 to 13 years.",
  },
];

export default function AdmissionsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <PageLayout title="Admissions - ADJIS" hideHero>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt="ADJIS Students"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Admissions</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
              Join our diverse community of learners
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3">
        <div className="container mx-auto px-4">
          <nav className="text-sm">
            <Link href="/" className="text-gis-green hover:underline">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-600">Admissions</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {/* Welcome Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <AnimatedSection>
                <h2 className="section-title text-3xl font-bold text-gray-800 mb-6 inline-block">Welcome to ADJIS Admissions</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Thank you for considering Adorable Babies & Josemaria International School for your child&apos;s education. We welcome students from all backgrounds and nationalities, united by our commitment to academic excellence and &quot;Nurturing Little Steps to Big Steps.&quot;
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Our admissions process is designed to be straightforward and supportive. We look forward to learning about your child and sharing how ADJIS can help them achieve their full potential.
                </p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* School Levels */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <h2 className="section-title text-3xl font-bold text-gray-800 mb-4 text-center">Our Schools</h2>
              <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
                ADJIS offers comprehensive education from ages 0 to 13.
              </p>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 gap-8">
              {schoolLevels.map((level, index) => (
                <AnimatedSection key={level.title} delay={index * 100}>
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full">
                    <div className="relative h-48">
                      <Image
                        src={level.image}
                        alt={level.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-bold">{level.title}</h3>
                        <p className="text-sm opacity-90">{level.ages}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 mb-4">{level.description}</p>
                      <ul className="space-y-2">
                        {level.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                            <CheckCircle className="w-4 h-4 text-gis-green flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Admission Process */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <h2 className="section-title text-3xl font-bold text-gray-800 mb-4 text-center">Admission Process</h2>
              <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
                Our straightforward 4-step process makes joining ADJIS easy.
              </p>
            </AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-6">
                {admissionSteps.map((step, index) => (
                  <AnimatedSection key={step.step} delay={index * 150}>
                    <div className="relative">
                      <div className="bg-gis-green w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-xl font-bold">{step.step}</span>
                      </div>
                      {index < admissionSteps.length - 1 && (
                        <div className="hidden md:block absolute top-6 left-[60%] w-full h-0.5 bg-gis-green/30" />
                      )}
                      <h3 className="text-lg font-bold text-gray-800 text-center mb-2">{step.title}</h3>
                      <p className="text-gray-600 text-sm text-center">{step.description}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-16 bg-gis-green text-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection>
                <h2 className="text-3xl font-bold mb-6">Application Requirements</h2>
                <p className="opacity-90 mb-8">
                  Please prepare the following documents for your application:
                </p>
                <ul className="space-y-3">
                  {requirements.map((req, index) => (
                    <li key={req} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <span className="opacity-90">{req}</span>
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
              <AnimatedSection delay={200}>
                <div className="bg-white/10 rounded-xl p-8">
                  <FileText className="w-12 h-12 mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Ready to Apply?</h3>
                  <p className="opacity-90 mb-6">
                    Start your application today and join our community of learners.
                  </p>
                  <Link
                    href="/admissions/apply"
                    className="inline-flex items-center gap-2 bg-white text-gis-green hover:bg-gray-100 font-semibold px-6 py-3 rounded-full transition-colors"
                  >
                    Start Application <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section id="faq" className="py-16">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <h2 className="section-title text-3xl font-bold text-gray-800 mb-4 text-center">Frequently Asked Questions</h2>
              <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
                Find answers to common questions about admissions.
              </p>
            </AnimatedSection>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <AnimatedSection key={faq.question} delay={index * 100}>
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <button
                      type="button"
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    >
                      <span className="font-semibold text-gray-800">{faq.question}</span>
                      <span className={`transform transition-transform ${openFaq === index ? "rotate-180" : ""}`}>
                        <svg className="w-5 h-5 text-gis-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-4 text-gray-600">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Have Questions?</h2>
                <p className="text-gray-600 mb-8">
                  Our admissions team is here to help. Contact us for more information or to schedule a campus visit.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="bg-gis-green hover:bg-gis-green-dark text-white font-semibold px-8 py-3 rounded-full transition-colors"
                  >
                    Contact Admissions
                  </Link>
                  <Link
                    href="#"
                    className="border-2 border-gis-green text-gis-green hover:bg-gis-green hover:text-white font-semibold px-8 py-3 rounded-full transition-colors"
                  >
                    Schedule a Visit
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
    </PageLayout>
  );
}
