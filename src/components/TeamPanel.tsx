import { Team } from '@/types';
import { Trophy, Lock, AlertTriangle } from 'lucide-react';

interface TeamPanelProps {
  team: Team;
  currentRound: number;
  onUpdateName: (teamId: number, name: string) => void;
  onAdjustScore: (teamId: number, scoreChange: number) => void;
  onElimination: (teamId: number) => void;
}

export const TeamPanel = ({
  team,
  currentRound,
  onUpdateName,
  onAdjustScore,
  onElimination
}: TeamPanelProps) => {
  const isEliminated = team.eliminationRank !== undefined;
  const isWinner = team.eliminationRank === 1;
  const canEditName = currentRound < 2;

  return (
    <div className={`rounded-xl p-5 border-2 transition-all duration-300 shadow-lg hover:shadow-xl ${
      isWinner ? 'bg-gradient-to-r from-emerald-500 to-teal-600 border-emerald-400 text-white' :
      isEliminated ? 'bg-gradient-to-r from-red-500 to-red-600 border-red-400 text-white opacity-75' : 
      'bg-gradient-to-r from-slate-600 to-slate-700 border-slate-500 text-white'
    }`}>
      <div className="flex items-center gap-3 mb-4">
        <span className="font-black text-lg uppercase tracking-wider">#{team.id}</span>
        <input
          type="text"
          value={team.name}
          onChange={(e) => onUpdateName(team.id, e.target.value)}
          disabled={!canEditName}
          className={`flex-1 px-3 py-2 border-2 rounded-lg font-semibold text-slate-800 transition-all duration-200 ${
            canEditName 
              ? 'bg-white border-white/50 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20' 
              : 'bg-gray-200 border-gray-300 cursor-not-allowed opacity-60'
          }`}
        />
        {!canEditName && (
          <Lock size={18} className="text-white/70" />
        )}
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-center flex-1">
            <div className="text-2xl font-black mb-1">{team.killScore}</div>
            <div className="text-xs font-semibold opacity-80 uppercase tracking-wide">Kill Score</div>
          </div>
          <div className="text-center flex-1">
            <div className="text-2xl font-black mb-1">{team.currentRoundScore}</div>
            <div className="text-xs font-semibold opacity-80 uppercase tracking-wide">Team Score</div>
          </div>
        </div>

        {isWinner ? (
          <div className="text-center py-2 px-4 bg-yellow-400 text-yellow-900 font-black rounded-lg border-2 border-yellow-300 uppercase tracking-wide flex items-center justify-center gap-2">
            <Trophy size={18} /> LAST SURVIVOR
          </div>
        ) : isEliminated && (
          <div className="text-center py-2 px-4 bg-black/30 text-white font-bold rounded-lg border-2 border-white/20 uppercase tracking-wide">
            TERMINATED #{team.eliminationRank}
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-2 mb-4">
        <button
          onClick={() => onAdjustScore(team.id, 1)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-2 py-2 rounded-lg text-sm font-bold transition-all duration-200 border border-emerald-400 shadow-md hover:shadow-lg"
        >
          +1
        </button>
        <button
          onClick={() => onAdjustScore(team.id, 0.5)}
          className="bg-green-500 hover:bg-green-600 text-white px-2 py-2 rounded-lg text-sm font-bold transition-all duration-200 border border-green-400 shadow-md hover:shadow-lg"
        >
          +0.5
        </button>
        <button
          onClick={() => onAdjustScore(team.id, -0.5)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-2 py-2 rounded-lg text-sm font-bold transition-all duration-200 border border-orange-400 shadow-md hover:shadow-lg"
        >
          -0.5
        </button>
        <button
          onClick={() => onAdjustScore(team.id, -1)}
          className="bg-red-500 hover:bg-red-600 text-white px-2 py-2 rounded-lg text-sm font-bold transition-all duration-200 border border-red-400 shadow-md hover:shadow-lg"
        >
          -1
        </button>
      </div>

      <button
        onClick={() => onElimination(team.id)}
        disabled={isEliminated}
        className={`w-full px-4 py-3 rounded-xl font-black text-lg uppercase tracking-wide transition-all duration-300 border-2 shadow-lg hover:shadow-xl ${
          isWinner 
            ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 border-yellow-300 disabled:opacity-100' 
            : isEliminated
            ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-gray-300 border-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-red-500'
        }`}
      >
        {isWinner ? (
          <div className="flex items-center justify-center gap-2">
            <Trophy size={16} /> LAST SURVIVOR
          </div>
        ) : isEliminated ? (
          `TERMINATED #${team.eliminationRank}`
        ) : (
          <div className="flex items-center justify-center gap-2">
            <AlertTriangle size={16} /> TERMINATE
          </div>
        )}
      </button>
    </div>
  );
}; 