 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
 import { getAuth } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyBdQWIMr01I9BJzThhdThBDlhx_8crSi3E",
   authDomain: "harvesthubform-1e334.firebaseapp.com",
   databaseURL: "https://harvesthubform-1e334-default-rtdb.firebaseio.com",
   projectId: "harvesthubform-1e334",
   storageBucket: "harvesthubform-1e334.appspot.com",
   messagingSenderId: "34745514072",
   appId: "1:34745514072:web:b4e829fbb208c9c51b722d"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);

 const auth = getAuth();
 const logout = document.getElementById('logoutButton')
 const loginbtn = document.querySelectorAll('loginButton') 
 const addtocart = document.querySelectorAll('.add-to-cart')


 logout.addEventListener('click', () => {
 auth.signOut()
 .then(function(){
   alert('successfully signout')
 })
 .catch(function(error){
   alert(error)
 })
})

const checkout = document.getElementById('checkout')

auth.onAuthStateChanged((user) => {
    
 if(user){
   logout.style.display = 'block'
   document.getElementById('loginButton').style.display = 'none'
   document.getElementById('signupButton').style.display = 'none'
   document.getElementById('myaccountButton').style.display = 'block'
   document.getElementById('user').style.display = 'block'
 }else{
   logout.style.display = 'none'
    document.getElementById('user').style.display = 'none'
    document.getElementById('myaccountButton').style.display = 'none'
    addtocart.forEach((e) => {
        e.addEventListener('click', function(){
            alert('login first')
            window.location.href = "login.html"
            
        })
    })
    loginfirstBeforeCheckout()
 }
})


function loginfirstBeforeCheckout(){
  checkout.addEventListener('click', () => {
    alert('login first')
    window.location.href = "login.html"
  })
}
