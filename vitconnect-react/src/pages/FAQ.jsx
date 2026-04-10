import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './FAQ.css';

var faqData = [
    { question: 'What is VITConnect?', answer: 'VITConnect is a platform designed to help students manage their campus life at VIT. It provides access to mess menus, club registrations, events, campus maps, and more.' },
    { question: 'How can I register for clubs?', answer: "You can register for clubs by navigating to the 'Club Registration' section. Fill out the form with your name, registration number, email, and select your preferred club." },
    { question: 'How do I check the mess menu?', answer: 'Visit the Mess Menu page, select the day and mess type (Veg, Non-Veg, or Special) from the dropdowns to view the complete menu for that day.' },
    { question: 'Can I navigate the campus using VITConnect?', answer: "Yes! Go to the Campus Directions page, select your start location and destination, and click 'Get Directions' to see the route on the map." },
    { question: 'How can I give feedback?', answer: 'Visit our Feedback page built with React! You can rate different aspects of campus life and submit your comments.' }
];

function FAQ() {
    var [openIndex, setOpenIndex] = useState(null);
    var [faqName, setFaqName] = useState('');
    var [faqRegno, setFaqRegno] = useState('');
    var [faqQuestion, setFaqQuestion] = useState('');
    var [errors, setErrors] = useState({});
    var [showThankYou, setShowThankYou] = useState(false);
    var [hoveredIndex, setHoveredIndex] = useState(null);

    function toggleAnswer(index) {
        if (openIndex === index) {
            setOpenIndex(null);
        } else {
            setOpenIndex(index);
        }
    }

    function submitQuestion() {
        var name = faqName.trim();
        var regno = faqRegno.trim();
        var question = faqQuestion.trim();

        var newErrors = {};
        setShowThankYou(false);

        var namePattern = /^[A-Za-z ]{2,50}$/;
        if (!namePattern.test(name)) {
            newErrors.name = true;
            document.getElementById('faqName').focus();
            setErrors(newErrors);
            return;
        }

        var regPattern = /^[0-9]{2}[A-Z]{3}[0-9]{4}$/;
        if (!regPattern.test(regno)) {
            newErrors.regno = true;
            document.getElementById('faqRegno').focus();
            setErrors(newErrors);
            return;
        }

        if (question.length < 10) {
            newErrors.question = true;
            document.getElementById('faqQuestion').focus();
            setErrors(newErrors);
            return;
        }

        setErrors({});

        fetch('https://script.google.com/macros/s/AKfycbwkjS7_CPDBPnXOZdf2WZ-pG7Xf1-iGWBfA9u4QTvuGBmBLMVU0y0oOoE_JP1cQ2dkD2A/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                formType: 'faq',
                name: name,
                regno: regno,
                question: question
            })
        });

        setShowThankYou(true);
        setFaqName('');
        setFaqRegno('');
        setFaqQuestion('');
    }

    return (
        <div>
            <Navbar />
            <main>
                <div className="container" style={{ textAlign: 'left' }}>
                    <header>
                        <h1>Frequently Asked Questions</h1>
                    </header>

                    <section>
                        {faqData.map(function(item, index) {
                            return (
                                <article
                                    className="faq-item"
                                    key={index}
                                    style={{ borderColor: hoveredIndex === index ? '#0d6efd' : '#e2e8f0' }}
                                    onMouseOver={function() { setHoveredIndex(index); }}
                                    onMouseOut={function() { setHoveredIndex(null); }}
                                >
                                    <div className="faq-question" onClick={function() { toggleAnswer(index); }}>
                                        <span>{item.question}</span>
                                        <span className={'plus-icon' + (openIndex === index ? ' rotated' : '')}>+</span>
                                    </div>
                                    <div className={'faq-answer' + (openIndex === index ? ' show' : '')}>
                                        {item.answer}
                                    </div>
                                </article>
                            );
                        })}
                    </section>

                    <section className="form-container">
                        <h3>Ask a Question</h3>

                        <form id="questionForm" onSubmit={function(e) { e.preventDefault(); }}>
                            <fieldset>
                                <legend>Your Details</legend>

                                <div className="form-group">
                                    <label htmlFor="faqName">Your Name:</label>
                                    <input type="text" id="faqName" placeholder="Enter your name" value={faqName} onChange={function(e) { setFaqName(e.target.value); }} required />
                                    <div className="error-msg" style={{ display: errors.name ? 'block' : 'none' }}>Name should contain only letters and spaces</div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="faqRegno">Registration Number:</label>
                                    <input type="text" id="faqRegno" placeholder="e.g. 24BCE0123" value={faqRegno} onChange={function(e) { setFaqRegno(e.target.value); }} required />
                                    <div className="error-msg" style={{ display: errors.regno ? 'block' : 'none' }}>Format: 2 digits + 3 letters + 4 digits (e.g. 24BCE0123)</div>
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend>Your Question</legend>

                                <div className="form-group">
                                    <label htmlFor="faqQuestion">Describe Your Question:</label>
                                    <textarea id="faqQuestion" placeholder="Type your question here..." value={faqQuestion} onChange={function(e) { setFaqQuestion(e.target.value); }} required></textarea>
                                    <div className="error-msg" style={{ display: errors.question ? 'block' : 'none' }}>Please enter your question (at least 10 characters)</div>
                                </div>
                            </fieldset>

                            <button type="button" className="btn-primary" onClick={submitQuestion}>Submit Question</button>
                        </form>

                        <div className="thank-you" id="thankYouMessage" style={{ display: showThankYou ? 'block' : 'none' }}>
                            ✅ Thank you for submitting your question! We will review it and update the FAQ page accordingly.
                        </div>
                    </section>

                    <Footer />
                </div>
            </main>
        </div>
    );
}

export default FAQ;
