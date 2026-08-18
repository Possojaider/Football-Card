const CARD_POSITIONS = {
  PORTERO: {
    label: "PORTERO",
    icon: "🧤",
    strong: ["DEFENSA", "MEDIOCAMPISTA"],
  },
  DEFENSA: {
    label: "DEFENSA",
    icon: "🛡️",
    strong: ["MEDIOCAMPISTA", "EXTREMO"],
  },
  MEDIOCAMPISTA: {
    label: "MEDIOCAMPISTA",
    icon: "🎯",
    strong: ["DELANTERO", "DEFENSA"],
  },
  EXTREMO: { label: "EXTREMO", icon: "⚡", strong: ["DEFENSA", "PORTERO"] },
  DELANTERO: { label: "DELANTERO", icon: "⚽", strong: ["DEFENSA", "PORTERO"] },
};

const RARITY_DEFS = {
  comun: {
    label: "COMÚN",
    short: "COMÚN",
    color: "#a7b8af",
    key: "comun",
    range: "60-75",
  },
  rara: {
    label: "RARA",
    short: "RARA",
    color: "#6ec5ff",
    key: "rara",
    range: "70-82",
  },
  epica: {
    label: "ÉPICA",
    short: "ÉPICA",
    color: "#b471ff",
    key: "epica",
    range: "80-90",
  },
  legendaria: {
    label: "LEGENDARIA",
    short: "LEGENDARIA",
    color: "#f7d973",
    key: "legendaria",
    range: "88-99",
  },
};

const SPECIAL_ABILITIES = {
  VELOCISTA: {
    label: "VELOCISTA",
    bonus: " +10% velocidad durante el combate",
  },
  MURO_DEFENSIVO: { label: "MURO DEFENSIVO", bonus: " +15 defensa" },
  FRANCOTIRADOR: { label: "FRANCOTIRADOR", bonus: " +15 ataque" },
  CEREBRO: { label: "CEREBRO", bonus: " +15 pase" },
  INCANSABLE: { label: "INCANSABLE", bonus: " +15 resistencia" },
  CAPITAN: { label: "CAPITÁN", bonus: " +5% a todas sus estadísticas" },
  GOLEADOR: { label: "GOLEADOR", bonus: " bonus ante defensas y porteros" },
  REFLEJOS: { label: "REFLEJOS", bonus: " posible desvío de ataques" },
};

const PLAYER_IMAGE_LIBRARY = {
  "kylian-mbappe": "assets/images/players/Kylian Mbappe.jpg.webp",
  "erling-haaland": "assets/images/players/haaland.jpeg",
  "vinicius-junior": "assets/images/players/vini.jpeg",
  "mohamed-salah": "assets/images/players/salah.webp",
  "jude-bellingham": "assets/images/players/jude.webp",
  "lamine-yamal": "assets/images/players/lamine.jpg",
  rodri: "assets/images/players/rodri.jpg",
  "harry-kane": "assets/images/players/kane.jpg",
  "virgil-van-dijk": "assets/images/players/virgil.jpeg",
  "ruben-dias": "assets/images/players/ruben.jpg",
  ederson: "assets/images/players/ederson.jpg",
  "alisson-becker": "assets/images/players/samuelFlorez.jpeg",
  "kevin-de-bruyne": "assets/images/players/jaider.jpeg",
  "robert-lewandowski": "assets/images/players/lewa.jpeg",
  "lautaro-martinez": "assets/images/players/lautaro.jpg",
  "federico-valverde": "assets/images/players/federico-valverde.jpg",
  "declan-rice": "assets/images/players/rice.jpg",
  "trent-alexander-arnold": "assets/images/players/arnold.jpeg",
  "kyle-walker": "assets/images/players/walker.jpg",
  "emiliano-martinez": "assets/images/players/dibu.avif",
  "david-raya": "assets/images/players/raya.jpg",
  "jamal-musiala": "assets/images/players/musiala.jxl",
  "bernardo-silva": "assets/images/players/bernardo.jpeg",
  "luis-diaz": "assets/images/players/lucho.jpeg",
  "alexander-isak": "assets/images/players/isak.jpg",
  "william-saliba": "assets/images/players/saliba.jpg",
  "josko-gvardiol": "assets/images/players/gvardiol.jpeg",
  "marc-ter-stegen": "assets/images/players/marc.jpeg",
  "mikel-oyarzabal": "assets/images/players/mikel.jpeg",
  "yan-diomande": "assets/images/players/yan.png",
  "diogo-jota": "assets/images/players/jota.jpeg",
  "phil-foden": "assets/images/players/foden.jpeg",
  "bukayo-saka": "assets/images/players/bukayo-saka.jpg",
};

const DEFAULT_PLAYER_IMAGE = "assets/images/players/default-player.svg";

const CARD_LIBRARY = [
  {
    id: "kylian-mbappe",
    name: "Kylian Mbappé",
    position: "DELANTERO",
    rarity: "legendaria",
    level: 9,
    attack: 97,
    defense: 62,
    speed: 99,
    pass: 89,
    resistance: 84,
    skill: "FRANCOTIRADOR",
    power: 96,
  },
  {
    id: "erling-haaland",
    name: "Erling Haaland",
    position: "DELANTERO",
    rarity: "legendaria",
    level: 9,
    attack: 95,
    defense: 61,
    speed: 96,
    pass: 82,
    resistance: 88,
    skill: "GOLEADOR",
    power: 94,
  },
  {
    id: "kevin-de-bruyne",
    name: "Jaider Posso",
    position: "MEDIOCAMPISTA",
    rarity: "legendaria",
    level: 9,
    attack: 91,
    defense: 74,
    speed: 87,
    pass: 98,
    resistance: 86,
    skill: "CEREBRO",
    power: 92,
  },
  {
    id: "rodri",
    name: "Rodri",
    position: "MEDIOCAMPISTA",
    rarity: "epica",
    level: 8,
    attack: 84,
    defense: 86,
    speed: 79,
    pass: 91,
    resistance: 90,
    skill: "CAPITAN",
    power: 88,
  },
  {
    id: "virgil-van-dijk",
    name: "Virgil van Dijk",
    position: "DEFENSA",
    rarity: "legendaria",
    level: 9,
    attack: 78,
    defense: 97,
    speed: 78,
    pass: 79,
    resistance: 94,
    skill: "MURO_DEFENSIVO",
    power: 92,
  },
  {
    id: "ruben-dias",
    name: "Rúben Dias",
    position: "DEFENSA",
    rarity: "epica",
    level: 8,
    attack: 74,
    defense: 94,
    speed: 76,
    pass: 74,
    resistance: 92,
    skill: "MURO_DEFENSIVO",
    power: 89,
  },
  {
    id: "alisson-becker",
    name: "Samuel Florez",
    position: "PORTERO",
    rarity: "legendaria",
    level: 9,
    attack: 52,
    defense: 96,
    speed: 75,
    pass: 70,
    resistance: 95,
    skill: "REFLEJOS",
    power: 92,
  },
  {
    id: "ederson",
    name: "Ederson",
    position: "PORTERO",
    rarity: "epica",
    level: 8,
    attack: 56,
    defense: 92,
    speed: 79,
    pass: 83,
    resistance: 91,
    skill: "REFLEJOS",
    power: 88,
  },
  {
    id: "vinicius-junior",
    name: "Vinícius Júnior",
    position: "EXTREMO",
    rarity: "legendaria",
    level: 9,
    attack: 93,
    defense: 57,
    speed: 99,
    pass: 84,
    resistance: 81,
    skill: "VELOCISTA",
    power: 93,
  },
  {
    id: "mohamed-salah",
    name: "Mohamed Salah",
    position: "EXTREMO",
    rarity: "legendaria",
    level: 9,
    attack: 94,
    defense: 58,
    speed: 97,
    pass: 88,
    resistance: 82,
    skill: "VELOCISTA",
    power: 94,
  },
  {
    id: "lamine-yamal",
    name: "Lamine Yamal",
    position: "EXTREMO",
    rarity: "legendaria",
    level: 9,
    attack: 88,
    defense: 58,
    speed: 98,
    pass: 87,
    resistance: 79,
    skill: "VELOCISTA",
    power: 90,
  },
  {
    id: "jude-bellingham",
    name: "Jude Bellingham",
    position: "MEDIOCAMPISTA",
    rarity: "epica",
    level: 8,
    attack: 87,
    defense: 76,
    speed: 91,
    pass: 90,
    resistance: 85,
    skill: "CAPITAN",
    power: 88,
  },
  {
    id: "phil-foden",
    name: "Phil Foden",
    position: "MEDIOCAMPISTA",
    rarity: "epica",
    level: 8,
    attack: 88,
    defense: 68,
    speed: 92,
    pass: 89,
    resistance: 81,
    skill: "CEREBRO",
    power: 87,
  },
  {
    id: "bukayo-saka",
    name: "Bukayo Saka",
    position: "EXTREMO",
    rarity: "epica",
    level: 8,
    attack: 89,
    defense: 63,
    speed: 94,
    pass: 86,
    resistance: 80,
    skill: "VELOCISTA",
    power: 88,
  },
  {
    id: "robert-lewandowski",
    name: "Robert Lewandowski",
    position: "DELANTERO",
    rarity: "epica",
    level: 8,
    attack: 92,
    defense: 60,
    speed: 88,
    pass: 81,
    resistance: 84,
    skill: "GOLEADOR",
    power: 89,
  },
  {
    id: "lautaro-martinez",
    name: "Lautaro Martínez",
    position: "DELANTERO",
    rarity: "epica",
    level: 8,
    attack: 90,
    defense: 58,
    speed: 92,
    pass: 82,
    resistance: 83,
    skill: "FRANCOTIRADOR",
    power: 88,
  },
  {
    id: "federico-valverde",
    name: "Federico Valverde",
    position: "MEDIOCAMPISTA",
    rarity: "rara",
    level: 7,
    attack: 86,
    defense: 74,
    speed: 90,
    pass: 83,
    resistance: 83,
    skill: "INCANSABLE",
    power: 84,
  },
  {
    id: "declan-rice",
    name: "Declan Rice",
    position: "MEDIOCAMPISTA",
    rarity: "rara",
    level: 7,
    attack: 80,
    defense: 86,
    speed: 78,
    pass: 82,
    resistance: 88,
    skill: "CAPITAN",
    power: 84,
  },
  {
    id: "trent-alexander-arnold",
    name: "Trent Alexander-Arnold",
    position: "DEFENSA",
    rarity: "rara",
    level: 7,
    attack: 78,
    defense: 84,
    speed: 86,
    pass: 91,
    resistance: 79,
    skill: "CEREBRO",
    power: 84,
  },
  {
    id: "kyle-walker",
    name: "Kyle Walker",
    position: "DEFENSA",
    rarity: "rara",
    level: 7,
    attack: 76,
    defense: 85,
    speed: 89,
    pass: 72,
    resistance: 84,
    skill: "MURO_DEFENSIVO",
    power: 83,
  },
  {
    id: "emiliano-martinez",
    name: "Emiliano Martínez",
    position: "PORTERO",
    rarity: "epica",
    level: 8,
    attack: 50,
    defense: 90,
    speed: 72,
    pass: 68,
    resistance: 91,
    skill: "REFLEJOS",
    power: 85,
  },
  {
    id: "david-raya",
    name: "David Raya",
    position: "PORTERO",
    rarity: "rara",
    level: 7,
    attack: 48,
    defense: 87,
    speed: 74,
    pass: 66,
    resistance: 88,
    skill: "REFLEJOS",
    power: 81,
  },

  {
    id: "jamal-musiala",
    name: "Jamal Musiala",
    position: "MEDIOCAMPISTA",
    rarity: "epica",
    level: 8,
    attack: 86,
    defense: 66,
    speed: 94,
    pass: 88,
    resistance: 80,
    skill: "CEREBRO",
    power: 86,
  },
  {
    id: "bernardo-silva",
    name: "Bernardo Silva",
    position: "MEDIOCAMPISTA",
    rarity: "epica",
    level: 8,
    attack: 84,
    defense: 72,
    speed: 89,
    pass: 90,
    resistance: 82,
    skill: "CAPITAN",
    power: 87,
  },
  {
    id: "luis-diaz",
    name: "Luis Díaz",
    position: "EXTREMO",
    rarity: "epica",
    level: 8,
    attack: 88,
    defense: 61,
    speed: 95,
    pass: 82,
    resistance: 78,
    skill: "VELOCISTA",
    power: 87,
  },
  {
    id: "harry-kane",
    name: "Harry Kane",
    position: "DELANTERO",
    rarity: "legendaria",
    level: 9,
    attack: 94,
    defense: 64,
    speed: 90,
    pass: 88,
    resistance: 86,
    skill: "GOLEADOR",
    power: 93,
  },
  {
    id: "alexander-isak",
    name: "Alexander Isak",
    position: "DELANTERO",
    rarity: "epica",
    level: 8,
    attack: 89,
    defense: 59,
    speed: 92,
    pass: 76,
    resistance: 81,
    skill: "FRANCOTIRADOR",
    power: 87,
  },
  {
    id: "william-saliba",
    name: "William Saliba",
    position: "DEFENSA",
    rarity: "epica",
    level: 8,
    attack: 72,
    defense: 91,
    speed: 81,
    pass: 70,
    resistance: 90,
    skill: "MURO_DEFENSIVO",
    power: 86,
  },
  {
    id: "josko-gvardiol",
    name: "Joško Gvardiol",
    position: "DEFENSA",
    rarity: "epica",
    level: 8,
    attack: 77,
    defense: 90,
    speed: 82,
    pass: 78,
    resistance: 89,
    skill: "MURO_DEFENSIVO",
    power: 87,
  },
  {
    id: "marc-ter-stegen",
    name: "Marc-André ter Stegen",
    position: "PORTERO",
    rarity: "epica",
    level: 8,
    attack: 50,
    defense: 89,
    speed: 77,
    pass: 79,
    resistance: 88,
    skill: "REFLEJOS",
    power: 83,
  },
  {
    id: "mikel-oyarzabal",
    name: "Mikel Oyarzabal",
    position: "DELANTERO",
    rarity: "rara",
    level: 7,
    attack: 84,
    defense: 58,
    speed: 86,
    pass: 80,
    resistance: 76,
    skill: "GOLEADOR",
    power: 81,
  },

  {
    id: "yan-diomande",
    name: "Yan Diomandé",
    position: "EXTREMO",
    rarity: "rara",
    level: 7,
    attack: 84,
    defense: 59,
    speed: 93,
    pass: 80,
    resistance: 74,
    skill: "VELOCISTA",
    power: 83,
  },
  {
    id: "diogo-jota",
    name: "Diogo Jota",
    position: "DELANTERO",
    rarity: "rara",
    level: 7,
    attack: 83,
    defense: 56,
    speed: 88,
    pass: 77,
    resistance: 78,
    skill: "FRANCOTIRADOR",
    power: 81,
  },
];

CARD_LIBRARY.forEach((card, index) => {
  const fallbackPath = `assets/images/players/player-${String(index + 1).padStart(2, "0")}.svg`;
  card.imagen = card.imagen || PLAYER_IMAGE_LIBRARY[card.id] || fallbackPath;
  card.image = card.image || card.imagen;
});

function createPlayerCard(player) {
  const card = player || {};
  const imageSrc = getCardImage(card);
  const rarityMeta = getRarityMeta(card.rarity);
  const positionMeta = getPositionMeta(card.position);

  return `
    <div class="card-visual ${card.rarity || "common"}">
      <div class="card-top" style="color:${rarityMeta.color}">${rarityMeta.label}</div>
      <div class="card-photo-wrap player-card-photo">
        <img
          src="${imageSrc}"
          alt="${card.name || "Jugador"}"
          class="player-card-image"
          onerror="this.onerror=null;this.src='${DEFAULT_PLAYER_IMAGE}';"
        />
      </div>
      <div class="card-player">${card.name || "Jugador"}</div>
      <div class="card-position">${positionMeta.label}</div>
      <div class="card-attrs">
        <div class="card-attr"><span>⚔️</span><strong>${card.attack || 0}</strong></div>
        <div class="card-attr"><span>🛡️</span><strong>${card.defense || 0}</strong></div>
        <div class="card-attr"><span>⚡</span><strong>${card.speed || 0}</strong></div>
        <div class="card-attr"><span>🎯</span><strong>${card.pass || 0}</strong></div>
      </div>
      <div class="card-skill">🔥 ${getSpecialMeta(card.skill).label}</div>
      <div class="card-power">PODER ${card.power || 0}</div>
    </div>
  `;
}

function getCardImage(card) {
  if (!card) return DEFAULT_PLAYER_IMAGE;
  if (card.imagen) return card.imagen;
  if (card.image) return card.image;
  if (card.id && PLAYER_IMAGE_LIBRARY[card.id])
    return PLAYER_IMAGE_LIBRARY[card.id];
  return DEFAULT_PLAYER_IMAGE;
}

function getCardById(cardId) {
  return CARD_LIBRARY.find((card) => card.id === cardId) || null;
}

function getRarityMeta(rarityKey) {
  return RARITY_DEFS[rarityKey] || RARITY_DEFS.comun;
}

function getPositionMeta(positionKey) {
  return CARD_POSITIONS[positionKey] || CARD_POSITIONS.MEDIOCAMPISTA;
}

function getSpecialMeta(skillKey) {
  return SPECIAL_ABILITIES[skillKey] || SPECIAL_ABILITIES.CAPITAN;
}

function getCardDisplayName(card) {
  return card ? card.name : "Carta";
}

function generateRandomCard() {
  const randomCard =
    CARD_LIBRARY[Math.floor(Math.random() * CARD_LIBRARY.length)];
  return { ...randomCard };
}

function getWeightedRarity() {
  const roll = Math.random() * 100;
  if (roll < 60) return "comun";
  if (roll < 85) return "rara";
  if (roll < 97) return "epica";
  return "legendaria";
}

function getCardsByRarity(rarityKey) {
  return CARD_LIBRARY.filter((card) => card.rarity === rarityKey);
}

function getCardsByPosition(positionKey) {
  return CARD_LIBRARY.filter((card) => card.position === positionKey);
}

function getBasePower(card) {
  const attack = Number(card.attack || 0);
  const defense = Number(card.defense || 0);
  const speed = Number(card.speed || 0);
  const pass = Number(card.pass || 0);
  const resistance = Number(card.resistance || 0);

  const weights = {
    DELANTERO: {
      attack: 0.38,
      defense: 0.12,
      speed: 0.28,
      pass: 0.17,
      resistance: 0.15,
    },
    EXTREMO: {
      attack: 0.27,
      defense: 0.12,
      speed: 0.38,
      pass: 0.18,
      resistance: 0.13,
    },
    MEDIOCAMPISTA: {
      attack: 0.26,
      defense: 0.13,
      speed: 0.2,
      pass: 0.26,
      resistance: 0.18,
    },
    DEFENSA: {
      attack: 0.14,
      defense: 0.36,
      speed: 0.18,
      pass: 0.12,
      resistance: 0.26,
    },
    PORTERO: {
      attack: 0.1,
      defense: 0.38,
      speed: 0.12,
      pass: 0.1,
      resistance: 0.34,
    },
  };

  const profile = weights[card.position] || weights.MEDIOCAMPISTA;
  const total =
    attack * profile.attack +
    defense * profile.defense +
    speed * profile.speed +
    pass * profile.pass +
    resistance * profile.resistance;

  return Math.round(total / 1.1);
}
