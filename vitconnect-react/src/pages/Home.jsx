import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Home.css';

function Home() {
    var canvasRef = useRef(null);
    var [hoveredCard, setHoveredCard] = useState(null);

    useEffect(function() {
        var canvas = canvasRef.current;
        var ctx = canvas.getContext('2d');

        ctx.fillStyle = '#87CEEB';
        ctx.fillRect(0, 0, 600, 140);

        ctx.fillStyle = '#90EE90';
        ctx.fillRect(0, 140, 600, 60);

        ctx.fillStyle = '#D2691E';
        ctx.fillRect(50, 60, 120, 80);

        ctx.fillStyle = '#FFD700';
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 2; j++) {
                ctx.fillRect(65 + (i * 35), 75 + (j * 30), 20, 15);
            }
        }

        ctx.fillStyle = '#8B4513';
        ctx.fillRect(95, 110, 30, 30);

        ctx.fillStyle = '#4682B4';
        ctx.fillRect(220, 50, 150, 90);

        ctx.fillStyle = '#E0E0E0';
        var windowIndex = 0;
        while (windowIndex < 4) {
            ctx.fillRect(235 + (windowIndex * 35), 70, 20, 20);
            windowIndex = windowIndex + 1;
        }

        ctx.fillStyle = '#FFFFFF';
        ctx.font = '14px Arial';
        ctx.fillText('LIBRARY', 260, 120);

        ctx.fillStyle = '#228B22';
        ctx.beginPath();
        ctx.arc(430, 90, 30, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#8B4513';
        ctx.fillRect(425, 120, 10, 20);

        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(540, 40, 25, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#999';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(110, 140);
        ctx.lineTo(110, 170);
        ctx.lineTo(295, 170);
        ctx.lineTo(295, 140);
        ctx.stroke();

        ctx.fillStyle = '#333';
        ctx.font = 'bold 16px Arial';
        ctx.fillText('VIT Campus', 240, 195);
    }, []);

    var features = [
        { icon: '🧭', title: 'Campus Navigation', desc: 'Find buildings, hostels, and facilities quickly using interactive maps.' },
        { icon: '🍽️', title: 'Mess Menu', desc: 'View daily and weekly mess menus to plan your meals better.' },
        { icon: '🎉', title: 'Events & Clubs', desc: 'Stay updated on campus events and join clubs that match your interests.' },
        { icon: '❓', title: 'FAQs & Info', desc: 'Get quick answers to common questions related to campus life.' }
    ];

    var linkCards = [
        { title: 'Mess Menu', desc: 'Check out the latest mess menu and plan your meals.', link: '/mess', label: 'View Mess Menu' },
        { title: 'Club Registration', desc: 'Join clubs and explore extracurricular activities.', link: '/clubs', label: 'Register' },
        { title: 'Events', desc: 'Stay updated on upcoming campus events.', link: '/events', label: 'View Events' },
        { title: 'About Us', desc: 'Learn about the vision behind VITConnect.', link: '/about', label: 'About Us' },
        { title: 'FAQ', desc: 'Find answers to common questions.', link: '/faq', label: 'FAQs' },
        { title: 'Shops', desc: 'Explore campus shops and services.', link: '/shops', label: 'View Shops' },
        { title: 'Feedback', desc: 'Share your campus experience with us.', link: '/feedback', label: 'Give Feedback' }
    ];

    return (
        <div>
            <Navbar />
            <main>
                <div className="container">
                    <header>
                        <h1>Welcome to VITConnect</h1>
                        <p className="intro">
                            VITConnect is a centralized web platform designed to simplify campus life at VIT.
                            From navigating the campus to staying updated with events, clubs, and daily mess menus,
                            VITConnect brings <span className="highlight">everything you need</span> into one place.
                        </p>
                    </header>

                    <aside id="announcement">
                        📢 <strong>Announcement:</strong> Club registrations for the new semester are now open! Head to the{' '}
                        <Link to="/clubs">Clubs page</Link> to register.
                    </aside>

                    <section className="about" style={{ background: '#f8f9ff', padding: '35px', borderRadius: '14px', marginBottom: '50px' }}>
                        <h2>About VITConnect</h2>
                        <p style={{ color: '#666', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '900px', margin: 'auto' }}>
                            Managing campus activities can be overwhelming for students.
                            VITConnect solves this by offering an easy-to-use platform where students can
                            explore events, register for clubs, view mess menus, locate campus buildings,
                            and access important information anytime, anywhere.
                        </p>
                    </section>

                    <section className="canvas-section">
                        <h2>Our Campus</h2>
                        <canvas ref={canvasRef} id="campusCanvas" width="600" height="200"></canvas>
                    </section>

                    <section className="features">
                        <h2>Key Features</h2>
                        <div className="features-grid">
                            {features.map(function(feature, index) {
                                return (
                                    <article
                                        className="feature-card"
                                        key={index}
                                        style={{ backgroundColor: hoveredCard === index ? '#e8f0fe' : '#ffffff' }}
                                        onMouseOver={function() { setHoveredCard(index); }}
                                        onMouseOut={function() { setHoveredCard(null); }}
                                    >
                                        <div className="feature-icon">{feature.icon}</div>
                                        <h3>{feature.title}</h3>
                                        <p>{feature.desc}</p>
                                    </article>
                                );
                            })}
                        </div>
                    </section>

                    <section>
                        <h2>Explore</h2>
                        <div className="links-container">
                            {linkCards.map(function(card, index) {
                                return (
                                    <div className="link-card" key={index}>
                                        <h3>{card.title}</h3>
                                        <p>{card.desc}</p>
                                        <Link to={card.link}>{card.label}</Link>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <Footer />
                </div>
            </main>
        </div>
    );
}

export default Home;
