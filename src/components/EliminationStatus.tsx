import { RANK_SCORES } from '@/types';
import { Trophy, Zap } from 'lucide-react';

interface EliminationStatusProps {
  eliminationOrder: number[];
}

export const EliminationStatus = ({ eliminationOrder }: EliminationStatusProps) => {
  const remainingTeams = 8 - eliminationOrder.length;
  
  if (remainingTeams === 8) {
    return null; // 아무도 사출되지 않았을 때는 표시하지 않음
  }

  if (remainingTeams === 1) {
    return (
      <div className="mb-6 p-4 bg-gradient-to-r from-yellow-400 to-yellow-500 border-2 border-yellow-300 rounded-xl shadow-lg">
        <div className="text-yellow-900 font-black text-center uppercase tracking-wide text-lg flex items-center justify-center gap-2">
          <Trophy size={20} /> LAST SURVIVOR DECIDED!
        </div>
      </div>
    );
  }

  const guaranteedRank = remainingTeams;
  const guaranteedScore = RANK_SCORES[guaranteedRank - 1] || 0;

  return (
    <div className="mb-6 p-4 bg-gradient-to-r from-cyan-500 to-blue-600 border-2 border-cyan-400 rounded-xl shadow-lg">
      <div className="text-white font-bold text-center">
        <div className="text-lg font-black uppercase tracking-wide mb-1 flex items-center justify-center gap-2">
          <Zap size={18} /> BATTLE STATUS
        </div>
        <div className="text-sm font-semibold opacity-90">
          {eliminationOrder.length} TEAMS TERMINATED | {remainingTeams} REMAINING
        </div>
        <div className="text-xs font-medium opacity-80 mt-1">
          GUARANTEED RANK #{guaranteedRank} ({guaranteedScore} PTS MINIMUM)
        </div>
      </div>
    </div>
  );
}; 