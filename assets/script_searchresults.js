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

  function changeImage2(img) {
    if (img.getAttribute('src') === './assets/save favorite before.png') {
      img.setAttribute('src', './assets/save favorite after.png');
    } else {
      img.setAttribute('src', './assets/save favorite before.png');
    }
  }  

  function changeImage3(img) {
    if (img.getAttribute('src') === './assets/save favorite before.png') {
      img.setAttribute('src', './assets/save favorite after.png');
    } else {
      img.setAttribute('src', './assets/save favorite before.png');
    }
  }  