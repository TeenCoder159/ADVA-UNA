// Get references to DOM elements
const button = document.getElementById("change-text-btn");
const dynamicText = document.getElementById("dynamic-text");

// Array of text options
const textOptions = [
  "JavaScript makes this webpage interactive!",
  "Static webpages can still be dynamic with JavaScript.",
  "Thanks for clicking the button!",
  "Web development is fun and creative.",
  "HTML structures, CSS styles, and JavaScript adds behavior.",
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
