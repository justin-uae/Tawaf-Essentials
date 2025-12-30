import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle, Check, Sparkles, ChevronUp, ChevronDown, AlertCircle, HelpCircle, Award, Star, Package } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchProductById } from '../slices/productsSlice';
import { BiCategory } from 'react-icons/bi';
import { useCurrency } from '../hooks/useCurrency';

export default function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { selectedProduct, loading } = useAppSelector((state) => state.products);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const { formatPrice } = useCurrency();

    // Accordion states
    const [isOverviewOpen, setIsOverviewOpen] = useState(true);
    const [isFeaturesOpen, setIsFeaturesOpen] = useState(true);
    const [isImportantInfoOpen, setIsImportantInfoOpen] = useState(false);
    const [isWhyBuyOpen, setIsWhyBuyOpen] = useState(false);
    const [isFaqOpen, setIsFaqOpen] = useState(false);

    // Fetch product on mount
    useEffect(() => {
        if (id) {
            const shopifyId = `gid://shopify/Product/${id}`;
            dispatch(fetchProductById(shopifyId));
        }
    }, [id, dispatch]);

    useEffect(() => {
        setCurrentImageIndex(0);
    }, [selectedProduct?.id]);

    const nextImage = () => {
        if (selectedProduct) {
            setCurrentImageIndex((prev) => (prev + 1) % selectedProduct.images.length);
        }
    };

    const prevImage = () => {
        if (selectedProduct) {
            setCurrentImageIndex((prev) => (prev - 1 + selectedProduct.images.length) % selectedProduct.images.length);
        }
    };

    const isBundle = selectedProduct?.category?.toLowerCase() === 'bundle';

    const handleWhatsAppInquiry = () => {
        if (!selectedProduct) return;

        const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
        const subtotal = formatPrice(selectedProduct.price * quantity);

        const message = `السلام عليكم,

I'm interested in purchasing:

📚 *${selectedProduct.title}*
📂 Category: ${selectedProduct.category || 'General'}
${isBundle ? 'Bundle Product - 10% Discount Applied!' : ''}

*Product Details:*
📦 Quantity: ${quantity}
💰 Price per unit: ${formatPrice(selectedProduct.price)}
💵 Total Amount: ${subtotal}

${selectedProduct.features?.length > 0 ? `\n*Key Features:*\n${selectedProduct.features.slice(0, 3).map((f, i) => `${i + 1}. ${f}`).join('\n')}\n` : ''}
Please provide payment details and delivery information.

JazakAllah Khair!`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    if (loading) {
        return <LoadingSkeleton />;
    }

    if (!selectedProduct) {
        return <NotFoundState />;
    }

    const subtotal = formatPrice(selectedProduct.price * quantity);

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/10 to-white">
            {/* Breadcrumb */}
            <div className="border-b border-amber-100 bg-gradient-to-r from-amber-50/50 to-yellow-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 overflow-x-auto whitespace-nowrap">
                        <Link to="/" className="hover:text-amber-700 font-medium transition-colors">Home</Link>
                        <span className="text-amber-400">→</span>
                        <Link to="/products" className="hover:text-amber-700 font-medium transition-colors">Products</Link>
                        <span className="text-amber-400">→</span>
                        {selectedProduct.category && (
                            <>
                                <Link
                                    to={`/products?category=${selectedProduct.category}`}
                                    className="hover:text-amber-700 font-medium transition-colors"
                                >
                                    {selectedProduct.category}
                                </Link>
                                <span className="text-amber-400">→</span>
                            </>
                        )}
                        <span className="text-gray-900 font-semibold truncate">{selectedProduct.title}</span>
                    </div>
                </div>
            </div>

            {/* Bundle Discount Banner - Only show for bundle products */}
            {isBundle && (
                <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 py-2 sm:py-3 md:py-4 relative overflow-hidden">
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 15px, rgba(255,255,255,0.1) 15px, rgba(255,255,255,0.1) 30px)`
                        }}></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 relative z-10">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 md:gap-3 text-white text-center">
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <Package className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 animate-bounce flex-shrink-0" />
                                <span className="text-xs sm:text-sm md:text-base lg:text-lg font-black uppercase tracking-wide">
                                    Bundle Deal:
                                </span>
                            </div>
                            <span className="text-xs sm:text-sm md:text-base lg:text-lg font-bold">
                                <span className="hidden md:inline">Save 10% on All Items in This Package!</span>
                                <span className="hidden sm:inline md:hidden">Save 10% on Bundle Package!</span>
                                <span className="sm:hidden">Save 10% on All Items in This Package!</span>
                            </span>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
                    {/* Left Column - Images & Details */}
                    <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                        {/* Image Gallery */}
                        {selectedProduct.images && selectedProduct.images.length > 0 && (
                            <div className="relative">
                                <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-100 bg-gradient-to-br from-amber-50 to-yellow-50">
                                    <img
                                        src={selectedProduct.images[currentImageIndex] || 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800'}
                                        alt={selectedProduct.title}
                                        className="w-full h-auto max-h-[500px] sm:max-h-[600px] object-contain mx-auto"
                                    />

                                    {selectedProduct.images.length > 1 && (
                                        <>
                                            <button
                                                onClick={prevImage}
                                                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white p-2 sm:p-2.5 rounded-full transition-all shadow-lg hover:scale-110"
                                                aria-label="Previous image"
                                            >
                                                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-amber-700" />
                                            </button>
                                            <button
                                                onClick={nextImage}
                                                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white p-2 sm:p-2.5 rounded-full transition-all shadow-lg hover:scale-110"
                                                aria-label="Next image"
                                            >
                                                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-amber-700" />
                                            </button>

                                            <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-black/70 backdrop-blur-sm text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold">
                                                {currentImageIndex + 1} / {selectedProduct.images.length}
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Thumbnails */}
                                {selectedProduct.images.length > 1 && (
                                    <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4 overflow-x-auto pb-2">
                                        {selectedProduct.images.map((image: string, index: number) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentImageIndex(index)}
                                                className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 ${index === currentImageIndex
                                                    ? 'border-amber-600 ring-2 ring-amber-300'
                                                    : 'border-amber-200 opacity-60 hover:opacity-100 hover:border-amber-400'
                                                    } transition-all bg-gradient-to-br from-amber-50 to-yellow-50`}
                                            >
                                                <img
                                                    src={image}
                                                    alt={`Thumbnail ${index + 1}`}
                                                    className="w-full h-full object-contain p-1"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Title & Details */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-100">
                            <div className="flex items-start justify-between mb-4 gap-3">
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-3">
                                        {selectedProduct.rating > 4.5 && (
                                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-yellow-100 px-3 py-1.5 rounded-full">
                                                <Sparkles className="w-4 h-4 text-amber-700" />
                                                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Bestseller</span>
                                            </div>
                                        )}
                                        {isBundle && (
                                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 px-3 py-1.5 rounded-full border-2 border-green-300">
                                                <Package className="w-4 h-4 text-green-700" />
                                                <span className="text-xs font-bold text-green-800 uppercase tracking-wider">Bundle Deal</span>
                                            </div>
                                        )}
                                    </div>
                                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-3 sm:mb-4">
                                        {selectedProduct.title}
                                    </h1>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm sm:text-base text-gray-600">
                                        {selectedProduct.category && (
                                            <div className="flex items-center gap-2">
                                                <BiCategory className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700 flex-shrink-0" />
                                                <span className="truncate font-semibold">{selectedProduct.category}</span>
                                            </div>
                                        )}
                                        {selectedProduct.rating > 0 && (
                                            <div className="flex items-center gap-2">
                                                <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-500 text-amber-500 flex-shrink-0" />
                                                <span className="font-bold text-gray-900">
                                                    {selectedProduct.rating.toFixed(1)}
                                                </span>
                                                {selectedProduct.reviewsCount > 0 && (
                                                    <span className="truncate font-medium">({selectedProduct.reviewsCount} reviews)</span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Bundle Savings Info Card */}
                            {isBundle && (
                                <div className="mt-3 sm:mt-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-3 sm:p-4">
                                    <div className="flex items-start gap-2 sm:gap-3">
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-black text-green-900 mb-0.5 sm:mb-1 text-sm sm:text-base">Special Bundle Savings!</h4>
                                            <p className="text-xs sm:text-sm text-green-800 font-semibold leading-relaxed">
                                                Get 10% off when you order all products in this bundle together. Save money and get everything you need in one package!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Overview - Accordion */}
                        <AccordionSection
                            title="Overview"
                            isOpen={isOverviewOpen}
                            setIsOpen={setIsOverviewOpen}
                            icon={<span className="w-1.5 h-8 bg-gradient-to-b from-amber-600 to-yellow-600 rounded-full"></span>}
                        >
                            {selectedProduct.descriptionHtml ? (
                                <div
                                    className="text-sm sm:text-base text-gray-700 leading-relaxed prose prose-sm sm:prose max-w-none"
                                    dangerouslySetInnerHTML={{ __html: selectedProduct.descriptionHtml }}
                                />
                            ) : (
                                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                    {selectedProduct.description}
                                </p>
                            )}
                        </AccordionSection>

                        {/* Features - Accordion */}
                        {selectedProduct.features && selectedProduct.features.length > 0 && (
                            <AccordionSection
                                title="Key Features"
                                isOpen={isFeaturesOpen}
                                setIsOpen={setIsFeaturesOpen}
                                icon={
                                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center">
                                        <CheckCircle className="w-6 h-6 text-white" />
                                    </div>
                                }
                            >
                                <div className="space-y-3">
                                    {selectedProduct.features.map((feature: string, index: number) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border-2 border-green-200 hover:bg-green-100 transition-colors"
                                        >
                                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Check className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="text-gray-800 font-semibold text-sm sm:text-base">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </AccordionSection>
                        )}

                        {/* Important Information */}
                        <AccordionSection
                            title="Important Information"
                            isOpen={isImportantInfoOpen}
                            setIsOpen={setIsImportantInfoOpen}
                            icon={
                                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center">
                                    <AlertCircle className="w-6 h-6 text-white" />
                                </div>
                            }
                        >
                            <InfoItem
                                title="Delivery Method"
                                description="Contact us via WhatsApp to complete your purchase and arrange delivery."
                            />
                            <InfoItem
                                title="Payment Options"
                                description="We accept multiple payment methods including cash on delivery and bank transfer."
                            />
                            <InfoItem
                                title="Customer Support"
                                description="24/7 support available via WhatsApp for any questions or assistance."
                            />
                            {isBundle && (
                                <InfoItem
                                    title="Bundle Discount"
                                    description="This is a bundle product - you automatically get 10% off when ordering all items together!"
                                />
                            )}
                        </AccordionSection>

                        {/* Why Buy */}
                        <AccordionSection
                            title="Why Choose Tawaf Essentials"
                            isOpen={isWhyBuyOpen}
                            setIsOpen={setIsWhyBuyOpen}
                            icon={
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center">
                                    <Award className="w-6 h-6 text-white" />
                                </div>
                            }
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <BenefitCard title="Trusted Products" description="Authentic Islamic products for your spiritual journey" />
                                <BenefitCard title="Scholar Verified" description="Content reviewed by qualified Islamic scholars" />
                                <BenefitCard title="Quality Assured" description="Only the highest quality products" />
                                <BenefitCard title="24/7 Support" description="Our team is here to help anytime" />
                            </div>
                        </AccordionSection>

                        {/* FAQ */}
                        <AccordionSection
                            title="Frequently Asked Questions"
                            isOpen={isFaqOpen}
                            setIsOpen={setIsFaqOpen}
                            icon={
                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-xl flex items-center justify-center">
                                    <HelpCircle className="w-6 h-6 text-white" />
                                </div>
                            }
                        >
                            <FAQItem
                                question="How do I complete my purchase?"
                                answer="Click the 'Inquire on WhatsApp' button to contact us directly. Our team will guide you through the payment and delivery process."
                            />
                            <FAQItem
                                question="What payment methods do you accept?"
                                answer="We accept various payment methods including bank transfer, credit/debit cards, and cash on delivery for eligible items."
                            />
                            <FAQItem
                                question="How long does delivery take?"
                                answer="Delivery times vary based on your location. Contact us via WhatsApp for specific delivery estimates for your area."
                            />
                            {isBundle && (
                                <FAQItem
                                    question="How does the bundle discount work?"
                                    answer="When you purchase this bundle, you automatically receive 10% off the total price compared to buying each item separately. The discount is already applied to the bundle price shown."
                                />
                            )}
                        </AccordionSection>
                    </div>

                    {/* Right Column - Purchase */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-4 sm:top-8">
                            <div className="bg-white border-2 border-amber-200 rounded-3xl p-6 sm:p-8 shadow-2xl">
                                {/* Bundle Badge at top */}
                                {isBundle && (
                                    <div className="mb-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-xl text-center">
                                        <div className="flex items-center justify-center gap-2 mb-1">
                                            <span className="font-black text-sm uppercase tracking-wider">Bundle Deal Active</span>
                                        </div>
                                        <p className="text-xs font-semibold">10% Discount Applied!</p>
                                    </div>
                                )}

                                {/* Price */}
                                <div className="mb-6">
                                    {selectedProduct.price && (
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-sm text-gray-500 line-through font-medium">
                                                {formatPrice(selectedProduct.price + 10)}
                                            </span>
                                            {isBundle && (
                                                <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                                    -10%
                                                </span>
                                            )}
                                        </div>
                                    )}
                                    <div className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                                        {formatPrice(selectedProduct.price)}
                                    </div>
                                    {isBundle && (
                                        <p className="text-xs text-green-600 font-bold mt-1">Bundle discount already included!</p>
                                    )}
                                </div>

                                {/* Quantity */}
                                <div className="mb-6">
                                    <label className="block text-sm font-bold text-gray-900 mb-2">
                                        Quantity
                                    </label>
                                    <div className="flex items-center border-2 border-amber-200 rounded-xl overflow-hidden hover:border-amber-300 transition-colors">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="px-4 py-3 hover:bg-amber-50 transition-colors font-bold text-gray-700"
                                        >
                                            -
                                        </button>
                                        <span className="flex-1 text-center font-bold text-gray-900 text-lg">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="px-4 py-3 hover:bg-amber-50 transition-colors font-bold text-gray-700"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-4 mb-6 border-2 border-amber-200">
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-black text-gray-900">Total</span>
                                        <span className="text-2xl font-black bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                                            {subtotal}
                                        </span>
                                    </div>
                                </div>

                                {/* WhatsApp Button */}
                                <div className="space-y-3">
                                    <button
                                        onClick={handleWhatsAppInquiry}
                                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
                                    >
                                        Inquire on WhatsApp
                                        <FaWhatsapp className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Info Text */}
                                <p className="text-xs text-center text-gray-600 mt-4 leading-relaxed">
                                    Click the button to contact us on WhatsApp for payment and delivery details
                                </p>
                            </div>

                            {/* Trust Badge */}
                            {selectedProduct.rating > 0 && (
                                <div className="mt-6 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border-2 border-amber-200 shadow-lg">
                                    <div className="text-center">
                                        <div className="text-4xl font-black bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent mb-2">
                                            {selectedProduct.rating.toFixed(1)}/5
                                        </div>
                                        <div className="flex items-center justify-center gap-1 mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-5 h-5 ${i < Math.floor(selectedProduct.rating) ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}`}
                                                />
                                            ))}
                                        </div>
                                        {selectedProduct.reviewsCount > 0 && (
                                            <div className="text-sm text-gray-700 font-semibold">
                                                {selectedProduct.reviewsCount} verified reviews
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper Components
const AccordionSection = ({ title, isOpen, setIsOpen, icon, children }: any) => (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-100 overflow-hidden">
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full p-6 flex items-center justify-between hover:bg-amber-50 transition-colors"
        >
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-3">
                {icon}
                <span>{title}</span>
            </h2>
            {isOpen ? <ChevronUp className="w-6 h-6 text-gray-600" /> : <ChevronDown className="w-6 h-6 text-gray-600" />}
        </button>
        {isOpen && <div className="px-6 pb-6">{children}</div>}
    </div>
);

const InfoItem = ({ title, description }: any) => (
    <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border-2 border-amber-200 mb-3">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
            <p className="text-sm text-gray-800 font-semibold mb-1">{title}</p>
            <p className="text-xs text-gray-700">{description}</p>
        </div>
    </div>
);

const BenefitCard = ({ title, description }: any) => (
    <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Check className="w-5 h-5 text-white" />
        </div>
        <div>
            <h3 className="font-bold text-gray-900 mb-1 text-sm">{title}</h3>
            <p className="text-xs text-gray-700">{description}</p>
        </div>
    </div>
);

const FAQItem = ({ question, answer }: any) => (
    <div className="border-b border-gray-200 pb-4 mb-4 last:border-0 last:mb-0">
        <h3 className="font-bold text-gray-900 mb-2 text-sm">{question}</h3>
        <p className="text-sm text-gray-700 leading-relaxed">{answer}</p>
    </div>
);

// Loading Skeleton
const LoadingSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/10 to-white">
        <div className="border-b border-amber-100 bg-gradient-to-r from-amber-50/50 to-yellow-50/50">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="h-4 w-96 bg-amber-200 rounded animate-pulse"></div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    <div className="aspect-[16/10] bg-gradient-to-br from-amber-100 to-yellow-100 rounded-3xl animate-pulse"></div>
                    <div className="bg-white rounded-2xl p-6 border-2 border-amber-100">
                        <div className="h-8 w-3/4 bg-amber-200 rounded mb-4 animate-pulse"></div>
                        <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-3xl p-8 border-2 border-amber-200">
                        <div className="h-12 w-32 bg-amber-200 rounded mb-6 animate-pulse"></div>
                        <div className="h-10 w-full bg-amber-100 rounded mb-6 animate-pulse"></div>
                        <div className="h-16 w-full bg-green-200 rounded animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// Not Found State
const NotFoundState = () => (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/10 to-white flex items-center justify-center">
        <div className="text-center px-4">
            <div className="text-8xl font-black text-amber-200 mb-4">404</div>
            <h1 className="text-3xl font-black text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
            <Link
                to="/products"
                className="inline-block px-8 py-4 bg-gradient-to-r from-amber-500 via-yellow-600 to-amber-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
                Browse All Products
            </Link>
        </div>
    </div>
);