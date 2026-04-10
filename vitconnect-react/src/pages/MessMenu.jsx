import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './MessMenu.css';

var menuData = {
    1: {
        veg: { breakfast: "Upma, Tea, Banana", lunch: "Dal Rice, Roti, Salad", snacks: "Samosa, Chai", dinner: "Paneer Butter Masala, Roti, Rice" },
        nonVeg: { breakfast: "Omelette, Bread, Juice", lunch: "Chicken Curry, Rice, Raita", snacks: "Fish Fry, Lemon Soda", dinner: "Chicken Biryani, Raita" },
        special: { breakfast: "Pancakes, Maple Syrup, Juice", lunch: "Pasta Alfredo, Garlic Bread", snacks: "Fruit Salad, Smoothie", dinner: "Grilled Paneer, Caesar Salad" }
    },
    2: {
        veg: { breakfast: "Idli, Sambar, Chutney", lunch: "Chana Masala, Rice, Papad", snacks: "Pakora, Tea", dinner: "Aloo Gobi, Roti, Dal" },
        nonVeg: { breakfast: "Sausage, Toast, Coffee", lunch: "Fish Curry, Rice, Pickle", snacks: "Chicken Nuggets, Ketchup", dinner: "Prawn Fried Rice, Soup" },
        special: { breakfast: "French Toast, Berries", lunch: "Mushroom Risotto, Soup", snacks: "Cheese Platter, Crackers", dinner: "Grilled Veggies, Hummus" }
    },
    3: {
        veg: { breakfast: "Poha, Tea, Sprouts", lunch: "Rajma Rice, Curd", snacks: "Vada Pav, Chai", dinner: "Chole Bhature, Salad" },
        nonVeg: { breakfast: "Egg Bhurji, Paratha", lunch: "Mutton Curry, Rice, Naan", snacks: "Chicken Roll, Cola", dinner: "Butter Chicken, Naan, Rice" },
        special: { breakfast: "Smoothie Bowl, Granola", lunch: "Thai Green Curry, Rice", snacks: "Spring Rolls, Sweet Chili", dinner: "Sushi Platter, Miso Soup" }
    },
    4: {
        veg: { breakfast: "Dosa, Chutney, Sambar", lunch: "Sambar Rice, Poriyal", snacks: "Bhel Puri, Lime Soda", dinner: "Palak Paneer, Roti, Rice" },
        nonVeg: { breakfast: "Boiled Eggs, Toast, Jam", lunch: "Egg Curry, Rice, Papad", snacks: "Seekh Kebab, Mint Chutney", dinner: "Hyderabadi Biryani, Raita" },
        special: { breakfast: "Waffles, Ice Cream", lunch: "Wood-fired Pizza, Salad", snacks: "Ice Cream Sundae", dinner: "BBQ Platter, Coleslaw" }
    },
    5: {
        veg: { breakfast: "Aloo Paratha, Curd", lunch: "Mix Veg, Rice, Roti", snacks: "Pani Puri, Chaat", dinner: "Paneer Tikka, Roti, Dal" },
        nonVeg: { breakfast: "Chicken Sandwich, Juice", lunch: "Chicken Fried Rice, Manchurian", snacks: "Wings, Ranch Dip", dinner: "Tandoori Chicken, Naan, Salad" },
        special: { breakfast: "Croissant, Cappuccino", lunch: "Lasagna, Garlic Bread", snacks: "Brownie, Hot Chocolate", dinner: "Steak, Mashed Potatoes" }
    },
    6: {
        veg: { breakfast: "Medu Vada, Sambar", lunch: "Kadhi Chawal, Papad", snacks: "Dhokla, Green Chutney", dinner: "Malai Kofta, Roti, Rice" },
        nonVeg: { breakfast: "Bacon, Scrambled Eggs", lunch: "Keema Pav, Onion Salad", snacks: "Chicken Momos, Chutney", dinner: "Lamb Rogan Josh, Naan" },
        special: { breakfast: "Acai Bowl, Toast", lunch: "Burrito Bowl, Nachos", snacks: "Churros, Chocolate Sauce", dinner: "Lobster Thermidor, Salad" }
    },
    7: {
        veg: { breakfast: "Chole Kulche, Lassi", lunch: "Bisi Bele Bath, Bonda", snacks: "Masala Dosa, Coffee", dinner: "Shahi Paneer, Biryani, Gulab Jamun" },
        nonVeg: { breakfast: "French Omelette, Hash Browns", lunch: "Chicken Korma, Pulao", snacks: "Tandoori Momos", dinner: "Mutton Biryani, Phirni, Papad" },
        special: { breakfast: "Eggs Benedict, Mimosa", lunch: "Pad Thai, Spring Rolls", snacks: "Tiramisu, Espresso", dinner: "Chef's Special Thali" }
    }
};

var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var mealIcons = {
    breakfast: "🌅",
    lunch: "☀️",
    snacks: "🍿",
    dinner: "🌙"
};

var mealTimes = {
    breakfast: "7:30 — 9:30 AM",
    lunch: "12:00 — 2:00 PM",
    snacks: "4:30 — 6:00 PM",
    dinner: "7:30 — 9:30 PM"
};

function MessMenu() {
    var [selectedDay, setSelectedDay] = useState('');
    var [selectedType, setSelectedType] = useState('');
    var [todaysSpecialHTML, setTodaysSpecialHTML] = useState('');

    useEffect(function() {
        var today = new Date();
        var dayOfWeek = today.getDay();
        var dayNumber = dayOfWeek === 0 ? 7 : dayOfWeek;

        var todayMenu = menuData[dayNumber];
        if (!todayMenu) return;

        var html = '<h3>📅 ' + dayNames[dayOfWeek] + " — Today's Highlights</h3>";
        html += '<div class="today-meals">';

        var types = ["veg", "nonVeg"];
        for (var t = 0; t < types.length; t++) {
            var label = types[t] === "veg" ? "🟢 Veg" : "🔴 Non-Veg";
            var meals = todayMenu[types[t]];
            html += '<div class="today-type">';
            html += '<span class="type-badge">' + label + '</span>';
            html += '<p><strong>Lunch:</strong> ' + meals.lunch + '</p>';
            html += '<p><strong>Dinner:</strong> ' + meals.dinner + '</p>';
            html += '</div>';
        }
        html += '</div>';
        setTodaysSpecialHTML(html);
    }, []);

    function getMenuTable() {
        if (!selectedDay || !selectedType) return null;

        if (menuData[selectedDay] && menuData[selectedDay][selectedType]) {
            var selectedMenu = menuData[selectedDay][selectedType];
            var rows = [];

            for (var meal in selectedMenu) {
                var icon = mealIcons[meal] || "🍽️";
                var time = mealTimes[meal] || "";

                rows.push(
                    <tr key={meal}>
                        <td><span className="meal-label">{icon} {meal.charAt(0).toUpperCase() + meal.slice(1)}</span></td>
                        <td className="meal-time">{time}</td>
                        <td>{selectedMenu[meal]}</td>
                    </tr>
                );
            }

            return (
                <table className="menu-table">
                    <thead>
                        <tr>
                            <th>Meal</th>
                            <th>Time</th>
                            <th>Menu Items</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            );
        }

        return null;
    }

    return (
        <div>
            <Navbar />
            <main>
                <div className="container">
                    <header>
                        <h1>Mess Menu</h1>
                        <p className="intro">Check today's special or browse the full 7-day menu by selecting a day and mess type.</p>
                    </header>

                    <aside className="todays-special" dangerouslySetInnerHTML={{ __html: todaysSpecialHTML }}></aside>

                    <section className="menu-controls">
                        <select id="daySelect" title="Select day" value={selectedDay} onChange={function(e) { setSelectedDay(e.target.value); }}>
                            <option value="">Select Day</option>
                            <option value="1">Monday</option>
                            <option value="2">Tuesday</option>
                            <option value="3">Wednesday</option>
                            <option value="4">Thursday</option>
                            <option value="5">Friday</option>
                            <option value="6">Saturday</option>
                            <option value="7">Sunday</option>
                        </select>

                        <select id="messType" title="Select mess type" value={selectedType} onChange={function(e) { setSelectedType(e.target.value); }}>
                            <option value="">Select Mess Type</option>
                            <option value="veg">🟢 Vegetarian</option>
                            <option value="nonVeg">🔴 Non-Vegetarian</option>
                            <option value="special">⭐ Special</option>
                        </select>
                    </section>

                    <section>
                        <div id="menuDisplay" className="day-menu">
                            {getMenuTable()}
                        </div>
                    </section>

                    <Footer />
                </div>
            </main>
        </div>
    );
}

export default MessMenu;
