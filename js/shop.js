function openBasicPack() {
  const state = getStorageState();
  if (state.coins < 250) {
    showToast("No tienes suficientes monedas para abrir un sobre.", "warning");
    return;
  }

  const rewards = [];
  const rewardIds = new Set();
  const ownedIds = new Set((state.collection || []).slice());
  const unseenCards = CARD_LIBRARY.filter((card) => !ownedIds.has(card.id));
  const packPool = unseenCards.length ? unseenCards : [...CARD_LIBRARY];

  for (let i = 0; i < 3; i += 1) {
    const rarity = getWeightedRarity();
    const pool = packPool.filter(
      (card) => card.rarity === rarity && !rewardIds.has(card.id),
    );
    const source = pool.length
      ? pool
      : packPool.filter((card) => !rewardIds.has(card.id));
    const card = source[Math.floor(Math.random() * source.length)];
    if (!card) continue;

    rewards.push(card);
    rewardIds.add(card.id);
  }

  const collectionIds = Array.from(
    new Set([...(state.collection || []), ...rewards.map((card) => card.id)]),
  );
  const nextState = {
    ...state,
    coins: Number(state.coins || 0) - 250,
    collection: collectionIds,
    lastPack: rewards.map((card) => card.id),
  };

  localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(nextState));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));

  renderPackRewards(rewards);
  renderCollection();
  renderDeckBuilder();
  updateHeader();
  updateStatsPanel();
  playUiSound("pack");
  showToast("¡Sobre abierto! Nuevas cartas desbloqueadas.", "success");
}

function renderPackRewards(cards) {
  const container = document.getElementById("pack-results");
  if (!container) return;

  container.innerHTML = cards
    .map((card) => {
      const rarityMeta = getRarityMeta(card.rarity);
      return `
      <div class="pack-card-reward">
        <div class="card-rarity" style="color:${rarityMeta.color}">${rarityMeta.label}</div>
        <div class="name">${card.name}</div>
        <div class="position">${card.position}</div>
        <div class="power-badge">Poder ${card.power}</div>
      </div>
    `;
    })
    .join("");
}
