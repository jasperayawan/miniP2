// Set the interval for the carousel to slide automatically
var interval = 5000; // in milliseconds

// Get the carousel element
var carousel = document.querySelector('#myCarousel');

// Get the carousel items
var items = carousel.querySelectorAll('.carousel-item');

// Set the current slide to the first item
var currentSlide = 0;

// Start the carousel
var slideInterval = setInterval(nextSlide, interval);

// Function to move to the next slide
function nextSlide() {
  // Hide the current slide
  items[currentSlide].classList.remove('active');
  // Move to the next slide
  currentSlide = (currentSlide + 1) % items.length;
  // Show the next slide
  items[currentSlide].classList.add('active');
}




function toggleBtn(){
    let displayHandling = document.getElementById('profile_List')

    if(displayHandling.style.display === 'block'){
        displayHandling.classList.add('toggle_kist')
    } else{
        displayHandling.style.display = 'block'
        displayHandling.style.width = '200px'
    }
    closeButton()
}

function closeButton(){
    const btnCloseHandling = document.getElementById('btn-close')

    btnCloseHandling.addEventListener('click', () => {
    let btnclose = document.getElementById('profile_List')
    btnclose.style.display = 'none'
    })
}

var prevScrollpos = window.pageYOffset;

window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.querySelector("header").style.top = "0";
  } else {
     document.querySelector("header").style.top = "-7.2rem";
  }
  prevScrollpos = currentScrollPos;
}