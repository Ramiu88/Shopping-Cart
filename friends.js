// Check authentication at the beginning of the file
if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "sign.html"
}

const friendsList = [
  { id: 1, name: "griff", status: "Online", avatar: "/placeholder.svg?height=50&width=50" },
  { id: 2, name: "marQos", status: "Offline", avatar: "/placeholder.svg?height=50&width=50" },
  { id: 3, name: "anakin", status: "In-Game", avatar: "/placeholder.svg?height=50&width=50" },
  { id: 4, name: "utsuroxo", status: "Away", avatar: "/placeholder.svg?height=50&width=50" },
]

const friendsListElement = document.getElementById("friends-list")
const searchInput = document.getElementById("search-input")
const searchButton = document.getElementById("search-button")

function createFriendCard(friend) {
  const friendCard = document.createElement("div")
  friendCard.classList.add("friend-card")
  friendCard.innerHTML = `
    <img src="${friend.avatar}" alt="${friend.name}" class="friend-avatar">
    <div class="friend-info">
      <h3>${friend.name}</h3>
      <p class="friend-status ${friend.status.toLowerCase()}">${friend.status}</p>
    </div>
    <button class="friend-action-btn">
      ${friend.status === "Online" ? "Invite" : "Message"}
    </button>
  `
  return friendCard
}

function displayFriends(friends) {
  friendsListElement.innerHTML = ""
  friends.forEach((friend) => {
    const friendCard = createFriendCard(friend)
    friendsListElement.appendChild(friendCard)
  })
}

function searchFriends() {
  const searchTerm = searchInput.value.toLowerCase()
  const filteredFriends = friendsList.filter((friend) => friend.name.toLowerCase().includes(searchTerm))
  displayFriends(filteredFriends)
}

searchButton.addEventListener("click", searchFriends)
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    searchFriends()
  }
})

// Assume updateHeaderAuth is defined elsewhere or is meant to be imported.
// For now, let's define it as an empty function to avoid errors.
function updateHeaderAuth() {
  // Implementation or import should be here.
  console.log("updateHeaderAuth called")
}

document.addEventListener("DOMContentLoaded", () => {
  updateHeaderAuth()
  displayFriends(friendsList)
})

