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
const rollDice = () => {
  diceValuesArr = []
  // generating 5 diff numbers
  for (let i = 0; i < 5; i++) {
    const randomDice = Math.floor(Math.random() * 6) + 1;
    diceValuesArr.push(randomDice);
  }
  // displaying 5 diff numbers
  listOfAllDice.forEach((dice, index) => {
    dice.textContent = diceValuesArr[index];
  });
}
const updateStats = () => {
  currentRoundRolls.textContent = rolls;
  currentRound.textContent = round;
};

const updateRadioOption = (index, score) => {
  scoreInputs[index].disabled = false;
  scoreInputs[index].value = score;
  scoreSpans[index].textContent = `, score = ${score}`
};

const updateScore = (selectedValue, achieved) => {
  score += parseInt(selectedValue);
  totalScore.textContent = score;

  scoreHistory.innerHTML += `<li>${achieved} : ${selectedValue}</li>`;
};
// to get the heights duplicates:
// Step 1: Count the occurrences of each number in the array.
// Step 2: Find the highest count of any number that appears at least three times.
// Step 3: Calculate the sum of all numbers in the array.
// Step 4: Update radio options based on the highest count.

const getHighestDuplicates = (arr) => {
  const counts = {};

  for (const num of arr) {
    if (counts[num]) {
      counts[num]++;
    } else {
      counts[num] = 1;
    }
  }

  let highestCount = 0;

  for (const num of arr) {
    const count = counts[num];
    if (count >= 3 && count > highestCount) {
      highestCount = count;
    }
    if (count >= 4 && count > highestCount) {
      highestCount = count;
    }
  }

  const sumOfAllDice = arr.reduce((a, b) => a + b, 0);

  if (highestCount >= 4) {
    updateRadioOption(1, sumOfAllDice);
  }

  if (highestCount >= 3) {
    updateRadioOption(0, sumOfAllDice);
  }

  updateRadioOption(5, 0);
};

// If the user rolls three of one number, and two of another number, this is called a full house.
const detectFullHouse  = (arr) => {
  const counts = {};
  // counts occurences of each number
  for(const num of arr){
    if(counts[num]){
      counts[num]++;
    } else{
      counts[num] = 1;
    }
  }
  let hasThree;
  let hasTwo;

  // check for 3 of one num or 2 of another
  for (const count of Object.values(counts)) {
    if (count === 3) hasThree = true;
    if (count === 2) hasTwo = true;
  }
  if (hasThree && hasTwo) {
    // Full house detected
    updateRadioOption(2, 25); // Assuming the third radio button is at index 2
  } else {
    // No full house
    updateRadioOption(5, 0); // Assuming the last radio button is at index 5
  }
};

const resetRadioOptions  = ()=> {
  scoreInputs.forEach((index) => {
    index.disabled = true;
    index.checked = false;
  });
  scoreSpans.forEach((span) => {
    span.textContent = "";
  });
};

const resetGame = ()=> {
  diceValuesArr = [0,0,0,0,0];
  score = 0;
  round = 1;
  rolls = 0;

  listOfAllDice.forEach((dice,index) => {
    dice.textContent = diceValuesArr[index];
  });

  totalScore.textContent = `${score}`;
  scoreHistory.innerHTML = "";

  currentRoundRolls.textContent = rolls;
  currentRound.textContent = round;
};

//A small straight is when four of the dice have consecutive values in any order (Ex. 1234) resulting in a score of 30 points. 
const checkForStraights = (arr) => {
  
};

// to make sure the dice is rolled only 3 times
rollDiceBtn.addEventListener("click", () => {
  if (rolls === 3) {
    alert("you must select a score");
  } else {
    rolls++;
    rollDice();
    updateStats();
    resetRadioOptions();
    getHighestDuplicates(diceValuesArr);
    detectFullHouse(diceValuesArr);
  }
});
// toggle to show the rules
rulesBtn.addEventListener("click", () => {
  isModalShowing = !isModalShowing;
  if (isModalShowing) {
    rulesBtn.innerText = "Hide Rules";
    rulesContainer.style.display = "block";
  } else {
    rulesBtn.innerText = "Show Rules";
    rulesContainer.style.display = "none";
  }
});
keepScoreBtn.addEventListener("click", () => {
  let selectedValue;
  let achieved;

  for (const radioButton of scoreInputs) {
    if (radioButton.checked) {
      selectedValue = radioButton.value;
      achieved = radioButton.id;
      break;
    }
  }

  if (selectedValue) {
    rolls = 0;
    round++;
    updateStats();
    resetRadioOptions();
    updateScore(selectedValue, achieved);

    if(round === 6){
      setTimeout(()=>alert(`your final score: ${score}`),500);
    }
    
  } else {
    alert("Please select an option or roll the dice");
  }
});