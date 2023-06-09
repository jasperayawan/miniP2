const cardWrapper = document.querySelector('.card-wrapper')
const cardWrapperChildren = Array.from(cardWrapper.children)
const widthToScroll = cardWrapper.children[0].offsetWidth
const arrowPrev = document.querySelector('.arrow.prev')
const arrowNext = document.querySelector('.arrow.next')
const cardBounding = cardWrapper.getBoundingClientRect()
const column = Math.floor(cardWrapper.offsetWidth / (widthToScroll + 24))
let currScroll = 0
let initPos = 0
let clicked = false

cardWrapperChildren.slice(-column).reverse().forEach(item=> {
  cardWrapper.insertAdjacentHTML('afterbegin', item.outerHTML)
})

cardWrapperChildren.slice(0, column).forEach(item=> {
  cardWrapper.insertAdjacentHTML('beforeend', item.outerHTML)
})

const cardImageAndLink = cardWrapper.querySelectorAll('img, a')
cardImageAndLink.forEach(item=> {
  item.setAttribute('draggable', false)
})

cardWrapper.classList.add('no-smooth')
cardWrapper.scrollLeft = cardWrapper.offsetWidth
cardWrapper.classList.remove('no-smooth')

arrowPrev.onclick = function() {
  cardWrapper.scrollLeft -= widthToScroll
}

arrowNext.onclick = function() {
  cardWrapper.scrollLeft += widthToScroll
}

cardWrapper.onmousedown = function(e) {
  cardWrapper.classList.add('grab')
  initPos = e.clientX - cardBounding.left
  currScroll = cardWrapper.scrollLeft
  clicked = true
}

cardWrapper.onmousemove = function(e) {
  if(clicked) {
    const xPos = e.clientX - cardBounding.left
    cardWrapper.scrollLeft = currScroll + -(xPos - initPos)
  }
}

cardWrapper.onmouseup = mouseUpAndLeave
cardWrapper.onmouseleave = mouseUpAndLeave

function mouseUpAndLeave() {
  cardWrapper.classList.remove('grab')
  clicked = false
}

let autoScroll

cardWrapper.onscroll = function() {
  if(cardWrapper.scrollLeft === 0) {
    cardWrapper.classList.add('no-smooth')
    cardWrapper.scrollLeft = cardWrapper.scrollWidth - (2 * cardWrapper.offsetWidth)
    cardWrapper.classList.remove('no-smooth')
  } else if(cardWrapper.scrollLeft === cardWrapper.scrollWidth - cardWrapper.offsetWidth) {
    cardWrapper.classList.add('no-smooth')
    cardWrapper.scrollLeft = cardWrapper.offsetWidth
    cardWrapper.classList.remove('no-smooth')
  }

  if(autoScroll) {
    clearTimeout(autoScroll)
  }

  autoScroll = setTimeout(()=> {
    cardWrapper.classList.remove('no-smooth')
    cardWrapper.scrollLeft += widthToScroll
  }, 4000)
}

function goToPage(url) {
  window.location.href = url;
}


//profile dropdown

// const profileHeader = document.getElementById('profile')

// profileHeader.addEventListener('click', function() {
//     let displayHandling = document.getElementById('signLogin')
    
//     if(displayHandling.style.display === 'none'){
//         displayHandling.style.display = 'block'
//     } else{
//         displayHandling.style.display = 'none'
//     }
// })

function toggleBtn(){
    let displayHandling = document.getElementById('profile_List')
    
    if(displayHandling.style.display === 'flex'){
        displayHandling.style.display = 'none'
    } else{
        displayHandling.style.display = 'flex'
    }
}

const form = document.querySelector('form[name="submit-to-google-sheet"]');
const inputs = form.querySelectorAll('input, textarea');

//const refNumber = localStorage.getItem('refNumber');
//if (refNumber) {
 // const message = `Your previous registration reference number is ${refNumber}.`;
 // alert(message);
// }

// Save data to local storage on form submission
form.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent default form submission

  const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
  const submission = {};
  for (const input of inputs) {
    submission[input.name] = input.value;
    localStorage.setItem(input.name, input.value);
    input.value = ''; // clear input field
  }
  submission.timestamp = Date.now();

  // Generate and add reference number to submission object
  const refNumber = Math.floor(Math.random() * 1000000); // generate random 6-digit number
  submission.referenceNumber = refNumber;

  submissions.push(submission);
  localStorage.setItem('submissions', JSON.stringify(submissions));

  // Generate and display application reference number
  const message = `Your registration has been submitted. Your registration reference number is ${refNumber}. We will contact you within 24-48 hours.`;
  alert(message);

  form.reset(); // clear the form
});

// Clear old submissions from local storage after 48 hours
const CLEAR_TIMEOUT = 48 * 60 * 60 * 1000; // 48 hours in milliseconds
let lastInteractionTime = Date.now();

function clearLocalStorage() {
  localStorage.removeItem('submissions');
  for (const input of inputs) {
    localStorage.removeItem(input.name);
  }
}

function resetInteractionTime() {
  lastInteractionTime = Date.now();
}

function checkInteractionTimeout() {
  const elapsedTime = Date.now() - lastInteractionTime;
  if (elapsedTime >= CLEAR_TIMEOUT) {
    clearLocalStorage();
  }
}

// Reset interaction time on any user input or window focus
window.addEventListener('focus', resetInteractionTime);
form.addEventListener('submit', resetInteractionTime);
for (const input of inputs) {
  input.addEventListener('input', resetInteractionTime);
}

// Check for inactivity and clear local storage if needed
setInterval(checkInteractionTimeout, 60 * 1000); // Check every minute





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


const forms = document.querySelector('.newsLetterForm');
const emailInput = form.querySelector('input[type="email"]');

forms.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = emailInput.value;
  localStorage.setItem('newsletterEmail', email);
  emailInput.value = '';
  alert('You are now subscribed to our newsletter!');
});
