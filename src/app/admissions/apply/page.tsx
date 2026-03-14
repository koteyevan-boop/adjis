"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

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
  { name: "Careers", href: "#" },
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
      { name: "Student Portal", href: "/portals/student" }
    ]
  },
  { 
    name: "Contact Us", 
    href: "/contact",
    submenu: []
  },
];

const secondaryNavItems = [
  { name: "Staff Portal", href: "/portals/staff" },
  { name: "Parent Portal", href: "/portals" },
];

const countries = [
  "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", 
  "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", 
  "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", 
  "Bolivia", "Bonaire, Saint Eustatius and Saba", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", 
  "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", 
  "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Cayman Islands", "Central African Republic", "Chad", 
  "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", 
  "Cook Islands", "Costa Rica", "Croatia", "Cuba", "Curaçao", "Cyprus", "Czechia", "Denmark", "Djibouti", 
  "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", 
  "Estonia", "Eswatini", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", 
  "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", 
  "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", 
  "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard Island and McDonald Islands", 
  "Holy See", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", 
  "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", 
  "Kazakhstan", "Kenya", "Kiribati", "Korea", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", 
  "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", 
  "Macao", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", 
  "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia", "Moldova", "Monaco", 
  "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", 
  "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", 
  "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestine", 
  "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", 
  "Puerto Rico", "Qatar", "Republic of Korea", "Republic of Moldova", "Réunion", "Romania", 
  "Russian Federation", "Rwanda", "Saint Barthélemy", "Saint Helena", "Saint Kitts and Nevis", 
  "Saint Lucia", "Saint Martin", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", 
  "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", 
  "Sierra Leone", "Singapore", "Sint Maarten", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", 
  "South Africa", "South Georgia and the South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", 
  "Sudan", "Suriname", "Svalbard and Jan Mayen", "Sweden", "Switzerland", "Syrian Arab Republic", 
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", 
  "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", 
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", 
  "Uzbekistan", "Vanuatu", "Venezuela", "Viet Nam", "Virgin Islands (British)", "Virgin Islands (U.S.)", 
  "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"
];

export default function ApplyPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Details
    full_name: "",
    email: "",
    mobile_number: "",
    occupation: "",
    place_of_work: "",
    nationality: "",
    address_type: "",
    residential_address: "",
    country: "",
    state: "",
    city: "",
    zip_code: "",
    // Student Details
    student_first_name: "",
    student_last_name: "",
    date_of_birth: "",
    gender: "",
    student_nationality: "",
    current_school: "",
    current_class: "",
    language_spoken_at_home: "",
    relations: "",
    interest: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
    alert("Application submitted successfully!");
  };

  const nextStep = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

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
                        item.name === "Admissions" ? "text-gis-green" : ""
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
                          <li key={subitem.name}>
                            <Link
                              href={subitem.href}
                              className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gis-green transition-colors"
                            >
                              {subitem.name}
                            </Link>
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
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subitem.name}
                            </Link>
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
      <section className="relative h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt="Apply to ADJIS"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Apply to ADJIS</h1>
          <p className="text-xl text-white/90">Start your journey with Adorable Babies & Josemaria International School</p>
        </div>
      </section>

      {/* Application Form */}
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className={`flex items-center ${currentStep >= 1 ? 'text-gis-green' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-gis-green text-white' : 'bg-gray-300'}`}>
                    1
                  </div>
                  <span className="ml-2 font-medium">Personal Details</span>
                </div>
                <div className={`flex items-center ${currentStep >= 2 ? 'text-gis-green' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-gis-green text-white' : 'bg-gray-300'}`}>
                    2
                  </div>
                  <span className="ml-2 font-medium">Student Details</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gis-green h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 2) * 100}%` }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Details */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Personal Details</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                        <input
                          type="text"
                          name="full_name"
                          value={formData.full_name}
                          onChange={handleInputChange}
                          placeholder="Enter your name"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gis-green focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gis-green focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
                        <input
                          type="tel"
                          name="mobile_number"
                          value={formData.mobile_number}
                          onChange={handleInputChange}
                          placeholder="Enter mobile number"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gis-green focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Occupation *</label>
                        <input
                          type="text"
                          name="occupation"
                          value={formData.occupation}
                          onChange={handleInputChange}
                          placeholder="Enter your occupation"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gis-green focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Place of Work *</label>
                        <input
                          type="text"
                          name="place_of_work"
                          value={formData.place_of_work}
                          onChange={handleInputChange}
                          placeholder="Enter your place of work"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gis-green focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nationality *</label>
                        <select
                          name="nationality"
                          value={formData.nationality}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gis-green focus:border-transparent"
                        >
                          <option value="">Select nationality</option>
                          {countries.map(country => (
                            <option key={country} value={country}>{country}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Address Details</h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address Type *</label>
                        <select
                          name="address_type"
                          value={formData.address_type}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gis-green focus:border-transparent"
                        >
                          <option value="">Select Address Type</option>
                          <option value="Permanent">Permanent</option>
                          <option value="Temporary">Temporary</option>
                          <option value="Others">Others</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Residential Address *</label>
                        <input
                          type="text"
                          name="residential_address"
                          value={formData.residential_address}
                          onChange={handleInputChange}
                          placeholder="Enter your address"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gis-green focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gis-green focus:border-transparent"
                        >
                          <option value="">Select country</option>
                          {countries.map(country => (
                            <option key={country} value={country}>{country}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="Enter your state"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gis-green focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Enter your city"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gis-green focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code *</label>
                        <input
                          type="text"
                          name="zip_code"
                          value={formData.zip_code}
                          onChange={handleInputChange}
                          placeholder="Enter your zipcode"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gis-green focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-gis-green text-white px-6 py-3 rounded-lg hover:bg-gis-green-dark transition-colors"
                    >
                      Next Step →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Student Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Student Details</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                        <input
                          type="text"
                          name="student_first_name"
                          value={formData.student_first_name}
                          onChange={handleInputChange}
                          placeholder="Enter first name"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gis-green focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                        <input
                          type="text"
                          name="student_last_name"
                          value={formData.student_last_name}
                          onChange={handleInputChange}
                          placeholder="Enter last name"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gis-green focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                        <input
                          type="date"
                          name="date_of_birth"
                          value={formData.date_of_birth}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gis-green focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gis-green focus:border-transparent"
                        >
                          <option value="">Select gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Others">Others</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nationality *</label>
                        <select
                          name="student_nationality"
                          value={formData.student_nationality}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gis-green focus:border-transparent"
                        >
                          <option value="">Select nationality</option>
                          {countries.map(country => (
                            <option key={country} value={country}>{country}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current School *</label>
                        <input
                          type="text"
                          name="current_school"
                          value={formData.current_school}
                          onChange={handleInputChange}
                          placeholder="Enter current school"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gis-green focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Class *</label>
                        <select
                          name="current_class"
                          value={formData.current_class}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gis-green focus:border-transparent"
                        >
                          <option value="">Select class</option>
                          <option value="Pre-School">Pre-School</option>
                          <option value="Pre-K">Pre-K</option>
                          <option value="Reception">Reception</option>
                          <option value="Grade 1">Grade 1</option>
                          <option value="Grade 2">Grade 2</option>
                          <option value="Grade 3">Grade 3</option>
                          <option value="Grade 4">Grade 4</option>
                          <option value="Grade 5">Grade 5</option>
                          <option value="Grade 6">Grade 6</option>
                          <option value="Grade 7">Grade 7</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Language Spoken At Home *</label>
                        <input
                          type="text"
                          name="language_spoken_at_home"
                          value={formData.language_spoken_at_home}
                          onChange={handleInputChange}
                          placeholder="Enter Language"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gis-green focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Relations *</label>
                        <select
                          name="relations"
                          value={formData.relations}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gis-green focus:border-transparent"
                        >
                          <option value="">Select relations</option>
                          <option value="Mother">Mother</option>
                          <option value="Father">Father</option>
                          <option value="Grandparents">Grandparents</option>
                          <option value="Guardians">Guardians</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Interest *</label>
                        <select
                          name="interest"
                          value={formData.interest}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gis-green focus:border-transparent"
                        >
                          <option value="">Select interest</option>
                          <option value="Music">Music</option>
                          <option value="Arts">Arts</option>
                          <option value="Home Science">Home Science</option>
                          <option value="Technology">Technology</option>
                          <option value="Sports">Sports</option>
                          <option value="Dance">Dance</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      ← Previous
                    </button>
                    <button
                      type="submit"
                      className="bg-gis-green text-white px-6 py-3 rounded-lg hover:bg-gis-green-dark transition-colors"
                    >
                      Submit Application
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
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
              <p className="text-sm text-gray-500">"Nurturing Little Steps to Big Steps"</p>
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
