const scriptURL = 'https://script.google.com/macros/s/AKfycbxnTzTbrDg_R-1iqP92kPfPrlHTR6hJ0CES8KVNs8sv71t9ls2L1PG_bhAZbETLjEBp/exec'
const form = document.forms['submit-to-google-sheet']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => console.log('Success!', response))
    .catch(error => console.error('Error!', error.message))
})





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



