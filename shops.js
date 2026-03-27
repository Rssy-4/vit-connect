
var shopItems = document.querySelectorAll('.shop-item');

for (var i = 0; i < shopItems.length; i++) {
    shopItems[i].addEventListener('click', function() {
        this.classList.toggle('active');
    });
}

var favoriteIcons = document.querySelectorAll('.favorite');

for (var j = 0; j < favoriteIcons.length; j++) {
    favoriteIcons[j].addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('liked');

        if (this.classList.contains('liked')) {
            this.classList.remove('far');
            this.classList.add('fas');
        } else {
            this.classList.remove('fas');
            this.classList.add('far');
        }
    });
}

var searchInput = document.getElementById('search');

searchInput.addEventListener('input', function() {
    var filter = searchInput.value.toLowerCase();

    for (var k = 0; k < shopItems.length; k++) {
        var shopName = shopItems[k].querySelector('h2').textContent.toLowerCase();

        if (shopName.includes(filter)) {
            shopItems[k].style.display = 'block';
        } else {
            shopItems[k].style.display = 'none';
        }
    }
});

var sortSelect = document.getElementById('sort');

sortSelect.addEventListener('change', function() {
    var shopList = document.getElementById('shop-list');
    var items = Array.from(shopItems);

    if (sortSelect.value === 'price-low-high') {
        items.sort(function(a, b) {
            return a.dataset.price - b.dataset.price;
        });
    } else if (sortSelect.value === 'price-high-low') {
        items.sort(function(a, b) {
            return b.dataset.price - a.dataset.price;
        });
    } else if (sortSelect.value === 'rating-high') {
        items.sort(function(a, b) {
            return parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating);
        });
    }

    shopList.innerHTML = '';
    for (var m = 0; m < items.length; m++) {
        shopList.appendChild(items[m]);
    }
});

function filterCategory(category) {
    var buttons = document.querySelectorAll('.cat-btn');
    for (var b = 0; b < buttons.length; b++) {
        buttons[b].classList.remove('active');
    }

    event.target.classList.add('active');

    for (var k = 0; k < shopItems.length; k++) {
        var shopCategory = shopItems[k].dataset.category;

        if (category === 'all' || shopCategory === category) {
            shopItems[k].style.display = 'block';
        } else {
            shopItems[k].style.display = 'none';
        }
    }
}

function updateShopStatus() {
    var now = new Date();
    var currentHour = now.getHours();

    var badges = document.querySelectorAll('.status-badge');

    for (var i = 0; i < badges.length; i++) {
        var openHour = parseInt(badges[i].dataset.open);
        var closeHour = parseInt(badges[i].dataset.close);

        if (currentHour >= openHour && currentHour < closeHour) {
            badges[i].textContent = '🟢 Open Now';
            badges[i].className = 'status-badge status-open';
        } else {
            badges[i].textContent = '🔴 Closed';
            badges[i].className = 'status-badge status-closed';
        }
    }
}

window.addEventListener('load', function() {
    updateShopStatus();
});
