"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Search, Play, Facebook, Instagram, Linkedin, Youtube, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { toast, Toaster } from "sonner";
import AdvancedChatbot from "@/components/AdvancedChatbot";

// Navigation items
const navItems = [
  { name: "Home", href: "/" },
  {
    name: "About",
    href: "/about",
    subItems: [
      { name: "About ADJIS", href: "/about" },
      { name: "Our History", href: "/about/our-history" },
      { name: "Careers", href: "/about" },
      { name: "Principal's Message", href: "/about" },
      { name: "ADJIS Attributes", href: "/about/jis-attributes" },
    ],
  },
  {
    name: "Admissions",
    href: "/admissions",
    subItems: [
      { name: "View Admissions", href: "/admissions" },
      { name: "Apply", href: "/admissions/apply" },
      { name: "FAQ", href: "/admissions#faq" },
    ],
  },
  {
    name: "Life In ADJIS",
    href: "/life",
    subItems: [
      { name: "News & Updates", href: "/news" },
      { name: "Memories", href: "/memories" },
      { name: "Activities", href: "/activities" },
      { name: "Calendar", href: "/calendar" },
    ],
  },
  {
    name: "Academics",
    href: "/academics",
    subItems: [
      { name: "Departments", href: "/academics/departments", subItems: [
        { name: "Pre-School", href: "/academics/preschool" },
        { name: "Primary School", href: "/academics/primary" },
      ]},
      { name: "Curriculum", href: "/academics/curriculum" },
    ],
  },
  {
    name: "Parents",
    href: "#",
    subItems: [{ name: "PTA", href: "#" }],
  },
  { name: "Alumni", href: "#" },
  { name: "Contact Us", href: "/contact" },
];

// Stats data
const stats = [
  { label: "Established", value: "1955" },
  { label: "Students", value: "1,200+" },
  { label: "Nationalities", value: "60+" },
  { label: "After-school programs", value: "50+" },
];

// Events data
const events = [
  { date: "09", month: "March", year: "2026", title: "Technology in Problem-Solving (TIPS) Week", href: "#" },
  { date: "20", month: "March", year: "2026", title: "Stage Musical", href: "#" },
  { date: "26", month: "March", year: "2026", title: "Kwame Pianim Debate", href: "#" },
  { date: "27", month: "March", year: "2026", title: "Term 2 Ends", href: "#" },
  { date: "28", month: "March", year: "2026", title: "Carnifest (Yearbook Fundraiser)", href: "#" },
];

// News data
const newsItems = [
  {
    title: "ADJIS@70 Mid-Term Adventures!",
    excerpt: "This week, members of the ADJIS Community are experiencing an unforgettable blend of tourism,...",
    image: "/images/hero.jpg",
    href: "#",
  },
  {
    title: "Congratulations to the Infant School Student Council (ADJISSC)",
    excerpt: "Introduced in November 2022, the Infant School Student Council (ADJISSC) is an impactful initiative...",
    image: "/images/hero.jpg",
    href: "#",
  },
  {
    title: "ADJIS Shines at PaGya Literary Festival!",
    excerpt: "We are thrilled to celebrate FOUR published authors from the ADJIS community presenting at this...",
    image: "/images/hero.jpg",
    href: "#",
  },
];

// Join ADJIS cards
const joinCards = [
  { title: "A Student", image: "/images/hero.jpg", href: "/admissions" },
  { title: "A Staff Member", image: "/images/hero.jpg", href: "/about" },
];

// University logos
const universityLogos = [
  { name: "Harvard", src: "https://ext.same-assets.com/1957532446/956413186.png" },
  { name: "Stanford", src: "https://ext.same-assets.com/1957532446/2362178359.png" },
  { name: "LSE", src: "https://ext.same-assets.com/1957532446/2491797537.png" },
  { name: "Durham", src: "https://ext.same-assets.com/1957532446/1614074497.png" },
  { name: "Imperial", src: "https://ext.same-assets.com/1957532446/90945058.png" },
  { name: "Queens", src: "https://ext.same-assets.com/1957532446/3761837835.jpeg" },
];

// Accreditation logos
const accreditationLogos = [
  { name: "CIS", src: "https://ext.same-assets.com/1957532446/3353241665.png" },
  { name: "NEASC", src: "https://ext.same-assets.com/1957532446/281335752.png" },
  { name: "AISA", src: "https://ext.same-assets.com/1957532446/3853054907.png" },
  { name: "ECIS", src: "https://ext.same-assets.com/1957532446/796267081.png" },
  { name: "Pearson", src: "https://ext.same-assets.com/1957532446/763822731.png" },
];

// Animation hook for scroll reveal
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

// Animated Section Component
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

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % newsItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Pause auto-play on hover
  const handleCarouselHover = (hovering: boolean) => {
    setIsAutoPlaying(!hovering);
  };

  // Navigate carousel
  const goToNext = () => {
    setCurrentNewsIndex((prev) => (prev + 1) % newsItems.length);
  };

  const goToPrev = () => {
    setCurrentNewsIndex((prev) => (prev - 1 + newsItems.length) % newsItems.length);
  };

  // Newsletter submission
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Successfully subscribed to the newsletter!", {
      description: "Thank you for subscribing. You will receive updates soon.",
    });

    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-right" richColors />

      {/* Header */}
      <header className="bg-transparent absolute top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/images/logo1.jpg"
                  alt="Adorable Babies & Josemaria International School"
                  width={150}
                  height={150}
                  className="h-20 w-auto"
                />
              </Link>
              <div className="h-10 w-px bg-white/40 hidden md:block" />
              <Link
                href="#"
                className="hidden md:inline-flex bg-gis-green hover:bg-gis-green-dark text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors shadow-md"
              >
                Join Our Giving Campaigns
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-0.5">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.subItems ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveDropdown(activeDropdown === item.name ? null : item.name);
                      }}
                      className="flex items-center gap-1 text-white text-sm font-medium px-3 py-2 hover:text-gis-gold transition-colors whitespace-nowrap bg-transparent border-none cursor-pointer"
                    >
                      {item.name}
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center gap-1 text-white text-sm font-medium px-3 py-2 hover:text-gis-gold transition-colors whitespace-nowrap"
                    >
                      {item.name}
                    </Link>
                  )}
                  {item.subItems && activeDropdown === item.name && (
                    <div className="absolute top-full left-0 bg-white shadow-xl rounded-md min-w-[220px] py-2 z-50 border border-gray-100">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gis-green hover:text-white transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <button type="button" className="text-white p-2 ml-2 hover:text-gis-gold transition-colors" aria-label="Search">
                <Search className="w-5 h-5" />
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="xl:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="xl:hidden bg-white rounded-lg shadow-xl mt-2 py-4 absolute left-4 right-4 max-h-[70vh] overflow-y-auto">
              {navItems.map((item) => (
                <div key={item.name} className="border-b border-gray-100 last:border-0">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (item.subItems && item.subItems.length > 0) {
                        setActiveDropdown(activeDropdown === item.name ? null : item.name);
                      } else {
                        window.location.href = item.href;
                        setMobileMenuOpen(false);
                      }
                    }}
                    className="w-full block px-4 py-3 text-gray-700 hover:bg-gis-green hover:text-white transition-colors text-left bg-transparent border-none cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      {item.name}
                      {item.subItems && item.subItems.length > 0 && (
                        <ChevronDown className={`w-4 h-4 transition-transform ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`} />
                      )}
                    </div>
                  </button>
                  
                  {/* Mobile Submenu */}
                  {item.subItems && item.subItems.length > 0 && activeDropdown === item.name && (
                    <div className="bg-gray-50">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-8 py-2 text-gray-600 hover:bg-gray-100 hover:text-gis-green transition-colors text-sm"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[650px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt="ADJIS Students"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center text-white px-4 pt-24 pb-8">
          {/* YH Logo */}
          <AnimatedSection delay={0}>
            <div className="flex justify-center mb-6">
              <Image
                src="/images/yh.png"
                alt="ADJIS Logo"
                width={300}
                height={300}
                className="w-40 md:w-56 lg:w-72 drop-shadow-lg"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="#"
                className="bg-gis-green hover:bg-gis-green-dark text-white font-semibold px-8 py-3.5 rounded-full transition-all uppercase tracking-wider text-sm shadow-lg hover:shadow-xl hover:scale-105"
              >
                Join The Celebration
              </Link>
              <Link
                href="#"
                className="bg-gis-green hover:bg-gis-green-dark text-white font-semibold px-8 py-3.5 rounded-full transition-all uppercase tracking-wider text-sm shadow-lg hover:shadow-xl hover:scale-105"
              >
                Watch The Documentary
              </Link>
            </div>
          </AnimatedSection>

          {/* School name overlay */}
          <AnimatedSection delay={400}>
            <p className="text-white/70 text-lg md:text-xl tracking-wide">Adorable Babies & Josemaria International School</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gis-green py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {stats.map((stat, index) => (
              <AnimatedSection key={stat.label} delay={index * 100}>
                <div className="space-y-3">
                  <div className="w-10 h-0.5 bg-white mx-auto" />
                  <p className="text-sm font-medium tracking-wide">{stat.label}</p>
                  <p className="text-xs opacity-80">{stat.value}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Events Sidebar */}
            <div className="lg:col-span-4">
              <AnimatedSection>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming events</h2>
              </AnimatedSection>
              <div className="space-y-4">
                {events.map((event, index) => (
                  <AnimatedSection key={`${event.title}-${index}`} delay={index * 100}>
                    <div className="flex gap-4 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow event-card">
                      <div className="bg-gis-green text-white p-4 flex flex-col items-center justify-center min-w-[80px]">
                        <span className="text-2xl font-bold">{event.date}</span>
                        <span className="text-xs">{event.month}</span>
                        <span className="text-xs">{event.year}</span>
                      </div>
                      <div className="p-4 flex flex-col justify-center">
                        <h3 className="text-gis-green font-semibold text-sm mb-2">{event.title}</h3>
                        <Link href={event.href} className="text-gis-green text-sm font-medium hover:underline">
                          Find out more &raquo;
                        </Link>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
              <AnimatedSection delay={500}>
                <div className="mt-6">
                  <Link
                    href="#"
                    className="inline-block border-2 border-gis-green text-gis-green font-semibold px-8 py-3 rounded hover:bg-gis-green hover:text-white transition-colors text-sm"
                  >
                    VIEW CALENDAR
                  </Link>
                </div>
              </AnimatedSection>
            </div>

            {/* Welcome Content */}
            <div className="lg:col-span-8">
              <AnimatedSection>
                <h2 className="section-title text-3xl font-bold text-gray-800 mb-6">Welcome to ADJIS</h2>
              </AnimatedSection>
              <AnimatedSection delay={100}>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Adorable Babies & Josemaria International School is a not-for-profit, private, non-sectarian, co-educational day and boarding school. It was established in September 1955 to provide international education to students of all races and creeds, at a time when Ghana was yet to achieve full independence, and international schools were a rarity. Almost 70 years on, ADJIS continues to provide quality education to both international and local students in a completely different and more competitive educational setting.
                  </p>
                  <p>
                    ADJIS offers a curriculum based on the Cambridge International Early Years, Cambridge Primary and Secondary program leading to the IGCSE and Advanced level examination, with English language as the medium of instruction. We also have a Pearson BTEC Pathway in Music and Creative Media for students aged 14 years and above. These are complemented by local content offerings especially in the pre-examination classes.
                  </p>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={200}>
                <Link href="/about" className="inline-block text-gis-green font-semibold mt-4 hover:underline">
                  Read more
                </Link>
              </AnimatedSection>
              
              {/* Join ADJIS Section */}
              <div className="mt-12">
                <AnimatedSection>
                  <h2 className="section-title text-3xl font-bold text-gray-800 mb-8">Join ADJIS as...</h2>
                </AnimatedSection>
                <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-12">
                  {joinCards.map((card, index) => (
                    <AnimatedSection key={card.title} delay={index * 100}>
                      <Link href={card.href} className="group block">
                        <div className="relative overflow-hidden rounded-lg aspect-[16/9] h-64">
                          <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <h3 className="text-gis-green font-semibold text-xl mt-4 group-hover:underline">{card.title}</h3>
                      </Link>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* News Section with Auto-play */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="section-title text-3xl font-bold text-gray-800 mb-8">News & Updates</h2>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <div
              className="relative"
              onMouseEnter={() => handleCarouselHover(true)}
              onMouseLeave={() => handleCarouselHover(false)}
            >
              <div className="relative overflow-hidden rounded-lg aspect-[16/9] max-w-4xl mx-auto group">
                <Image
                  src={newsItems[currentNewsIndex].image}
                  alt={newsItems[currentNewsIndex].title}
                  fill
                  className="object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{newsItems[currentNewsIndex].title}</h3>
                  <p className="text-sm md:text-base text-gray-200 mb-4">{newsItems[currentNewsIndex].excerpt}</p>
                  <Link href={newsItems[currentNewsIndex].href} className="inline-flex items-center gap-2 text-sm font-medium hover:underline">
                    Read More <span className="text-lg">&rarr;</span>
                  </Link>
                </div>

                {/* Navigation Arrows */}
                <button
                  type="button"
                  onClick={goToPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                  <div
                    className="h-full bg-gis-green transition-all duration-300"
                    style={{ width: `${((currentNewsIndex + 1) / newsItems.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Carousel Dots */}
              <div className="flex justify-center gap-2 mt-4">
                {newsItems.map((_, index) => (
                  <button
                    key={`news-dot-${index}`}
                    type="button"
                    onClick={() => setCurrentNewsIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentNewsIndex ? "bg-gis-green scale-110" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to news item ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* University Acceptance Section */}
      
      {/* Video CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt="ADJIS Students"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <AnimatedSection>
          <div className="relative z-10 text-center text-white">
            <Link
              href="https://www.youtube.com/channel/UCZEh6DGL5NDWRgg7gkJKrwA/videos"
              target="_blank"
              className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full hover:bg-white/30 transition-all hover:scale-110 mb-4"
            >
              <Play className="w-8 h-8 text-white fill-white" />
            </Link>
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider">Watch Our Channel</h2>
          </div>
        </AnimatedSection>
      </section>

      {/* Footer */}
      <footer className="bg-gis-green-dark text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* School Hours */}
            <div>
              <h3 className="text-lg font-bold uppercase tracking-wider mb-4">School Hours</h3>
              <p className="text-gray-300">M-F: 8am - 3:30pm</p>
            </div>

            {/* Address */}
            <div>
              <h3 className="text-lg font-bold uppercase tracking-wider mb-4">Address</h3>
              <p className="text-gray-300 leading-relaxed">
                Josemaria International School<br />
                Impaka Ln Comm. 17 Annex<br />
                Lashibi<br />
                Ghana
              </p>
            </div>

            {/* Email & Number */}
            <div>
              <h3 className="text-lg font-bold uppercase tracking-wider mb-4">Email & Number</h3>
              <div className="space-y-2 text-gray-300">
                <Link href="mailto:admission@josemariaschoolgh.org" className="block hover:text-white">admission@josemariaschoolgh.org</Link>
                <Link href="mailto:info@josemariaschoolgh.org" className="block hover:text-white">info@josemariaschoolgh.org</Link>
                <p>+233 245 894 229</p>
                <p>+233 244 330 890</p>
                <p>+233 (0)30 397 9588</p>
              </div>
            </div>

            {/* Newsletter */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-bold uppercase tracking-wider mb-4">Newsletter</h3>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-gis-green hover:bg-gis-green-light text-white font-semibold rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
              <div className="flex gap-3 mt-4">
                <Link href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Facebook">
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="X">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </Link>
                <Link href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </Link>
                <Link href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Instagram">
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="YouTube">
                  <Youtube className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Logo */}
              <div>
                <Image
                  src="/images/logo1.jpg"
                  alt="Adorable Babies & Josemaria International School"
                  width={200}
                  height={100}
                  className="h-24 w-auto"
                />
              </div>

              {/* School Links */}
              <div>
                <h3 className="text-lg font-bold uppercase tracking-wider mb-4">School</h3>
                <div className="space-y-2">
                  <Link href="/admissions" className="block text-gray-300 hover:text-white">Apply</Link>
                  <Link href="/admissions" className="block text-gray-300 hover:text-white">FAQs</Link>
                  <Link href="#" className="block text-gray-300 hover:text-white">Privacy Policy</Link>
                  <Link href="#" className="block text-gray-300 hover:text-white">Child Protection Policy</Link>
                </div>
              </div>

              {/* Portals */}
              <div>
                <h3 className="text-lg font-bold uppercase tracking-wider mb-4">Portals</h3>
                <div className="space-y-2">
                  <Link href="#" className="block text-gray-300 hover:text-white">Alumni</Link>
                  <Link href="#" className="block text-gray-300 hover:text-white">Parent</Link>
                  <Link href="#" className="block text-gray-300 hover:text-white">Staff</Link>
                  <Link href="#" className="block text-gray-300 hover:text-white">Student</Link>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-bold uppercase tracking-wider mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <Link href="/about" className="block text-gray-300 hover:text-white">Student Life</Link>
                  <Link href="/about" className="block text-gray-300 hover:text-white">SEN Program</Link>
                  <Link href="/about" className="block text-gray-300 hover:text-white">Careers</Link>
                  <Link href="/about" className="block text-gray-300 hover:text-white">Boarding Program</Link>
                </div>
              </div>
            </div>
          </div>

          
          {/* Copyright */}
          <div className="text-center mt-8 pt-4 border-t border-white/20">
            <p className="text-sm text-gray-400">All rights reserved &copy; Adorable Babies & Josemaria International School</p>
          </div>
        </div>
      </footer>
      
      {/* Chatbot */}
      <AdvancedChatbot />
    </div>
  );
}
