const previousSearchesKey = "previous searches"
let searchedList = localStorage.getItem(previousSearchesKey)
if(searchedList === null){
    searchedList = []
    localStorage.setItem(previousSearchesKey, JSON.stringify(searchedList))
}else{
    searchedList = JSON.parse(searchedList)
}

// Function that toggles Save this Pairing icon on clicks
function changeImage(img) {
  let heart = $(img)
  let food = heart.attr("data-food")
  let beer = heart.attr("data-beer")
  if (img.getAttribute('src') === './assets/save favorite before.png') { //if not saved
    let info = {food:food, beer:beer}
    searchedList.push(food)
    localStorage.setItem(previousSearchesKey, JSON.stringify(searchedList))
    localStorage.setItem(food, JSON.stringify(info))
    img.setAttribute('src', './assets/save favorite after.png');
  } else { //if saved
    let index = searchedList.indexOf(food)
    searchedList.splice(index, 1)
    localStorage.setItem(previousSearchesKey, JSON.stringify(searchedList))
    localStorage.removeItem(food)
    img.setAttribute('src', './assets/save favorite before.png');
  }
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
      $('#saved-food-'+searchedList.indexOf(foodChoice)).attr('src', pic)
      return pic;
  })
}

//finds a beer picture
function getBeerPicture() {
  //calls to pexel API for beerImages
  let beerURL = "https://api.pexels.com/v1/search?query=beer%20glass"
  let temp = 'a'
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
      for(i in searchedList){
          console.log(beerPic)
          $('#saved-beer-'+i).attr('src', beerPic)
      }
      return beerPic
  })
}

function getSavedData(foodKey){
  let data = localStorage.getItem(foodKey)
  if(data === null){
      return -1
  }
  return data
}

function destroyHomepageItems(){
  console.log($('#multi-purpose'))
  $('#multi-purpose').children().remove()
}

async function listSearchedItems(){
  let section = $('#multi-purpose')
  section.append('<div class="save-list"></div>')
  let saveList = $('.save-list')
  for(i in searchedList){
      // console.log('index: '+i)
      // console.log('item searched: '+searchedList[i])
      // console.log(JSON.parse(getSavedData(searchedList[i])))
      let beerData = (JSON.parse(getSavedData(searchedList[i])))
      saveList.append('<div id="save-'+i+'" class="columns mb-2 pair-container"></div>')
      let box = $('#save-'+i)
      box.append('<image id="saved-beer-'+i+'" src="" alt="saved-beer-'+i+'" class="column" style="width:250px; height:250px;">')
      
      //console.log(getBeerPicture())
      box.append('<div class="column pair-text"><b>'+beerData.beer+'</b></div>')
      box.append('<div class="column pair-text">paired with</div>')
      box.append('<div class="column pair-text"><b>'+searchedList[i]+'</b></div>')
      box.append('<image id="saved-food-'+i+'" src="" alt="saved-food-'+i+'" class="column" style="width:250px; height:250px;">')
      getPicture(searchedList[i])
  }
  getBeerPicture()
}

var takeToSavedPairings = function(event){
  destroyHomepageItems()
  listSearchedItems()
}
$('#saved-pairings').on('click', takeToSavedPairings)