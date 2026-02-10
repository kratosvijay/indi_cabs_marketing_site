import React from 'react';

const About = () => {
    return (
        <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Indi Cabs is on a mission to revolutionize urban mobility in India. We believe in fair pricing, safety first, and empowering our drivers partners.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Founded in 2024, we started with a simple idea: a cab service that treats both riders and drivers with respect. Today, we serve thousands of happy customers with our transparent policies and reliable service.
            </p>
            <div className="mt-12 p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Parent Company</h2>
                <p className="text-lg text-gray-700">
                    <strong>Indi Cabs</strong> is a proud venture of <strong>Indiverse Enterprises Pvt Ltd</strong>, a forward-thinking company dedicated to creating innovative solutions for modern challenges.
                </p>
            </div>
        </div>
    );
};

export default About;
