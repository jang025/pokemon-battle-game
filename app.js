/*-------------------------------- Constants --------------------------------*/
const charizard = {
  name: "charizard",
  hp: 90,
  attack: 100,
  defense: 80,
  speed: 130,
  moves: [
    {
      name: "flamethrower",
      power: 25,
      usage: 5,
      critical: 0.05,
      accuracy: 0.9,
    },
    {
      name: "wing attack",
      power: 15,
      usage: 10,
      critical: 0.1,
      accuracy: 0.95,
    },
    { name: "fire spin", power: 20, usage: 6, critical: 0.05, accuracy: 0.85 },
    { name: "slash", power: 18, usage: 8, critical: 0.15, accuracy: 0.95 },
  ],
};

const blastoise = {
  name: "blastoise",
  hp: 110,
  attack: 90,
  defense: 100,
  speed: 100,
  moves: [
    { name: "hydro pump", power: 30, usage: 4, critical: 0.05, accuracy: 0.85 },
    { name: "bite", power: 15, usage: 10, critical: 0.15, accuracy: 0.95 },
    { name: "surf", power: 25, usage: 5, critical: 0.05, accuracy: 0.9 },
    { name: "rapid spin", power: 15, usage: 10, critical: 0.1, accuracy: 0.95 },
  ],
};

const venusaur = {
  name: "venusaur",
  hp: 100,
  attack: 90,
  defense: 110,
  speed: 100,
  moves: [
    { name: "solar beam", power: 30, usage: 4, critical: 0.05, accuracy: 0.85 },
    { name: "vine whip", power: 12, usage: 12, critical: 0.15, accuracy: 0.95 },
    { name: "sludge bomb", power: 25, usage: 5, critical: 0.05, accuracy: 0.9 },
    { name: "razor leaf", power: 15, usage: 10, critical: 0.1, accuracy: 0.95 },
  ],
};

const alakazam = {
  name: "alakazam",
  hp: 70,
  attack: 80,
  defense: 70,
  speed: 180,
  moves: [
    { name: "psychic", power: 30, usage: 4, critical: 0.05, accuracy: 0.9 },
    { name: "psybeam", power: 15, usage: 12, critical: 0.1, accuracy: 0.95 },
    { name: "shadow ball", power: 25, usage: 5, critical: 0.05, accuracy: 0.9 },
    { name: "confusion", power: 15, usage: 10, critical: 0.1, accuracy: 0.95 },
  ],
};

const machamp = {
  name: "machamp",
  hp: 100,
  attack: 150,
  defense: 80,
  speed: 70,
  moves: [
    {
      name: "dynamic punch",
      power: 35,
      usage: 4,
      critical: 0.05,
      accuracy: 0.85,
    },
    {
      name: "karate chop",
      power: 15,
      usage: 10,
      critical: 0.15,
      accuracy: 0.95,
    },
    { name: "cross chop", power: 25, usage: 5, critical: 0.05, accuracy: 0.9 },
    {
      name: "seismic toss",
      power: 20,
      usage: 8,
      critical: 0.1,
      accuracy: 0.95,
    },
  ],
};

const gengar = {
  name: "gengar",
  hp: 80,
  attack: 90,
  defense: 80,
  speed: 150,
  moves: [
    { name: "shadow ball", power: 25, usage: 5, critical: 0.05, accuracy: 0.9 },
    { name: "dark pulse", power: 15, usage: 12, critical: 0.1, accuracy: 0.95 },
    { name: "dream eater", power: 20, usage: 6, critical: 0.05, accuracy: 0.9 },
    {
      name: "night shade",
      power: 15,
      usage: 10,
      critical: 0.1,
      accuracy: 0.95,
    },
  ],
};

const aggron = {
  name: "aggron",
  hp: 120,
  attack: 120,
  defense: 110,
  speed: 50,
  moves: [
    { name: "iron tail", power: 30, usage: 5, critical: 0.05, accuracy: 0.85 },
    { name: "head smash", power: 35, usage: 3, critical: 0.05, accuracy: 0.8 },
    { name: "earthquake", power: 30, usage: 4, critical: 0.05, accuracy: 0.9 },
    { name: "rock slide", power: 20, usage: 6, critical: 0.05, accuracy: 0.9 },
  ],
};

const salamence = {
  name: "salamence",
  hp: 100,
  attack: 130,
  defense: 80,
  speed: 90,
  moves: [
    { name: "dragon claw", power: 25, usage: 5, critical: 0.05, accuracy: 0.9 },
    { name: "fly", power: 20, usage: 6, critical: 0.1, accuracy: 0.9 },
    { name: "hyper beam", power: 35, usage: 3, critical: 0.05, accuracy: 0.85 },
    { name: "dragon rush", power: 25, usage: 5, critical: 0.05, accuracy: 0.9 },
  ],
};

/*---------------------------- Variables (state) ----------------------------*/

let playerPokemon;
let opponentPokemon;
let playerTurn;

/*------------------------ Cached Element References ------------------------*/
// const selectionScreen = document.querySelector(".selection-screen");
// const battleScreen = document.querySelector(".battle-screen");
// const resultScreen = document.querySelector(".result-screen");

// const pokemonCards = document.querySelectorAll(".pokemon-card");
// const confirmBtn = document.querySelector(".selection-actions .confirm");
// const cancelBtn = document.querySelector(".selection-actions .cancel");

// const playerCard = document.querySelector(".card.player");
// const opponentCard = document.querySelector(".card.opponent");

// const playerHpFill = playerCard.querySelector(".hp-fill");
// const opponentHpFill = opponentCard.querySelector(".hp-fill");
// const playerHpText = playerCard.querySelector(".hp-text");
// const opponentHpText = opponentCard.querySelector(".hp-text");

// const moveButtons = document.querySelectorAll(".moves .move");
// const battleLog = document.querySelector(".panel .log");

// const resultMessage = document.querySelector(".result-message p");
// const replayBtn = document.querySelector(".result-actions .replay");
// const newGameBtn = document.querySelector(".result-actions .new-game");

/*-------------------------------- Functions --------------------------------*/

// core game logic -- works on the console

//A deep copy of an object is a copy whose properties do not share the same references
// (point to the same underlying values) as those of the source object from which the copy was made.

// structuredClone --> deep clone of the pokemon object

// This clone is a deep copy, so modifying playerPokemon won’t affect the original pokemon object
const createPokemon = function (pokemon) {
  return structuredClone(pokemon);
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

/*------------------------------ Game setup and battle loop -----------------*/
playerPokemon = createPokemon(charizard);
console.log(playerPokemon);
opponentPokemon = createPokemon(salamence);
console.log(opponentPokemon);

// Decide who goes first
playerTurn = playerPokemon.speed >= opponentPokemon.speed;
console.log(playerTurn);

console.log(`Player chose ${playerPokemon.name}!`);
console.log(`Opponent chose ${opponentPokemon.name}!`);
console.log(playerTurn ? "Player goes first!" : "Opponent goes first!");

// Main battle loop
while (playerPokemon.hp > 0 && opponentPokemon.hp > 0) {
  if (playerTurn) {
    // hard code the first move for now
    const { damage, move } = applyMove(playerPokemon, opponentPokemon, 0);
    console.log(`Player used : ${move.name} and damage dealt : ${damage}`);
  } else {
    const { damage, move } = applyMove(opponentPokemon, playerPokemon, 0);
    console.log(`Opponent used : ${move.name} and damage dealt : ${damage}`);
  }

  // battle logs
  logStatus();

  // switch turns
  playerTurn = !playerTurn;
}

// battle outcome
if (playerPokemon.hp > 0) {
  console.log("Player wins!");
} else {
  console.log("Opponent wins!");
}

/*----------------------------- Event Listeners -----------------------------*/

//! things to do next

//todo --> let the player pick a Pokémon instead of hardcoding it.(build UI for pokemon selection)
//todo --> Show HP bars, Pokémon names,Pokemon sprite (image) and move buttons dynamically in the UI (display battle screen)
//todo --> Allow the player to click a move instead of hardcoding the first move . (implement interactive move selection )
//todo --> Randomly pick a move with remaining usage for the opponent (implmenet opponent AI )
//todo --> Update HP bars and text after each move. Update UI dynamicaly
//todo -->  Show battle log messages for each move. Update UI dynamically
// todo -->  Show a “disabled” state for moves with usage <= 0. Update UI dynamically
// todo --> trigger a result screen when either Pokémon HP ≤ 0. Determine win / loss
// todo --> animation for attacks (UI / UX enhancement)

//todo --> edge cases : all 4 moves has zero usage left
