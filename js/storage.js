const STORAGE_KEY = "football-card-battle-save";
const PROGRESS_STORAGE_KEY = "footballCardProgress";
const PLAYER_STORAGE_KEY = "footballCardPlayer";

const DEFAULT_STATE = {
  coins: 1000,
  xp: 0,
  level: 1,
  victories: 0,
  defeats: 0,
  streak: 0,
  bestStreak: 0,
  collection: CARD_LIBRARY.slice(0, 8).map((card) => card.id),
  deck: CARD_LIBRARY.slice(0, 5).map((card) => card.id),
  selectedDeck: CARD_LIBRARY.slice(0, 5).map((card) => card.id),
  lastPack: [],
  stats: {
    battles: 0,
  },
};

function cloneDefaultState() {
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}

function normalizeCardIds(ids) {
  const validIds = Array.isArray(ids)
    ? ids.filter(
        (id) => typeof id === "string" && Boolean(id) && !!getCardById(id),
      )
    : [];

  return [...new Set(validIds)];
}

function getStorageState() {
  const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
  const legacyRaw = raw ? null : localStorage.getItem(STORAGE_KEY);
  const source = raw || legacyRaw;

  if (!source) {
    const defaults = cloneDefaultState();
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(defaults));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
    return defaults;
  }

  try {
    const parsed = JSON.parse(source);
    const defaults = cloneDefaultState();
    const collection = normalizeCardIds(parsed.collection);
    const deck = normalizeCardIds(parsed.deck);
    const selectedDeck = normalizeCardIds(parsed.selectedDeck);

    const state = {
      ...defaults,
      ...parsed,
      collection: collection.length ? collection : defaults.collection,
      deck: deck.length ? deck : defaults.deck,
      selectedDeck: selectedDeck.length ? selectedDeck : defaults.selectedDeck,
      stats: { ...defaults.stats, ...(parsed.stats || {}) },
    };

    if (raw !== JSON.stringify(state)) {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(state));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }

    return state;
  } catch (error) {
    const defaults = cloneDefaultState();
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(defaults));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
    return defaults;
  }
}

function saveStorageState(state) {
  const sanitized =
    state && typeof state === "object" ? state : cloneDefaultState();
  localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(sanitized));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
  return sanitized;
}

function resetProgress() {
  const defaults = cloneDefaultState();
  localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(defaults));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
  return defaults;
}

function addCoins(amount) {
  const state = getStorageState();
  state.coins += Number(amount || 0);
  saveStorageState(state);
}

function unlockCard(cardId) {
  const state = getStorageState();
  if (!state.collection.includes(cardId)) {
    state.collection.push(cardId);
    saveStorageState(state);
  }
}

function addXp(amount) {
  const state = getStorageState();
  state.xp += Number(amount || 0);
  while (state.xp >= state.level * 250) {
    state.xp -= state.level * 250;
    state.level += 1;
  }
  saveStorageState(state);
  return state.level;
}

function addVictory() {
  const state = getStorageState();
  state.victories += 1;
  state.streak += 1;
  state.bestStreak = Math.max(state.bestStreak, state.streak);
  state.stats.battles += 1;
  saveStorageState(state);
}

function addDefeat() {
  const state = getStorageState();
  state.defeats += 1;
  state.streak = 0;
  state.stats.battles += 1;
  saveStorageState(state);
}

function setDeckSelection(deckIds) {
  const state = getStorageState();
  state.selectedDeck = deckIds.slice(0, 5);
  state.deck = deckIds.slice(0, 5);
  saveStorageState(state);
}
