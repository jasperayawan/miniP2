import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdQWIMr01I9BJzThhdThBDlhx_8crSi3E",
  authDomain: "harvesthubform-1e334.firebaseapp.com",
  projectId: "harvesthubform-1e334",
  storageBucket: "harvesthubform-1e334.appspot.com",
  messagingSenderId: "34745514072",
  appId: "1:34745514072:web:b4e829fbb208c9c51b722d"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig); 

const Auth = getAuth();
const db = getDatabase();

  const firstName = document.getElementById('fname')
  const lastName = document.getElementById('lname')
  const email = document.getElementById('email')
  const pass = document.getElementById('pass')
  const cpass = document.getElementById('cpass')
  const submit = document.getElementById('submit')

  submit.addEventListener('click', function(e){
    e.preventDefault(); 
  
    const obj = {
        FirstName: firstName.value,
        LastName: lastName.value,
        Email: email.value,
    };
    createUserWithEmailAndPassword(Auth, obj.Email, pass.value)
        .then(() => {
            delete obj.Password;
            delete obj.Cpassword;
            set(ref(db, 'signups/' + obj.Email.replace('.', ',')), obj)
            .then(() => {
              alert('signup successfully')
              window.location.assign('login.html')
            })
            .catch((error) => {
              alert(error)
            })
        })
        .catch((error) => {
            alert(error)
        })
    console.log(obj)
  })