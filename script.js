
//food choice should be user input for food
let foodChoice = "mushroom"

//PUNK API
//https://api.punkapi.com/v2/beers
//the below create variables for PunkAPI call for random and food choice each return 1 example
let punkApiRandom = "https://api.punkapi.com/v2/beers/random" 
let punkApiFood = "https://api.punkapi.com/v2/beers?per_page=1&food=" + foodChoice 

//calls to PunkAPI for beer data for food choice
fetch (punkApiFood)
    .then (function(response) {
        return response.json()
    })
    .then (function(data) {
        console.log(data)
    })

//calls to PunkAPI for random beer data
fetch (punkApiRandom)
    .then (function(response) {
        return response.json()
    })
    .then (function(data) {
        console.log(data)
    })

//created pexel api call as variable
let pexel = "https://api.pexels.com/v1/search?query=" + foodChoice

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

 //TODO: create a functiona if #randombutton is selected on the UI, grab the beer and food pairings

//TODO: Pass each food pairing to the Pexels API to grab an image.

 //TODO: create a function to use local storage to store and retrieve items 

 // id's to be used: #searchbutton, #roulettebutton 

 // id, #beerimage. #pairing-one, pairing-two, pairing-three