/*-------------------------------- Constants --------------------------------*/
import {
  charizard,
  blastoise,
  venusaur,
  alakazam,
  machamp,
  gengar,
  aggron,
  salamence,
} from "./data.js";

const pokemonLookup = {
  charizard: charizard,
  blastoise: blastoise,
  venusaur: venusaur,
  alakazam: alakazam,
  machamp: machamp,
  gengar: gengar,
  aggron: aggron,
  salamence: salamence,
};

/*---------------------------- Variables (state) ----------------------------*/

let playerPokemon;
let opponentPokemon;
let playerTurn;
let selectedPokemonCard = null;
let selectionPhase = "player";

/*------------------------ Cached Element References ------------------------*/
const selectionScreen = document.querySelector(".selection-screen");
const battleScreen = document.querySelector(".battle-screen");
const resultScreen = document.querySelector(".result-screen");

const selectionTitle = document.querySelector(".selection-title");
const pokemonCards = document.querySelectorAll(".pokemon-card");
const confirmBtn = document.querySelector(".btn.confirm");
const cancelBtn = document.querySelector(".btn.cancel");

const playerCard = document.querySelector(".card.player");
const opponentCard = document.querySelector(".card.opponent");

const playerHpFill = document.querySelector(".card.player .hp-fill");
const opponentHpFill = document.querySelector(".card.opponent .hp-fill");
const playerHpText = document.querySelector(".card.player .hp-text");
const opponentHpText = document.querySelector(".card.opponent .hp-text");

const moveButtons = document.querySelectorAll(".moves .move");
const battleLog = document.querySelector(".panel .log");

const resultMessage = document.querySelector(".result-message p");
const replayBtn = document.querySelector(".result-actions .replay");
const newGameBtn = document.querySelector(".result-actions .new-game");

/*-------------------------------- Functions --------------------------------*/

// core game logic -- works on the console

//A deep copy of an object is a copy whose properties do not share the same references
// (point to the same underlying values) as those of the source object from which the copy was made.

// structuredClone --> deep clone of the pokemon object

// This clone is a deep copy, so modifying playerPokemon won’t affect the original pokemon object
const createPokemon = function (pokemon) {
  return structuredClone(pokemon);
};

const handlePokemonSelection = function (event) {
  // select the card
  const selectedCard = event.currentTarget;

  // remove previous selection --> ensures you cannot select multiple pokemon
  if (selectedPokemonCard && selectedPokemonCard !== selectedCard) {
    selectedPokemonCard.classList.remove("selected");
  }

  // toggle select highlights  when clicking on a card
  selectedCard.classList.toggle("selected");

  // update the global state of selectedPokemonCard --> track which card is cureently being selected
  selectedPokemonCard = selectedCard.classList.contains("selected")
    ? selectedCard
    : null;
};

const handleCancelSelection = function () {
  if (selectedPokemonCard) {
    // remove selected pokemon
    selectedPokemonCard.classList.remove("selected");
    selectedPokemonCard = null;
  }
};

const handleConfirmSelection = function () {
  // no pokemon selected
  if (!selectedPokemonCard) return;
  // select the current pokemon card and stores its name
  const selectedPokemonName =
    selectedPokemonCard.querySelector(".name").textContent;
  console.log(selectedPokemonName);
  if (selectionPhase === "player") {
    playerPokemon = createPokemon(pokemonLookup[selectedPokemonName]);
    console.log(playerPokemon);
    selectionTitle.textContent = "Select Opponent Pokémon";
    selectionPhase = "opponent";

    // clear selection after confirming
    selectedPokemonCard.classList.remove("selected");
    selectedPokemonCard = null;
  } else if (selectionPhase === "opponent") {
    opponentPokemon = createPokemon(pokemonLookup[selectedPokemonName]);
    console.log(opponentPokemon);
    // transition the screen back to battle screen
    selectionScreen.classList.add("hide");
    battleScreen.classList.remove("hide");
  }
};

const calculateDamage = function (attacker, defender, move) {
  // if move has no usage , return 0
  if (move.usage <= 0) return 0;
  // miss hits
  if (Math.random() > move.accuracy) return 0;

  //  formula : damage =  power + attack - defence
  let damage = move.power + attacker.attack - defender.defense;
  if (damage < 0) damage = 0; // prevent negative damage

  // critical hits
  if (Math.random() < move.critical) damage *= 1.5;

  // round down to the nearest integer
  return Math.floor(damage);
};

const applyMove = function (attacker, defender, moveIndex) {
  const move = attacker.moves[moveIndex];
  if (move.usage <= 0) return { damage: 0, move };
  const damage = calculateDamage(attacker, defender, move);

  defender.hp -= damage;
  move.usage -= 1;
  return { damage, move };
};

const logStatus = function () {
  console.log(
    `Player HP: ${playerPokemon.hp}, Opponent HP: ${opponentPokemon.hp}`
  );
};

/*----------------------------- Event Listeners -----------------------------*/

for (let i = 0; i < pokemonCards.length; i++) {
  pokemonCards[i].addEventListener("click", handlePokemonSelection);
}
confirmBtn.addEventListener("click", handleConfirmSelection);
cancelBtn.addEventListener("click", handleCancelSelection);

/*------------------------------ Game setup and battle loop -----------------*/

// // Decide who goes first
// playerTurn = playerPokemon.speed >= opponentPokemon.speed;
// console.log(playerTurn);

// console.log(`Player chose ${playerPokemon.name}!`);
// console.log(`Opponent chose ${opponentPokemon.name}!`);
// console.log(playerTurn ? "Player goes first!" : "Opponent goes first!");

// // Main battle loop
// while (playerPokemon.hp > 0 && opponentPokemon.hp > 0) {
//   if (playerTurn) {
//     // hard code the first move for now
//     const { damage, move } = applyMove(playerPokemon, opponentPokemon, 0);
//     console.log(`Player used : ${move.name} and damage dealt : ${damage}`);
//   } else {
//     const { damage, move } = applyMove(opponentPokemon, playerPokemon, 0);
//     console.log(`Opponent used : ${move.name} and damage dealt : ${damage}`);
//   }

//   // battle logs
//   logStatus();

//   // switch turns
//   playerTurn = !playerTurn;
// }

// // battle outcome
// if (playerPokemon.hp > 0) {
//   console.log("Player wins!");
// } else {
//   console.log("Opponent wins!");
// }

//! things to do next

//todo --> let the player pick a Pokémon instead of hardcoding it.(build UI for pokemon selection)
//todo --> Show HP bars, Pokémon names,Pokemon sprite (image) and move buttons dynamically in the UI (display battle screen)
//todo --> Allow the player to click a move instead of hardcoding the first move . (implement interactive move selection )
//todo --> Randomly pick a move with remaining usage for the opponent (implmenet opponent AI )
//todo --> Update HP bars and text after each move. Update UI dynamicaly
//todo -->  Show battle log messages for each move. Update UI dynamically
// todo -->  Show a “disabled” state for moves with usage <= 0. Update UI dynamically
// todo --> trigger a result screen when either Pokémon HP ≤ 0. Determine win / loss

//todo --> edge cases : all 4 moves has zero usage left

//! defensive coding (error handling)
