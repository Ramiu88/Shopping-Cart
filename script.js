document.querySelector('.search-btn').addEventListener('click', function() {
  const searchInput = document.querySelector('.search-input');
  searchInput.classList.toggle('active');
  if (searchInput.classList.contains('active')) {
      searchInput.focus();
  }
});

// Shopping cart functionality
const cart = [];
const cartModal = document.getElementById('cart-modal');
const cartBtn = document.querySelector('.cart-btn');
const closeBtn = document.querySelector('.close');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');


// Cart modal controls
cartBtn.addEventListener('click', () => cartModal.style.display = 'block');
closeBtn.addEventListener('click', () => cartModal.style.display = 'none');
window.addEventListener('click', (e) => {
  if (e.target === cartModal) cartModal.style.display = 'none';
});

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', (e) => {
      const card = e.target.closest('.game-card');
      const gameId = card.dataset.id;
      const price = parseFloat(card.dataset.price);
      const title = card.querySelector('h3').textContent;
      
      addToCart({ id: gameId, title, price });
      updateCartDisplay();
      
      // Show feedback animation
      button.textContent = 'Added!';
      button.classList.add('added');
      setTimeout(() => {
          button.textContent = 'Add to Cart';
          button.classList.remove('added');
      }, 2000);
  });
});

function addToCart(item) {
  const existingItem = cart.find(i => i.id === item.id);
  if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
      cart.push({ ...item, quantity: 1 });
  }
}

function updateCartDisplay() {
  cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
          <span>${item.title}</span>
          <span>x${item.quantity}</span>
          <span>$${(item.price * item.quantity).toFixed(2)}</span>
          <button onclick="removeFromCart('${item.id}')">&times;</button>
      </div>
  `).join('');
  
  cartTotal.textContent = cart.reduce((total, item) => 
      total + (item.price * item.quantity), 0).toFixed(2);
}

function removeFromCart(id) {
  const index = cart.findIndex(item => item.id === id);
  if (index > -1) {
      cart.splice(index, 1);
      updateCartDisplay();
  }
}

// Add smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

// Newsletter subscription
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = this.querySelector('input[type="email"]').value;
  alert('Thank you for subscribing with: ' + email);
  this.reset();
});

// Countdown timer for deals
function updateCountdown() {
  const countdownElements = document.querySelectorAll('.countdown');
  countdownElements.forEach(element => {
      let time = element.innerHTML.split(': ')[1].split(':');
      let hours = parseInt(time[0]);
      let minutes = parseInt(time[1]);
      let seconds = parseInt(time[2]);
      
      seconds--;
      if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
              minutes = 59;
              hours--;
              if (hours < 0) {
                  element.innerHTML = "Deal Ended!";
                  return;
              }
          }
      }
      
      element.innerHTML = `Ends in: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  });
}

setInterval(updateCountdown, 1000);