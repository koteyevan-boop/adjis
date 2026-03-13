"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Search, Menu, X, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  hideHero?: boolean;
}

type NavItem = {
  name: string;
  href: string;
  submenu?: NavItem[];
};

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  {
    name: "About",
    href: "/about",
    submenu: [
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
    submenu: [
      { name: "View Admissions", href: "/admissions" },
      { name: "Apply", href: "/admissions/apply" },
      { name: "FAQ", href: "/admissions#faq" },
    ],
  },
  {
    name: "Life In ADJIS",
    href: "/life",
    submenu: [
      { name: "News & Updates", href: "/news" },
      { name: "Memories", href: "/memories" },
      { name: "Calendar", href: "/calendar" },
    ],
  },
  {
    name: "Academics",
    href: "/academics",
    submenu: [
      {
        name: "Departments",
        href: "/academics/departments",
        submenu: [
          { name: "Pre-School", href: "/academics/preschool" },
          { name: "Primary School", href: "/academics/primary" },
        ],
      },
      { name: "Curriculum", href: "/academics/curriculum" },
    ],
  },
  {
    name: "Parents",
    href: "#",
    submenu: [{ name: "PTA", href: "#" }],
  },
  { name: "Alumni", href: "#" },
  { name: "Contact Us", href: "/contact" },
];

export default function PageLayout({ children, title, subtitle, backgroundImage, hideHero }: PageLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});

  return (
    <div className="min-h-screen flex flex-col">
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
              {navItems.map((item) => {
                const hasSubmenu = (item.submenu?.length ?? 0) > 0;

                if (!hasSubmenu) {
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-white text-sm font-medium px-3 py-2 hover:text-gis-gold transition-colors whitespace-nowrap"
                    >
                      {item.name}
                    </Link>
                  );
                }

                return (
                  <div key={item.name} className="relative">
                    <button
                      type="button"
                      className="flex items-center gap-1 text-white text-sm font-medium px-3 py-2 hover:text-gis-gold transition-colors whitespace-nowrap"
                      onClick={() => setDropdownOpen(dropdownOpen === item.name ? null : item.name)}
                    >
                      {item.name}
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>

                    {dropdownOpen === item.name && (
                      <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl py-2 z-50">
                        {item.submenu?.map((subItem) => {
                          const hasSubSub = (subItem.submenu?.length ?? 0) > 0;

                          if (!hasSubSub) {
                            return (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="block px-4 py-2 text-gray-700 hover:bg-gis-green hover:text-white transition-colors"
                                onClick={() => setDropdownOpen(null)}
                              >
                                {subItem.name}
                              </Link>
                            );
                          }

                          return (
                            <div key={subItem.name} className="px-4 py-2">
                              <div className="flex items-center justify-between text-gray-800 font-medium">
                                <span>{subItem.name}</span>
                                <ChevronDown className="w-3.5 h-3.5" />
                              </div>
                              <div className="mt-2 ml-2 border-l border-gray-200">
                                {subItem.submenu?.map((subSub) => (
                                  <Link
                                    key={subSub.name}
                                    href={subSub.href}
                                    className="block px-3 py-2 text-gray-700 hover:bg-gis-green hover:text-white transition-colors"
                                    onClick={() => setDropdownOpen(null)}
                                  >
                                    {subSub.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
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
              {navItems.map((item) => {
                const hasSubmenu = (item.submenu?.length ?? 0) > 0;
                const expanded = !!mobileExpanded[item.name];

                if (!hasSubmenu) {
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-3 text-gray-700 hover:bg-gis-green hover:text-white transition-colors border-b border-gray-100 last:border-0"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  );
                }

                return (
                  <div key={item.name} className="border-b border-gray-100 last:border-0">
                    <button
                      type="button"
                      className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gis-green hover:text-white transition-colors"
                      onClick={() =>
                        setMobileExpanded((prev) => ({
                          ...prev,
                          [item.name]: !prev[item.name],
                        }))
                      }
                    >
                      <span>{item.name}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                    </button>

                    {expanded && (
                      <div className="bg-gray-50">
                        {item.submenu?.map((subItem) => {
                          const hasSubSub = (subItem.submenu?.length ?? 0) > 0;
                          const subKey = `${item.name}__${subItem.name}`;
                          const subExpanded = !!mobileExpanded[subKey];

                          if (!hasSubSub) {
                            return (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="block px-6 py-2 text-gray-700 hover:bg-gis-green hover:text-white transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            );
                          }

                          return (
                            <div key={subItem.name}>
                              <button
                                type="button"
                                className="w-full flex items-center justify-between px-6 py-2 text-gray-700 hover:bg-gis-green hover:text-white transition-colors"
                                onClick={() =>
                                  setMobileExpanded((prev) => ({
                                    ...prev,
                                    [subKey]: !prev[subKey],
                                  }))
                                }
                              >
                                <span>{subItem.name}</span>
                                <ChevronDown className={`w-4 h-4 transition-transform ${subExpanded ? 'rotate-180' : ''}`} />
                              </button>
                              {subExpanded && (
                                <div className="bg-gray-100">
                                  {subItem.submenu?.map((subSub) => (
                                    <Link
                                      key={subSub.name}
                                      href={subSub.href}
                                      className="block px-8 py-2 text-gray-700 hover:bg-gis-green hover:text-white transition-colors"
                                      onClick={() => setMobileMenuOpen(false)}
                                    >
                                      {subSub.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </header>

      {/* Page Hero */}
      {!hideHero && (
        <section className="relative min-h-[400px] flex items-center justify-center">
          <div className="absolute inset-0">
            <Image
              src={backgroundImage || "/images/hero-bg.jpg"}
              alt="Page Header"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative z-10 text-center text-white px-4 pt-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
            {subtitle && <p className="text-xl text-white/80">{subtitle}</p>}
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="flex-1">{children}</main>

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
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-bold uppercase tracking-wider mb-4">Quick Links</h3>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/about" className="text-gray-300 hover:text-white">About Us</Link>
                <Link href="/admissions" className="text-gray-300 hover:text-white">Admissions</Link>
                <Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link>
                <Link href="#" className="text-gray-300 hover:text-white">Careers</Link>
              </div>
              <div className="flex gap-3 mt-6">
                <Link href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Facebook">
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Instagram">
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </Link>
                <Link href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="YouTube">
                  <Youtube className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-8 border-t border-white/20">
            <p className="text-sm text-gray-400">All rights reserved &copy; Adorable Babies & Josemaria International School</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
