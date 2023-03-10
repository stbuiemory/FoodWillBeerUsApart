const baseSearchURL = "https://api.punkapi.com/v2/beers?per_page=1&food="
const previousSearchesKey = "previous searches"
let searchedList = localStorage.getItem(previousSearchesKey)
if(searchedList === null){
    searchedList = []
    localStorage.setItem(previousSearchesKey, JSON.stringify(searchedList))
}else{
    searchedList = JSON.parse(searchedList)
}
//food choice should be user input for food
function findFood() {
    let foodChoice = "mushroom"
    
    $('#beerTitle').text(' ');
    $('#beerDescription').text(' ');
    // let foodChoice  = document.querySelector('input').value;
    
    //PUNK API
    //https://api.punkapi.com/v2/beers
    //the below create variables for PunkAPI call for random and food choice each return 1 example
    let punkApiFood = baseSearchURL + foodChoice 
    
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
            saveBeerData(foodChoice, data)
            console.log(JSON.parse(getSavedData(foodChoice)))
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



 //TODO: create a function to use local storage to store and retrieve food pairings 

 //This saves the whole api query under the searched food item.
 function saveBeerData(foodKey, data){
    localStorage.setItem(foodKey, JSON.stringify(data))
    searchedList.push(foodKey)
    localStorage.setItem(previousSearchesKey, JSON.stringify(searchedList))
 }

 // Returns data from local storage. If data isn't in local storage, returns -1 instead.
 function getSavedData(foodKey){
    let data = localStorage.getItem(foodKey)
    if(data === null){
        return -1
    }
    return data
 }

function listSearchedItems(){
    let section = $('.section')
    section.append('<div class="save-list"></div>')
    let saveList = $('.save-list')
    for(i in searchedList){
        console.log('index: '+i)
        console.log('item searched: '+searchedList[i])
        console.log(JSON.parse(getSavedData(searchedList[i])))
        let beerData = (JSON.parse(getSavedData(searchedList[i])))[0]
        saveList.append('<div id="save-'+i+'"></div>')
        let box = $('#save-'+i)
        box.append('<image id="saved-beer-'+i+'" src="'+getBeerPicture()+'" alt="saved-beer-'+i+'">')
        box.append('<div>'+beerData.name+'</div>')
        box.append('<div>paired with</div>')
        box.append('<div>'+searchedList[i]+'</div>')
        box.append('<image id="saved-food-'+i+'" src="'+getPicture(searchedList[i])+'" alt="saved-food-'+i+'">')
    }
}

function removeSearchedItems(){
    $('.save-list').remove()
}

var toggleSavePairing = function(event){
    event.preventDefault
    // get specific heart button id
    let heart = $(event.target)
    // takes data stored in heart button's 'data' attributes
    let food = heart.attr("data-food")
    let foodImg = heart.attr("data-foodImg")
    let beer = heart.attr("data-beer")
    let beerImg = heart.attr("data-beerImg")
    // checks if the var is saved
    let isSaved = searchedList.includes(food)
    // acts based on wether the button was clicked or not
    if(isSaved){
        let index = searchedList.indexOf(food)
        searchedList = searchedList.splice(index, 1)
        localStorage.setItem(previousSearchesKey, JSON.stringify(searchedList))
        // Todo: add heart color change
    }else{
        let info = {food:food, foodImg:foodImg, beer:beer, beerImg:beerImg}
        localStorage.setItem(food, JSON.stringify(info))
        // Todo: add heart color change
    }
}

var toggleSavedPairings = function(){
    let container = $(".save-list")
    if($.trim(container.html()).length===0){
        listSearchedItems()
    }else{
        removeSearchedItems()
    }
}

//findFood()

listSearchedItems()

 // id's to be used: #searchButton, #rouletteButton 

 // id for beer:  #beerImage. #beerTitle, #beerDescription | #pairing-one-text, #pairing-two-text, #pairing-three-text