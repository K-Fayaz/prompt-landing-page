import { useState } from 'react';
import { motion } from 'framer-motion';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.name.trim()) tempErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            tempErrors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
            tempErrors.email = 'Invalid email address';
        }
        if (!formData.message.trim()) tempErrors.message = 'Message is required';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 1500));
                setSubmitStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } catch (error) {
                setSubmitStatus('error');
            } finally {
                setIsSubmitting(false);
                setTimeout(() => setSubmitStatus(null), 3000);
            }
        }
    };

    return (
        <section className="py-16 px-4 bg-white">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Get in Touch</h2>
                    <p className="text-gray-600">Have questions? We'd love to hear from you.</p>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    <div className="relative">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border-2 rounded-lg outline-none transition-all duration-200 ${
                                errors.name ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                            }`}
                            placeholder=" "
                        />
                        <label className={`absolute left-4 transition-all duration-200 pointer-events-none text-gray-500
                            ${formData.name ? '-translate-y-6 text-sm bg-white px-2' : 'top-3'}`}>
                            Your Name
                        </label>
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border-2 rounded-lg outline-none transition-all duration-200 ${
                                errors.email ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                            }`}
                            placeholder=" "
                        />
                        <label className={`absolute left-4 transition-all duration-200 pointer-events-none text-gray-500
                            ${formData.email ? '-translate-y-6 text-sm bg-white px-2' : 'top-3'}`}>
                            Email Address
                        </label>
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div className="relative">
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows="4"
                            className={`w-full px-4 py-3 border-2 rounded-lg outline-none transition-all duration-200 ${
                                errors.message ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                            }`}
                            placeholder=" "
                        ></textarea>
                        <label className={`absolute left-4 transition-all duration-200 pointer-events-none text-gray-500
                            ${formData.message ? '-translate-y-6 text-sm bg-white px-2' : 'top-3'}`}>
                            Your Message
                        </label>
                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 px-6 text-white font-medium bg-blue-600 rounded-lg 
                            hover:bg-blue-700 transition-colors duration-200 disabled:opacity-70"
                    >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </motion.button>
                </motion.form>

                {submitStatus && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mt-4 p-4 rounded-lg ${
                            submitStatus === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}
                    >
                        {submitStatus === 'success' 
                            ? 'Thank you! Your message has been sent successfully.' 
                            : 'Oops! Something went wrong. Please try again.'}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default ContactForm;
