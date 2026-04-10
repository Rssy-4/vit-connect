import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Clubs.css';

var openClubs = ['Tech Club', "Developer's Guild", 'Art Club', 'Photography Club', 'Entrepreneurship Cell'];

var clubDescriptions = {
    'Tech Club': 'A community of tech enthusiasts where you can collaborate on projects, attend workshops, and stay updated with the latest tech trends.',
    'Cultural Society': 'Celebrate and engage with various cultural activities. From drama to dance, this club promotes diversity and artistic expression.',
    "Developer's Guild": "If coding is your passion, join the Developer's Guild to hone your programming skills through competitions and hackathons.",
    'Art Club': 'A haven for creative minds to explore different mediums of art and express themselves through workshops, exhibits, and events.',
    'Music Society': 'Whether you play an instrument or sing, the Music Society brings together musicians to create, perform, and appreciate music.',
    'Robotics Club': 'Explore the fascinating world of robotics through hands-on projects, competitions, and collaborative learning experiences.',
    'Photography Club': 'For those who see the world through a lens, the Photography Club offers workshops, outings, and opportunities to showcase your photography skills.',
    'Entrepreneurship Cell': 'Nurture your entrepreneurial spirit by joining the E-Cell, where you can work on startups, attend talks by successful entrepreneurs, and develop business skills.',
    'Debate Club': 'If you love to discuss, argue, and explore diverse viewpoints, the Debate Club will sharpen your skills in public speaking and critical thinking.',
    'Literature Society': 'For lovers of literature, this society offers a space to discuss books, attend author talks, and explore creative writing.'
};

function Clubs() {
    var [name, setName] = useState('');
    var [regno, setRegno] = useState('');
    var [email, setEmail] = useState('');
    var [year, setYear] = useState('');
    var [club, setClub] = useState('');
    var [agreeRules, setAgreeRules] = useState(false);
    var [showDescription, setShowDescription] = useState(false);
    var [descriptionText, setDescriptionText] = useState('');
    var [showTooltip, setShowTooltip] = useState(false);
    var [showPopup, setShowPopup] = useState(false);
    var [popupMessage, setPopupMessage] = useState('');
    var [errors, setErrors] = useState({});

    function handleClubChange(e) {
        var selectedClub = e.target.value;
        setClub(selectedClub);
        if (clubDescriptions[selectedClub]) {
            setShowDescription(true);
            setDescriptionText(clubDescriptions[selectedClub]);
        } else {
            setShowDescription(false);
        }
    }

    function submitRegistration() {
        var newErrors = {};

        var namePattern = /^[A-Za-z ]{2,50}$/;
        if (!namePattern.test(name.trim())) {
            newErrors.name = true;
            document.getElementById('name').focus();
            setErrors(newErrors);
            return;
        }

        var regPattern = /^[0-9]{2}[A-Z]{3}[0-9]{4}$/;
        if (!regPattern.test(regno.trim())) {
            newErrors.regno = true;
            document.getElementById('regno').focus();
            setErrors(newErrors);
            return;
        }

        var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email.trim())) {
            newErrors.email = true;
            document.getElementById('email').focus();
            setErrors(newErrors);
            return;
        }

        if (year === '') {
            newErrors.year = true;
            setErrors(newErrors);
            return;
        }

        if (club === '') {
            newErrors.club = true;
            document.getElementById('club').focus();
            setErrors(newErrors);
            return;
        }

        if (!agreeRules) {
            newErrors.agree = true;
            setErrors(newErrors);
            return;
        }

        setErrors({});

        fetch('https://script.google.com/macros/s/AKfycbwkjS7_CPDBPnXOZdf2WZ-pG7Xf1-iGWBfA9u4QTvuGBmBLMVU0y0oOoE_JP1cQ2dkD2A/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                formType: 'club',
                name: name.trim(),
                regno: regno.trim(),
                email: email.trim(),
                year: year,
                club: club
            })
        });

        if (openClubs.includes(club)) {
            setPopupMessage('Congratulations, ' + name.trim() + '! You have successfully registered for the ' + club + '.');
        } else {
            setPopupMessage('Sorry, ' + name.trim() + '. Registration for the ' + club + ' is currently closed.');
        }

        setShowPopup(true);
        setName('');
        setRegno('');
        setEmail('');
        setYear('');
        setClub('');
        setAgreeRules(false);
        setShowDescription(false);
    }

    function getStatusTable() {
        var clubNames = Object.keys(clubDescriptions);
        var rows = [];

        for (var i = 0; i < clubNames.length; i++) {
            var clubName = clubNames[i];
            var found = false;
            var searchIndex = 0;
            do {
                if (openClubs[searchIndex] === clubName) {
                    found = true;
                }
                searchIndex = searchIndex + 1;
            } while (searchIndex < openClubs.length && !found);

            rows.push(
                <tr key={i}>
                    <td>{clubName}</td>
                    <td>
                        {found
                            ? <span className="status-badge status-open">Open</span>
                            : <span className="status-badge status-closed">Closed</span>
                        }
                    </td>
                </tr>
            );
        }

        return rows;
    }

    return (
        <div>
            <Navbar />
            <main>
                <div className="container" style={{ textAlign: 'left' }}>
                    <header>
                        <h1>Join a Club</h1>
                        <p className="intro">Fill out the form to register for your preferred club. Choose wisely!</p>
                    </header>

                    <section>
                        <form id="clubForm" onSubmit={function(e) { e.preventDefault(); }}>
                            <div className="ui-card">
                                <h3>Personal Details</h3>

                                <label htmlFor="name">Full Name:</label>
                                <input type="text" id="name" placeholder="Enter your full name" value={name} onChange={function(e) { setName(e.target.value); }} required />
                                <div className="error-msg" style={{ display: errors.name ? 'block' : 'none' }}>Name should contain only letters and spaces (2-50 characters)</div>

                                <label htmlFor="regno">Registration No:</label>
                                <input type="text" id="regno" placeholder="e.g. 24BCE0123" value={regno} onChange={function(e) { setRegno(e.target.value); }} required />
                                <div className="error-msg" style={{ display: errors.regno ? 'block' : 'none' }}>Format: 2 digits + 3 letters + 4 digits (e.g. 24BCE0123)</div>

                                <label htmlFor="email">Email Address:</label>
                                <input type="email" id="email" placeholder="e.g. name@vitstudent.ac.in" value={email} onChange={function(e) { setEmail(e.target.value); }} required />
                                <div className="error-msg" style={{ display: errors.email ? 'block' : 'none' }}>Please enter a valid email address</div>

                                <label>Year of Study:</label>
                                <div className="radio-group" style={{ marginTop: '8px' }}>
                                    <label><input type="radio" name="year" value="1st Year" checked={year === '1st Year'} onChange={function(e) { setYear(e.target.value); }} /> 1st Year</label>
                                    <label><input type="radio" name="year" value="2nd Year" checked={year === '2nd Year'} onChange={function(e) { setYear(e.target.value); }} /> 2nd Year</label>
                                    <label><input type="radio" name="year" value="3rd Year" checked={year === '3rd Year'} onChange={function(e) { setYear(e.target.value); }} /> 3rd Year</label>
                                    <label><input type="radio" name="year" value="4th Year" checked={year === '4th Year'} onChange={function(e) { setYear(e.target.value); }} /> 4th Year</label>
                                </div>
                                <div className="error-msg" style={{ display: errors.year ? 'block' : 'none' }}>Please select your year of study</div>
                            </div>

                            <div className="ui-card">
                                <h3>Club Selection</h3>

                                <label htmlFor="club">Select Your Club:</label>
                                <select id="club" value={club} onChange={handleClubChange} required style={{ marginTop: '8px' }}>
                                    <option value="">-- Select a Club --</option>
                                    <option value="Tech Club">Tech Club</option>
                                    <option value="Cultural Society">Cultural Society</option>
                                    <option value="Developer's Guild">Developer's Guild</option>
                                    <option value="Art Club">Art Club</option>
                                    <option value="Music Society">Music Society</option>
                                    <option value="Robotics Club">Robotics Club</option>
                                    <option value="Photography Club">Photography Club</option>
                                    <option value="Entrepreneurship Cell">Entrepreneurship Cell</option>
                                    <option value="Debate Club">Debate Club</option>
                                    <option value="Literature Society">Literature Society</option>
                                </select>
                                <div className="error-msg" style={{ display: errors.club ? 'block' : 'none' }}>Please select a club</div>

                                <div id="clubDescription" style={{ display: showDescription ? 'block' : 'none' }} className="club-description">
                                    {descriptionText}
                                </div>

                                <div className="checkbox-group" style={{ marginTop: '20px' }}>
                                    <label>
                                        <input type="checkbox" checked={agreeRules} onChange={function(e) { setAgreeRules(e.target.checked); }} />
                                        {' '}I agree to follow the club rules and guidelines
                                    </label>
                                </div>
                                <div className="error-msg" style={{ display: errors.agree ? 'block' : 'none' }}>You must agree to the club rules</div>
                            </div>

                            <div className="btn-wrapper">
                                <button
                                    type="button"
                                    className="btn-primary"
                                    id="registerBtn"
                                    onClick={submitRegistration}
                                    onMouseOver={function() { setShowTooltip(true); }}
                                    onMouseOut={function() { setShowTooltip(false); }}
                                >
                                    Register Now
                                </button>
                                <div className="tooltip" id="btnTooltip" style={{ display: showTooltip ? 'block' : 'none' }}>Click to submit your registration</div>
                            </div>
                        </form>
                    </section>

                    <section className="ui-card" style={{ marginTop: '30px' }}>
                        <h3>Club Registration Status</h3>
                        <table className="status-table">
                            <thead>
                                <tr>
                                    <th>Club Name</th>
                                    <th>Registration Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getStatusTable()}
                            </tbody>
                        </table>
                    </section>

                    <Footer />
                </div>
            </main>

            <div className={'popup' + (showPopup ? ' show' : '')}>
                <div className="popup-content">
                    <h2>Registration Status</h2>
                    <p>{popupMessage}</p>
                    <button className="close-button" onClick={function() { setShowPopup(false); }}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default Clubs;
