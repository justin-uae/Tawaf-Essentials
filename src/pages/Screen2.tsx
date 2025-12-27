import Banner from '../assets/Banner.png'

const Screen2 = () => {
    return (
        <div className="relative min-h-[32rem] sm:min-h-[36rem] md:min-h-[40rem] bg-gradient-to-b from-teal-50 to-white overflow-hidden">
            {/* Decorative Islamic geometric pattern background */}
            <div className="absolute inset-0 opacity-5">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                    <pattern id="islamicPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" className="text-teal-600" />
                        <path d="M50,20 L65,40 L85,40 L70,55 L75,75 L50,60 L25,75 L30,55 L15,40 L35,40 Z" fill="currentColor" className="text-teal-600" />
                    </pattern>
                    <rect width="400" height="400" fill="url(#islamicPattern)" />
                </svg>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Centered Text Content */}
                <div className="text-center mb-12 relative z-10">
                    <h1 className="text-gray-900 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                        Your Complete
                        <span className="block text-teal-600 mt-2">Umrah Companion</span>
                    </h1>

                    <p className="text-gray-700 text-lg sm:text-xl md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed mb-8">
                        Everything you need for a blessed and prepared pilgrimage journey
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-300 shadow-lg">
                            Shop Essentials
                        </button>
                        <button className="bg-white hover:bg-gray-50 text-teal-600 border-2 border-teal-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-300">
                            Read Guides
                        </button>
                    </div>
                </div>

                {/* Large Centered Image */}
                <div className="relative max-w-4xl mx-auto">
                    <div className="relative z-10">
                        <img
                            src={Banner}
                            alt="Umrah Journey"
                            className="w-full h-auto object-contain drop-shadow-2xl"
                        />
                    </div>

                    {/* Decorative circles behind image */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 -z-10">
                        <svg className="w-full h-full text-teal-600" viewBox="0 0 200 200">
                            <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1" />
                            <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="1" />
                            <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="1" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Screen2