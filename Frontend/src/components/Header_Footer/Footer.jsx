import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const quickLinks = [
    { title: 'About Us', path: '/about' },
    { title: 'Privacy Policy', path: '/privacy' },
    { title: 'Terms of Service', path: '/terms' },
    { title: 'Contact', path: '/contact' },
  ];

  const socialLinks = [
    { icon: '🌐', label: 'Website', url: 'https://crazystream.com' },
    { icon: '📱', label: 'Twitter', url: 'https://twitter.com' },
    { icon: '📸', label: 'Instagram', url: 'https://instagram.com' },
    { icon: '💼', label: 'LinkedIn', url: 'https://linkedin.com' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
            >
              Crazy Stream
            </motion.h3>
            <p className="text-sm text-gray-400">
              Transform your online gatherings into extraordinary experiences with our cutting-edge streaming platform.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <NavLink
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.title}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
            <ul className="space-y-2 text-gray-400">
              <motion.li
                whileHover={{ x: 5 }}
                className="flex items-center space-x-2"
              >
                <span>📧</span>
                <span>support@crazystream.com</span>
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                className="flex items-center space-x-2"
              >
                <span>📞</span>
                <span>+91 1234567890</span>
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                className="flex items-center space-x-2"
              >
                <span>📍</span>
                <span>Future Gali, Kanpur UP</span>
              </motion.li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Connect With Us</h4>
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-xl">{social.icon}</span>
                  <span>{social.label}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Crazy Stream. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <motion.a
                href="/terms"
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                whileHover={{ y: -2 }}
              >
                Terms
              </motion.a>
              <motion.a
                href="/privacy"
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                whileHover={{ y: -2 }}
              >
                Privacy
              </motion.a>
              <motion.a
                href="/cookies"
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                whileHover={{ y: -2 }}
              >
                Cookies
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
