ExamViews.fc_enExamples = `<!DOCTYPE html>
<html lang="ja">
<head>
<script src="../開発/view-bridge.js"></script>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>英単語・例文 フラッシュカード</title>
  <link rel="stylesheet" href="./lib/app_world_ui.css" />
  <link rel="stylesheet" href="./lib/flashcard_shared.css" />
  <link rel="stylesheet" href="./lib/question_layout.css" />
</head>
<body class="world-app exam-embedded" data-app="fc-en" data-flashcard-app>

  <main class="page flashcard-page">
    <section class="flashcard-shell" id="flashcard" role="button" tabindex="0"
      aria-live="polite" aria-busy="false" aria-label="英単語と例文のカード。押すと訳を順に表示します">
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

      <div class="english-term-meaning">
        <div class="english-question" id="term">...</div>
        <div class="english-answer is-hidden" id="meaning"></div>
      </div>
      <div class="english-phrases" id="phrases"></div>
    </section>
    <div id="rewardSlot"></div>
  </main>

  <script src="../qa_en_examples/files.js"></script>
  <script src="./lib/rpg_progression.js"></script>
  <script src="./lib/rpg_equipment.js"></script>
  <script src="./lib/rpg_study_rewards.js"></script>
  <script src="./lib/flashcard_core.js"></script>
  <script src="../開発/views/fc_enExamples.js"></script>
</body>
</html>`;
