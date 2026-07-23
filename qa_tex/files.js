const files_qaMathTree = [
  {
    folder: ["大学数学", 0.1],
    files: [
      ["大学数学_ガロア理論", 1],
    ],
  },
  {
    folder: ["数学", 10],
    files: [
      ["数学Ⅰ_数と式", 10],
      ["数学Ⅰ_図形と計量", 10],
      ["数学Ⅰ_二次関数", 10],
      ["数学Ⅰ_データの分析", 10],
      ["数学A_場合の数と確率", 10],
      ["数学A_図形の性質", 10],
      ["数学A_数学と人間の活動", 10],
      ["数学Ⅱ_いろいろな式", 10],
      ["数学Ⅱ_図形と方程式", 10],
      ["数学Ⅱ_指数関数_対数関数", 10],
      ["数学Ⅱ_三角関数", 10],
      ["数学Ⅱ_微分_積分の考え", 10],
      ["数学B_数列", 10],
      ["数学B_統計的な推測", 10],
      ["数学B_数学と社会生活", 10],
      ["数学C_ベクトル", 10],
      ["数学C_平面上の曲線と複素数平面", 10],
      ["数学C_数学的な表現の工夫", 10],
      ["数学Ⅲ_極限", 10],
      ["数学Ⅲ_微分法", 10],
      ["数学Ⅲ_積分法", 10],
    ],
  },
  {
    folder: ["化学", 1],
    files: [
      ["化学基礎_化学と人間生活_物質の構成", 3],
      ["化学基礎_物質量と化学反応式", 3],
      ["化学基礎_酸塩基と酸化還元", 1],
      ["化学_物質の状態と平衡_気体", 1],
      ["化学_物質の状態と平衡_溶液", 3],
      ["化学_物質の変化と平衡_熱と電気", 3],
      ["化学_物質の変化と平衡_化学平衡と電離平衡", 3],
      ["化学_反応速度と化学平衡", 3],
      ["化学_電離平衡と緩衝液", 3],
      ["化学_有機化合物の性質_燃焼分析", 3],
      ["化学_有機化合物の性質_構造決定", 3],
      ["化学_有機化合物の性質_官能基", 3],
      ["化学_無機物質", 3],
      ["化学_無機物質_系統分析", 3],
      ["化学_高分子化合物", 3],
      ["化学_化学が果たす役割", 3],
    ],
  },
  {
    folder: ["物理", 1],
    files: [
      ["物理_力学", 3],
      ["物理_円運動_単振動", 3],
      ["物理_熱力学", 3],
      ["物理_熱力学_気体分子運動", 3],
      ["物理_波動", 3],
      ["物理_波動_音と光", 3],
      ["物理_電磁気", 3],
      ["物理_電磁誘導と交流", 3],
      ["物理_電磁波", 3],
      ["物理_原子物理", 3],
      ["物理_原子_原子核と放射線", 3],
    ],
  },
  {
    folder: ["英語", 0.5],
    files: [
      ["英語_英文法", 1],
      ["英語_重要例文和訳", 1],
      ["英語_英文解釈_構文判定", 1],
      ["英語_英語コミュニケーション_読解要約", 1],
      ["英語_論理表現_発信テンプレート", 1],
      ["英語_リスニング_要点把握", 1],
      ["英語_ライティング_段落構成", 1],
    ],
  },
  {
    folder: ["国語", 0.3],
    files: [
      ["国語_古文単語", 10],
      ["国語_現代文_評論語彙", 1],
      ["国語_古文文法_助動詞", 1],
      ["国語_漢文句法", 1],
      ["国語_論理国語_評論構造", 1],
      ["国語_古典探究_古文読解", 1],
      ["国語_古典探究_漢文読解", 1],
      ["国語_言語文化_文学読解", 1],
      ["国語_国語表現_小論文", 1],
    ],
  },
  {
    folder: ["情報", 0.5],
    files: [
      ["情報I_情報社会の問題解決", 1],
      ["情報I_コンピュータの仕組み", 1],
      ["情報I_プログラムの基礎", 1],
      ["情報I_情報通信ネットワーク", 1],
      ["情報I_情報セキュリティ", 1],
      ["情報I_情報通信ネットワークとセキュリティ", 1],
      ["情報I_情報デザインとメディア", 1],
      ["情報I_アルゴリズムとプログラム", 1],
      ["情報I_データ活用", 1],
      ["情報I_データ活用_収集整理整形", 1],
      ["情報I_データベース", 1],
      ["情報I_モデル化とシミュレーション", 1],
      ["情報I_AIと機械学習の基礎", 1],
    ],
  },
];

function qaFileEntryParts(entry) {
  if (Array.isArray(entry)) {
    return {
      name: String(entry[0] ?? "").trim(),
      weight: Number(entry[1]),
      children: null,
    };
  }

  const folder = Array.isArray(entry?.folder)
    ? entry.folder
    : [entry?.folder, 1];
  return {
    name: String(folder[0] ?? "").trim(),
    weight: Number(folder[1]),
    children: Array.isArray(entry?.files) ? entry.files : null,
  };
}

function flattenQaFiles(entries, prefix = "", groupWeight = null) {
  if (!Array.isArray(entries)) return [];

  const validEntries = entries
    .map(qaFileEntryParts)
    .filter(({ name, weight }) => name && Number.isFinite(weight) && weight > 0);
  const totalWeight = validEntries.reduce((sum, entry) => sum + entry.weight, 0);
  const files = [];

  validEntries.forEach(({ name, weight, children }) => {
    const path = prefix ? `${prefix}/${name}` : name;
    const effectiveWeight = groupWeight === null
      ? weight
      : groupWeight * weight / totalWeight;

    if (children) {
      files.push(...flattenQaFiles(children, path, effectiveWeight));
    } else {
      files.push([path, effectiveWeight]);
    }
  });

  return files;
}

const files_qaMath = flattenQaFiles(files_qaMathTree);