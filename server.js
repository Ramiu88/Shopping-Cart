<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BGames Store - Shopping Cart</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="container">
        <nav class="sidebar">
            <div class="logo">
                <img src="/placeholder.svg?height=40&width=40" alt="Logo">
            </div>
            <ul>
                <li><a href="index.html"><i class="fas fa-home"></i> Home</a></li>
                <li><a href="store.html"><i class="fas fa-store"></i> Store</a></li>
                <li><a href="library.html"><i class="fas fa-book"></i> Library</a></li>
                <li><a href="friends.html"><i class="fas fa-users"></i> Friends</a></li>
            </ul>
            <div class="user-profile">
                <img src="/placeholder.svg?height=32&width=32" alt="User Avatar">
                <span>Username</span>
            </div>
        </nav>
        <main>
            <header>
                <div class="search-bar">
                    <input type="text" id="search-input" placeholder="Search games...">
                    <button id="search-button"><i class="fas fa-search"></i></button>
                </div>
                <div class="header-actions">
                    <button id="signup-btn" class="btn">Sign Up</button>
                    <div id="cart-icon" class="cart-icon">
                        <i class="fas fa-shopping-cart"></i>
                        <span id="cart-count" class="cart-count">0</span>
                    </div>
                </div>
            </header>
            <section id="cart-content">
                <h1>Shopping Cart</h1>
                <div id="cart-items">
                    <!-- Cart items will be dynamically added here -->
                </div>
                <div id="cart-summary">
                    <p>Total: $<span id="cart-total">0.00</span></p>
                    <button id="checkout-btn" class="btn">Proceed to Checkout</button>
                </div>
            </section>
        </main>
    </div>
    <footer>
        <div class="footer-content">
            <p>&copy; 2021 BGames  </p>
            <div class="social-icons">
                <a href="#"><i class="fab fa-facebook"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
            </div>
        </div>
    </footer>
    <script src="cart.js"></script>
</body>
</html>

