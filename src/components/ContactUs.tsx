import { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send, Sparkles, Clock, CheckCircle } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';

function ContactForm() {
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [responseMessage, setResponseMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const phoneNumber = import.meta.env.VITE_CONTACT_NUMBER;
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
    const companyEmail = import.meta.env.VITE_COMPANY_EMAIL;
    const appURL = import.meta.env.VITE_APP_URL;


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Get reCAPTCHA token
        const recaptchaToken = recaptchaRef.current?.getValue();

        if (!recaptchaToken) {
            setFormStatus('error');
            setResponseMessage('Please complete the reCAPTCHA verification.');
            return;
        }

        setFormStatus('loading');
        setResponseMessage('');

        try {
            // Send form data to PHP backend
            const response = await fetch(`${appURL}/api/contact.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    recaptchaToken: recaptchaToken
                })
            });

            const result = await response.json();

            if (result.success) {
                setFormStatus('success');
                setResponseMessage(result.message || 'Jazakallah Khair! Your message has been sent successfully. We\'ll respond within 24 hours insha\'Allah.');
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    message: ''
                });
                // Reset reCAPTCHA
                recaptchaRef.current?.reset();
            } else {
                setFormStatus('error');
                setResponseMessage(result.message || 'Something went wrong. Please try again or contact us directly.');
                // Reset reCAPTCHA on error
                recaptchaRef.current?.reset();
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setFormStatus('error');
            setResponseMessage('Network error. Please check your connection and try again.');
            recaptchaRef.current?.reset();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
                {/* Header */}
                <div className="text-center mb-12 sm:mb-16 md:mb-20">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-amber-200 px-5 py-2.5 rounded-full mb-6">
                        <Sparkles className="w-4 h-4 text-amber-700" />
                        <span className="text-amber-800 text-sm font-bold uppercase tracking-wider">Get In Touch</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-4 sm:mb-5 px-2">
                        Contact Us
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-medium max-w-2xl mx-auto">
                        Have questions about your Umrah journey? We're here to guide you!
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
                    {/* Contact Form */}
                    <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border-2 border-amber-100">
                        <div className="flex items-center gap-3 mb-6 sm:mb-8">
                            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                                <Send className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">Send a Message</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                            <div>
                                <label className="block text-sm font-black text-gray-900 mb-2">
                                    Your Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    disabled={formStatus === 'loading'}
                                    className="w-full px-4 sm:px-5 py-3 sm:py-4 text-base border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all font-medium"
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-black text-gray-900 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    disabled={formStatus === 'loading'}
                                    className="w-full px-4 sm:px-5 py-3 sm:py-4 text-base border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all font-medium"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-black text-gray-900 mb-2">
                                    Your Message *
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    disabled={formStatus === 'loading'}
                                    rows={6}
                                    className="w-full px-4 sm:px-5 py-3 sm:py-4 text-base border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 resize-none disabled:bg-gray-100 disabled:cursor-not-allowed transition-all font-medium"
                                    placeholder="Tell us about your Umrah plans or questions..."
                                />
                            </div>

                            {/* reCAPTCHA v2 */}
                            <div className="flex justify-center">
                                <ReCAPTCHA
                                    ref={recaptchaRef}
                                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                                    theme="light"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={formStatus === 'loading'}
                                className="w-full bg-gradient-to-r from-amber-500 via-yellow-600 to-amber-600 hover:from-amber-600 hover:via-yellow-700 hover:to-amber-700 text-white font-black py-4 sm:py-5 text-base sm:text-lg rounded-xl transition-all flex items-center justify-center gap-3 shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {formStatus === 'loading' ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-white"></div>
                                        Sending Message...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5 sm:w-6 sm:h-6" />
                                        Send Message
                                    </>
                                )}
                            </button>

                            {/* reCAPTCHA Notice */}
                            <p className="text-xs text-gray-500 text-center font-medium">
                                This site is protected by reCAPTCHA and the Google{' '}
                                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:text-amber-800 font-bold">
                                    Privacy Policy
                                </a>{' '}
                                and{' '}
                                <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:text-amber-800 font-bold">
                                    Terms of Service
                                </a>{' '}
                                apply.
                            </p>
                        </form>

                        {/* Status Messages */}
                        {formStatus === 'success' && (
                            <div className="mt-6 p-5 bg-green-50 border-2 border-green-200 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                    <p className="text-green-700 font-bold text-base">
                                        {responseMessage}
                                    </p>
                                </div>
                            </div>
                        )}
                        {formStatus === 'error' && (
                            <div className="mt-6 p-5 bg-red-50 border-2 border-red-200 rounded-xl">
                                <p className="text-red-700 font-bold text-base">
                                    ❌ {responseMessage}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Contact Info & Map */}
                    <div className="space-y-6 sm:space-y-8">
                        {/* Contact Info */}
                        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border-2 border-amber-100">
                            <div className="flex items-center gap-3 mb-6 sm:mb-8">
                                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <Mail className="w-6 h-6 text-white" />
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-black text-gray-900">Contact Details</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-xl hover:shadow-lg transition-all">
                                    <div className="bg-gradient-to-br from-amber-500 to-yellow-600 p-3 rounded-xl flex-shrink-0 shadow-md">
                                        <Phone className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-black text-base text-gray-900 mb-1">Phone</h3>
                                        <a href={`tel:+${phoneNumber}`} className="text-sm text-amber-700 hover:text-amber-800 transition-colors break-all font-bold">
                                            +{phoneNumber},
                                        </a>
                                        <br />
                                        <a href={`tel:+${phoneNumber}`} className="text-sm text-amber-700 hover:text-amber-800 transition-colors break-all font-bold">
                                            +{whatsappNumber}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-xl hover:shadow-lg transition-all">
                                    <div className="bg-gradient-to-br from-amber-500 to-yellow-600 p-3 rounded-xl flex-shrink-0 shadow-md">
                                        <Mail className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-black text-base text-gray-900 mb-1">Email</h3>
                                        <a href={`mailto:${companyEmail}`} className="text-sm text-amber-700 hover:text-amber-800 transition-colors break-all font-bold">
                                            {companyEmail}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-xl hover:shadow-lg transition-all">
                                    <div className="bg-gradient-to-br from-amber-500 to-yellow-600 p-3 rounded-xl flex-shrink-0 shadow-md">
                                        <MapPin className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-black text-base text-gray-900 mb-1">Address</h3>
                                        <p className="text-sm text-gray-700 font-medium">105 Hibson Rd,
                                            Nelson, </p>
                                        <p className="text-sm text-gray-700 font-medium">Lancashire, BB9 0AU</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-xl hover:shadow-lg transition-all">
                                    <div className="bg-gradient-to-br from-amber-500 to-yellow-600 p-3 rounded-xl flex-shrink-0 shadow-md">
                                        <Clock className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-black text-base text-gray-900 mb-1">Support Hours</h3>
                                        <p className="text-sm text-gray-700 font-medium">24/7 Guidance Available</p>
                                        <p className="text-xs text-gray-600 font-medium mt-1">We're always here to help!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* add proper address in map when it is provided */}
                        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-100 h-72 sm:h-80">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2802.3397729599524!2d-2.2201697228067587!3d53.830390372433605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487b911480dadc99%3A0xc51917baa9b047a7!2s105%20Hibson%20Rd%2C%20Nelson%20BB9%200AU%2C%20UK!5e1!3m2!1sen!2sae!4v1766839344064!5m2!1sen!2sae"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="105 Hibson Rd, Nelson BB9 0AU, UK"
                            />
                        </div>
                    </div>
                </div>

                {/* Trust Banner */}
                <div className="mt-12 sm:mt-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 sm:p-10 text-center text-white shadow-2xl relative overflow-hidden">
                    {/* Islamic pattern overlay */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(251, 191, 36, 0.1) 20px, rgba(251, 191, 36, 0.1) 40px),
                                            repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(251, 191, 36, 0.1) 20px, rgba(251, 191, 36, 0.1) 40px)`
                        }}></div>
                    </div>

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-amber-400/30">
                            <CheckCircle className="w-4 h-4 text-amber-400" />
                            <span className="text-amber-300 text-sm font-bold uppercase tracking-wider">Why Contact Us?</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-black mb-4">We're Here to Guide Your Spiritual Journey</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto">
                            <div className="bg-white/10 backdrop-blur-sm border border-amber-400/20 rounded-2xl p-6">
                                <div className="text-3xl font-black mb-2 text-amber-400">24/7</div>
                                <p className="text-amber-100 text-sm font-semibold">Expert Support</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm border border-amber-400/20 rounded-2xl p-6">
                                <div className="text-3xl font-black mb-2 text-amber-400">&lt; 1hr</div>
                                <p className="text-amber-100 text-sm font-semibold">Response Time</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm border border-amber-400/20 rounded-2xl p-6">
                                <div className="text-3xl font-black mb-2 text-amber-400">100K+</div>
                                <p className="text-amber-100 text-sm font-semibold">Satisfied Pilgrims</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactForm;