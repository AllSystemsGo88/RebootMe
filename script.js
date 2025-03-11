let points = 0;
let totalPointsEarned = 0; // Track total points earned
let level = 1;
let avatarItems = {
  hat: false,
  shirt: false,
  pants: false,
};

// Show the selected page
function showPage(pageId) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.classList.remove('active'));

  document.getElementById(pageId).classList.add('active');
}

// Simulate inactivity and add points
function simulateInactivity() {
  points += 10; // Add 10 points to current points
  totalPointsEarned += 10; // Add 10 points to total points earned
  updatePoints();
}

// Update points and level display
function updatePoints() {
  const pointsElement = document.getElementById('points');
  pointsElement.textContent = points;

  // Update level based on total points earned
  const newLevel = Math.floor(totalPointsEarned / 50) + 1;
  if (newLevel !== level) {
    level = newLevel;
    document.getElementById('level').textContent = level;
  }

  // Show crown if points exceed a threshold
  const crownElement = document.getElementById('crown');
  if (points >= 50) {
    crownElement.style.display = 'block';
  } else {
    crownElement.style.display = 'none';
  }
}

// Show a styled modal with a custom message
function showModal(message) {
  const modal = document.getElementById('response-modal');
  const modalMessage = document.getElementById('modal-message');

  // Set the message and display the modal
  modalMessage.textContent = message;
  modal.style.display = 'flex';

  // Hide the modal after 3 seconds
  setTimeout(() => {
    modal.style.display = 'none';
  }, 3000);
}

// Redeem coupon
function redeemCoupon(cost) {
  if (points >= cost) {
    points -= cost; // Deduct points for redeeming
    updatePoints();
    showModal('You have redeemed the coupon!');
  } else {
    showModal('Not enough points to redeem this coupon.');
  }
}

// Buy an item in the shop
function buyItem(item, cost) {
  if (points >= cost) {
    points -= cost;
    avatarItems[item] = true;
    updatePoints();
    updateAvatar();
    showModal(`You bought a ${item}!`);
  } else {
    showModal('Not enough points to buy this item.');
  }
}

// Update the avatar based on purchased items
function updateAvatar() {
  const avatarImage = document.getElementById('avatar-image');
  let avatarSrc = 'https://via.placeholder.com/150';

  if (avatarItems.hat) avatarSrc = 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Hat';
  if (avatarItems.shirt) avatarSrc = 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Shirt';
  if (avatarItems.pants) avatarSrc = 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Pants';

  avatarImage.src = avatarSrc;
}

// Share on social media
function shareOnSocialMedia() {
  showModal('Shared on Instagram/Facebook!');
}

// Initialize the app
showPage('main');