import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Apple, Play } from 'lucide-react';
import mobileAppScreenshot from '../assets/mobile-app-screenshot.jpg';

const Hero = () => {
    return (
        <div className="relative pt-20 pb-20 lg:pt-32 lg:pb-28 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-6 text-center lg:text-left"
                    >
                        <div className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-500 rounded-full text-sm font-semibold mb-6">
                            🚀 Now Live in Your City
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 tracking-tight mb-6">
                            Drive Your Way, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                                Earn Your Way.
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                            Indi Cabs connects you with safe rides and flexible driving opportunities.
                            Zero hidden fees, 100% transparent pricing for everyone.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-400 to-indigo-400 text-white px-8 py-4 rounded-xl hover:opacity-90 transition-all transform hover:-translate-y-1 shadow-xl shadow-blue-500/30">
                                <Apple size={24} />
                                <div className="text-left">
                                    <div className="text-xs text-white/80">Download on the</div>
                                    <div className="text-lg font-bold leading-none">App Store</div>
                                </div>
                            </button>

                            <button className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-400 to-indigo-400 text-white px-8 py-4 rounded-xl hover:opacity-90 transition-all transform hover:-translate-y-1 shadow-xl shadow-blue-500/30">
                                <Play size={24} fill="currentColor" />
                                <div className="text-left">
                                    <div className="text-xs text-white/80">GET IT ON</div>
                                    <div className="text-lg font-bold leading-none">Google Play</div>
                                </div>
                            </button>
                        </div>

                        <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-500">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-600">
                                        {i}k+
                                    </div>
                                ))}
                            </div>
                            <p>Trusted by 10,000+ users</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-6 mt-16 lg:mt-0 relative"
                    >
                        <div className="relative mx-auto w-full max-w-[320px] lg:max-w-[380px]">
                            {/* Abstract Shapes Background */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-200/50 rounded-full blur-3xl opacity-50 animate-pulse"></div>

                            {/* Phone Mockup Placeholder - Replace with actual image later */}
                            <div className="relative z-10 bg-gray-900 rounded-[3rem] p-2 border-[8px] border-gray-900 shadow-2xl">
                                <div className="rounded-[2.5rem] overflow-hidden bg-white h-[650px] w-full flex flex-col relative">
                                    <img
                                        src={mobileAppScreenshot}
                                        alt="Indi Cabs App Screenshot"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
