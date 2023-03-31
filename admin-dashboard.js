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