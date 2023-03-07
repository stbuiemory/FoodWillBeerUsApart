
//food choice should be user input for food
let foodChoice = "mushroom"
const container = $('.container')
console.log(container)

//PUNK API
//https://api.punkapi.com/v2/beers
//the below create variables for PunkAPI call for random and food choice each return 1 example
let punkApiRandom = "https://api.punkapi.com/v2/beers/random" 
let punkApiFood = "https://api.punkapi.com/v2/beers?per_page=1&food=" + foodChoice 

//this will set up the initial form for the user
function setUpHomepage(){
    container.append('<form id="search-prompt">')
    let form = $('#search-prompt')
    console.log(form)
    form.append('<p> Find your food </p>')
    form.append('<input type="text" placeholder="food name">')
    form.append('<input type="button" value="submit" id="search">')
    form.append('<p>or</p>')
    form.append('<input type="button" value="submit" id="random">')
}
setUpHomepage()

//calls to PunkAPI for beer data for food choice
function callBeerData(){
    fetch (punkApiFood)
    .then (function(response) {
        return response.json()
    })
    .then (function(data) {
        console.log(data)
    })
}

//calls to PunkAPI for random beer data
function getRandBeerData(){
    fetch (punkApiRandom)
    .then (function(response) {
        return response.json()
    })
    .then (function(data) {
        console.log(data)
    })
}


//created pexel api call as variable
let pexel = "https://api.pexels.com/v1/search?query=" + foodChoice

function getSearchImage(){
    //calls to pexel API for image search
    fetch (pexel,{
        headers: {Authorization: "FGp7KD2IIxlTtlnSEQw20khyYWikbeox6QBSkS92WV7Wj7UX37T9NDyI"}
    })
    .then (function(response) {
        return response.json()
    })
    //returns data from pexel search and logs in console
    .then (function(data) {
        console.log(data)
    })
}
