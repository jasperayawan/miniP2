
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbwbl2OCEYEp6u--aHkwe3SF-mOafeRkA9SxbQXOTxSd0KeRkKdnEEx7PH0zXSjYlGOSKQ/exec";
  const form = document.forms["submit-to-google-sheet"];
  const msg = document.getElementById("msg");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => {
        msg.innerHTML = "Message sent successfully!";
        setTimeout(function () {
          msg.innerHTML = "";
        }, 5000);
        form.reset();
      })
      .catch((error) => console.error("Error!", error.message));
  });

  var acc = document.getElementsByClassName("accordion");
  var i;
  
  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      } 
    });
  }

 

  function toggleBtn(){
    let displayHandling = document.getElementById('profile_List')
    
    if(displayHandling.style.display === 'flex'){
        displayHandling.style.display = 'none'
    } else{
        displayHandling.style.display = 'flex'
    }
}




