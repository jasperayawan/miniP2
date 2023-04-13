const imageWrapper = document.querySelector('.image-wrapper')
const imageItems = document.querySelectorAll('.image-wrapper > *')
const imageLength = imageItems.length
const perView = 3
let totalScroll = 0
const delay = 3000

imageWrapper.style.setProperty('--per-view', perView)
for(let i = 0; i < perView; i++) {
  imageWrapper.insertAdjacentHTML('beforeend', imageItems[i].outerHTML)
}

let autoScroll = setInterval(scrolling, delay)

function scrolling() {
  totalScroll++
  if(totalScroll == imageLength + 1) {
    clearInterval(autoScroll)
    totalScroll = 1
    imageWrapper.style.transition = '0s'
    imageWrapper.style.left = '0'
    autoScroll = setInterval(scrolling, delay)
  }
  const widthEl = document.querySelector('.image-wrapper > :first-child').offsetWidth + 24
  imageWrapper.style.left = `-${totalScroll * widthEl}px`
  imageWrapper.style.transition = '2s'
}

function toggleBtn(){
  let displayHandling = document.getElementById('profile_List')
  
  if(displayHandling.style.display === 'flex'){
      displayHandling.style.display = 'none'
  } else{
      displayHandling.style.display = 'flex'
  }
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

const form = document.querySelector('.newsLetterForm');
const emailInput = form.querySelector('input[type="email"]');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = emailInput.value;
  localStorage.setItem('newsletterEmail', email);
  emailInput.value = '';
  alert('You are now subscribed to our newsletter!');
});
