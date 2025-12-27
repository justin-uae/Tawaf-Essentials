import Banner4 from '../assets/Banner4.svg'
const Screen5 = () => {
    return (
        <div className="relative min-h-[30rem] sm:min-h-[34rem] md:min-h-[38rem] bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left - Minimal text */}
                    <div className="order-2 lg:order-1">
                        {/* Small decorative element */}
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-0.5 bg-teal-600"></div>
                            <span className="text-teal-600 font-semibold uppercase tracking-wider text-sm">Umrah Essentials</span>
                        </div>

                        <h1 className="text-gray-900 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-none">
                            Begin
                            <span className="block text-teal-600">Your</span>
                            <span className="block">Journey</span>
                        </h1>

                        <p className="text-gray-600 text-xl sm:text-2xl font-light leading-relaxed mb-10 max-w-lg">
                            Complete preparation resources for your sacred Umrah pilgrimage
                        </p>

                        <button className="group relative bg-teal-600 hover:bg-teal-700 text-white px-10 py-5 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-3">
                            Explore Now
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>

                    {/* Right - Large image */}
                    <div className="order-1 lg:order-2 relative">
                        {/* Background accent */}
                        <div className="absolute -top-8 -right-8 w-full h-full bg-teal-100 rounded-3xl -z-10"></div>

                        <div className="relative bg-white rounded-3xl p-8 shadow-sm">
                            <img
                                src={Banner4}
                                alt="Umrah Journey"
                                className="w-full h-auto object-contain"
                            />
                        </div>

                        {/* Floating decorative element */}
                        <div className="absolute -bottom-6 -left-6 bg-amber-100 rounded-2xl p-6 shadow-lg">
                            <svg className="w-12 h-12 text-teal-600" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l2.5 7.5H22l-6.5 5 2.5 7.5L12 17l-6.5 5 2.5-7.5L2 9.5h7.5z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Screen5