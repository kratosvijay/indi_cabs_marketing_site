import React, { useState } from 'react';
import { Menu, X, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Link to="/" className="ml-2 text-2xl font-bold text-gray-900">
                            Indi <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Cabs</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-600 hover:text-indigo-500 transition-colors">Home</Link>
                        <Link to="/about" className="text-gray-600 hover:text-indigo-500 transition-colors">About</Link>
                        <Link to="/contact" className="text-gray-600 hover:text-indigo-500 transition-colors">Contact</Link>
                        <button className="bg-gradient-to-r from-blue-400 to-indigo-400 text-white px-6 py-2 rounded-full font-medium hover:opacity-90 transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30 flex items-center gap-2">
                            <Smartphone size={18} />
                            Download App
                        </button>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-white border-b border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="block px-3 py-2 text-gray-600 hover:text-indigo-500 hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>Home</Link>
                        <Link to="/about" className="block px-3 py-2 text-gray-600 hover:text-indigo-500 hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>About</Link>
                        <Link to="/contact" className="block px-3 py-2 text-gray-600 hover:text-indigo-500 hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>Contact</Link>
                        <button className="w-full mt-4 bg-gradient-to-r from-blue-400 to-indigo-400 text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2">
                            <Smartphone size={18} />
                            Download App
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
