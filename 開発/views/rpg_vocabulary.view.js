ExamViews.rpg_vocabulary = `<!DOCTYPE html>
<html lang="ja">
<head>
<script src="../開発/view-bridge.js"></script>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>英単語4択</title>
<style>
  :root{
  --bg:#020617;
  --ok:#22c55e;
  --bad:#ef4444;
  --q-size: clamp(22px, 1.8vw + 14px, 30px);
  --choice-size: clamp(20px, 1.6vw + 14px, 28px);
  --choice-min-h: clamp(52px, 6vh, 72px);
  --next-size: clamp(16px, 1.2vw + 12px, 22px);
  --next-pad-y: clamp(10px, 1.2vh, 16px);
  --next-pad-x: clamp(16px, 2vw, 26px);
  --next-h: clamp(52px, 6vh, 70px);
  --log-font-size:13px;
  --log-line-height:1.35;
  --log-height:80px;
  --log-pad-y:4px;
}

@media (orientation: portrait){
  :root{
    --q-size: clamp(26px, 3.6vw + 12px, 38px);
    --choice-size: clamp(24px, 3.2vw + 12px, 36px);
    --choice-min-h: clamp(60px, 10vh, 90px);
    --next-size: clamp(20px, 2.6vw + 12px, 28px);
    --next-pad-y: clamp(12px, 2vh, 18px);
    --next-pad-x: clamp(20px, 4vw, 32px);
    --next-h: clamp(62px, 9vh, 88px);
  }
}
  *{box-sizing:border-box}
  html,body{
    margin:0;
    font-family:system-ui,-apple-system,Segoe UI,Roboto,'Hiragino Kaku Gothic ProN',Meiryo,sans-serif;
    background:#0b1a33 url('../img/bg/bg_rpg_field.png') no-repeat center top/cover;
    color:#fff;
    text-shadow:0 2px 5px rgba(0,0,0,.9), 0 0 12px rgba(0,0,0,.65);
  }

  #wrap{min-height:100vh;min-height:100dvh;display:grid;grid-template-rows:auto minmax(0,1fr) auto;gap:8px;padding:8px}
  #appTop{display:flex;align-items:center;justify-content:space-between}
  #pageTitle{font-size:28px;font-weight:900;letter-spacing:.06em}
  #topGrid{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);grid-template-rows:auto minmax(0,1fr);gap:8px;align-items:start}
  .panel{background:rgba(2,6,23,.18);border:1px solid rgba(255,255,255,.16);border-radius:10px;padding:8px;box-shadow:0 10px 24px rgba(0,0,0,.18)}
  .compact{font-size:14px;line-height:1.3}
  .row{display:flex;align-items:center;gap:6px;margin-bottom:4px}
  .row .label{opacity:.8}
  .bar{flex:1;height:12px;border-radius:999px;overflow:hidden;background:#020617}
  .bar>span{display:block;height:100%;width:0;transition:width .2s}
  .hp>span{background:linear-gradient(90deg,#ef4444,#b91c1c)}
  .exp>span{background:linear-gradient(90deg,#38bdf8,#0ea5e9)}
  .val{min-width:90px;text-align:right;opacity:.9;font-size:12px}
  .lvExp{min-width:auto;text-align:left;margin-left:6px}
  #weaponAtk{margin-left:5px;color:#fde68a;font-size:12px;white-space:nowrap}

  /* QA: 隙間を埋める */
  #qaBox{display:flex;flex-direction:column;min-height:34vh}
  #question{margin:0 0 8px;font-size:var(--q-size);font-weight:700}
  #choices{
    --word-col: max-content;
    --meaning-col: max-content;
    flex:1;
    display:flex;
    flex-direction:column;
    gap:4px;
    min-height:0;
  }
  #choices.game-over{flex:0 0 auto;align-items:center}
  #restartBtn{
    width:auto;
    min-height:0;
    padding:0;
    border:0;
    background:transparent;
    color:rgba(255,255,255,.78);
    font:inherit;
    font-size:clamp(15px,1.2vw + 11px,20px);
    font-weight:700;
    cursor:pointer;
    text-shadow:inherit;
  }
  #restartBtn:focus-visible{outline:2px solid rgba(255,255,255,.72);outline-offset:5px}

  button.choice{
    flex:1;
    display:grid;
    grid-template-columns:var(--word-col) var(--meaning-col);
    align-items:center;
    justify-content:center;
    column-gap:clamp(10px, 1.5vw, 18px);
    min-height:var(--choice-min-h);
    padding:12px 10px;
    border-radius:10px;
    border:1px solid rgba(255,255,255,.10);
    background:rgba(17,24,39,.42);
    color:inherit;
    font-size:var(--choice-font, var(--choice-size));
    font-weight:700;
    cursor:pointer;
    -webkit-tap-highlight-color:transparent;
    text-align:left;
  }
  .choice-word{
    justify-self:start;
    min-width:0;
    line-height:1.1;
    white-space:nowrap;
  }
  .choice-meaning{
    justify-self:start;
    visibility:hidden;
    min-width:0;
    color:rgba(255,255,255,.88);
    font-size:var(--meaning-font, clamp(14px, .9vw + 10px, 20px));
    font-weight:700;
    line-height:1.2;
    overflow-wrap:anywhere;
    white-space:nowrap;
  }
  #choices.stacked button.choice{
    grid-template-columns:minmax(0, 1fr);
    grid-template-rows:auto auto;
    justify-items:center;
    row-gap:4px;
    column-gap:0;
    text-align:center;
  }
  #choices.stacked .choice-word,
  #choices.stacked .choice-meaning{
    justify-self:center;
    max-width:100%;
  }
  #choices.stacked .choice-meaning{
    white-space:normal;
  }
  button.choice.show-meaning .choice-meaning{visibility:visible}
  button.choice:active{border-color:rgba(255,255,255,.22);box-shadow:inset 0 0 0 1px rgba(255,255,255,.10)}
  button.choice:focus{outline:none}
  button.choice:focus-visible{outline:2px solid rgba(255,255,255,.36);outline-offset:2px}
  button.choice:disabled{opacity:.55;cursor:default}
  button.choice.correct{background:rgba(34,197,94,.28);border-color:rgba(34,197,94,.9)}
  button.choice.wrong{background:rgba(239,68,68,.28);border-color:rgba(239,68,68,.9)}

  @media (orientation: portrait){
    button.choice{
      column-gap:8px;
      padding:10px 8px;
    }
    .choice-meaning{
      font-size:var(--meaning-font, clamp(15px, 2.2vw + 10px, 24px));
    }
  }

  #logWrap{display:flex;flex-direction:column;padding:0;background:rgba(0,0,0,.24);border-radius:8px}
  #log{
    flex:1;
    min-height:0;
    overflow:auto;
    overscroll-behavior:contain;
    scrollbar-width:none;
    -ms-overflow-style:none;
    font-size:var(--log-font-size);
    line-height:var(--log-line-height);
    padding:var(--log-pad-y) 6px;
  }
  #log::-webkit-scrollbar{display:none}
  #log .log-line{display:block;min-width:0}
  #log .log-message{display:inline;margin:0}
  #log .log-message:not(:last-child)::after{content:"　"}
  .ok{color:var(--ok)}
  .bad{color:var(--bad)}
  .blink{animation:blink .24s 3}
  @keyframes blink{50%{filter:brightness(2)}}

  #enemyView img{display:block;width:100%;height:auto;max-height:30vh;object-fit:contain;opacity:1}
</style>
<link rel="stylesheet" href="./lib/app_world_ui.css" />
<style>
  /* Two stable groups: player (status + quiz) and enemy (status + image). */
  html,body{width:100%;height:100%;overflow:hidden}
  #wrap{
    height:100vh;
    height:100svh;
    max-height:100svh;
    min-height:0;
    overflow:hidden;
    grid-template-rows:minmax(0,1fr) auto;
  }
  #topGrid{
    min-height:0;
    display:grid;
    grid-template-areas:"player" "enemy";
    grid-template-columns:minmax(0,1fr);
    grid-template-rows:minmax(0,70fr) minmax(88px,30fr);
    align-items:stretch;
    overflow:hidden;
  }
  #topGrid>*{min-width:0;min-height:0;max-width:100%;max-height:100%}
  #playerArea{
    grid-area:player;
    width:100%;
    height:100%;
    min-width:0;
    min-height:0;
    display:grid;
    grid-template-rows:auto minmax(0,1fr);
    gap:10px;
    overflow:hidden;
  }
  #enemyArea{
    grid-area:enemy;
    width:100%;
    height:100%;
    min-width:0;
    min-height:0;
    display:grid;
    grid-template-columns:minmax(0,42fr) minmax(0,58fr);
    grid-template-rows:minmax(0,1fr);
    overflow:hidden;
    border:1px solid var(--world-glass-thin-line);
    border-radius:12px;
    background:var(--world-glass-thin-bg);
    box-shadow:var(--world-glass-thin-shadow);
    backdrop-filter:blur(6px) saturate(106%);
    -webkit-backdrop-filter:blur(6px) saturate(106%);
  }
  #heroBox,#qaBox,#enemyBox,#enemyView{min-width:0;min-height:0;max-width:100%;max-height:100%}
  #heroBox{width:100%}
  #qaBox{width:100%;height:100%;min-height:0!important}
  #enemyBox{
    height:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
  }
  #enemyView{
    position:relative;
    width:100%;
    height:100%;
    overflow:hidden;
  }
  body[data-app="hunt"] #enemyArea #enemyBox{
    border:0;
    border-radius:0;
    background:transparent;
    box-shadow:none;
    backdrop-filter:none;
  }
  body[data-app="hunt"] #enemyArea #enemyView{
    padding:0;
    border:0;
    border-left:1px solid var(--world-line-soft);
    border-radius:0;
    background:transparent;
    box-shadow:none;
  }
  body[data-app="hunt"] :is(#heroBox,#enemyBox){
    padding:clamp(4px,1.2dvh,8px) clamp(5px,1.8vw,10px);
  }
  .compact{font-size:clamp(11px,2.9vw,14px)}
  .row{min-width:0;gap:clamp(3px,1vw,6px);margin-bottom:clamp(2px,.7dvh,4px)}
  .row:last-child{margin-bottom:0}
  .val{min-width:clamp(48px,15vw,90px);font-size:clamp(10px,2.7vw,12px)}
  #weaponAtk{min-width:0;overflow:hidden;font-size:clamp(9px,2.6vw,12px);text-overflow:ellipsis}
  #enemyView img{
    position:absolute;
    inset:0;
    display:block;
    width:100%;
    height:100%;
    max-width:100%;
    max-height:100%!important;
    object-fit:contain;
  }
  #question{min-height:clamp(38px,8dvh,62px)!important;padding:clamp(5px,1.5dvh,10px) 10px!important}
  #choices{overflow:hidden}
  body[data-app="hunt"] #qaBox.game-over{cursor:pointer}
  body[data-app="hunt"] #qaBox.game-over:hover{filter:brightness(1.08)}
  body[data-app="hunt"] #qaBox.game-over:active{filter:brightness(1.18)}
  button.choice{min-height:0;padding:clamp(2px,.8dvh,6px) 6px}
  #logWrap{
    width:100%;
    height:var(--log-height);
    min-height:0;
    max-height:none;
    overflow:hidden;
  }

  /* Tall portrait: player group 74%, horizontal enemy group 26%. */
  @media (max-aspect-ratio:3/4){
    :root{
      --q-size:clamp(17px,5.3vw,26px);
      --choice-size:clamp(15px,4.8vw,23px);
      --choice-min-h:0px;
    }
    #topGrid{
      grid-template-rows:minmax(0,74fr) minmax(82px,26fr);
      gap:clamp(4px,1.4vw,8px);
    }
    #heroBox .bar,#enemyBox .bar{height:clamp(8px,2.5vw,12px)}
  }

  /* Square-ish portrait: player group 66%, horizontal enemy group 34%. */
  @media (min-aspect-ratio:3/4) and (max-aspect-ratio:4/3){
    :root{
      --q-size:clamp(17px,3.8vmin,25px);
      --choice-size:clamp(15px,3.4vmin,23px);
      --choice-min-h:0px;
    }
    #topGrid{grid-template-rows:minmax(0,66fr) minmax(92px,34fr)}
  }

  /*
   * Landscape:
   * player(status / quiz) | enemy(status / image)
   */
  @media (min-aspect-ratio:4/3){
    #topGrid{
      grid-template-areas:"player enemy";
      grid-template-columns:minmax(0,70fr) minmax(190px,30fr);
      grid-template-rows:minmax(0,1fr);
    }
    #playerArea{grid-template-rows:auto minmax(0,1fr)}
    #enemyArea{
      grid-template-columns:minmax(0,1fr);
      grid-template-rows:auto minmax(0,1fr);
    }
    body[data-app="hunt"] #enemyArea #enemyView{
      border-left:0;
      border-top:1px solid var(--world-line-soft);
    }
    .compact{font-size:14px}
    .val{min-width:90px;font-size:12px}
  }

  @media (min-aspect-ratio:16/9){
    #topGrid{grid-template-columns:minmax(0,72fr) minmax(210px,28fr)}
  }

  @media (max-height:520px){
    :root{
      --world-topbar-height:46px;
      --q-size:clamp(15px,4dvh,20px);
      --choice-size:clamp(14px,4.5dvh,19px);
      --choice-min-h:0px;
      --log-font-size:11px;
      --log-height:34px;
      --log-pad-y:1px;
    }
    body[data-app="hunt"] #wrap{gap:6px;padding-top:calc(var(--world-topbar-height) + 5px)}
    body[data-app="hunt"] #topGrid{gap:6px}
    body[data-app="hunt"] :is(#heroBox,#enemyBox){padding:3px 5px}
    .compact{font-size:10px}
    .row{margin-bottom:1px}
    .val{min-width:44px;font-size:9px}
    #playerArea{gap:6px}
    #question{min-height:34px!important;padding:3px 6px!important}
    button.choice{padding-block:1px}
  }

  @media (min-height:521px) and (max-height:700px){
    :root{--log-height:63px}
  }

  @media (min-height:900px){
    :root{--log-height:98px}
  }
</style>
  <link rel="stylesheet" href="./lib/question_layout.css" />
</head>
<body class="world-app exam-embedded" data-app="hunt">
<div id="wrap">

  <div id="topGrid">
    <div id="playerArea" aria-label="プレイヤー情報と問題">
      <section id="heroBox" class="panel compact">
        <div class="row"><span class="label">Lv</span><span id="lv">1</span><span class="val lvExp" id="expText">0 / 20</span></div>
        <div class="row"><span class="label">HP</span><div class="bar hp"><span id="hpBar"></span></div><span class="val" id="hpText">30 / 30</span></div>
        <div class="row"><span class="label">ATK</span><strong id="atk">5</strong><span id="weaponAtk">装備なし</span></div>
      </section>

      <section id="qaBox" class="panel">
        <p id="question">—</p>
        <div id="choices"></div>
      </section>
    </div>

    <div id="enemyArea" aria-label="敵情報">
      <section id="enemyBox" class="panel compact">
        <div class="row"><span class="label">ENEMY</span><span id="enemyName">—</span></div>
        <div class="row"><span class="label">HP</span><div class="bar hp"><span id="enemyHpBar"></span></div><span class="val" id="enemyHpText">0 / 0</span></div>
      </section>

      <section id="enemyView" class="panel" aria-label="敵の画像">
        <img id="enemyImg" src="" alt="" onerror="this.style.display='none'" />
      </section>
    </div>

  </div>

  <section id="logWrap" class="panel">
    <div id="log"></div>
  </section>
</div>

<script src="./lib/rpg_progression.js"></script>
<script src="./lib/rpg_equipment.js"></script>
<script src="../開発/views/rpg_vocabulary.js"></script>
</body>
</html>`;
