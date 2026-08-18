function computeCombatPower(card, opponentCard = null) {
  const rarityMultiplier = {
    comun: 0.92,
    rara: 1,
    epica: 1.08,
    legendaria: 1.15,
  };
  const position = card.position;
  let total = 0;

  if (position === "DELANTERO") {
    total = card.attack * 0.38 + card.speed * 0.33 + card.pass * 0.29;
  } else if (position === "EXTREMO") {
    total = card.speed * 0.38 + card.attack * 0.35 + card.pass * 0.27;
  } else if (position === "MEDIOCAMPISTA") {
    total =
      card.pass * 0.32 +
      card.attack * 0.27 +
      card.speed * 0.21 +
      card.resistance * 0.2;
  } else if (position === "DEFENSA") {
    total = card.defense * 0.38 + card.resistance * 0.35 + card.speed * 0.27;
  } else {
    total = card.defense * 0.6 + card.resistance * 0.4;
  }

  const skill = getSpecialMeta(card.skill);
  if (skill.label === "VELOCISTA") total *= 1.1;
  if (skill.label === "MURO DEFENSIVO") total += 15;
  if (skill.label === "FRANCOTIRADOR") total += 15;
  if (skill.label === "CEREBRO") total += 15;
  if (skill.label === "INCANSABLE") total += 15;
  if (skill.label === "CAPITÁN") total *= 1.05;
  if (skill.label === "GOLEADOR") {
    if (
      opponentCard &&
      (opponentCard.position === "DEFENSA" ||
        opponentCard.position === "PORTERO")
    ) {
      total += 18;
    }
  }
  if (skill.label === "REFLEJOS" && card.position === "PORTERO") {
    total *= 1.08;
  }

  return Math.round(total * (rarityMultiplier[card.rarity] || 1));
}

function rollRandomFactor() {
  return (Math.random() * 10 - 5) / 100;
}

function getEffectiveBattleScore(card, opponentCard) {
  const basePower = computeCombatPower(card, opponentCard);
  const bonus = getSkillBonus(card, "side");
  const attackEdge =
    Math.max(0, card.attack - (opponentCard?.defense || 0)) * 0.5;
  const speedEdge = Math.max(0, card.speed - (opponentCard?.speed || 0)) * 0.4;
  const passEdge =
    Math.max(0, card.pass - (opponentCard?.resistance || 0)) * 0.35;
  const resilience = card.resistance * 0.25;

  return Math.round(
    basePower + bonus + attackEdge + speedEdge + passEdge + resilience,
  );
}

function getCombatResult(playerCard, cpuCard) {
  const playerPower = computeCombatPower(playerCard, cpuCard);
  const cpuPower = computeCombatPower(cpuCard, playerCard);

  const playerEffective = getEffectiveBattleScore(playerCard, cpuCard);
  const cpuEffective = getEffectiveBattleScore(cpuCard, playerCard);

  const playerBonus = getSkillBonus(playerCard, "player");
  const cpuBonus = getSkillBonus(cpuCard, "cpu");

  const playerFinal = playerEffective + playerBonus * 0.7;
  const cpuFinal = cpuEffective + cpuBonus * 0.7;

  const playerTieBreak =
    playerCard.attack +
    playerCard.speed +
    playerCard.pass +
    playerCard.defense +
    playerCard.resistance;
  const cpuTieBreak =
    cpuCard.attack +
    cpuCard.speed +
    cpuCard.pass +
    cpuCard.defense +
    cpuCard.resistance;

  let winner = "player";
  if (playerFinal < cpuFinal) {
    winner = "cpu";
  } else if (playerFinal === cpuFinal && playerTieBreak < cpuTieBreak) {
    winner = "cpu";
  }

  const powerDiff = Math.abs(playerFinal - cpuFinal);

  return {
    playerPower,
    cpuPower,
    playerFinal,
    cpuFinal,
    winner,
    powerDiff,
    playerDamage: Math.max(
      12,
      Math.round((playerEffective + playerBonus) * 0.18),
    ),
    cpuDamage: Math.max(12, Math.round((cpuEffective + cpuBonus) * 0.18)),
    playerHp: 100,
    cpuHp: 100,
    playerFinalWithBonus: playerFinal,
    cpuFinalWithBonus: cpuFinal,
  };
}

function getSkillBonus(card, side) {
  const skill = getSpecialMeta(card.skill);
  let bonus = 0;

  if (skill.label === "VELOCISTA") bonus += card.speed * 0.1;
  if (skill.label === "MURO DEFENSIVO") bonus += 15;
  if (skill.label === "FRANCOTIRADOR") bonus += 15;
  if (skill.label === "CEREBRO") bonus += 15;
  if (skill.label === "INCANSABLE") bonus += 15;
  if (skill.label === "CAPITÁN")
    bonus +=
      (card.attack + card.defense + card.speed + card.pass + card.resistance) *
      0.05;
  if (
    skill.label === "GOLEADOR" &&
    (card.position === "DELANTERO" || card.position === "EXTREMO")
  )
    bonus += 10;
  if (skill.label === "REFLEJOS" && card.position === "PORTERO") bonus += 12;

  return bonus;
}

function selectBestCpuCard(playerCard, cpuDeck) {
  if (!cpuDeck.length) return null;

  let bestMatch = cpuDeck[0];
  let bestScore = -Infinity;

  cpuDeck.forEach((card) => {
    const power = computeCombatPower(card, playerCard);
    const matchup = power - computeCombatPower(playerCard, card);
    const score =
      matchup +
      card.power * 0.4 +
      (card.attack + card.speed + card.pass + card.defense) * 0.08;

    if (score > bestScore) {
      bestScore = score;
      bestMatch = card;
    }
  });

  return bestMatch;
}
