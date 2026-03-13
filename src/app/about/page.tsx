"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Heart, Award, Globe, Users, BookOpen, History, ChevronDown } from "lucide-react";

interface TabItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

const navItems = [
  { 
    name: "Home", 
    href: "/",
    submenu: []
  },
  { 
    name: "About", 
    href: "/about",
    submenu: [
      { name: "About ADJIS", href: "/about" },
      { name: "Our History", href: "/about/our-history" },
      { name: "Careers", href: "/about" },
      { name: "Principal's Message", href: "/about" },
      { name: "ADJIS Attributes", href: "/about/jis-attributes" }
    ]
  },
  { 
    name: "Admissions", 
    href: "/admissions",
    submenu: [
      { name: "View Admissions", href: "/admissions" },
      { name: "Apply", href: "/admissions/apply" },
      { name: "FAQ", href: "/admissions#faq" }
    ]
  },
  { 
    name: "Life In ADJIS", 
    href: "/life",
    submenu: [
      { name: "News & Updates", href: "/news" },
      { name: "Memories", href: "/memories" },
      { name: "Activities", href: "/activities" },
      { name: "Calendar", href: "/calendar" }
    ]
  },
  { 
    name: "Academics", 
    href: "/academics",
    submenu: [
      { name: "Departments", href: "/academics/departments", submenu: [
        { name: "Pre-School", href: "/academics/preschool" },
        { name: "Primary School", href: "/academics/primary" }
      ]},
      { name: "Curriculum", href: "/academics/curriculum" }
    ]
  },
  { 
    name: "Community", 
    href: "#",
    submenu: [
      { name: "Parent Portal", href: "/portals" },
      { name: "Student Portal", href: "/portals" },
      { name: "Alumni", href: "#" }
    ]
  },
  { 
    name: "Contact Us", 
    href: "/contact",
    submenu: []
  },
];

const secondaryNavItems = [
  { name: "Staff Portal", href: "#" },
  { name: "Parent Portal", href: "/portals" },
];

const values = [
  {
    icon: Heart,
    title: "Understanding",
    description: "We foster mutual respect and understanding among students of all backgrounds.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for academic excellence while nurturing each student's unique potential.",
  },
  {
    icon: Globe,
    title: "Diversity",
    description: "We celebrate our multicultural community with students from over 60 nationalities.",
  },
  {
    icon: Users,
    title: "Community",
    description: "We build strong relationships between students, parents, teachers, and staff.",
  },
  {
    icon: BookOpen,
    title: "Innovation",
    description: "We embrace modern teaching methods while respecting traditional values.",
  },
  {
    icon: History,
    title: "Heritage",
    description: "We honor our history of educational excellence in Ghana.",
  },
];

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1");
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const tabs: TabItem[] = [
    {
      id: "tab1",
      title: "To maintain a high academic standard that:",
      content: (
        <div>
          <ul className="space-y-2">
            <li>Delivers a broad curriculum that draws from various teaching methods, with English as the language of instruction;</li>
            <li>Offers the students opportunities to develop lively, enquiring minds and independent thinking;</li>
            <li>Encourages participation in co-curricular activities;</li>
            <li>Provides opportunities and encouragement for the professional development of staff;</li>
            <li>Identifies and meets the needs of students, except when student(s) special educational needs cannot be met within the school's resources;</li>
            <li>Keeps abreast of trends in education and ensures that the curriculum remains relevant and dynamic.</li>
          </ul>
        </div>
      )
    },
    {
      id: "tab2",
      title: "To promote positive personal values that:",
      content: (
        <div>
          <ul className="space-y-2">
            <li>Cultivate integrity in students;</li>
            <li>Prepare students to become responsible, creative, self reliant and productive members of the global community;</li>
            <li>Encourage effective teamwork;</li>
            <li>Foster a lifelong love of learning.</li>
          </ul>
        </div>
      )
    },
    {
      id: "tab3",
      title: "To ensure an understanding of and respect for diversity that:",
      content: (
        <div>
          <ul className="space-y-2">
            <li>Provides students with opportunities to share their cultures to promote 'understanding of each other';</li>
            <li>Promotes knowledge and understanding of Ghana;</li>
            <li>Promotes respect for other cultures, beliefs, nationalities, gender and persons with different abilities</li>
          </ul>
        </div>
      )
    },
    {
      id: "tab4",
      title: "To develop a positive educational facility that:",
      content: (
        <div>
          <ul className="space-y-2">
            <li>Provides a nurturing, secure, clean and friendly learning environment where students can grow intellectually, socially, emotionally and physically;</li>
            <li>Provides sufficient resources to create and maintain a stimulating learning environment.</li>
          </ul>
        </div>
      )
    },
    {
      id: "tab5",
      title: "To promote understanding of and participation In global concerns that:",
      content: (
        <div>
          <ul className="space-y-2">
            <li>Encourage students to regard the natural world as their inheritance and their responsibility;</li>
            <li>Recognise the need to protect and sustain the local and global environment;</li>
            <li>Foster a fundamental understanding of and respect for the rights and freedom of each individual in our community and the wider world in the spirit of the UN Declaration of Human Rights;</li>
            <li>Encourage each student's participation in community service.</li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Header - Secondary Navigation */}
      <div id="top-header" className="bg-gray-900 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-end items-center">
            <nav id="et-secondary-nav">
              <ul className="flex items-center gap-6 text-sm">
                {secondaryNavItems.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href} 
                      className="hover:text-gray-300 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header id="main-header" className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="logo_container">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/images/logo1.jpg"
                  alt="ADJIS"
                  width={150}
                  height={75}
                  className="h-16 w-auto"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav id="top-navigation" className="hidden lg:flex items-center">
              <ul className="flex items-center">
                {navItems.map((item) => (
                  <li 
                    key={item.name} 
                    className="relative group"
                    onMouseEnter={() => setDropdownOpen(item.name)}
                    onMouseLeave={() => setDropdownOpen(null)}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-gis-green transition-colors font-medium ${
                        item.name === "About" ? "text-gis-green" : ""
                      }`}
                    >
                      {item.name}
                      {item.submenu && item.submenu.length > 0 && (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </Link>
                    
                    {/* Dropdown Menu */}
                    {item.submenu && item.submenu.length > 0 && dropdownOpen === item.name && (
                      <ul className="absolute top-full left-0 bg-white shadow-lg rounded-lg min-w-[200px] py-2 mt-1">
                        {item.submenu.map((subitem) => (
                          <li 
                            key={subitem.name}
                            className="relative group/submenu"
                            onMouseEnter={() => setDropdownOpen(`${item.name}-${subitem.name}`)}
                            onMouseLeave={() => setDropdownOpen(item.name)}
                          >
                            <Link
                              href={subitem.href}
                              className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gis-green transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                {subitem.name}
                                {subitem.submenu && subitem.submenu.length > 0 && (
                                  <ChevronDown className="w-3 h-3" />
                                )}
                              </div>
                            </Link>
                            
                            {/* Sub-submenu */}
                            {subitem.submenu && subitem.submenu.length > 0 && dropdownOpen === `${item.name}-${subitem.name}` && (
                              <ul className="absolute top-0 left-full bg-white shadow-lg rounded-lg min-w-[180px] py-2 ml-1">
                                {subitem.submenu.map((subsubitem) => (
                                  <li key={subsubitem.name}>
                                    <Link
                                      href={subsubitem.href}
                                      className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gis-green transition-colors"
                                    >
                                      {subsubitem.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden text-gray-700 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-white border-t">
              <nav className="py-4">
                {navItems.map((item) => (
                  <div key={item.name} className="border-b">
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gis-green transition-colors font-medium"
                      onClick={() => {
                        if (item.submenu && item.submenu.length > 0) {
                          setDropdownOpen(dropdownOpen === item.name ? null : item.name);
                        } else {
                          setMobileMenuOpen(false);
                        }
                      }}
                    >
                      <div className="flex items-center justify-between">
                        {item.name}
                        {item.submenu && item.submenu.length > 0 && (
                          <ChevronDown className={`w-4 h-4 transition-transform ${
                            dropdownOpen === item.name ? 'rotate-180' : ''
                          }`} />
                        )}
                      </div>
                    </Link>
                    
                    {/* Mobile Submenu */}
                    {item.submenu && item.submenu.length > 0 && dropdownOpen === item.name && (
                      <div className="bg-gray-50">
                        {item.submenu.map((subitem) => (
                          <div key={subitem.name} className="border-b border-gray-200">
                            <Link
                              href={subitem.href}
                              className="block px-8 py-2 text-gray-600 hover:bg-gray-100 hover:text-gis-green transition-colors"
                              onClick={() => {
                                if (subitem.submenu && subitem.submenu.length > 0) {
                                  setDropdownOpen(dropdownOpen === `${item.name}-${subitem.name}` ? item.name : `${item.name}-${subitem.name}`);
                                } else {
                                  setMobileMenuOpen(false);
                                }
                              }}
                            >
                              <div className="flex items-center justify-between">
                                {subitem.name}
                                {subitem.submenu && subitem.submenu.length > 0 && (
                                  <ChevronDown className={`w-3 h-3 transition-transform ${
                                    dropdownOpen === `${item.name}-${subitem.name}` ? 'rotate-180' : ''
                                  }`} />
                                )}
                              </div>
                            </Link>
                            
                            {/* Mobile Sub-submenu */}
                            {subitem.submenu && subitem.submenu.length > 0 && dropdownOpen === `${item.name}-${subitem.name}` && (
                              <div className="bg-gray-100">
                                {subitem.submenu.map((subsubitem) => (
                                  <Link
                                    key={subsubitem.name}
                                    href={subsubitem.href}
                                    className="block px-12 py-2 text-gray-600 hover:bg-gray-200 hover:text-gis-green transition-colors text-sm"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    {subsubitem.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt="About Adorable Babies & Josemaria International School"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About ADJIS</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            Understanding of Each Other
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3">
        <div className="container mx-auto px-4">
          <nav className="text-sm">
            <Link href="/" className="text-gis-green hover:underline">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-600">About</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {/* Motto Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">OUR MOTTO</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700">"Understanding of Each Other"</h2>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-0 et_pb_row_fullwidth et_pb_equal_columns">
              {/* Mission - Dark Background */}
              <div className="bg-gray-900 text-white p-12 et_pb_column_1_2">
                <div className="et_pb_text et_pb_text_align_left et_pb_bg_layout_dark">
                  <h2 className="text-3xl font-bold mb-6">OUR MISSION</h2>
                  <p className="text-lg leading-relaxed">
                    To provide an internationally diverse school experience that instills an understanding of each other, promotes holistic development, life skills and learning through a rigorous curriculum that meets international standards
                  </p>
                </div>
              </div>
              
              {/* Vision - Light Background */}
              <div className="bg-gray-50 text-gray-800 p-12 et_pb_column_1_2">
                <div className="et_pb_text et_pb_text_align_left et_pb_bg_layout_light">
                  <h2 className="text-3xl font-bold mb-6">OUR VISION</h2>
                  <p className="text-lg leading-relaxed font-semibold">
                    A highly respected school, locally and internationally recognized, providing excellent education in a multicultural setting that produces responsible global citizens
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Our Values</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
              The core principles that guide our educational philosophy.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div key={value.title} className="bg-white p-6 rounded-xl shadow-lg h-full hover:shadow-xl transition-shadow">
                  <div className="w-14 h-14 bg-gis-green rounded-full flex items-center justify-center mb-4">
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Educational Objectives Tabs */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">OUR EDUCATIONAL OBJECTIVES</h2>
            
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Tab Navigation */}
              <div className="lg:w-1/4">
                <div className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left p-4 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? "bg-green-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {tab.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="lg:w-3/4">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  {tabs.find((tab) => tab.id === activeTab)?.content}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* School Info */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src="/images/logo1.jpg"
                  alt="ADJIS"
                  width={120}
                  height={60}
                  className="h-14 w-auto"
                />
                <h3 className="text-xl font-bold">Adorable Babies & Josemaria International School</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Providing internationally diverse education that instills understanding of each other and promotes holistic development.
              </p>
              <p className="text-sm text-gray-500">"Understanding of Each Other"</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About ADJIS</Link></li>
                <li><Link href="/about/our-history" className="text-gray-400 hover:text-white transition-colors">Our History</Link></li>
                <li><Link href="/about/jis-attributes" className="text-gray-400 hover:text-white transition-colors">ADJIS Attributes</Link></li>
                <li><Link href="/admissions" className="text-gray-400 hover:text-white transition-colors">Admissions</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📍 Accra, Ghana</li>
                <li>📞 +233 XXX XXX XXX</li>
                <li>✉️ info@jis.edu.gh</li>
                <li>🌐 www.jis.edu.gh</li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-500">
                &copy; 2025 Adorable Babies & Josemaria International School. All rights reserved.
              </p>
              <div className="flex gap-6">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Use</Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">Child Protection</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
