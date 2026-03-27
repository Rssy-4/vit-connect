
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

function displayDescription() {
    var club = document.getElementById('club').value;
    var descriptionDiv = document.getElementById('clubDescription');

    if (clubDescriptions[club]) {
        descriptionDiv.style.display = 'block';
        descriptionDiv.innerText = clubDescriptions[club];
    } else {
        descriptionDiv.style.display = 'none';
    }
}

function submitRegistration() {
    var name = document.getElementById('name').value.trim();
    var regno = document.getElementById('regno').value.trim();
    var email = document.getElementById('email').value.trim();
    var club = document.getElementById('club').value;
    var agreeBox = document.getElementById('agreeRules').checked;

    var yearRadios = document.getElementsByName('year');
    var selectedYear = '';

    for (var i = 0; i < yearRadios.length; i++) {
        if (yearRadios[i].checked) {
            selectedYear = yearRadios[i].value;
        }
    }

    var allErrors = document.querySelectorAll('.error-msg');
    for (var j = 0; j < allErrors.length; j++) {
        allErrors[j].style.display = 'none';
    }

    var isValid = true;

    var namePattern = /^[A-Za-z ]{2,50}$/;
    if (!namePattern.test(name)) {
        document.getElementById('nameError').style.display = 'block';
        document.getElementById('name').focus();
        isValid = false;
        return;
    }

    var regPattern = /^[0-9]{2}[A-Z]{3}[0-9]{4}$/;
    if (!regPattern.test(regno)) {
        document.getElementById('regnoError').style.display = 'block';
        document.getElementById('regno').focus();
        isValid = false;
        return;
    }

    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        document.getElementById('emailError').style.display = 'block';
        document.getElementById('email').focus();
        isValid = false;
        return;
    }

    if (selectedYear === '') {
        document.getElementById('yearError').style.display = 'block';
        isValid = false;
        return;
    }

    if (club === '') {
        document.getElementById('clubError').style.display = 'block';
        document.getElementById('club').focus();
        isValid = false;
        return;
    }

    if (!agreeBox) {
        document.getElementById('agreeError').style.display = 'block';
        isValid = false;
        return;
    }

    if (isValid) {

        fetch('https://script.google.com/macros/s/AKfycbwkjS7_CPDBPnXOZdf2WZ-pG7Xf1-iGWBfA9u4QTvuGBmBLMVU0y0oOoE_JP1cQ2dkD2A/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                formType: 'club',
                name: name,
                regno: regno,
                email: email,
                year: selectedYear,
                club: club
            })
        });

        if (openClubs.includes(club)) {
            document.getElementById('popupMessage').innerText =
                'Congratulations, ' + name + '! You have successfully registered for the ' + club + '.';
        } else {
            document.getElementById('popupMessage').innerText =
                'Sorry, ' + name + '. Registration for the ' + club + ' is currently closed.';
        }

        document.getElementById('registrationPopup').style.display = 'flex';

        document.getElementById('clubForm').reset();
        document.getElementById('clubDescription').style.display = 'none';
    }
}

function closePopup() {
    document.getElementById('registrationPopup').style.display = 'none';
}

function showTooltip() {
    document.getElementById('btnTooltip').style.display = 'block';
}

function hideTooltip() {
    document.getElementById('btnTooltip').style.display = 'none';
}

function populateClubStatusTable() {
    var tableBody = document.getElementById('clubStatusTable');
    var clubNames = Object.keys(clubDescriptions);

    for (var i = 0; i < clubNames.length; i++) {
        var clubName = clubNames[i];

        var row = document.createElement('tr');

        var nameCell = document.createElement('td');
        nameCell.textContent = clubName;

        var statusCell = document.createElement('td');

        var found = false;
        var searchIndex = 0;
        do {
            if (openClubs[searchIndex] === clubName) {
                found = true;
            }
            searchIndex = searchIndex + 1;
        } while (searchIndex < openClubs.length && !found);

        if (found) {
            statusCell.innerHTML = '<span class="status-badge status-open">Open</span>';
        } else {
            statusCell.innerHTML = '<span class="status-badge status-closed">Closed</span>';
        }

        row.appendChild(nameCell);
        row.appendChild(statusCell);
        tableBody.appendChild(row);
    }
}

window.onload = function() {
    populateClubStatusTable();
};
