import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import MessMenu from './pages/MessMenu';
import Clubs from './pages/Clubs';
import Events from './pages/Events';
import FAQ from './pages/FAQ';
import Shops from './pages/Shops';
import MedicalStore from './pages/MedicalStore';
import Feedback from './pages/Feedback';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mess" element={<MessMenu />} />
                <Route path="/clubs" element={<Clubs />} />
                <Route path="/events" element={<Events />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/shops" element={<Shops />} />
                <Route path="/medical" element={<MedicalStore />} />
                <Route path="/feedback" element={<Feedback />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
