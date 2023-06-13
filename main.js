// Local Storage




// date

const d = new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let month = months[d.getMonth()];
let dateElemnet = document.querySelector(".date .date")
dateElemnet.textContent =  `${d.getDate()}, ${month} ${d.getFullYear()}`

// time

timeElement = document.querySelector('.date .time')


function time() {
    var d = new Date();
    var s = d.getSeconds();
    var m = d.getMinutes();
    var h = d.getHours();
    timeElement.textContent = 
      ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2);
  }
  
  setInterval(time, 1000);

// ayah

let ayah = document.querySelector(".quran .ayah")
let ayahTafsir = document.querySelector(".quran .tafsir")

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
let ayahNum = randomIntFromInterval(1, 6236)

async function getAyah() {
    const response = await fetch(`https://api.alquran.cloud/v1/ayah/${ayahNum}/quran-uthmani`)
    const data = await response.json()
    let textAyah = document.createTextNode(data.data.text)
    ayah.appendChild(textAyah)
}

getAyah()

async function getAyahTafsir() {
    const response = await fetch(`http://api.alquran.cloud/v1/ayah/${ayahNum}/en.asad`)
    const data = await response.json()
    let textAyah = document.createTextNode(`${data.data.text } (${data.data.surah.englishName} : ${data.data.surah.numberOfAyahs})`)
    ayahTafsir.appendChild(textAyah)
}

getAyahTafsir()

// Good


let good = document.querySelector(".hello")
let word = ""

if (d.getHours() < 12) {
    word = "Good Morning, "
} else if (d.getHours() < 18) {
    word = "Good Afternoon, "
} else if (d.getHours() < 20) {
    word = "Good Evinning, "
} else if (d.getHours() < 24) {
    word = "Good Night, "
}

good.textContent = word



let tablinks = document.querySelectorAll("a.tablink")

tablinks.forEach(e => {
    if (e.classList.contains("active")) {
        document.querySelector("div#"+tablinks[0].id).
            style.display = "block"

        document.querySelector("div#"+tablinks[1].id).
            style.display = "none"
    } else {
        console.log("no")
    }
});

tablinks[0].addEventListener("click",function () {
    tablinks[1].classList.remove("active")        
    tablinks[0].classList.add('active')
    document.querySelector("div#"+tablinks[0].id).
        style.display = "block"

    document.querySelector("div#"+tablinks[1].id).
        style.display = "none"
})


tablinks[1].addEventListener("click",function () {
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active")        
    }
    tablinks[1].classList.add('active')
    document.querySelector("div#"+tablinks[1].id).
        style.display = "flex"

    document.querySelector("div#"+tablinks[0].id).
        style.display = "none"

})

let nameInput = document.querySelector("input[type='text']")

nameInput.onchange = function () {
    good.textContent = word + nameInput.value
    localStorage.setItem("good",nameInput.value)
}

good.textContent = word+localStorage.getItem('good')


let themes = document.querySelectorAll(".color")
themes.forEach(e => {
    let cs = getComputedStyle(e)

    e.onclick = function () {
        for (let i = 0; i < themes.length; i++) {
            themes[i].classList.remove('active')
        }
        e.classList.add('active')
        document.body.style.backgroundColor = cs.
            getPropertyValue("--clr")

        let rootEl = document.querySelector(":root")
        if (cs.getPropertyValue("--clr") === "#000" || cs.getPropertyValue("--clr") === "#9ccfe7") {
            console.log('yes')
            rootEl.style.setProperty("--main-color", "#FFF")
        }else{
            console.log('no')
            rootEl.style.setProperty("--main-color", "#132231")
        }

        localStorage.setItem('active-theme',cs.getPropertyValue("--clr"))
    } 
});
let rootEl = document.querySelector(":root")

// themes.forEach(e => {
//     let cs = getComputedStyle(e)
//     cs.getPropertyValue("--clr")
//     if (cs.getPropertyValue("--clr") === ) {
        
//     }
// })

document.body.style.backgroundColor = 
localStorage.getItem("active-theme")

if (localStorage.getItem("active-theme") === "#000" || localStorage.getItem("active-theme") === "#9ccfe7") {
    console.log('yes')
    rootEl.style.setProperty("--main-color", "#FFF")
}else{
    console.log('no')
    rootEl.style.setProperty("--main-color", "#132231")
}



let closeSet = document.querySelector(".close")
let openSet = document.querySelector('.open')
let overlay = document.querySelector('.overlay')
let settings = document.querySelector('.settings')
closeSet.onclick = function () {
    settings.classList.remove('active')
    overlay.classList.remove('active')
}

openSet.onclick = function () {
    settings.classList.add('active')
    overlay.classList.add('active')
}

