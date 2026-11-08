window.addEventListener('message', (event) => {
  if (event.source !== parent || event.data?.type !== 'exam-rate-options') return;

  const { sources, weights, rates } = event.data;
  const fields = sources.map(({ id, label }) => {
    const row = document.createElement('label');
    const select = document.createElement('select');
    row.append(label, select);
    weights.forEach((weight, level) => {
      select.add(new Option(level === 0 ? '0（なし）' : level + '（' + weight + '倍）', level));
    });
    select.value = rates[id];
    select.addEventListener('change', () => {
      parent.postMessage({ type: 'exam-rate-change', id, level: Number(select.value) }, '*');
    });
    return row;
  });
  document.getElementById('rates').replaceChildren(...fields);
});
