//Global values
let userName = "";
let gameMode = "easy";
let noOfMatch = 0;

//DOM ele reference
const gameSec = document.querySelector(".game_sec");
const gameArea = document.querySelector(".game_area");
const sesult_sec = document.querySelector(".result");
const infoSec = document.querySelector(".info");
const movesEle = document.getElementById("moves");

//Event listers
document.getElementById("btn_id").addEventListener("click", handleSubmit);
document.getElementById("start_game").addEventListener("click", startGame);

//Submit user name
function handleSubmit() {
  //Set the user name
  const nameValue = document.getElementById("username_id").value;

  //Set the game level
  const levelEle = document.querySelectorAll('input[name="game_level"]');
  const selectedLevel = Array.from(levelEle).find((level) => !!level.checked);
  if (selectedLevel) {
    gameMode = selectedLevel.value;
  }

  //Validation check
  const errorEle = document.querySelector(".error_field");
  if (!!nameValue.length) {
    userName = nameValue;
    //Hide and show sections
    infoSec.classList.add("hide");
    gameSec.classList.remove("hide");
    //Generate cards data
    cardGenerator();
  } else {
    errorEle.innerText = "Please enter a user name!";
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
  if (gameMode === "Intermediate" && noOfMatch === 16) {
    showResult();
  }
  if (gameMode === "Advance" && noOfMatch === 16) {
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
    const currentMovesValue = movesEle.innerText;
    movesEle.innerText = parseInt(currentMovesValue) + 1;
  }
};

//Game start
function startGame() {
  setInterval(timer, 1000);
}

//Timer func
const timer = () => {
  const timerEle = document.getElementById("timer");
  const currentTimerValue = timerEle.innerText;
  timerEle.innerText = parseInt(currentTimerValue) + 1;

  //TODO
  //Implement function for minute
};

//show final result
const showResult = () => {
  gameSec.classList.add("hide");
  sesult_sec.classList.remove("hide");
  document.getElementById("player_name").innerText = userName;
  document.getElementById("game_level").innerText = gameMode;
};

//TODO
//1: make minute function
//2: allow to flip only when start button is clicked
//3: resume functionality
//4: styling for all sections
//5: show no of moves in result section
//6: show timer in result section
//back functionalituy to go back to user info sectiuon
