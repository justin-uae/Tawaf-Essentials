import { useRef, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, BookOpen, Sparkles, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchAllProducts } from '../slices/productsSlice';

export default function PopularProducts() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const scrollRef = useRef<HTMLDivElement>(null);

    const { products, loading } = useAppSelector((state) => state.products);

    // Fetch products on mount
    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchAllProducts());
        }
    }, [dispatch, products.length]);

    // Get first 10 products
    const displayProducts = products.slice(0, 10);

    const goToDetail = (productId: string) => {
        // Extract ID from Shopify GID
        const id = productId.split('/').pop();
        navigate(`/products/${id}`);
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = scrollRef.current.clientWidth * 0.8;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    const formatPrice = (price: number) => {
        return `AED ${price.toFixed(2)}`;
    };

    if (loading) {
        return <LoadingSkeleton />;
    }

    return (
        <div className="bg-gradient-to-b from-white via-amber-50/20 to-white py-12 sm:py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 sm:mb-10 md:mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                            <span className="text-amber-600 text-xs sm:text-sm font-bold uppercase tracking-wider">Best Sellers</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900">
                            Popular Umrah Products
                        </h2>
                        <p className="text-gray-700 text-sm sm:text-base font-medium mt-2">Trusted by thousands of pilgrims</p>
                    </div>
                    <div className="hidden sm:flex gap-2">
                        <button
                            onClick={() => scroll('left')}
                            className="bg-white border-2 border-amber-300 hover:border-amber-500 hover:bg-amber-50 rounded-full p-3 transition-all shadow-md hover:shadow-lg group"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="w-5 h-5 text-amber-600 group-hover:text-amber-700" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="bg-white border-2 border-amber-300 hover:border-amber-500 hover:bg-amber-50 rounded-full p-3 transition-all shadow-md hover:shadow-lg group"
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-5 h-5 text-amber-600 group-hover:text-amber-700" />
                        </button>
                    </div>
                </div>

                {/* Products Scrollable Row */}
                <div
                    ref={scrollRef}
                    className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
                    style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {displayProducts.map((product, index) => (
                        <div
                            key={product.id}
                            className="group cursor-pointer w-[75vw] sm:w-[45vw] md:w-[320px] lg:w-[300px] flex-shrink-0 transform hover:scale-[1.02] transition-all duration-300"
                            onClick={() => goToDetail(product.id)}
                        >
                            {/* Card Container */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-amber-300">
                                {/* Image */}
                                <div className="relative h-52 sm:h-56 md:h-60 lg:h-64 overflow-hidden bg-gradient-to-br from-amber-100 to-yellow-100">
                                    <img
                                        src={product.images[0]}
                                        alt={product.title}
                                        className="w-full h-full object-contain object-center group-hover:scale-110 transition-transform duration-500"
                                        loading="lazy"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    {/* Bestseller Badge - Show for first 3 products */}
                                    {index < 3 && (
                                        <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                                            <Sparkles className="w-3 h-3" />
                                            <span>Bestseller</span>
                                        </div>
                                    )}

                                    {/* Price Badge */}
                                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-xl border border-amber-200">
                                        <div className="flex flex-col">
                                            {/* Original (Strikethrough) Price */}
                                            <span className="text-[10px] sm:text-xs text-gray-500 line-through leading-tight">
                                                {product.price + 50}
                                            </span>
                                            {/* Current Price */}
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-sm sm:text-base md:text-lg font-black text-amber-600 leading-tight">
                                                    {formatPrice(product.price)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Rating Badge */}
                                    {product.rating > 0 && (
                                        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-2.5 py-1.5 shadow-lg border border-amber-200 flex items-center gap-1">
                                            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-500 text-amber-500" />
                                            <span className="text-xs sm:text-sm font-bold text-gray-900">
                                                {product.rating.toFixed(1)}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    {/* Category */}
                                    {product.category && (
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <BookOpen className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                                            <span className="text-xs sm:text-sm text-gray-700 font-semibold truncate">
                                                {product.category}
                                            </span>
                                        </div>
                                    )}

                                    {/* Title */}
                                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-tight mb-3 min-h-[2.5rem]">
                                        {product.title}
                                    </h3>

                                    {/* View Details Button */}
                                    <button className="w-full bg-gradient-to-r from-amber-50 to-yellow-50 group-hover:from-amber-500 group-hover:to-yellow-600 text-amber-700 group-hover:text-white font-bold text-sm py-2.5 rounded-lg transition-all duration-300 border-2 border-amber-300 group-hover:border-transparent shadow-sm group-hover:shadow-md flex items-center justify-center gap-2">
                                        <ShoppingBag className="w-4 h-4" />
                                        <span>View Product</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-10 sm:mt-12 md:mt-14">
                    <Link to={"/products"}>
                        <button className="group relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 hover:from-black hover:via-gray-900 hover:to-black text-amber-400 hover:text-amber-300 font-bold px-8 sm:px-10 md:px-12 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base md:text-lg rounded-full transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl overflow-hidden border-2 border-amber-500">
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Browse All Products
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

// Loading Skeleton
const LoadingSkeleton = () => (
    <div className="bg-gradient-to-b from-white via-amber-50/20 to-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="h-6 w-32 bg-amber-200 rounded mb-2 animate-pulse"></div>
                    <div className="h-10 w-64 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </div>
            <div className="flex gap-6 overflow-hidden">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-[300px] flex-shrink-0">
                        <div className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-amber-200">
                            <div className="h-64 bg-gradient-to-br from-amber-100 to-yellow-100 animate-pulse"></div>
                            <div className="p-4">
                                <div className="h-4 w-20 bg-amber-100 rounded mb-2 animate-pulse"></div>
                                <div className="h-6 w-full bg-gray-200 rounded mb-2 animate-pulse"></div>
                                <div className="h-10 w-full bg-amber-100 rounded animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);