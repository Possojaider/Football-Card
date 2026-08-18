document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
});

const AVATAR_OPTIONS = [
  {
    id: "avatar-01",
    name: "Futbolista",
    src: "assets/images/avatars/avatar-01.svg",
  },
  {
    id: "avatar-02",
    name: "Fuego",
    src: "assets/images/avatars/avatar-02.svg",
  },
  { id: "avatar-03", name: "León", src: "assets/images/avatars/avatar-03.svg" },
  { id: "avatar-04", name: "Lobo", src: "assets/images/avatars/avatar-04.svg" },
  { id: "avatar-05", name: "Rey", src: "assets/images/avatars/avatar-05.svg" },
  { id: "avatar-06", name: "Rayo", src: "assets/images/avatars/avatar-06.svg" },
  {
    id: "avatar-07",
    name: "Skull",
    src: "assets/images/avatars/avatar-07.svg",
  },
  {
    id: "avatar-08",
    name: "Rocket",
    src: "assets/images/avatars/avatar-08.svg",
  },
];

const GameAudio = {
  ctx: null,
  enabled: true,

  ensureContext() {
    if (!this.enabled) return null;
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor) {
      this.enabled = false;
      return null;
    }

    if (!this.ctx) {
      this.ctx = new AudioCtor();
    }

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    return this.ctx;
  },

  tone(frequency, duration = 0.12, volume = 0.04, type = "sine", delay = 0) {
    const context = this.ensureContext();
    if (!context) return;

    const startAt = context.currentTime + delay;
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startAt);

    gain.gain.setValueAtTime(0.0001, startAt);
    gain.gain.exponentialRampToValueAtTime(volume, startAt + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(startAt);
    oscillator.stop(startAt + duration + 0.03);
  },

  play(type = "click") {
    if (!this.enabled) return;

    switch (type) {
      case "screen":
        this.tone(420, 0.08, 0.025, "triangle");
        this.tone(620, 0.1, 0.02, "triangle", 0.05);
        break;
      case "start":
        this.tone(520, 0.12, 0.03, "square");
        this.tone(780, 0.16, 0.025, "triangle", 0.06);
        break;
      case "click":
        this.tone(280, 0.06, 0.02, "triangle");
        break;
      case "win":
        this.tone(440, 0.09, 0.03, "triangle");
        this.tone(660, 0.12, 0.025, "triangle", 0.08);
        this.tone(880, 0.18, 0.02, "triangle", 0.16);
        break;
      case "lose":
        this.tone(260, 0.14, 0.025, "sawtooth");
        this.tone(180, 0.18, 0.02, "sawtooth", 0.08);
        break;
      case "pack":
        this.tone(520, 0.1, 0.025, "square");
        this.tone(740, 0.14, 0.02, "triangle", 0.07);
        break;
      default:
        this.tone(440, 0.08, 0.02, "triangle");
        break;
    }
  },
};

function playUiSound(type = "click") {
  if (window.GameAudio) {
    window.GameAudio.play(type);
  }
}

window.GameAudio = GameAudio;

function initializeApp() {
  loadInitialState();
  setupProfileSystem();
  setupNavigation();
  setupCollectionFilters();
  setupDeckBuilder();
  setupShop();
  setupBattleEvents();
  updateHeader();
  updateStatsPanel();
  renderCollection();
  renderDeckBuilder();
  renderBattle();

  const profile = loadPlayerProfile();
  if (!profile) {
    showLoginScreen();
    return;
  }

  showMainMenu();
}

function loadInitialState() {
  const stored = getStorageState();
  if (!stored.collection || stored.collection.length === 0) {
    const initial = CARD_LIBRARY.slice(0, 10).map((card) => card.id);
    stored.collection = initial;
    stored.selectedDeck = initial.slice(0, 5);
    saveStorageState(stored);
  }
  initializeGameState();
}

function updateHeader() {
  const state = getStorageState();
  const profile = loadPlayerProfile();

  document.getElementById("header-coins").textContent = state.coins;
  document.getElementById("header-level").textContent = state.level;
  document.getElementById("home-coins").textContent = state.coins;
  document.getElementById("home-level").textContent = state.level;
  document.getElementById("home-xp").textContent = `${state.xp} XP`;

  if (profile) {
    const name = document.getElementById("profile-name");
    const avatar = document.getElementById("profile-avatar");
    const level = document.getElementById("profile-level");
    const wins = document.getElementById("profile-wins");

    if (name) name.textContent = profile.name;
    if (avatar) avatar.src = profile.avatar || AVATAR_OPTIONS[0].src;
    if (level) level.textContent = state.level;
    if (wins) wins.textContent = state.victories || 0;
  }
}

function updateStatsPanel() {
  const state = getStorageState();
  document.getElementById("stat-wins").textContent = state.victories || 0;
  document.getElementById("stat-losses").textContent = state.defeats || 0;
  document.getElementById("stat-battles").textContent =
    state.stats?.battles || 0;
  document.getElementById("stat-streak").textContent = state.streak || 0;
  document.getElementById("stat-coins").textContent = state.coins || 0;
  document.getElementById("stat-cards").textContent =
    `${(state.collection || []).length}/40`;
}

function setupProfileSystem() {
  const avatarPicker = document.getElementById("avatar-picker");
  if (avatarPicker) {
    avatarPicker.innerHTML = AVATAR_OPTIONS.map(
      (avatar) => `
      <button type="button" class="avatar-option" data-avatar="${avatar.src}" aria-label="${avatar.name}">
        <img src="${avatar.src}" alt="${avatar.name}" />
      </button>
    `,
    ).join("");
  }

  document.querySelectorAll(".avatar-option").forEach((button) => {
    button.addEventListener("click", () => selectAvatar(button.dataset.avatar));
  });

  const form = document.getElementById("profile-form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const nameInput = document.getElementById("playerName");
      const avatarInput = document.getElementById("selected-avatar");
      const errorBox = document.getElementById("login-error");
      const trimmedName = (nameInput?.value || "").trim();
      const selectedAvatar = avatarInput?.value || AVATAR_OPTIONS[0].src;

      if (!validatePlayerName(trimmedName)) {
        if (errorBox) {
          errorBox.textContent =
            "⚠️ El nombre debe tener entre 3 y 16 caracteres.";
        }
        return;
      }

      const profile = {
        id: Date.now(),
        name: trimmedName,
        avatar: selectedAvatar,
        createdAt: new Date().toISOString(),
      };

      if (form.dataset.mode === "edit") {
        updateProfile(profile);
        if (errorBox) errorBox.textContent = "";
        showMainMenu();
        showToast(`Perfil actualizado: ${trimmedName}`, "success");
        return;
      }

      createProfile(profile);
      if (errorBox) errorBox.textContent = "";
      showMainMenu();
      showToast(`¡Bienvenido, ${trimmedName}! ⚽`, "success");
    });
  }

  const editBtn = document.getElementById("edit-profile-btn");
  if (editBtn) {
    editBtn.addEventListener("click", () => {
      const profile = loadPlayerProfile();
      showLoginScreen(true, profile || null);
    });
  }

  const changeBtn = document.getElementById("change-profile-btn");
  if (changeBtn) {
    changeBtn.addEventListener("click", () => {
      const profile = loadPlayerProfile();
      showLoginScreen(true, profile || null);
    });
  }

  const deleteBtn = document.getElementById("delete-profile-btn");
  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      const modalElement = document.getElementById("confirmDeleteModal");
      if (!modalElement) return;
      const bootstrapModal = bootstrap.Modal.getOrCreateInstance(modalElement);
      bootstrapModal.show();
    });
  }

  const confirmDeleteBtn = document.getElementById("confirmDeleteProfile");
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener("click", () => {
      deleteProfile();
      const modalElement = document.getElementById("confirmDeleteModal");
      const bootstrapModal = bootstrap.Modal.getInstance(modalElement);
      if (bootstrapModal) bootstrapModal.hide();
      showLoginScreen(true);
      showToast("Perfil eliminado. Crea uno nuevo.", "warning");
    });
  }
}

function createProfile(profile) {
  const validProfile = {
    id: profile?.id || Date.now(),
    name: (profile?.name || "").trim(),
    avatar: profile?.avatar || AVATAR_OPTIONS[0].src,
    createdAt: profile?.createdAt || new Date().toISOString(),
  };
  saveProfile(validProfile);
  updateProfileUI();
}

function loadProfile() {
  return loadPlayerProfile();
}

function saveProfile(profile) {
  if (!profile || !profile.name || !profile.avatar) return null;
  localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(profile));
  updateProfileUI();
  return profile;
}

function updateProfile(profileData) {
  const currentProfile = loadPlayerProfile();
  const finalProfile = {
    ...(currentProfile || {
      id: Date.now(),
      createdAt: new Date().toISOString(),
    }),
    id: currentProfile?.id || Date.now(),
    name: (profileData?.name || currentProfile?.name || "").trim(),
    avatar:
      profileData?.avatar || currentProfile?.avatar || AVATAR_OPTIONS[0].src,
    createdAt: currentProfile?.createdAt || new Date().toISOString(),
  };

  if (!finalProfile.name) {
    return null;
  }
  localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(finalProfile));
  updateProfileUI();
  return finalProfile;
}

function deleteProfile() {
  localStorage.removeItem(PLAYER_STORAGE_KEY);
  updateProfileUI();
}

function selectAvatar(src) {
  const selectedValue = src || AVATAR_OPTIONS[0].src;
  const input = document.getElementById("selected-avatar");
  if (input) input.value = selectedValue;
  document.querySelectorAll(".avatar-option").forEach((item) => {
    item.classList.toggle("selected", item.dataset.avatar === selectedValue);
  });
}

function updateProfileUI() {
  const profile = loadPlayerProfile();
  const state = getStorageState();
  const avatar = document.getElementById("profile-avatar");
  const name = document.getElementById("profile-name");
  const level = document.getElementById("profile-level");
  const wins = document.getElementById("profile-wins");

  if (profile) {
    if (avatar) avatar.src = profile.avatar || AVATAR_OPTIONS[0].src;
    if (name) name.textContent = profile.name;
    if (level) level.textContent = state.level || 1;
    if (wins) wins.textContent = state.victories || 0;
    document.body.classList.add("profile-ready");
  } else {
    if (name) name.textContent = "";
    if (avatar) avatar.src = AVATAR_OPTIONS[0].src;
    document.body.classList.remove("profile-ready");
  }
}

function loadPlayerProfile() {
  const raw = localStorage.getItem(PLAYER_STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.name || !parsed.avatar) return null;
    return parsed;
  } catch (error) {
    return null;
  }
}

function savePlayerProfile(profile) {
  return saveProfile(profile);
}

function validatePlayerName(name) {
  return (
    typeof name === "string" &&
    name.trim().length >= 3 &&
    name.trim().length <= 16
  );
}

function showLoginScreen(isEditing = false, profile = null) {
  document.body.classList.remove("profile-ready");
  const loginScreen = document.getElementById("login-screen");
  if (loginScreen) loginScreen.style.display = "flex";
  const form = document.getElementById("profile-form");
  const title = document.getElementById("profile-form-title");
  const submit = document.getElementById("profile-submit");
  const nameInput = document.getElementById("playerName");
  const avatarInput = document.getElementById("selected-avatar");

  if (title) {
    title.textContent = isEditing ? "EDITAR PERFIL" : "CREA TU PERFIL";
  }
  if (submit) {
    submit.textContent = isEditing ? "GUARDAR CAMBIOS" : "CREAR PERFIL";
  }

  const currentProfile = profile || loadPlayerProfile();
  if (currentProfile) {
    if (nameInput) nameInput.value = currentProfile.name || "";
    if (avatarInput)
      avatarInput.value = currentProfile.avatar || AVATAR_OPTIONS[0].src;
    const selected = currentProfile.avatar || AVATAR_OPTIONS[0].src;
    document.querySelectorAll(".avatar-option").forEach((item) => {
      item.classList.toggle("selected", item.dataset.avatar === selected);
    });
  } else {
    if (nameInput) nameInput.value = "";
    if (avatarInput) avatarInput.value = AVATAR_OPTIONS[0].src;
    document.querySelectorAll(".avatar-option").forEach((item) => {
      item.classList.toggle(
        "selected",
        item.dataset.avatar === AVATAR_OPTIONS[0].src,
      );
    });
  }

  if (form) form.dataset.mode = isEditing ? "edit" : "create";
}

function showMainMenu() {
  const profile = loadPlayerProfile();
  if (!profile) {
    showLoginScreen();
    return;
  }

  const avatar = document.getElementById("profile-avatar");
  const name = document.getElementById("profile-name");
  const level = document.getElementById("profile-level");
  const wins = document.getElementById("profile-wins");
  const state = getStorageState();

  document.body.classList.add("profile-ready");
  const loginScreen = document.getElementById("login-screen");
  if (loginScreen) loginScreen.style.display = "none";
  if (avatar) avatar.src = profile.avatar || AVATAR_OPTIONS[0].src;
  if (name) name.textContent = profile.name;
  if (level) level.textContent = state.level || 1;
  if (wins) wins.textContent = state.victories || 0;
  showScreen("home");
}

function setupNavigation() {
  document.querySelectorAll(".nav-btn").forEach((button) => {
    button.addEventListener("click", () => {
      playUiSound("click");
      const screen = button.dataset.screen;
      showScreen(screen);
    });
  });

  document.querySelectorAll("[data-screen-target]").forEach((button) => {
    button.addEventListener("click", () => {
      playUiSound("click");
      const target = button.dataset.screenTarget;
      showScreen(target);
    });
  });

  document.getElementById("btn-play").addEventListener("click", () => {
    playUiSound("start");
    showScreen("battle");
    if (!canStartMatch()) {
      showToast(
        "Debes seleccionar exactamente 5 cartas para jugar.",
        "warning",
      );
      showScreen("deck");
      return;
    }
    startMatch();
  });
}

function setupCollectionFilters() {
  const filterOptions = [
    "Todas",
    "PORTERO",
    "DEFENSA",
    "MEDIOCAMPISTA",
    "EXTREMO",
    "DELANTERO",
    "comun",
    "rara",
    "epica",
    "legendaria",
  ];

  const container = document.getElementById("collection-filters");
  container.innerHTML = filterOptions
    .map(
      (filter, index) => `
    <button class="filter-chip ${index === 0 ? "active" : ""}" data-filter="${filter}">${filter === "Todas" ? "Todas" : filter}</button>
  `,
    )
    .join("");

  container.addEventListener("click", (event) => {
    const button = event.target.closest(".filter-chip");
    if (!button) return;

    document
      .querySelectorAll(".filter-chip")
      .forEach((chip) => chip.classList.toggle("active", chip === button));
    renderCollection(button.dataset.filter);
  });

  document.getElementById("sort-select").addEventListener("change", (event) => {
    renderCollection(
      document.querySelector(".filter-chip.active")?.dataset.filter || "Todas",
      event.target.value,
    );
  });
}

function renderCollection(filter = "Todas", sort = "power") {
  const cards = getCollectionCards();
  const filtered = cards.filter((card) => {
    if (filter === "Todas") return true;
    if (
      filter === "PORTERO" ||
      filter === "DEFENSA" ||
      filter === "MEDIOCAMPISTA" ||
      filter === "EXTREMO" ||
      filter === "DELANTERO"
    ) {
      return card.position === filter;
    }
    return card.rarity === filter;
  });

  const orderMap = {
    power: (a, b) => (b.power || 0) - (a.power || 0),
    attack: (a, b) => (b.attack || 0) - (a.attack || 0),
    defense: (a, b) => (b.defense || 0) - (a.defense || 0),
    speed: (a, b) => (b.speed || 0) - (a.speed || 0),
  };

  filtered.sort(orderMap[sort] || orderMap.power);

  const container = document.getElementById("collection-grid");
  container.innerHTML = filtered.length
    ? filtered
        .map((card) =>
          renderCardMini(card, { selected: false, buttonText: "Ver" }),
        )
        .join("")
    : '<div class="glass-panel" style="padding: 18px;">No tienes cartas para mostrar.</div>';
}

function toggleDeckCardById(cardId) {
  const state = getStorageState();
  const deck = (state.selectedDeck || []).slice();

  if (deck.includes(cardId)) {
    const nextDeck = removeCardFromDeck(cardId);
    renderDeckBuilder();
    updateDeckCounter();
    return nextDeck;
  }

  if (deck.length >= 5) {
    showToast("Tu mazo ya tiene 5 cartas.", "warning");
    return deck;
  }

  const nextDeck = addCardToDeck(cardId);
  renderDeckBuilder();
  updateDeckCounter();
  return nextDeck;
}

function setupDeckBuilder() {
  const state = getStorageState();
  const collection = getCollectionCards();
  const deckAvailable = document.getElementById("deck-available");
  deckAvailable.innerHTML = collection
    .map((card) =>
      renderCardMini(card, {
        selected: (state.selectedDeck || []).includes(card.id),
        buttonText: (state.selectedDeck || []).includes(card.id)
          ? "Quitar"
          : "Añadir",
      }),
    )
    .join("");

  deckAvailable.onclick = (event) => {
    const target = event.target.closest("[data-card-select]");
    if (!target) return;

    const cardId = target.dataset.cardSelect;
    toggleDeckCardById(cardId);
  };

  document.getElementById("btn-start-match").addEventListener("click", () => {
    startMatch();
  });

  updateDeckCounter();
}

function renderDeckBuilder() {
  const state = getStorageState();
  const deck = (state.selectedDeck || []).slice(0, 5);
  const slots = document.getElementById("deck-slots");
  const deckAvailable = document.getElementById("deck-available");

  slots.innerHTML = Array.from({ length: 5 }, (_, index) => {
    const card = deck[index] ? getCardById(deck[index]) : null;
    if (!card) {
      return '<div class="deck-slot empty">Vacío</div>';
    }

    return `
      <div class="deck-slot">
        <div class="deck-slot-card">
          <div class="slot-name">${card.name}</div>
          <div class="slot-rarity" style="color:${getRarityMeta(card.rarity).color}">${getRarityMeta(card.rarity).label}</div>
          <div class="position">${getPositionMeta(card.position).icon} ${getPositionMeta(card.position).label}</div>
          <div class="slot-controls">
            <button data-move="up" data-card-id="${card.id}">↑</button>
            <button data-move="down" data-card-id="${card.id}">↓</button>
            <button data-remove="${card.id}">✕</button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  deckAvailable.innerHTML = getCollectionCards()
    .map((card) => {
      const isSelected = deck.includes(card.id);
      return renderCardMini(card, {
        selected: isSelected,
        buttonText: isSelected ? "Quitar" : "Añadir",
      });
    })
    .join("");

  document.getElementById("btn-start-match").disabled = !canStartMatch();
  document
    .getElementById("btn-start-match")
    .classList.toggle("disabled", !canStartMatch());

  slots.querySelectorAll("[data-remove]").forEach((button) => {
    button.addEventListener("click", () => {
      removeCardFromDeck(button.getAttribute("data-remove"));
      renderDeckBuilder();
      updateDeckCounter();
    });
  });

  slots.querySelectorAll("[data-move]").forEach((button) => {
    button.addEventListener("click", () => {
      const cardId = button.getAttribute("data-card-id");
      const direction = button.getAttribute("data-move");
      moveDeckCard(cardId, direction === "up" ? "up" : "down");
      renderDeckBuilder();
      updateDeckCounter();
    });
  });

  updateDeckCounter();
}

function updateDeckCounter() {
  const deck = (getStorageState().selectedDeck || []).slice(0, 5);
  document.getElementById("deck-count").textContent = deck.length;
  const btn = document.getElementById("btn-start-match");
  btn.disabled = deck.length !== 5;
  btn.classList.toggle("disabled", deck.length !== 5);
}

function setupShop() {
  document
    .getElementById("btn-open-pack")
    .addEventListener("click", openBasicPack);
  const state = getStorageState();
  if (state.lastPack && state.lastPack.length) {
    renderPackRewards(
      state.lastPack.map((id) => getCardById(id)).filter(Boolean),
    );
  }
}

window.addEventListener("storage", () => {
  updateHeader();
  updateStatsPanel();
  renderDeckBuilder();
});
