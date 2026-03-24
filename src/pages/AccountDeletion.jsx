import React from 'react';
import { Trash2, Smartphone, Mail, Info, ShieldCheck, AlertCircle } from 'lucide-react';

const AccountDeletion = () => {
    return (
        <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header section with icon */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center p-3 bg-red-50 rounded-2xl mb-6">
                    <Trash2 className="text-red-600 w-10 h-10" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                    Delete Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Indicabs</span> Account
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    We're sorry to see you go. If you've decided to delete your account, we've made the process simple and transparent.
                </p>
            </div>

            <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* Method 1: App */}
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-2 bg-blue-50 rounded-xl">
                                <Smartphone className="text-blue-600 w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">In-App Deletion</h2>
                        </div>
                        <p className="text-gray-600 mb-6">The fastest way to delete your account is directly through the Indicabs mobile application.</p>
                        <ol className="space-y-4">
                            {[
                                "Open the Indicabs mobile application",
                                "Go to Profile → Settings",
                                "Select \"Delete Account\"",
                                "Confirm your request"
                            ].map((step, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">
                                        {index + 1}
                                    </span>
                                    <span className="text-gray-700">{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>

                    {/* Method 2: Support */}
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-2 bg-indigo-50 rounded-xl">
                                <Mail className="text-indigo-600 w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Email Support</h2>
                        </div>
                        <p className="text-gray-600 mb-6">If you are unable to access the app, you can request account deletion by contacting our support team.</p>
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                            <p className="text-sm text-gray-500 mb-2 uppercase font-semibold tracking-wider">Contact Email</p>
                            <a href="mailto:support@indicabs.net" className="text-xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                                support@indicabs.net
                            </a>
                        </div>
                        <p className="mt-6 text-sm text-gray-500 leading-relaxed italic">
                            *Please send the request from your registered email address for faster processing.
                        </p>
                    </div>
                </div>

                {/* Data Information */}
                <div className="bg-gray-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <ShieldCheck size={120} />
                    </div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
                                <Info className="text-white w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold">Data Deletion Information</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                            <div className="space-y-3">
                                <h3 className="text-gray-400 font-medium">Personal Data</h3>
                                <p className="text-lg">Your name, phone number, and email will be permanently removed.</p>
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-gray-400 font-medium">Activity History</h3>
                                <p className="text-lg">Entire ride history and preferences will be purged.</p>
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-gray-400 font-medium">Legal Compliance</h3>
                                <p className="text-lg">Transaction data may be retained for up to 90 days as per law.</p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm gap-6">
                            <div className="flex items-center gap-4">
                                <AlertCircle className="text-yellow-400 w-8 h-8" />
                                <div>
                                    <p className="font-bold text-xl">Processing Timeline</p>
                                    <p className="text-gray-400">Your account will be permanently deleted within 7 days.</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Entity</p>
                                <p className="font-semibold text-gray-300">Indiverse Enterprises Private Limited</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Back Link */}
                <div className="text-center mt-12">
                    <a href="/" className="text-gray-500 hover:text-gray-900 transition-colors font-medium">
                        ← Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AccountDeletion;
