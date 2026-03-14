"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";

interface Attribute {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  color: string;
}

export default function JISAttributesPage() {
  const [selectedAttribute, setSelectedAttribute] = useState<string | null>(null);

  const attributes: Attribute[] = [
    {
      id: "think-critically",
      title: "THINK CRITICALLY",
      description: "At Adorable Babies & Josemaria International School, we cultivate analytical minds that question, analyze, and evaluate information from multiple perspectives. Our students develop the ability to think independently, solve complex problems systematically, and make informed decisions based on evidence and logical reasoning. This essential skill prepares them for academic excellence and real-world challenges.",
      image: "/images/stu.jpg",
      icon: "🧠",
      color: "bg-blue-500"
    },
    {
      id: "socially-responsible",
      title: "BE SOCIALLY RESPONSIBLE",
      description: "We nurture global citizens who understand their role in creating positive change. Through community service projects, environmental initiatives, and cultural exchange programs, our students develop empathy, compassion, and a strong sense of social responsibility. They learn to respect diversity, contribute to their communities, and become agents of positive change in the world.",
      image: "/images/stu.jpg",
      icon: "🤝",
      color: "bg-green-500"
    },
    {
      id: "communicate-effectively",
      title: "COMMUNICATE EFFECTIVELY",
      description: "Effective communication is at the heart of our educational approach. Students develop strong verbal and written communication skills, learn to articulate ideas clearly, listen actively, and engage in meaningful dialogue. We emphasize public speaking, presentation skills, and the ability to communicate across different cultures and contexts.",
      image: "/images/stu.jpg",
      icon: "💬",
      color: "bg-purple-500"
    },
    {
      id: "innovate-create",
      title: "INNOVATE & CREATE",
      description: "Creativity and innovation are encouraged across all subjects. Our students learn to think outside the box, approach challenges with creative solutions, and express themselves through various artistic and technological mediums. We provide opportunities for project-based learning, design thinking, and entrepreneurial mindset development.",
      image: "/images/stu.jpg",
      icon: "💡",
      color: "bg-orange-500"
    },
    {
      id: "lead-confidently",
      title: "LEAD CONFIDENTLY",
      description: "Leadership skills are developed through various opportunities including student council, team projects, and extracurricular activities. Our students learn to lead with integrity, inspire others, make responsible decisions, and work collaboratively towards common goals. They develop the confidence to take initiative and become positive influencers.",
      image: "/images/stu.jpg",
      icon: "👑",
      color: "bg-red-500"
    },
    {
      id: "embrace-diversity",
      title: "EMBRACE DIVERSITY",
      description: "Our multicultural environment celebrates diversity in all its forms. Students learn to appreciate different cultures, perspectives, and backgrounds. We foster an inclusive community where everyone feels valued and respected, preparing our students to thrive in a globalized world and work effectively with people from diverse backgrounds.",
      image: "/images/stu.jpg",
      icon: "🌍",
      color: "bg-indigo-500"
    }
  ];

  return (
    <PageLayout title="ADJIS Attributes" hideHero>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative h-96 md:h-[520px]">
          <Image
            src="/images/hero.jpg"
            alt="ADJIS Attributes"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/75 to-purple-600/75" />
          <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
            <div className="text-center max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">ADJIS Attributes</h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                The core values and skills that define our students' success
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="bg-gray-100 py-3">
          <div className="container mx-auto px-4">
            <nav className="text-sm">
              <Link href="/" className="text-blue-600 hover:underline">Home</Link>
              <span className="mx-2 text-gray-400">/</span>
              <Link href="/about" className="text-blue-600 hover:underline">About</Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-600">ADJIS Attributes</span>
            </nav>
          </div>
        </div>

        {/* Introduction */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Core Attributes</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                At ADJIS, we focus on developing these six core attributes that prepare our students 
                for success in an ever-changing world. Each attribute is integrated into our curriculum 
                and school culture, ensuring our students graduate as well-rounded individuals.
              </p>
            </div>
          </div>
        </section>

        {/* Attributes Grid */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {attributes.map((attribute, index) => (
                <div
                  key={attribute.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => setSelectedAttribute(selectedAttribute === attribute.id ? null : attribute.id)}
                >
                  <div className="relative h-48">
                    <Image
                      src={attribute.image}
                      alt={attribute.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className={`${attribute.color} w-12 h-12 rounded-full flex items-center justify-center mb-3`}>
                        <span className="text-2xl">{attribute.icon}</span>
                      </div>
                      <h3 className="text-white font-bold text-lg">{attribute.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 leading-relaxed">
                      {selectedAttribute === attribute.id ? attribute.description : `${attribute.description.substring(0, 150)}...`}
                    </p>
                    {selectedAttribute !== attribute.id && (
                      <button className="text-blue-600 font-medium mt-4 hover:text-blue-700">
                        Read More →
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Experience the ADJIS Difference</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our community and watch your child develop these essential attributes for success.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/admissions"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Apply Now
              </Link>
              <Link
                href="/contact"
                className="border border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
