import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './MedicalStore.css';

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

function MedicalStore() {
    var [cart, setCart] = useState([]);
    var [currentCategory, setCurrentCategory] = useState('all');
    var [medName, setMedName] = useState('');
    var [medRegno, setMedRegno] = useState('');
    var [medHostel, setMedHostel] = useState('');
    var [medRoom, setMedRoom] = useState('');
    var [errors, setErrors] = useState({});
    var [showPopup, setShowPopup] = useState(false);
    var [orderMessage, setOrderMessage] = useState('');

    useEffect(function() {
        var savedCart = localStorage.getItem('vitconnect_cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    function saveCart(newCart) {
        localStorage.setItem('vitconnect_cart', JSON.stringify(newCart));
        setCart(newCart);
    }

    function isInCart(productId) {
        for (var j = 0; j < cart.length; j++) {
            if (cart[j].id === productId) return true;
        }
        return false;
    }

    function addToCart(productId) {
        var product = null;
        for (var i = 0; i < products.length; i++) {
            if (products[i].id === productId) {
                product = products[i];
            }
        }
        if (!product) return;

        var newCart = cart.slice();
        var found = false;
        for (var j = 0; j < newCart.length; j++) {
            if (newCart[j].id === productId) {
                newCart[j] = Object.assign({}, newCart[j], { qty: newCart[j].qty + 1 });
                found = true;
            }
        }

        if (!found) {
            newCart.push({ id: product.id, name: product.name, price: product.price, emoji: product.emoji, qty: 1 });
        }

        saveCart(newCart);
    }

    function removeFromCart(productId) {
        var newCart = [];
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].id !== productId) {
                newCart.push(cart[i]);
            }
        }
        saveCart(newCart);
    }

    function updateQty(productId, change) {
        var newCart = cart.slice();
        for (var i = 0; i < newCart.length; i++) {
            if (newCart[i].id === productId) {
                var newQty = newCart[i].qty + change;
                if (newQty <= 0) {
                    removeFromCart(productId);
                    return;
                }
                newCart[i] = Object.assign({}, newCart[i], { qty: newQty });
            }
        }
        saveCart(newCart);
    }

    function getTotal() {
        var total = 0;
        for (var i = 0; i < cart.length; i++) {
            total = total + (cart[i].price * cart[i].qty);
        }
        return total;
    }

    function filterCategory(category) {
        setCurrentCategory(category);
    }

    function placeOrder() {
        var name = medName.trim();
        var regno = medRegno.trim();
        var hostel = medHostel;
        var room = medRoom.trim();

        var newErrors = {};

        var namePattern = /^[A-Za-z ]{2,50}$/;
        if (!namePattern.test(name)) {
            newErrors.name = true;
            document.getElementById('medName').focus();
            setErrors(newErrors);
            return;
        }

        var regPattern = /^[0-9]{2}[A-Z]{3}[0-9]{4}$/;
        if (!regPattern.test(regno)) {
            newErrors.regno = true;
            document.getElementById('medRegno').focus();
            setErrors(newErrors);
            return;
        }

        if (!hostel) {
            newErrors.hostel = true;
            setErrors(newErrors);
            return;
        }

        var roomPattern = /^[0-9]{1,4}$/;
        if (!roomPattern.test(room)) {
            newErrors.room = true;
            document.getElementById('medRoom').focus();
            setErrors(newErrors);
            return;
        }

        setErrors({});

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

        setOrderMessage(
            'Your order of ' + cart.length + ' item(s) worth ₹' + total +
            ' will be delivered to ' + hostel + ', Room ' + room + '. Thank you, ' + name + '!'
        );
        setShowPopup(true);

        localStorage.removeItem('vitconnect_cart');
        setCart([]);
        setMedName('');
        setMedRegno('');
        setMedHostel('');
        setMedRoom('');
    }

    function getVisibleProducts() {
        var visible = [];
        for (var i = 0; i < products.length; i++) {
            if (currentCategory === 'all' || products[i].category === currentCategory) {
                visible.push(products[i]);
            }
        }
        return visible;
    }

    var visibleProducts = getVisibleProducts();
    var total = getTotal();

    return (
        <div>
            <Navbar />
            <main>
                <div className="container" style={{ maxWidth: '1100px' }}>
                    <header>
                        <h1>🏥 Campus Medical Store</h1>
                        <p className="intro">Order medicines and health essentials. Delivered to your hostel room!</p>
                    </header>

                    <section>
                        <div className="category-filter" id="categoryFilter">
                            {['all', 'fever', 'cold', 'stomach', 'firstaid', 'wellness'].map(function(cat) {
                                var labels = { all: 'All', fever: '🤒 Fever & Pain', cold: '🤧 Cold & Cough', stomach: '🤢 Stomach', firstaid: '🩹 First Aid', wellness: '💊 Wellness' };
                                return (
                                    <button
                                        key={cat}
                                        className={'filter-btn' + (currentCategory === cat ? ' active' : '')}
                                        onClick={function() { filterCategory(cat); }}
                                    >
                                        {labels[cat]}
                                    </button>
                                );
                            })}
                        </div>
                    </section>

                    <section style={{ marginTop: '30px' }}>
                        <h2 className="section-header">Available Products</h2>
                        <div className="products-grid" id="productsGrid">
                            {visibleProducts.map(function(product) {
                                var inCart = isInCart(product.id);
                                return (
                                    <div className="product-card" key={product.id} data-category={product.category}>
                                        <div className="product-emoji">{product.emoji}</div>
                                        <h3>{product.name}</h3>
                                        <p className="desc">{product.desc}</p>
                                        <p className="price">₹{product.price}</p>
                                        <button
                                            className="add-btn"
                                            onClick={function() { addToCart(product.id); }}
                                            disabled={inCart}
                                        >
                                            {inCart ? '✓ Added' : '+ Add to Cart'}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <section className="ui-card" id="cartSection">
                        <h2>🛒 Your Cart</h2>
                        <div id="cartItems">
                            {cart.length === 0 ? (
                                <div className="cart-empty" style={{ padding: '40px 20px', background: '#f8fafc', borderRadius: '12px', border: '1.5px dashed #cbd5e1' }}>
                                    <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '10px' }}>🛍️</span>
                                    Your cart is empty. Add items from above!
                                </div>
                            ) : (
                                cart.map(function(item) {
                                    var itemTotal = item.price * item.qty;
                                    return (
                                        <div className="cart-item" key={item.id}>
                                            <div className="cart-item-info">
                                                <h4>{item.emoji} {item.name}</h4>
                                                <span>₹{item.price} × {item.qty} = ₹{itemTotal}</span>
                                            </div>
                                            <div className="cart-item-controls">
                                                <button className="qty-btn" onClick={function() { updateQty(item.id, -1); }}>−</button>
                                                <span className="qty-display">{item.qty}</span>
                                                <button className="qty-btn" onClick={function() { updateQty(item.id, 1); }}>+</button>
                                                <button className="remove-btn" onClick={function() { removeFromCart(item.id); }} title="Remove">🗑️</button>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                        <div className="cart-total" id="cartTotal" style={{ display: cart.length > 0 ? 'flex' : 'none' }}>
                            <span>Total:</span>
                            <span className="amount" id="totalAmount">₹{total}</span>
                        </div>
                    </section>

                    <section className="ui-card" id="deliverySection" style={{ display: cart.length > 0 ? 'block' : 'none' }}>
                        <h2>📦 Delivery Details</h2>
                        <form id="deliveryForm" className="delivery-form" onSubmit={function(e) { e.preventDefault(); }}>
                            <div className="form-grid">
                                <div className="form-row">
                                    <label htmlFor="medName" style={{ fontWeight: 600, color: '#334155', marginBottom: '5px', display: 'block' }}>Full Name:</label>
                                    <input type="text" id="medName" placeholder="Enter your name" value={medName} onChange={function(e) { setMedName(e.target.value); }} required />
                                    <div className="error-msg" style={{ display: errors.name ? 'block' : 'none' }}>Only letters and spaces (2-50 chars)</div>
                                </div>
                                <div className="form-row">
                                    <label htmlFor="medRegno" style={{ fontWeight: 600, color: '#334155', marginBottom: '5px', display: 'block' }}>Registration No:</label>
                                    <input type="text" id="medRegno" placeholder="e.g. 24BCE0123" value={medRegno} onChange={function(e) { setMedRegno(e.target.value); }} required />
                                    <div className="error-msg" style={{ display: errors.regno ? 'block' : 'none' }}>Format: 2 digits + 3 letters + 4 digits</div>
                                </div>
                            </div>
                            <div className="form-grid">
                                <div className="form-row">
                                    <label htmlFor="medHostel" style={{ fontWeight: 600, color: '#334155', marginBottom: '5px', display: 'block' }}>Hostel Block:</label>
                                    <select id="medHostel" value={medHostel} onChange={function(e) { setMedHostel(e.target.value); }} required>
                                        <option value="">Select Block</option>
                                        <option value="Men's Hostel A">Men's Hostel A</option>
                                        <option value="Men's Hostel B">Men's Hostel B</option>
                                        <option value="Men's Hostel C">Men's Hostel C</option>
                                        <option value="Men's Hostel D">Men's Hostel D</option>
                                        <option value="Men's Hostel E">Men's Hostel E</option>
                                        <option value="Women's Hostel A">Women's Hostel A</option>
                                        <option value="Women's Hostel B">Women's Hostel B</option>
                                        <option value="Women's Hostel C">Women's Hostel C</option>
                                    </select>
                                    <div className="error-msg" style={{ display: errors.hostel ? 'block' : 'none' }}>Please select your hostel</div>
                                </div>
                                <div className="form-row">
                                    <label htmlFor="medRoom" style={{ fontWeight: 600, color: '#334155', marginBottom: '5px', display: 'block' }}>Room Number:</label>
                                    <input type="text" id="medRoom" placeholder="e.g. 302" value={medRoom} onChange={function(e) { setMedRoom(e.target.value); }} required />
                                    <div className="error-msg" style={{ display: errors.room ? 'block' : 'none' }}>Enter a valid room number</div>
                                </div>
                            </div>

                            <div style={{ textAlign: 'center', marginTop: '15px' }}>
                                <button type="button" className="btn-primary" onClick={placeOrder} style={{ padding: '12px 30px', fontSize: '1rem', borderRadius: '10px', boxShadow: '0 4px 12px rgba(26, 86, 219, 0.2)', transition: 'transform 0.2s, box-shadow 0.2s' }}>🚀 Place Order</button>
                            </div>
                        </form>
                    </section>

                    <Footer />
                </div>
            </main>

            <div className={'popup' + (showPopup ? ' show' : '')}>
                <div className="popup-content">
                    <h2>Order Placed! ✅</h2>
                    <p>{orderMessage}</p>
                    <button className="close-button" onClick={function() { setShowPopup(false); }}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default MedicalStore;
