import React from "react";

const Footer = () => {
  const quickLinks = [
    { title: "Home", url: "#" },
    { title: "Features", url: "#" },
    { title: "Pricing", url: "#" },
    { title: "Documentation", url: "#" }
  ];

  const companyInfo = [
    { title: "About Us", url: "#" },
    { title: "Contact", url: "#" },
    { title: "Privacy Policy", url: "#" },
    { title: "Terms of Service", url: "#" }
  ];

  const socialLinks = [
    { icon: "fab fa-twitter", url: "#" },
    { icon: "fab fa-linkedin", url: "#" },
    { icon: "fab fa-github", url: "#" },
    { icon: "fab fa-discord", url: "#" }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-br from-purple-900 to-indigo-900 text-white py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              LandingAI
            </h3>
            <p className="text-gray-300">
              Transform your ideas into beautiful landing pages with the power of AI.
              Just describe what you want, and we'll create it.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {companyInfo.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-purple-800 rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <button className="px-4 py-2 bg-purple-500 hover:bg-purple-400 transition-colors duration-300 rounded-r-md">
                  Subscribe
                </button>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="text-gray-300 hover:text-white transform hover:scale-110 transition-all duration-300"
                  >
                    <i className={`${social.icon} text-xl`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-purple-800 text-center text-gray-300">
          <p>© 2024 LandingAI. All rights reserved.</p>
        </div>

        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-purple-500 hover:bg-purple-400 p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
          aria-label="Scroll to top"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            ></path>
          </svg>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
