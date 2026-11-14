ExamViews.fc_tex = `<!DOCTYPE html>
<html lang="ja">
<head>
<script src="../開発/view-bridge.js"></script>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>各科目 フラッシュカード</title>
  <link rel="stylesheet" href="./lib/app_world_ui.css" />
  <link rel="stylesheet" href="./lib/flashcard_shared.css" />
  <style>
    .tex-card-line {
      display: block;
      min-width: 0;
      max-width: 100%;
      white-space: pre-wrap;
    }
  </style>
  <script src="../開発/views/fc_tex-config.js"></script>
  <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>
  <link rel="stylesheet" href="./lib/question_layout.css" />
</head>
<body class="world-app exam-embedded" data-app="fc-tex" data-flashcard-app>

  <main class="page flashcard-page">
    <section class="flashcard-shell" id="flashcard" role="button" tabindex="0"
      aria-live="polite" aria-busy="false" aria-label="問題カード。押すと答えを表示します">
      <div class="category-row flashcard-category-row" aria-label="出題アプリとカテゴリ">
        <div class="flashcard-category-main">
          <div class="exam-app-name">各科目フラッシュカード</div>
          <div id="totalCount" class="flashcard-category-count">全0問</div>
          <div id="categoryLabel" class="flashcard-category-name">--</div>
        </div>
      </div>

      <div class="tex-card-body">
        <div class="tex-card-section" data-label="QUESTION">
          <div class="tex-card-content" id="problemQuestion"></div>
        </div>
        <div class="tex-card-section" data-label="ANSWER">
          <div class="tex-card-content tex-card-answer is-hidden" id="problemAnswer"></div>
        </div>
      </div>
    </section>
    <div id="rewardSlot"></div>
  </main>

  <script src="../qa_tex/files.js"></script>
  <script src="./lib/rpg_progression.js"></script>
  <script src="./lib/rpg_equipment.js"></script>
  <script src="./lib/rpg_study_rewards.js"></script>
  <script src="./lib/flashcard_core.js"></script>
  <script src="../開発/views/fc_tex.js"></script>
</body>
</html>`;
