
//food choice should be user input for food
function findFood() {
    let foodChoice = "mushroom"
    
    $('#beerTitle').text(' ');
    $('#beerDescription').text(' ');
    // let foodChoice  = document.querySelector('input').value;
    
    //PUNK API
    //https://api.punkapi.com/v2/beers
    //the below create variables for PunkAPI call for random and food choice each return 1 example
    let punkApiFood = "https://api.punkapi.com/v2/beers?per_page=1&food=" + foodChoice 
    
    //calls to PunkAPI for beer data for food choice
    fetch (punkApiFood)
        .then (function(response) {
            return response.json()
        })
        .then (function(data) {
            let beerName = data[0].name; 
            let beerDescription = data[0].description;
            let pairing_one = data[0].food_pairing[0];
            let pairing_two = data[0].food_pairing[1];
            let pairing_three = data[0].food_pairing[2];
            
            //sets the Beerdescription
            $('#beerTitle').text(beerName);
            $('#beerPic').attr("src", getBeerPicture());
            $('#beerDescription').text(beerDescription);

            //sets the pairing text / image
            $('#pairing-one-text').text(pairing_one);
            $('#pairing-one-img').attr("src", getPicture(pairing_one));

            $('#pairing-two-text').text(pairing_two);
            $('#pairing-two-img').attr("src", getPicture(pairing_two));

            $('#pairing-three-text').text(pairing_three);
            $('#pairing-three-img').attr("src", getPicture(pairing_three));
            $('#beerDescription').text(beerDescription);
            
        })
}

//calls to PunkAPI for random beer data
function getRandom() {
    
    //clears text fields
    $('#beerTitle').text(' ');
    $('#beerDescription').text(' ');

    let punkApiRandom = "https://api.punkapi.com/v2/beers/random" 
    fetch (punkApiRandom)
    .then (function(response) {
        return response.json()
    })
    .then (function(data) {
        let beerName = data[0].name; 
        let beerDescription = data[0].description;
        let pairing_one = data[0].food_pairing[0];
        let pairing_two = data[0].food_pairing[1];
        let pairing_three = data[0].food_pairing[2];

        //sets the beerdescription
        $('#beerTitle').text(beerName);
        $('#beerPic').attr("src", getBeerPicture());
        $('#beerDescription').text(beerDescription);

        //sets the pairing text / image
        $('#pairing-one-text').text(pairing_one);
        $('#pairing-one-img').attr("src", getPicture(pairing_one));

        $('#pairing-two-text').text(pairing_two);
        $('#pairing-two-img').attr("src", getPicture(pairing_two));

        $('#pairing-three-text').text(pairing_three);
        $('#pairing-three-img').attr("src", getPicture(pairing_three));
    })
}

function getPicture(foodChoice) {
    //created pexel api call as variable
    // let foodChoice = "mushroom"
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
        let pic = data.photos[0].src.medium;
        return pic;
    })
}

//finds a beer picture
function getBeerPicture() {
    //calls to pexel API for beerImages
    let beerURL = "https://api.pexels.com/v1/search?query=beer%20glass"
    fetch (beerURL,{
        headers: {Authorization: "FGp7KD2IIxlTtlnSEQw20khyYWikbeox6QBSkS92WV7Wj7UX37T9NDyI"}
    })
    .then (function(response) {
        return response.json()
    })
    //returns data from pexel search and logs in console
    .then (function(beerData) {
        //finds a random image of a beer
        let randomNumber =  Math.floor(Math.random() * (15) );
        let beerPic = beerData.photos[randomNumber].src.medium;
        return beerPic
    })
}



 //TODO: create a functiona if #randombutton is selected on the UI, grab the beer and food pairings

//TODO: Pass each food pairing to the Pexels API to grab an image.

//declaring open empty array to store favorites into "pairingFavorite" objects listed in the array
let favoriteList = []

//stored favorite object
let storedFavorite = {
    beername: beerName,
    beerimage: beerPic,
    foodName: "",
    foodImage: "",
}

//storing favortieList into local storage in stringify form
window.localStorage.setItem(favoriteList, JSON.stringify(favoriteList))

//parsing favoriteList from storage to read data
storedFavorites = JSON.parse(window.localStorage.getItem(favoriteList));

 //TODO: create a function to use local storage to store and retrieve food pairings 
 // id's to be used: #searchButton, #rouletteButton 
 $(#searhbutton).click(findFood)

 $(#roulettebutton).click(getRandom)

 // id for beer:  #beerImage. #beerTitle, #beerDescription | #pairing-one-text, #pairing-two-text, #pairing-three-text