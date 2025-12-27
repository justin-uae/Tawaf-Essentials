import { Zap, Users, ArrowRight, Star, Sparkles, Award, Shield, Clock, CheckCircle, TrendingUp, BookOpen, Heart, Globe, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {

    const phoneNumber = import.meta.env.VITE_CONTACT_NUMBER;
    const companyEmail = import.meta.env.VITE_COMPANY_EMAIL;

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Islamic Theme */}
            <div className="relative bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100 py-16 sm:py-20 md:py-24 px-4 sm:px-6 overflow-hidden">
                {/* Islamic geometric pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(16, 185, 129, 0.3) 30px, rgba(16, 185, 129, 0.3) 60px),
                                        repeating-linear-gradient(-45deg, transparent, transparent 30px, rgba(16, 185, 129, 0.3) 30px, rgba(16, 185, 129, 0.3) 60px)`
                    }}></div>
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 mb-4 sm:mb-6 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-emerald-100 to-teal-100 border-2 border-emerald-200 rounded-full">
                        <Sparkles className="w-4 h-4 text-emerald-700" />
                        <span className="text-emerald-800 text-sm sm:text-base font-black uppercase tracking-wider">Our Story</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-4 sm:mb-6 px-2 leading-tight">
                        Your Trusted Partner for{' '}
                        <span className="block mt-2 bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
                            Sacred Umrah Journeys
                        </span>
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto px-2 font-medium">
                        Providing authentic Islamic products and comprehensive guides to make your pilgrimage spiritually enriching and hassle-free
                    </p>
                </div>
            </div>

            {/* Features Grid - Islamic Theme */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8">
                    <div className="group p-7 sm:p-8 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:border-emerald-300">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center mb-4 sm:mb-5 shadow-lg group-hover:scale-110 transition-transform">
                            <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-2">Authentic Products</h3>
                        <p className="text-sm sm:text-base text-gray-700 font-medium">Carefully selected Islamic products and comprehensive Umrah guides</p>
                    </div>

                    <div className="group p-7 sm:p-8 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:border-emerald-300">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center mb-4 sm:mb-5 shadow-lg group-hover:scale-110 transition-transform">
                            <Award className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-2">Verified Quality</h3>
                        <p className="text-sm sm:text-base text-gray-700 font-medium">All products verified by Islamic scholars and experts</p>
                    </div>

                    <div className="group p-7 sm:p-8 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:border-emerald-300">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center mb-4 sm:mb-5 shadow-lg group-hover:scale-110 transition-transform">
                            <Zap className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-2">Instant Access</h3>
                        <p className="text-sm sm:text-base text-gray-700 font-medium">Immediate download for digital products and fast shipping</p>
                    </div>

                    <div className="group p-7 sm:p-8 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:border-emerald-300">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center mb-4 sm:mb-5 shadow-lg group-hover:scale-110 transition-transform">
                            <Users className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-2">Expert Guidance</h3>
                        <p className="text-sm sm:text-base text-gray-700 font-medium">24/7 support from knowledgeable Islamic advisors</p>
                    </div>
                </div>
            </div>

            {/* Mission & Vision - Islamic Theme */}
            <div className="relative bg-gradient-to-br from-emerald-700 via-teal-700 to-emerald-800 py-12 sm:py-16 md:py-20 px-4 sm:px-6 my-8 sm:my-12 overflow-hidden">
                {/* Islamic geometric pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px),
                                        repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px)`
                    }}></div>
                </div>

                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
                        <div className="text-white bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all">
                            <div className="flex items-center gap-3 mb-4">
                                <BookOpen className="w-8 h-8" />
                                <h2 className="text-3xl sm:text-4xl font-black">Our Mission</h2>
                            </div>
                            <p className="text-base sm:text-lg text-white/95 leading-relaxed font-medium">
                                To make authentic Islamic resources and quality Umrah products accessible to all pilgrims, ensuring their spiritual journey is well-prepared and blessed. We serve the Umrah with dedication and care.
                            </p>
                        </div>
                        <div className="text-white bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all">
                            <div className="flex items-center gap-3 mb-4">
                                <TrendingUp className="w-8 h-8" />
                                <h2 className="text-3xl sm:text-4xl font-black">Our Vision</h2>
                            </div>
                            <p className="text-base sm:text-lg text-white/95 leading-relaxed font-medium">
                                To become the most trusted Islamic e-commerce platform worldwide, known for authentic products, expert guidance, and exceptional service in supporting pilgrims' sacred journeys.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Choose Us - Islamic Theme */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
                <div className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-full mb-4">
                        <Star className="w-4 h-4 text-emerald-700" />
                        <span className="text-emerald-800 text-sm font-bold uppercase tracking-wider">Benefits</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">Why Choose Us?</h2>
                    <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">
                        Experience the difference with our dedicated service to pilgrims
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    <div className="flex gap-4 sm:gap-5 p-6 sm:p-7 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl hover:shadow-xl transition-all hover:border-emerald-300">
                        <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center shadow-lg">
                            <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <div>
                            <h3 className="font-black text-base sm:text-lg text-gray-900 mb-2">Scholar-Verified Content</h3>
                            <p className="text-sm sm:text-base text-gray-700 font-medium">All guides and products reviewed by qualified Islamic scholars</p>
                        </div>
                    </div>

                    <div className="flex gap-4 sm:gap-5 p-6 sm:p-7 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl hover:shadow-xl transition-all hover:border-emerald-300">
                        <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center shadow-lg">
                            <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <div>
                            <h3 className="font-black text-base sm:text-lg text-gray-900 mb-2">Best Price Promise</h3>
                            <p className="text-sm sm:text-base text-gray-700 font-medium">Quality products at fair prices with no hidden fees</p>
                        </div>
                    </div>

                    <div className="flex gap-4 sm:gap-5 p-6 sm:p-7 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl hover:shadow-xl transition-all hover:border-emerald-300">
                        <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center shadow-lg">
                            <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <div>
                            <h3 className="font-black text-base sm:text-lg text-gray-900 mb-2">100% Secure Shopping</h3>
                            <p className="text-sm sm:text-base text-gray-700 font-medium">Safe payment methods with instant confirmation</p>
                        </div>
                    </div>

                    <div className="flex gap-4 sm:gap-5 p-6 sm:p-7 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl hover:shadow-xl transition-all hover:border-emerald-300">
                        <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center shadow-lg">
                            <Globe className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <div>
                            <h3 className="font-black text-base sm:text-lg text-gray-900 mb-2">Worldwide Service</h3>
                            <p className="text-sm sm:text-base text-gray-700 font-medium">Serving pilgrims across 50+ countries globally</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section - Islamic Theme */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">Our Journey in Numbers</h2>
                        <p className="text-gray-400 text-lg font-medium">Alhamdulillah, serving the Umrah with excellence</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all">
                            <h3 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent mb-3">500+</h3>
                            <p className="text-base sm:text-lg text-gray-300 font-bold uppercase tracking-wider">Products & Guides</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all">
                            <h3 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent mb-3">100K+</h3>
                            <p className="text-base sm:text-lg text-gray-300 font-bold uppercase tracking-wider">Satisfied Pilgrims</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all">
                            <h3 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent mb-3">4.9★</h3>
                            <p className="text-base sm:text-lg text-gray-300 font-bold uppercase tracking-wider">Customer Rating</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all">
                            <h3 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent mb-3">50+</h3>
                            <p className="text-base sm:text-lg text-gray-300 font-bold uppercase tracking-wider">Countries Served</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section - Islamic Theme */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
                <div className="relative bg-gradient-to-br from-emerald-700 via-teal-700 to-emerald-800 rounded-3xl p-10 sm:p-12 md:p-16 text-center text-white shadow-2xl overflow-hidden">
                    {/* Islamic geometric pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px),
                                            repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px)`
                        }}></div>
                    </div>

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                            <BookOpen className="w-4 h-4 text-white" />
                            <span className="text-white text-sm font-bold uppercase tracking-wider">Begin Your Journey</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-black mb-4 sm:mb-5">Ready for Your Umrah?</h2>
                        <p className="text-lg sm:text-xl text-white/95 mb-8 sm:mb-10 max-w-2xl mx-auto px-2 font-medium">
                            Explore our authentic Islamic products and comprehensive guides to prepare for your blessed pilgrimage
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/products"
                                className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-white text-emerald-800 rounded-full font-black text-lg sm:text-xl hover:shadow-2xl transform hover:scale-105 transition-all"
                            >
                                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
                                Shop Now
                                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                            </Link>
                            <Link
                                to="/ebooks"
                                className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-transparent border-2 border-white text-white rounded-full font-black text-lg sm:text-xl hover:bg-white hover:text-emerald-800 transform hover:scale-105 transition-all"
                            >
                                Browse E-Books
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Section - Islamic Theme */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 py-12 sm:py-16 md:py-20 px-4 sm:px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-10 sm:mb-12">
                        <div className="inline-flex items-center gap-2 bg-white border-2 border-emerald-200 px-4 py-2 rounded-full mb-4">
                            <Users className="w-4 h-4 text-emerald-700" />
                            <span className="text-emerald-800 text-sm font-bold uppercase tracking-wider">Contact Us</span>
                        </div>
                        <h3 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">Get in Touch</h3>
                        <p className="text-lg text-gray-600 font-medium">We're here to support your spiritual journey</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
                        <div className="p-7 sm:p-8 bg-white rounded-2xl shadow-lg border-2 border-emerald-200 hover:shadow-xl transition-all hover:border-emerald-300 text-center">
                            <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <Mail className="w-7 h-7 text-white" />
                            </div>
                            <h4 className="font-black text-base sm:text-lg text-gray-900 mb-2">Email Us</h4>
                            <p className="text-sm sm:text-base text-emerald-800 font-bold break-all">{companyEmail}</p>
                        </div>

                        <div className="p-7 sm:p-8 bg-white rounded-2xl shadow-lg border-2 border-emerald-200 hover:shadow-xl transition-all hover:border-emerald-300 text-center">
                            <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <Phone className="w-7 h-7 text-white" />
                            </div>
                            <h4 className="font-black text-base sm:text-lg text-gray-900 mb-2">Call Us</h4>
                            <p className="text-sm sm:text-base text-emerald-800 font-bold">+{phoneNumber}</p>
                        </div>

                        <div className="p-7 sm:p-8 bg-white rounded-2xl shadow-lg border-2 border-emerald-200 hover:shadow-xl transition-all hover:border-emerald-300 text-center">
                            <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <Clock className="w-7 h-7 text-white" />
                            </div>
                            <h4 className="font-black text-base sm:text-lg text-gray-900 mb-2">Support Hours</h4>
                            <p className="text-sm sm:text-base text-gray-700 font-bold">Available 24/7</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}