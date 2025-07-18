let slideIndex = 1;
let slideTimer;

// Start slideshow
function startSlideshow() {
  showSlides(slideIndex);
  slideTimer = setInterval(() => {
    showSlides(++slideIndex);
  }, 3000); // change image every 3 seconds
}

// Manual next/previous controls
function plusSlides(n) {
  clearInterval(slideTimer);  // Stop current auto-play
  showSlides(slideIndex += n);
  startSlideshow(); // Restart timer
}

// Thumbnail controls
function currentSlide(n) {
  clearInterval(slideTimer);
  showSlides(slideIndex = n);
  startSlideshow();
}

// Core function to show a specific slide
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

// Initialize on page load
window.onload = startSlideshow;
