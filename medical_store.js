
var SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwkjS7_CPDBPnXOZdf2WZ-pG7Xf1-iGWBfA9u4QTvuGBmBLMVU0y0oOoE_JP1cQ2dkD2A/exec';

var products = [
    { id: 1,  name: "Paracetamol (Dolo 650)",  price: 30,  emoji: "💊", category: "fever",    desc: "For fever and mild pain relief" },
    { id: 2,  name: "Ibuprofen",                price: 45,  emoji: "💊", category: "fever",    desc: "Anti-inflammatory painkiller" },
    { id: 3,  name: "Crocin Advance",           price: 35,  emoji: "🌡️", category: "fever",    desc: "Fast action fever reducer" },
    { id: 4,  name: "Vicks Cough Drops",        price: 20,  emoji: "🍬", category: "cold",     desc: "Menthol cough relief drops" },
    { id: 5,  name: "Sinarest",                 price: 40,  emoji: "🤧", category: "cold",     desc: "Cold, headache & sinus relief" },
    { id: 6,  name: "Benadryl Syrup",           price: 95,  emoji: "🧴", category: "cold",     desc: "Cough suppressant syrup" },
    { id: 7,  name: "Digene Tablets",           price: 50,  emoji: "🫃", category: "stomach",  desc: "Antacid for acidity & gas" },
    { id: 8,  name: "ORS Sachets (5 pack)",     price: 35,  emoji: "🥤", category: "stomach",  desc: "Oral rehydration salts" },
    { id: 9,  name: "Pudin Hara",               price: 25,  emoji: "🌿", category: "stomach",  desc: "Digestive & stomach relief" },
    { id: 10, name: "Band-Aid (10 pack)",       price: 40,  emoji: "🩹", category: "firstaid", desc: "Adhesive bandages for wounds" },
    { id: 11, name: "Dettol Antiseptic",        price: 55,  emoji: "🧪", category: "firstaid", desc: "Liquid antiseptic for cuts" },
    { id: 12, name: "Cotton & Gauze Kit",       price: 60,  emoji: "🏥", category: "firstaid", desc: "Medical cotton and gauze rolls" },
    { id: 13, name: "Vitamin C Tablets",        price: 120, emoji: "🍊", category: "wellness", desc: "Immunity booster (30 tabs)" },
    { id: 14, name: "Multivitamin (Supradyn)",  price: 180, emoji: "✨", category: "wellness", desc: "Daily multivitamin supplement" },
    { id: 15, name: "Electral Powder",          price: 30,  emoji: "⚡", category: "wellness", desc: "Energy & electrolyte replenisher" },
    { id: 16, name: "Moov Pain Relief Spray",   price: 85,  emoji: "💨", category: "fever",    desc: "Instant muscle pain relief" }
];

var cart = [];
var currentCategory = 'all';

function renderProducts(category) {
    var grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    currentCategory = category;

    for (var i = 0; i < products.length; i++) {
        var product = products[i];

        if (category !== 'all' && product.category !== category) {
            continue;
        }

        var card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-category', product.category);

        var inCart = false;
        for (var j = 0; j < cart.length; j++) {
            if (cart[j].id === product.id) {
                inCart = true;
            }
        }

        card.innerHTML =
            '<div class="product-emoji">' + product.emoji + '</div>' +
            '<h3>' + product.name + '</h3>' +
            '<p class="desc">' + product.desc + '</p>' +
            '<p class="price">₹' + product.price + '</p>' +
            '<button class="add-btn" id="addBtn' + product.id + '" ' +
                'onclick="addToCart(' + product.id + ')" ' +
                (inCart ? 'disabled' : '') + '>' +
                (inCart ? '✓ Added' : '+ Add to Cart') +
            '</button>';

        grid.appendChild(card);
    }
}

function filterCategory(category) {
    var buttons = document.querySelectorAll('.filter-btn');

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
    }

    event.target.classList.add('active');

    renderProducts(category);
}

function addToCart(productId) {
    var product = null;
    for (var i = 0; i < products.length; i++) {
        if (products[i].id === productId) {
            product = products[i];
        }
    }

    if (!product) return;

    var existingItem = null;
    for (var j = 0; j < cart.length; j++) {
        if (cart[j].id === productId) {
            existingItem = cart[j];
        }
    }

    if (existingItem) {
        existingItem.qty = existingItem.qty + 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            emoji: product.emoji,
            qty: 1
        });
    }

    localStorage.setItem('vitconnect_cart', JSON.stringify(cart));

    var btn = document.getElementById('addBtn' + productId);
    if (btn) {
        btn.disabled = true;
        btn.textContent = '✓ Added';
    }

    renderCart();
}

function removeFromCart(productId) {
    var newCart = [];
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id !== productId) {
            newCart.push(cart[i]);
        }
    }
    cart = newCart;

    localStorage.setItem('vitconnect_cart', JSON.stringify(cart));

    var btn = document.getElementById('addBtn' + productId);
    if (btn) {
        btn.disabled = false;
        btn.textContent = '+ Add to Cart';
    }

    renderCart();
}

function updateQty(productId, change) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            cart[i].qty = cart[i].qty + change;
            if (cart[i].qty <= 0) {
                removeFromCart(productId);
                return;
            }
        }
    }

    localStorage.setItem('vitconnect_cart', JSON.stringify(cart));
    renderCart();
}

function renderCart() {
    var cartContainer = document.getElementById('cartItems');
    var cartTotalDiv = document.getElementById('cartTotal');
    var deliverySection = document.getElementById('deliverySection');

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="cart-empty">Your cart is empty. Add items from above!</p>';
        cartTotalDiv.style.display = 'none';
        deliverySection.style.display = 'none';
        return;
    }

    var html = '';
    var total = 0;

    for (var i = 0; i < cart.length; i++) {
        var item = cart[i];
        var itemTotal = item.price * item.qty;
        total = total + itemTotal;

        html = html +
            '<div class="cart-item">' +
                '<div class="cart-item-info">' +
                    '<h4>' + item.emoji + ' ' + item.name + '</h4>' +
                    '<span>₹' + item.price + ' × ' + item.qty + ' = ₹' + itemTotal + '</span>' +
                '</div>' +
                '<div class="cart-item-controls">' +
                    '<button class="qty-btn" onclick="updateQty(' + item.id + ', -1)">−</button>' +
                    '<span class="qty-display">' + item.qty + '</span>' +
                    '<button class="qty-btn" onclick="updateQty(' + item.id + ', 1)">+</button>' +
                    '<button class="remove-btn" onclick="removeFromCart(' + item.id + ')" title="Remove">🗑️</button>' +
                '</div>' +
            '</div>';
    }

    cartContainer.innerHTML = html;
    document.getElementById('totalAmount').textContent = '₹' + total;
    cartTotalDiv.style.display = 'flex';
    deliverySection.style.display = 'block';
}

function placeOrder() {
    var name = document.getElementById('medName').value.trim();
    var regno = document.getElementById('medRegno').value.trim();
    var hostel = document.getElementById('medHostel').value;
    var room = document.getElementById('medRoom').value.trim();

    var errors = document.querySelectorAll('.error-msg');
    for (var i = 0; i < errors.length; i++) {
        errors[i].style.display = 'none';
    }

    var namePattern = /^[A-Za-z ]{2,50}$/;
    if (!namePattern.test(name)) {
        document.getElementById('medNameError').style.display = 'block';
        document.getElementById('medName').focus();
        return;
    }

    var regPattern = /^[0-9]{2}[A-Z]{3}[0-9]{4}$/;
    if (!regPattern.test(regno)) {
        document.getElementById('medRegnoError').style.display = 'block';
        document.getElementById('medRegno').focus();
        return;
    }

    if (!hostel) {
        document.getElementById('medHostelError').style.display = 'block';
        return;
    }

    var roomPattern = /^[0-9]{1,4}$/;
    if (!roomPattern.test(room)) {
        document.getElementById('medRoomError').style.display = 'block';
        document.getElementById('medRoom').focus();
        return;
    }

    var itemsList = '';
    var total = 0;
    for (var j = 0; j < cart.length; j++) {
        var itemTotal = cart[j].price * cart[j].qty;
        total = total + itemTotal;
        itemsList = itemsList + cart[j].name + ' x' + cart[j].qty;
        if (j < cart.length - 1) {
            itemsList = itemsList + ', ';
        }
    }

    var orderData = {
        formType: 'medical',
        name: name,
        regno: regno,
        hostel: hostel,
        roomNo: room,
        items: itemsList,
        total: '₹' + total
    };

    fetch(SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
    });

    document.getElementById('orderMessage').textContent =
        'Your order of ' + cart.length + ' item(s) worth ₹' + total +
        ' will be delivered to ' + hostel + ', Room ' + room + '. Thank you, ' + name + '!';
    document.getElementById('orderPopup').style.display = 'flex';

    cart = [];
    localStorage.removeItem('vitconnect_cart');
    document.getElementById('deliveryForm').reset();
    renderProducts(currentCategory);
    renderCart();
}

function closeOrderPopup() {
    document.getElementById('orderPopup').style.display = 'none';
}

window.onload = function() {
    var savedCart = localStorage.getItem('vitconnect_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }

    renderProducts('all');
    renderCart();
};
