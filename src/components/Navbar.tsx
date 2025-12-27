import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import Logo from '../assets/Logo.png'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleWhatsAppClick = () => {
        const phoneNumber = '+971545613397';
        const message = 'Hello! I would like to inquire about your Umrah products and services.';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <>
            {/* Main Navbar - Premium Islamic Theme */}
            <nav className={`sticky top-0 z-50 bg-white transition-all duration-300 ${isScrolled ? 'shadow-xl' : 'shadow-md'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between lg:justify-start h-20">
                        {/* Mobile menu button - Left */}
                        <div className="lg:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-700 hover:text-emerald-700 p-2"
                                aria-label="mobile-menu-button"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>

                        {/* Logo - Centered on mobile, left on desktop */}
                        <Link to="/" className="flex items-center gap-2 sm:gap-3 group absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
                            <div className="flex-shrink-0">
                                <img
                                    loading='lazy'
                                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 transform group-hover:scale-110 transition-transform duration-300"
                                    src={Logo}
                                    alt="Tawaf Essentials Logo"
                                />
                            </div>
                            {/* <div className="flex flex-col">
                                <span className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 bg-clip-text text-transparent leading-tight">
                                    Tawaf Essentials
                                </span>
                                <span className="text-[10px] sm:text-xs text-gray-600 font-medium">
                                    Your Spiritual Journey Partner
                                </span>
                            </div> */}
                        </Link>

                        {/* Spacer for mobile to balance the layout */}
                        <div className="lg:hidden w-10"></div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-8 ml-auto">
                            <Link
                                to="/Screen2"
                                className="text-gray-700 hover:text-emerald-700 font-semibold transition-colors relative group"
                            >
                                Screen 2
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-700 to-teal-700 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                            <Link
                                to="/Screen3"
                                className="text-gray-700 hover:text-emerald-700 font-semibold transition-colors relative group"
                            >
                                Screen 3
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-700 to-teal-700 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                            <Link
                                to="/Screen4"
                                className="text-gray-700 hover:text-emerald-700 font-semibold transition-colors relative group"
                            >
                                Screen 4
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-700 to-teal-700 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                            <Link
                                to="/Screen5"
                                className="text-gray-700 hover:text-emerald-700 font-semibold transition-colors relative group"
                            >
                                Screen 5
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-700 to-teal-700 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                            <Link
                                to="/products"
                                className="text-gray-700 hover:text-emerald-700 font-semibold transition-colors relative group"
                            >
                                Products
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-700 to-teal-700 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                            <Link
                                to="/ebooks"
                                className="text-gray-700 hover:text-emerald-700 font-semibold transition-colors relative group"
                            >
                                E-Book
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-700 to-teal-700 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                            <Link
                                to="/about"
                                className="text-gray-700 hover:text-emerald-700 font-semibold transition-colors relative group"
                            >
                                About Us
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-700 to-teal-700 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                            <Link
                                to="/contact"
                                className="text-gray-700 hover:text-emerald-700 font-semibold transition-colors relative group"
                            >
                                Contact
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-700 to-teal-700 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        </div>

                        {/* Right Side - WhatsApp Button */}
                        <div className="hidden lg:flex items-center gap-4">
                            <button
                                onClick={handleWhatsAppClick}
                                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-6 py-2.5 rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                <FaWhatsapp className="w-5 h-5" />
                                <span>Connect on WhatsApp</span>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {isMenuOpen && (
                        <div className="lg:hidden pb-4 border-t border-gray-100">
                            <div className="flex flex-col space-y-1 pt-4">
                                <Link
                                    to="/Screen2"
                                    className="text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 font-semibold py-3 px-4 rounded-lg transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Screen 2
                                </Link>
                                <Link
                                    to="/Screen3"
                                    className="text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 font-semibold py-3 px-4 rounded-lg transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Screen 3
                                </Link>
                                <Link
                                    to="/Screen4"
                                    className="text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 font-semibold py-3 px-4 rounded-lg transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Screen 4
                                </Link>
                                <Link
                                    to="/Screen5"
                                    className="text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 font-semibold py-3 px-4 rounded-lg transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Screen 5
                                </Link>
                                <Link
                                    to="/products"
                                    className="text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 font-semibold py-3 px-4 rounded-lg transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Products
                                </Link>
                                <Link
                                    to="/ebooks"
                                    className="text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 font-semibold py-3 px-4 rounded-lg transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    E-Books
                                </Link>
                                <Link
                                    to="/about"
                                    className="text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 font-semibold py-3 px-4 rounded-lg transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    About Us
                                </Link>
                                <Link
                                    to="/contact"
                                    className="text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 font-semibold py-3 px-4 rounded-lg transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Contact
                                </Link>

                                <div className="border-t border-gray-100 pt-4 mt-4 px-4">
                                    <button
                                        onClick={() => {
                                            handleWhatsAppClick();
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-full shadow-lg transition-all"
                                    >
                                        <FaWhatsapp className="w-5 h-5" />
                                        <span>Connect on WhatsApp</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
}