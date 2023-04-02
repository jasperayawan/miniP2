const login = document.getElementById('login');

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
