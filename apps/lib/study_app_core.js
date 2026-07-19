(function (global) {
  "use strict";

  function resolveElement(target) {
    if (typeof target === "string") return global.document.querySelector(target);
    return target && target.nodeType === 1 ? target : null;
  }

  function randomInt(min, max) {
    const lower = Math.ceil(Math.min(Number(min), Number(max)));
    const upper = Math.floor(Math.max(Number(min), Number(max)));
    if (!Number.isFinite(lower) || !Number.isFinite(upper)) return 0;
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
  }

  function shuffle(list) {
    const result = Array.isArray(list) ? list.slice() : [];
    for (let index = result.length - 1; index > 0; index -= 1) {
      const swapIndex = randomInt(0, index);
      [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
    }
    return result;
  }

  function blurActiveElement() {
    const active = global.document && global.document.activeElement;
    if (active && typeof active.blur === "function") active.blur();
  }

  function createResultHistory(options) {
    const settings = typeof options === "string" || options?.nodeType === 1
      ? { target: options }
      : (options || {});
    const element = resolveElement(settings.target);
    if (!element) throw new Error("StudyAppCore: result history target is required");

    const limit = Math.max(1, Math.floor(Number(settings.limit) || 6));
    const prepend = settings.prepend !== false;
    element.classList.add("study-result-history");
    if (!element.hasAttribute("role")) element.setAttribute("role", "log");
    if (!element.hasAttribute("aria-live")) element.setAttribute("aria-live", "polite");
    if (!element.hasAttribute("aria-relevant")) element.setAttribute("aria-relevant", "additions");

    function add(result, text) {
      const input = result && typeof result === "object"
        ? result
        : { ok: Boolean(result), text };
      const line = global.document.createElement(settings.itemTag || "div");
      line.className = `study-result-entry ${input.ok ? "ok" : "ng"}`;
      line.textContent = String(input.text ?? "");
      if (prepend) element.prepend(line);
      else element.append(line);

      while (element.children.length > limit) {
        if (prepend) element.lastElementChild.remove();
        else element.firstElementChild.remove();
      }
      return line;
    }

    function clear() {
      element.replaceChildren();
    }

    return Object.freeze({ element, add, clear });
  }

  global.StudyAppCore = Object.freeze({
    blurActiveElement,
    createResultHistory,
    randomInt,
    shuffle,
  });
})(window);
