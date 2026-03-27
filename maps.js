
var map = L.map('map').setView([12.9716, 79.1595], 16);
var routingControl;
var locationMarker;

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
}).addTo(map);

var locations = {
    "Main Gate": [12.9716, 79.1595],
    "Library": [12.9728, 79.1635],
    "Men's Hostel": [12.9735, 79.1580],
    "Women's Hostel": [12.9705, 79.1590],
    "Auditorium": [12.9722, 79.1620],
    "Food Court": [12.9742, 79.1618],
    "Admin Block": [12.9750, 79.1610],
    "Technology Tower (TT)": [12.9760, 79.1605],
    "Sports Complex": [12.9740, 79.1585],
    "Academic Block 1 (AB1)": [12.9730, 79.1600],
    "Academic Block 2 (AB2)": [12.9738, 79.1612],
    "Silver Jubilee Tower (SJT)": [12.9745, 79.1625],
    "Parking Area": [12.9710, 79.1580],
    "Health Centre": [12.9720, 79.1575],
    "Basketball Court": [12.9748, 79.1570],
    "Swimming Pool": [12.9752, 79.1575],
    "Placement Cell": [12.9755, 79.1620]
};

var locationTypes = {
    "Main Gate": "🚪",
    "Library": "📚",
    "Men's Hostel": "🏠",
    "Women's Hostel": "🏠",
    "Auditorium": "🎭",
    "Food Court": "🍕",
    "Admin Block": "🏛️",
    "Technology Tower (TT)": "🏢",
    "Sports Complex": "⚽",
    "Academic Block 1 (AB1)": "📖",
    "Academic Block 2 (AB2)": "📖",
    "Silver Jubilee Tower (SJT)": "🏢",
    "Parking Area": "🅿️",
    "Health Centre": "🏥",
    "Basketball Court": "🏀",
    "Swimming Pool": "🏊",
    "Placement Cell": "💼"
};

var startSelect = document.getElementById('start');
var endSelect = document.getElementById('end');

for (var place in locations) {
    var option1 = new Option(place, locations[place]);
    var option2 = new Option(place, locations[place]);
    startSelect.add(option1);
    endSelect.add(option2);

    var icon = locationTypes[place] || "📍";
    L.marker(locations[place])
        .addTo(map)
        .bindPopup("<strong>" + icon + " " + place + "</strong>");
}

function calculateRoute(start, end) {
    if (routingControl) {
        map.removeControl(routingControl);
    }

    routingControl = L.Routing.control({
        waypoints: [
            L.latLng(start[0], start[1]),
            L.latLng(end[0], end[1])
        ],
        routeWhileDragging: true
    }).addTo(map);
}

document.getElementById('getDirections').addEventListener('click', function() {
    var start = startSelect.value.split(',').map(Number);
    var end = endSelect.value.split(',').map(Number);
    calculateRoute(start, end);
});

document.getElementById('locateMe').addEventListener('click', function() {
    if (!navigator.geolocation) {
        alert("Geolocation not supported by your browser");
        return;
    }

    navigator.geolocation.getCurrentPosition(function(pos) {
        var lat = pos.coords.latitude;
        var lng = pos.coords.longitude;

        if (locationMarker) {
            map.removeLayer(locationMarker);
        }

        locationMarker = L.marker([lat, lng])
            .addTo(map)
            .bindPopup("You are here 📍")
            .openPopup();

        map.setView([lat, lng], 18);
    }, function() {
        alert("Location access denied");
    });
});

document.getElementById('resetMap').addEventListener('click', function() {
    if (routingControl) {
        map.removeControl(routingControl);
        routingControl = null;
    }
    if (locationMarker) {
        map.removeLayer(locationMarker);
    }
    map.setView([12.9716, 79.1595], 16);
    startSelect.selectedIndex = 0;
    endSelect.selectedIndex = 0;
});
