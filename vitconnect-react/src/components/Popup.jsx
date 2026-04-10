import React from 'react';

function Popup({ show, message, onClose }) {
    return (
        <div className={'popup' + (show ? ' show' : '')} >
            <div className="popup-content">
                <h2>Registration Status</h2>
                <p>{message}</p>
                <button className="close-button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default Popup;
