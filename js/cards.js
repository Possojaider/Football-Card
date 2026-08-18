function getDeckCardObjects(ids) {
  return (ids || []).map((id) => getCardById(id)).filter(Boolean);
}

function getCollectionCards() {
  const state = getStorageState();
  return state.collection
    .map((id) => getCardById(id))
    .filter(Boolean)
    .sort((a, b) => (b.power || 0) - (a.power || 0));
}

function renderCardMini(card, options = {}) {
  const rarityMeta = getRarityMeta(card.rarity);
  const positionMeta = getPositionMeta(card.position);
  const isSelected = !!options.selected;
  const imageSrc = getCardImage(card);

  return `
    <div class="card-mini ${isSelected ? "selected" : ""}" data-card-id="${card.id}" data-card-action="${options.action || "select"}">
      <div class="card-photo-thumb">
        <img src="${imageSrc}" alt="${card.name}" class="player-card-image" onerror="this.onerror=null;this.src='${DEFAULT_PLAYER_IMAGE}';" />
      </div>
      <div class="card-rarity" style="color:${rarityMeta.color}">${rarityMeta.label}</div>
      <div class="name">${card.name}</div>
      <div class="position">${positionMeta.icon} ${positionMeta.label}</div>
      <div class="stats">
        <span>⚔️ ${card.attack}</span>
        <span>🛡️ ${card.defense}</span>
        <span>⚡ ${card.speed}</span>
        <span>🎯 ${card.pass}</span>
      </div>
      <div class="power-badge">Poder ${card.power}</div>
      <button class="btn-add" data-card-select="${card.id}">${options.buttonText || "Añadir"}</button>
    </div>
  `;
}

function renderCardVisual(card, options = {}) {
  const rarityMeta = getRarityMeta(card.rarity);
  const positionMeta = getPositionMeta(card.position);
  const currentBar = Math.max(10, Math.min(100, options.resistance || 100));
  const imageSrc = getCardImage(card);

  return `
    <div class="card-visual ${card.rarity} ${options.animation || ""}">
      <div class="card-top" style="color:${rarityMeta.color}">${rarityMeta.label}</div>
      <div class="card-photo-wrap player-card-photo">
        <img src="${imageSrc}" alt="${card.name}" class="player-card-image" onerror="this.onerror=null;this.src='${DEFAULT_PLAYER_IMAGE}';" />
      </div>
      <div class="card-crest">${positionMeta.icon}</div>
      <div class="card-player">${card.name}</div>
      <div class="card-position">${positionMeta.label}</div>
      <div class="card-attrs">
        <div class="card-attr"><span>⚔️</span><strong>${card.attack}</strong></div>
        <div class="card-attr"><span>🛡️</span><strong>${card.defense}</strong></div>
        <div class="card-attr"><span>⚡</span><strong>${card.speed}</strong></div>
        <div class="card-attr"><span>🎯</span><strong>${card.pass}</strong></div>
      </div>
      <div class="card-skill">🔥 ${getSpecialMeta(card.skill).label}</div>
      <div class="card-resistance">
        <div class="label-resistance">❤️ RESISTENCIA</div>
        <div class="bar-bg"><div class="bar-fill" style="width:${currentBar}%"></div></div>
      </div>
      <div class="card-power">PODER ${card.power}</div>
    </div>
  `;
}

function renderBattleCard(
  card,
  side = "player",
  resultStatus = "",
  health = 100,
) {
  if (!card) {
    return '<div class="card-visual empty"><div class="card-player">Sin carta</div></div>';
  }

  const rarityMeta = getRarityMeta(card.rarity);
  const positionMeta = getPositionMeta(card.position);
  const maxLife = Number(card.vidaMaxima || 100);
  const currentLife = Number(card.vidaActual ?? health ?? 100);
  const currentBar = Math.max(0, Math.min(100, (currentLife / maxLife) * 100));
  const imageSrc = getCardImage(card);

  return `
    <div class="card-visual ${card.rarity} ${resultStatus}">
      <div class="card-top" style="color:${rarityMeta.color}">${rarityMeta.label}</div>
      <div class="card-photo-wrap player-card-photo battle-photo">
        <img src="${imageSrc}" alt="${card.name}" class="player-card-image" onerror="this.onerror=null;this.src='${DEFAULT_PLAYER_IMAGE}';" />
      </div>
      <div class="card-crest">${positionMeta.icon}</div>
      <div class="card-player">${card.name}</div>
      <div class="card-position">${positionMeta.label}</div>
      <div class="card-attrs">
        <div class="card-attr"><span>⚔️</span><strong>${card.attack}</strong></div>
        <div class="card-attr"><span>🛡️</span><strong>${card.defense}</strong></div>
        <div class="card-attr"><span>⚡</span><strong>${card.speed}</strong></div>
        <div class="card-attr"><span>🎯</span><strong>${card.pass}</strong></div>
      </div>
      <div class="card-skill">🔥 ${getSpecialMeta(card.skill).label}</div>
      <div class="card-resistance">
        <div class="label-resistance">❤️ ${Math.round(currentLife)}/${maxLife}</div>
        <div class="bar-bg"><div class="bar-fill" style="width:${currentBar}%"></div></div>
      </div>
      <div class="card-power">PODER ${card.power}</div>
    </div>
  `;
}
