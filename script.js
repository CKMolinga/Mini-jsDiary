let input = document.querySelector('.textarea')
let typedValue = document.querySelector('.typed-area')
let items = document.querySelector(".items")
let form = document.querySelector("form")


let dairyItems = []

// 
let newDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })

let time = new Date()
let hrs = time.getHours()
let ampm = (hrs >= 12) ? "PM" : "AM";
let mins = time.getMinutes()
let sec = time.getSeconds()

// 
let currentTime = `${hrs}:${mins}:${sec}  ${ampm}`

input.addEventListener("keyup", function() {
    if (input.value.length > 0) {
        typedValue.style.display = "block"
    } else {
        typedValue.style.display = "none"
    }
    typedValue.textContent = input.value;
})


form.addEventListener("submit", function(e) {
    e.preventDefault()
    addItems(input.value)
    input.value = ""
    typedValue.style.display = "none"
})



function addItems(item) {

    if (item !== '') {
        let itemsDairy = {
            date: newDate,
            time: currentTime,
            name: item
        }

        dairyItems.push(itemsDairy)
        addToLocalStorage(dairyItems)
    }

}

function renderItems(dairyItems) {
    items.innerHTML = ''

    dairyItems.forEach(function(item) {

        let li = document.createElement('li')
        li.innerHTML = `<div class="date"> <span> <i class="far fa-calendar-alt"></i> </span> <span class="ml">${item.time}  |  ${item.date}</span></div>
       <p class="dataItem">${item.name}</p>`

        items.appendChild(li)

    })
}

function addToLocalStorage() {
    localStorage.setItem('dairyItems', JSON.stringify(dairyItems))
    renderItems(dairyItems)
}

function getToLocalStorage() {
    let reference = localStorage.getItem('dairyItems')
    if (reference) {
        dairyItems = JSON.parse(reference)
        renderItems(dairyItems)
    }

}

getToLocalStorage();

items.addEventListener('click', e => {
    if (e.target.tagName === 'LI') {
        e.target.remove();
    }
})

// list.addEventListener('click', function(e) {
//     var t = e.target;
//     if (t.classList.contains('checked')) {
//         t.parentNode.removeChild(t);
//     } else {
//         t.classList.add('checked');
//     }
// })