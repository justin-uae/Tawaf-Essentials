import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Sparkles, Package } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchCollectionsWithProducts } from '../slices/productsSlice';
import { useNavigate } from 'react-router-dom';
import Banner2 from '../assets/Banner2.png'

export default function HomepageBanner() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { collectionsWithProducts, loading } = useAppSelector((state) => state.products);

    // Fetch collections on mount
    useEffect(() => {
        dispatch(fetchCollectionsWithProducts());
    }, [dispatch]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowCategoryDropdown(false);
            }
        };

        if (showCategoryDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showCategoryDropdown]);

    // Navigate to products page when category is selected
    useEffect(() => {
        if (selectedCategory !== '') {
            navigate(`/products?category=${encodeURIComponent(selectedCategory)}`);
        }
    }, [selectedCategory, navigate]);

    // Get featured categories collection
    const featuredCategoriesCollection = collectionsWithProducts.find(
        (col: any) => col.handle === 'banner'
    );

    const featuredCategories = featuredCategoriesCollection?.products || [];

    // Scroll Functionality
    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth } = scrollContainerRef.current;
            const scrollAmount = clientWidth * 0.8;
            const newScrollPosition =
                direction === 'left'
                    ? scrollLeft - scrollAmount
                    : scrollLeft + scrollAmount;

            scrollContainerRef.current.scrollTo({
                left: newScrollPosition,
                behavior: 'smooth',
            });
        }
    };

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    };

    return (
        <>
            <div className="relative">
                {/* Hero Banner */}
                <div className="relative min-h-[26rem] sm:min-h-[26rem] md:min-h-[30rem] lg:min-h-[35rem] bg-gradient-to-br from-amber-50 via-white to-yellow-50/30 overflow-hidden">
                    {/* Decorative Islamic patterns - Background */}
                    <div className="absolute inset-0 pointer-events-none opacity-10">
                        {/* Geometric Islamic pattern top right */}
                        <svg className="absolute top-0 right-0 w-64 h-64 text-yellow-600" viewBox="0 0 200 200" fill="currentColor">
                            <path d="M100,0 L120,30 L150,30 L125,50 L135,80 L100,60 L65,80 L75,50 L50,30 L80,30 Z" />
                            <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
                            <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" />
                        </svg>

                        {/* Geometric Islamic pattern bottom left */}
                        <svg className="absolute bottom-0 left-0 w-64 h-64 text-yellow-600" viewBox="0 0 200 200" fill="currentColor">
                            <path d="M100,0 L120,30 L150,30 L125,50 L135,80 L100,60 L65,80 L75,50 L50,30 L80,30 Z" />
                            <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>

                    {/* Banner content container */}
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center py-12">
                        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
                            {/* Left side - Text content */}
                            <div className="w-full lg:w-[45%] text-left relative">
                                {/* Decorative corner element - top left */}
                                <div className="absolute -top-6 -left-4 w-20 h-20 opacity-20">
                                    <svg viewBox="0 0 100 100" className="text-yellow-600">
                                        <path d="M50,10 Q30,30 10,50 Q30,70 50,90" fill="none" stroke="currentColor" strokeWidth="3" />
                                        <path d="M90,50 Q70,30 50,10" fill="none" stroke="currentColor" strokeWidth="3" />
                                        <circle cx="50" cy="50" r="5" fill="currentColor" />
                                    </svg>
                                </div>

                                {/* Main heading */}
                                <h1 className="text-gray-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
                                    Begin Your Sacred
                                    <span className="block text-amber-500 mt-2 relative">
                                        Umrah Journey
                                        {/* Small crescent decoration */}
                                        <svg className="absolute -right-8 top-0 w-6 h-6 text-yellow-600 opacity-80 hidden xl:block" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.85 0 3.58-.51 5.07-1.39-2.25.32-4.58-.37-6.31-2.1-1.73-1.73-2.42-4.06-2.1-6.31C7.78 10.71 6.48 8.85 6.48 6.72 6.48 4.12 8.6 2 11.2 2h.8z" />
                                        </svg>
                                    </span>
                                </h1>

                                {/* Description */}
                                <div className="mb-8 sm:mb-10 max-w-2xl relative">
                                    <p className="text-gray-800 text-base sm:text-lg md:text-xl lg:text-2xl font-medium leading-relaxed">
                                        Complete guides, essential accessories, and spiritual resources for your blessed pilgrimage
                                    </p>

                                    {/* Small star decoration */}
                                    <svg className="absolute -bottom-4 right-0 w-8 h-8 text-yellow-500 opacity-60" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2l2.5 7.5H22l-6.5 5 2.5 7.5L12 17l-6.5 5 2.5-7.5L2 9.5h7.5z" />
                                    </svg>
                                </div>

                                {/* Decorative corner element - bottom left */}
                                <div className="absolute -bottom-6 left-0 w-16 h-16 opacity-20">
                                    <svg viewBox="0 0 100 100" className="text-yellow-600">
                                        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
                                        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" />
                                        <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
                                    </svg>
                                </div>
                            </div>

                            {/* Right side - Vector image */}
                            <div className="w-full lg:w-[43%] flex justify-center lg:justify-end relative">
                                {/* Subtle decorative element behind image */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                    <svg className="w-full h-full text-yellow-600" viewBox="0 0 200 200">
                                        <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" />
                                        <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" />
                                    </svg>
                                </div>

                                <div className="w-full max-w-lg lg:max-w-xl xl:max-w-2xl relative z-10">
                                    <img
                                        src={Banner2}
                                        alt="Umrah Journey"
                                        className="w-full h-auto object-contain drop-shadow-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Featured Categories Section - Islamic Theme */}
                <div className="bg-gradient-to-b from-white via-amber-50/30 to-white py-12 sm:py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between mb-8 sm:mb-10 md:mb-12">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Sparkles className="w-5 h-5 text-amber-500" />
                                    <span className="text-amber-500 text-xs sm:text-sm font-bold uppercase tracking-wider">Featured</span>
                                </div>
                                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-2">
                                    Essential Categories
                                </h2>
                                <p className="text-gray-700 text-sm sm:text-base font-medium">Everything you need for a blessed journey</p>
                            </div>
                            <div className="hidden sm:flex gap-2">
                                <button
                                    onClick={() => scroll('left')}
                                    aria-label='Scroll left'
                                    className="bg-white border-2 border-amber-300 rounded-full p-3 hover:border-amber-500 hover:bg-amber-50 transition-all shadow-md hover:shadow-lg group"
                                >
                                    <ChevronLeft className="w-5 h-5 text-amber-500 group-hover:text-amber-700" />
                                </button>
                                <button
                                    onClick={() => scroll('right')}
                                    aria-label='Scroll right'
                                    className="bg-white border-2 border-amber-300 rounded-full p-3 hover:border-amber-500 hover:bg-amber-50 transition-all shadow-md hover:shadow-lg group"
                                >
                                    <ChevronRight className="w-5 h-5 text-amber-500 group-hover:text-amber-700" />
                                </button>
                            </div>
                        </div>

                        {loading ? (
                            <div className="text-center py-16 text-gray-600">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-amber-500 mx-auto mb-4"></div>
                                <p className="font-semibold">Loading categories...</p>
                            </div>
                        ) : (
                            <div
                                ref={scrollContainerRef}
                                className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto scroll-smooth scrollbar-hide pb-4"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                {featuredCategories.length > 0 ? (
                                    featuredCategories.map((category: any, index: number) => (
                                        <button
                                            key={index}
                                            onClick={() => handleCategoryClick(category?.category)}
                                            className="relative w-[75vw] sm:w-[45vw] md:w-[320px] lg:w-[360px] flex-shrink-0 rounded-2xl overflow-hidden shadow-xl group cursor-pointer h-64 sm:h-72 hover:shadow-2xl transition-all transform hover:scale-[1.02]"
                                        >
                                            {category?.images?.edges?.[0]?.node?.url || category?.image ? (
                                                <img
                                                    src={category?.images?.edges?.[0]?.node?.url || category?.image}
                                                    alt={category.title}
                                                    loading='lazy'
                                                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center">
                                                    <BookOpen className="w-16 h-16 text-amber-500" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                                            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/30 to-yellow-600/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                                                <h3 className="text-white text-sm sm:text-xl md:text-lg font-black mb-2 drop-shadow-2xl line-clamp-2">{category?.title}</h3>
                                                <div className="flex items-center gap-2 text-amber-400 text-xs sm:text-sm font-semibold">
                                                    <span>Explore Collection</span>
                                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                            {/* Islamic corner accent */}
                                            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 border-t-4 border-r-4 border-amber-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </button>
                                    ))
                                ) : (
                                    <div className="w-full text-center py-12">
                                        <BookOpen className="w-16 h-16 text-amber-300 mx-auto mb-4" />
                                        <p className="text-gray-700 font-semibold">No categories available</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 py-2 sm:py-3 relative overflow-hidden">
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 15px, rgba(255,255,255,0.1) 15px, rgba(255,255,255,0.1) 30px)`
                        }}></div>
                    </div>
                    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 relative z-10">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 md:gap-3 text-white text-center">
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <Package className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 animate-bounce flex-shrink-0" />
                                <span className="text-xs sm:text-sm md:text-base lg:text-lg font-black uppercase tracking-wide">
                                    <span className="hidden sm:inline">Special Bundle Offer:</span>
                                    <span className="sm:hidden">Bundle Deal:</span>
                                </span>
                            </div>
                            <span className="text-xs sm:text-sm md:text-base lg:text-lg font-bold">
                                <span className="hidden md:inline">Get 10% Off When You Order Complete Umrah Bundle!</span>
                                <span className="hidden sm:inline md:hidden">10% Off on Complete Bundle Orders!</span>
                                <span className="sm:hidden">10% Off on Bundle Orders!</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}