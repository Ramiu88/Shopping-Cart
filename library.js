// Check authentication at the beginning of the file
if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "sign.html"
}

const libraryGames = JSON.parse(localStorage.getItem("libraryGames")) || []
const libraryGameGrid = document.getElementById("library-game-grid")
const searchInput = document.getElementById("search-input")
const searchButton = document.getElementById("search-button")
const totalGamesSpan = document.getElementById("total-games")
const installedGamesSpan = document.getElementById("installed-games")

function createGameCard(game) {
  const gameCard = document.createElement("div")
  gameCard.classList.add("game-card")
  gameCard.innerHTML = `
    <img src="${game.image}" alt="${game.title}">
    <div class="game-card-info">
      <h3>${game.title}</h3>
    </div>
    <div class="game-actions">
      ${
        game.installed
          ? '<span class="installed">Installed</span><button class="btn btn-primary">Play</button>'
          : `<button class="btn btn-secondary install-btn" data-id="${game.id}">Install</button>`
      }
    </div>
  `
  return gameCard
}

function displayGames(games) {
  libraryGameGrid.innerHTML = ""
  games.forEach((game) => {
    const gameCard = createGameCard(game)
    libraryGameGrid.appendChild(gameCard)
  })
}

function updateLibraryStats() {
  totalGamesSpan.textContent = libraryGames.length
  installedGamesSpan.textContent = libraryGames.filter((game) => game.installed).length
}

function searchGames() {
  const searchTerm = searchInput.value.toLowerCase()
  const filteredGames = libraryGames.filter((game) => game.title.toLowerCase().includes(searchTerm))
  displayGames(filteredGames)
}

searchButton.addEventListener("click", searchGames)
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    searchGames()
  }
})

libraryGameGrid.addEventListener("click", (e) => {
  if (e.target.classList.contains("install-btn")) {
    const gameId = Number(e.target.dataset.id)
    const gameIndex = libraryGames.findIndex((g) => g.id === gameId)
    if (gameIndex !== -1) {
      libraryGames[gameIndex].installed = true
      localStorage.setItem("libraryGames", JSON.stringify(libraryGames))
      displayGames(libraryGames)
      updateLibraryStats()
    }
  }
})

displayGames(libraryGames)
updateLibraryStats()

// Dummy function to avoid error. Replace with actual implementation or import.
function updateHeaderAuth() {
  console.log("updateHeaderAuth function called")
}

document.addEventListener("DOMContentLoaded", updateHeaderAuth)

