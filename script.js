// Get references to DOM elements
const button = document.getElementById("change-text-btn");
const dynamicText = document.getElementById("dynamic-text");

// Array of text options
// Update text options for the homepage
const textOptions = [
  "Learn about dengue prevention and care to protect yourself and your community.",
  "Dengue fever is transmitted by Aedes mosquitoes, which typically bite during the day.",
  "Early detection and proper medical care can significantly reduce fatality rates.",
  "Use mosquito repellents, wear long sleeves, and eliminate standing water to prevent dengue.",
  "ASEAN countries account for a significant portion of global dengue cases each year.",
];

// Track current text index
let currentTextIndex = 0;

// Add click event listener to button
button.addEventListener("click", function () {
  // Change the text content
  currentTextIndex = (currentTextIndex + 1) % textOptions.length;

  // Fade out effect
  dynamicText.style.opacity = 0;

  // Change text and fade in after a short delay
  setTimeout(function () {
    dynamicText.textContent = textOptions[currentTextIndex];
    dynamicText.style.opacity = 1;
  }, 300);
});

// Add transition for smooth fade effect
dynamicText.style.transition = "opacity 0.3s ease";

// Add card hover effects
document.addEventListener('DOMContentLoaded', function() {
  // Get all cards
  const cards = document.querySelectorAll('.card');
  
  // Add event listeners for each card
  cards.forEach(card => {
    // Add subtle animation on hover
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
      this.style.boxShadow = '0 12px 20px rgba(0, 0, 0, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    });
    
    // Add click effect for mobile users
    card.addEventListener('click', function() {
      this.classList.toggle('card-expanded');
    });
  });
});
