import React from 'react';

const AccountDeletion = () => {
    return (
        <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Account Deletion Request – IndiCabs</h1>

            <div className="prose max-w-none text-gray-700">
                <p className="mb-4">Users may request permanent deletion of their IndiCabs account by:</p>
                <ul className="list-disc pl-6 mb-8 space-y-2">
                    <li>Using the in-app <strong>"Delete Account"</strong> option</li>
                    <li>OR</li>
                    <li>Sending an email to <a href="mailto:admin@indicabs.net" className="text-blue-600 hover:text-blue-800">admin@indicabs.net</a> with registered phone number.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Upon verification:</h2>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Account and personal data will be permanently deleted</li>
                    <li>Transaction records retained for legal compliance</li>
                    <li>Deletion completed within 7 business days</li>
                </ul>
            </div>
        </div>
    );
};

export default AccountDeletion;
