import React from 'react';

const Refund = () => {
    return (
        <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Refund Policy</h1>
            <p className="text-gray-600 mb-4">Last Updated: October 2024</p>
            <div className="prose max-w-none text-gray-700">
                <p>We strive to provide the best service possible. However, if you are not satisfied with your ride or if there was an error in charging, we are here to help.</p>
                <h2 className="text-2xl font-semibold mt-6 mb-4">1. Cancellations</h2>
                <p>You may cancel your ride at any time before the driver arrives. Cancellation fees may apply depending on how long the driver has been en route.</p>
                <h2 className="text-2xl font-semibold mt-6 mb-4">2. Refunds</h2>
                <p>Refunds are processed on a case-by-case basis. If you believe you were charged incorrectly, please contact our support team within 24 hours of the ride.</p>
                <h2 className="text-2xl font-semibold mt-6 mb-4">3. Processing Time</h2>
                <p>Approved refunds will be processed within 5-7 business days and credited back to your original payment method.</p>
            </div>
        </div>
    );
};

export default Refund;
