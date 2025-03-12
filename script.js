const gameList = [
  {
    id: 1,
    title: "Fortnite",
    price: 0,
    image: "fortnite.jpg",
    featured: true,
    category: ["top", "special", "free"],
  },
  {
    id: 2,
    title: "Rocket League",
    price: 19.99,
    image: "rocket.jpg",
    featured: true,
    category: ["top"],
  },
  {
    id: 3,
    title: "Assassin's Creed Valhalla",
    price: 59.99,
    image: "creed.webp",
    featured: true,
    category: ["new"],
  },
  {
    id: 4,
    title: "Grand Theft Auto V",
    price: 29.99,
    image: "gta.jpg",
    category: ["top"],
  },
  {
    id: 5,
    title: "Red Dead Redemption 2",
    price: 59.99,
    image: "red.jpg",
    category: ["top"],
  },
  { id: 6, title: "Cyberpunk 2077", price: 59.99, image: "cyberpunk.webp", category: ["new"] },
  {
    id: 7,
    title: "The Witcher 3: Wild Hunt",
    price: 39.99,
    image: "witcher.avif",
    category: ["special"],
  },
  { id: 8, title: "Control", price: 29.99, image: "control.webp", category: ["special"] },
  { id: 9, title: "Elden Ring", price: 59.99, image: "elding.jpg", category: ["coming"] },
  { id: 10, title: "Starfield", price: 69.99, image: "star.jpg", category: ["coming"] },
]

const gameGrid = document.querySelector(".game-grid")
const searchInput = document.getElementById("search-input")
const searchButton = document.getElementById("search-button")
const carousel = document.getElementById("featured-games")
const seeMoreBtn = document.getElementById("see-more-btn")
const categoryButtons = document.querySelectorAll(".option-btn")
const sidebarCategories = document.querySelectorAll(".category-list a")

function createGameCard(game) {
  const gameCard = document.createElement("div")
  gameCard.classList.add("game-card", "fade-in")
  gameCard.innerHTML = `
    <div class="game-image" data-id="${game.id}">
      <img src="${game.image}" alt="${game.title}">
    </div>
    <div class="game-card-info">
      <h3>${game.title}</h3>
      <p>${game.price === 0 ? "Free" : "$" + game.price.toFixed(2)}</p>
    </div>
    <div class="game-card-actions">
      <button class="btn btn-primary btn-small view-details" data-id="${game.id}">View Details</button>
    </div>
  `
  return gameCard
}

function displayGames(games) {
  gameGrid.innerHTML = ""
  games.forEach((game) => {
    const gameCard = createGameCard(game)
    gameGrid.appendChild(gameCard)
  })
}

function createCarouselItem(game) {
  const carouselItem = document.createElement("div")
  carouselItem.classList.add("carousel-item")
  carouselItem.innerHTML = `
    <img src="${game.image}" alt="${game.title}" data-id="${game.id}">
    <div class="carousel-item-content">
      <h2>${game.title}</h2>
      <p>${game.price === 0 ? "Free" : "$" + game.price.toFixed(2)}</p>
      <button class="btn btn-primary view-details" data-id="${game.id}">View Details</button>
    </div>
  `
  return carouselItem
}

function setupCarousel() {
  const featuredGames = gameList.filter((game) => game.featured)
  featuredGames.forEach((game, index) => {
    const carouselItem = createCarouselItem(game)
    if (index === 0) carouselItem.classList.add("active")
    carousel.appendChild(carouselItem)
  })

  let currentSlide = 0
  const slides = carousel.querySelectorAll(".carousel-item")

  setInterval(() => {
    slides[currentSlide].classList.remove("active")
    currentSlide = (currentSlide + 1) % slides.length
    slides[currentSlide].classList.add("active")
  }, 5000)
}

function filterGamesByCategory(category) {
  const filteredGames = category === "all" ? gameList : gameList.filter((game) => game.category.includes(category))
  displayGames(filteredGames)
}

function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []
  const cartCount = document.getElementById("cart-count")
  if (cartCount) {
    cartCount.textContent = cartItems.length
  }
}

function viewDetails(gameId) {
  window.location.href = `store.html?id=${gameId}`
}

function searchGames() {
  const searchTerm = searchInput.value.toLowerCase()
  const filteredGames = gameList.filter((game) => game.title.toLowerCase().includes(searchTerm))
  displayGames(filteredGames)
}

function animateOnScroll() {
  const elements = document.querySelectorAll(".fade-in, .slide-in")
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    { threshold: 0.1 },
  )

  elements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"
    element.style.transition = "opacity 0.5s ease-in-out, transform 0.5s ease-in-out"
    observer.observe(element)
  })
}

searchButton.addEventListener("click", searchGames)
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    searchGames()
  }
})

seeMoreBtn.addEventListener("click", () => {
  window.location.href = "store.html"
})

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.category
    filterGamesByCategory(category)
  })
})

sidebarCategories.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const category = link.dataset.category
    filterGamesByCategory(category)
  })
})

gameGrid.addEventListener("click", (e) => {
  const target = e.target
  const gameId = Number.parseInt(target.closest("[data-id]").dataset.id)

  if (target.classList.contains("view-details") || target.closest(".game-image")) {
    viewDetails(gameId)
  }
})

carousel.addEventListener("click", (e) => {
  const target = e.target
  const gameId = Number.parseInt(target.closest("[data-id]").dataset.id)

  if (target.classList.contains("view-details")) {
    viewDetails(gameId)
  }
})

function init() {
  displayGames(gameList)
  setupCarousel()
  updateCartCount()
  animateOnScroll()
}

document.addEventListener("DOMContentLoaded", init)

