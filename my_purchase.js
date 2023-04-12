function toggleBtn() {
    let displayHandling = document.getElementById("profile_List");

    if (displayHandling.style.display === "flex") {
      displayHandling.style.display = "none";
    } else {
      displayHandling.style.display = "flex";
    }
  }

  const buyAgain = document.querySelectorAll('.buy_again_btn')
  const contactUs = document.querySelectorAll('.contact_seller_btn')

  buyAgain.forEach((e) => {
    e.addEventListener('click', function(){
      window.location.href = "marketplace.html"
    })
  })
  contactUs.forEach((e) => {
    e.addEventListener('click', function(){
      window.location.href = "help-center.html"
    })
  })

