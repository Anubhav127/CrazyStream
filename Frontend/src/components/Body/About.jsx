import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Mission Section */}
      <div className="container mx-auto max-w-4xl mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            About Crazy Stream
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            We're on a mission to revolutionize the way people connect and communicate through live streaming.
          </p>
        </motion.div>
      </div>

      {/* Values Section */}
      <div className="container mx-auto max-w-6xl mb-16">
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl hover:shadow-xl transition-all duration-300"
            >
              <div className="text-3xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-blue-400">{value.title}</h3>
              <p className="text-gray-400">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto max-w-6xl mb-16">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
        >
          Meet Our Team
        </motion.h2>
        <div className="grid md:grid-cols-1 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-3xl">
                {member.avatar}
              </div>
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              <p className="text-gray-400">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Technology Section */}
      <div className="container mx-auto max-w-4xl mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Powered by Modern Technology</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {technologies.map((tech, index) => (
              <div key={index} className="p-4">
                <div className="text-3xl mb-2">{tech.icon}</div>
                <p className="text-sm text-gray-400">{tech.name}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Join Us?</h2>
          <p className="text-xl mb-8">Experience the future of streaming today</p>
          <Link
            to="/register"
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
          >
            Get Started
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

// Values data
const values = [
  {
    icon: '🌟',
    title: 'Innovation',
    description: 'Constantly pushing boundaries to deliver cutting-edge streaming solutions.',
  },
  {
    icon: '🤝',
    title: 'Community',
    description: 'Building meaningful connections through seamless communication.',
  },
  {
    icon: '💡',
    title: 'Excellence',
    description: 'Committed to providing the highest quality streaming experience.',
  },
];

// Team data
const team = [
  {
    avatar: '👨‍💻',
    name: 'Anubhav Verma',
    role: 'Founder & CEO',
  },
];

// Technologies
const technologies = [
  { icon: '⚛️', name: 'React' },
  { icon: '🔄', name: 'Redux' },
  { icon: '🎨', name: 'Tailwind CSS' },
  { icon: '🚀', name: 'WebRTC' },
];

export default About;
