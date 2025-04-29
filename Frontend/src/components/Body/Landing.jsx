import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Features data
const features = [
  {
    icon: '🎥',
    title: 'High-Quality Streaming',
    description: 'Crystal clear video and audio quality for professional presentations and seamless communication.',
  },
  {
    icon: '🔒',
    title: 'Secure Platform',
    description: 'End-to-end encryption and advanced security measures to protect your content and participants.',
  },
  {
    icon: '⚡',
    title: 'Low Latency',
    description: 'Real-time interaction with minimal delay for engaging and interactive streaming sessions.',
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center md:text-left"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Welcome to Crazy Stream
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Transform ordinary online gatherings into extraordinary experiences with our cutting-edge streaming platform.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/register"
                className="px-8 py-3 bg-blue-600 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-8 py-3 bg-gray-700 rounded-full font-semibold hover:bg-gray-600 transition-colors duration-300"
              >
                Login
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex justify-center"
          >
            <div className="w-full max-w-md p-8 bg-gray-800 rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300">
              <div className="aspect-video rounded-lg bg-gray-700 mb-4 flex items-center justify-center">
                <span className="text-6xl">🎥</span>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded-full w-3/4"></div>
                <div className="h-4 bg-gray-700 rounded-full w-1/2"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
          Why Choose Crazy Stream?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 p-6 rounded-xl hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Streaming?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Join our community and experience the future of online gatherings
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
          >
            Create Account
          </Link>
        </motion.div>
      </div>
    </div>

  )
}

export default Landing;
