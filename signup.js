const signupForm = document.getElementById("signup-form")

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

signupForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const username = document.getElementById("username").value
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  // Simple validation
  if (!username || !email || !password) {
    displayMessage("Please fill in all fields", "error")
    return
  }

  // Check if user already exists
  const users = JSON.parse(localStorage.getItem("users")) || []
  if (users.some((user) => user.email === email)) {
    displayMessage("User with this email already exists", "warning")
    return
  }

  // Add new user
  users.push({ username, email, password })
  localStorage.setItem("users", JSON.stringify(users))

  // Set logged in state
  localStorage.setItem("isLoggedIn", "true")
  localStorage.setItem("currentUser", JSON.stringify({ username, email }))

  displayMessage("Sign up successful!", "success")

  // Redirect to the previous page or home if no previous page
  setTimeout(() => {
    const previousPage = document.referrer || "index.html"
    window.location.href = previousPage
  }, 1500)
})

// Dummy function to avoid error. In a real project, this would be defined elsewhere or imported.
function updateHeaderAuth() {
  // Implementation would go here
}

document.addEventListener("DOMContentLoaded", updateHeaderAuth)

