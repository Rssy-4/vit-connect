import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Events.css';

var eventsData = [
    { title: 'Tech Symposium 2025', date: '2025-03-15', dateDisplay: 'Date: March 15, 2025', category: 'tech', desc: 'Join industry experts as they discuss the latest trends in technology.', alertMsg: '🎉 Registered for Tech Symposium 2025!' },
    { title: 'Cultural Fest', date: '2025-04-20', dateDisplay: 'Date: April 20, 2025', category: 'cultural', desc: 'Celebrate diversity with performances, food, and art from various cultures.', alertMsg: '🎉 Registered for Cultural Fest!' },
    { title: 'Sports Day', date: '2025-05-10', dateDisplay: 'Date: May 10, 2025', category: 'sports', desc: 'Participate in various sports competitions and show your skills!', alertMsg: '🎉 Registered for Sports Day!' },
    { title: 'Hackathon 2025', date: '2025-06-05', dateDisplay: 'Date: June 5-6, 2025', category: 'tech', desc: 'Join us for a 24-hour hackathon with prizes and networking opportunities.', alertMsg: '🎉 Registered for Hackathon 2025!' },
    { title: 'Art Exhibition', date: '2025-07-15', dateDisplay: 'Date: July 15-20, 2025', category: 'cultural', desc: 'Experience creativity through the works of talented student artists.', alertMsg: '🎉 Registered for Art Exhibition!' },
    { title: 'Job Fair', date: '2025-08-25', dateDisplay: 'Date: August 25, 2025', category: 'career', desc: 'Meet potential employers and explore career opportunities.', alertMsg: '🎉 Registered for Job Fair!' },
    { title: 'Web Dev Workshop', date: '2025-04-05', dateDisplay: 'Date: April 5, 2025', category: 'tech', desc: 'Hands-on workshop on HTML, CSS, JavaScript, and React — build a project from scratch!', alertMsg: '🎉 Registered for Web Dev Workshop!' },
    { title: 'Campus Music Night', date: '2025-05-20', dateDisplay: 'Date: May 20, 2025', category: 'cultural', desc: 'Live performances by student bands and DJs. Open mic slots available!', alertMsg: '🎉 Registered for Music Night!' },
    { title: 'Inter-College Debate', date: '2025-06-18', dateDisplay: 'Date: June 18, 2025', category: 'career', desc: 'Sharpen your public speaking skills in this prestigious debate competition.', alertMsg: '🎉 Registered for Debate!' },
    { title: 'AI & ML Guest Lecture', date: '2025-09-10', dateDisplay: 'Date: September 10, 2025', category: 'tech', desc: 'Special lecture by a Google engineer on real-world AI/ML applications.', alertMsg: '🎉 Registered for Guest Lecture!' }
];

var badgeClasses = {
    tech: 'badge-tech',
    cultural: 'badge-cultural',
    sports: 'badge-sports',
    career: 'badge-career'
};

var badgeLabels = {
    tech: '💻 Tech',
    cultural: '🎭 Cultural',
    sports: '⚽ Sports',
    career: '💼 Career'
};

function Events() {
    var [activeCategory, setActiveCategory] = useState('all');
    var [searchValue, setSearchValue] = useState('');
    var [fromDate, setFromDate] = useState('');
    var [toDate, setToDate] = useState('');
    var [countdownHTML, setCountdownHTML] = useState('');
    var [nextEventName, setNextEventName] = useState('');

    useEffect(function() {
        var now = new Date();
        var closestEvent = null;
        var closestDate = null;

        for (var i = 0; i < eventsData.length; i++) {
            var eventDate = new Date(eventsData[i].date);
            if (eventDate > now) {
                if (!closestDate || eventDate < closestDate) {
                    closestDate = eventDate;
                    closestEvent = eventsData[i].title;
                }
            }
        }

        if (!closestDate) {
            setNextEventName("No upcoming events");
            return;
        }

        setNextEventName(closestEvent);

        function updateTimer() {
            var now = new Date();
            var diff = closestDate - now;

            if (diff <= 0) {
                setCountdownHTML('<p style="color:#16a34a; font-weight:700;">🎉 Event is happening now!</p>');
                return;
            }

            var days = Math.floor(diff / (1000 * 60 * 60 * 24));
            var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setCountdownHTML(
                '<div class="countdown-unit"><div class="number">' + days + '</div><div class="label">Days</div></div>' +
                '<div class="countdown-unit"><div class="number">' + hours + '</div><div class="label">Hours</div></div>' +
                '<div class="countdown-unit"><div class="number">' + minutes + '</div><div class="label">Min</div></div>' +
                '<div class="countdown-unit"><div class="number">' + seconds + '</div><div class="label">Sec</div></div>'
            );
        }

        updateTimer();
        var interval = setInterval(updateTimer, 1000);
        return function() { clearInterval(interval); };
    }, []);

    function filterEventCategory(category) {
        setActiveCategory(category);
    }

    function isEventVisible(event) {
        var matchesCategory = activeCategory === 'all' || event.category === activeCategory;
        var matchesSearch = event.title.toLowerCase().includes(searchValue.toLowerCase());
        var matchesDate = true;
        if (fromDate && event.date < fromDate) matchesDate = false;
        if (toDate && event.date > toDate) matchesDate = false;
        return matchesCategory && matchesSearch && matchesDate;
    }

    return (
        <div>
            <Navbar />
            <main>
                <div className="container">
                    <header>
                        <h1>Upcoming Events</h1>
                        <p className="intro">Stay updated on upcoming events and activities happening on campus. Join us and participate!</p>
                    </header>

                    <div className="countdown-card" id="countdownCard">
                        <h3>⏰ Next Event Countdown</h3>
                        <p id="nextEventName" style={{ color: '#475569', marginBottom: '8px' }}>{nextEventName}</p>
                        <div className="countdown-timer" id="countdownTimer" dangerouslySetInnerHTML={{ __html: countdownHTML }}></div>
                    </div>

                    <section className="event-filters" id="eventFilters">
                        {['all', 'tech', 'cultural', 'sports', 'career'].map(function(cat) {
                            var labels = { all: 'All', tech: '💻 Tech', cultural: '🎭 Cultural', sports: '⚽ Sports', career: '💼 Career' };
                            return (
                                <button
                                    key={cat}
                                    className={'evt-btn' + (activeCategory === cat ? ' active' : '')}
                                    onClick={function() { filterEventCategory(cat); }}
                                >
                                    {labels[cat]}
                                </button>
                            );
                        })}
                    </section>

                    <section className="filter-container">
                        <input type="text" id="searchBox" placeholder="Search for events..." value={searchValue} onChange={function(e) { setSearchValue(e.target.value); }} />
                        <label htmlFor="fromDate">From:</label>
                        <input type="date" id="fromDate" value={fromDate} onChange={function(e) { setFromDate(e.target.value); }} />
                        <label htmlFor="toDate">To:</label>
                        <input type="date" id="toDate" value={toDate} onChange={function(e) { setToDate(e.target.value); }} />
                    </section>

                    <section className="events-container" id="eventsContainer">
                        {eventsData.map(function(event, index) {
                            if (!isEventVisible(event)) return null;
                            return (
                                <article className="event-card" key={index} data-date={event.date} data-category={event.category}>
                                    <span className={'event-badge ' + badgeClasses[event.category]}>{badgeLabels[event.category]}</span>
                                    <h3>{event.title}</h3>
                                    <p className="date">{event.dateDisplay}</p>
                                    <p>{event.desc}</p>
                                    <button className="register-btn" onClick={function() { alert(event.alertMsg); }}>Register</button>
                                </article>
                            );
                        })}
                    </section>

                    <Footer />
                </div>
            </main>
        </div>
    );
}

export default Events;
