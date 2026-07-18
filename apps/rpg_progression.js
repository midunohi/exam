(function (global) {
  "use strict";

  // EXP曲線・基礎能力値・保存仕様はここだけを編集する。
  const CONFIG = Object.freeze({
    storageKey: "midunohi.exam.exp",
    eventName: "rpg-exp-change",
    initialLevelExp: 20,
    expGrowth: 1.35,
    baseMaxHP: 30,
    baseAttack: 5,
    attackPerLevel: 2
  });

  function toNonNegativeInt(value) {
    const number = Number(value);
    return Number.isFinite(number) && number > 0 ? Math.floor(number) : 0;
  }

  function maxHPGainAt(level) {
    return 8 + Math.floor(level * 1.5);
  }

  function calculate(totalExp) {
    const safeTotal = toNonNegativeInt(totalExp);
    let level = 1;
    let exp = safeTotal;
    let nextExp = CONFIG.initialLevelExp;
    let maxHP = CONFIG.baseMaxHP;
    let baseAttack = CONFIG.baseAttack;

    while (exp >= nextExp) {
      exp -= nextExp;
      level += 1;
      maxHP += maxHPGainAt(level);
      baseAttack += CONFIG.attackPerLevel;
      nextExp = Math.round(nextExp * CONFIG.expGrowth);
    }

    const toNext = Math.max(0, nextExp - exp);
    return Object.freeze({
      totalExp: safeTotal,
      level,
      exp,
      nextExp,
      toNext,
      progress: nextExp > 0 ? exp / nextExp : 0,
      maxHP,
      baseAttack
    });
  }

  function readTotalExp() {
    try {
      return toNonNegativeInt(global.localStorage && global.localStorage.getItem(CONFIG.storageKey));
    } catch (_error) {
      return 0;
    }
  }

  function notify(detail) {
    if (typeof global.dispatchEvent !== "function" || typeof global.CustomEvent !== "function") return;
    global.dispatchEvent(new global.CustomEvent(CONFIG.eventName, { detail }));
  }

  function writeTotalExp(value, options) {
    const settings = options || {};
    const previousTotalExp = readTotalExp();
    const snapshot = calculate(value);
    try {
      if (global.localStorage) {
        global.localStorage.setItem(CONFIG.storageKey, String(snapshot.totalExp));
      }
    } catch (_error) {
      // 保存不可でも画面本体は止めない。
    }
    if (settings.notify !== false) {
      notify({
        amount: Number.isFinite(Number(settings.amount))
          ? Math.floor(Number(settings.amount))
          : snapshot.totalExp - previousTotalExp,
        previousTotalExp,
        ...snapshot
      });
    }
    return snapshot;
  }

  function addExp(value, options) {
    const amount = toNonNegativeInt(value);
    const previous = calculate(readTotalExp());
    if (!amount) {
      return Object.freeze({ amount: 0, previousTotalExp: previous.totalExp, levelsGained: 0, ...previous });
    }
    const snapshot = writeTotalExp(previous.totalExp + amount, {
      ...(options || {}),
      amount
    });
    return Object.freeze({
      amount,
      previousTotalExp: previous.totalExp,
      levelsGained: Math.max(0, snapshot.level - previous.level),
      ...snapshot
    });
  }

  function getSnapshot() {
    return calculate(readTotalExp());
  }

  global.RPGProgression = Object.freeze({
    config: CONFIG,
    calculate,
    getSnapshot,
    readTotalExp,
    writeTotalExp,
    addExp
  });
})(typeof window !== "undefined" ? window : globalThis);