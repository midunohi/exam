ExamViews.flash_mental_math = `<!doctype html>
<html lang="ja">
<head>
<script src="../開発/view-bridge.js"></script>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>フラッシュ暗算</title>
<style>
  body{margin:0;min-height:100vh;min-height:100dvh;display:flex;align-items:flex-start;justify-content:center;font-family:system-ui,-apple-system,"Noto Sans JP",sans-serif;background:url("../img/フラッシュカード背景/ダンジョン_洞窟_祭壇.png");background-size:cover;background-position:center;background-repeat:no-repeat;background-attachment:fixed;color:#eef2ff;text-shadow:0 2px 5px rgba(0,0,0,.9),0 0 12px rgba(0,0,0,.65)}
  .page{position:relative;width:100%;min-height:100vh;min-height:100dvh;display:flex;flex-direction:column;align-items:center;padding-top:4px}
  .topbar{width:min(500px,90vw);display:flex;align-items:center;justify-content:space-between}
  .center{flex:1;width:100%;display:flex;align-items:center;justify-content:center}
  .frame{width:min(500px,90vw)}
  .box{box-sizing:border-box;position:relative;width:100%;padding:18px 18px 28px;border:1px solid rgba(255,255,255,.28);border-radius:16px;background:rgba(18,26,51,.38);box-shadow:0 12px 30px rgba(0,0,0,.28);-webkit-tap-highlight-color:transparent}
  .box.is-startable{cursor:pointer}
  .box.is-startable:hover{border-color:#ffffff33}
  .box.is-startable:active{box-shadow:inset 0 0 0 1px rgba(255,255,255,.12)}
  .row{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
  button{font:inherit;border-radius:12px;border:1px solid rgba(255,255,255,.3);background:rgba(12,18,38,.48);color:#eef2ff;padding:10px 12px}
  button{cursor:pointer;background:rgba(42,58,102,.58);-webkit-tap-highlight-color:transparent}
  button:active{border-color:#ffffff33;box-shadow:inset 0 0 0 1px rgba(255,255,255,.12)}
  button:focus{outline:none}
  button:focus-visible{outline:2px solid rgba(148,163,184,.45);outline-offset:2px}
  button:disabled{opacity:.5;cursor:not-allowed}
  .displayArea{position:relative;height:clamp(220px,38vh,340px);caret-color:transparent;user-select:none;-webkit-user-select:none}
  #n{font-size:72px;font-weight:900;letter-spacing:.02em;text-align:center;height:100%;display:flex;align-items:center;justify-content:center}
  #title{font-size:32px;font-weight:900;letter-spacing:.08em}
  #hint{display:flex;gap:6px;flex-wrap:wrap;align-content:flex-start;justify-content:flex-start;font-size:13px;font-weight:900;height:52px;overflow:hidden}
  #hint div{padding:3px 8px;border-radius:999px;background:rgba(12,18,38,.5)}
  #hint .ok{color:#7cff9b;text-shadow:0 0 12px #24ff6a}
  #hint .ng{color:#ff7c7c;text-shadow:0 0 12px #ff3030}
  #msg{margin-top:10px;font-weight:700;text-align:center;min-height:22px}
  #choices{position:absolute;inset:0;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:10px}
  .is-hidden,#n.is-hidden,#choices.is-hidden{display:none}
  .choice{background:rgba(26,36,70,.52);font-size:clamp(28px,6vw,48px);font-weight:900;line-height:1}
  .choice.correct{background:rgba(31,122,58,.68);border-color:#2aa84f}
  .choice.wrong{background:rgba(122,31,31,.68);border-color:#a82a2a}
  .startRow{min-height:44px}
  .settings-row{flex-wrap:nowrap;overflow-x:auto;padding:10px 12px}
  .setting-chip{display:inline-flex;align-items:center;gap:6px;flex:0 0 auto;color:#b8c6da;font-size:13px;font-weight:750;white-space:nowrap}
  .setting-value{display:inline-block;min-width:2.3em;color:#f8fafc;font-size:15px;font-weight:900;text-align:center}
  .setting-level{color:#7CFFB2}
</style>
<link rel="stylesheet" href="./lib/app_world_ui.css" />
<script src="./lib/rpg_progression.js"></script>
<script src="./lib/rpg_equipment.js"></script>
<script src="./lib/rpg_study_rewards.js"></script>
<script src="./lib/study_app_core.js"></script>
  <link rel="stylesheet" href="./lib/question_layout.css" />
</head>

<body class="world-app exam-embedded" data-app="mental">
<div class="page">
  <div class="center">
    <div class="frame">
      <div class="box" id="box">
        <div class="row settings-row" aria-label="出題アプリと現在の難易度設定">
          <span class="exam-app-name">フラッシュ暗算</span>
          <div class="setting-chip setting-level">難易度 <strong>Lv.<output id="difficultyLevel" class="setting-value">11</output></strong></div>
          <div class="setting-chip">個数 <output id="k" class="setting-value">5</output></div>
          <div class="setting-chip">桁 <output id="d" class="setting-value">1</output></div>
          <div class="setting-chip">間隔 <output id="ms" class="setting-value">1000</output> ms</div>
        </div>

        <div class="displayArea">
          <div id="n"></div>
          <div id="choices" class="is-hidden">
            <button class="choice" data-idx="0"></button>
            <button class="choice" data-idx="1"></button>
            <button class="choice" data-idx="2"></button>
            <button class="choice" data-idx="3"></button>
          </div>
        </div>
        <div id="msg"></div>
        <div id="hint"></div>
        
      </div>
      <div id="rewardSlot"></div>
    </div>
  </div>
</div>

<script src="../開発/views/flash_mental_math.js"></script>
</body>
</html>`;
