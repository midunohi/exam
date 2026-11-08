ExamViews.speed_reading = `<!DOCTYPE html>
<html lang="ja">
<head>
<script src="../開発/view-bridge.js"></script>
  <meta charset="UTF-8" />
  <title>英文速読4択</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    :root {
      --bg:#0f172a;
      --panel:#0a0f1a;
      --card:#0b1220;
      --border:#1f2937;
      --fg:#e5e7eb;
      --muted:#9ca3af;
      --acc:#22d3ee;
      --answer:#7CFFB2;
    }
    * { box-sizing: border-box; }
    html, body {
      min-height: 100%;
      margin: 0;
      font-family: system-ui, -apple-system, Segoe UI, Roboto, "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
      background: url("../img/bg/廃墟_遺跡_川.png");
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-attachment: fixed;
      color: var(--fg);
      text-shadow: 0 2px 5px rgba(0,0,0,.9), 0 0 12px rgba(0,0,0,.65);
    }
    body {
      min-height: 100vh;
      min-height: 100dvh;
    }
    .top-bar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 10;
      padding: 8px 16px;
      background: linear-gradient(180deg, rgba(15,23,42,.58), rgba(15,23,42,.2) 60%, transparent);
      backdrop-filter: blur(6px);
      display: flex;
      justify-content: center;
    }
    .top-bar-inner {
      width: min(960px, 96vw);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
    }
    .title {
      font-size: clamp(18px, 3.6vw, 22px);
      font-weight: 800;
      letter-spacing: .3px;
      line-height: 1.15;
      text-align: left;
      margin: 0;
      word-break: break-word;
    }
    .back-btn {
      padding: 6px 14px;
      font-size: 14px;
      border-radius: 999px;
      background: rgba(10,19,34,.48);
      color: var(--fg);
      text-decoration: none;
      border: 1px solid rgba(148,163,184,.28);
      display: inline-block;
      line-height: 1.2;
      white-space: nowrap;
      font-weight: 700;
      -webkit-tap-highlight-color: transparent;
    }
    .back-btn:hover { border-color:#2b3a55; }
    .page {
      width: 100%;
      min-height: 100vh;
      min-height: 100dvh;
      padding: 80px 16px 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .frame {
      width: min(960px, 96vw);
    }
    .word-box {
      width: 100%;
      min-height: clamp(360px, 66dvh, 560px);
      border-radius: 20px;
      border: 1px solid rgba(148,163,184,.28);
      background: rgba(10,19,34,.38);
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 24px 24px 48px;
      gap: 18px;
      overflow: hidden;
      box-shadow: 0 12px 30px rgba(0,0,0,.28);
      -webkit-tap-highlight-color: transparent;
      caret-color: transparent;
    }
    .word-box > .flashcard-category-row {
      flex: 0 0 auto;
      margin: 0;
    }
    .word-box.is-startable { cursor: pointer; }
    .word-box.is-startable:hover { border-color:#2b3a55; }
    .word-box.is-startable:active {
      border-color:#334155;
      box-shadow: 0 8px 24px rgba(0,0,0,.32), inset 0 0 0 1px rgba(148,163,184,.16);
    }
    .reading-controls {
      position: absolute;
      z-index: 3;
      top: 0;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      font-size: 13px;
      flex-wrap: wrap;
      padding: 10px 16px 0;
      pointer-events: none;
    }
    .reading-controls :is(input, label) { pointer-events: auto; }
    .reading-body {
      flex: 1;
      min-height: 0;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .progress {
      font-size: 0.85rem;
      color: var(--muted);
    }
    .speed {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.85rem;
      color: var(--muted);
      flex-wrap: wrap;
      justify-content: flex-end;
    }
    input[type="range"] { font-size: 12px; }
    button {
      border: 1px solid rgba(148,163,184,.28);
      border-radius: 12px;
      padding: 10px 14px;
      font-size: 13px;
      cursor: pointer;
      background: rgba(10,19,34,.48);
      color: var(--fg);
      font-weight: 800;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }
    button:hover { border-color:#2b3a55; }
    button:active, .back-btn:active {
      border-color:#334155;
      box-shadow: inset 0 0 0 1px rgba(148,163,184,.14);
    }
    button:focus, .back-btn:focus { outline: none; }
    button:focus-visible, .back-btn:focus-visible {
      outline: 2px solid rgba(34,211,238,.45);
      outline-offset: 2px;
    }
    button:disabled { opacity: .6; cursor: not-allowed; }
    .word-area {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;
      -webkit-user-select: none;
    }
    .word {
      font-size: clamp(32px, 7vw, 72px);
      text-align: center;
      letter-spacing: 0;
      white-space: nowrap;
      font-weight: 800;
    }
    .quiz-area {
      display: none;
      flex: 1;
      flex-direction: column;
      justify-content: center;
      gap: 16px;
      min-height: 0;
      user-select: none;
      -webkit-user-select: none;
    }
    .quiz-area.is-visible { display: flex; }
    .quiz-title {
      margin: 0;
      color: var(--muted);
      font-size: clamp(14px, 2.8vw, 17px);
      line-height: 1.45;
      font-weight: 700;
    }
    .choices {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
    }
    .choice-btn {
      width: 100%;
      min-height: clamp(64px, 12dvh, 104px);
      border-radius: 12px;
      padding: 14px 12px;
      background: rgba(15,23,42,.48);
      border: 1px solid rgba(148,163,184,.36);
      color: #e5e7eb;
      text-align: center;
      line-height: 1.35;
      white-space: normal;
      font-size: clamp(18px, 4.6vw, 32px);
      display: flex;
      align-items: center;
      justify-content: center;
      word-break: break-word;
    }
    .choice-btn.is-correct {
      border-color: #22c55e;
      background: rgba(34, 197, 94, .16);
    }
    .choice-btn.is-wrong {
      border-color: #ef4444;
      background: rgba(239, 68, 68, .14);
    }
    .feedback {
      min-height: 18px;
      color: #cbd5e1;
      font-size: 13px;
      text-align: center;
    }
    .result-history {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      align-content: flex-start;
      justify-content: flex-start;
      min-height: 52px;
      max-height: 52px;
      overflow: hidden;
      font-size: 13px;
      font-weight: 900;
    }
    .result-history div {
      padding: 3px 8px;
      border-radius: 999px;
      background: rgba(10,19,34,.5);
      border: 1px solid rgba(148,163,184,.2);
    }
    .result-history .ok {
      color: #7cff9b;
      text-shadow: 0 0 12px #24ff6a, 0 2px 5px rgba(0,0,0,.9);
      border-color: rgba(124,255,155,.38);
      box-shadow: 0 0 18px rgba(36,255,106,.18);
    }
    .result-history .ng {
      color: #ff7c7c;
      text-shadow: 0 0 12px #ff3030, 0 2px 5px rgba(0,0,0,.9);
      border-color: rgba(255,124,124,.38);
      box-shadow: 0 0 18px rgba(255,48,48,.16);
    }
    @media (max-width: 640px) {
      .page { padding: 72px 12px 18px; }
      .top-bar { padding: 8px 12px; }
      .top-bar-inner { width: 100%; }
      .word-box {
        min-height: min(70dvh, 560px);
        padding: 18px 16px 44px;
        border-radius: 16px;
        gap: 14px;
      }
      .word-box > .flashcard-category-row {
        margin: 0;
      }
      .reading-controls { padding: 9px 12px 0; }
      .speed {
        width: 100%;
        justify-content: space-between;
      }
      .speed input[type="range"] {
        flex: 1;
        min-width: 130px;
      }
      .choices { gap: 10px; }
      .choice-btn {
        min-height: 72px;
        padding: 12px 8px;
      }
    }
  </style>
  <link rel="stylesheet" href="./lib/app_world_ui.css" />
  <link rel="stylesheet" href="./lib/flashcard_shared.css" />
  <script src="../qa_speed_reading/files.js"></script>
  <script src="./lib/rpg_progression.js"></script>
<script src="./lib/rpg_equipment.js"></script>
  <script src="./lib/rpg_study_rewards.js"></script>
  <script src="./lib/study_app_core.js"></script>
</head>
<body class="world-app exam-embedded" data-app="speed">

  <main class="page">
    <div class="frame">
      <section class="word-box" aria-live="polite">
      <div class="category-row flashcard-category-row" aria-label="カテゴリと進捗">
        <div class="flashcard-category-main">
          <div class="flashcard-category-label">カテゴリ</div>
          <div id="totalCount" class="flashcard-category-count">全0問</div>
          <div id="categoryLabel" class="flashcard-category-name">--</div>
        </div>
        <div class="flashcard-category-actions">
          <div class="flashcard-meta-pill">
            <span class="flashcard-meta-label">QUEST</span>
            <span id="countLabel">0 / 3</span>
            <div id="progressTrack" class="flashcard-progress-track" role="progressbar"
              aria-label="解答済みの進捗" aria-valuemin="0" aria-valuemax="3" aria-valuenow="0">
              <div id="progressFill" class="flashcard-progress-fill"></div>
            </div>
          </div>
          <button id="randomBtn" class="flashcard-switch" type="button"
            aria-label="別のカテゴリへランダムに切り替える">
            <span class="flashcard-switch-icon" aria-hidden="true">🎲</span>
            <span class="flashcard-switch-label">切り替え</span>
          </button>
        </div>
      </div>

      <div class="reading-body">
        <div class="reading-controls">
          <div class="progress" id="progressLabel">0 / 0</div>
          <label class="speed">
            速度
            <input type="range" id="speedSlider" min="60" max="300" step="1" value="200" />
            <span id="speedLabel">200 wpm</span>
          </label>
        </div>

        <div class="word-area">
          <div id="wordDisplay" class="word"></div>
        </div>

        <div id="quizArea" class="quiz-area" aria-live="polite">
          <p class="quiz-title">本文の内容に合うものを選んでください。</p>
          <div id="choices" class="choices"></div>
          <div id="feedback" class="feedback"></div>
        </div>
      </div>

      <div id="resultHistory" class="result-history" aria-live="polite"></div>
      
      </section>
      <div id="rewardSlot"></div>
    </div>
  </main>

  <script src="../開発/views/speed_reading.js"></script>
</body>
</html>`;
