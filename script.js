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
            swal("Good job", "registration", "success")
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
        swal("Good job", "Input field has no value", "error")
    } else {
        if(emailAdress == Email && passWord == Password){
            window.location.assign("index.html");
            swal("Good job", "Login successful!", "success")
        } else{
            swal("Opps..!", "Something is wrong", "error")
        }   
    }
})

function goToPage(url) {
    window.location.href = url;
  }