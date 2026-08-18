const GameState = {
  activeScreen: "home",
  activeDeck: [],
  cpuDeck: [],
  playerDeck: [],
  playerCurrentCard: null,
  cpuCurrentCard: null,
  currentRound: 1,
  playerEliminated: 0,
  cpuEliminated: 0,
  playerHp: 100,
  cpuHp: 100,
  isBattleActive: false,
  winner: null,
  playerReady: false,
  matchOver: false,
  lastResult: null,
  lastPlayerCardIndex: 0,
  lastCpuCardIndex: 0,
};

function initializeCard(card) {
  if (!card) return null;

  const baseCard = { ...card };
  baseCard.vidaMaxima = 100;
  baseCard.vidaActual = 100;
  baseCard.eliminada = false;

  return baseCard;
}

function eliminateCard(card) {
  if (!card) return;

  card.vidaActual = 0;
  card.eliminada = true;
}

function resetNewCard(card) {
  if (!card) return;

  card.vidaMaxima = 100;
  card.vidaActual = 100;
  card.eliminada = false;
}

function initializeGameState() {
  const state = getStorageState();
  const playerDeckIds = (state.selectedDeck || []).slice(0, 5);
  GameState.activeDeck = playerDeckIds.slice();
  GameState.playerDeck = playerDeckIds
    .map((id) => initializeCard(getCardById(id)))
    .filter(Boolean);
  GameState.cpuDeck = getDefaultCpuDeck();
  GameState.playerEliminated = 0;
  GameState.cpuEliminated = 0;
  GameState.playerHp = 100;
  GameState.cpuHp = 100;
  GameState.currentRound = 1;
  GameState.isBattleActive = false;
  GameState.matchOver = false;
  GameState.winner = null;
  GameState.playerCurrentCard = GameState.playerDeck[0] || null;
  GameState.cpuCurrentCard = GameState.cpuDeck[0] || null;
  if (GameState.playerCurrentCard) resetNewCard(GameState.playerCurrentCard);
  if (GameState.cpuCurrentCard) resetNewCard(GameState.cpuCurrentCard);
  GameState.lastPlayerCardIndex = 0;
  GameState.lastCpuCardIndex = 0;
}

function startMatch() {
  if (!canStartMatch()) {
    showToast("Debes tener exactamente 5 cartas en tu mazo.", "warning");
    playUiSound("lose");
    return;
  }

  const state = getStorageState();
  const deck = (state.selectedDeck || []).slice(0, 5);
  GameState.activeDeck = deck.slice();
  GameState.playerDeck = deck
    .map((id) => initializeCard(getCardById(id)))
    .filter(Boolean);
  GameState.cpuDeck = getDefaultCpuDeck();
  GameState.playerEliminated = 0;
  GameState.cpuEliminated = 0;
  GameState.playerHp = 100;
  GameState.cpuHp = 100;
  GameState.currentRound = 1;
  GameState.matchOver = false;
  GameState.winner = null;
  GameState.isBattleActive = true;
  GameState.playerCurrentCard = GameState.playerDeck[0] || null;
  GameState.cpuCurrentCard = GameState.cpuDeck[0] || null;
  if (GameState.playerCurrentCard) resetNewCard(GameState.playerCurrentCard);
  if (GameState.cpuCurrentCard) resetNewCard(GameState.cpuCurrentCard);
  GameState.playerHp = GameState.playerCurrentCard?.vidaActual ?? 100;
  GameState.cpuHp = GameState.cpuCurrentCard?.vidaActual ?? 100;
  GameState.lastPlayerCardIndex = 0;
  GameState.lastCpuCardIndex = 0;
  playUiSound("start");
  showScreen("battle");
  renderBattle();
}

function nextPlayerCard() {
  if (!GameState.playerDeck.length) {
    GameState.playerCurrentCard = null;
    return;
  }

  GameState.playerCurrentCard = GameState.playerDeck[0];
  resetNewCard(GameState.playerCurrentCard);
  GameState.playerHp = GameState.playerCurrentCard.vidaActual;
}

function nextCpuCard() {
  if (!GameState.cpuDeck.length) {
    GameState.cpuCurrentCard = null;
    return;
  }

  GameState.cpuCurrentCard = GameState.cpuDeck[0];
  resetNewCard(GameState.cpuCurrentCard);
  GameState.cpuHp = GameState.cpuCurrentCard.vidaActual;
}

function nextCard(side) {
  if (side === "player") {
    nextPlayerCard();
    return;
  }

  nextCpuCard();
}

function getPlayerRemainingCards() {
  return GameState.playerDeck.length;
}

function getCpuRemainingCards() {
  return GameState.cpuDeck.length;
}

function checkGameOver() {
  if (getPlayerRemainingCards() === 0) {
    GameState.winner = "cpu";
    GameState.matchOver = true;
    finalizeBattle("cpu");
    return true;
  }

  if (getCpuRemainingCards() === 0) {
    GameState.winner = "player";
    GameState.matchOver = true;
    finalizeBattle("player");
    return true;
  }

  return false;
}

function checkMatchEnd() {
  return checkGameOver();
}

function showDamageEffect(side, amount) {
  const target = document.querySelector(`#${side}-card-box .card-visual`);
  if (!target) return;

  const pop = document.createElement("div");
  pop.className = "damage-pop";
  pop.textContent = `-${amount}`;
  pop.style.left = side === "player" ? "56%" : "44%";
  target.appendChild(pop);

  setTimeout(() => pop.remove(), 700);
}

function handleBattleResult(winner) {
  const playerCardEl = document.querySelector("#player-card-box .card-visual");
  const cpuCardEl = document.querySelector("#cpu-card-box .card-visual");

  if (winner === "player") {
    const defeatedCard = GameState.cpuCurrentCard;
    GameState.cpuEliminated += 1;
    eliminateCard(defeatedCard);

    const defeatedIndex = GameState.cpuDeck.indexOf(defeatedCard);
    if (defeatedIndex >= 0) {
      GameState.cpuDeck.splice(defeatedIndex, 1);
    }

    GameState.cpuCurrentCard = GameState.cpuDeck[0] || null;
    if (GameState.cpuCurrentCard) {
      resetNewCard(GameState.cpuCurrentCard);
      GameState.cpuHp = GameState.cpuCurrentCard.vidaActual;
      GameState.currentRound += 1;
    }

    GameState.lastResult = {
      winner: "player",
      playerCard: GameState.playerCurrentCard,
      cpuCard: defeatedCard,
    };
    document.querySelector("#battle-status").innerHTML =
      `🏆 ¡VICTORIA!<br>${GameState.playerCurrentCard.name} derrotó a ${defeatedCard ? defeatedCard.name : "al rival"}`;
    if (playerCardEl) playerCardEl.classList.add("victory");
    if (cpuCardEl) cpuCardEl.classList.add("defeat");
  } else {
    const defeatedCard = GameState.playerCurrentCard;
    GameState.playerEliminated += 1;
    eliminateCard(defeatedCard);

    const defeatedIndex = GameState.playerDeck.indexOf(defeatedCard);
    if (defeatedIndex >= 0) {
      GameState.playerDeck.splice(defeatedIndex, 1);
    }

    GameState.playerCurrentCard = GameState.playerDeck[0] || null;
    if (GameState.playerCurrentCard) {
      resetNewCard(GameState.playerCurrentCard);
      GameState.playerHp = GameState.playerCurrentCard.vidaActual;
      GameState.currentRound += 1;
    }

    GameState.lastResult = {
      winner: "cpu",
      playerCard: defeatedCard,
      cpuCard: GameState.cpuCurrentCard,
    };
    document.querySelector("#battle-status").innerHTML =
      `💀 DERROTA<br>${GameState.cpuCurrentCard.name} derrotó a ${defeatedCard ? defeatedCard.name : "tu carta"}`;
    if (playerCardEl) playerCardEl.classList.add("defeat");
    if (cpuCardEl) cpuCardEl.classList.add("victory");
  }

  setTimeout(() => {
    if (checkGameOver()) return;
    renderBattle();
  }, 900);
}

function resolveCombat() {
  if (
    !GameState.playerCurrentCard ||
    !GameState.cpuCurrentCard ||
    GameState.matchOver ||
    getPlayerRemainingCards() === 0 ||
    getCpuRemainingCards() === 0
  ) {
    return;
  }

  const result = getCombatResult(
    GameState.playerCurrentCard,
    GameState.cpuCurrentCard,
  );
  const playerCardEl = document.querySelector("#player-card-box .card-visual");
  const cpuCardEl = document.querySelector("#cpu-card-box .card-visual");

  if (playerCardEl) playerCardEl.classList.add("attack");
  if (cpuCardEl) cpuCardEl.classList.add("attack");

  GameState.playerHp = Number(GameState.playerCurrentCard.vidaActual ?? 100);
  GameState.cpuHp = Number(GameState.cpuCurrentCard.vidaActual ?? 100);
  const steps = 4;

  let tick = 0;

  const applyTick = () => {
    tick += 1;
    let damage = 0;

    if (result.winner === "player") {
      const powerGap = Math.max(0, result.playerFinal - result.cpuFinal);
      damage = Math.max(
        12,
        Math.round(result.playerDamage * (0.65 + tick * 0.2) + powerGap * 0.08),
      );
      GameState.cpuHp = Math.max(0, GameState.cpuHp - damage);
      GameState.cpuCurrentCard.vidaActual = GameState.cpuHp;
      GameState.cpuCurrentCard.vidaActual = Math.max(
        0,
        GameState.cpuCurrentCard.vidaActual,
      );
      showDamageEffect("cpu", damage);
      document.querySelector("#battle-status").innerHTML =
        `⚔️ ${GameState.playerCurrentCard.name} golpea.<br>Daño: ${damage}<br>Vida rival: ${GameState.cpuHp}/${GameState.cpuCurrentCard.vidaMaxima || 100}`;
      updateBattleHealthBars();

      if (GameState.cpuHp <= 0) {
        eliminateCard(GameState.cpuCurrentCard);
        handleBattleResult("player");
        return;
      }
    } else {
      const powerGap = Math.max(0, result.cpuFinal - result.playerFinal);
      damage = Math.max(
        12,
        Math.round(result.cpuDamage * (0.65 + tick * 0.2) + powerGap * 0.08),
      );
      GameState.playerHp = Math.max(0, GameState.playerHp - damage);
      GameState.playerCurrentCard.vidaActual = GameState.playerHp;
      GameState.playerCurrentCard.vidaActual = Math.max(
        0,
        GameState.playerCurrentCard.vidaActual,
      );
      showDamageEffect("player", damage);
      document.querySelector("#battle-status").innerHTML =
        `💥 ${GameState.cpuCurrentCard.name} responde.<br>Daño: ${damage}<br>Vida tuya: ${GameState.playerHp}/${GameState.playerCurrentCard.vidaMaxima || 100}`;
      updateBattleHealthBars();

      if (GameState.playerHp <= 0) {
        eliminateCard(GameState.playerCurrentCard);
        handleBattleResult("cpu");
        return;
      }
    }

    if (tick < steps) {
      setTimeout(applyTick, 420);
      return;
    }

    handleBattleResult(result.winner);
  };

  playUiSound(result.winner === "player" ? "win" : "lose");
  applyTick();
}

function finalizeBattle(winner) {
  const state = getStorageState();
  const rewardCoins = winner === "player" ? 100 : 40;
  const rewardXp = winner === "player" ? 100 : 40;

  if (winner === "player") {
    state.coins += rewardCoins;
    addXp(rewardXp);
    if (state.streak === undefined) state.streak = 0;
    state.streak += 1;
    state.victories += 1;
    state.stats.battles += 1;
    if (state.streak >= 3) state.coins += 50;
    if (state.streak >= 5) state.coins += 100;
  } else {
    state.coins += rewardCoins;
    addXp(rewardXp);
    state.defeats += 1;
    state.streak = 0;
    state.stats.battles += 1;
  }

  saveStorageState(state);
  updateHeader();
  updateStatsPanel();

  const statusText = winner === "player" ? "🏆 ¡VICTORIA!" : "💀 DERROTA";
  const finalMessage =
    winner === "player"
      ? "Has ganado el partido y recibes +100 monedas y +100 XP."
      : "Has perdido el partido y recibes +40 monedas y +40 XP.";

  document.querySelector("#battle-status").innerHTML =
    `${statusText}<br>${finalMessage}`;
  document.getElementById("btn-combat").disabled = true;
  showToast(finalMessage, winner === "player" ? "success" : "info");
}

function updateBattleHealthBars() {
  const playerBar = document.querySelector("#player-card-box .bar-fill");
  const cpuBar = document.querySelector("#cpu-card-box .bar-fill");

  if (playerBar) {
    const playerHealth = Math.max(0, GameState.playerHp);
    playerBar.style.width = `${playerHealth}%`;
    playerBar.style.background =
      playerHealth > 35
        ? "linear-gradient(90deg, #3ce19d, #9ef7c7 100%)"
        : "linear-gradient(90deg, #f7b267, #ff5d66 100%)";
    playerBar
      .closest(".bar-bg")
      ?.classList.toggle("low-health", playerHealth <= 35);
  }

  if (cpuBar) {
    const cpuHealth = Math.max(0, GameState.cpuHp);
    cpuBar.style.width = `${cpuHealth}%`;
    cpuBar.style.background =
      cpuHealth > 35
        ? "linear-gradient(90deg, #3ce19d, #9ef7c7 100%)"
        : "linear-gradient(90deg, #f7b267, #ff5d66 100%)";
    cpuBar.closest(".bar-bg")?.classList.toggle("low-health", cpuHealth <= 35);
  }
}

function renderBattle() {
  const playerCard = GameState.playerCurrentCard;
  const cpuCard = GameState.cpuCurrentCard;

  document.getElementById("battle-round").textContent = GameState.currentRound;
  document.getElementById("player-score").textContent =
    GameState.playerEliminated;
  document.getElementById("cpu-score").textContent = GameState.cpuEliminated;

  document.getElementById("player-card-box").innerHTML = playerCard
    ? renderBattleCard(playerCard, "player", "", GameState.playerHp)
    : '<div class="card-visual empty">...</div>';
  document.getElementById("cpu-card-box").innerHTML = cpuCard
    ? renderBattleCard(cpuCard, "cpu", "", GameState.cpuHp)
    : '<div class="card-visual empty">...</div>';

  updateBattleHealthBars();

  const playerRemaining = GameState.playerDeck
    .map((id) => "<span>🃏</span>")
    .join("");
  const cpuRemaining = GameState.cpuDeck
    .map((id) => "<span>🃏</span>")
    .join("");

  document.getElementById("player-remaining").innerHTML =
    playerRemaining || "Sin cartas";
  document.getElementById("cpu-remaining").innerHTML =
    cpuRemaining || "Sin cartas";

  document.getElementById("btn-combat").disabled =
    GameState.matchOver || !playerCard || !cpuCard;

  if (GameState.matchOver) {
    document.getElementById("battle-status").textContent =
      GameState.winner === "player"
        ? "🏆 PARTIDO GANADO"
        : "💀 PARTIDO PERDIDO";
    return;
  }

  if (playerCard && cpuCard) {
    document.getElementById("battle-status").textContent =
      "Listos para combatir";
  }
}

function setupBattleEvents() {
  document.getElementById("btn-combat").addEventListener("click", () => {
    if (GameState.matchOver) return;
    resolveCombat();
  });
}

function createRandomCpuDeck() {
  const ids = [];
  const pool = CARD_LIBRARY.map((card) => card.id);
  while (ids.length < 5 && pool.length) {
    const randomIndex = Math.floor(Math.random() * pool.length);
    ids.push(pool.splice(randomIndex, 1)[0]);
  }
  return ids;
}

function showScreen(screenName) {
  const screens = document.querySelectorAll(".screen");
  screens.forEach((screen) =>
    screen.classList.toggle("active", screen.id === `screen-${screenName}`),
  );
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.screen === screenName);
  });
  GameState.activeScreen = screenName;
  playUiSound("screen");
}

function addToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.getElementById("toast-container").appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 2400);
}

function showToast(message, type = "info") {
  addToast(message, type);
  if (type === "success") {
    playUiSound("win");
  } else if (type === "warning") {
    playUiSound("lose");
  }
}
