export interface Team {
  id: number;
  name: string;
  killScore: number; // 유저가 직접 조정한 킬 점수
  currentRoundScore: number; // 킬 점수 + 순위 점수를 포함한 라운드 총점
  totalScore: number;
  eliminationRank?: number; // 사출된 순위
}

export interface RoundHistory {
  roundNumber: number;
  teams: Team[];
  winner?: Team; // 우승팀 추가
  teamScores?: { teamId: number; teamName: string; roundScore: number }[]; // 이전 버전 호환성을 위해 optional
}

export interface GameHistory {
  gameId: string;
  gameName: string;
  date: string;
  rounds: RoundHistory[];
  finalResults: Team[];
}

// 순위별 점수
export const RANK_SCORES = [10, 7, 5, 4, 3, 2, 1, 0]; 