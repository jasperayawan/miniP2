let list = document.querySelectorAll(".navigation_container li");

function activeLink(){
    list.forEach(item => {
        item.classList.remove("hovered")
    })
    this.classList.add("hovered")
}

list.forEach(item => item.addEventListener("mouseover", activeLink))

let toggle = document.querySelector('.toggle')
let navigation = document.querySelector('.navigation_container');
let main = document.querySelector('.main')

toggle.onclick = function(){
    navigation.classList.toggle("active")
    main.classList.toggle("active")
}

const subMenu = document.querySelector('.sub-menu')
const navItem = document.querySelectorAll('.nav-item')

for(let i of navItem){
    i.onclick = activeLi;
}

function activeLi(){
    const list = Array.from(navItem);

    list.forEach(e => e.classList.remove('actives'));
    this.classList.add('actives')
}



const logoutDashboard = document.getElementById('logout')
const log = document.querySelector('.main')

logoutDashboard.addEventListener('click', () => {
    logoutPopup() 
})

function logoutPopup(){
    const logoutPopupMessage = document.createElement('div')
    logoutPopupMessage.classList.add('popup')
    const popUpContainer = document.createElement('div')
    popUpContainer.classList.add('popcontainer')
    const span = document.createElement('span')
    logoutPopupMessage.appendChild(popUpContainer)
    popUpContainer.appendChild(span)

    span.innerHTML = `are you sure do you want to logout? 
                        <button class="btnPopUp" onclick="logout()">Yes</button><button class="btnPopUp" onclick="nogout()">No</button>`

    log.appendChild(logoutPopupMessage)


}

function logout(){
    window.location.href = "index.html"
}
