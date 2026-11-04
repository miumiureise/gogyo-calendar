export const FIVE_ELEMENTS = {
  木: { name: '木', color: '#4CAF50', description: '成長、発展、春。東の方角を司る。', opposite: '金' },
  火: { name: '火', color: '#F44336', description: '情熱、エネルギー、夏。南の方角を司る。', opposite: '水' },
  土: { name: '土', color: '#FFC107', description: '安定、育成、季節の変わり目。中央を司る。', opposite: '木' },
  金: { name: '金', color: '#BDBDBD', description: '収穫、凝縮、秋。西の方角を司る。', opposite: '火' },
  水: { name: '水', color: '#2196F3', description: '知恵、流動、冬。北の方角を司る。', opposite: '土' },
};

export const GENERATIVE_CYCLE = [
  { from: '木', to: '火', label: '相生' },
  { from: '火', to: '土', label: '相生' },
  { from: '土', to: '金', label: '相生' },
  { from: '金', to: '水', label: '相生' },
  { from: '水', to: '木', label: '相生' },
];

export const CONTROLLING_CYCLE = [
  { from: '木', to: '土', label: '相剋' },
  { from: '土', to: '水', label: '相剋' },
  { from: '水', to: '火', label: '相剋' },
  { from: '火', to: '金', label: '相剋' },
  { from: '金', to: '木', label: '相剋' },
];

export const EXPLANATIONS = {
  yinYang: '陰陽とは、万物を相対的な二つの性質（陰と陽）で捉える考え方です。陽は光、熱、活動、男性的なものを指し、陰は闇、冷、静止、女性的なものを指します。',
  elements: '五行とは、万物を構成する5つの要素（木・火・土・金・水）の循環的な関係性で世界を捉える思想です。',
  tenStems: '十干は、五行に陰陽を組み合わせた10種類の記号です（甲乙丙丁戊己庚辛壬癸）。',
  twelveBranches: '十二支は、時間や方向、動物に割り当てられた12種類の記号です（子丑寅卯辰巳午未申酉戌亥）。',
  generative: '相生とは、ある要素が次の要素を助け、生み出す関係です（例：木が燃えて火を生む）。',
  controlling: '相剋とは、ある要素が別の要素を抑制し、打ち消す関係です（例：水が火を消す）。',
};
