(() => {
  const { sources, weights, normalize, draw } = ExamSchedule;
  const storageKey = 'exam-mixed-rates-v1';
  const get = (id) => document.getElementById(id);
  const questions = get('questions');
  const characterPanel = get('characterPanel');
  const questionsButton = get('questionsButton');
  const characterButton = get('characterButton');
  const frames = new Map();
  const base = new URL('apps/', location.href).href.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
  let saved;
  try { saved = JSON.parse(localStorage.getItem(storageKey)); } catch {}
  const rates = normalize(saved);
  let current = draw(rates);
  let characterOpen = false;

  function notify(frame, visible) {
    frame.contentWindow.postMessage({ type: 'exam-visibility', visible }, '*');
  }

  function mount(id, label, container) {
    const frame = document.createElement('iframe');
    frame.title = label;
    frame.hidden = true;
    frame.addEventListener('load', () => {
      notify(frame, !frame.hidden);
      if (id === 'rpg_status') {
        frame.contentWindow.postMessage({ type: 'exam-rate-options', sources, weights, rates }, '*');
      }
    });
    frame.srcdoc = ExamViews[id].replace('<head>', () => '<head><base href="' + base + '">');
    frames.set(id, frame);
    container.append(frame);
  }

  function render() {
    const source = sources.find(({ id }) => id === current);
    if (source && !frames.has(current)) mount(current, source.label, questions);
    if (characterOpen && !frames.has('rpg_status')) {
      mount('rpg_status', 'キャラ画面', characterPanel);
    }

    questions.hidden = characterOpen;
    characterPanel.hidden = !characterOpen;
    characterButton.setAttribute('aria-expanded', String(characterOpen));
    get('heading').textContent = characterOpen ? 'キャラステータス' : source?.label ?? 'みづの 大学受験 問題集';
    get('empty').hidden = current !== null;

    const active = characterOpen ? 'rpg_status' : current;
    for (const [id, frame] of frames) {
      const visible = id === active;
      if (frame.hidden === visible) {
        frame.hidden = !visible;
        notify(frame, visible);
      }
    }
  }

  function showQuestions() {
    characterOpen = false;
    if (current === null) current = draw(rates);
    render();
  }

  function closeCharacter() {
    if (!characterOpen) return;
    showQuestions();
    characterButton.focus();
  }

  questionsButton.addEventListener('click', showQuestions);
  characterButton.addEventListener('click', () => {
    if (characterOpen) closeCharacter();
    else {
      characterOpen = true;
      render();
    }
  });
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeCharacter();
  });
  window.addEventListener('message', (event) => {
    if (event.source === frames.get('rpg_status')?.contentWindow) {
      const data = event.data;
      if (data?.type === 'exam-escape') closeCharacter();
      if (data?.type === 'exam-rate-change' && Object.hasOwn(rates, data.id)
          && Number.isInteger(data.level) && data.level >= 0 && data.level < weights.length) {
        rates[data.id] = data.level;
        try { localStorage.setItem(storageKey, JSON.stringify(rates)); } catch {}
      }
      return;
    }
    if (event.data?.type !== 'exam-complete' || event.source !== frames.get(current)?.contentWindow) return;
    current = draw(rates);
    render();
  });
  render();
})();
