import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Product Manager",
            company: "TechCorp Solutions",
            image: "https://picsum.photos/id/64/100/100",
            companyLogo: "https://picsum.photos/id/28/50/50",
            text: "This AI landing page generator has revolutionized our workflow. We've reduced our design time by 80% while maintaining exceptional quality.",
            metrics: "Reduced design time by 80%"
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Startup Founder",
            company: "InnovatePro",
            image: "https://picsum.photos/id/65/100/100",
            companyLogo: "https://picsum.photos/id/29/50/50",
            text: "Incredible tool! Generated perfectly responsive landing pages in minutes. Our conversion rate improved by 45% after switching to AI-generated pages.",
            metrics: "45% increase in conversions"
        },
        {
            id: 3,
            name: "Emma Davis",
            role: "Marketing Director",
            company: "Growth Dynamics",
            image: "https://picsum.photos/id/66/100/100",
            companyLogo: "https://picsum.photos/id/30/50/50",
            text: "The AI understands design principles better than many professionals. We've saved thousands on design costs while scaling our marketing efforts.",
            metrics: "60% cost reduction"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isHovered) {
                setCurrentIndex((prevIndex) =>
                    prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
                );
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [isHovered]);

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        What Our Users Say
                    </h2>
                    <p className="text-xl text-gray-600">
                        Real results from real customers
                    </p>
                </div>

                <div 
                    className="relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="overflow-hidden">
                        <motion.div
                            className="flex"
                            animate={{
                                x: `-${currentIndex * 100}%`
                            }}
                            transition={{
                                duration: 0.5,
                                ease: "easeInOut"
                            }}
                        >
                            {testimonials.map((testimonial) => (
                                <div
                                    key={testimonial.id}
                                    className="w-full flex-shrink-0 px-4"
                                >
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        className="bg-white rounded-xl shadow-lg p-8 relative"
                                    >
                                        <div className="flex items-center mb-6">
                                            <img
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                className="w-16 h-16 rounded-full object-cover"
                                            />
                                            <div className="ml-4">
                                                <h3 className="text-xl font-semibold text-gray-900">
                                                    {testimonial.name}
                                                </h3>
                                                <p className="text-gray-600">
                                                    {testimonial.role}
                                                </p>
                                                <div className="flex items-center mt-2">
                                                    <img
                                                        src={testimonial.companyLogo}
                                                        alt={testimonial.company}
                                                        className="w-8 h-8 object-contain"
                                                    />
                                                    <span className="ml-2 text-sm text-gray-500">
                                                        {testimonial.company}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mb-6">
                                            {testimonial.text}
                                        </p>
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <p className="text-blue-600 font-semibold">
                                                {testimonial.metrics}
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    <div className="flex justify-center mt-8 space-x-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                                    currentIndex === index
                                        ? "bg-blue-600"
                                        : "bg-gray-300"
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
