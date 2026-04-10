import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">VIT<span>Connect</span></div>
            <div className="nav-links">
                <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} end>Home</NavLink>
                <NavLink to="/mess" className={({ isActive }) => isActive ? 'active' : ''}>Mess</NavLink>
                <NavLink to="/clubs" className={({ isActive }) => isActive ? 'active' : ''}>Clubs</NavLink>
                <NavLink to="/events" className={({ isActive }) => isActive ? 'active' : ''}>Events</NavLink>
                <NavLink to="/faq" className={({ isActive }) => isActive ? 'active' : ''}>FAQ</NavLink>
                <NavLink to="/shops" className={({ isActive }) => isActive ? 'active' : ''}>Shops</NavLink>
                <NavLink to="/medical" className={({ isActive }) => isActive ? 'active' : ''}>Medical</NavLink>
                <NavLink to="/feedback" className={({ isActive }) => isActive ? 'active' : ''}>Feedback</NavLink>
            </div>
        </nav>
    );
}

export default Navbar;
