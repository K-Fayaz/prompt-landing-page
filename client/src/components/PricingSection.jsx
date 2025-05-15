import { useState } from 'react';
import { motion } from 'framer-motion';

const PricingSection = () => {
    const [hoveredPlan, setHoveredPlan] = useState(null);

    const plans = [
        {
            name: "Basic",
            price: "$29",
            period: "/month",
            description: "Perfect for individuals and small projects",
            features: [
                "Unlimited Landing Pages",
                "AI-Powered Generation",
                "Basic Templates",
                "24/7 Support",
                "Export to HTML/CSS",
                "Basic Analytics"
            ],
            isPopular: false
        },
        {
            name: "Pro",
            price: "$79",
            period: "/month",
            description: "Ideal for growing businesses",
            features: [
                "Everything in Basic",
                "Custom Branding",
                "Advanced Templates",
                "Priority Support",
                "SEO Optimization",
                "Advanced Analytics",
                "Custom Domains",
                "Team Collaboration"
            ],
            isPopular: true
        },
        {
            name: "Enterprise",
            price: "$199",
            period: "/month",
            description: "For large organizations",
            features: [
                "Everything in Pro",
                "Dedicated Account Manager",
                "Custom AI Training",
                "API Access",
                "White Label Solution",
                "99.9% Uptime SLA",
                "Advanced Security",
                "Custom Integration"
            ],
            isPopular: false
        }
    ];

    return (
        <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Choose Your Plan
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Select the perfect plan for your needs and start creating stunning landing pages instantly
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            className={`relative rounded-2xl p-1 ${
                                plan.isPopular ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500' : 'bg-gradient-to-r from-gray-800 to-gray-700'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                            onHoverStart={() => setHoveredPlan(index)}
                            onHoverEnd={() => setHoveredPlan(null)}
                        >
                            <div className="h-full bg-gray-900 rounded-2xl p-8">
                                {plan.isPopular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                                            Most Popular
                                        </span>
                                    </div>
                                )}
                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                                    <p className="text-gray-400 mb-6">{plan.description}</p>
                                    <div className="mb-8">
                                        <span className="text-4xl font-bold text-white">{plan.price}</span>
                                        <span className="text-gray-400">{plan.period}</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {plan.features.map((feature, featureIndex) => (
                                        <motion.div
                                            key={featureIndex}
                                            className="flex items-center text-gray-300"
                                            initial={{ opacity: 0.8 }}
                                            animate={{ opacity: hoveredPlan === index ? 1 : 0.8 }}
                                        >
                                            <svg
                                                className="w-5 h-5 text-green-500 mr-3"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                            {feature}
                                        </motion.div>
                                    ))}
                                </div>
                                <motion.button
                                    className={`w-full mt-8 py-3 px-6 rounded-lg font-semibold ${
                                        plan.isPopular
                                            ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white'
                                            : 'bg-gray-700 text-white hover:bg-gray-600'
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Get Started
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
