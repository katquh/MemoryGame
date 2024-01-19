
// localStorage.clear();
const gameContainer = document.getElementById("game");
let body = document.querySelector("body");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

//keep lowest score in local storage to compare to current total tries
let bestScore = 100;
let bestScoreUI = document.createElement("h3");
body.prepend(bestScoreUI);
bestScoreUI.innerText = `Best Score: ${bestScore}`;
localStorage.setItem('bestscore', bestScore);



//to start the game set it to to false 
let gameOver = true;
let shuffledColors = shuffle(COLORS);

//create button to start the game 
let button = document.querySelector("button");
button.innerText = "Start Game"
button.addEventListener("click", createDivsForColors)

let clickCounter = 0;
//create a click counter 
let totalTries = 0;
let clickScore = document.createElement("h3");
body.prepend(clickScore);
clickScore.innerText = `Click Tries: ${totalTries}`;
clickScore.style.fontSize = "3rem";

let clickedDiv1;
let clickedDiv2;
let match= 0 ;
let isStarted = false;

// here is a helper function to shuffle an array

// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}


// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors() {
  button.remove();
  for (let color of shuffledColors) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

//function to check if cards match 
function checkMatch(){
  if (clickedDiv1.className === clickedDiv2.className) {
    console.log("There's a MATCH")
    match ++;
    if (match === 5){
      //save score to local storage if lower than best score
      if (totalTries < bestScore){
        localStorage.setItem('bestscore',totalTries);
        bestScore = totalTries;
        bestScoreUI.innerText = `Best Score: ${bestScore}`;
        alert("You beat the best score!");
    
      // create a restart button to restart the game   
      let restartButton = document.createElement("button"); 
      restartButton.style.width = "5rem";
      restartButton.style.height = "3rem";
      restartButton.innerText = "Restart Game"
      gameContainer.append(restartButton);
      restartButton.addEventListener("click",restartGame); 
      }
    }
    return true;
  }
  else {
      console.log("Sorry try again");
      return false;
      }
  }



//reset pair of cards and reset timer 
function resetCards() {
  clickedDiv1.style.backgroundColor = "white";
  clickedDiv2.style.backgroundColor = "white"; 
  clickCounter = 0;
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  if (clickCounter === 0) {
    clickCounter ++;
    clickedDiv1 = event.target;
    console.log("you just clicked", clickedDiv1);
    let bgColor = clickedDiv1.className;
    clickedDiv1.style.backgroundColor = bgColor;
  } else if (clickCounter === 1) {
    clickCounter ++;
    clickedDiv2 = event.target;
    console.log("you just clicked", clickedDiv2);
    let bgColor = clickedDiv2.className;
    clickedDiv2.style.backgroundColor = bgColor;
      if (clickedDiv1 === clickedDiv2){
        alert("You cannot click the same card");
        gameOver === true;
        restartGame();
      }
      else {
        totalTries ++;
      }
      if (checkMatch()) {;
        clickCounter = 0;
      } else {
        setTimeout(resetCards,1000)
      }
  }
  clickScore.innerText = `Click Tries: ${totalTries}`;
}

// how to remove divs to restart
function removeDivs(){
  gameContainer.innerHTML = "";
  match = 0;
}

function restartGame(){
  removeDivs();
  totalTries = 0;
  clickScore.innerText = `Click Tries: ${totalTries}`;
  bestScoreUI.innerText = `Best Score: ${bestScore}`;
  createDivsForColors();
}

 //when the DOM loads