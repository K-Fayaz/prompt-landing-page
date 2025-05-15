import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Features', href: '#features' },
        { name: 'Demo', href: '#demo' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Contact', href: '#contact' }
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed w-full z-50 transition-all duration-300 ${
                isScrolled ? 'py-2 bg-white/80 backdrop-blur-lg shadow-lg' : 'py-4 bg-transparent'
            }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center space-x-2"
                    >
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">AI</span>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                            LandingAI
                        </span>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                whileHover={{ scale: 1.1 }}
                                className={`hover:text-purple-600 transition-colors duration-300 ${isScrolled ? 'text-gray-700': 'text-white'}`}
                            >
                                {link.name}
                            </motion.a>
                        ))}
                    </div>

                    {/* Try Now Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden md:block px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
                    >
                        Try Now
                    </motion.button>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-lg focus:outline-none"
                        >
                            <div className="w-6 h-5 relative flex flex-col justify-between">
                                <span className={`w-full h-0.5 bg-gray-800 transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                                <span className={`w-full h-0.5 bg-gray-800 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                                <span className={`w-full h-0.5 bg-gray-800 transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <motion.div
                    initial={false}
                    animate={{ height: isMobileMenuOpen ? 'auto' : 0, opacity: isMobileMenuOpen ? 1 : 0 }}
                    className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'mt-4' : ''}`}
                >
                    <div className="flex flex-col space-y-4 pb-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-gray-700 hover:text-purple-600 transition-colors duration-300"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
                        >
                            Try Now
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
