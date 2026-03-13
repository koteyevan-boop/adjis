"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Music, TreePine, Drum, Users, Calculator, Bot } from "lucide-react";

interface Program {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  icon: React.ReactNode;
}

interface Activity {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
}

export default function ExtraCurricularContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const programs: Program[] = [
    {
      id: "music",
      title: "Music",
      description: "Learn instruments, vocal training, and music theory in our comprehensive music program",
      image: "/images/hero.jpg",
      category: "performing",
      icon: <Music className="w-8 h-8" />
    },
    {
      id: "planting",
      title: "Planting & Gardening",
      description: "Connect with nature through gardening activities and learn about plant life and sustainability",
      image: "/images/hero.jpg",
      category: "creative",
      icon: <TreePine className="w-8 h-8" />
    },
    {
      id: "drumming",
      title: "Drumming",
      description: "Master traditional and modern drumming techniques while developing rhythm and coordination",
      image: "/images/hero.jpg",
      category: "performing",
      icon: <Drum className="w-8 h-8" />
    },
    {
      id: "ballet",
      title: "Ballet",
      description: "Develop grace, discipline, and artistic expression through classical ballet training",
      image: "/images/hero.jpg",
      category: "performing",
      icon: <Users className="w-8 h-8" />
    },
    {
      id: "abacus",
      title: "Abacus",
      description: "Enhance mental math skills and concentration through ancient abacus calculation methods",
      image: "/images/hero.jpg",
      category: "academic",
      icon: <Calculator className="w-8 h-8" />
    },
    {
      id: "robotics",
      title: "Coding & Robotics",
      description: "Build and program robots while developing problem-solving and technical skills",
      image: "/images/hero.jpg",
      category: "technology",
      icon: <Bot className="w-8 h-8" />
    }
  ];

  const activities: Activity[] = [
    {
      id: "discover",
      title: "Discover Your Passion",
      description: "Whether your child is an aspiring artist, a budding athlete, a future scientist, or a natural-born leader, we have a variety of extracurricular activities to suit their interests. Our diverse array of clubs, teams, and organizations allow students to explore and cultivate their passions outside of their regular academic studies.",
      image: "/images/students-bg.jpg",
      features: ["Diverse Options", "Expert Guidance", "Skill Development"]
    },
    {
      id: "academic",
      title: "Academic Enrichment",
      description: "In addition to academic studies, we provide various academic enrichment opportunities to challenge and inspire curious minds. Students can participate in Science Olympiad, Math Club, Model United Nations, and more, where they can expand their knowledge and engage in intellectual pursuits beyond the classroom.",
      image: "/images/stu.jpg",
      features: ["Science Olympiad", "Math Club", "Intellectual Pursuits"]
    },
    {
      id: "leadership",
      title: "Leadership and Service",
      description: "We believe in nurturing leadership qualities and fostering a sense of social responsibility in our students. Our leadership and service programs such as Model United Nations empower students to take on leadership roles, initiate positive change, and make a difference in their community.",
      image: "/images/students-bg.jpg",
      features: ["Student Government", "Community Service", "Social Responsibility"]
    },
    {
      id: "experiences",
      title: "Unforgettable Experiences",
      description: "Participating in extracurricular activities at Adorable Babies & Josemaria International School not only offers students a chance to explore their interests but also creates lasting memories and friendships. Whether it's a thrilling sports victory, an awe-inspiring performance, or a meaningful community service event, these experiences enrich their school life.",
      image: "/images/stu.jpg",
      features: ["Lasting Memories", "Friendships", "Personal Growth"]
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
    alert("Thank you for your inquiry. We will get back to you soon!");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "creative":
        return "bg-orange-500";
      case "athletic":
        return "bg-blue-500";
      case "performing":
        return "bg-green-500";
      case "leadership":
        return "bg-purple-500";
      case "technology":
        return "bg-indigo-500";
      case "academic":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt="An Arena For Challenge - Adorable Babies & Josemaria International School"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-orange-400">
            An Arena For Challenge
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Discover endless opportunities for growth and exploration at J.I.S
          </p>
        </div>
      </section>

      {/* About Program Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-orange-500 mb-4">About Our Program</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-800">
                  Extracurricular Program
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We are thrilled to introduce you to the vibrant world of Extra-Curricular Activities (ECAs) at Adorable Babies & Josemaria International School. Beyond the traditional classroom setting, ECAs provide a unique opportunity for our students to explore, learn, and grow in ways that go beyond textbooks and examinations.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  At Adorable Babies & Josemaria International School, we firmly believe that education extends far beyond academic subjects. ECAs are an integral part of our holistic approach to nurturing well-rounded individuals. These activities serve as a dynamic platform for our students to unleash their talents, discover new interests, and develop essential life skills.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Our ECA program is a diverse tapestry of options, ranging from arts and sports to technology and community service. Whether your child is drawn to the performing arts, excels on the sports field, or has a passion for robotics and coding, we have something to inspire and challenge every young mind.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <Image
                  src="/images/hero.jpg"
                  alt="Extracurricular Activities"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          {activities.map((activity, index) => (
            <div key={activity.id} className="mb-16 last:mb-0">
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div>
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg w-full"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 relative">
                    <span className="relative z-10">{activity.title}</span>
                    <span className="absolute bottom-0 left-0 w-full h-3 bg-orange-200 opacity-50 -z-10"></span>
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {activity.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {activity.features.map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Programs Grid Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-orange-500 mb-4">Our Programs</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <div
                key={program.id}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-64">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 ${getCategoryColor(program.category)} opacity-0 group-hover:opacity-80 transition-opacity duration-300`}></div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                    <div className={`${getCategoryColor(program.category).replace('bg-', 'text-')}`}>
                      {program.icon}
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <div className="text-white">
                        {program.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white">{program.title}</h3>
                  </div>
                  <p className="text-white/90 text-sm ml-11">{program.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-4xl font-bold text-orange-400 mb-6">Information</h2>
              <p className="text-gray-300 mb-8">
                Our offices are open during the working days of the week. School administration does not work on weekends but can be reached through our social links. We await your call.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <i className="fas fa-envelope text-white"></i>
                  </div>
                  <div>
                    <p className="text-orange-400 font-semibold">Email</p>
                    <p className="text-gray-300">info@jis.edu.gh</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <i className="fas fa-phone text-white"></i>
                  </div>
                  <div>
                    <p className="text-orange-400 font-semibold">Phone</p>
                    <p className="text-gray-300">+233 24 029 8211</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <i className="fas fa-map-marker-alt text-white"></i>
                  </div>
                  <div>
                    <p className="text-orange-400 font-semibold">Address</p>
                    <p className="text-gray-300">2nd Circular Road, Cantonments, Accra, Ghana</p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                  <i className="fab fa-facebook text-white"></i>
                </a>
                <a href="#" className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                  <i className="fab fa-twitter text-white"></i>
                </a>
                <a href="#" className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                  <i className="fab fa-linkedin text-white"></i>
                </a>
                <a href="#" className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                  <i className="fab fa-instagram text-white"></i>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-4xl font-bold text-orange-400 mb-6">Contact Us</h2>
              <p className="text-gray-300 mb-8">
                For tour bookings, parents can schedule for the weekends in case of a busy schedule. We await your call.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email Address"
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400"
                    />
                  </div>
                </div>
                
                <div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400"
                  />
                </div>
                
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <Image
              src="/images/logo1.jpg"
              alt="Adorable Babies & Josemaria International School"
              width={160}
              height={80}
              className="h-16 w-auto"
            />
          </div>
          <p className="text-gray-400">
            Copyright &copy; {new Date().getFullYear()} Adorable Babies & Josemaria International School. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
