import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './About.css';

function About() {
    return (
        <div>
            <Navbar />
            <main>
                <div className="container">
                    <header>
                        <h1>About VITConnect</h1>
                        <p className="intro">Learn about the team and vision behind VITConnect!</p>
                    </header>

                    <section className="content">
                        <p>VITConnect is a comprehensive platform developed with the sole purpose of making student life at Vellore Institute of Technology more manageable, organized, and enjoyable. From registering for clubs and viewing the mess menu to navigating the campus and staying updated with events, VITConnect is here to simplify every aspect of campus life.</p>

                        <p>We understand how important it is to stay informed and connected. Our team works tirelessly to ensure that you have everything you need at your fingertips, right from your academic schedule to extracurricular events. VITConnect is more than just a platform – it's your <span className="highlight">digital companion</span> throughout your time at VIT.</p>
                    </section>

                    <section className="mission">
                        <h3>Our Mission</h3>
                        <p>To create a platform that bridges the gap between students and campus facilities, enabling them to make the most of their time at VIT with ease and efficiency. We strive to improve campus engagement, provide essential information, and help students explore every opportunity available on campus.</p>
                    </section>

                    <section className="team-section">
                        <h2>Meet the Team</h2>
                        <div className="team-container">
                            <article className="team-member">
                                <h4>Adarsh Kumar Jha</h4>
                                <p>Founder & Developer</p>
                            </article>

                            <article className="team-member">
                                <h4>Keshav Sharma</h4>
                                <p>UI/UX Designer</p>
                            </article>
                        </div>
                    </section>

                    <Footer />
                </div>
            </main>
        </div>
    );
}

export default About;
