const ExamView = (() => {
  const visibilityListeners = [];
  let visible = false;

  window.addEventListener('message', (event) => {
    if (event.source !== parent || event.data?.type !== 'exam-visibility') return;
    if (visible === event.data.visible) return;
    visible = event.data.visible;
    for (const listener of visibilityListeners) listener(visible);
  });
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') parent.postMessage({ type: 'exam-escape' }, '*');
  });


  // 次問の準備時だけ測定し、解答表示・画面復帰・リサイズでは決め直さない。
  const questionLayouts = new WeakMap();
  const originalFonts = new WeakMap();
  const pendingLayouts = new Set();

  function applyQuestionFonts(root, layout) {
    const targets = Array.from(root.querySelectorAll(layout.selector));
    targets.forEach((target, index) => {
      if (layout.sizes[index] !== undefined) {
        target.style.setProperty('font-size', layout.sizes[index] + 'px', 'important');
      }
    });
  }

  function measureQuestion(root, layout) {
    if (root.getBoundingClientRect().width <= 0) {
      pendingLayouts.add(root);
      return;
    }
    let targets = Array.from(root.querySelectorAll(layout.selector));
    targets.forEach(target => {
      if (!originalFonts.has(target)) {
        originalFonts.set(target, {
          value: target.style.getPropertyValue('font-size'),
          priority: target.style.getPropertyPriority('font-size'),
        });
      }
      const original = originalFonts.get(target);
      if (original.value) target.style.setProperty('font-size', original.value, original.priority);
      else target.style.removeProperty('font-size');
    });
    layout.beforeFit?.();
    targets = Array.from(root.querySelectorAll(layout.selector));
    const baseSizes = targets.map(target => parseFloat(getComputedStyle(target).fontSize) || 16);
    const top = root.getBoundingClientRect().top;
    const availableHeight = Math.max(160, Math.min(640, window.innerHeight - top - 16));
    for (let step = 0; step <= 6; step += 1) {
      const scale = 1 - step * 0.05;
      layout.sizes = baseSizes.map(size =>
        Math.round(Math.max(Math.min(layout.minFont, size), size * scale) * 10) / 10);
      applyQuestionFonts(root, layout);
      const hasWideContent = targets.some(target => target.scrollWidth > target.clientWidth + 1);
      if (root.getBoundingClientRect().height <= availableHeight && !hasWideContent) break;
    }
    layout.fitted = true;
    pendingLayouts.delete(root);
  }

  function fitQuestion(root, key, selector, options = {}) {
    if (!root) return;
    let layout = questionLayouts.get(root);
    if (!layout || layout.key !== key) {
      layout = { key, selector, minFont: options.minFont || 16, beforeFit: options.beforeFit, fitted: false };
      questionLayouts.set(root, layout);
      measureQuestion(root, layout);
    } else if (layout.fitted) {
      // 英単語・例文の解答表示でDOMを作り直しても、同じpx値を引き継ぐ。
      applyQuestionFonts(root, layout);
    }
  }

  visibilityListeners.push(isVisible => {
    if (!isVisible) return;
    requestAnimationFrame(() => {
      for (const root of pendingLayouts) {
        const layout = questionLayouts.get(root);
        if (layout && !layout.fitted) measureQuestion(root, layout);
      }
    });
  });

  return {
    fitQuestion,
    complete: () => parent.postMessage({ type: 'exam-complete' }, '*'),
    onVisibility: (listener) => visibilityListeners.push(listener),
  };
})();
