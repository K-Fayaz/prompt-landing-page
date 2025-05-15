import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
    const [text, setText] = useState('');
    const fullText = 'Create stunning landing pages instantly with AI';
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        let currentText = '';
        let currentIndex = 0;

        const typingInterval = setInterval(() => {
            if (currentIndex < fullText.length) {
                currentText += fullText[currentIndex];
                setText(currentText);
                currentIndex++;
            } else {
                clearInterval(typingInterval);
            }
        }, 100);

        return () => clearInterval(typingInterval);
    }, []);

    useEffect(() => {
        const generateParticles = () => {
            const newParticles = Array.from({ length: 50 }, (_, i) => ({
                id: i,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: Math.random() * 4 + 1
            }));
            setParticles(newParticles);
        };

        generateParticles();
        window.addEventListener('resize', generateParticles);
        return () => window.removeEventListener('resize', generateParticles);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center overflow-hidden relative">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute bg-blue-400 rounded-full opacity-30"
                    initial={{ x: particle.x, y: particle.y }}
                    animate={{
                        x: particle.x + Math.random() * 100 - 50,
                        y: particle.y + Math.random() * 100 - 50
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                    style={{
                        width: particle.size,
                        height: particle.size
                    }}
                />
            ))}
            
            <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center">
                <div className="w-full lg:w-1/2 text-center lg:text-left">
                    <motion.h1 
                        className="text-4xl md:text-6xl font-bold text-white mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        AI Landing Page Generator
                    </motion.h1>
                    
                    <motion.p 
                        className="text-xl md:text-2xl text-blue-200 mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        {text}
                    </motion.p>
                    
                    <motion.button 
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Start Creating Now
                    </motion.button>
                </div>
                
                <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
                    <motion.div 
                        className="relative bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        
                        <motion.div 
                            className="space-y-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1 }}
                        >
                            <div className="h-4 bg-white/20 rounded w-3/4"></div>
                            <div className="h-4 bg-white/20 rounded w-1/2"></div>
                            <div className="h-4 bg-white/20 rounded w-5/6"></div>
                            <div className="h-4 bg-white/20 rounded w-2/3"></div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
