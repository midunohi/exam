(function (global) {
  "use strict";

  // 学習報酬の保存先・武器周期・文言はここだけを編集する。
  const CONFIG = Object.freeze({
    expKey: global.RPGProgression?.config?.storageKey || "midunohi.exam.exp",
    weaponDropEvery: 3,
    messages: Object.freeze([
      "知識がひとつ身についた！",
      "学びの歩みが輝いた！",
      "理解が一段深まった！",
      "冒険の知恵が深まった！"
    ])
  });
  const STYLE_ID = "rpg-study-reward-styles";

  function toAmount(value) {
    const number = Number(value);
    return Number.isFinite(number) && number > 0 ? Math.floor(number) : 0;
  }
  function readExp() {
    if (global.RPGProgression && typeof global.RPGProgression.readTotalExp === "function") {
      return global.RPGProgression.readTotalExp();
    }
    try {
      const value = Number(global.localStorage && global.localStorage.getItem(CONFIG.expKey));
      return Number.isFinite(value) && value >= 0 ? Math.floor(value) : 0;
    } catch (_error) {
      return 0;
    }
  }
  function writeExp(value) {
    if (global.RPGProgression && typeof global.RPGProgression.writeTotalExp === "function") {
      global.RPGProgression.writeTotalExp(value, { notify: false });
      return;
    }
    try {
      if (global.localStorage) global.localStorage.setItem(CONFIG.expKey, String(value));
    } catch (_error) {
      // 保存不可でも学習本体は止めない。
    }
  }
  function resolveElement(target) {
    if (typeof target === "string") return global.document.querySelector(target);
    return target && target.nodeType === 1 ? target : null;
  }
  function ensureStyles() {
    if (!global.document || global.document.getElementById(STYLE_ID)) return;
    const style = global.document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .study-reward-slot{position:relative;width:100%;height:96px;min-height:96px;flex:0 0 96px;overflow:visible}
      .study-reward-window{position:absolute;z-index:20;top:16px;left:50%;width:min(540px,calc(100vw - 28px));display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:12px;padding:13px 18px;overflow:hidden;pointer-events:none;color:#f8fafc;opacity:0;transform:translate(-50%,18px) scale(.96);background:linear-gradient(135deg,rgba(7,18,36,.76),rgba(20,37,61,.7));border:1px solid rgba(125,255,178,.58);border-radius:17px;box-shadow:0 14px 36px rgba(0,0,0,.38),0 0 22px rgba(34,211,238,.13);backdrop-filter:blur(8px) saturate(112%);text-shadow:0 2px 5px rgba(0,0,0,.86)}
      .study-reward-window[hidden]{display:none}
      .study-reward-window::before{content:"";position:absolute;inset:0;background:linear-gradient(105deg,transparent 20%,rgba(255,255,255,.18) 45%,transparent 67%);transform:translateX(-115%)}
      .study-reward-window::after{content:"✦";position:absolute;right:8px;top:-8px;color:rgba(255,234,125,.55);font-size:30px}
      .study-reward-window.is-visible{animation:studyRewardIn .55s cubic-bezier(.2,.8,.2,1) both}
      .study-reward-window.is-visible::before{animation:studyRewardShine 1.1s .12s ease-out both}
      .study-reward-icon{position:relative;z-index:1;display:grid;place-items:center;width:46px;height:46px;border-radius:50%;font-size:27px;background:radial-gradient(circle at 35% 30%,#fff6a8 0 8%,#fbbf24 34%,#f97316 75%);box-shadow:0 0 18px rgba(251,191,36,.55),inset 0 0 0 2px rgba(255,255,255,.4)}
      .is-visible .study-reward-icon{animation:studyRewardIcon .72s .08s cubic-bezier(.2,.9,.3,1.25) both}
      .study-reward-copy{position:relative;z-index:1;min-width:0}.study-reward-title{display:block;overflow:hidden;color:#d1fae5;font-size:clamp(.82rem,2.8vw,.95rem);font-weight:850;white-space:nowrap;text-overflow:ellipsis}.study-reward-detail{display:block;margin-top:1px;overflow:hidden;color:#a5b4c7;font-size:.76rem;font-weight:750;white-space:nowrap;text-overflow:ellipsis}
      .study-reward-gain{position:relative;z-index:1;color:#fff3a3;font-size:clamp(1.1rem,4vw,1.35rem);font-weight:900;white-space:nowrap;text-shadow:0 0 12px rgba(251,191,36,.72)}.is-visible .study-reward-gain{animation:studyRewardGain .6s .18s cubic-bezier(.2,.9,.3,1.35) both}
      .study-reward-particle{position:absolute;z-index:2;color:#fef08a;font-size:13px;opacity:0}.study-reward-particle.p1{left:14%;top:5px}.study-reward-particle.p2{left:48%;bottom:3px;font-size:10px}.study-reward-particle.p3{right:19%;top:4px;font-size:11px}.is-visible .study-reward-particle{animation:studyRewardParticle 1.15s .22s ease-out both}
      @keyframes studyRewardIn{from{opacity:0;transform:translate(-50%,18px) scale(.96)}to{opacity:1;transform:translate(-50%,0) scale(1)}}@keyframes studyRewardShine{from{transform:translateX(-115%)}to{transform:translateX(115%)}}@keyframes studyRewardIcon{0%{transform:scale(.45) rotate(-18deg)}58%{transform:scale(1.16) rotate(7deg)}100%{transform:scale(1)}}@keyframes studyRewardGain{0%{opacity:0;transform:scale(.4)}65%{opacity:1;transform:scale(1.18)}100%{opacity:1;transform:scale(1)}}@keyframes studyRewardParticle{0%{opacity:0;transform:translateY(8px)}30%{opacity:1}100%{opacity:0;transform:translateY(-18px) rotate(55deg)}}
      @media(max-width:460px){.study-reward-slot{height:84px;min-height:84px;flex-basis:84px}.study-reward-window{top:12px;gap:9px;padding:11px 13px}.study-reward-icon{width:40px;height:40px;font-size:23px}.study-reward-detail{font-size:.7rem}}
      @media(prefers-reduced-motion:reduce){.study-reward-window.is-visible{animation:none;opacity:1;transform:translate(-50%,0)}.study-reward-window.is-visible::before,.is-visible .study-reward-icon,.is-visible .study-reward-gain,.is-visible .study-reward-particle{animation:none}}
    `;
    global.document.head.appendChild(style);
  }

  function createWindow(slot) {
    slot.classList.add("study-reward-slot");
    const message = global.document.createElement("div");
    message.className = "study-reward-window";
    message.hidden = true;
    message.setAttribute("role", "status");
    message.setAttribute("aria-live", "polite");
    message.setAttribute("aria-atomic", "true");
    message.innerHTML = `
      <span class="study-reward-particle p1" aria-hidden="true">✦</span>
      <span class="study-reward-particle p2" aria-hidden="true">◆</span>
      <span class="study-reward-particle p3" aria-hidden="true">✧</span>
      <span class="study-reward-icon" aria-hidden="true">📖</span>
      <span class="study-reward-copy">
        <strong class="study-reward-title">知識がひとつ身についた！</strong>
        <span class="study-reward-detail">累計 EXP 0</span>
      </span>
      <strong class="study-reward-gain">+1 EXP</strong>
    `;
    slot.replaceChildren(message);
    return message;
  }

  class StudyRewardController {
    constructor(options) {
      const settings = options || {};
      const slot = resolveElement(settings.slot);
      if (!slot) throw new Error("RPGStudyRewards: message slot is required");
      ensureStyles();
      this.message = createWindow(slot);
      this.icon = this.message.querySelector(".study-reward-icon");
      this.title = this.message.querySelector(".study-reward-title");
      this.detail = this.message.querySelector(".study-reward-detail");
      this.gain = this.message.querySelector(".study-reward-gain");
      this.defaultIcon = settings.icon || "📖";
      this.dropEvery = Math.max(0, Math.floor(Number(settings.dropEvery ?? CONFIG.weaponDropEvery) || 0));
      this.rewardCount = 0;
      this.onExpChange = typeof settings.onExpChange === "function" ? settings.onExpChange : null;
      if (this.onExpChange) this.onExpChange(readExp());
    }

    getTotalExp() {
      return readExp();
    }

    award(input) {
      const options = typeof input === "number" ? { exp: input } : (input || {});
      const amount = toAmount(options.exp ?? 1);
      if (!amount) return null;
      let totalExp;
      if (global.RPGProgression && typeof global.RPGProgression.addExp === "function") {
        totalExp = global.RPGProgression.addExp(amount, { notify: false }).totalExp;
      } else {
        totalExp = readExp() + amount;
        writeExp(totalExp);
      }

      if (options.countForDrop !== false) this.rewardCount += 1;
      const periodicDrop = this.dropEvery > 0 && this.rewardCount > 0
        && this.rewardCount % this.dropEvery === 0;
      const shouldDrop = options.dropWeapon === true
        || (options.dropWeapon !== false && periodicDrop);
      let weaponDrop = null;
      if (shouldDrop && global.RPGEquipment
          && typeof global.RPGEquipment.dropRankOne === "function") {
        try {
          weaponDrop = global.RPGEquipment.dropRankOne();
        } catch (_error) {
          weaponDrop = null;
        }
      }

      this.show({ amount, totalExp, weaponDrop, icon: options.icon || this.defaultIcon });
      if (this.onExpChange) this.onExpChange(totalExp);
      if (typeof global.dispatchEvent === "function" && typeof global.CustomEvent === "function") {
        global.dispatchEvent(new global.CustomEvent("rpg-exp-change", {
          detail: { amount, totalExp, weaponDrop, rewardCount: this.rewardCount }
        }));
      }
      return { amount, totalExp, weaponDrop, rewardCount: this.rewardCount };
    }

    show(result) {
      let icon = result.icon;
      let title = CONFIG.messages[(Math.max(1, this.rewardCount) - 1) % CONFIG.messages.length];
      let detail = `累計 EXP ${result.totalExp}`;
      const drop = result.weaponDrop;

      if (drop) {
        const merge = drop.merges[drop.merges.length - 1];
        const weapon = merge ? merge.to : drop.dropped;
        icon = weapon.icon;
        title = merge ? `装備強化！ ${weapon.name}` : `武器ドロップ！ ${weapon.name}`;
        detail = merge
          ? `RANK ${merge.from.rank} × 3 → RANK ${weapon.rank}・累計 EXP ${result.totalExp}`
          : `RANK ${weapon.rank}・バッグへ収納・累計 EXP ${result.totalExp}`;
      }

      this.icon.textContent = icon;
      this.title.textContent = title;
      this.detail.textContent = detail;
      this.gain.textContent = `+${result.amount} EXP`;
      this.message.hidden = false;
      this.message.classList.remove("is-visible");
      void this.message.offsetWidth;
      this.message.classList.add("is-visible");
    }

    hide() {
      this.message.classList.remove("is-visible");
      this.message.hidden = true;
    }

    resetCounter() {
      this.rewardCount = 0;
    }
  }

  global.RPGStudyRewards = Object.freeze({
    config: CONFIG,
    getTotalExp: readExp,
    create: (options) => new StudyRewardController(options)
  });
})(typeof window !== "undefined" ? window : globalThis);
