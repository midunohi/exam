(function (global) {
  "use strict";

  // 装備バランスはここだけを編集する。
  const CONFIG = Object.freeze({
    storageKey: "midunohi.exam.equipment.v1",
    mergeCount: 3,
    ranks: Object.freeze([
      { rank: 1, name: "木の剣",       icon: "🗡️", atkBonusPct: 10 },
      { rank: 2, name: "青銅の剣",     icon: "⚔️", atkBonusPct: 30 },
      { rank: 3, name: "鉄の剣",       icon: "⚔️", atkBonusPct: 50 },
      { rank: 4, name: "騎士の剣",     icon: "⚔️", atkBonusPct: 75 },
      { rank: 5, name: "ミスリルの剣", icon: "🔹", atkBonusPct: 110 },
      { rank: 6, name: "炎の剣",       icon: "🔥", atkBonusPct: 150 },
      { rank: 7, name: "竜殺しの剣",   icon: "🐉", atkBonusPct: 200 },
      { rank: 8, name: "聖剣",         icon: "✨", atkBonusPct: 275 },
      { rank: 9, name: "星神の剣",     icon: "🌟", atkBonusPct: 400 }
    ])
  });

  const MAX_RANK = CONFIG.ranks.length;

  function emptyState() {
    return { version: 1, counts: Array(MAX_RANK + 1).fill(0) };
  }

  function normalizeState(value) {
    const state = emptyState();
    const source = value && Array.isArray(value.counts) ? value.counts : [];
    for (let rank = 1; rank <= MAX_RANK; rank += 1) {
      const count = Number(source[rank]);
      state.counts[rank] = Number.isFinite(count) && count > 0 ? Math.floor(count) : 0;
    }
    return state;
  }

  function readState() {
    try {
      const raw = global.localStorage && global.localStorage.getItem(CONFIG.storageKey);
      return raw ? normalizeState(JSON.parse(raw)) : emptyState();
    } catch (_error) {
      return emptyState();
    }
  }

  function writeState(state) {
    try {
      if (global.localStorage) {
        global.localStorage.setItem(CONFIG.storageKey, JSON.stringify(normalizeState(state)));
      }
    } catch (_error) {
      // 保存不可でも学習ページ本体は止めない。
    }
  }

  function weaponAt(rank, count) {
    const meta = CONFIG.ranks[rank - 1];
    return meta ? { ...meta, count: Math.max(0, Math.floor(Number(count) || 0)) } : null;
  }

  function mergeCounts(counts) {
    const merges = [];
    for (let rank = 1; rank < MAX_RANK; rank += 1) {
      const mergedAmount = Math.floor(counts[rank] / CONFIG.mergeCount);
      if (mergedAmount <= 0) continue;
      counts[rank] -= mergedAmount * CONFIG.mergeCount;
      counts[rank + 1] += mergedAmount;
      merges.push({
        amount: mergedAmount,
        consumed: mergedAmount * CONFIG.mergeCount,
        from: weaponAt(rank, counts[rank]),
        to: weaponAt(rank + 1, counts[rank + 1])
      });
    }
    return merges;
  }

  function inventoryFrom(state) {
    return CONFIG.ranks.map((meta) => weaponAt(meta.rank, state.counts[meta.rank]));
  }

  function equippedFrom(state) {
    for (let rank = MAX_RANK; rank >= 1; rank -= 1) {
      if (state.counts[rank] > 0) return weaponAt(rank, state.counts[rank]);
    }
    return null;
  }

  function snapshot(state) {
    const inventory = inventoryFrom(state);
    const equipped = equippedFrom(state);
    return {
      inventory,
      equipped,
      attackMultiplier: equipped ? 1 + equipped.atkBonusPct / 100 : 1
    };
  }

  function notify(state) {
    if (typeof global.dispatchEvent !== "function" || typeof global.CustomEvent !== "function") return;
    global.dispatchEvent(new global.CustomEvent("rpg-equipment-change", { detail: snapshot(state) }));
  }

  function addWeapon(rank, amount) {
    const safeRank = Math.max(1, Math.min(MAX_RANK, Math.floor(Number(rank) || 1)));
    const safeAmount = Math.max(1, Math.floor(Number(amount) || 1));
    const state = readState();
    state.counts[safeRank] += safeAmount;
    const dropped = weaponAt(safeRank, safeAmount);
    const merges = mergeCounts(state.counts);
    writeState(state);
    notify(state);
    return { dropped, merges, ...snapshot(state) };
  }

  function getAttackStats(baseAttack) {
    const base = Math.max(0, Math.round(Number(baseAttack) || 0));
    const state = readState();
    const equipped = equippedFrom(state);
    const multiplier = equipped ? 1 + equipped.atkBonusPct / 100 : 1;
    const total = equipped ? Math.max(base, Math.ceil(base * multiplier)) : base;
    return { base, bonus: total - base, total, multiplier, equipped };
  }

  global.RPGEquipment = Object.freeze({
    config: CONFIG,
    dropRankOne: () => addWeapon(1, 1),
    addWeapon,
    getInventory: () => inventoryFrom(readState()),
    getEquippedWeapon: () => equippedFrom(readState()),
    getAttackMultiplier: () => snapshot(readState()).attackMultiplier,
    getAttackStats
  });
})(typeof window !== "undefined" ? window : globalThis);
