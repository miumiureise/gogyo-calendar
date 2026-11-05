import { TEN_STEMS, TWELVE_BRANCHES } from '../data/calendarData';
import { FIVE_ELEMENTS } from '../data/elementsData';

export interface Pillar {
  stem: typeof TEN_STEMS[0];
  branch: typeof TWELVE_BRANCHES[0];
  name: string;
}

export interface AnalysisResult {
  pillars: {
    year: Pillar;
    month: Pillar;
    day: Pillar;
    hour?: Pillar;
  };
  balance: Record<string, number>;
}

// 正の剰余を返すヘルパー関数
const mod = (n: number, m: number) => ((n % m) + m) % m;

/**
 * 四柱推命的な簡易計算ロジック
 */
export function calculateFourPillars(birthDate: Date, birthHour?: number): AnalysisResult {
  // 1. 日柱の計算
  const baseDate = new Date(2000, 0, 1);
  const diffDays = Math.floor((birthDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));
  
  const dayStemIdx = mod(6 + diffDays, 10);
  const dayBranchIdx = mod(4 + diffDays, 12);
  const dayStem = TEN_STEMS[dayStemIdx];
  const dayBranch = TWELVE_BRANCHES[dayBranchIdx];

  // 2. 年柱の計算 (簡易版: 2月4日頃を年替わりとする)
  const year = birthDate.getFullYear();
  const month = birthDate.getMonth();
  const date = birthDate.getDate();
  
  let effectiveYear = year;
  if (month < 1 || (month === 1 && date < 4)) {
    effectiveYear -= 1;
  }
  
  const yearDiff = effectiveYear - 2000;
  const yearStem = TEN_STEMS[mod(6 + yearDiff, 10)];
  const yearBranch = TWELVE_BRANCHES[mod(4 + yearDiff, 12)];

  // 3. 月柱の計算 (簡易版: 節気近似)
  const monthOffset = month; 
  const monthStemIdx = mod(dayStemIdx + 2 + monthOffset, 10);
  const monthBranchIdx = mod(monthOffset + 2, 12); 
  const monthStem = TEN_STEMS[monthStemIdx];
  const monthBranch = TWELVE_BRANCHES[monthBranchIdx];

  // 4. 時柱の計算 (日干から決定)
  let hourPillar: Pillar | undefined = undefined;
  if (birthHour !== undefined) {
    const hourIdx = mod(Math.floor((birthHour + 1) / 2), 12);
    const hourStemStart = mod(dayStemIdx % 5, 5) * 2; 
    const hourStemIdx = mod(hourStemStart + hourIdx, 10);
    const hourStem = TEN_STEMS[hourStemIdx];
    const hourBranch = TWELVE_BRANCHES[hourIdx];
    hourPillar = { stem: hourStem, branch: hourBranch, name: `${hourStem.name}${hourBranch.name}` };
  }

  // 五行バランス計算
  const balance: Record<string, number> = { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 };
  const addElement = (el: string) => { balance[el] = (balance[el] || 0) + 1 };

  addElement(yearStem.element); addElement(yearBranch.element);
  addElement(monthStem.element); addElement(monthBranch.element);
  addElement(dayStem.element); addElement(dayBranch.element);
  if (hourPillar) {
    addElement(hourPillar.stem.element);
    addElement(hourPillar.branch.element);
  }

  return {
    pillars: {
      year: { stem: yearStem, branch: yearBranch, name: `${yearStem.name}${yearBranch.name}` },
      month: { stem: monthStem, branch: monthBranch, name: `${monthStem.name}${monthBranch.name}` },
      day: { stem: dayStem, branch: dayBranch, name: `${dayStem.name}${dayBranch.name}` },
      hour: hourPillar
    },
    balance
  };
}
