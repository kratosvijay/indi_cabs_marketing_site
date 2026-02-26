import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

// ⚠️ REPLACE these with your actual EmailJS credentials:
// 1. Sign up at https://www.emailjs.com/
// 2. Add an Email Service (connect support@indicabs.net)
// 3. Create an Email Template with variables: {{from_name}}, {{from_email}}, {{message}}
// 4. Paste your IDs below:
const EMAILJS_SERVICE_ID = 'service_bni5vt5';
const EMAILJS_TEMPLATE_ID = 'template_4aie43v';
const EMAILJS_PUBLIC_KEY = 'HsVpIp3RGB326AY04';

const Contact = () => {
    const formRef = useRef();
    const [formData, setFormData] = useState({ from_name: '', from_email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle | sending | success | error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            await emailjs.sendForm(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                formRef.current,
                EMAILJS_PUBLIC_KEY
            );
            setStatus('success');
            setFormData({ from_name: '', from_email: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error('EmailJS Error:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>

            {status === 'success' && (
                <div className="mb-6 p-4 rounded-md bg-green-50 border border-green-200">
                    <p className="text-green-800 font-medium">✅ Thank you! Your message has been sent successfully. We'll get back to you soon.</p>
                </div>
            )}

            {status === 'error' && (
                <div className="mb-6 p-4 rounded-md bg-red-50 border border-red-200">
                    <p className="text-red-800 font-medium">❌ Something went wrong. Please try again or email us directly at support@indicabs.net</p>
                </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="max-w-lg space-y-6">
                <div>
                    <label htmlFor="from_name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="from_name"
                        id="from_name"
                        required
                        value={formData.from_name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    />
                </div>
                <div>
                    <label htmlFor="from_email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="from_email"
                        id="from_email"
                        required
                        value={formData.from_email}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                        name="message"
                        id="message"
                        rows="4"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    disabled={status === 'sending'}
                    className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${status === 'sending'
                        ? 'bg-indigo-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                        }`}
                >
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
            </form>
        </div>
    );
};

export default Contact;
