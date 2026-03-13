"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Search, Menu, X } from "lucide-react";

// Navigation items
const navItems = [
  { name: "Home", href: "/" },
  {
    name: "About",
    href: "/about",
    subItems: [
      { name: "About GIS", href: "/about" },
      { name: "Our History", href: "/about#history" },
      { name: "Leadership Team", href: "/about#leadership" },
      { name: "Governing Body", href: "/about#governing" },
    ],
  },
  {
    name: "Admissions",
    href: "/admissions",
    subItems: [
      { name: "How to Apply", href: "/admissions" },
      { name: "Programs", href: "/admissions#programs" },
      { name: "Tuition & Fees", href: "/admissions#fees" },
      { name: "FAQ", href: "/admissions#faq" },
    ],
  },
  {
    name: "The GIS Experience",
    href: "#",
    subItems: [
      { name: "Student Life", href: "#" },
      { name: "Facilities", href: "#" },
      { name: "Activities", href: "#" },
    ],
  },
  { name: "GIS Boarding", href: "#" },
  { name: "Alumni", href: "#" },
  { name: "Contact Us", href: "/contact" },
];

interface HeaderProps {
  variant?: "transparent" | "solid";
}

export default function Header({ variant = "transparent" }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const bgClass = variant === "solid"
    ? "bg-gis-green shadow-lg"
    : "bg-transparent absolute";

  return (
    <header className={`${bgClass} top-0 left-0 right-0 z-50`}>
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
                <Link
                  href={item.href}
                  className="flex items-center gap-1 text-white text-sm font-medium px-3 py-2 hover:text-gis-gold transition-colors whitespace-nowrap"
                >
                  {item.name}
                  {item.subItems && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>
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
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-3 text-gray-700 hover:bg-gis-green hover:text-white transition-colors border-b border-gray-100 last:border-0"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
