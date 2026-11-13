const ExamViews = Object.create(null);

const ExamSchedule = (() => {
  const weights = Object.freeze([0, 1, 2, 3, 5, 8, 12, 20, 30, 50, 100]);
  const sources = Object.freeze([
    { id: 'fc_tex', label: '各科目フラッシュカード' },
    { id: 'fc_enExamples', label: '英単語・例文' },
    { id: 'speed_reading', label: '英文速読4択' },
    { id: 'flash_mental_math', label: 'フラッシュ暗算' },
    { id: 'rpg_vocabulary', label: '英単語4択' },
  ]);

  function normalize(saved) {
    return Object.fromEntries(sources.map(({ id }) => {
      const rate = saved?.[id];
      return [id, Number.isInteger(rate) && rate >= 0 && rate < weights.length ? rate : 1];
    }));
  }

  function draw(rates, random = Math.random) {
    const total = sources.reduce((sum, { id }) => sum + weights[rates[id]], 0);
    if (!total) return null;
    let point = random() * total;
    for (const { id } of sources) {
      point -= weights[rates[id]];
      if (point < 0) return id;
    }
    return null;
  }

  return { sources, weights, normalize, draw };
})();
