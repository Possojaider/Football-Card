function getSelectedDeck() {
  const state = getStorageState();
  return (state.selectedDeck || []).slice(0, 5);
}

function setSelectedDeck(ids) {
  const safeIds = Array.from(new Set(ids)).slice(0, 5);
  setDeckSelection(safeIds);
  return safeIds;
}

function addCardToDeck(cardId) {
  const state = getStorageState();
  const deck = (state.selectedDeck || []).slice();
  if (deck.includes(cardId)) {
    return deck;
  }

  if (deck.length >= 5) {
    return deck;
  }

  deck.push(cardId);
  state.selectedDeck = deck;
  state.deck = deck;
  saveStorageState(state);
  return deck;
}

function removeCardFromDeck(cardId) {
  const state = getStorageState();
  const deck = (state.selectedDeck || []).filter((id) => id !== cardId);
  state.selectedDeck = deck;
  state.deck = deck;
  saveStorageState(state);
  return deck;
}

function moveDeckCard(cardId, direction) {
  const state = getStorageState();
  const deck = (state.selectedDeck || []).slice();
  const index = deck.indexOf(cardId);
  if (index === -1) return deck;

  const nextIndex = direction === "up" ? index - 1 : index + 1;
  if (nextIndex < 0 || nextIndex >= deck.length) return deck;

  [deck[index], deck[nextIndex]] = [deck[nextIndex], deck[index]];
  state.selectedDeck = deck;
  state.deck = deck;
  saveStorageState(state);
  return deck;
}

function canStartMatch() {
  const deck = getSelectedDeck();
  return deck.length === 5;
}

function getDefaultCpuDeck() {
  const state = getStorageState();
  const allAvailable = (state.collection || []).slice();
  const pool = [...allAvailable];
  const chosen = [];

  while (chosen.length < 5 && pool.length) {
    const randomIndex = Math.floor(Math.random() * pool.length);
    const cardId = pool.splice(randomIndex, 1)[0];
    const card = getCardById(cardId);
    if (card) {
      chosen.push(initializeCard(card));
    }
  }

  return chosen;
}
