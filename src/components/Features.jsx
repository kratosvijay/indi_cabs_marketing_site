import React from 'react';
import { Wallet, Clock, ShieldCheck, MapPin, Zap, UserCheck } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, color }) => (
    <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300 group">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${color} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`w-7 h-7 ${color.replace('bg-', 'text-')}`} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
);

const Features = () => {
    return (
        <section id="features" className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-indigo-500 font-semibold tracking-wide uppercase mb-3">Why Choose Us</h2>
                    <p className="text-4xl font-extrabold text-gray-900 mb-6">
                        Everything you need for a <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">better journey</span>
                    </p>
                    <p className="text-xl text-gray-500">
                        Whether you're behind the wheel or in the backseat, we've built the perfect experience for you.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 lg:gap-8 mb-20">
                    {/* Driver Side */}
                    <div className="bg-blue-50 rounded-[2.5rem] p-8 lg:p-12">
                        <div className="mb-10">
                            <span className="bg-indigo-500 text-white px-4 py-2 rounded-full text-sm font-bold">For Drivers</span>
                            <h3 className="text-3xl font-bold text-gray-900 mt-6 mb-4">Earn more, worry less.</h3>
                            <p className="text-gray-600 text-lg">We take the lowest commission in the market, so you keep more of what you earn.</p>
                        </div>
                        <div className="space-y-6">
                            <FeatureCard
                                icon={Wallet}
                                title="Instant Payouts"
                                description="Get your earnings deposited instantly to your bank account."
                                color="bg-emerald-400"
                            />
                            <FeatureCard
                                icon={Clock}
                                title="Flexible Hours"
                                description="Be your own boss. Drive whenever you want, wherever you want."
                                color="bg-blue-400"
                            />
                        </div>
                    </div>

                    {/* Rider Side */}
                    <div className="bg-gray-50 rounded-[2.5rem] p-8 lg:p-12">
                        <div className="mb-10">
                            <span className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-bold">For Riders</span>
                            <h3 className="text-3xl font-bold text-gray-900 mt-6 mb-4">Safe, reliable rides.</h3>
                            <p className="text-gray-600 text-lg">Every ride is tracked and insured. Your safety is our #1 priority.</p>
                        </div>
                        <div className="space-y-6">
                            <FeatureCard
                                icon={ShieldCheck}
                                title="Safety First"
                                description="Verified drivers and 24/7 support for your peace of mind."
                                color="bg-indigo-400"
                            />
                            <FeatureCard
                                icon={Zap}
                                title="Quick Pickups"
                                description="Smart routing gets a driver to you in minutes, not hours."
                                color="bg-amber-400"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Features;
