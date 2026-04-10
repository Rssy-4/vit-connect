import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Feedback.css';

function StarRating(props) {
    var stars = [];

    for (var i = 1; i <= 5; i++) {
        stars.push(
            <span
                key={i}
                className={"star" + (i <= props.rating ? " filled" : "")}
                onClick={props.onRate.bind(null, i)}
            >
                ★
            </span>
        );
    }

    return (
        <div className="star-rating">
            {stars}
        </div>
    );
}

StarRating.propTypes = {
    rating: PropTypes.number.isRequired,
    onRate: PropTypes.func.isRequired
};

function FeedbackForm(props) {
    var nameState = useState('');
    var name = nameState[0];
    var setName = nameState[1];

    var categoryState = useState('');
    var category = categoryState[0];
    var setCategory = categoryState[1];

    var ratingState = useState(0);
    var rating = ratingState[0];
    var setRating = ratingState[1];

    var commentState = useState('');
    var comment = commentState[0];
    var setComment = commentState[1];

    var successState = useState(false);
    var showSuccess = successState[0];
    var setShowSuccess = successState[1];

    function handleSubmit() {
        if (!name || !category || rating === 0 || !comment) {
            alert('Please fill all fields and give a rating');
            return;
        }

        if (comment.length > 500) {
            alert('Feedback must be 500 characters or less');
            return;
        }

        var namePattern = /^[A-Za-z ]{2,50}$/;
        if (!namePattern.test(name)) {
            alert('Name should contain only letters and spaces');
            return;
        }

        var feedbackItem = {
            name: name,
            category: category,
            rating: rating,
            comment: comment,
            date: new Date().toLocaleDateString()
        };

        props.onSubmit(feedbackItem);

        setName('');
        setCategory('');
        setRating(0);
        setComment('');
        setShowSuccess(true);

        setTimeout(function() {
            setShowSuccess(false);
        }, 3000);
    }

    return (
        <div className="feedback-form">
            {showSuccess && (
                <div className="success-msg">✅ Feedback submitted successfully!</div>
            )}

            <div className="form-row">
                <label>Your Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={function(e) { setName(e.target.value); }}
                    placeholder="Enter your name"
                />
            </div>

            <div className="form-row">
                <label>Category:</label>
                <select
                    value={category}
                    onChange={function(e) { setCategory(e.target.value); }}
                >
                    <option value="">-- Select Category --</option>
                    <option value="Food & Mess">Food & Mess</option>
                    <option value="Hostel Facilities">Hostel Facilities</option>
                    <option value="Clubs & Events">Clubs & Events</option>
                    <option value="Campus Infrastructure">Campus Infrastructure</option>
                    <option value="Academics">Academics</option>
                </select>
            </div>

            <div className="form-row">
                <label>Your Rating:</label>
                <StarRating rating={rating} onRate={setRating} />
            </div>

            <div className="form-row">
                <label>Your Feedback:</label>
                <textarea
                    value={comment}
                    onChange={function(e) { setComment(e.target.value); }}
                    placeholder="Write your feedback here..."
                    rows="4"
                />
                <div style={{textAlign: 'right', fontSize: '0.8rem', color: comment.length > 500 ? '#ef4444' : '#64748b', marginTop: '4px'}}>
                    {comment.length} / 500 characters
                </div>
            </div>

            <button className="btn-primary" onClick={handleSubmit} type="button">
                Submit Feedback
            </button>
        </div>
    );
}

FeedbackForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

function FeedbackList(props) {
    if (props.feedbackList.length === 0) {
        return <p className="no-feedback">No feedback submitted yet. Be the first to share!</p>;
    }

    var feedbackItems = [];

    for (var i = 0; i < props.feedbackList.length; i++) {
        var item = props.feedbackList[i];

        var starText = '';
        for (var s = 0; s < item.rating; s++) {
            starText = starText + '★';
        }

        feedbackItems.push(
            <div className="feedback-item" key={i}>
                <h4>{item.name} — {item.category}</h4>
                <div className="feedback-stars">{starText}</div>
                <p>{item.comment}</p>
                <p><small>Submitted on: {item.date}</small></p>
            </div>
        );
    }

    return <div>{feedbackItems}</div>;
}

FeedbackList.propTypes = {
    feedbackList: PropTypes.array.isRequired
};

class FeedbackCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animateCount: false
        };
    }

    componentDidMount() {
        this.setState({ animateCount: true });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.count !== this.props.count) {
            this.setState({ animateCount: true });
            var self = this;
            setTimeout(function() {
                self.setState({ animateCount: false });
            }, 500);
        }
    }

    render() {
        var counterStyle = {
            fontSize: '1.3rem',
            color: '#0d6efd',
            fontWeight: 'bold',
            padding: '10px',
            transition: 'transform 0.3s',
            transform: this.state.animateCount ? 'scale(1.2)' : 'scale(1)',
            textAlign: 'center',
            marginBottom: '20px'
        };

        return (
            <p style={counterStyle}>
                Total Feedback: {this.props.count}
            </p>
        );
    }
}

FeedbackCounter.propTypes = {
    count: PropTypes.number.isRequired
};

function Feedback() {
    var feedbackState = useState([]);
    var feedbackList = feedbackState[0];
    var setFeedbackList = feedbackState[1];

    var tabState = useState('form');
    var activeTab = tabState[0];
    var setActiveTab = tabState[1];

    useEffect(function() {
        var saved = localStorage.getItem('vitconnect_feedback');
        if (saved) {
            setFeedbackList(JSON.parse(saved));
        }
    }, []);

    function addFeedback(newFeedback) {
        var updatedList = feedbackList.concat([newFeedback]);
        setFeedbackList(updatedList);
        localStorage.setItem('vitconnect_feedback', JSON.stringify(updatedList));

        fetch('https://script.google.com/macros/s/AKfycbwkjS7_CPDBPnXOZdf2WZ-pG7Xf1-iGWBfA9u4QTvuGBmBLMVU0y0oOoE_JP1cQ2dkD2A/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                formType: 'feedback',
                name: newFeedback.name,
                category: newFeedback.category,
                rating: newFeedback.rating,
                comment: newFeedback.comment
            })
        });
    }

    return (
        <div>
            <Navbar />
            <main>
                <div className="container">
                    <header>
                        <h1>Campus Feedback</h1>
                        <p className="intro">Share your experience and help us improve campus life!</p>
                    </header>

                    <div className="feedback-container">
                        <FeedbackCounter count={feedbackList.length} />

                        <div className="tab-nav">
                            <button
                                className={"tab-btn" + (activeTab === 'form' ? " active" : "")}
                                onClick={function() { setActiveTab('form'); }}
                            >
                                Give Feedback
                            </button>
                            <button
                                className={"tab-btn" + (activeTab === 'list' ? " active" : "")}
                                onClick={function() { setActiveTab('list'); }}
                            >
                                View Feedback
                            </button>
                        </div>

                        {activeTab === 'form' && (
                            <FeedbackForm onSubmit={addFeedback} />
                        )}

                        {activeTab === 'list' && (
                            <FeedbackList feedbackList={feedbackList} />
                        )}
                    </div>

                    <Footer />
                </div>
            </main>
        </div>
    );
}

export default Feedback;
