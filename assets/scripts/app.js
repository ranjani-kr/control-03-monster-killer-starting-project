const MONSTER_ATTACK_VALUE = 13;
const PLAYER_ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 15;
const HEAL_VALUE = 20;
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

const enteredMaxHealth = prompt('Enter the initial health value', '');

let maxHealth = parseInt(enteredMaxHealth);

if (maxHealth <= 0 || isNaN(maxHealth)) {
  maxHealth = 100;
}

let currentMonsterHealth = maxHealth;

let currentPlayerhealth = maxHealth;

let hasBonusLife = true;

let battleLog = [];

adjustHealthBars(maxHealth);

function writeToLog(event, value, currentPlayerhealth, currentMonsterHealth) {
  let logEntry;
  if (event === LOG_EVENT_PLAYER_ATTACK) {
    logEntry = {
      event: event,
      value: value,
      target: 'MONSTER',
      playerHealthValve: currentPlayerhealth,
      monsterHealthValue: currentMonsterHealth,
    };
  } else if (event === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    logEntry = {
      event: event,
      value: value,
      target: 'MONSTER',
      playerHealthValve: currentPlayerhealth,
      monsterHealthValue: currentMonsterHealth,
    };
  } else if (event === LOG_EVENT_MONSTER_ATTACK) {
    logEntry = {
      event: event,
      value: value,
      terget: 'PLAYER',
      playerHealthValve: currentPlayerhealth,
      monsterHealthValue: currentMonsterHealth,
    };
  } else if (event === LOG_EVENT_PLAYER_HEAL) {
    logEntry = {
      event: event,
      value: value,
      target: 'PLAYER',
      playerHealthValve: currentPlayerhealth,
      monsterHealthValue: currentMonsterHealth,
    };
  } else if (event === LOG_EVENT_GAME_OVER) {
    logEntry = {
      event: event,
      value: value,
      playerHealthValve: currentPlayerhealth,
      monsterHealthValue: currentMonsterHealth,
    };
  }
  battleLog.push(logEntry);
  //console.log(battleLog);
}

function reset() {
  currentMonsterHealth = maxHealth;
  currentMonsterHealth = maxHealth;
  resetGame(maxHealth);
}

function attackMonster(MODE) {
  let event;
  switch (MODE) {
    case PLAYER_ATTACK_VALUE:
      event = LOG_EVENT_PLAYER_ATTACK;
      break;
    case STRONG_ATTACK_VALUE:
      event = LOG_EVENT_PLAYER_STRONG_ATTACK;
      break;
  }

  const initialPlayerHealth = currentPlayerhealth;
  const monsterDamage = dealMonsterDamage(MODE);
  currentMonsterHealth -= monsterDamage;
  writeToLog(event, monsterDamage, currentPlayerhealth, currentMonsterHealth);
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerhealth -= playerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentPlayerhealth,
    currentMonsterHealth
  );

  if (currentPlayerhealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerhealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert('You would be dead but the bonus life saved you!');
  }

  if (currentMonsterHealth <= 0 && currentPlayerhealth > 0) {
    alert('YOU WON!');
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'PLAYER WON',
      currentPlayerhealth,
      currentMonsterHealth
    );
  } else if (currentPlayerhealth <= 0 && currentMonsterHealth > 0) {
    alert('Sorry,You Lost!');
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'MONSTER WON',
      currentPlayerhealth,
      currentMonsterHealth
    );
  } else if (currentMonsterHealth <= 0 && currentPlayerhealth <= 0) {
    alert('It is a draw');
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'A DRAW',
      currentPlayerhealth,
      currentMonsterHealth
    );
  }

  if (currentMonsterHealth <= 0 || currentPlayerhealth <= 0) {
    reset();
  }
}

function attackHandler() {
  attackMonster(PLAYER_ATTACK_VALUE);
}

function strongAttackHandler() {
  attackMonster(STRONG_ATTACK_VALUE);
}

function healHealth() {
  let healValue;
  if (currentPlayerhealth + HEAL_VALUE > maxHealth) {
    alert('Sorry you can not increase your health');
    healValue = 0;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(parseInt(healValue));
  currentPlayerhealth += healValue;
  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    HEAL_VALUE,
    currentPlayerhealth,
    currentMonsterHealth
  );
}

function printLoghandler() {
  console.log(battleLog);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healHealth);
logBtn.addEventListener('click', printLoghandler);
