//Global values
let userName = "";
let gameMode = "";
let noOfMatch = 0;
let currentMovesValue = 0;
let totalSeconds = 0;
let clearIntervalID = undefined;

//DOM ele reference
const gameSec = document.querySelector(".game_sec");
const gameArea = document.querySelector(".game_area");
const result_sec = document.querySelector(".result");
const infoSec = document.querySelector(".info");
const movesEle = document.getElementById("moves");
const startInfo = document.querySelector(".start_info");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");


//Event listeners
document.getElementById("btn_id").addEventListener("click", handleSubmit);
//document.getElementById("start_game").addEventListener("click", startGame);
document.querySelector(".back_btn").addEventListener("click", function(){location.reload()});
document.querySelector(".reset_btn").addEventListener("click", function(){location.reload()});

//Submit user name
function handleSubmit() {
  //Set the user name
  const nameValue = document.getElementById("username_id").value;

  //Set the game level
  const levelEle = document.querySelectorAll('input[name="game_level"]');
  const selectedLevel = Array.from(levelEle).find((level) => level.checked);
  if (selectedLevel) {
    gameMode = selectedLevel.value;
  }
  console.log(gameMode);
  //Validation check
  const errorEle = document.querySelector(".error_field");
  const errorLevelEle = document.querySelector(".error_field_level");
  errorEle.innerText = "";
  errorLevelEle.innerText = "";

  if (nameValue.length && gameMode.length) {
    userName = nameValue;
    //Hide and show sections
    infoSec.classList.add("hide");
    gameSec.classList.remove("hide");
    //Generate cards data
    cardGenerator();
  } else if (!nameValue.length) {
    errorEle.innerText = "Please enter a user name!";
  } else if (!gameMode.length) {
    errorLevelEle.innerText = "Please select level!";
  }
}

//Generate data
let getData = () => {
  let data;
  const emojiList = [
    { content: "😍", name: "emojiLoveEye" },
    { content: "😎", name: "emojiShade" },
    { content: "🥳", name: "emojiCelebration" },
    { content: "😭", name: "emojiCry" },
    { content: "🥶", name: "emojiCold" },
    { content: "🥺", name: "emojiSad" },
  ];
  const numberList = [
    { content: "10", name: "10" },
    { content: "22", name: "22" },
    { content: "40", name: "40" },
    { content: "101", name: "101" },
    { content: "70", name: "70" },
    { content: "99", name: "99" },
  ];

  //Give 4*4
  if (gameMode === "Easy") {
    const firstFourEmoji = emojiList.slice(0, 4);
    data = [
      ...firstFourEmoji,
      ...firstFourEmoji,
      ...firstFourEmoji,
      ...firstFourEmoji,
    ];
  }

  //Give 6*6
  if (gameMode === "Intermediate") {
    data = [
      ...emojiList,
      ...emojiList,
      ...emojiList,
      ...emojiList,
      ...emojiList,
      ...emojiList,
    ];
  }

  if (gameMode === "Advance") {
    data = [
      ...numberList,
      ...numberList,
      ...numberList,
      ...numberList,
      ...numberList,
      ...numberList,
    ];
  }
  return data;
};

//Randomize
const randomize = () => {
  let cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

//Card Generator function
const cardGenerator = () => {
  const cardData = randomize();

  //For changig grid nos
  if (gameMode === "Intermediate" || gameMode === "Advance") {
    document.querySelector(".game_area").classList.add("game_area_six");
  }

  cardData.forEach((item) => {
    //Generate HTML
    const card = document.createElement("div");
    const face = document.createElement("div");
    const back = document.createElement("div");
    const faceInner = document.createElement("p");

    card.classList = "card";
    face.classList = "face";
    back.classList = "back";

    //Attach the info to the cards
    face.appendChild(faceInner);
    faceInner.innerText = item.content;

    card.setAttribute("name", item.name);
    //Attach the card to the section
    gameArea.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener("click", (e) => {
      card.classList.toggle("toggle_card");
      checkCards(e);
    });
  });
};

const checkNoOfMatch = () => {
  noOfMatch++;

  if (gameMode === "Easy" && noOfMatch === 8) {
    showResult();
  }
  if (gameMode === "Intermediate" && noOfMatch === 18) {
    showResult();
  }
  if (gameMode === "Advance" && noOfMatch === 18) {
    showResult();
  }
};

//Check cards
const checkCards = (e) => {
  const clickedCard = e.target;
  clickedCard.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");


  //Logic
  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        //make it unclickable
        card.style.pointerEvents = "none";
      });
      checkNoOfMatch();
    } else {
      //Remove class
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        //Delaying the second flipp remove
        setTimeout(() => card.classList.remove("toggle_card"), 500);
      });
    }
    //Increment the moves
    movesEle.innerText = `${++currentMovesValue}`;
  }

  if(currentMovesValue === 0 ) {
    startInfo.classList.add("hide");
    clearIntervalID = timer();
  }
};

//Game start
function startGame() {
  setInterval(timer, 1000);
}

//Timer func


const timer = () => {
  let clearTimerID = setInterval(setTime, 1000);

  function setTime() {
    ++totalSeconds;
    seconds.innerHTML = pad(totalSeconds % 60);
    minutes.innerHTML = pad(parseInt(totalSeconds / 60));
  }

  function pad(val) {
    let valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }

  return clearTimerID;
};

//show final result
const showResult = () => {
  clearInterval(clearIntervalID);
  gameSec.classList.add("hide");
  result_sec.classList.remove("hide");
  document.getElementById("player_name").innerText = userName;
  document.getElementById("game_level").innerText = gameMode;
  document.getElementById("minutes_end").innerText = minutes.innerText;
  document.getElementById("seconds_end").innerText = seconds.innerText;
  document.getElementById("end_no_moves").innerText = parseInt(currentMovesValue);
};

//TODO
//1: make minute function
//2: allow to flip only when start button is clicked
//3: resume functionality
//4: styling for all sections
//5: show no of moves in result section
//6: show timer in result section
//7: back functionality to go back to user info section
