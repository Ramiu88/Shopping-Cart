// Check authentication at the beginning of the file
if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "sign.html"
}

const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []
const cartItemsContainer = document.getElementById("cart-items")
const cartTotalElement = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")

function updateCartDisplay() {
  cartItemsContainer.innerHTML = ""
  let total = 0

  cartItems.forEach((item, index) => {
    const cartItemElement = document.createElement("div")
    cartItemElement.classList.add("cart-item")
    cartItemElement.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="cart-item-image">
      <div class="cart-item-details">
        <h3>${item.title}</h3>
        <p>$${item.price.toFixed(2)}</p>
      </div>
      <button class="remove-item-btn" data-index="${index}">Remove</button>
    `
    cartItemsContainer.appendChild(cartItemElement)
    total += item.price
  })

  cartTotalElement.textContent = total.toFixed(2)
  updateCartCount()
}

function removeFromCart(index) {
  cartItems.splice(index, 1)
  localStorage.setItem("cartItems", JSON.stringify(cartItems))
  updateCartDisplay()
}

cartItemsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-item-btn")) {
    const index = Number(e.target.dataset.index)
    removeFromCart(index)
  }
})

checkoutBtn.addEventListener("click", () => {
  // Add games to library
  const libraryGames = JSON.parse(localStorage.getItem("libraryGames")) || []
  cartItems.forEach((game) => {
    if (!libraryGames.some((libGame) => libGame.id === game.id)) {
      libraryGames.push({ ...game, installed: false })
    }
  })
  localStorage.setItem("libraryGames", JSON.stringify(libraryGames))

  // Clear the cart
  localStorage.removeItem("cartItems")

  // Update the display
  updateCartDisplay()

  // Show confirmation message
  alert("Checkout complete! Games have been added to your library.")

  // Redirect to library page
  window.location.href = "library.html"
})

function updateCartCount() {
  const cartCount = document.getElementById("cart-count")
  if (cartCount) {
    cartCount.textContent = cartItems.length
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateHeaderAuth()
  updateCartDisplay()
})

// Dummy function to avoid error. In a real project, this would be defined elsewhere or imported.
function updateHeaderAuth() {
  console.log("updateHeaderAuth function called")
}

