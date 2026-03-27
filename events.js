
function filterEvents() {
    var searchValue = document.getElementById('searchBox').value.toLowerCase();
    var fromDate = document.getElementById('fromDate').value;
    var toDate = document.getElementById('toDate').value;

    var events = document.querySelectorAll('.event-card');

    for (var i = 0; i < events.length; i++) {
        var eventTitle = events[i].querySelector('h3').innerText.toLowerCase();
        var eventDate = events[i].getAttribute('data-date');

        var matchesSearch = eventTitle.includes(searchValue);

        var matchesDate = true;
        if (fromDate && eventDate < fromDate) {
            matchesDate = false;
        }
        if (toDate && eventDate > toDate) {
            matchesDate = false;
        }

        if (matchesSearch && matchesDate) {
            events[i].style.display = 'block';
        } else {
            events[i].style.display = 'none';
        }
    }
}

function filterEventCategory(category) {
    var buttons = document.querySelectorAll('.evt-btn');
    for (var b = 0; b < buttons.length; b++) {
        buttons[b].classList.remove('active');
    }

    event.target.classList.add('active');

    var events = document.querySelectorAll('.event-card');

    for (var k = 0; k < events.length; k++) {
        var eventCategory = events[k].dataset.category;

        if (category === 'all' || eventCategory === category) {
            events[k].style.display = 'block';
        } else {
            events[k].style.display = 'none';
        }
    }
}

function startCountdown() {
    var now = new Date();
    var events = document.querySelectorAll('.event-card');
    var closestEvent = null;
    var closestDate = null;

    for (var i = 0; i < events.length; i++) {
        var dateStr = events[i].getAttribute('data-date');
        var eventDate = new Date(dateStr);

        if (eventDate > now) {
            if (!closestDate || eventDate < closestDate) {
                closestDate = eventDate;
                closestEvent = events[i].querySelector('h3').innerText;
            }
        }
    }

    var nameEl = document.getElementById('nextEventName');
    var timerEl = document.getElementById('countdownTimer');

    if (!closestDate) {
        nameEl.textContent = "No upcoming events";
        timerEl.innerHTML = "";
        return;
    }

    nameEl.textContent = closestEvent;

    function updateTimer() {
        var now = new Date();
        var diff = closestDate - now;

        if (diff <= 0) {
            timerEl.innerHTML = '<p style="color:#16a34a; font-weight:700;">🎉 Event is happening now!</p>';
            return;
        }

        var days = Math.floor(diff / (1000 * 60 * 60 * 24));
        var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((diff % (1000 * 60)) / 1000);

        timerEl.innerHTML =
            '<div class="countdown-unit"><div class="number">' + days + '</div><div class="label">Days</div></div>' +
            '<div class="countdown-unit"><div class="number">' + hours + '</div><div class="label">Hours</div></div>' +
            '<div class="countdown-unit"><div class="number">' + minutes + '</div><div class="label">Min</div></div>' +
            '<div class="countdown-unit"><div class="number">' + seconds + '</div><div class="label">Sec</div></div>';
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

window.addEventListener('load', function() {
    startCountdown();
});
