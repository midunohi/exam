(() => {
  const { sources, weights, normalize, draw } = ExamSchedule;
  const storageKey = 'exam-mixed-rates-v1';
  const get = (id) => document.getElementById(id);
  const questions = get('questions');
  const characterPanel = get('characterPanel');
  const ratesPanel = get('ratesPanel');
  const ratesButton = get('ratesButton');
  const characterButton = get('characterButton');
  const frames = new Map();
  const base = new URL('apps/', location.href).href.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
  let saved;
  try { saved = JSON.parse(localStorage.getItem(storageKey)); } catch {}
  const rates = normalize(saved);
  let current = draw(rates);
  let panel = null;

  function notify(frame, visible) {
    frame.contentWindow.postMessage({ type: 'exam-visibility', visible }, '*');
  }

  function mount(id, label, container) {
    const frame = document.createElement('iframe');
    frame.title = label;
    frame.hidden = true;
    frame.addEventListener('load', () => notify(frame, !frame.hidden));
    frame.srcdoc = ExamViews[id].replace('<head>', () => '<head><base href="' + base + '">');
    frames.set(id, frame);
    container.append(frame);
  }

  function render() {
    const source = sources.find(({ id }) => id === current);
    if (source && !frames.has(current)) mount(current, source.label, questions);
    if (panel === 'character' && !frames.has('rpg_status')) {
      mount('rpg_status', 'キャラ画面', characterPanel);
    }

    questions.hidden = panel !== null;
    characterPanel.hidden = panel !== 'character';
    ratesPanel.hidden = panel !== 'rates';
    ratesButton.setAttribute('aria-expanded', String(panel === 'rates'));
    characterButton.setAttribute('aria-expanded', String(panel === 'character'));
    get('heading').textContent = source?.label ?? 'みづの 大学受験 問題集';
    get('empty').hidden = current !== null;

    const active = panel === 'character' ? 'rpg_status' : panel === null ? current : null;
    for (const [id, frame] of frames) {
      const visible = id === active;
      if (frame.hidden === visible) {
        frame.hidden = !visible;
        notify(frame, visible);
      }
    }
  }

  function toggle(next) {
    if (panel === next) {
      panel = null;
      if (current === null) current = draw(rates);
    } else {
      panel = next;
    }
    render();
  }

  for (const { id, label } of sources) {
    const row = document.createElement('label');
    const select = document.createElement('select');
    row.append(label, select);
    weights.forEach((weight, level) => {
      select.add(new Option(level === 0 ? '0（なし）' : level + '（' + weight + '倍）', level));
    });
    select.value = rates[id];
    select.addEventListener('change', () => {
      rates[id] = Number(select.value);
      try { localStorage.setItem(storageKey, JSON.stringify(rates)); } catch {}
    });
    get('rates').append(row);
  }

  function closePanel() {
    if (!panel) return;
    const button = panel === 'rates' ? ratesButton : characterButton;
    toggle(panel);
    button.focus();
  }

  ratesButton.addEventListener('click', () => toggle('rates'));
  characterButton.addEventListener('click', () => toggle('character'));
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closePanel();
  });
  window.addEventListener('message', (event) => {
    if (event.data?.type === 'exam-escape') {
      if (event.source === frames.get('rpg_status')?.contentWindow) closePanel();
      return;
    }
    if (event.data?.type !== 'exam-complete' || event.source !== frames.get(current)?.contentWindow) return;
    current = draw(rates);
    render();
  });
  render();
})();
