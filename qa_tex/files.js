const files_qaMathTree = [
  ["galois", 1],
  {
    folder: "数学",
    files: [
      ["数学Ⅰ_数と式", 10],
      ["数学Ⅰ_二次関数", 10],
      ["数学A_場合の数と確率", 10],
      ["数学Ⅱ_いろいろな式", 10],
      ["数学Ⅱ_図形と方程式", 10],
      ["数学Ⅱ_指数関数_対数関数", 10],
      ["数学Ⅱ_三角関数", 10],
      ["数学Ⅱ_微分_積分の考え", 10],
      ["数学B_数列", 10],
      ["数学C_ベクトル", 10],
      ["数学C_平面上の曲線と複素数平面", 10],
      ["数学Ⅲ_極限", 10],
      ["数学Ⅲ_微分法", 10],
      ["数学Ⅲ_積分法", 10],
    ],
  },
  {
    folder: "化学",
    files: [
      ["化学基礎_物質量と化学反応式", 3],
      ["化学基礎_酸塩基と酸化還元", 1],
      ["化学_物質の状態と平衡_気体", 1],
      ["化学_物質の状態と平衡_溶液", 3],
      ["化学_物質の変化と平衡_熱と電気", 3],
      ["化学_物質の変化と平衡_化学平衡と電離平衡", 3],
      ["化学_有機化合物の性質_燃焼分析", 3],
      ["化学_無機物質", 3],
    ],
  },
  {
    folder: "物理",
    files: [
      ["物理_力学", 3],
      ["物理_円運動_単振動", 3],
      ["物理_熱力学", 3],
      ["物理_波動", 3],
      ["物理_電磁気", 3],
      ["物理_原子物理", 3],
    ],
  },
  ["古文単語", 10],
  ["情報", 1],
  ["英文法", 1],
  ["英語例文", 1],
];

function flattenQaFiles(entries, prefix = "") { const files = []; entries.forEach((entry) => { if (Array.isArray(entry)) { const name = prefix ? `${prefix}/${entry[0]}` : entry[0]; files.push([name, entry[1]]); return; } const folder = entry && entry.folder; const children = entry && entry.files; if (!folder || !Array.isArray(children)) return; const nextPrefix = prefix ? `${prefix}/${folder}` : folder; files.push(...flattenQaFiles(children, nextPrefix)); }); return files; }

const files_qaMath = flattenQaFiles(files_qaMathTree);
