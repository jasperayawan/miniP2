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


const submitButton = document.querySelector('.button')

submitButton.addEventListener('click', function(e){
    e.preventDefault();
    let fname = document.getElementById('fname').value
    let lname = document.getElementById('lname').value
    let email = document.getElementById('email').value
    let pass = document.getElementById('pass').value
    let cpass = document.getElementById('cpass').value

    localStorage.setItem('FirstName', fname)
    localStorage.setItem('LastName', lname)
    localStorage.setItem('Email', email)
    localStorage.setItem('Password', pass)
    localStorage.setItem('CPassword', cpass)

    if(fname == "" && lname == "" && email == "" && pass == "" && cpass == ""){
        swal("Opps..!", "Input field must be fill", "error")
    } else {
        if(pass !== cpass){
            swal("Opps..!", "Password not matching!", "error")
        }else{
            window.location.assign("login.html");
            swal("Good job!", "Registration Successsful!", "success")
        }
    }
})

const login = document.querySelector('.login');

login.addEventListener('click', function(e){
    e.preventDefault();

    // catch the value which is type user login page

    const emailAdress = document.getElementById('email').value;
    const passWord = document.getElementById('password').value;

    // let's get the value in localStorage which store user in registration form

    const Email = localStorage.getItem("Email");
    const Password = localStorage.getItem('Password');

    if(emailAdress == "" && passWord == ""){
        swal("I am sorry!", "Input field has no value", "error")
    } else {
        if(emailAdress == Email && passWord == Password){
            window.location.assign("index.html");
            swal("Good job!", "Login Successful!", "success")
        } else{
            swal("Opps..!", "Something is wrong", "error")
        }   
    }
})

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




