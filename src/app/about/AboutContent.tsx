"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface TabItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export default function AboutContent() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [openAccordion, setOpenAccordion] = useState<string | null>("accordion1");

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
          <div className="mt-4 flex justify-center">
            <Image
              src="/images/educational-objectives-1.jpg"
              alt="Educational Objectives"
              width={500}
              height={225}
              className="rounded-lg"
            />
          </div>
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
          <div className="mt-4 flex justify-center">
            <Image
              src="/images/educational-objectives-2.jpg"
              alt="Personal Values"
              width={500}
              height={225}
              className="rounded-lg"
            />
          </div>
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
          <div className="mt-4 flex justify-center">
            <Image
              src="/images/educational-objectives-3.jpg"
              alt="Diversity Respect"
              width={500}
              height={225}
              className="rounded-lg"
            />
          </div>
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
          <div className="mt-4 flex justify-center">
            <Image
              src="/images/educational-objectives-4.png"
              alt="Educational Facility"
              width={500}
              height={225}
              className="rounded-lg"
            />
          </div>
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
          <div className="mt-4 flex justify-center">
            <Image
              src="/images/educational-objectives-5.jpg"
              alt="Global Concerns"
              width={500}
              height={225}
              className="rounded-lg"
            />
          </div>
        </div>
      )
    }
  ];

  const accordionItems: AccordionItem[] = [
    {
      id: "accordion1",
      title: "To Maintain A High Academic Standard That:",
      content: (
        <ul className="space-y-2">
          <li>Delivers a broad curriculum that draws from various teaching methods, with English as the language of instruction;</li>
          <li>Offers the students opportunities to develop lively, enquiring minds and independent thinking;</li>
          <li>Encourages participation in co-curricular activities;</li>
          <li>Provides opportunities and encouragement for the professional development of staff;</li>
          <li>Identifies and meets the needs of students, except when student(s) special educational needs cannot be met within the school's resources;</li>
          <li>Keeps abreast of trends in education and ensures that the curriculum remains relevant and dynamic.</li>
        </ul>
      )
    },
    {
      id: "accordion2",
      title: "To Promote Positive Personal Values That:",
      content: (
        <ul className="space-y-2">
          <li>Cultivate integrity in students;</li>
          <li>Prepare students to become responsible, creative, self reliant and productive members of the global community;</li>
          <li>Encourage effective teamwork;</li>
          <li>Foster a lifelong love of learning.</li>
        </ul>
      )
    },
    {
      id: "accordion3",
      title: "To Ensure Understanding Of And Respect For Diversity That:",
      content: (
        <ul className="space-y-2">
          <li>Provides students with opportunities to share their cultures to promote 'understanding of each other';</li>
          <li>Promotes knowledge and understanding of Ghana;</li>
          <li>Promotes respect for other cultures, beliefs, nationalities, gender and persons with different abilities</li>
        </ul>
      )
    },
    {
      id: "accordion4",
      title: "To Develop A Positive Educational Facility That:",
      content: (
        <ul className="space-y-2">
          <li>Provides a nurturing, secure, clean and friendly learning environment where students can grow intellectually, socially, emotionally and physically;</li>
          <li>Provides sufficient resources to create and maintain a stimulating learning environment.</li>
        </ul>
      )
    },
    {
      id: "accordion5",
      title: "To Promote Understanding Of And Participation In Global Concerns That:",
      content: (
        <ul className="space-y-2">
          <li>Encourage students to regard the natural world as their inheritance and their responsibility;</li>
          <li>Recognise the need to protect and sustain the local and global environment;</li>
          <li>Foster a fundamental understanding of and respect for the rights and freedom of each individual in our community and the wider world in the spirit of the UN Declaration of Human Rights;</li>
          <li>Encourage each student's participation in community service.</li>
        </ul>
      )
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="About Adorable Babies & Josemaria International School"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About GIS</h1>
          <p className="text-xl text-white/80">Understanding of Each Other</p>
        </div>
      </section>

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
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900 text-white p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">OUR MISSION</h2>
              <p className="text-gray-300">
                To provide an internationally diverse school experience that instills an understanding of each other, promotes holistic development, life skills and learning through a rigorous curriculum that meets international standards
              </p>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">OUR VISION</h2>
              <p className="text-gray-700 font-semibold">
                A highly respected school, locally and internationally recognized, providing excellent education in a multicultural setting that produces responsible global citizens
              </p>
            </div>
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

      {/* Strategic Plan Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            <strong>Designed for the Future – GIS Strategic Plan 2025–2030</strong>
          </h1>
          <div className="bg-gray-100 p-8 rounded-lg">
            <p className="text-gray-600 mb-4">
              Strategic plan document would be embedded here
            </p>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
              Download Strategic Plan
            </button>
          </div>
        </div>
      </section>

      {/* Educational Objectives Accordion */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">OUR EDUCATIONAL OBJECTIVES</h2>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {accordionItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md">
                <button
                  onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <span className="text-2xl">
                    {openAccordion === item.id ? "−" : "+"}
                  </span>
                </button>
                {openAccordion === item.id && (
                  <div className="p-6 pt-0">
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
