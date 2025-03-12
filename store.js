const gameList = [
  {
    id: 1,
    title: "Fortnite",
    price: 0,
    image: "fortnite.jpg",
    genre: "action",
    category: ["top", "free"],
  },
  {
    id: 2,
    title: "Rocket League",
    price: 19.99,
    image: "rocket.jpg",
    genre: "sports",
    category: ["top"],
  },
  {
    id: 3,
    title: "Assassin's Creed Valhalla",
    price: 59.99,
    image: "creed.webp",
    genre: "action",
    category: ["new"],
  },
  {
    id: 4,
    title: "Grand Theft Auto V",
    price: 29.99,
    image: "gta.jpg",
    genre: "action",
    category: ["top"],
  },
  {
    id: 5,
    title: "Red Dead Redemption 2",
    price: 59.99,
    image: "red.jpg",
    genre: "adventure",
    category: ["top"],
  },
  {
    id: 6,
    title: "Cyberpunk 2077",
    price: 59.99,
    image: "cyberpunk.webp",
    genre: "rpg",
    category: ["new"],
  },
  {
    id: 7,
    title: "The Witcher 3: Wild Hunt",
    price: 39.99,
    image: "witcher.avif",
    genre: "rpg",
    category: ["special"],
  },
  {
    id: 8,
    title: "Control",
    price: 29.99,
    image: "control.webp",
    genre: "action",
    category: ["special"],
  },
  {
    id: 9,
    title: "Civilization VI",
    price: 59.99,
    image: "vi.jpg",
    genre: "strategy",
    category: ["top"],
  },
  {
    id: 10,
    title: "Stardew Valley",
    price: 14.99,
    image: "valley.png",
    genre: "simulation",
    category: ["special"],
  },
  {
    id: 11,
    title: "Hades",
    price: 24.99,
    image: "hades.jpg",
    genre: "action",
    category: ["new", "top"],
  },
  {
    id: 12,
    title: "Among Us",
    price: 5,
    image: "us.jpg",
    genre: "party",
    category: ["top", "special"],
  },
  {
    id: 13,
    title: "Elden Ring",
    price: 59.99,
    image: "elding.jpg",
    genre: "rpg",
    category: ["coming"],
  },
  {
    id: 14,
    title: "Starfield",
    price: 69.99,
    image: "star.jpg",
    genre: "rpg",
    category: ["coming"],
  },
  {
    id: 15,
    title: "Valorant",
    price: 0,
    image: "valo.jpg",
    genre: "fps",
    category: ["free", "top"],
  },
]

const storeGameGrid = document.getElementById("store-game-grid")
const searchInput = document.getElementById("search-input")
const searchButton = document.getElementById("search-button")
const genreFilter = document.getElementById("genre-filter")
const priceSort = document.getElementById("price-sort")
const optionButtons = document.querySelectorAll(".option-btn")
const sidebarCategories = document.querySelectorAll(".category-list a")
const gameDetailsSection = document.getElementById("game-details")

function createGameCard(game) {
  const libraryGames = JSON.parse(localStorage.getItem("libraryGames")) || []
  const isInLibrary = libraryGames.some((libGame) => libGame.id === game.id)

  const gameCard = document.createElement("div")
  gameCard.classList.add("game-card")
  gameCard.innerHTML = `
    <div class="game-image">
      <img src="${game.image}" alt="${game.title}">
    </div>
    <div class="game-card-info">
      <h3>${game.title}</h3>
      <p>${game.price === 0 ? "Free" : "$" + game.price.toFixed(2)}</p>
    </div>
    <div class="game-actions">
      <a href="store.html?id=${game.id}" class="btn btn-secondary view-details">View Details</a>
      ${
        isInLibrary
          ? '<button class="btn btn-secondary" disabled>In Library</button>'
          : `<button class="btn btn-primary add-to-cart" data-id="${game.id}">Add to Cart</button>`
      }
    </div>
  `
  return gameCard
}

function displayGameDetails(gameId) {
  const game = gameList.find((g) => g.id === Number.parseInt(gameId))
  if (!game) return

  gameDetailsSection.innerHTML = `
    <div class="game-details-content">
      <img src="${game.image}" alt="${game.title}" class="game-details-image">
      <div class="game-details-info">
        <h2>${game.title}</h2>
        <p>Genre: ${game.genre}</p>
        <p>Price: ${game.price === 0 ? "Free" : "$" + game.price.toFixed(2)}</p>
        <p>Categories: ${game.category.join(", ")}</p>
        ${game.price !== 0 ? `<button class="btn btn-primary add-to-cart" data-id="${game.id}">Add to Cart</button>` : ""}
        <a href="store.html" class="btn btn-secondary">Back to Store</a>
      </div>
    </div>
  `
  gameDetailsSection.style.display = "block"
  storeGameGrid.style.display = "none"
}

function displayGames(games) {
  storeGameGrid.innerHTML = ""
  games.forEach((game) => {
    const gameCard = createGameCard(game)
    storeGameGrid.appendChild(gameCard)
  })
  updateAddToCartButtons()
}

function filterGames() {
  const searchTerm = searchInput.value.toLowerCase()
  const selectedGenre = genreFilter.value
  const selectedCategory = document.querySelector(".option-btn.active")?.dataset.category || "all"

  const filteredGames = gameList.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm)
    const matchesGenre = selectedGenre === "" || game.genre === selectedGenre
    const matchesCategory = selectedCategory === "all" || game.category.includes(selectedCategory)
    return matchesSearch && matchesGenre && matchesCategory
  })

  const sortOrder = priceSort.value
  filteredGames.sort((a, b) => {
    if (sortOrder === "low-to-high") {
      return a.price - b.price
    } else {
      return b.price - a.price
    }
  })

  displayGames(filteredGames)
}

function setActiveCategory(category) {
  optionButtons.forEach((button) => {
    if (button.dataset.category === category) {
      button.classList.add("active")
    } else {
      button.classList.remove("active")
    }
  })

  sidebarCategories.forEach((link) => {
    if (link.dataset.category === category) {
      link.classList.add("active")
    } else {
      link.classList.remove("active")
    }
  })
}

function displayMessage(message, type = "info") {
  const messageContainer = document.createElement("div")
  messageContainer.className = `message ${type}`
  messageContainer.textContent = message

  document.body.appendChild(messageContainer)

  setTimeout(() => {
    messageContainer.classList.add("show")
  }, 10)

  setTimeout(() => {
    messageContainer.classList.remove("show")
    setTimeout(() => {
      document.body.removeChild(messageContainer)
    }, 300)
  }, 3000)
}

function addToCart(gameId) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
  if (!isLoggedIn) {
    window.location.href = "sign.html"
    return
  }

  const libraryGames = JSON.parse(localStorage.getItem("libraryGames")) || []
  if (libraryGames.some((game) => game.id === gameId)) {
    displayMessage("You already own this game!", "warning")
    return
  }

  const game = gameList.find((g) => g.id === gameId)
  if (game) {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []
    if (!cartItems.some((item) => item.id === game.id)) {
      cartItems.push(game)
      localStorage.setItem("cartItems", JSON.stringify(cartItems))
      updateCartCount()
      updateAddToCartButtons()
      displayMessage("Game added to cart!", "success")
    } else {
      displayMessage("This game is already in your cart.", "info")
    }
  }
}

function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []
  const cartCount = document.getElementById("cart-count")
  cartCount.textContent = cartItems.length
}

function updateAddToCartButtons() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []
  const libraryGames = JSON.parse(localStorage.getItem("libraryGames")) || []
  const addToCartButtons = document.querySelectorAll(".add-to-cart")
  addToCartButtons.forEach((button) => {
    const gameId = Number(button.dataset.id)
    if (cartItems.some((item) => item.id === gameId) || libraryGames.some((game) => game.id === gameId)) {
      button.textContent = cartItems.some((item) => item.id === gameId) ? "In Cart" : "In Library"
      button.disabled = true
    } else {
      button.textContent = "Add to Cart"
      button.disabled = false
    }
  })
}

function init() {
  const urlParams = new URLSearchParams(window.location.search)
  const gameId = urlParams.get("id")

  if (gameId) {
    displayGameDetails(gameId)
  } else {
    displayGames(gameList)
  }

  updateCartCount()

  searchButton.addEventListener("click", filterGames)
  searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      filterGames()
    }
  })

  genreFilter.addEventListener("change", filterGames)
  priceSort.addEventListener("change", filterGames)

  optionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category
      setActiveCategory(category)
      filterGames()
    })
  })

  sidebarCategories.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const category = link.dataset.category
      setActiveCategory(category)
      filterGames()
    })
  })

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
      const gameId = Number(e.target.dataset.id)
      addToCart(gameId)
    }
  })

  const cartIcon = document.getElementById("cart-icon")
  cartIcon.addEventListener("click", () => {
    window.location.href = "cart.html"
  })
}

document.addEventListener("DOMContentLoaded", () => {
  updateHeaderAuth()
  init()
})

function updateHeaderAuth() {
  // Implementation for updating header authentication status
  console.log("Header auth updated")
}

