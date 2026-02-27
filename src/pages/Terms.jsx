import React from 'react';

const Terms = () => {
    return (
        <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms & Conditions</h1>
            <div className="prose max-w-none text-gray-700">
                <p className="font-semibold text-lg text-gray-900 mb-1">IndiCabs</p>
                <p className="font-semibold text-lg text-gray-900 mb-8">Operated by Indiverse Enterprises Pvt Ltd</p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
                <p className="mb-4">By accessing or using the IndiCabs mobile application, you agree to comply with these Terms & Conditions.</p>
                <p className="mb-4">If you do not agree, you must not use the service.</p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">2. Service Description</h2>
                <p className="mb-4">IndiCabs is a technology platform that connects riders with independent drivers for transportation services.</p>
                <p className="mb-4">Indiverse Enterprises Pvt Ltd does not own vehicles and does not directly provide transportation services.</p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Eligibility</h2>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>You must be 18 years or older.</li>
                    <li>You must provide accurate registration details.</li>
                    <li>You are responsible for maintaining account confidentiality.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4">4. Rider Responsibilities</h2>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Provide accurate pickup and drop details</li>
                    <li>Treat drivers respectfully</li>
                    <li>Pay applicable fares</li>
                    <li>Not misuse the platform</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4">5. Driver Responsibilities</h2>
                <p className="mb-4">Drivers must:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Hold valid driving license</li>
                    <li>Maintain vehicle documents</li>
                    <li>Ensure passenger safety</li>
                    <li>Follow local transport laws</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4">6. Payments & Pricing</h2>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Fare is calculated based on distance and time.</li>
                    <li>Payments are processed securely via Razorpay.</li>
                    <li>IndiCabs may charge service fees.</li>
                    <li>We do not store card details.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4">7. Cancellations & Refunds</h2>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Cancellation charges may apply.</li>
                    <li>Refunds are processed as per our refund policy.</li>
                    <li>Wallet balances (if applicable) are non-transferable.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4">8. Limitation of Liability</h2>
                <p className="mb-4">IndiCabs acts only as a facilitator platform. We are not responsible for:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Driver behavior</li>
                    <li>Delays due to traffic</li>
                    <li>Loss of personal belongings</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4">9. Account Suspension</h2>
                <p className="mb-4">We reserve the right to suspend accounts for:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Fraudulent activity</li>
                    <li>Misconduct</li>
                    <li>Violation of terms</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4">10. Governing Law</h2>
                <p className="mb-4">These terms are governed by the laws of India.</p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">11. Contact</h2>
                <p className="mb-2">Indiverse Enterprises Pvt Ltd</p>
                <p className="mb-4">Email: admin@indicabs.net</p>
            </div>
        </div>
    );
};

export default Terms;
