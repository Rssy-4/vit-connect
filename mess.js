
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

function showTodaysSpecial() {
    var today = new Date();
    var dayOfWeek = today.getDay();
    var dayNumber = dayOfWeek === 0 ? 7 : dayOfWeek;

    var todayCard = document.getElementById("todaysSpecial");
    var todayMenu = menuData[dayNumber];

    if (!todayMenu) return;

    var html = '<h3>📅 ' + dayNames[dayOfWeek] + ' — Today\'s Highlights</h3>';
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
    todayCard.innerHTML = html;
}

function showMenu() {
    var day = document.getElementById("daySelect").value;
    var type = document.getElementById("messType").value;
    var display = document.getElementById("menuDisplay");

    if (!day || !type) {
        display.style.display = "none";
        return;
    }

    if (menuData[day] && menuData[day][type]) {
        var selectedMenu = menuData[day][type];

        var tableHTML = '<table class="menu-table">';
        tableHTML += '<thead><tr>';
        tableHTML += '<th>Meal</th>';
        tableHTML += '<th>Time</th>';
        tableHTML += '<th>Menu Items</th>';
        tableHTML += '</tr></thead>';
        tableHTML += '<tbody>';

        var mealTimes = {
            breakfast: "7:30 — 9:30 AM",
            lunch: "12:00 — 2:00 PM",
            snacks: "4:30 — 6:00 PM",
            dinner: "7:30 — 9:30 PM"
        };

        for (var meal in selectedMenu) {
            var icon = mealIcons[meal] || "🍽️";
            var time = mealTimes[meal] || "";

            tableHTML += '<tr>';
            tableHTML += '<td><span class="meal-label">' + icon + ' ' + meal.charAt(0).toUpperCase() + meal.slice(1) + '</span></td>';
            tableHTML += '<td class="meal-time">' + time + '</td>';
            tableHTML += '<td>' + selectedMenu[meal] + '</td>';
            tableHTML += '</tr>';
        }

        tableHTML += '</tbody></table>';

        display.innerHTML = tableHTML;
        display.style.display = "block";
    } else {
        alert("Menu not available yet.");
        display.style.display = "none";
    }
}

window.addEventListener('load', function() {
    showTodaysSpecial();
});
