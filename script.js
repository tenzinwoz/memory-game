//Global values
let userName = "";
let gameMode = "easy";

//DOM ele reference
const gameSec = document.querySelector(".game_sec");
const gameArea = document.querySelector(".game_area");
const sesult_sec = document.querySelector(".result");
const infoSec = document.querySelector(".info");

//Event listers
document.getElementById("btn_id").addEventListener("click", handleSubmit);

//Submit user name
function handleSubmit() {
  //Set the user name
  const nameValue = document.getElementById("username_id").value;
  //Validation check
  const errorEle = document.querySelector(".error_field");
  if (!!nameValue.length) {
    userName = nameValue;
    //Hide and show sections
    infoSec.classList.add("hide");
    gameSec.classList.remove("hide");
    cardGenerator();
  } else {
    errorEle.innerText = "Please enter a user name!";
  }

  //Set the game level
  const levelEle = document.querySelectorAll('input[name="game_level"]');
  const selectedLevel = Array.from(levelEle).find((level) => !!level.checked);
  if (selectedLevel) {
    gameMode = selectedLevel.value;
  }
}

//Generate data
let getData = () => [
  { imgSrc: "./images/beatles.jpeg", id: 1, name: "beatles" },
  { imgSrc: "./images/blink182.jpeg", id: 2, name: "blink 182" },
  { imgSrc: "./images/fkatwigs.jpeg", id: 3, name: "fka twigs" },
  { imgSrc: "./images/fleetwood.jpeg", id: 4, name: "fleetwood" },
  { imgSrc: "./images/joy-division.jpeg", id: 5, name: "joy division" },
  { imgSrc: "./images/ledzep.jpeg", id: 6, name: "lep zeppelin" },
  { imgSrc: "./images/metallica.jpeg", id: 7, name: "metallica" },
  { imgSrc: "./images/pinkfloyd.jpeg", id: 8, name: "pink floyd" },
  { imgSrc: "./images/beatles.jpeg", id: 9, name: "beatles" },
  { imgSrc: "./images/blink182.jpeg", id: 10, name: "blink 182" },
  { imgSrc: "./images/fkatwigs.jpeg", id: 11, name: "fka twigs" },
  { imgSrc: "./images/fleetwood.jpeg", id: 12, name: "fleetwood" },
  { imgSrc: "./images/joy-division.jpeg", id: 13, name: "joy division" },
  { imgSrc: "./images/ledzep.jpeg", id: 14, name: "led zeppelin" },
  { imgSrc: "./images/metallica.jpeg", id: 15, name: "metallica" },
  { imgSrc: "./images/pinkfloyd.jpeg", id: 16, name: "pink floyd" },
];

//Randomize
const randomize = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

//Card Generator function
const cardGenerator = () => {
  const cardData = randomize();

  cardData.forEach((item) => {
    //Generate HTML
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";
    //Attach the info to the cards
    face.src = item.imgSrc;
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
    } else {
      //Remove class
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        //Delaying the second flipp remove
        setTimeout(() => card.classList.remove("toggle_card"), 500);
      });
    }
  }
};

//show final result
const showResult = () => {
  sesult_sec.classList.remove("hide");
  document.getElementById("player_name").innerText = userName;
  document.getElementById("game_level").innerText = gameMode;
};
