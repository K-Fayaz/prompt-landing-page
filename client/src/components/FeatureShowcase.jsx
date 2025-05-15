import { useState } from 'react';
import { motion } from 'framer-motion';

const FeatureShowcase = () => {
    const [hoveredCard, setHoveredCard] = useState(null);

    const features = [
        {
            id: 1,
            title: "Instant Generation",
            description: "Transform your ideas into stunning landing pages within seconds using advanced AI technology",
            icon: "🚀"
        },
        {
            id: 2,
            title: "Custom Styling",
            description: "Personalize every aspect of your landing page with intelligent design recommendations",
            icon: "🎨"
        },
        {
            id: 3,
            title: "Responsive Design",
            description: "Automatically optimized for all devices ensuring perfect display across all screen sizes",
            icon: "📱"
        },
        {
            id: 4,
            title: "Smart Components",
            description: "AI-powered component suggestions that perfectly match your brand and requirements",
            icon: "🧩"
        },
        {
            id: 5,
            title: "SEO Optimization",
            description: "Built-in SEO best practices ensuring your landing page ranks well on search engines",
            icon: "📈"
        },
        {
            id: 6,
            title: "Real-time Preview",
            description: "See your changes instantly with live preview functionality as you customize",
            icon: "👁️"
        }
    ];

    const cardVariants = {
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    return (
        <section className="py-20 px-4 bg-gradient-to-br from-purple-900 to-indigo-900">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Powerful Features
                    </h2>
                    <p className="text-purple-200 text-lg max-w-2xl mx-auto">
                        Discover the magic of AI-powered landing page generation with our cutting-edge features
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature) => (
                        <motion.div
                            key={feature.id}
                            variants={cardVariants}
                            whileHover="hover"
                            className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-lg p-8 border border-white/20 hover:border-purple-400/50 transition-all duration-300"
                            onMouseEnter={() => setHoveredCard(feature.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold text-white mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-purple-200">
                                {feature.description}
                            </p>
                            <div 
                                className={`absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 transition-opacity duration-300 ${
                                    hoveredCard === feature.id ? 'opacity-100' : 'opacity-0'
                                }`}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureShowcase;
