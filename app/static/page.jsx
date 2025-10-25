/* eslint-disable react-hooks/exhaustive-deps */

"use client"
import React, { useState, useEffect } from 'react';
import { ChevronRight, Shield, Zap, Leaf, Phone, Mail, MapPin, Star, ArrowRight, Menu, X } from 'lucide-react';
const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Commercial Developer",
        content: "The aluminum roofing exceeded all expectations. Quality installation and incredible durability.",
        rating: 5
    },
    {
        name: "Mike Rodriguez",
        role: "Homeowner",
        content: "Best investment we made for our home. Energy savings are noticeable from day one.",
        rating: 5
    },
    {
        name: "Lisa Chen",
        role: "Architect",
        content: "Perfect blend of aesthetics and functionality. Our clients love the modern appearance.",
        rating: 5
    }
];

const AluminumRoofingLanding = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [currentPage, setCurrentPage] = useState('home');
    const [quoteForm, setQuoteForm] = useState({
        name: '', email: '', phone: '', projectType: '', roofArea: '', location: '', message: ''
    });
    const [consultationForm, setConsultationForm] = useState({
        name: '', email: '', phone: '', preferredDate: '', preferredTime: '', projectType: '', budget: '', message: ''
    });

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [testimonials]);

    const handleQuoteSubmit = (e) => {
        e.preventDefault();
        alert('Quote request submitted! We\'ll contact you within 24 hours.');
        setQuoteForm({ name: '', email: '', phone: '', projectType: '', roofArea: '', location: '', message: '' });
        setCurrentPage('home');
    };

    const handleConsultationSubmit = (e) => {
        e.preventDefault();
        alert('Consultation scheduled! We\'ll confirm your appointment via email.');
        setConsultationForm({ name: '', email: '', phone: '', preferredDate: '', preferredTime: '', projectType: '', budget: '', message: '' });
        setCurrentPage('home');
    };

    const updateQuoteForm = (field, value) => {
        setQuoteForm(prev => ({ ...prev, [field]: value }));
    };

    const updateConsultationForm = (field, value) => {
        setConsultationForm(prev => ({ ...prev, [field]: value }));
    };

    // Rest of your component code (features, testimonials, stats arrays, etc.)
    const features = [
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Weather Resistant",
            description: "Superior protection against harsh weather conditions, UV rays, and corrosion for decades of reliability."
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Energy Efficient",
            description: "Reflective properties reduce cooling costs by up to 25%, keeping your building comfortable year-round."
        },
        {
            icon: <Leaf className="w-8 h-8" />,
            title: "Eco-Friendly",
            description: "100% recyclable aluminum construction supports sustainable building practices and green initiatives."
        }
    ];


    const stats = [
        { number: "25+", label: "Years Experience" },
        { number: "10K+", label: "Projects Completed" },
        { number: "98%", label: "Client Satisfaction" },
        { number: "50+", label: "Expert Team" }
    ];

    if (currentPage === 'quote') {
        return (
            <div className="min-h-screen bg-gray-900 text-white">
                {/* Quote Page Header */}
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <button
                            onClick={() => setCurrentPage('home')}
                            className="inline-flex items-center text-blue-200 hover:text-white mb-8 transition-colors duration-200">
                            <ArrowRight className="w-5 h-5 mr-2 transform rotate-180" />
                            Back to Home
                        </button>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Get Your Free Quote</h1>
                        <p className="text-xl text-blue-100">Tell us about your project and get a detailed estimate within 24 hours</p>
                    </div>
                </div>

                {/* Quote Form */}
                <div className="py-20">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <form onSubmit={handleQuoteSubmit} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={quoteForm.name}
                                        onChange={(e) => updateQuoteForm('name', e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                                        placeholder="Your full name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                                    <input
                                        type="email"
                                        required
                                        value={quoteForm.email}
                                        onChange={(e) => updateQuoteForm('email', e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                                    <input
                                        type="tel"
                                        required
                                        value={quoteForm.phone}
                                        onChange={(e) => updateQuoteForm('phone', e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                                        placeholder="(555) 123-4567"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Project Type *</label>
                                    <select
                                        required
                                        value={quoteForm.projectType}
                                        onChange={(e) => updateQuoteForm('projectType', e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                                    >
                                        <option value="">Select project type</option>
                                        <option value="residential">Residential Roofing</option>
                                        <option value="commercial">Commercial Building</option>
                                        <option value="industrial">Industrial Facility</option>
                                        <option value="repair">Roof Repair</option>
                                        <option value="replacement">Roof Replacement</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Roof Area (sq ft) *</label>
                                    <input
                                        type="number"
                                        required
                                        value={quoteForm.roofArea}
                                        onChange={(e) => updateQuoteForm('roofArea', e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                                        placeholder="e.g., 2000"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Location *</label>
                                    <input
                                        type="text"
                                        required
                                        value={quoteForm.location}
                                        onChange={(e) => updateQuoteForm('location', e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                                        placeholder="City, State"
                                    />
                                </div>
                            </div>
                            <div className="mb-8">
                                <label className="block text-sm font-medium text-gray-300 mb-2">Project Details</label>
                                <textarea
                                    rows="4"
                                    value={quoteForm.message}
                                    onChange={(e) => updateQuoteForm('message', e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                                    placeholder="Tell us more about your project, preferred materials, timeline, etc."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300"
                            >
                                Submit Quote Request
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    if (currentPage === 'consultation') {
        return (
            <div className="min-h-screen bg-gray-900 text-white">
                {/* Consultation Page Header */}
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <button
                            onClick={() => setCurrentPage('home')}
                            className="inline-flex items-center text-purple-200 hover:text-white mb-8 transition-colors duration-200">
                            <ArrowRight className="w-5 h-5 mr-2 transform rotate-180" />
                            Back to Home
                        </button>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Schedule Consultation</h1>
                        <p className="text-xl text-purple-100">Book a personalized consultation with our roofing experts</p>
                    </div>
                </div>

                {/* Consultation Form */}
                <div className="py-20">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <form onSubmit={handleConsultationSubmit} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={consultationForm.name}
                                        onChange={(e) => updateConsultationForm('name', e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                                        placeholder="Your full name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                                    <input
                                        type="email"
                                        required
                                        value={consultationForm.email}
                                        onChange={(e) => updateConsultationForm('email', e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                                    <input
                                        type="tel"
                                        required
                                        value={consultationForm.phone}
                                        onChange={(e) => updateConsultationForm('phone', e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                                        placeholder="(555) 123-4567"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Date *</label>
                                    <input
                                        type="date"
                                        required
                                        value={consultationForm.preferredDate}
                                        onChange={(e) => updateConsultationForm('preferredDate', e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Time *</label>
                                    <select
                                        required
                                        value={consultationForm.preferredTime}
                                        onChange={(e) => updateConsultationForm('preferredTime', e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                                    >
                                        <option value="">Select time</option>
                                        <option value="9:00 AM">9:00 AM</option>
                                        <option value="10:00 AM">10:00 AM</option>
                                        <option value="11:00 AM">11:00 AM</option>
                                        <option value="1:00 PM">1:00 PM</option>
                                        <option value="2:00 PM">2:00 PM</option>
                                        <option value="3:00 PM">3:00 PM</option>
                                        <option value="4:00 PM">4:00 PM</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Project Type</label>
                                    <select
                                        value={consultationForm.projectType}
                                        onChange={(e) => updateConsultationForm('projectType', e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                                    >
                                        <option value="">Select project type</option>
                                        <option value="new-construction">New Construction</option>
                                        <option value="replacement">Roof Replacement</option>
                                        <option value="repair">Roof Repair</option>
                                        <option value="maintenance">Maintenance</option>
                                        <option value="consultation">General Consultation</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Budget Range</label>
                                    <select
                                        value={consultationForm.budget}
                                        onChange={(e) => updateConsultationForm('budget', e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                                    >
                                        <option value="">Select budget range (optional)</option>
                                        <option value="under-10k">Under $10,000</option>
                                        <option value="10k-25k">$10,000 - $25,000</option>
                                        <option value="25k-50k">$25,000 - $50,000</option>
                                        <option value="50k-100k">$50,000 - $100,000</option>
                                        <option value="over-100k">Over $100,000</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-8">
                                <label className="block text-sm font-medium text-gray-300 mb-2">Additional Information</label>
                                <textarea
                                    rows="4"
                                    value={consultationForm.message}
                                    onChange={(e) => updateConsultationForm('message', e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                                    placeholder="Any specific questions or details about your project..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300"
                            >
                                Schedule Consultation
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    // Main home page content
    return (
        <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
            {/* Navigation */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-gray-900/95 backdrop-blur-md' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                            Benevis Aluminium
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-8">
                            {['Home', 'Services', 'About', 'Contact'].map((item) => (
                                <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-blue-400 transition-colors duration-200 font-medium">
                                    {item}
                                </a>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-gray-900/95 backdrop-blur-md">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {['Home', 'Products', 'Services', 'About', 'Contact'].map((item) => (
                                <a key={item} href={`#${item.toLowerCase()}`} className="block px-3 py-2 hover:text-blue-400 transition-colors duration-200">
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section id="home" className="relative min-h-screen flex items-center justify-center">
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="animate-fade-in-up">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent leading-tight">
                            Premium Aluminum
                            <br />
                            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                                Roofing Solutions
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Transform your property with cutting-edge aluminum roofing technology.
                            Durable, energy-efficient, and designed to last a lifetime.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => setCurrentPage('quote')}
                                className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300"
                            >
                                Get Free Quote
                                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                            </button>
                            <button
                                onClick={() => setCurrentPage('consultation')}
                                className="px-8 py-4 border-2 border-gray-600 rounded-lg font-semibold text-lg hover:border-blue-400 hover:text-blue-400 hover:shadow-lg hover:shadow-blue-400/20 transition-all duration-300"
                            >
                                Schedule Consultation
                            </button>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-blue-400 rounded-full animate-bounce mt-2"></div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center transform hover:scale-105 transition-transform duration-300">
                                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-400 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="services" className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Why Choose Our
                            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"> Aluminum Roofing?</span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Our premium aluminum roofing sheets combine advanced engineering with exceptional durability
                            to deliver unmatched performance and value.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                                <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 h-full">
                                    <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors duration-300">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-900">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-16">
                        What Our <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Clients Say</span>
                    </h2>

                    <div className="relative">
                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 md:p-12 transition-all duration-500">
                            <div className="flex justify-center mb-6">
                                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <blockquote className="text-xl md:text-2xl text-gray-200 mb-8 italic">
                                &ldquo;{testimonials[currentTestimonial].content}&ldquo;
                            </blockquote>
                            <div className="text-blue-400 font-semibold text-lg">
                                {testimonials[currentTestimonial].name}
                            </div>
                            <div className="text-gray-400">
                                {testimonials[currentTestimonial].role}
                            </div>
                        </div>

                        {/* Testimonial Indicators */}
                        <div className="flex justify-center mt-8 space-x-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentTestimonial(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentTestimonial ? 'bg-blue-400' : 'bg-gray-600'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Roofing Sheet Types Grid */}
            <section className="py-20 bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Types of <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Roofing Sheets</span>
                        </h2>
                        <p className="text-lg text-gray-300">Choose from our extensive range of aluminum roofing profiles</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[
                            { name: "Corrugated", profile: "Standard Wave", gauge: "26-29 Gauge" },
                            { name: "Standing Seam", profile: "Vertical Panels", gauge: "24-26 Gauge" },
                            { name: "Tile Profile", profile: "Spanish Style", gauge: "26-28 Gauge" },
                            { name: "Ribbed", profile: "Deep Ribs", gauge: "24-27 Gauge" },
                            { name: "Trapezoidal", profile: "76/18 Profile", gauge: "26-29 Gauge" },
                            { name: "Box Profile", profile: "Square Ribs", gauge: "24-26 Gauge" },
                            { name: "Sinusoidal", profile: "Curved Wave", gauge: "26-28 Gauge" },
                            { name: "Industrial", profile: "Heavy Duty", gauge: "22-24 Gauge" }
                        ].map((type, index) => (
                            <div key={index} className="group relative">
                                <div className="bg-gray-700/50 backdrop-blur-sm border border-gray-600 rounded-xl p-6 hover:border-blue-500/50 hover:bg-gray-700/70 transition-all duration-300 transform hover:scale-105">
                                    {/* Visual representation of profile */}
                                    <div className="h-16 mb-4 bg-gradient-to-r from-gray-600 to-gray-500 rounded-lg relative overflow-hidden">
                                        <div className="absolute inset-0 opacity-30">
                                            {/* Different patterns for different sheet types */}
                                            {type.name === "Corrugated" && (
                                                <div className="h-full bg-repeat-x" style={{
                                                    backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(255,255,255,0.3) 8px, rgba(255,255,255,0.3) 16px)',
                                                }}></div>
                                            )}
                                            {type.name === "Standing Seam" && (
                                                <div className="h-full bg-repeat-x" style={{
                                                    backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,0.4) 20px, rgba(255,255,255,0.4) 24px)',
                                                }}></div>
                                            )}
                                            {type.name === "Ribbed" && (
                                                <div className="h-full bg-repeat-x" style={{
                                                    backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(255,255,255,0.5) 6px, rgba(255,255,255,0.5) 8px)',
                                                }}></div>
                                            )}
                                            {(type.name === "Tile Profile" || type.name === "Sinusoidal") && (
                                                <div className="h-full bg-repeat-x" style={{
                                                    backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(255,255,255,0.3) 10px, rgba(255,255,255,0.3) 14px)',
                                                }}></div>
                                            )}
                                            {!["Corrugated", "Standing Seam", "Ribbed", "Tile Profile", "Sinusoidal"].includes(type.name) && (
                                                <div className="h-full bg-repeat-x" style={{
                                                    backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 12px, rgba(255,255,255,0.3) 12px, rgba(255,255,255,0.3) 18px)',
                                                }}></div>
                                            )}
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                                        {type.name}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-1">{type.profile}</p>
                                    <p className="text-blue-300 text-sm font-medium">{type.gauge}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300">
                            View All Specifications
                        </button>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Ready to Upgrade Your
                            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"> Roofing?</span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Get in touch with our experts for a personalized consultation and free quote.
                            We &ldquo;re here to bring your roofing vision to life.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        {[
                            { icon: <Phone className="w-8 h-8" />, title: "Call Us", info: "+1 (555) 123-4567" },
                            { icon: <Mail className="w-8 h-8" />, title: "Email Us", info: "info@aluminishield.com" },
                            { icon: <MapPin className="w-8 h-8" />, title: "Visit Us", info: "123 Industrial Ave, City, ST 12345" }
                        ].map((contact, index) => (
                            <div key={index} className="text-center group">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {contact.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{contact.title}</h3>
                                <p className="text-gray-300">{contact.info}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <button
                            onClick={() => setCurrentPage('consultation')}
                            className="group px-12 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold text-xl hover:shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300"
                        >
                            Schedule Consultation
                            <ChevronRight className="inline-block ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 border-t border-gray-800 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-4 md:mb-0">
                            AluminiShield
                        </div>
                        <div className="text-gray-400 text-center md:text-right">
                            <p>&copy; 2024 AluminiShield. All rights reserved.</p>
                            <p className="text-sm mt-1">Premium aluminum roofing solutions for modern buildings.</p>
                        </div>
                    </div>
                </div>
            </footer>

            <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
      `}</style>
        </div>
    );
};

export default AluminumRoofingLanding;