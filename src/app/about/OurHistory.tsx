"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

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

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Admissions", href: "/admissions" },
  { name: "ADJIS Boarding", href: "#" },
  { name: "Contact Us", href: "/contact" },
];

const milestones = [
  { year: "1955", title: "School Founded", description: "ADJIS established to provide international education in Ghana." },
  { year: "1957", title: "Ghana Independence", description: "Continued serving students through the nation's independence." },
  { year: "1990", title: "Cambridge Curriculum", description: "Adopted Cambridge International curriculum." },
  { year: "2010", title: "CIS Accreditation", description: "First school in Ghana accredited by Council of International Schools." },
  { year: "2015", title: "NEASC Accreditation", description: "Received NEASC accreditation." },
  { year: "2025", title: "70th Anniversary", description: "Celebrating 70 years of educational excellence." },
];

export default function OurHistory() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gis-green sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo1.jpg"
                alt="Adorable Babies & Josemaria International School"
                width={100}
                height={100}
                className="h-14 w-auto"
              />
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-white text-sm font-medium hover:text-gis-gold transition-colors ${
                    item.name === "About" ? "text-gis-gold" : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <button
              type="button"
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden bg-white rounded-lg shadow-xl mt-2 py-4 absolute left-4 right-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-gray-700 hover:bg-gis-green hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Our History - Adorable Babies & Josemaria International School"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our History</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
              Seven decades of shaping future leaders
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
            <Link href="/about" className="text-gis-green hover:underline">About</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-600">Our History</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {/* History Timeline */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <h2 className="section-title text-3xl font-bold text-gray-800 mb-4 text-center">Our Journey Through Time</h2>
              <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
                From our founding in 1955 to becoming a leading international school in Ghana, discover the milestones that shaped our institution.
              </p>
            </AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gis-green/30 transform md:-translate-x-1/2" />

                {milestones.map((milestone, index) => (
                  <AnimatedSection key={milestone.year} delay={index * 150}>
                    <div className={`relative flex items-center mb-12 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                      {/* Timeline dot */}
                      <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-gis-green rounded-full transform md:-translate-x-1/2 z-10" />

                      {/* Content */}
                      <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                          <span className="text-gis-green font-bold text-xl">{milestone.year}</span>
                          <h3 className="text-lg font-bold text-gray-800 mt-1">{milestone.title}</h3>
                          <p className="text-gray-600 text-sm mt-2">{milestone.description}</p>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Accreditation Section */}
        <section className="py-16 bg-gis-green text-white">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <h2 className="text-3xl font-bold mb-4 text-center">Accreditation & Memberships</h2>
              <p className="opacity-90 text-center max-w-2xl mx-auto mb-12">
                ADJIS is the first and only international school in Ghana accredited by both CIS and NEASC.
              </p>
            </AnimatedSection>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {[
                { name: "CIS", src: "/images/cis-logo.png" },
                { name: "NEASC", src: "/images/neasc-logo.png" },
                { name: "AISA", src: "/images/aisa-logo.png" },
                { name: "ECIS", src: "/images/ecis-logo.png" },
              ].map((logo, index) => (
                <AnimatedSection key={logo.name} delay={index * 100}>
                  <div className="bg-white p-4 rounded-lg">
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={100}
                      height={60}
                      className="h-12 w-auto object-contain"
                    />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* 15th Anniversary Celebration */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-gis-green to-gis-green-dark rounded-2xl overflow-hidden shadow-xl">
              <div className="grid md:grid-cols-2 items-center">
                <div className="p-8 md:p-12 text-white">
                  <AnimatedSection>
                    <h2 className="text-3xl font-bold mb-4">Celebrating 15 Years of Excellence</h2>
                    <p className="opacity-90 mb-6">
                      In 2025, Adorable Babies & Josemaria International School celebrates 15 years of continued educational excellence. Join us in commemorating this milestone as we reflect on our achievements and look forward to a future of continued success in shaping the next generation of global leaders.
                    </p>
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <span>15 years of academic excellence</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <span>Thousands of successful graduates</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <span>Global recognition and accreditation</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <span>Commitment to educational innovation</span>
                      </div>
                    </div>
                    <Link
                      href="#"
                      className="inline-block bg-white text-gis-green hover:bg-gray-100 font-semibold px-6 py-3 rounded-full transition-colors"
                    >
                      Join the Celebration
                    </Link>
                  </AnimatedSection>
                </div>
                <div className="relative h-64 md:h-full min-h-[300px]">
                  <Image
                    src="/images/yh.png"
                    alt="ADJIS Logo"
                    fill
                    className="object-contain p-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional History Content */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Legacy of Excellence</h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 gap-12">
              <AnimatedSection delay={200}>
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Founding Principles</h3>
                  <p className="text-gray-600 mb-4">
                    Established in 2010, Adorable Babies & Josemaria International School was founded on the principle of "Nurturing Little Steps to Big Steps" - a motto that continues to guide our educational philosophy today.
                  </p>
                  <p className="text-gray-600">
                    Our founders envisioned a school where students from diverse backgrounds could come together to learn, grow, and develop into responsible global citizens.
                  </p>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={400}>
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Modern Achievements</h3>
                  <p className="text-gray-600 mb-4">
                    Today, ADJIS stands as a beacon of educational excellence in Ghana, with internationally recognized accreditation and a reputation for producing outstanding graduates.
                  </p>
                  <p className="text-gray-600">
                    Our commitment to innovation while maintaining our core values has positioned us as a leader in international education.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gis-green-dark text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Image
                src="/images/logo1.jpg"
                alt="ADJIS"
                width={100}
                height={100}
                className="h-14 w-auto"
              />
              <p className="text-sm opacity-80">Adorable Babies & Josemaria International School</p>
            </div>
            <p className="text-sm opacity-80">All rights reserved &copy; Adorable Babies & Josemaria International School</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
