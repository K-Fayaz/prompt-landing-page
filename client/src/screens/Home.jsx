import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeatureShowcase from '../components/FeatureShowcase';
import GenerationDemo from '../components/GenerationDemo';
import PricingSection from '../components/PricingSection';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

const App = () => {
    useEffect(() => {
        document.title = 'LandingAI - AI Powered Landing Page Generator';
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden"
        >
            <div className="relative z-10">
                <Navbar />
                
                <main>
                    <HeroSection />
                    <FeatureShowcase />
                    <GenerationDemo />
                    <PricingSection />
                    <Testimonials />
                    <ContactForm />
                </main>

                <Footer />
            </div>

            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 mix-blend-overlay" />
                <div className="absolute inset-0 bg-noise opacity-5" />
            </div>
        </motion.div>
    );
};

export default App;