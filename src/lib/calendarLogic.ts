import { TEN_STEMS, TWELVE_BRANCHES } from '../data/calendarData';

/**
 * 基準日 (2000年1月1日) の干支
 * 2000年1月1日は 庚辰 (Kanoe-Tatsu)
 * 天干インデックス: 庚 = 6
 * 地支インデックス: 辰 = 4
 */
const BASE_DATE = new Date(2000, 0, 1);
const BASE_STEM_INDEX = 6; // 庚
const BASE_BRANCH_INDEX = 4; // 辰

export function getKanjiForDate(date: Date) {
  const diffTime = date.getTime() - BASE_DATE.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const stemIndex = (BASE_STEM_INDEX + diffDays) % 10;
  const branchIndex = (BASE_BRANCH_INDEX + diffDays) % 12;

  // JSの剰余演算は負の数になる可能性があるため補正
  const normalizedStemIndex = stemIndex < 0 ? stemIndex + 10 : stemIndex;
  const normalizedBranchIndex = branchIndex < 0 ? branchIndex + 12 : branchIndex;

  const stem = TEN_STEMS[normalizedStemIndex];
  const branch = TWELVE_BRANCHES[normalizedBranchIndex];

  return {
    full: `${stem.name}${branch.name}`,
    stem,
    branch,
  };
}

export function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
