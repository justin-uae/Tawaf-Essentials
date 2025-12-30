import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, BookOpen, Sparkles, Filter, Package } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchAllProducts } from '../slices/productsSlice';
import { useCurrency } from '../hooks/useCurrency';

const ViewAllProducts = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    const { products, loading } = useAppSelector((state) => state.products);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const categoryFromQuery = searchParams.get('category') || '';

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(categoryFromQuery);
    const [sortBy, setSortBy] = useState('rating');
    const { formatPrice } = useCurrency();

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchAllProducts());
        }
    }, [dispatch, products.length]);

    const uniqueCategories = Array.from(
        new Set(products.map((product) => product.category).filter(Boolean))
    ).sort();

    useEffect(() => {
        if (categoryFromQuery) {
            setSelectedCategory(categoryFromQuery);
        }
    }, [categoryFromQuery]);

    useEffect(() => {
        let filtered = [...products];

        if (searchQuery) {
            filtered = filtered.filter(product =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        if (selectedCategory) {
            filtered = filtered.filter(product =>
                product.category && product.category.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        if (sortBy === 'price-low') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'rating') {
            filtered.sort((a, b) => b.rating - a.rating);
        }

        setFilteredProducts(filtered);
    }, [searchQuery, selectedCategory, sortBy, products]);

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCategory('');
        setSortBy('rating');
        navigate('/products');
    };

    const activeFiltersCount = () => {
        let count = 0;
        if (searchQuery) count++;
        if (selectedCategory) count++;
        return count;
    };

    const goToDetail = (productId: string) => {
        const id = productId.split('/').pop();
        navigate(`/products/${id}`);
    };

    if (loading) {
        return <LoadingSkeleton />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/10 to-white">
            {/* Hero Section */}
            <HeroSection
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                totalCount={products.length}
                selectedCategory={selectedCategory}
            />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
                {/* Mobile Filter Button */}
                <div className="lg:hidden mb-6">
                    <button
                        onClick={() => setShowMobileFilters(true)}
                        className="w-full flex items-center justify-center gap-3 px-5 py-3.5 bg-white border-2 border-amber-200 rounded-xl shadow-md hover:shadow-lg hover:border-amber-300 transition-all font-semibold text-gray-700"
                    >
                        <Filter className="w-5 h-5 text-amber-700" />
                        <span>
                            Filters {activeFiltersCount() > 0 && (
                                <span className="ml-1 px-2 py-0.5 bg-gradient-to-r from-amber-500 to-yellow-600 text-white text-xs font-bold rounded-full">
                                    {activeFiltersCount()}
                                </span>
                            )}
                        </span>
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Desktop Sidebar Filters */}
                    <aside className="hidden lg:block lg:w-72 flex-shrink-0">
                        <FilterSidebar
                            uniqueCategories={uniqueCategories}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            clearFilters={clearFilters}
                        />
                    </aside>

                    {/* Mobile Filter Drawer */}
                    {showMobileFilters && (
                        <MobileFilterDrawer
                            uniqueCategories={uniqueCategories}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            clearFilters={clearFilters}
                            onClose={() => setShowMobileFilters(false)}
                        />
                    )}

                    {/* Main Content */}
                    <main className="flex-1">
                        {/* Sort and Results */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                            <div className="flex items-center gap-2">
                                <Package className="w-5 h-5 text-amber-700" />
                                <p className="text-gray-700 font-medium">
                                    <span className="font-bold text-gray-900 text-lg">{filteredProducts.length}</span>
                                    <span className="ml-1">{filteredProducts.length === 1 ? 'product' : 'products'} available</span>
                                    {selectedCategory && (
                                        <span className="ml-2 text-amber-700 font-bold">in {selectedCategory}</span>
                                    )}
                                </p>
                            </div>

                            <div className="relative w-full sm:w-auto">
                                <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-700" />
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full sm:w-auto pl-10 pr-4 py-2.5 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white font-semibold text-gray-700 shadow-sm hover:shadow-md transition-all cursor-pointer"
                                >
                                    <option value="rating">⭐ Highest Rated</option>
                                    <option value="price-low">💰 Price: Low to High</option>
                                    <option value="price-high">💎 Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {/* Active Filters Display */}
                        {(selectedCategory || searchQuery) && (
                            <div className="flex flex-wrap items-center gap-2 mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                                <span className="text-sm font-semibold text-gray-700">Active filters:</span>
                                {selectedCategory && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-amber-300 rounded-full text-sm font-medium text-gray-700">
                                        <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                                        {selectedCategory}
                                        <button
                                            onClick={() => setSelectedCategory('')}
                                            className="ml-1 hover:text-red-600 transition-colors"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </span>
                                )}
                                {searchQuery && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-amber-300 rounded-full text-sm font-medium text-gray-700">
                                        <Search className="w-3.5 h-3.5 text-amber-700" />
                                        "{searchQuery}"
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="ml-1 hover:text-red-600 transition-colors"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </span>
                                )}
                                <button
                                    onClick={clearFilters}
                                    className="ml-auto text-sm font-semibold text-amber-800 hover:text-amber-900 underline"
                                >
                                    Clear all
                                </button>
                            </div>
                        )}

                        {/* Results Grid */}
                        {filteredProducts.length === 0 ? (
                            <EmptyState clearFilters={clearFilters} />
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        goToDetail={goToDetail}
                                        formatPrice={formatPrice}
                                    />
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

// Hero Section Component
const HeroSection = ({ searchQuery, setSearchQuery, selectedCategory }: any) => (
    <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden py-16 sm:py-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(251, 191, 36, 0.1) 20px, rgba(251, 191, 36, 0.1) 40px),
                                repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(251, 191, 36, 0.1) 20px, rgba(251, 191, 36, 0.1) 40px)`
            }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 text-center z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4 drop-shadow-2xl">
                {selectedCategory ? (
                    <>
                        {selectedCategory} <span className="text-amber-400">Collection</span>
                    </>
                ) : (
                    <>
                        Umrah Products & Guides
                    </>
                )}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-amber-100 mb-6 sm:mb-8 font-medium drop-shadow-lg max-w-3xl mx-auto">
                Explore authentic Islamic products for your spiritual journey
            </p>

            <div className="max-w-2xl mx-auto w-full">
                <div className="relative group">
                    <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-gray-400 group-focus-within:text-amber-700 transition-colors z-10" />
                    <input
                        type="text"
                        placeholder="Search products, categories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="relative w-full pl-12 sm:pl-14 md:pl-16 pr-12 sm:pr-14 py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl bg-white text-gray-800 text-sm sm:text-base md:text-lg focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-2xl font-medium border-2 border-transparent focus:border-amber-300 transition-all"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-full transition-colors z-10"
                        >
                            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    </div>
);

// Filter Sidebar Component
const FilterSidebar = ({ uniqueCategories, selectedCategory, setSelectedCategory, clearFilters }: any) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4 border-2 border-amber-100">
        <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-amber-100">
            <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-amber-700" />
                <h2 className="text-xl font-black text-gray-900">Filters</h2>
            </div>
            <button
                onClick={clearFilters}
                className="text-sm text-amber-700 hover:text-amber-800 font-bold hover:underline transition-colors"
            >
                Reset
            </button>
        </div>

        {/* Category Filter */}
        <FilterSection title="Category">
            <button
                onClick={() => setSelectedCategory('')}
                className={`group flex items-center gap-2 w-full text-left px-3 py-2.5 rounded-xl transition-all font-medium ${!selectedCategory
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-md'
                    : 'hover:bg-amber-50 text-gray-700'
                    }`}
            >
                <BookOpen className={`w-4 h-4 ${!selectedCategory ? 'text-white' : 'text-amber-700'}`} />
                All Products
            </button>
            {uniqueCategories.map((category: string) => (
                <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`group flex items-center gap-2 w-full text-left px-3 py-2.5 rounded-xl transition-all font-medium ${selectedCategory === category
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-md'
                        : 'hover:bg-amber-50 text-gray-700'
                        }`}
                >
                    <BookOpen className={`w-4 h-4 ${selectedCategory === category ? 'text-white' : 'text-amber-700'}`} />
                    {category}
                </button>
            ))}
        </FilterSection>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border border-amber-200">
            <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1">Need Guidance?</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                        Contact our experts for personalized product recommendations
                    </p>
                </div>
            </div>
        </div>
    </div>
);

// Mobile Filter Drawer
const MobileFilterDrawer = ({ uniqueCategories, selectedCategory, setSelectedCategory, clearFilters, onClose }: any) => (
    <>
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-fadeIn" onClick={onClose} />
        <div className="fixed inset-y-0 left-0 w-80 max-w-full bg-white z-50 lg:hidden overflow-y-auto shadow-2xl animate-slideInLeft">
            <div className="p-6">
                <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-amber-100">
                    <div className="flex items-center gap-2">
                        <SlidersHorizontal className="w-5 h-5 text-amber-700" />
                        <h2 className="text-xl font-black text-gray-900">Filters</h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-amber-50 rounded-full transition-colors">
                        <X className="w-6 h-6 text-gray-700" />
                    </button>
                </div>
                <FilterSidebar
                    uniqueCategories={uniqueCategories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    clearFilters={clearFilters}
                />
                <button
                    onClick={onClose}
                    className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-amber-500 via-yellow-600 to-amber-600 text-white rounded-xl font-bold shadow-lg"
                >
                    Show Results
                </button>
            </div>
        </div>
    </>
);

// Filter Section Component
const FilterSection = ({ title, children }: any) => (
    <div className="mb-6 pb-6 border-b-2 border-amber-100 last:border-0">
        <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-gradient-to-b from-amber-600 to-yellow-600 rounded-full"></span>
            {title}
        </h3>
        <div className="space-y-2">{children}</div>
    </div>
);

// Product Card Component
const ProductCard = ({ product, goToDetail, formatPrice }: any) => (
    <div
        onClick={() => goToDetail(product.id)}
        className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-amber-200"
    >
        <div className="relative h-64 min-h-[16rem] overflow-hidden bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center p-4">
            <div className="w-full h-full flex items-center justify-center">
                <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-auto h-auto max-w-full max-h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-xl border border-amber-100 z-10">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500 line-through leading-tight">
                        {formatPrice(product.price + 10)}
                    </span>
                    <span className="text-lg font-black bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent leading-tight">
                        {formatPrice(product.price)}
                    </span>
                </div>
            </div>

            {product.rating > 0 && (
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-2.5 py-1.5 shadow-lg border border-amber-100 flex items-center gap-1 z-10">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-sm font-bold text-gray-900">{product.rating.toFixed(1)}</span>
                </div>
            )}
        </div>

        <div className="p-4">
            {product.category && (
                <div className="flex items-center gap-1.5 mb-2">
                    <BookOpen className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-600 font-semibold truncate">{product.category}</span>
                </div>
            )}
            <h3 className="text-base md:text-lg font-bold text-gray-900 group-hover:text-amber-700 transition-colors line-clamp-2 leading-tight mb-2 min-h-[2.5rem]">
                {product.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>
            <button className="w-full bg-gradient-to-r from-amber-50 to-yellow-50 group-hover:from-amber-500 group-hover:to-yellow-600 text-amber-800 group-hover:text-white font-bold text-sm py-2.5 rounded-lg transition-all duration-300 border-2 border-amber-200 group-hover:border-transparent shadow-sm group-hover:shadow-md">
                View Details
            </button>
        </div>
    </div>
);

// Empty State
const EmptyState = ({ clearFilters }: any) => (
    <div className="text-center py-20 bg-white rounded-2xl shadow-lg border-2 border-amber-100">
        <Package className="w-32 h-32 text-amber-200 mx-auto mb-6" />
        <h3 className="text-2xl font-black text-gray-900 mb-3">No Products Found</h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
            We couldn't find any products matching your criteria. Try adjusting your filters or search query.
        </p>
        <button onClick={clearFilters} className="px-8 py-4 bg-gradient-to-r from-amber-500 via-yellow-600 to-amber-600 text-white rounded-xl font-bold shadow-lg">
            Clear All Filters
        </button>
    </div>
);

// Loading Skeleton
const LoadingSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/10 to-white">
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 h-96 animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-amber-100">
                        <div className="h-64 bg-gradient-to-br from-amber-100 to-yellow-100 animate-pulse"></div>
                        <div className="p-4">
                            <div className="h-4 w-20 bg-amber-100 rounded mb-2 animate-pulse"></div>
                            <div className="h-6 w-full bg-gray-200 rounded mb-2 animate-pulse"></div>
                            <div className="h-10 w-full bg-amber-100 rounded animate-pulse"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default ViewAllProducts;