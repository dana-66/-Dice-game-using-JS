// There are a total of 6 rounds and for each round, the player can roll the dice up to 3 times and collect a score.
const listOfAllDice = document.querySelectorAll(".die");
const scoreInputs = document.querySelectorAll("#score-options input");
const scoreSpans = document.querySelectorAll("#score-options span");
const currentRound = document.getElementById("current-round");
const currentRoundRolls = document.getElementById("current-round-rolls");
const totalScore = document.getElementById("total-score");
const scoreHistory = document.getElementById("score-history");
const rollDiceBtn = document.getElementById("roll-dice-btn");
const keepScoreBtn = document.getElementById("keep-score-btn");
const rulesContainer = document.querySelector(".rules-container");
const rulesBtn = document.getElementById("rules-btn");

let diceValuesArr = [];
let isModalShowing = false;
let score = 0;
let total = 0;
let round = 1; 
let rolls = 0; 

// to display the dice numbers               
rollDiceBtn.addEventListener("click", () => {

    // generating 5 diff numbers
    for (let i = 0; i < 5; i++){
      diceValuesArr[i] = Math.ceil(Math.random() * 6);
    }
    // displayiing 5 diff numbers
    listOfAllDice.forEach((dice, index) => {
      dice.textContent = diceValuesArr[index];
    });    
    });

// toggle to show the rules
rulesBtn.addEventListener("click", () => {
    isModalShowing = !isModalShowing;
    if(isModalShowing){
      rulesBtn.innerText = "Hide Rules";
      rulesContainer.style.display = "block";
    }else{
      rulesBtn.innerText = "Show Rules";
      rulesContainer.style.display = "none";
    }
  });