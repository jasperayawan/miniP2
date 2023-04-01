
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

    sessionStorage.setItem('FirstName', fname)
    sessionStorage.setItem('LastName', lname)
    sessionStorage.setItem('Email', email)
    sessionStorage.setItem('Password', pass)
    sessionStorage.setItem('CPassword', cpass)

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
    const email = sessionStorage.getItem("Email")
    const password = sessionStorage.getItem("Password")

    if(emailAdress == "" && passWord == ""){
        swal("I am sorry!", "Input field has no value", "error")
    } else {
        if(emailAdress == Email && passWord == Password && emailAdress == email && passWord == password){
            window.location.assign("index.html");
            swal("Good job!", "Login Successful!", "success")
        } else{
            swal("Opps..!", "Something is wrong", "error")
        }   
    }
})




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























 