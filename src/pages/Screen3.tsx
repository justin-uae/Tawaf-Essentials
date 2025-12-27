import Banner2 from '../assets/Banner2.png'

const Screen3 = () => {
    return (
        <div className="relative min-h-[28rem] sm:min-h-[32rem] md:min-h-[36rem] lg:min-h-[40rem] overflow-hidden">
            <div className="flex flex-col lg:flex-row h-full">
                {/* Left side - Solid color with text */}
                <div className="w-full lg:w-1/2 bg-teal-600 relative overflow-hidden">
                    {/* Decorative pattern overlay */}
                    <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                <circle cx="10" cy="10" r="2" fill="white" />
                            </pattern>
                            <rect width="100" height="100" fill="url(#dots)" />
                        </svg>
                    </div>

                    <div className="relative z-10 h-full flex items-center px-6 sm:px-8 lg:px-12 xl:px-16 py-16">
                        <div>
                            <div className="inline-block mb-4">
                                <svg className="w-16 h-16 text-white opacity-80" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.85 0 3.58-.51 5.07-1.39-2.25.32-4.58-.37-6.31-2.1-1.73-1.73-2.42-4.06-2.1-6.31C7.78 10.71 6.48 8.85 6.48 6.72 6.48 4.12 8.6 2 11.2 2h.8z" />
                                </svg>
                            </div>

                            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                Prepare for Your
                                <span className="block mt-2">Sacred Journey</span>
                            </h1>

                            <p className="text-teal-50 text-lg sm:text-xl md:text-2xl font-medium leading-relaxed mb-8 max-w-xl">
                                Essential guides, supplies, and spiritual resources for Umrah pilgrims
                            </p>

                            <button className="bg-white hover:bg-gray-100 text-teal-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-300 shadow-lg">
                                Start Shopping
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right side - Image */}
                <div className="w-full lg:w-1/2 bg-amber-50/50 relative">
                    <div className="h-full flex items-center justify-center p-8 lg:p-12">
                        <img
                            src={Banner2}
                            alt="Umrah Journey"
                            className="w-full max-w-lg h-auto object-contain drop-shadow-2xl"
                        />
                    </div>

                    {/* Decorative corner accent */}
                    <div className="absolute top-8 right-8 w-24 h-24 opacity-20">
                        <svg viewBox="0 0 100 100" className="text-teal-600">
                            <path d="M10,10 L10,50 Q10,90 50,90 L90,90" fill="none" stroke="currentColor" strokeWidth="3" />
                            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Screen3