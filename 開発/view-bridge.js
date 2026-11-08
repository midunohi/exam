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

  return {
    complete: () => parent.postMessage({ type: 'exam-complete' }, '*'),
    onVisibility: (listener) => visibilityListeners.push(listener),
  };
})();
