function toggleBtn() {
    let displayHandling = document.getElementById("profile_List");

    if (displayHandling.style.display === "flex") {
      displayHandling.style.display = "none";
    } else {
      displayHandling.style.display = "flex";
    }
  }