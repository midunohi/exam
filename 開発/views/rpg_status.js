  const $ = (id)=>document.getElementById(id);
  const clamp = (x,a,b)=>Math.max(a,Math.min(b,x));
  const setBar = (el,r)=>el && (el.style.width=(100*clamp(r,0,1)).toFixed(1)+'%');
  const progression = window.RPGProgression;

  let lv, exp, nextExp, maxHP, atk, totalExp;

  const load = ()=>{
    const snapshot = progression.getSnapshot();
    lv = snapshot.level;
    exp = snapshot.exp;
    nextExp = snapshot.nextExp;
    maxHP = snapshot.maxHP;
    atk = snapshot.baseAttack;
    totalExp = snapshot.totalExp;
  };

  const render = ()=>{
    const equipment = window.RPGEquipment;
    const attack = equipment
      ? equipment.getAttackStats(atk)
      : { base:atk, bonus:0, total:atk, equipped:null };

    $('lv').textContent = lv;
    $('atk').textContent = attack.total;
    $('atkDetail').textContent = attack.bonus > 0
      ? `基礎 ${attack.base} + 装備 ${attack.bonus}`
      : `基礎 ${attack.base}`;
    $('totalExp').textContent = totalExp;

    $('expText').textContent = `${exp} / ${nextExp}`;
    $('hpText').textContent = `${maxHP} / ${maxHP}`;
    $('toNext').textContent = Math.max(0, nextExp - exp);

    setBar($('expBar'), exp / nextExp);
    setBar($('hpBar'), 1);

    renderEquipment(equipment, attack.equipped);
  };

  const renderEquipment = (equipment, equipped)=>{
    const inventory = equipment ? equipment.getInventory() : [];
    const ownedWeapons = inventory.filter((weapon)=>weapon.count > 0);
    const total = ownedWeapons.reduce((sum, weapon)=>sum + weapon.count, 0);
    $('bagCount').textContent = `所持 ${total}`;

    const equippedEl = $('equippedWeapon');
    equippedEl.classList.toggle('emptyEquipment', !equipped);
    equippedEl.querySelector('.equippedIcon').textContent = equipped ? equipped.icon : '◌';
    equippedEl.querySelector('.equippedName').textContent = equipped ? equipped.name : '装備なし';
    equippedEl.querySelector('.equippedRank').textContent = equipped ? `RANK ${equipped.rank}・AUTO EQUIP` : 'AUTO EQUIP';
    equippedEl.querySelector('.equippedBonus').textContent = equipped ? `ATK +${equipped.atkBonusPct}%` : 'ATK +0%';

    const grid = $('weaponGrid');
    grid.replaceChildren();
    if(!ownedWeapons.length){
      const empty = document.createElement('p');
      empty.className = 'bagEmpty';
      empty.textContent = 'まだ武器を持っていません';
      grid.appendChild(empty);
      return;
    }
    ownedWeapons.forEach((weapon)=>{
      const slot = document.createElement('div');
      slot.className = 'weaponSlot';
      slot.title = `${weapon.name} / ATK +${weapon.atkBonusPct}%`;
      slot.innerHTML = `<span class="slotRank">R${weapon.rank}</span><span class="slotIcon">${weapon.icon}</span><span class="slotCount">${weapon.count}</span>`;
      grid.appendChild(slot);
    });
  };

  const init = ()=>{
    load(); render();
  };
  window.addEventListener('storage', ()=>{ load(); render(); });
  window.addEventListener('rpg-exp-change', ()=>{ load(); render(); });
  window.addEventListener('rpg-equipment-change', render);
  ExamView.onVisibility(visible=>{ if(visible){ load(); render(); } });
  init();

const statusTabs = [...document.querySelectorAll('.statusTabs [role="tab"]')];

function activateStatusTab(activeTab) {
  for (const tab of statusTabs) {
    const selected = tab === activeTab;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = !selected;
  }
}

for (const tab of statusTabs) {
  tab.addEventListener('click', () => activateStatusTab(tab));
  tab.addEventListener('keydown', (event) => {
    const index = statusTabs.indexOf(tab);
    const next = { ArrowLeft: 1 - index, ArrowRight: 1 - index, Home: 0, End: 1 }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    activateStatusTab(statusTabs[next]);
    statusTabs[next].focus();
  });
}
