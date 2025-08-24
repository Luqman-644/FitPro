import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerLinks = {
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Contact Us', path: '/contact' },
      { name: 'Careers', path: '#' },
      { name: 'Blog', path: '#' },
    ],
    support: [
      { name: 'Help Center', path: '#' },
      { name: 'FAQs', path: '#' },
      { name: 'Terms of Service', path: '#' },
      { name: 'Privacy Policy', path: '#' },
    ],
    fitness: [
      { name: 'Workouts', path: '/workouts' },
      { name: 'Nutrition Plans', path: '/nutrition' },
      { name: 'Fitness Shop', path: '/shop' },
      { name: 'Fitness Tools', path: '/stopwatch' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: 'f', url: '#' },
    { name: 'Twitter', icon: 't', url: '#' },
    { name: 'Instagram', icon: 'i', url: '#' },
    { name: 'YouTube', icon: 'y', url: '#' },
  ];

  return (
    <footer className="bg-gray-900 border-t border-orange-900/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-20 h-10 rounded-full flex items-center justify-center">
                <img src="public/image-removebg-preview.png" alt="" />
              </div>
              <span className="text-2xl font-bold gradient-text">FitPro</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Your ultimate fitness companion for achieving your health goals with personalized workouts, nutrition plans, and expert guidance.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-orange-500 hover:bg-orange-500 hover:text-black transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.name}
                >
                  <span className="font-bold">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Fitness Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Fitness</h3>
            <ul className="space-y-2">
              {footerLinks.fitness.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} FitPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;