(function (global) {
  "use strict";

  const loadedScripts = new Map();

  function resolveElement(target) {
    if (typeof target === "string") return global.document.querySelector(target);
    return target && target.nodeType === 1 ? target : null;
  }

  function normalizeFileEntries(files) {
    if (!Array.isArray(files)) return [];
    return files.map((entry) => {
      if (Array.isArray(entry)) {
        const name = String(entry[0] ?? "").trim();
        const weight = Number(entry[1]);
        return {
          name,
          weight: Number.isFinite(weight) && weight > 0 ? weight : 0,
        };
      }
      return { name: String(entry ?? "").trim(), weight: 1 };
    }).filter((file) => file.name && file.weight > 0);
  }

  function injectScript(src) {
    if (loadedScripts.has(src)) return loadedScripts.get(src);
    const request = new Promise((resolve, reject) => {
      const script = global.document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => {
        loadedScripts.delete(src);
        reject(new Error(`load failed: ${src}`));
      };
      global.document.head.appendChild(script);
    });
    loadedScripts.set(src, request);
    return request;
  }

  function readGlobal(name) {
    try {
      return (0, eval)(name);
    } catch (_error) {
      return undefined;
    }
  }

  function toVariableSuffix(value) {
    return String(value).replace(/[^A-Za-z0-9_$]/g, "_");
  }

  function create(options) {
    const config = options || {};
    const questionsPerCategory = Math.max(1, Math.floor(Number(config.questionsPerCategory) || 3));
    const elements = Object.freeze({
      card: resolveElement(config.card || "#flashcard"),
      randomButton: resolveElement(config.randomButton || "#randomBtn"),
      categoryLabel: resolveElement(config.categoryLabel || "#categoryLabel"),
      countLabel: resolveElement(config.countLabel || "#countLabel"),
      totalCount: resolveElement(config.totalCount || "#totalCount"),
      progressTrack: resolveElement(config.progressTrack || "#progressTrack"),
      progressFill: resolveElement(config.progressFill || "#progressFill"),
    });

    if (!elements.card || !elements.randomButton || !elements.categoryLabel) {
      throw new Error("FlashcardCore: required card controls are missing");
    }
    if (typeof config.getFiles !== "function" || typeof config.loadCategory !== "function"
        || typeof config.renderItem !== "function") {
      throw new Error("FlashcardCore: getFiles, loadCategory and renderItem are required");
    }

    const rewardSettings = config.reward || {};
    const rewards = global.RPGStudyRewards && typeof global.RPGStudyRewards.create === "function"
      ? global.RPGStudyRewards.create({
          slot: config.rewardSlot || "#rewardSlot",
          icon: config.rewardIcon || "📖",
          exp: Number(rewardSettings.exp) || 1,
          dropChance: Number.isFinite(Number(rewardSettings.dropChance))
            ? Number(rewardSettings.dropChance)
            : 1 / 3,
          rankWeights: Array.isArray(rewardSettings.rankWeights)
            ? rewardSettings.rankWeights
            : [1],
          dropEvery: 0,
        })
      : { award() {}, hide() {} };

    const state = {
      items: [],
      category: "--",
      currentFileIndex: -1,
      categoryPool: [],
      remainingItemIndices: [],
      itemIndex: -1,
      cycleCount: 0,
      revealStep: 0,
      rewarded: false,
      busy: false,
    };

    const helpers = Object.freeze({
      injectScript,
      normalizeFileEntries,
      readGlobal,
      toVariableSuffix,
    });

    function revealTotal(item) {
      const total = typeof config.getRevealTotal === "function"
        ? Number(config.getRevealTotal(item))
        : 1;
      return Number.isFinite(total) && total > 0 ? Math.floor(total) : 0;
    }

    function resetItemQueue() {
      state.remainingItemIndices = state.items.map((_item, index) => index);
    }

    function takeRandomItemIndex() {
      if (!state.remainingItemIndices.length) return -1;
      const queueIndex = Math.floor(Math.random() * state.remainingItemIndices.length);
      const result = state.remainingItemIndices.splice(queueIndex, 1);
      return result[0];
    }

    function pickWeightedFileIndex(files, exceptIndex) {
      const poolIsInvalid = !state.categoryPool.length
        || state.categoryPool.some((index) => index < 0 || index >= files.length);
      if (poolIsInvalid) state.categoryPool = files.map((_file, index) => index);

      let candidates = state.categoryPool.map((index) => ({ file: files[index], index }));
      if (candidates.length > 1) {
        const withoutCurrent = candidates.filter(({ index }) => index !== exceptIndex);
        if (withoutCurrent.length) candidates = withoutCurrent;
      }

      const totalWeight = candidates.reduce((sum, item) => sum + item.file.weight, 0);
      let chosen = candidates[candidates.length - 1];
      if (totalWeight > 0) {
        let cursor = Math.random() * totalWeight;
        for (const candidate of candidates) {
          cursor -= candidate.file.weight;
          if (cursor < 0) {
            chosen = candidate;
            break;
          }
        }
      }
      state.categoryPool = state.categoryPool.filter((index) => index !== chosen.index);
      return chosen.index;
    }

    function setBusy(nextBusy) {
      state.busy = Boolean(nextBusy);
      elements.card.setAttribute("aria-busy", String(state.busy));
      elements.randomButton.disabled = state.busy;
    }

    function updateMeta() {
      const current = Math.min(state.cycleCount, questionsPerCategory);
      const item = state.items[state.itemIndex];
      const total = item ? revealTotal(item) : 0;
      const isComplete = Boolean(item) && (total === 0 ? state.rewarded : state.revealStep >= total);
      const completed = isComplete ? current : Math.max(0, current - 1);
      const percent = (completed / questionsPerCategory) * 100;

      elements.categoryLabel.textContent = state.category;
      if (elements.totalCount) elements.totalCount.textContent = `全${state.items.length}問`;
      if (elements.countLabel) elements.countLabel.textContent = `${current} / ${questionsPerCategory}`;
      if (elements.progressFill) elements.progressFill.style.width = `${percent}%`;
      if (elements.progressTrack) {
        elements.progressTrack.setAttribute("aria-valuemax", String(questionsPerCategory));
        elements.progressTrack.setAttribute("aria-valuenow", String(completed));
        elements.progressTrack.setAttribute("aria-valuetext", `${completed}問解答済み`);
      }
    }

    async function renderCurrent() {
      const item = state.items[state.itemIndex];
      if (!item) {
        if (typeof config.renderEmpty === "function") config.renderEmpty({ elements, state });
        updateMeta();
        return;
      }
      await config.renderItem({
        elements,
        item,
        itemIndex: state.itemIndex,
        revealStep: state.revealStep,
        revealTotal: revealTotal(item),
        state,
      });
      updateMeta();
    }

    function normalizeCategoryResult(result, fallbackName) {
      if (Array.isArray(result)) return { category: fallbackName, items: result };
      return {
        category: String(result?.category || fallbackName || "--"),
        items: Array.isArray(result?.items) ? result.items : [],
      };
    }

    async function resolveCategory(name) {
      try {
        const result = normalizeCategoryResult(await config.loadCategory(name, helpers), name);
        if (!result.items.length) throw new Error(`${name} にカードがありません`);
        return result;
      } catch (error) {
        if (typeof config.getFallback !== "function") throw error;
        const fallback = normalizeCategoryResult(
          await config.getFallback(error, { name, helpers }),
          "stub"
        );
        if (!fallback.items.length) throw error;
        return fallback;
      }
    }

    async function loadRandomCategory(exceptIndex = state.currentFileIndex) {
      rewards.hide();
      if (typeof config.renderLoading === "function") config.renderLoading({ elements, state });

      const files = normalizeFileEntries(await config.getFiles(helpers));
      const selectedIndex = files.length ? pickWeightedFileIndex(files, exceptIndex) : -1;
      const selectedName = selectedIndex >= 0 ? files[selectedIndex].name : "stub";
      const result = await resolveCategory(selectedName);

      state.items = result.items;
      state.category = result.category;
      state.currentFileIndex = selectedIndex;
      state.cycleCount = 1;
      state.revealStep = 0;
      state.rewarded = false;
      resetItemQueue();
      state.itemIndex = takeRandomItemIndex();
      await renderCurrent();
    }

    function reachedCategoryLimit() {
      return state.cycleCount >= questionsPerCategory || !state.remainingItemIndices.length;
    }

    async function nextCard() {
      rewards.hide();
      if (reachedCategoryLimit()) {
        await loadRandomCategory();
        return;
      }
      state.itemIndex = takeRandomItemIndex();
      if (state.itemIndex < 0) {
        await loadRandomCategory();
        return;
      }
      state.cycleCount += 1;
      state.revealStep = 0;
      state.rewarded = false;
      await renderCurrent();
    }

    async function advance() {
      const item = state.items[state.itemIndex];
      if (!item) return;
      const total = revealTotal(item);

      if (total === 0) {
        if (!state.rewarded) {
          rewards.award();
          state.rewarded = true;
          updateMeta();
          return;
        }
        await nextCard();
        return;
      }

      if (state.revealStep < total) {
        state.revealStep += 1;
        await renderCurrent();
        if (state.revealStep >= total && !state.rewarded) {
          rewards.award();
          state.rewarded = true;
        }
        return;
      }

      await nextCard();
    }

    async function runBusy(action) {
      if (state.busy) return;
      setBusy(true);
      try {
        await action();
      } catch (error) {
        console.error(error);
      } finally {
        setBusy(false);
      }
    }

    elements.card.addEventListener("click", () => runBusy(advance));
    elements.randomButton.addEventListener("click", (event) => {
      event.stopPropagation();
      runBusy(() => loadRandomCategory());
    });
    global.addEventListener("keydown", (event) => {
      if (event.code !== "Space" && event.code !== "Enter") return;
      if (event.target instanceof Element
          && event.target.closest("button, a, input, select, textarea, [contenteditable='true']")) return;
      event.preventDefault();
      runBusy(advance);
    }, { passive: false });

    const controller = Object.freeze({
      start: () => runBusy(() => loadRandomCategory(-1)),
      advance: () => runBusy(advance),
      switchCategory: () => runBusy(() => loadRandomCategory()),
      getState: () => ({ ...state, items: state.items.slice() }),
    });

    if (config.autoStart !== false) controller.start();
    return controller;
  }

  global.FlashcardCore = Object.freeze({
    create,
    injectScript,
    normalizeFileEntries,
    readGlobal,
    toVariableSuffix,
  });
})(window);
