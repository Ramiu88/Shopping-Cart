function updateHeaderAuth() {
  const headerActions = document.querySelector(".header-actions")
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  if (isLoggedIn && currentUser) {
    headerActions.innerHTML = `
      <span class="username">Welcome, ${currentUser.username}</span>
      <button id="logout-btn" class="btn">Log Out</button>
      <div id="cart-icon" class="cart-icon">
        <i class="fas fa-shopping-cart"></i>
        <span id="cart-count" class="cart-count">0</span>
      </div>
    `

    const logoutBtn = document.getElementById("logout-btn")
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn")
      localStorage.removeItem("currentUser")
      localStorage.removeItem("cartItems")
      window.location.href = "index.html"
    })
  } else {
    headerActions.innerHTML = `
      <button id="signin-btn" class="btn">Sign In</button>
      <button id="signup-btn" class="btn">Sign Up</button>
      <div id="cart-icon" class="cart-icon">
        <i class="fas fa-shopping-cart"></i>
        <span id="cart-count" class="cart-count">0</span>
      </div>
    `

    const signinBtn = document.getElementById("signin-btn")
    const signupBtn = document.getElementById("signup-btn")

    signinBtn.addEventListener("click", () => {
      window.location.href = "sign.html"
    })

    signupBtn.addEventListener("click", () => {
      window.location.href = "signup.html"
    })
  }

  const cartIcon = document.getElementById("cart-icon")
  cartIcon.addEventListener("click", () => {
    window.location.href = "cart.html"
  })

  updateCartCount()
}

function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []
  const cartCount = document.getElementById("cart-count")
  cartCount.textContent = cartItems.length
}

function checkAuth() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
  if (!isLoggedIn) {
    window.location.href = "sign.html"
  }
}

document.addEventListener("DOMContentLoaded", updateHeaderAuth)

// Check if we're on a page that requires authentication
const authRequiredPages = ["library.html", "cart.html", "friends.html"]
const currentPage = window.location.pathname.split("/").pop()
if (authRequiredPages.includes(currentPage)) {
  checkAuth()
}

