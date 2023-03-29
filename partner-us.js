
const cardWrapper = document.querySelector('.card-wrapper')
const widthToScroll = cardWrapper.children[0].offsetWidth
const arrowPrev = document.querySelector('.arrow.prev')
const arrowNext = document.querySelector('.arrow.next')
const cardBounding = cardWrapper.getBoundingClientRect()
const cardImageAndLink = cardWrapper.querySelectorAll('img, a')
let currScroll = 0
let initPos = 0
let clicked = false

cardImageAndLink.forEach(item=> {
  item.setAttribute('draggable', false)
})

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

// Load data from local storage
for (const input of inputs) {
  const value = localStorage.getItem(input.name);
  if (value) {
    input.value = value;
  }
}

// Save data to local storage on form submission
form.addEventListener('submit', () => {
  const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
  const submission = {};
  for (const input of inputs) {
    submission[input.name] = input.value;
    localStorage.setItem(input.name, input.value);
    input.value = ''; // clear the form inputs
   
  }
  submission.timestamp = Date.now();
  submissions.push(submission);
  localStorage.setItem('submissions', JSON.stringify(submissions));

  // Add success message to the DOM
   // Show success message as an alert
   const message = 'Your registration has been submitted. We will contact you within 24-48 hours.';
   alert(message);

   // Reset the form
  form.reset();

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



