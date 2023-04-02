const submitButton = document.getElementById('submit')

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

