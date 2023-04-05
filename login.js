

    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
    import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
  
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
  
  
    const email = document.getElementById('email')
    const password = document.getElementById('password')
    const loginBtn = document.getElementById('login')
  
    loginBtn.addEventListener('click', function(e){
      e.preventDefault()
  
      const obj = {
          email: email.value,
          password: password.value
      }
      signInWithEmailAndPassword(Auth, obj.email, obj.password)
          .then(() => {
              alert('login successfully!')
              window.location.assign('home.html')
          })
          .catch((error) => {
              alert(error)
          })
    })
  
  
  
    
  
  