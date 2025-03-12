const signinForm = document.getElementById("signin-form")

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

signinForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  // Simple validation
  if (!email || !password) {
    displayMessage("Please fill in all fields", "error")
    return
  }

  // Check if user exists and password is correct
  const users = JSON.parse(localStorage.getItem("users")) || []
  const user = users.find((u) => u.email === email && u.password === password)

  if (user) {
    // Set logged in state
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("currentUser", JSON.stringify({ username: user.username, email: user.email }))

    displayMessage("Sign in successful!", "success")

    // Redirect to the previous page or home if no previous page
    setTimeout(() => {
      const previousPage = document.referrer || "index.html"
      window.location.href = previousPage
    }, 1500)
  } else {
    displayMessage("Invalid email or password", "error")
  }
})

// Assume updateHeaderAuth is defined elsewhere or imported
function updateHeaderAuth() {
  // Implementation for updating header authentication state
  // This is a placeholder, replace with actual logic
  console.log("Updating header authentication state")
}

document.addEventListener("DOMContentLoaded", updateHeaderAuth)

