import Banner7 from '../assets/Banner7.png'

const Screen4 = () => {
    return (
        <div className="relative min-h-[32rem] sm:min-h-[36rem] md:min-h-[40rem] bg-gradient-to-br from-amber-50 to-teal-50 overflow-hidden py-12 sm:py-16 lg:py-20">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-teal-200 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200 rounded-full blur-3xl opacity-20"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main card container */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="flex flex-col lg:flex-row">
                        {/* Left - Text content */}
                        <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex items-center">
                            <div>
                                {/* Small badge */}
                                <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2l2.5 7.5H22l-6.5 5 2.5 7.5L12 17l-6.5 5 2.5-7.5L2 9.5h7.5z" />
                                    </svg>
                                    Your Trusted Umrah Partner
                                </div>

                                <h1 className="text-gray-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                    Everything for Your
                                    <span className="block text-teal-600 mt-2">Blessed Pilgrimage</span>
                                </h1>

                                <p className="text-gray-600 text-lg sm:text-xl mb-8 leading-relaxed">
                                    From essential travel items to comprehensive spiritual guides, we provide everything you need for a meaningful Umrah experience.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                                        Browse Products
                                    </button>
                                    <button className="border-2 border-gray-300 hover:border-teal-600 text-gray-700 hover:text-teal-600 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300">
                                        Learn More
                                    </button>
                                </div>

                                {/* Feature highlights */}
                                <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-gray-200">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-teal-600 mb-1">500+</div>
                                        <div className="text-sm text-gray-600">Products</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-teal-600 mb-1">50+</div>
                                        <div className="text-sm text-gray-600">Guides</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-teal-600 mb-1">24/7</div>
                                        <div className="text-sm text-gray-600">Support</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right - Image */}
                        <div className="w-full lg:w-1/2 bg-gradient-to-br from-teal-50 to-amber-50 relative p-8 lg:p-12 flex items-center justify-center">
                            {/* Decorative circles */}
                            <div className="absolute inset-0 opacity-10">
                                <svg className="w-full h-full text-teal-600" viewBox="0 0 200 200">
                                    <circle cx="150" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
                                    <circle cx="50" cy="150" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
                                    <path d="M100,50 L120,80 L150,80 L125,100 L135,130 L100,110 L65,130 L75,100 L50,80 L80,80 Z" fill="currentColor" opacity="0.3" />
                                </svg>
                            </div>

                            <div className="relative z-10 w-full max-w-md">
                                <img
                                    src={Banner7}
                                    alt="Umrah Journey"
                                    className="w-full h-auto object-contain drop-shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Screen4