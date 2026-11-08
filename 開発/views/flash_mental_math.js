// ===== フラッシュ暗算の難易度・報酬バランス（調整はここだけ） =====
const MENTAL_MATH_CONFIG = Object.freeze({
  difficulty: Object.freeze({
    minLevel: 0,
    levelsPerDigit: 20,
    maxDigits: 6,
    defaultLevel: 10,
    startCount: 3,
    countUpEvery: 5,
    intervalStepMs: 25,
    // 桁が上がるたびに個数を戻し、表示時間も長くして急な難化を防ぐ。
    baseIntervalMsByDigits: Object.freeze([1000, 1100, 1200, 1300, 1400, 1500]),
  }),
  reward: Object.freeze({
    minExp: 3,
    maxExp: 21,
    minDropChance: 0.12,
    maxDropChance: 0.45,
    // RANK 1 の重みを100とした、最低〜最高難易度での相対抽選重み。
    rank2Weight: Object.freeze([1, 25]),
    rank3Weight: Object.freeze([0, 7]),
    rank4Weight: Object.freeze([0, 2]),
    rank5Weight: Object.freeze([0, 0.5]),
  }),
});

(() => {
  const $ = (id) => document.getElementById(id);
  const kEl=$('k'), dEl=$('d'), msEl=$('ms'), difficultyLevelEl=$('difficultyLevel');
  const boxEl=$('box');
  const nEl=$('n'), msgEl=$('msg');
  const choicesEl=$('choices');
  const choiceBtns=Array.from(choicesEl.querySelectorAll('.choice'));
  const rewards = window.RPGStudyRewards.create({
    slot:'#rewardSlot',
    icon:'🧮',
    dropEvery:0
  });
  const results = window.StudyAppCore.createResultHistory({
    target:'#hint',
    limit:6
  });
  let seq=[], sum=0, i=0, t=null, running=false, readyForChoice=false;
  const difficultyConfig = MENTAL_MATH_CONFIG.difficulty;
  const maxDifficultyLevel = difficultyConfig.levelsPerDigit * difficultyConfig.maxDigits - 1;
  let difficultyLevel = difficultyConfig.defaultLevel;
  let activeDifficultyLevel = difficultyLevel;

  const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
  const mix=(from,to,ratio)=>from+(to-from)*ratio;

  function settingsForDifficulty(level){
    const safeLevel=Math.round(clamp(Number(level)||0,difficultyConfig.minLevel,maxDifficultyLevel));
    const digits=Math.floor(safeLevel/difficultyConfig.levelsPerDigit)+1;
    const phase=safeLevel%difficultyConfig.levelsPerDigit;
    const count=difficultyConfig.startCount+Math.floor(phase/difficultyConfig.countUpEvery);
    const speedPhase=phase%difficultyConfig.countUpEvery;
    const intervalMs=difficultyConfig.baseIntervalMsByDigits[digits-1]
      - speedPhase*difficultyConfig.intervalStepMs;
    return {level:safeLevel,count,digits,intervalMs};
  }

  function applyDifficulty(level){
    difficultyLevel=Math.round(clamp(Number(level)||0,difficultyConfig.minLevel,maxDifficultyLevel));
    const settings=settingsForDifficulty(difficultyLevel);
    difficultyLevelEl.textContent=String(difficultyLevel+1);
    kEl.textContent=String(settings.count);
    dEl.textContent=String(settings.digits);
    msEl.textContent=String(settings.intervalMs);
  }

  function rewardForDifficulty(level){
    const reward=MENTAL_MATH_CONFIG.reward;
    const ratio=clamp((Number(level)-difficultyConfig.minLevel)
      /(maxDifficultyLevel-difficultyConfig.minLevel),0,1);
    return {
      exp:Math.max(1,Math.round(mix(reward.minExp,reward.maxExp,ratio))),
      dropChance:mix(reward.minDropChance,reward.maxDropChance,ratio),
      rankWeights:[
        100,
        mix(reward.rank2Weight[0],reward.rank2Weight[1],ratio),
        mix(reward.rank3Weight[0],reward.rank3Weight[1],ratio*ratio),
        mix(reward.rank4Weight[0],reward.rank4Weight[1],ratio*ratio*ratio),
        mix(reward.rank5Weight[0],reward.rank5Weight[1],ratio*ratio*ratio*ratio),
      ],
    };
  }

  const rangeForDigits=(d)=>{
    d=Math.max(1,Math.min(6,Number(d)||1));
    return d===1 ? [1,9] : [10**(d-1), 10**d-1];
  };

  function setRunning(on){
    running=on;
    updateStartable();
  }

  function updateStartable(){
    if(boxEl) boxEl.classList.toggle('is-startable', !running && !readyForChoice);
  }

  function clearTimer(){ if(t){ clearTimeout(t); t=null; } }

  function reset(){
    clearTimer();
    rewards.hide();
    seq=[]; sum=0; i=0;
    nEl.textContent='';
    msgEl.textContent='';
    readyForChoice=false;
    showStart();
    choiceBtns.forEach(b=>{
      b.textContent='';
      b.disabled=true;
      b.classList.remove('correct','wrong');
    });
    setRunning(false);
  }

  function showNext(){
    if(i>=seq.length){
      showChoices();
      return;
    }
    nEl.textContent=String(seq[i]);
    i++;
    t=setTimeout(showNext, Math.max(50, Number(msEl.textContent)||300));
  }

  ExamView.onVisibility((visible)=>{
    if(!running || readyForChoice) return;
    clearTimer();
    if(visible) t=setTimeout(showNext, Math.max(50, Number(msEl.textContent)||300));
  });

  function makeChoices(correct){
    const deltas=[-5,-4,-3,-2,-1,1,2,3,4,5];
    const picks=new Set([correct]);
    while(picks.size<4){
      const delta=deltas[window.StudyAppCore.randomInt(0,deltas.length-1)];
      const candidate=correct+delta;
      if(candidate>=0) picks.add(candidate);
    }
    return window.StudyAppCore.shuffle(Array.from(picks));
  }

  function showChoices(){
    const choices=makeChoices(sum);
    choiceBtns.forEach((b,idx)=>{
      b.textContent=String(choices[idx]);
      b.dataset.value=String(choices[idx]);
      b.disabled=false;
      b.classList.remove('correct','wrong');
    });
    nEl.classList.add('is-hidden');
    choicesEl.classList.remove('is-hidden');
    readyForChoice=true;
    updateStartable();
  }
  function showStart(){
    choicesEl.classList.add('is-hidden');
    nEl.classList.remove('is-hidden');
    nEl.textContent='開始';
    msgEl.textContent='';
    updateStartable();
  }

  function revealResult(chosen){
    const correctVal=String(sum);
    let gain = 0;
    const ok = Boolean(chosen && chosen.dataset.value===correctVal);
    choiceBtns.forEach(b=>{
      if(b.dataset.value===correctVal) b.classList.add('correct');
    });
    if(ok){
      const reward=rewardForDifficulty(activeDifficultyLevel);
      gain=reward.exp;
      rewards.award(reward);
    }
    if(chosen && !ok){
      chosen.classList.add('wrong');
    }
    applyDifficulty(activeDifficultyLevel+(ok ? 1 : -1));
    results.add(ok, ok ? `🎉 正解 +${gain} EXP` : `✖ 不正解 +0 EXP`);
    choiceBtns.forEach(b=>b.disabled=true);
    setTimeout(() => {
      reset();
      ExamView.complete();
    }, 1400);
  }

  function start(){
    reset();
    window.StudyAppCore.blurActiveElement();
    activeDifficultyLevel=difficultyLevel;
    const k=Math.max(2, Math.min(200, Number(kEl.textContent)||10));
    const [lo,hi]=rangeForDigits(dEl.textContent);
    seq=[];
    for(let idx=0; idx<k; idx++){
      let next = window.StudyAppCore.randomInt(lo, hi);
      while(seq.length>0 && next===seq[seq.length-1]){
        next = window.StudyAppCore.randomInt(lo, hi);
      }
      seq.push(next);
    }
    sum=seq.reduce((a,b)=>a+b,0);
    i=0;
    msgEl.textContent='';
    choiceBtns.forEach(b=>{ b.disabled=true; b.textContent=''; b.classList.remove('correct','wrong'); });
    choicesEl.classList.add('is-hidden');
    nEl.classList.remove('is-hidden');
    setRunning(true);
    showNext();
  }

  choicesEl.addEventListener('click', (e)=>{
    const btn=e.target.closest('.choice');
    if(!btn || !readyForChoice) return;
    readyForChoice=false;
    revealResult(btn);
  });

  if(boxEl){
    boxEl.addEventListener('click', (e)=>{
      if(running || readyForChoice) return;
      if(e.target.closest('button,.settings-row')) return;
      start();
    });
  }

  applyDifficulty(difficultyLevel);
  reset();
})();
