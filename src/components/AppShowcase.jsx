import React from 'react';
import rideSelectionScreenshot from '../assets/ride-selection-screenshot.jpg';

const AppShowcase = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                    <div className="mb-12 lg:mb-0 lg:order-2">
                        <h2 className="text-indigo-500 font-semibold tracking-wide uppercase mb-3">App Interface</h2>
                        <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6">
                            Simple, Transparent <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Booking Process</span>
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Choose from a variety of rides, see the exact fare upfront, and track your driver in real-time. No hidden charges, no surprises.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center text-gray-700">
                                <span className="w-6 h-6 bg-green-100 text-green-500 rounded-full flex items-center justify-center mr-3">✓</span>
                                Upfront Pricing
                            </li>
                            <li className="flex items-center text-gray-700">
                                <span className="w-6 h-6 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mr-3">✓</span>
                                Multiple Ride Options
                            </li>
                            <li className="flex items-center text-gray-700">
                                <span className="w-6 h-6 bg-indigo-100 text-indigo-500 rounded-full flex items-center justify-center mr-3">✓</span>
                                Secure Payments
                            </li>
                        </ul>
                    </div>

                    <div className="relative lg:order-1 flex justify-center">
                        <div className="relative z-10 bg-gray-900 rounded-[3rem] p-2 border-[8px] border-gray-900 shadow-2xl max-w-[320px]">
                            <div className="rounded-[2.5rem] overflow-hidden bg-white h-[650px] w-full flex flex-col relative">
                                <img
                                    src={rideSelectionScreenshot}
                                    alt="Indi Cabs Ride Selection"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        {/* Decorative blob */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-30 -z-10"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AppShowcase;
