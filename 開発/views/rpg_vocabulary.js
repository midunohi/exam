const $=id=>document.getElementById(id);
const progression=window.RPGProgression;
const R=n=>(Math.random()*n)|0;
const clamp=(x,a,b)=>x<a?a:x>b?b:x;
const bar=(id,r)=>{const e=$(id); if(e) e.style.width=(100*clamp(r,0,1)).toFixed(1)+'%';};
const beginLogLine=()=>{
  const e=$('log');
  if(!e) return null;
  e.insertAdjacentHTML('afterbegin','<div class="log-line"></div>');
  e.scrollTo({top:0,left:0});
  return e.firstElementChild;
};
const log=s=>{
  const e=$('log');
  if(!e) return;
  const line=e.firstElementChild?.classList.contains('log-line')
    ? e.firstElementChild
    : beginLogLine();
  line.insertAdjacentHTML('beforeend',`<span class="log-message">${s}</span>`);
  e.scrollTo({top:0,left:0});
};
// fallback
const FALLBACK_WORDS=[
  ['increase','増える、増やす'],['reduce','減らす'],['gather','集める'],['explore','探索する'],
  ['defeat','打ち倒す'],['guard','守る'],['release','解放する'],['vanish','消える']
];
const FALLBACK_MONSTERS=[
  {id:'ash_wyrm',ja:'アッシュ・ワーム'},{id:'dust_lizard',ja:'ダスト・リザード'},{id:'ember_golem',ja:'エンバー・ゴーレム'},{id:'night_siren',ja:'ナイト・サイレン'}
];

let words=[], MONSTERS=[], enemy=null, Q=null;

const state={
  total:0,   // 累計EXP（保存）
  lv:1, exp:0, nextExp:progression.config.initialLevelExp,
  maxHP:30, hp:30, baseAtk:5, atk:5, weapon:null,

  // モンスター順
  mi:0,
  // 敵Lv：初期は常に1
  enemyLv:1,

  used:new Set()
};

function save(){ progression.writeTotalExp(state.total); }

function safeGlobalEval(name){
  try{
    return (0, eval)(name);
  }catch(_e){
    return undefined;
  }
}

function injectScript(src){
  return new Promise((resolve, reject)=>{
    window.__examLoadedScripts = window.__examLoadedScripts || {};
    if(window.__examLoadedScripts[src]){
      resolve(true);
      return;
    }
    const s=document.createElement('script');
    s.src=src;
    s.async=true;
    s.onload=()=>{
      window.__examLoadedScripts[src]=true;
      resolve(true);
    };
    s.onerror=()=>reject(new Error(`load failed: ${src}`));
    document.head.appendChild(s);
  });
}

// 累計EXPからレベルと基礎能力値を共通仕様で復元する。
function recalcFromTotal(){
  const snapshot = progression.calculate(state.total);
  state.lv = snapshot.level;
  state.exp = snapshot.exp;
  state.nextExp = snapshot.nextExp;
  state.maxHP = snapshot.maxHP;
  state.baseAtk = snapshot.baseAttack;

  const attack = window.RPGEquipment
    ? window.RPGEquipment.getAttackStats(state.baseAtk)
    : { total:state.baseAtk, equipped:null };
  state.atk = attack.total;
  state.weapon = attack.equipped;
  state.hp = clamp(state.hp,0,state.maxHP);
}

function render(){
  $('lv').textContent=state.lv;
  $('atk').textContent=state.atk;
  $('weaponAtk').textContent=state.weapon
    ? `${state.weapon.icon} +${state.weapon.atkBonusPct}%`
    : '装備なし';
  $('hpText').textContent=`${state.hp} / ${state.maxHP}`;
  $('expText').textContent=`${state.exp} / ${state.nextExp}`;
  bar('hpBar', state.hp/state.maxHP);
}

function gainExp(x){
  if(x<=0) return;
  const beforeLv=state.lv;

  state.total += x; save();
  recalcFromTotal();

  if(state.lv>beforeLv){
    const heal = Math.round(state.maxHP*0.35);
    state.hp = clamp(state.hp + heal, 0, state.maxHP);
    log(`<span class="ok">✨ レベルアップ！ Lv${beforeLv} → Lv${state.lv}（+${heal}HP）</span>`);
  }
  render();
}

async function loadMonsters(){
  MONSTERS=FALLBACK_MONSTERS;
}

function setEnemyImage(mon){
  const img=$('enemyImg');
  img.style.display='block';
  img.src=`../img/モンスター/${mon.id}.png`;
  img.alt=mon.ja;
  img.onerror=()=>img.style.display='none';
}

function updateEnemy(){
  $('enemyHpText').textContent=`${enemy.hp} / ${enemy.maxHP}`;
  bar('enemyHpBar', enemy.hp/enemy.maxHP);
}

// 敵の初期出現Lv：max(1, lv-10)
// 倒すごとに enemyLv++（常に1ずつ上昇）
function spawnEnemy(){
  const mon = MONSTERS[state.mi % MONSTERS.length] || FALLBACK_MONSTERS[0];
  state.mi = (state.mi+1) % MONSTERS.length;

  const L = state.enemyLv;

  enemy={
    id:mon.id, name:mon.ja, level:L,
    maxHP: 18 + L*10,
    hp:    18 + L*10,
    atkMin: 3 + L*2,
    atkMax: 6 + L*3,
    xp: 6 + Math.floor(L*1.2)
  };

  $('enemyName').textContent=`Lv${enemy.level}`;
  setEnemyImage(mon);
  updateEnemy();
  beginLogLine();
  log(`👾 モンスターが現れた！`);
}

async function loadWords(){
  try{
    await injectScript('../qa_en_ja/categories.js');
    const filesRaw=safeGlobalEval('files_enJa');
    const files=Array.isArray(filesRaw)?filesRaw:[];
    if(!files.length) throw 0;
    await Promise.all(files.map(n=>injectScript(encodeURI(`../qa_en_ja/${n}.js`))));
    const all=files.flatMap(n=>{
      const data=safeGlobalEval(`enJa_${String(n).replace(/[^A-Za-z0-9_$]/g,'_')}`);
      return Array.isArray(data)?data:[];
    });
    const normalized=all.filter(v=>Array.isArray(v) && typeof v[0]==='string' && typeof v[1]==='string');
    if(!normalized.length) throw 0;
    words=normalized;
  }catch(e){ words=FALLBACK_WORDS; }
}

function shuffle(a){
  for(let i=a.length-1;i>0;i--){ const j=R(i+1); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

function syncChoiceColumns(){
  const box=$('choices');
  if(!box) return;
  box.style.removeProperty('--choice-font');
  box.style.removeProperty('--meaning-font');
  box.style.removeProperty('--word-col');
  box.style.removeProperty('--meaning-col');
  box.classList.remove('stacked');

  const words=Array.from(box.querySelectorAll('.choice-word'));
  const meanings=Array.from(box.querySelectorAll('.choice-meaning'));
  const sampleButton=box.querySelector('button.choice');
  const sampleMeaning=meanings[0];
  if(!sampleButton || !sampleMeaning) return;

  const buttonStyle=getComputedStyle(sampleButton);
  const baseChoiceFont=parseFloat(buttonStyle.fontSize) || 24;
  const baseMeaningFont=parseFloat(getComputedStyle(sampleMeaning).fontSize) || 18;
  const maxWord=Math.ceil(Math.max(0, ...words.map(e=>e.scrollWidth)));
  const maxMeaning=Math.ceil(Math.max(0, ...meanings.map(e=>e.scrollWidth)));
  const gap=parseFloat(buttonStyle.columnGap) || (matchMedia('(orientation: portrait)').matches ? 8 : 18);
  const horizontalPadding=(parseFloat(buttonStyle.paddingLeft) || 0) + (parseFloat(buttonStyle.paddingRight) || 0);
  const available=Math.max(0, box.clientWidth - horizontalPadding - gap);
  const needed=maxWord + maxMeaning;
  if(needed > available){
    const lineAvailable=Math.max(0, box.clientWidth - horizontalPadding);
    const lineNeeded=Math.max(maxWord, maxMeaning);
    const scale=lineNeeded > lineAvailable && lineNeeded > 0 ? Math.max(0.58, lineAvailable / lineNeeded) : 1;
    box.classList.add('stacked');
    box.style.setProperty('--choice-font', `${Math.max(14, baseChoiceFont * scale)}px`);
    box.style.setProperty('--meaning-font', `${Math.max(12, baseMeaningFont * scale)}px`);
    return;
  }
  const scale=needed > available && needed > 0 ? Math.max(0.5, available / needed) : 1;
  const wordCol=Math.ceil(maxWord * scale);
  const meaningCol=Math.ceil(maxMeaning * scale);

  box.style.setProperty('--choice-font', `${Math.max(12, baseChoiceFont * scale)}px`);
  box.style.setProperty('--meaning-font', `${Math.max(11, baseMeaningFont * scale)}px`);
  box.style.setProperty('--word-col', `${wordCol}px`);
  box.style.setProperty('--meaning-col', `${meaningCol}px`);
}

function showGameOver(){
  const qaBox=$('qaBox');
  qaBox.classList.add('game-over');
  qaBox.onclick=null;
  requestAnimationFrame(()=>{
    if(state.hp<=0 && qaBox.classList.contains('game-over')){
      qaBox.onclick=restartGame;
    }
  });
  // 元の問題・選択肢は領域を保ったまま隠し、再開操作を重ねる。
  $('restartBtn')?.remove();

  const restart=document.createElement('button');
  restart.id='restartBtn';
  restart.type='button';
  restart.textContent='☠️ GAME OVER\nタップして再開';
  qaBox.appendChild(restart);
}

function restartGame(){
  if(state.hp>0) return;
  state.hp=state.maxHP;
  render();

  if(!enemy || enemy.hp<=0) spawnEnemy();
  beginLogLine();
  log(`🔄 戦闘再開！ <span class="ok">HP全回復</span>`);
  nextQuestion();
  ExamView.complete();
}

function nextQuestion(){
  if(state.hp<=0){ showGameOver(); return; }
  const qaBox=$('qaBox');
  qaBox.classList.remove('game-over');
  $('restartBtn')?.remove();
  qaBox.onclick=null;
  const box=$('choices');
  box.classList.remove('game-over');
  if(!words.length){ $('question').textContent='単語データがありません'; $('choices').innerHTML=''; return; }

  const idxs=words.map((_,i)=>i).filter(i=>!state.used.has(i));
  if(!idxs.length){ state.used.clear(); return nextQuestion(); }

  const pick=idxs[R(idxs.length)];
  state.used.add(pick);
  const q=words[pick];

  const correct=q[0];
  const set=new Set([correct]);
  while(set.size<4 && set.size<words.length) set.add(words[R(words.length)][0]);

  const meanings=new Map();
  words.forEach(v=>meanings.set(v[0], v[1]));

  Q={ja:q[1], ans:correct, ch:shuffle([...set]), meanings};

  $('question').textContent=`「${Q.ja}」の英語は？`;
  box.innerHTML='';
  Q.ch.forEach(w=>{
    const b=document.createElement('button');
    b.className='choice';
    b.dataset.word=w;
    const word=document.createElement('span');
    word.className='choice-word';
    word.textContent=w;
    const meaning=document.createElement('span');
    meaning.className='choice-meaning';
    meaning.textContent=Q.meanings.get(w) || '';
    b.append(word, meaning);
    b.onclick=()=>answer(w);
    box.appendChild(b);
  });
  ExamView.fitQuestion(qaBox, Q, '#question, .choice-word, .choice-meaning', { beforeFit: syncChoiceColumns });
}

function playerDmg(){
  const base=state.atk;
  return base + R(1+Math.max(1,Math.floor(base*0.6)));
}
function recoilDmg(){
  const L=enemy.level;
  return (2+Math.floor(L*0.8)) + R(2+Math.floor(L*0.4));
}
function fatalWrongDmg(){
  const p = Math.round(state.maxHP*(0.55 + Math.min(0.20, enemy.level*0.01)));
  const e = enemy.atkMax*2;
  return Math.max(p,e) + R(1+Math.round(state.maxHP*0.10));
}

function disableChoices(){
  document.querySelectorAll('button.choice').forEach(b=>b.disabled=true);
}

function answer(choice){
  if(!Q || !enemy || state.hp<=0) return;
  disableChoices();
  beginLogLine();

  const btns = Array.from(document.querySelectorAll('button.choice'));
  btns.forEach(b=>b.classList.add('show-meaning'));
  const correctBtn = btns.find(b=>b.dataset.word===Q.ans);
  if(correctBtn) correctBtn.classList.add('correct');

  if(choice===Q.ans){
    const d=playerDmg();
    enemy.hp=clamp(enemy.hp-d,0,enemy.maxHP);
    log(`✅ 正解！ <span class="ok">${d} ダメージ</span>`);
    updateEnemy();

    const self=recoilDmg();
    state.hp=clamp(state.hp-self,0,state.maxHP);
    log(`💥 反動！ <span class="bad">${self} ダメージ</span>`);
  }else{
    const d=fatalWrongDmg();
    state.hp=clamp(state.hp-d,0,state.maxHP);
    log(`❌ 不正解… <span class="bad">${d} ダメージ</span>`);
    const wrongBtn = btns.find(b=>b.dataset.word===choice);
    if(wrongBtn) wrongBtn.classList.add('wrong');
  }

  render();

  if(state.hp<=0){
    log(`<span class="bad">☠️ 倒れた…</span>`);
    nextQuestion();
    return;
  }

  if(enemy.hp<=0){
    const heal=Math.round(state.maxHP*0.18)+2;
    state.hp=clamp(state.hp+heal,0,state.maxHP);
    log(`🏆 撃破！ <span class="ok">+${enemy.xp} EXP</span> / <span class="ok">+${heal}HP</span>`);

    // 敵Lvを上げる（最大でプレイヤーLvまで）
    state.enemyLv = state.enemyLv + 1;

    render();
    gainExp(enemy.xp);
  }

  setTimeout(()=>{
    if(state.hp<=0) return;
    if(enemy.hp<=0) spawnEnemy();
    nextQuestion();
    ExamView.complete();
  }, 1000);
}

function init(){
  state.total = progression.readTotalExp();
  if(!Number.isFinite(state.total) || state.total<0) state.total=0;

  recalcFromTotal();
  state.enemyLv = 1;
  state.hp = state.maxHP; // HPは開始時全快（保存しない）
  render();

  loadMonsters().then(()=>{
    const idx = MONSTERS.findIndex(m=>m?.id==='dust_lizard');
    state.mi = idx>=0 ? idx : 0;

    loadWords().then(()=>{
      spawnEnemy();
      nextQuestion();
    });
  });
}

window.addEventListener('storage', ()=>{ recalcFromTotal(); render(); });
window.addEventListener('rpg-equipment-change', ()=>{ recalcFromTotal(); render(); });

init();
