import { Mail, Phone, MapPin, BookOpen, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.png'
import { PaymentIcon } from 'react-svg-credit-card-payment-icons';

export default function Footer() {
  const quickLinks = [
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Contact", href: "/contact" }
  ];

  const phoneNumber = import.meta.env.VITE_CONTACT_NUMBER;
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
  const companyEmail = import.meta.env.VITE_COMPANY_EMAIL;
  const appURL = import.meta.env.VITE_APP_URL;

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-10 relative overflow-hidden">
      {/* Islamic geometric pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(251, 191, 36, 0.1) 20px, rgba(251, 191, 36, 0.1) 40px),
                          repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(251, 191, 36, 0.1) 20px, rgba(251, 191, 36, 0.1) 40px)`
        }}></div>
      </div>

      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Company Info with Logo */}
          <div className="flex flex-col items-center md:items-start gap-4 w-full md:w-auto">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group bg-yellow-100 p-3 rounded-xl shadow-lg">
              <img
                className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 transform group-hover:scale-110 transition-transform"
                src={Logo}
                alt="Tawaf Essentials Logo"
              />
              {/* <div className="flex flex-col">
                <span className="text-xs text-gray-700 font-semibold">Your Spiritual Journey Partner</span>
              </div> */}
            </Link>
            {/* Contact Info - Responsive Stack */}
            <div className="flex flex-col items-center md:items-start gap-3 mt-2">
              <div className="flex items-center gap-2 group">
                <div className="bg-gradient-to-br from-amber-500 to-yellow-600 p-1.5 rounded-lg group-hover:scale-110 transition-transform">
                  <MapPin className="w-4 h-4 text-white flex-shrink-0" />
                </div>
                <span className="text-sm text-center md:text-left font-medium">105 Hibson Rd,Nelson, Lancashire, BB9 0AU</span>
              </div>
              <div className="flex items-center gap-2 group">
                <div className="bg-gradient-to-br from-amber-500 to-yellow-600 p-1.5 rounded-lg group-hover:scale-110 transition-transform">
                  <Phone className="w-4 h-4 text-white flex-shrink-0" />
                </div>
                <a href={`tel:+${phoneNumber}`} className="text-sm hover:text-amber-400 transition-colors font-medium">
                  +{phoneNumber},
                </a>
                <a href={`tel:+${phoneNumber}`} className="text-sm hover:text-amber-400 transition-colors font-medium">
                  +{whatsappNumber}
                </a>
              </div>
              <div className="flex items-center gap-2 group">
                <div className="bg-gradient-to-br from-amber-500 to-yellow-600 p-1.5 rounded-lg group-hover:scale-110 transition-transform">
                  <Mail className="w-4 h-4 text-white flex-shrink-0" />
                </div>
                <a href={`mailto:${companyEmail}`} className="text-sm hover:text-amber-400 transition-colors break-all sm:break-normal font-medium">
                  {companyEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <div>
              <h3 className="text-amber-400 font-bold text-sm uppercase tracking-wider mb-3 text-center md:text-right">Quick Links</h3>
              <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 sm:gap-6">
                {quickLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-sm font-bold hover:text-amber-400 transition-colors relative group"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mission Statement */}
            <div className="text-center md:text-right max-w-md mt-4">
              <div className="flex items-center justify-center md:justify-end gap-2 mb-2">
                <Heart className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-bold text-amber-400">Our Mission</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Providing authentic Islamic resources and quality products to make your Umrah journey spiritually enriching and memorable.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-center items-center gap-3 sm:gap-4">
          <span className="text-xs sm:text-sm text-gray-400 font-medium">We Accept:</span>
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Visa */}
            <div className="rounded p-1.5 sm:p-2 shadow-lg hover:scale-105 transition-transform">
              <PaymentIcon className="w-10 h-6 sm:w-12 sm:h-7" type="Visa" format="flatRounded" />
            </div>
            {/* Mastercard */}
            <div className="rounded p-1.5 sm:p-2 shadow-lg hover:scale-105 transition-transform">
              <PaymentIcon className="w-10 h-6 sm:w-12 sm:h-7" type="Mastercard" format="flatRounded" />

            </div>
            <div className="rounded p-1.5 sm:p-2 shadow-lg hover:scale-105 transition-transform">
              <PaymentIcon className="w-10 h-6 sm:w-12 sm:h-7" type="Americanexpress" format="flatRounded" />

            </div>
          </div>
        </div>
        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-4 my-8">
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent to-amber-500/50"></div>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
          </div>
          <div className="w-24 h-0.5 bg-gradient-to-l from-transparent to-amber-500/50"></div>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-gray-400 font-medium">
            © 2025{' '}
            <a href={appURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 font-bold transition-colors"
            >
              Tawaf Essentials
            </a>
            {' '}• All rights reserved
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <BookOpen className="w-4 h-4 text-amber-500" />
            <p className="text-xs text-gray-500">Authentic Islamic Products & Spiritual Guidance</p>
          </div>
        </div>
      </div>

      {/* Bottom decorative border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
    </footer>
  );
}