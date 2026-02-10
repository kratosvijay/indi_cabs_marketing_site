import React from 'react';
import { Shield, Smartphone, Heart, AlertTriangle } from 'lucide-react';

const SafetyCard = ({ icon: Icon, title, description }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start space-x-4">
        <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500">
                <Icon size={24} />
            </div>
        </div>
        <div>
            <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
    </div>
);

const Safety = () => {
    return (
        <section id="safety" className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">

                    <div className="mb-12 lg:mb-0">
                        <h2 className="text-indigo-500 font-semibold tracking-wide uppercase mb-3">Safety First</h2>
                        <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6">
                            Your safety is our <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">top priority</span>
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            We've built safety into every part of the experience. From verified drivers to real-time trip tracking, you can ride with confidence knowing we've got your back.
                        </p>

                        <div className="grid sm:grid-cols-1 gap-6">
                            <SafetyCard
                                icon={Shield}
                                title="Verified Drivers"
                                description="Every driver undergoes a comprehensive background check and vehicle inspection before joining our platform."
                            />
                            <SafetyCard
                                icon={Smartphone}
                                title="Real-time Tracking"
                                description="Share your trip details with loved ones so they can track your journey in real-time."
                            />
                            <SafetyCard
                                icon={AlertTriangle}
                                title="Emergency Assistance"
                                description="In-app SOS button connects you directly to local authorities and our safety response team."
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-200 to-indigo-200 rounded-[3rem] transform rotate-3 scale-105 opacity-50 blur-xl"></div>
                        <div className="relative bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-8 border-white">
                            <img
                                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                alt="Safe ride experience"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                <div className="text-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Heart className="text-red-500 fill-current" size={20} />
                                        <span className="font-semibold"> trusted by millions</span>
                                    </div>
                                    <p className="text-sm opacity-90">"I feel safe riding with Indi Cabs late at night. The tracking feature is a lifesaver!"</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Safety;
