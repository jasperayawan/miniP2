const imageInput = document.getElementById('image-input')
let uploadImage = "";

imageInput.addEventListener('change', function(){
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        uploadImage = reader.result;
        const displayProfile = document.getElementById('display_image').style.backgroundImage = `url(${uploadImage})`
        localStorage.setItem('Image', displayProfile)
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

  const userImg = document.getElementById('tableBanner')

  const saveBtn = document.getElementById('saveBtn')

  saveBtn.addEventListener('click', (e) => {
  
    alert('successfully saved')
  })
