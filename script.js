// Debug function
function debug(message) {
    console.log(`[Debug]: ${message}`);
}

// Initialize state from localStorage
let cart = JSON.parse(localStorage.getItem('gameCart')) || [];
console.log('Initial cart:', cart);

document.addEventListener('DOMContentLoaded', function() {
    debug('DOM Loaded - Initializing game store...');

    // DOM Elements
    const cartModal = document.getElementById('cart-modal');
    const cartBtn = document.querySelector('.cart-btn');
    const closeBtn = document.querySelector('.close');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    console.log('Cart elements:', { cartModal, cartBtn, closeBtn, cartItems, cartTotal });

    // Debug element existence
    debug(`Cart Modal exists: ${!!cartModal}`);
    debug(`Cart Button exists: ${!!cartBtn}`);
    debug(`Close Button exists: ${!!closeBtn}`);
    debug(`Cart Items container exists: ${!!cartItems}`);
    debug(`Cart Total element exists: ${!!cartTotal}`);

    // Cart modal controls
    cartBtn.addEventListener('click', () => {
        debug('Cart button clicked');
        cartModal.style.display = 'block';
        updateCartDisplay();
    });

    closeBtn.addEventListener('click', () => {
        debug('Close button clicked');
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            debug('Clicked outside modal');
            cartModal.style.display = 'none';
        }
    });

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    debug(`Found ${addToCartButtons.length} 'Add to Cart' buttons`);

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            debug('Add to cart button clicked');

            const gameCard = this.closest('.game-card') || this.closest('.deal-card') || this.closest('.hero-content');
            if (!gameCard) {
                debug('No game card found');
                return;
            }

            const gameId = this.getAttribute('data-id');
            const price = parseFloat(this.getAttribute('data-price'));
            const title = gameCard.querySelector('h3')?.textContent || gameCard.querySelector('h1')?.textContent;
            const image = gameCard.querySelector('img')?.src;

            debug('Game details:', { gameId, price, title, image });

            if (!gameId || !price || !title || !image) {
                debug('Missing game details');
                return;
            }

            addToCart({ id: gameId, title, price, image });
            
            // Button feedback
            this.textContent = 'Added!';
            this.classList.add('added');
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
                this.classList.remove('added');
            }, 2000);
        });
    });

    function addToCart(game) {
        debug('Adding to cart:', game);
        const existingItem = cart.find(item => item.id === game.id);
        
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            cart.push({ ...game, quantity: 1 });
        }

        localStorage.setItem('gameCart', JSON.stringify(cart));
        updateCartBadge();
        updateCartDisplay();
        showNotification(`Added ${game.title} to cart`);
    }

    function updateCartBadge() {
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
        const badge = document.querySelector('.cart-badge');
        if (badge) {
            badge.textContent = totalItems;
            badge.style.display = totalItems > 0 ? 'block' : 'none';
        }
        debug('Updated cart badge:', totalItems);
    }

    function updateCartDisplay() {
        if (!cartItems || !cartTotal) return;
        debug('Updating cart display');

        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
            cartTotal.textContent = '0.00';
            return;
        }

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="cart-item-details">
                    <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                    <div class="cart-item-info">
                        <h4>${item.title}</h4>
                        <div class="cart-item-controls">
                            <button onclick="updateQuantity('${item.id}', ${(item.quantity || 1) - 1})">-</button>
                            <span>${item.quantity || 1}</span>
                            <button onclick="updateQuantity('${item.id}', ${(item.quantity || 1) + 1})">+</button>
                        </div>
                    </div>
                </div>
                <div class="cart-item-price">
                    <span>$${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                    <button class="remove-item" onclick="removeFromCart('${item.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            cartItems.appendChild(itemElement);
        });

        const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
        cartTotal.textContent = total.toFixed(2);
        debug(`Updated cart display, total: $${total.toFixed(2)}`);
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 100);

        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
        debug(`Showed notification: ${message}`);
    }

    // Make functions available globally
    window.updateQuantity = function(id, newQuantity) {
        debug('Updating quantity:', { id, newQuantity });
        if (newQuantity <= 0) {
            removeFromCart(id);
            return;
        }

        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity = newQuantity;
            localStorage.setItem('gameCart', JSON.stringify(cart));
            updateCartDisplay();
            updateCartBadge();
        }
    };

    window.removeFromCart = function(id) {
        debug('Removing from cart:', id);
        const index = cart.findIndex(item => item.id === id);
        if (index > -1) {
            cart.splice(index, 1);
            localStorage.setItem('gameCart', JSON.stringify(cart));
            updateCartDisplay();
            updateCartBadge();
        }
    };

    // Initialize cart
    updateCartBadge();
    updateCartDisplay();
    debug('Game store initialization complete');
});

// Rating system
document.querySelectorAll('.game-rating').forEach(ratingElement => {
    const gameId = ratingElement.closest('.game-card, .deal-card').dataset.id;
    if (ratings[gameId]) {
        updateRatingDisplay(ratingElement, ratings[gameId]);
    }
    
    const stars = ratingElement.querySelectorAll('i');
    stars.forEach((star, index) => {
        star.addEventListener('mouseover', () => {
            updateRatingDisplay(ratingElement, index + 1, true);
        });
        
        star.addEventListener('mouseout', () => {
            updateRatingDisplay(ratingElement, ratings[gameId] || 0);
        });
        
        star.addEventListener('click', () => {
            setRating(gameId, index + 1);
        });
    });
});

function setRating(gameId, rating) {
    ratings[gameId] = rating;
    const ratingElements = document.querySelectorAll(`.game-card[data-id="${gameId}"] .game-rating, .deal-card[data-id="${gameId}"] .game-rating`);
    ratingElements.forEach(element => updateRatingDisplay(element, rating));
    saveRatingsToLocalStorage();
}

function updateRatingDisplay(element, rating, hover = false) {
    const stars = element.querySelectorAll('i');
    stars.forEach((star, index) => {
        star.className = index < rating 
            ? 'fas fa-star' 
            : (index === Math.floor(rating) && rating % 1 !== 0)
                ? 'fas fa-star-half-alt'
                : 'far fa-star';
    });
    
    if (!hover) {
        const ratingText = element.querySelector('span');
        if (ratingText) {
            ratingText.textContent = rating.toFixed(1);
        }
    }
}

function saveRatingsToLocalStorage() {
    localStorage.setItem('gameRatings', JSON.stringify(ratings));
}

// Filter functionality
if (viewOptions) {
    viewOptions.querySelectorAll('button').forEach(button => {
        if (button.textContent === activeFilter) {
            button.classList.add('active');
        }
        
        button.addEventListener('click', () => {
            viewOptions.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            activeFilter = button.textContent;
            filterGames(activeFilter);
            localStorage.setItem('activeFilter', activeFilter);
        });
    });
}

function filterGames(filter) {
    const games = document.querySelectorAll('.game-card');
    games.forEach(game => {
        const rating = parseFloat(game.querySelector('.game-rating span').textContent);
        game.style.display = 'block';
        
        switch(filter) {
            case 'Top Rated':
                if (rating < 4.5) game.style.display = 'none';
                break;
            case 'New Releases':
                // Add logic for new releases if you have release date data
                break;
            case 'Most Played':
                // Add logic for most played if you have play count data
                break;
        }
    });
}

// Initialize countdown timer
function updateCountdown() {
    const countdownElements = document.querySelectorAll('.deals-countdown');
    countdownElements.forEach(element => {
        const endTime = localStorage.getItem('dealsEndTime') || new Date(Date.now() + 48 * 60 * 60 * 1000).getTime();
        
        function update() {
            const now = Date.now();
            const distance = endTime - now;
            
            const hours = Math.floor(distance / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            element.textContent = `Ends in: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (distance < 0) {
                element.textContent = 'Deal Ended';
                return;
            }
            
            requestAnimationFrame(update);
        }
        
        update();
    });
}

// Search functionality
document.querySelector('.search-btn').addEventListener('click', function() {
    const searchInput = document.querySelector('.search-input');
    searchInput.classList.toggle('active');
    if (searchInput.classList.contains('active')) {
        searchInput.focus();
    }
});

// Newsletter subscription
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    alert('Thank you for subscribing with: ' + email);
    this.reset();
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});