import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Refund from './pages/Refund';
import AccountDeletion from './pages/AccountDeletion';

function App() {
    const location = useLocation();

    useEffect(() => {
        const baseUrl = 'https://indicabs.net';
        const path = location.pathname === '/' ? '' : location.pathname;
        const canonicalUrl = `${baseUrl}${path}`;

        // Update Canonical Link
        let link = document.querySelector("link[rel='canonical']");
        if (!link) {
            link = document.createElement('link');
            link.setAttribute('rel', 'canonical');
            document.head.appendChild(link);
        }
        link.setAttribute('href', canonicalUrl);

        // Update OG URL
        let ogUrl = document.querySelector("meta[property='og:url']");
        if (!ogUrl) {
            ogUrl = document.createElement('meta');
            ogUrl.setAttribute('property', 'og:url');
            document.head.appendChild(ogUrl);
        }
        ogUrl.setAttribute('content', canonicalUrl);

        // Update Twitter URL
        let twitterUrl = document.querySelector("meta[property='twitter:url']");
        if (!twitterUrl) {
            twitterUrl = document.createElement('meta');
            twitterUrl.setAttribute('property', 'twitter:url');
            document.head.appendChild(twitterUrl);
        }
        twitterUrl.setAttribute('content', canonicalUrl);
    }, [location]);

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/refund" element={<Refund />} />
                <Route path="/account-deletion" element={<AccountDeletion />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
