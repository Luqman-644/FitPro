import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Workouts', path: '/workouts' },
        { name: 'Nutrition', path: '/nutrition' },
        { name: 'Shop', path: '/shop' },
        { name: 'Stopwatch', path: '/stopwatch' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
        { name: 'Ai Assistant', path: '/aiassistant' },
    ];

    return (
        <header className="bg-black/90 backdrop-blur-sm sticky top-0 z-50 border-b border-orange-900/30">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2">
                    <div className="w-20 h-10 rounded-full flex items-center justify-center">
                        <a href="https://ibb.co/GQP8704Z"><img src="https://i.ibb.co/TMh7ckxQ/image-removebg-preview.png" alt="image-removebg-preview" border="0" /></a>
                    </div>
                    <span className="text-2xl font-bold gradient-text">FitPro</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8">
                    {navItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            className="text-gray-300 hover:text-orange-500 transition-colors duration-300 font-medium"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-orange-500 focus:outline-none"
                    onClick={toggleMenu}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        {isMenuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>

                {/* User Section */}
                <div className="hidden md:flex items-center space-x-4">
                    {user ? (
                        <>
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-full orange-gradient flex items-center justify-center">
                                    <span className="text-black text-sm font-bold">
                                        {user.name.charAt(0)}
                                    </span>
                                </div>
                                <span className="text-gray-300">{user.name}</span>
                            </div>
                            <Link to="/profile">
                                <Button variant="secondary">Profile</Button>
                            </Link>
                            <Button onClick={logout}>Logout</Button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="px-4 py-2 rounded-lg border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black transition-all duration-300"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="px-4 py-2 rounded-lg orange-gradient text-black font-medium hover:orange-gradient-hover transition-all duration-300"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden bg-black/95 backdrop-blur-sm"
                >
                    <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                        {navItems.map((item, index) => (
                            <Link
                                key={index}
                                to={item.path}
                                className="text-gray-300 hover:text-orange-500 transition-colors duration-300 font-medium py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}

                        {user ? (
                            <div className="flex flex-col space-y-3 pt-4 border-t border-gray-800">
                                <div className="flex items-center space-x-2 py-2">
                                    <div className="w-8 h-8 rounded-full orange-gradient flex items-center justify-center">
                                        <span className="text-black text-sm font-bold">
                                            {user.name.charAt(0)}
                                        </span>
                                    </div>
                                    <span className="text-gray-300">{user.name}</span>
                                </div>
                                <Link
                                    to="/profile"
                                    className="px-4 py-2 rounded-lg border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black transition-all duration-300 text-center"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="px-4 py-2 rounded-lg orange-gradient text-black font-medium hover:orange-gradient-hover transition-all duration-300 text-center"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col space-y-3 pt-4 border-t border-gray-800">
                                <Link
                                    to="/login"
                                    className="px-4 py-2 rounded-lg border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black transition-all duration-300 text-center"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-4 py-2 rounded-lg orange-gradient text-black font-medium hover:orange-gradient-hover transition-all duration-300 text-center"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </header>
    );
};

export default Header;