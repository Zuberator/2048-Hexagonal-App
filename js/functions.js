// EVERY EVEN NUMBER = MATH.FLOOR(RANDOM NUMBER / 2 * 2) EXAMPLE: 21 / 2 = 11.5 MATH.FLOOR = 11 * 2 = 22

// WAY 1

// var xhr = new XMLHttpRequest();
// xhr.open("POST", "...URL...");
// xhr.onreadystatechange = function () {
//   if (this.status == 200 && this.readyState == 4) {
//     var data = JSON.parse(this.responseText);
//     console.log(data);
//   }
// };
// xhr.send("[]");

// WAY 2

// const response = fetch("...URL...", {
//   method: "POST",
//   body: `[]`,
// }).then((result) => {
//   console.log(result);
// });

// SETTINGS

// const radius = new URLSearchParams(window.location.search).get('radius')

const url = window.location.href;
const urlParams = new URLSearchParams(window.location.search);
const radius = 2;

if (!url.includes("radius")) {
  urlParams.set("radius", radius);
  window.location.search = urlParams;
}

// VARIABLES

const board = document.getElementById("board");
const fields = document.querySelectorAll(".field");

// RANDOM NUMBER

function random(min, max) {
  const number = Math.floor(Math.random() * (max - min) + min);
  return number;
}

// KEY PRESS HANDLER

document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(event) {
  if (event.keyCode === 81) alert("Klawisz 'Q' został naciśnięty");
  if (event.keyCode === 87) alert("Klawisz 'W' został naciśnięty");
  if (event.keyCode === 69) alert("Klawisz 'E' został naciśnięty");
  if (event.keyCode === 65) alert("Klawisz 'A' został naciśnięty");
  if (event.keyCode === 83) alert("Klawisz 'S' został naciśnięty");
  if (event.keyCode === 68) alert("Klawisz 'D' został naciśnięty");
}

// GENERATE FIELDS BASED ON GAME radius

let numberOfFields = 1;

for (i = 1; i <= radius; i++) {
  value = 6 * (i - 1);
  numberOfFields += value;
}

// BUTTONS

const generateButton = document.querySelector("[data-generate-button]");
generateButton.addEventListener("click", generateNewNumbers);

const populateButton = document.querySelector("[data-populate-all]");
populateButton.addEventListener("click", populateAll);

// MAIN GAME FUNCTION

main();

function main() {
  generateNewNumbers();
}

// GENERATE NEW NUMBER

function generateNewNumbers() {
  let emptyFields = [...fields].filter((x) => !x.classList.contains("active"));
  console.log(emptyFields);

  let randomField = random(0, emptyFields.length - 1);
  console.log(randomField);

  emptyFields[randomField].setAttribute("data-value", [2, 4][random(0, 1.25)]);

  check();
}

// CHECK

function check() {
  fields.forEach((field) => {
    if (field.getAttribute("data-value") == "") {
      field.firstChild.style.background = "#fff";
      field.classList.remove("active");
    } else {
      field.classList.add("active");
      field.firstChild.textContent = field.getAttribute("data-value");
      let log = (5 * Math.log(field.getAttribute("data-value"))) / Math.log(2);
      field.firstChild.style.background = `hsl(${65 - log}, 100%, ${90 - log}%`;
    }
  });
}

// POPULATE ALL

function populateAll() {
  fields.forEach((field, index) => {
    field.setAttribute("data-value", Math.pow(2, index + 1));
  });

  check();
}

// ASK USER FOR BOARD radius

// let radius = prompt("Please enter game board radius", "2");
// DLA 2 = RAZY 1; DLA 3 = RAZY 3; DLA 4 = RAZY 6; DLA 5 = RAZY 9
// FOR radius = 2 NUMBER OF FIELDS = 1 + 6; radius = 3 FIELDS = 1 + 6 + 12; radius = 4 FIELDS = 1 + 6 + 12 + 18; radius = 5 FIELDS = 1 + 6 + 12 + 18 + 24;

// GENERATE BOARD, BASED ON radius

// function generateBoard(radius) {

//   board.style.width = 170 * (radius + 1) + "px";
//   board.style.height = 150 * (radius + 1) + "px";

//   fields.forEach((field, index) => {
//     const x = field.getAttribute("x");
//     const y = field.getAttribute("y");
//     const z = field.getAttribute("z");
//     console.log(index, x, y, z);
//     field.style.left = (+x + 1) * 170 + "px";
//     field.style.top = (+y + 1) * 150 + "px";
//   });
// }

// generateBoard(radius);

// function generateBoard(radius) {
//   for (x = -(radius - 1); x <= radius - 1; x++) {
//     let field = document.createElement("div");
//     field.classList.add("field");
//     field.setAttribute('x', x);
//     field.setAttribute('y', '0');
//     field.setAttribute('z', '0');
//     board.appendChild(field);
//   }

//   for (y = -(radius - 1); y <= radius - 1; y++) {
//     let field = document.createElement("div");
//     field.classList.add("field");
//     field.setAttribute('x', '0');
//     field.setAttribute('y', y);
//     field.setAttribute('z', '0');
//     board.appendChild(field);
//   }
// }

// generateBoard(radius);
