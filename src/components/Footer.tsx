"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { toast } from "sonner";

// Accreditation logos
const accreditationLogos = [
  { name: "CIS", src: "/images/CIS.png" },
  { name: "NEASC", src: "/images/hero-bg.jpg" },
  { name: "AISA", src: "/images/AISA.png" },
  { name: "ECIS", src: "/images/ECIS.png" },
  { name: "YH", src: "/images/yh.png" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success("Successfully subscribed to our newsletter!", {
      description: "You'll receive updates about GIS news and events.",
    });

    setEmail("");
    setIsSubmitting(false);
  };

  return (
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
              Adorable Babies & Josemaria International School<br />
              2nd Circular Road, Cantonments<br />
              P.O.Box GP 2856<br />
              Accra, Ghana
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

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold uppercase tracking-wider mb-4">Newsletter</h3>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-white/10 border border-white/20 rounded text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-gis-green hover:bg-gis-green-light text-white font-semibold rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
            <p className="text-sm text-gray-400 mt-2">Get the latest news and updates from GIS</p>
            <div className="flex gap-3 mt-4">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer" aria-label="X">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </div>
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
                <Link href="#" className="block text-gray-300 hover:text-white">Parent</Link>
                <Link href="/portals/staff" className="block text-gray-300 hover:text-white">Staff</Link>
                <Link href="/portals/student" className="block text-gray-300 hover:text-white">Student</Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold uppercase tracking-wider mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link href="/about" className="block text-gray-300 hover:text-white">Student Life</Link>
                <Link href="/principal" className="block text-gray-300 hover:text-white">Principal's Message</Link>
                <Link href="/careers" className="block text-gray-300 hover:text-white">Careers</Link>
                <Link href="/about" className="block text-gray-300 hover:text-white">Boarding Program</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Accreditation Logos */}
        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-wrap items-center justify-center gap-6">
            {accreditationLogos.map((logo) => (
              <Image
                key={logo.name}
                src={logo.src}
                alt={logo.name}
                width={60}
                height={40}
                className="h-8 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 pt-4 border-t border-white/20">
          <p className="text-sm text-gray-400">All rights reserved &copy; Adorable Babies & Josemaria International School</p>
        </div>
      </div>
    </footer>
  );
}
