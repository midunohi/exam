// ===== 速読の難易度・報酬バランス（調整はここだけ） =====
const SPEED_REWARD_CONFIG = Object.freeze({
  speed: Object.freeze({
    minWpm: 60,
    maxWpm: 300,
    defaultWpm: 200,
    correctDeltaWpm: 3,
    wrongDeltaWpm: 3,
    keyboardDeltaWpm: 5,
  }),
  reward: Object.freeze({
    minExp: 2,
    maxExp: 7,
    minDropChance: 0.14,
    maxDropChance: 0.40,
    // RANK 1 の重みを100とした、最低速〜最高速での相対抽選重み。
    rank2Weight: Object.freeze([1, 18]),
    rank3Weight: Object.freeze([0, 4]),
    rank4Weight: Object.freeze([0, 0.8]),
  }),
});

const fallbackPassages = [
  [
    "Choose the academic word that means to guess something from evidence. Entrance exams often ask readers to do this when the writer's opinion is not stated directly.",
    ["infer", "deny", "copy", "delay"]
  ],
  [
    "Choose the word that means a lack of necessary resources. In economics and history, this often causes conflict and difficult choices.",
    ["scarcity", "luxury", "surplus", "leisure"]
  ],
  [
    "Choose the word that means to make something clear by giving reasons or examples. This skill is important in English, history, and science answers.",
    ["explain", "hide", "forget", "repeat"]
  ],
  [
    "Choose the word that means to examine something carefully. Students do this when they read data, sources, or a difficult passage.",
    ["analyze", "ignore", "guess", "erase"]
  ],
  [
    "Choose the word that means the main idea of a paragraph or essay. Title questions often test whether you can find this.",
    ["theme", "detail", "error", "noise"]
  ],
  [
    "Choose the word that means a reason or proof supporting an idea. In essays and reading passages, writers use this to persuade readers.",
    ["evidence", "emotion", "silence", "chance"]
  ],
  [
    "Choose the word that means a small difference in meaning. Advanced vocabulary questions often test this.",
    ["nuance", "habit", "speed", "shape"]
  ],
  [
    "Choose the word that means to say the same idea in different words. This is useful for synonym and summary questions.",
    ["paraphrase", "memorize", "calculate", "decorate"]
  ],
  [
    "Choose the word that means a phrase that is often used together, such as pay attention or play a role.",
    ["collocation", "particle", "equation", "empire"]
  ],
  [
    "Choose the word that means a word with a similar meaning. Entrance exams often replace the passage wording with this.",
    ["synonym", "contrast", "diagram", "fiction"]
  ],
  [
    "Choose the word that means a word with the opposite meaning. Contrast clues often help readers find it.",
    ["antonym", "summary", "source", "method"]
  ],
  [
    "Choose the word that means the writer's attitude. Reading questions may ask whether the writer is critical, neutral, or supportive.",
    ["tone", "area", "mass", "trade"]
  ],
  [
    "Choose the word that means a question used for effect, not because the writer expects an answer.",
    ["rhetorical", "chemical", "ancient", "random"]
  ],
  [
    "Choose the word that means comparison using like or as. This appears in English and literature.",
    ["simile", "policy", "friction", "enzyme"]
  ],
  [
    "Choose the word that means describing one thing as another to suggest a deeper meaning.",
    ["metaphor", "budget", "gravity", "climate"]
  ],
  [
    "Choose the word that means the force that pulls objects toward Earth. It is a basic idea in physics.",
    ["gravity", "democracy", "species", "syntax"]
  ],
  [
    "Choose the word that means resistance between surfaces. It explains why a moving object slows down.",
    ["friction", "election", "glucose", "context"]
  ],
  [
    "Choose the word that means the tendency of an object to keep its state of motion. Newton's first law is about this.",
    ["inertia", "income", "oxygen", "culture"]
  ],
  [
    "Choose the word that means stored energy. A lifted object or stretched spring can have this kind of energy.",
    ["potential", "literal", "colonial", "passive"]
  ],
  [
    "Choose the word that means how often a wave repeats. It is used in sound, light, and waves.",
    ["frequency", "scarcity", "heritage", "equality"]
  ],
  [
    "Choose the word that means a substance that speeds up a chemical reaction without being used up.",
    ["catalyst", "empire", "subject", "glacier"]
  ],
  [
    "Choose the word that means a reaction between an acid and a base. It produces a salt and water.",
    ["neutralization", "industrialization", "photosynthesis", "urbanization"]
  ],
  [
    "Choose the word that means loss of electrons in chemistry. It is often paired with reduction.",
    ["oxidation", "migration", "quotation", "isolation"]
  ],
  [
    "Choose the word that means atoms of the same element with different masses.",
    ["isotope", "idiom", "market", "monsoon"]
  ],
  [
    "Choose the word that means the table that organizes chemical elements. It helps predict properties.",
    ["periodic", "feudal", "ethical", "tropical"]
  ],
  [
    "Choose the word that means the process plants use to make food using light.",
    ["photosynthesis", "democracy", "navigation", "inflation"]
  ],
  [
    "Choose the word for the cell part that releases energy from nutrients. It is often called the powerhouse of the cell.",
    ["mitochondria", "constitution", "peninsula", "alliteration"]
  ],
  [
    "Choose the word that means a living thing changes over generations to fit its environment better.",
    ["adaptation", "translation", "taxation", "quotation"]
  ],
  [
    "Choose the word that means variety of living things in an ecosystem. Environmental questions often use this word.",
    ["biodiversity", "sovereignty", "productivity", "ambiguity"]
  ],
  [
    "Choose the word that means the natural surroundings where an organism lives.",
    ["habitat", "budget", "accent", "treaty"]
  ],
  [
    "Choose the word that means long-term weather patterns of an area. Geography and environmental science often discuss it.",
    ["climate", "sentence", "protein", "fiction"]
  ],
  [
    "Choose the word that means seasonal wind. It strongly affects rainfall in South and Southeast Asia.",
    ["monsoon", "enzyme", "symbol", "reform"]
  ],
  [
    "Choose the word that means movement of people from one place to another. Geography and history often study this.",
    ["migration", "gravity", "syntax", "voltage"]
  ],
  [
    "Choose the word that means the growth of cities. It is important in geography, economics, and modern history.",
    ["urbanization", "neutralization", "photosynthesis", "specialization"]
  ],
  [
    "Choose the word that means the rebirth of art and learning in Europe. It is a major topic in world history.",
    ["Renaissance", "Parliament", "Friction", "Glucose"]
  ],
  [
    "Choose the word that means a social system based on land, lords, and vassals. Medieval history often uses this term.",
    ["feudalism", "capitalism", "magnetism", "organism"]
  ],
  [
    "Choose the word that means rule over another country or region for political and economic gain.",
    ["imperialism", "metabolism", "parallelism", "organism"]
  ],
  [
    "Choose the word that means a formal agreement between countries. World history and civics often use it.",
    ["treaty", "enzyme", "radius", "clause"]
  ],
  [
    "Choose the word that means a political system where citizens choose leaders by voting.",
    ["democracy", "chemistry", "frequency", "scarcity"]
  ],
  [
    "Choose the word that means the basic law of a country. Civics questions often discuss rights and government through this.",
    ["constitution", "concentration", "civilization", "circulation"]
  ],
  [
    "Choose the word that means the right of a state to govern itself. It is important in politics and international relations.",
    ["sovereignty", "diversity", "density", "velocity"]
  ],
  [
    "Choose the word that means a general rise in prices. Economics questions often connect it with money and purchasing power.",
    ["inflation", "inference", "friction", "evolution"]
  ],
  [
    "Choose the word that means money spent by a government, family, or organization according to a plan.",
    ["budget", "idiom", "cell", "wave"]
  ],
  [
    "Choose the word that means tax money or other income received by a government.",
    ["revenue", "context", "protein", "empire"]
  ],
  [
    "Choose the word that means fairness in society. Civics and ethics often discuss this idea.",
    ["justice", "glacier", "voltage", "metaphor"]
  ]
];

    let questionGroups = [];

    const speedSlider  = document.getElementById('speedSlider');
    const speedLabel   = document.getElementById('speedLabel');
    const wordDisplay  = document.getElementById('wordDisplay');
    const progressLabel = document.getElementById('progressLabel');
    const categoryLabel = document.getElementById('categoryLabel');
    const totalCount = document.getElementById('totalCount');
    const wordBox = document.querySelector('.word-box');
    const wordArea = document.querySelector('.word-area');
    // この英文の全単語を重ねて測り、単語切替中の枠サイズを保つ。
    const wordSizer = document.createElement('div');
    wordSizer.className = 'word reading-word-sizer';
    wordSizer.setAttribute('aria-hidden', 'true');
    wordArea.appendChild(wordSizer);
    const quizArea = document.getElementById('quizArea');
    const quizPrompt = document.getElementById('quizPrompt');
    const choicesEl = document.getElementById('choices');
    const feedbackEl = document.getElementById('feedback');
    const rewards = window.RPGStudyRewards.create({
      slot: '#rewardSlot',
      icon: '📜',
      dropEvery: 0
    });
    const results = window.StudyAppCore.createResultHistory({
      target: '#resultHistory',
      limit: 6
    });
    let expAwarded = false;
    let words = [];
    let index = 0;
    let running = false;
    let timerId = null;
    let currentPassage = null;
    let answered = false;
    let resetTimerId = null;
    let ready = false;
    let loadError = "";
    let currentCategoryIndex = -1;
    let categoryPool = [];

    function wpmToIntervalMs(wpm) {
      return 60000 / Math.max(1, wpm);
    }

    function clamp(value, min, max) {
      return Math.max(min, Math.min(max, value));
    }

    function mix(from, to, ratio) {
      return from + (to - from) * ratio;
    }

    function rewardForWpm(wpm) {
      const speed = SPEED_REWARD_CONFIG.speed;
      const reward = SPEED_REWARD_CONFIG.reward;
      const ratio = clamp((Number(wpm) - speed.minWpm) / (speed.maxWpm - speed.minWpm), 0, 1);
      return {
        exp: Math.max(1, Math.round(mix(reward.minExp, reward.maxExp, ratio))),
        dropChance: mix(reward.minDropChance, reward.maxDropChance, ratio),
        rankWeights: [
          100,
          mix(reward.rank2Weight[0], reward.rank2Weight[1], ratio),
          mix(reward.rank3Weight[0], reward.rank3Weight[1], ratio * ratio),
          mix(reward.rank4Weight[0], reward.rank4Weight[1], ratio * ratio * ratio),
        ],
      };
    }

    function setWpm(value) {
      const speed = SPEED_REWARD_CONFIG.speed;
      speedSlider.value = String(Math.round(
        clamp(Number(value) || speed.defaultWpm, speed.minWpm, speed.maxWpm)
      ));
      updateSpeedLabel();
    }

    function adjustWpm(delta) {
      setWpm(Number(speedSlider.value) + Number(delta || 0));
    }

    function updateSpeedLabel() {
      const wpm = Number(speedSlider.value);
      speedLabel.textContent = wpm + " wpm";
      if (running) startTimer();
    }

    function updateDisplay() {
      if (!ready) {
        wordDisplay.textContent = loadError ? "読込失敗" : "loading…";
        progressLabel.textContent = "0 / 0";
        return;
      }
      if (!words.length) {
        wordDisplay.textContent = "開始";
        progressLabel.textContent = "0 / 0";
        return;
      }
      if (!running && !answered && !isQuizVisible() && index === 0) {
        wordDisplay.textContent = "開始";
        progressLabel.textContent = "0 / " + words.length;
        return;
      }
      const current = Math.min(index + 1, words.length);
      wordDisplay.textContent = words[index] || "";
      progressLabel.textContent = current + " / " + words.length;
    }

    function updateCategoryMeta() {
      const group = questionGroups[currentCategoryIndex];
      if (categoryLabel) categoryLabel.textContent = group?.subject || "--";
      if (totalCount) totalCount.textContent = `全${group?.items?.length || 0}問`;
    }

    function selectRandomCategory(exceptIndex = currentCategoryIndex) {
      if (!questionGroups.length) return;
      if (!categoryPool.length || categoryPool.some((value) => value < 0 || value >= questionGroups.length)) {
        categoryPool = questionGroups.map((_group, index) => index);
      }
      let candidates = categoryPool.filter((value) => questionGroups.length === 1 || value !== exceptIndex);
      if (!candidates.length) {
        categoryPool = questionGroups.map((_group, index) => index);
        candidates = categoryPool.filter((value) => questionGroups.length === 1 || value !== exceptIndex);
      }
      const selected = candidates[Math.floor(Math.random() * candidates.length)] ?? 0;
      categoryPool = categoryPool.filter((value) => value !== selected);
      currentCategoryIndex = selected;
      updateCategoryMeta();
    }

    function isQuizVisible() {
      return !!(quizArea && quizArea.classList.contains("is-visible"));
    }

    function updateStartable() {
      const canStart = ready && !running && !answered && !isQuizVisible();
      if (wordBox) wordBox.classList.toggle("is-startable", canStart);
    }

    function normalizePassage(entry, subject = "") {
      if (Array.isArray(entry)) {
        return {
          text: String(entry[0] || ""),
          choices: Array.isArray(entry[1]) ? entry[1].map(String).filter(Boolean) : [],
          subject: String(subject || entry[2] || "")
        };
      }
      if (entry && typeof entry === "object") {
        return {
          text: String(entry.text || ""),
          choices: Array.isArray(entry.choices) ? entry.choices.map(String).filter(Boolean) : [],
          subject: String(entry.subject || subject || "")
        };
      }
      return { text: String(entry || ""), choices: [], subject: String(subject || "") };
    }

    function readGlobal(name) {
      try {
        return (0, eval)(name);
      } catch (_error) {
        return undefined;
      }
    }

    function injectScript(src) {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = () => reject(new Error(`load failed: ${src}`));
        document.head.appendChild(script);
      });
    }

    function toVariableSuffix(value) {
      return String(value).replace(/[^A-Za-z0-9_$\u0080-\uFFFF]/g, "_");
    }

    async function loadQuestionBank() {
      const entries = typeof files_qaSpeedReading !== "undefined" && Array.isArray(files_qaSpeedReading)
        ? files_qaSpeedReading
        : [];
      try {
        const groups = await Promise.all(entries.map(async (entry) => {
          const subject = String(Array.isArray(entry) ? entry[0] : entry).trim();
          if (!subject) return null;
          await injectScript(encodeURI(`../qa_speed_reading/${subject}.js`));
          const raw = readGlobal(`qaSpeedReading_${toVariableSuffix(subject)}`);
          if (!Array.isArray(raw)) throw new Error(`${subject}.js に問題がありません`);
          const items = raw.map((item) => normalizePassage(item, subject)).filter((item) =>
            item.text && item.choices.length === 4 && new Set(item.choices).size === 4
          );
          return items.length ? { subject, items } : null;
        }));
        questionGroups = groups.filter(Boolean);
        if (!questionGroups.length) throw new Error("有効な問題がありません");
        ready = true;
      } catch (error) {
        console.error(error);
        const items = fallbackPassages.map((item) => normalizePassage(item, "英語"));
        questionGroups = items.length ? [{ subject: "英語", items }] : [];
        ready = questionGroups.length > 0;
        loadError = ready ? "" : String(error?.message || error);
      }
      if (ready) {
        resetToStart();
      }
      updateDisplay();
      updateCategoryMeta();
      updateStartable();
    }

    function hideQuiz() {
      answered = false;
      if (quizArea) quizArea.classList.remove("is-visible");
      if (wordArea) wordArea.style.display = "grid";
      if (choicesEl) choicesEl.innerHTML = "";
      if (feedbackEl) feedbackEl.textContent = "";
      updateStartable();
    }

    function prepareQuiz() {
      if (!currentPassage || !choicesEl) return;
      quizPrompt.textContent = currentPassage.text;
      const correct = currentPassage.choices[0];
      const choices = window.StudyAppCore.shuffle(currentPassage.choices.slice(0, 4));
      choicesEl.replaceChildren();
      choices.forEach((choice) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "choice-btn";
        btn.textContent = choice;
        btn.addEventListener("click", () => answerChoice(btn, choice === correct));
        choicesEl.appendChild(btn);
      });
    }

    function showQuiz() {
      if (!currentPassage || !currentPassage.choices.length) return;
      if (wordArea) wordArea.style.display = "none";
      if (quizArea) quizArea.classList.add("is-visible");
      if (feedbackEl) feedbackEl.textContent = "";
      updateStartable();
    }

    function answerChoice(selectedBtn, isCorrect) {
      if (answered) return;
      answered = true;
      updateCategoryMeta();
      selectedBtn.blur();
      updateStartable();

      const buttons = Array.from(choicesEl.querySelectorAll(".choice-btn"));
      buttons.forEach((btn) => {
        btn.disabled = true;
        if (btn.textContent === currentPassage.choices[0]) btn.classList.add("is-correct");
      });

      if (isCorrect) {
        selectedBtn.classList.add("is-correct");
        let gain = 0;
        if (!expAwarded) {
          const reward = rewardForWpm(speedSlider.value);
          gain = reward.exp;
          expAwarded = true;
          rewards.award(reward);
        }
        adjustWpm(SPEED_REWARD_CONFIG.speed.correctDeltaWpm);
        feedbackEl.textContent = "🎉 正解";
        results.add(true, `🎉 正解 +${gain} EXP`);
      } else {
        selectedBtn.classList.add("is-wrong");
        adjustWpm(-SPEED_REWARD_CONFIG.speed.wrongDeltaWpm);
        feedbackEl.textContent = "✖ 不正解";
        results.add(false, "✖ 不正解 +0 EXP");
      }
      resetTimerId = setTimeout(() => {
        resetToStart();
        ExamView.complete();
      }, 1400);
    }

    function resetToStart() {
      if (resetTimerId) {
        clearTimeout(resetTimerId);
        resetTimerId = null;
      }
      running = false;
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
      rewards.hide();
      answered = false;
      words = [];
      index = 0;
      currentPassage = null;
      wordSizer.replaceChildren();
      hideQuiz();
      if (ready) setWordsFromPassage(pickRandomPassage());
      updateDisplay();
      updateStartable();
    }

    function setWordsFromPassage(passage) {
      currentPassage = passage;
      words = (passage.text || "").split(/\s+/).filter(Boolean);
      wordSizer.replaceChildren(...Array.from(new Set(["開始", ...words]), (word) => {
        const span = document.createElement('span');
        span.textContent = word;
        return span;
      }));
      index = 0;
      expAwarded = false;
      hideQuiz();
      prepareQuiz();
      updateDisplay();
      ExamView.fitQuestion(wordBox, {}, "#wordDisplay, .reading-word-sizer, #quizPrompt, .choice-btn");
    }

    function pickRandomPassage() {
      if (!questionGroups.length) return { text: "", choices: [], subject: "" };
      selectRandomCategory(currentCategoryIndex);
      const group = questionGroups[currentCategoryIndex];
      if (!group?.items.length) return { text: "", choices: [], subject: "" };
      const itemIndex = Math.floor(Math.random() * group.items.length);
      updateCategoryMeta();
      return group.items[itemIndex];
    }

    function advance() {
      if (!running || !words.length) return;
      index++;
      if (index >= words.length) {
        stop();
        index = Math.max(0, words.length - 1);
        showQuiz();
      }
      updateDisplay();
    }

    function startTimer() {
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
      if (!running || !words.length) return;

      const interval = wpmToIntervalMs(Number(speedSlider.value));
      timerId = setTimeout(function tick() {
        if (!running || !words.length) return;
        advance();
        if (!running || !words.length) return;
        timerId = setTimeout(tick, wpmToIntervalMs(Number(speedSlider.value)));
      }, interval);
    }

    function play() {
      if (!ready || running || answered || isQuizVisible()) return;
      window.StudyAppCore.blurActiveElement();
      rewards.hide();
      if (resetTimerId) {
        clearTimeout(resetTimerId);
        resetTimerId = null;
      }
      if (!words.length) return;

      running = true;
      if (index >= words.length) {
        index = 0;
        expAwarded = false;
      }
      updateDisplay();
      updateStartable();
      startTimer();
    }

    function stop() {
      running = false;
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
      updateDisplay();
      updateStartable();
    }

    ExamView.onVisibility((visible) => {
      if (visible) startTimer();
      else if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
    });

    // UI events
    wordBox.addEventListener("click", (e) => {
      if (e.target.closest("button, input, label, a, .flashcard-category-row")) return;
      play();
    });

    speedSlider.addEventListener("input", updateSpeedLabel);

    // Key controls
    document.addEventListener("keydown", (e) => {
      // Space: play, ↑↓: speed
      if (e.code === "Space") {
        e.preventDefault();
        play();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        adjustWpm(SPEED_REWARD_CONFIG.speed.keyboardDeltaWpm);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        adjustWpm(-SPEED_REWARD_CONFIG.speed.keyboardDeltaWpm);
      }
    });

    // 初期化
    speedSlider.min = String(SPEED_REWARD_CONFIG.speed.minWpm);
    speedSlider.max = String(SPEED_REWARD_CONFIG.speed.maxWpm);
    speedSlider.step = "1";
    speedSlider.value = String(SPEED_REWARD_CONFIG.speed.defaultWpm);
    updateSpeedLabel();
    updateDisplay();
    updateCategoryMeta();
    updateStartable();
    loadQuestionBank();
  
