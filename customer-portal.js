const imageInput = document.getElementById('image-input')
let uploadImage = "";

imageInput.addEventListener('change', function(){
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        uploadImage = reader.result;
        document.getElementById('display_image').style.backgroundImage = `url(${uploadImage})`
    });
    reader.readAsDataURL(this.files[0]);
})

function toggleBtn() {
    let displayHandling = document.getElementById("profile_List");

    if (displayHandling.style.display === "flex") {
      displayHandling.style.display = "none";
    } else {
      displayHandling.style.display = "flex";
    }
  }