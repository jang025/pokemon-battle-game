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
let selectedPokemonCard = null;
let selectionPhase = "player";
let playerTurn;

/*------------------------ Cached Element References ------------------------*/
const selectionScreen = document.querySelector(".selection-screen");
const battleScreen = document.querySelector(".battle-screen");
const resultScreen = document.querySelector(".result-screen");

const selectionTitle = document.querySelector(".selection-title");
const pokemonCards = document.querySelectorAll(".pokemon-card");
const confirmBtn = document.querySelector(".btn.confirm");
const cancelBtn = document.querySelector(".btn.cancel");

const playerName = document.querySelector(".card.player .name");
const playerSprite = document.querySelector(".card.player .pokemon-sprite img");
const playerHpFill = document.querySelector(".card.player .hp-fill");
const playerHpText = document.querySelector(".card.player .hp-text");

const opponentName = document.querySelector(".card.opponent .name");
const opponentSprite = document.querySelector(
  ".card.opponent .pokemon-sprite img"
);
const opponentHpFill = document.querySelector(".card.opponent .hp-fill");
const opponentHpText = document.querySelector(".card.opponent .hp-text");
const moveButtons = document.querySelectorAll(".moves .move");
const battleLog = document.querySelector(".battle-log");

const resultMessage = document.querySelector(".result-message");
const replayBtn = document.querySelector(".result-actions .replay");
const newGameBtn = document.querySelector(".result-actions .new-game");

/*-------------------------------- Functions --------------------------------*/

//A deep copy of an object is a copy whose properties do not share the same references
// (point to the same underlying values) as those of the source object from which the copy was made.
// structuredClone --> deep clone of the pokemon object
// This clone is a deep copy, so modifying playerPokemon and opponentPokemon won’t affect the original pokemon object
//! create deep clone of pokemon object so as to not mutate the original pokemon object
const createPokemon = function (pokemon) {
  return structuredClone(pokemon);
};

//! function to select pokemon
const handlePokemonSelection = function (event) {
  // select the pokemon card you attached the listener to so must use currentTarget
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

//! function for cancel button
const handleCancelSelection = function () {
  if (selectedPokemonCard) {
    // remove selected pokemon
    selectedPokemonCard.classList.remove("selected");
    selectedPokemonCard = null;
  }
};

//! function for confirm button
const handleConfirmSelection = function () {
  // no pokemon selected
  if (!selectedPokemonCard) return;
  // select the current pokemon card and stores its name
  const selectedPokemonName =
    selectedPokemonCard.querySelector(".name").textContent;

  // update state of player pokemon to selected pokemon
  if (selectionPhase === "player") {
    playerPokemon = createPokemon(pokemonLookup[selectedPokemonName]);
    selectionTitle.textContent = "Select Opponent Pokémon";
    selectionPhase = "opponent";
    // clear selection after confirming
    selectedPokemonCard.classList.remove("selected");
    selectedPokemonCard = null;
  } else if (selectionPhase === "opponent") {
    // update state of opponent pokemon to selected pokemon
    opponentPokemon = createPokemon(pokemonLookup[selectedPokemonName]);

    // store max HP for both Pokémon
    playerPokemon.maxHp = playerPokemon.hp;
    opponentPokemon.maxHp = opponentPokemon.hp;
    // transition the screen to battle screen
    selectionScreen.classList.add("hide");
    battleScreen.classList.remove("hide");
    // Battle Set up
    setUpBattle(playerPokemon, opponentPokemon);
  }
};

//todo --> start up battle after pressing the confirm button
const setUpBattle = function (playerPokemon, opponentPokemon) {
  // Store max HP
  if (!playerPokemon.maxHp) playerPokemon.maxHp = playerPokemon.hp;
  if (!opponentPokemon.maxHp) opponentPokemon.maxHp = opponentPokemon.hp;
  // populate player
  playerName.textContent = playerPokemon.name;
  playerSprite.src = `./sprites/${playerPokemon.name}.png`;
  playerHpFill.style.width = "100%";
  playerHpText.textContent = `${playerPokemon.hp} / ${playerPokemon.hp}`;

  // populate opponent
  opponentName.textContent = opponentPokemon.name;
  opponentSprite.src = `./sprites/${opponentPokemon.name}.png`;
  opponentHpFill.style.width = "100%";
  opponentHpText.textContent = `${opponentPokemon.hp} / ${opponentPokemon.hp}`;

  //populate moves
  playerPokemon.moves.forEach((move, index) => {
    const btn = moveButtons[index];
    btn.textContent = move.name; // set move name
    btn.disabled = move.usage <= 0; // disable if usage is 0
    btn.style.opacity = btn.disabled ? 0.5 : 1; // visually indicate disabled moves
    // Store max usage
    if (move.maxUsage === undefined) move.maxUsage = move.usage;
  });

  // Reset battle log
  battleLog.textContent = "";

  // set turn based on speed
  playerTurn = playerPokemon.speed >= opponentPokemon.speed;
  addBattleLog(
    playerTurn
      ? `${playerPokemon.name} is faster! You go first!`
      : `${opponentPokemon.name} is faster! Opponent goes first!`
  );
  // disable moves if opp start first  OR  enable moves if player start first
  setMoveButtonsState(playerTurn);

  // opponent turn (delay of 3s)
  if (!playerTurn) setTimeout(opponentTurn, 3000);
};

//! utility/Helper  function -->  Add message to battle logs
const addBattleLog = function (msg) {
  const p = document.createElement("p");
  p.textContent = msg;
  battleLog.appendChild(p);
  //forces the scrollbar to jump to the bottom — ensuring the latest message is always visible
  battleLog.scrollTop = battleLog.scrollHeight;
};

//! Helper function -->  Update HP bars dynamically
const updateHpBars = function () {
  playerHpFill.style.width = `${
    (playerPokemon.hp / playerPokemon.maxHp) * 100
  }%`;
  playerHpText.textContent = `${playerPokemon.hp} / ${playerPokemon.maxHp}`;

  opponentHpFill.style.width = `${
    (opponentPokemon.hp / opponentPokemon.maxHp) * 100
  }%`;
  opponentHpText.textContent = `${opponentPokemon.hp} / ${opponentPokemon.maxHp}`;
};

//! Helper function -->  Enable/disable move buttons
const setMoveButtonsState = function (enabled) {
  moveButtons.forEach((btn, i) => {
    btn.disabled = playerPokemon.moves[i].usage <= 0;
    btn.style.opacity = !enabled || btn.disabled ? 0.5 : 1;
  });
};

//! End battle and show result screen
const endBattle = function (result) {
  // transition to result screen
  resultScreen.classList.remove("hide");
  battleScreen.classList.add("hide");
  resultMessage.textContent = result === "win" ? "You Win!" : "You Lose!";
};

//! Helper function --> calculate damage
const calculateDamage = function (attacker, defender, move) {
  // if move has no usage , return 0
  if (move.usage <= 0) return 0;
  // miss hits
  if (Math.random() > move.accuracy) {
    addBattleLog(`${attacker.name}'s ${move.name} missed!`);
    return 0;
  }
  //  formula : damage =  power + attack - defence
  let damage = move.power + attacker.attack - defender.defense;
  if (damage < 0) damage = 0; // prevent negative damage

  // critical hits
  if (Math.random() < move.critical) damage *= 1.5;

  // round down to the nearest integer
  return Math.floor(damage);
};

//! Apply move
const applyMove = function (attacker, defender, moveIndex) {
  const move = attacker.moves[moveIndex];
  if (move.usage <= 0) return { damage: 0, move };
  const damage = calculateDamage(attacker, defender, move);
  // ensure no negative hp
  defender.hp = Math.max(defender.hp - damage, 0);
  move.usage -= 1;
  return { damage, move };
};

//todo opponent move --> opponent AI functionality
const opponentTurn = function () {
  // check if the move is available
  const moveIndex = Math.floor(Math.random() * opponentPokemon.moves.length);
  const { damage, move } = applyMove(opponentPokemon, playerPokemon, moveIndex);

  updateHpBars();
  addBattleLog(
    `${opponentPokemon.name} used ${move.name}! It dealt ${damage} damage.`
  );

  if (playerPokemon.hp <= 0) {
    endBattle("lose");
    return;
  }
  // switch turns
  playerTurn = true;
  setMoveButtonsState(playerTurn);
};

//todo player's move. --> move button functionality
const handleMoveSelection = function (moveIndex) {
  if (!playerTurn) return;

  const move = playerPokemon.moves[moveIndex];
  if (move.usage <= 0) {
    addBattleLog(
      `${playerPokemon.name} tried to use ${move.name}, but it has no usage left!`
    );
    return;
  }

  const { damage, move: usedMove } = applyMove(
    playerPokemon,
    opponentPokemon,
    moveIndex
  );
  updateHpBars();
  addBattleLog(
    `${playerPokemon.name} used ${usedMove.name}! It dealt ${damage} damage.`
  );

  if (opponentPokemon.hp <= 0) {
    endBattle("win");
    return;
  }

  // Switch turns
  playerTurn = false;
  setMoveButtonsState(playerTurn);
  // 3s delay
  setTimeout(opponentTurn, 3000);
};

//** replay starts from the battle screen with the same selected pokemon(reset button functionality)
const handleReplayButton = function () {
  // Hide result screen, show battle screen
  resultScreen.classList.add("hide");
  battleScreen.classList.remove("hide");

  // Reset Pokémon HP
  playerPokemon.hp = playerPokemon.maxHp;
  opponentPokemon.hp = opponentPokemon.maxHp;

  // Reset moves usage
  playerPokemon.moves.forEach((move) => (move.usage = move.maxUsage));
  opponentPokemon.moves.forEach((move) => (move.usage = move.maxUsage));

  // Reset player turn based on speed
  playerTurn = playerPokemon.speed >= opponentPokemon.speed;

  // Reset UI
  battleLog.textContent = "";
  setUpBattle(playerPokemon, opponentPokemon);
};
//**  new game starts from the selection screen again(new game functionality)
const handleNewGameButton = function () {
  // Hide result and battle screens, show selection screen
  resultScreen.classList.add("hide");
  battleScreen.classList.add("hide");
  selectionScreen.classList.remove("hide");

  // Reset selection phase and selected Pokémon
  selectionPhase = "player";
  selectedPokemonCard = null;
  playerPokemon = null;
  opponentPokemon = null;
  battleLog.textContent = "";
  selectionTitle.textContent = "Select Your Pokémon";
  // Clear any previous selection
  pokemonCards.forEach((card) => card.classList.remove("selected"));
};

/*----------------------------- Event Listeners -----------------------------*/

for (let i = 0; i < pokemonCards.length; i++) {
  pokemonCards[i].addEventListener("click", handlePokemonSelection);
}
confirmBtn.addEventListener("click", handleConfirmSelection);
cancelBtn.addEventListener("click", handleCancelSelection);

for (let i = 0; i < moveButtons.length; i++) {
  moveButtons[i].addEventListener("click", () => {
    handleMoveSelection(i);
  });
}

replayBtn.addEventListener("click", handleReplayButton);
newGameBtn.addEventListener("click", handleNewGameButton);
