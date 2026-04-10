import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Shops.css';

var shopsData = [
    { name: 'Medical Store', location: "Near Women's Hostel", description: 'Medicines, first-aid kits, and health essentials', price: 300, category: 'medical', rating: 3.5, openHour: 11, closeHour: 24, contact: '📞 98765-43210', hours: 'Hours: 11:00 AM – 12:00 AM' },
    { name: 'Samsung Store', location: 'Near Foodies', description: 'Phones, accessories, and repairs', price: 5000, category: 'electronics', rating: 3, openHour: 12, closeHour: 20, contact: '📞 98765-11111', hours: 'Hours: 12:00 PM – 8:00 PM' },
    { name: 'Optician', location: "Men's Hostel Gate", description: 'Eyeglasses, lenses, and eye care', price: 3000, category: 'services', rating: 2.5, openHour: 9, closeHour: 20, contact: '📞 98765-22222', hours: 'Hours: 9:00 AM – 8:00 PM' },
    { name: 'Shri Balaji Store', location: 'Near TT', description: 'Groceries, stationery, and daily essentials', price: 500, category: 'stationery', rating: 5, openHour: 10, closeHour: 21, contact: '📞 98765-33333', hours: 'Hours: 10:00 AM – 9:00 PM' },
    { name: 'Campus Stationery Hub', location: 'Near Academic Block 1', description: 'Notebooks, pens, art supplies, and printing', price: 200, category: 'stationery', rating: 4, openHour: 9, closeHour: 19, contact: '📞 98765-44444', hours: 'Hours: 9:00 AM – 7:00 PM' },
    { name: 'Fresh Juice Corner', location: 'Near Food Court', description: 'Fresh juices, smoothies, milkshakes, and snacks', price: 150, category: 'food', rating: 4.5, openHour: 8, closeHour: 22, contact: '📞 98765-55555', hours: 'Hours: 8:00 AM – 10:00 PM' }
];

var categoryTags = {
    medical: '💊 Medical',
    electronics: '📱 Electronics',
    services: '✂️ Services',
    stationery: '📝 Stationery',
    food: '🍕 Food'
};

function renderStars(rating) {
    var stars = [];
    for (var i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars.push(<i key={i} className="fas fa-star"></i>);
        } else if (i - 0.5 <= rating) {
            stars.push(<i key={i} className="fas fa-star-half-alt"></i>);
        } else {
            stars.push(<i key={i} className="far fa-star"></i>);
        }
    }
    return stars;
}

function getShopStatus(openHour, closeHour) {
    var now = new Date();
    var currentHour = now.getHours();
    if (currentHour >= openHour && currentHour < closeHour) {
        return { text: '🟢 Open Now', className: 'status-badge status-open' };
    } else {
        return { text: '🔴 Closed', className: 'status-badge status-closed' };
    }
}

function Shops() {
    var [activeCategory, setActiveCategory] = useState('all');
    var [searchValue, setSearchValue] = useState('');
    var [sortValue, setSortValue] = useState('default');
    var [favorites, setFavorites] = useState({});

    function filterCategory(category) {
        setActiveCategory(category);
    }

    function toggleFavorite(index) {
        var newFavorites = Object.assign({}, favorites);
        newFavorites[index] = !newFavorites[index];
        setFavorites(newFavorites);
    }

    function getFilteredAndSortedShops() {
        var filtered = [];
        for (var i = 0; i < shopsData.length; i++) {
            var shop = shopsData[i];
            var matchesCategory = activeCategory === 'all' || shop.category === activeCategory;
            var matchesSearch = shop.name.toLowerCase().includes(searchValue.toLowerCase());
            if (matchesCategory && matchesSearch) {
                filtered.push({ shop: shop, originalIndex: i });
            }
        }

        if (sortValue === 'price-low-high') {
            filtered.sort(function(a, b) { return a.shop.price - b.shop.price; });
        } else if (sortValue === 'price-high-low') {
            filtered.sort(function(a, b) { return b.shop.price - a.shop.price; });
        } else if (sortValue === 'rating-high') {
            filtered.sort(function(a, b) { return b.shop.rating - a.shop.rating; });
        }

        return filtered;
    }

    var filteredShops = getFilteredAndSortedShops();

    return (
        <div>
            <Navbar />
            <main>
                <div className="container">
                    <header>
                        <h1>Campus Shops</h1>
                        <p className="intro">Explore campus shops, compare prices, and find what you need!</p>
                    </header>

                    <section className="category-filters" id="categoryFilters">
                        {['all', 'food', 'medical', 'electronics', 'stationery', 'services'].map(function(cat) {
                            var labels = { all: 'All', food: '🍕 Food', medical: '💊 Medical', electronics: '📱 Electronics', stationery: '📝 Stationery', services: '✂️ Services' };
                            return (
                                <button
                                    key={cat}
                                    className={'cat-btn' + (activeCategory === cat ? ' active' : '')}
                                    onClick={function() { filterCategory(cat); }}
                                >
                                    {labels[cat]}
                                </button>
                            );
                        })}
                    </section>

                    <section>
                        <div className="shop-controls">
                            <input type="text" id="search" placeholder="Search for shops..." value={searchValue} onChange={function(e) { setSearchValue(e.target.value); }} />
                            <select id="sort" className="sort-select" value={sortValue} onChange={function(e) { setSortValue(e.target.value); }}>
                                <option value="default">Sort by</option>
                                <option value="price-low-high">Price: Low to High</option>
                                <option value="price-high-low">Price: High to Low</option>
                                <option value="rating-high">Rating: Best First</option>
                            </select>
                        </div>
                    </section>

                    <section id="shop-list">
                        {filteredShops.map(function(item) {
                            var shop = item.shop;
                            var idx = item.originalIndex;
                            var status = getShopStatus(shop.openHour, shop.closeHour);
                            var isFav = favorites[idx];
                            return (
                                <article className="shop-item" key={idx}>
                                    <i
                                        className={'favorite ' + (isFav ? 'fas' : 'far') + ' fa-heart'}
                                        onClick={function() { toggleFavorite(idx); }}
                                        style={{ cursor: 'pointer', fontSize: '1.3rem' }}
                                    ></i>
                                    <span className="category-tag">{categoryTags[shop.category]}</span>
                                    <h2>{shop.name}</h2>
                                    <p>Location: {shop.location}</p>
                                    <p>Description: {shop.description}</p>
                                    <p className="price">Avg. Price: ₹{shop.price}</p>
                                    <div className="rating">
                                        {renderStars(shop.rating)}
                                    </div>
                                    <div className="shop-meta">
                                        <span className="shop-contact">{shop.contact}</span>
                                        <span className={status.className}>{status.text}</span>
                                    </div>
                                    <div className="details">{shop.hours}</div>
                                </article>
                            );
                        })}
                    </section>

                    <Footer />
                </div>
            </main>
        </div>
    );
}

export default Shops;
