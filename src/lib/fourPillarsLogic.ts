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

/**
 * 四柱推命的な簡易計算ロジック
 * 厳密な節気計算には膨大な天文データが必要なため、
 * 本実装では近似的な暦計算（月柱の簡易算出）を行い、その制限を明記します。
 */
export function calculateFourPillars(birthDate: Date, birthHour?: number): AnalysisResult {
  // 1. 日柱の計算 (既実装のロジックを利用)
  const baseDate = new Date(2000, 0, 1);
  const diffDays = Math.floor((birthDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));
  
  const dayStemIdx = (6 + diffDays) % 10;
  const dayBranchIdx = (4 + diffDays) % 12;
  const dayStem = TEN_STEMS[(dayStemIdx + 10) % 10];
  const dayBranch = TWELVE_BRANCHES[(dayBranchIdx + 12) % 12];

  // 2. 年柱の計算 (簡易版: 2月4日頃を年替わりとする)
  // 厳密には立春だが、近似的に1月/2月の境界で処理
  const year = birthDate.getFullYear();
  const month = birthDate.getMonth();
  const date = birthDate.getDate();
  
  let effectiveYear = year;
  if (month < 1 || (month === 1 && date < 4)) {
    effectiveYear -= 1;
  }
  
  // 2000年 = 庚辰 (Stem 6, Branch 4)
  const yearDiff = effectiveYear - 2000;
  const yearStem = TEN_STEMS[(6 + yearDiff) % 10];
  const yearBranch = TWELVE_BRANCHES[(4 + yearDiff) % 12];

  // 3. 月柱の計算 (簡易版: 節気近似)
  // 日柱の天干から月柱の天干が決まる「月干始法」を適用
  const monthOffset = month; // 0-11
  // 簡易的な月柱の開始天干算出
  const monthStemIdx = ( (dayStemIdx + 2 + monthOffset) % 10 + 10 ) % 10;
  const monthBranchIdx = (monthOffset + 2) % 12; // 寅月から開始
  const monthStem = TEN_STEMS[monthStemIdx];
  const monthBranch = TWELVE_BRANCHES[monthBranchIdx];

  // 4. 時柱の計算 (日干から決定)
  let hourPillar: Pillar | undefined = undefined;
  if (birthHour !== undefined) {
    // 子時は23-1時。簡易的に2時間刻みのインデックス
    const hourIdx = Math.floor((birthHour + 1) / 2) % 12;
    // 日干に基づく時干の開始位置
    const hourStemStart = (dayStemIdx % 5) * 2; 
    const hourStemIdx = (hourStemStart + hourIdx) % 10;
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
