import React from 'react';

const Privacy = () => {
    return (
        <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
                <p className="text-lg text-gray-500">IndiCabs — Operated by Indiverse Enterprises Pvt Ltd</p>
                <p className="text-sm text-gray-400 mt-2">Last Updated: February 2026</p>
            </div>

            <div className="max-w-4xl mx-auto">
                {/* 1. Introduction */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400 text-white text-sm font-bold">1</span>
                        Introduction
                    </h2>
                    <div className="pl-11 text-gray-700 leading-relaxed space-y-3">
                        <p>
                            IndiCabs ("we", "our", "us") is operated by Indiverse Enterprises Pvt Ltd. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use the IndiCabs mobile application and website.
                        </p>
                        <p>
                            By using our services, you agree to the collection and use of information in accordance with this policy.
                        </p>
                    </div>
                </section>

                {/* 2. Information We Collect */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400 text-white text-sm font-bold">2</span>
                        Information We Collect
                    </h2>

                    {/* A. Personal Information */}
                    <div className="pl-11 mb-6">
                        <h3 className="text-lg font-medium text-gray-800 mb-3">A. Personal Information</h3>
                        <p className="text-gray-700 mb-3">We may collect:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2">
                            <li>Full name</li>
                            <li>Phone number</li>
                            <li>Email address</li>
                            <li>Profile photo</li>
                            <li>Device information</li>
                            <li>Vehicle details (for drivers)</li>
                            <li>Driving license / registration documents (for drivers)</li>
                            <li>Bank account details (for driver payouts)</li>
                        </ul>
                    </div>

                    {/* B. Location Information */}
                    <div className="pl-11 mb-6">
                        <h3 className="text-lg font-medium text-gray-800 mb-3">B. Location Information</h3>
                        <p className="text-gray-700 mb-3">IndiCabs collects real-time location data to:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2">
                            <li>Match riders with nearby drivers</li>
                            <li>Enable navigation</li>
                            <li>Calculate fares</li>
                            <li>Improve ride safety</li>
                        </ul>
                        <p className="text-gray-700 mt-3 mb-2">Location may be collected:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2">
                            <li>While app is in use</li>
                            <li>In background (if enabled for ride tracking)</li>
                        </ul>
                        <p className="text-gray-600 mt-3 text-sm italic">
                            We do not collect location data when the app is closed, unless required for an ongoing ride.
                        </p>
                    </div>

                    {/* C. Payment Information */}
                    <div className="pl-11 mb-6">
                        <h3 className="text-lg font-medium text-gray-800 mb-3">C. Payment Information</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
                            <li>Payments are processed securely via third-party payment gateway <strong>Razorpay</strong>.</li>
                            <li>We do not store card details on our servers.</li>
                            <li>Payment data is encrypted and handled by Razorpay as per their security standards.</li>
                        </ul>
                    </div>

                    {/* D. Firebase & Analytics Data */}
                    <div className="pl-11 mb-6">
                        <h3 className="text-lg font-medium text-gray-800 mb-3">D. Firebase &amp; Analytics Data</h3>
                        <p className="text-gray-700 mb-3">We use Firebase services for:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2">
                            <li>User authentication</li>
                            <li>Database storage</li>
                            <li>Push notifications</li>
                            <li>Crash reporting</li>
                            <li>App performance monitoring</li>
                        </ul>
                        <p className="text-gray-700 mt-3 mb-2">This may collect:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2">
                            <li>Device identifiers</li>
                            <li>IP address</li>
                            <li>Usage data</li>
                            <li>Crash logs</li>
                        </ul>
                    </div>

                    {/* E. Advertising Data */}
                    <div className="pl-11 mb-6">
                        <h3 className="text-lg font-medium text-gray-800 mb-3">E. Advertising Data</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
                            <li>We use Google Mobile Ads to display advertisements.</li>
                            <li>Google may collect device identifiers and usage information to provide relevant ads.</li>
                            <li>You can manage ad preferences through your device settings.</li>
                        </ul>
                    </div>

                    {/* F. Contacts Access */}
                    <div className="pl-11 mb-6">
                        <h3 className="text-lg font-medium text-gray-800 mb-3">F. Contacts Access</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
                            <li>If enabled, contact access is used only for features such as sharing ride details or inviting contacts.</li>
                            <li>We do not store your contact list on our servers.</li>
                        </ul>
                    </div>
                </section>

                {/* 3. How We Use Your Information */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400 text-white text-sm font-bold">3</span>
                        How We Use Your Information
                    </h2>
                    <div className="pl-11">
                        <p className="text-gray-700 mb-3">We use collected information to:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2">
                            <li>Provide ride-hailing services</li>
                            <li>Process payments</li>
                            <li>Enable driver onboarding</li>
                            <li>Improve app performance</li>
                            <li>Send ride updates &amp; notifications</li>
                            <li>Ensure safety and fraud prevention</li>
                            <li>Comply with legal requirements</li>
                        </ul>
                    </div>
                </section>

                {/* 4. Data Sharing */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400 text-white text-sm font-bold">4</span>
                        Data Sharing
                    </h2>
                    <div className="pl-11">
                        <p className="text-gray-700 mb-3">We may share data with:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2">
                            <li>Drivers (for ride coordination)</li>
                            <li>Riders (for ride coordination)</li>
                            <li>Payment processors</li>
                            <li>Cloud service providers</li>
                            <li>Government authorities (if legally required)</li>
                        </ul>
                        <div className="mt-4 px-4 py-3 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-green-800 font-medium text-sm">✅ We do not sell personal data.</p>
                        </div>
                    </div>
                </section>

                {/* 5. Data Security */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400 text-white text-sm font-bold">5</span>
                        Data Security
                    </h2>
                    <div className="pl-11">
                        <p className="text-gray-700 mb-3">We implement industry-standard security measures including:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2">
                            <li>Encrypted communication (HTTPS)</li>
                            <li>Secure cloud storage</li>
                            <li>Restricted internal access</li>
                        </ul>
                        <p className="text-gray-600 mt-3 text-sm italic">
                            However, no system is 100% secure.
                        </p>
                    </div>
                </section>

                {/* 6. Data Retention */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400 text-white text-sm font-bold">6</span>
                        Data Retention
                    </h2>
                    <div className="pl-11">
                        <p className="text-gray-700 mb-3">We retain data:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2">
                            <li>As long as your account is active</li>
                            <li>As required for legal and compliance obligations</li>
                            <li>For dispute resolution and fraud prevention</li>
                        </ul>
                    </div>
                </section>

                {/* 7. Your Rights */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400 text-white text-sm font-bold">7</span>
                        Your Rights
                    </h2>
                    <div className="pl-11">
                        <p className="text-gray-700 mb-3">You may:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2">
                            <li>Access your data</li>
                            <li>Request correction</li>
                            <li>Request account deletion</li>
                            <li>Withdraw permissions</li>
                        </ul>
                        <div className="mt-4 px-4 py-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <p className="text-gray-800 text-sm">
                                To request deletion, contact us at{' '}
                                <a href="mailto:admin@indicabs.net" className="text-yellow-600 font-medium hover:underline">
                                    admin@indicabs.net
                                </a>
                            </p>
                        </div>
                    </div>
                </section>

                {/* 8. Children's Privacy */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400 text-white text-sm font-bold">8</span>
                        Children's Privacy
                    </h2>
                    <div className="pl-11">
                        <p className="text-gray-700 leading-relaxed">
                            IndiCabs services are not intended for individuals under 18 years of age.
                        </p>
                    </div>
                </section>

                {/* 9. Changes to This Policy */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400 text-white text-sm font-bold">9</span>
                        Changes to This Policy
                    </h2>
                    <div className="pl-11">
                        <p className="text-gray-700 leading-relaxed">
                            We may update this Privacy Policy periodically. Updates will be posted on this page.
                        </p>
                    </div>
                </section>

                {/* 10. Contact Us */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400 text-white text-sm font-bold">10</span>
                        Contact Us
                    </h2>
                    <div className="pl-11">
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                            <p className="text-gray-800 font-semibold text-lg mb-3">Indiverse Enterprises Pvt Ltd</p>
                            <div className="space-y-2 text-gray-700">
                                <p className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    Chennai, Tamil Nadu, India
                                </p>
                                <p className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    <a href="mailto:admin@indicabs.net" className="text-yellow-600 hover:underline">admin@indicabs.net</a>
                                </p>
                                <p className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                    <a href="tel:+917200678997" className="text-yellow-600 hover:underline">+91 72006 78997</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Privacy;
