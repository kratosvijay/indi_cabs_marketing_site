import React from 'react';
import { Twitter, Instagram, Facebook, Linkedin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-800 pb-12">

                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white">Indi <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Cabs</span></h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Redefining urban mobility with safety, transparency, and reliability at our core.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-blue-400 transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="hover:text-indigo-400 transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-pink-500 transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="hover:text-blue-500 transition-colors"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Company</h4>
                        <ul className="space-y-4">
                            <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Support</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                            <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/refund" className="text-gray-400 hover:text-white transition-colors">Refund Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Get the App</h4>
                        <div className="space-y-4">
                            <button className="w-full bg-gray-800 hover:bg-gray-700 p-3 rounded-xl flex items-center space-x-3 transition-colors">
                                <div className="text-left">
                                    <div className="text-xs text-gray-400">Download on the</div>
                                    <div className="text-sm font-bold text-white">App Store</div>
                                </div>
                            </button>
                            <button className="w-full bg-gray-800 hover:bg-gray-700 p-3 rounded-xl flex items-center space-x-3 transition-colors">
                                <div className="text-left">
                                    <div className="text-xs text-gray-400">Get it on</div>
                                    <div className="text-sm font-bold text-white">Google Play</div>
                                </div>
                            </button>
                        </div>
                    </div>

                </div>

                <div className="pt-8 text-center text-gray-500 text-sm">
                    <p className="flex items-center justify-center gap-2">
                        © 2024 Indi Cabs. Made with <Heart size={16} className="text-red-500 fill-current" /> in India.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
