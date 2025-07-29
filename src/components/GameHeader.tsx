import { Gamepad2, BarChart3, SkipForward, Flag, RotateCcw, Trophy } from 'lucide-react';

interface GameHeaderProps {
  currentRound: number;
  gameName: string;
  setGameName: (name: string) => void;
  onShowHistory: () => void;
  onNextRound: () => void;
  onEndGame: () => void;
  onReset: () => void;
}

export const GameHeader = ({
  currentRound,
  gameName,
  setGameName,
  onShowHistory,
  onNextRound,
  onEndGame,
  onReset
}: GameHeaderProps) => {
  return (
    <div className="esports-card rounded-xl shadow-2xl p-6 mb-6 border border-white/30">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 uppercase tracking-wide">
            ETERNAL RETURN SCOREBOARD
          </h1>
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow-md">
            <span className="text-lg font-bold flex items-center gap-2">
              <Gamepad2 size={20} /> 라운드 {currentRound}
            </span>
          </div>
        </div>
        <div className="flex justify-center gap-3">
          <button 
            onClick={onShowHistory}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 border border-purple-500/30 text-sm flex items-center gap-2"
          >
            <BarChart3 size={16} /> 게임 기록
          </button>
          <button 
            onClick={onNextRound}
            className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 border border-blue-500/30 text-sm flex items-center gap-2"
          >
            <SkipForward size={16} /> 다음 라운드
          </button>
          <button 
            onClick={onEndGame}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 border border-green-500/30 text-sm flex items-center gap-2"
          >
            <Flag size={16} /> 경기 종료
          </button>
          <button 
            onClick={onReset}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 border border-red-500/30 text-sm flex items-center gap-2"
          >
            <RotateCcw size={16} /> 초기화
          </button>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <label className="text-sm font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2">
          <Trophy size={16} /> Tournament:
        </label>
        <input
          type="text"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          className="flex-1 max-w-lg px-4 py-2 border-2 border-teal-200 rounded-lg text-slate-800 bg-white/90 focus:border-teal-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition-all duration-200 font-medium"
          placeholder="Enter tournament name..."
        />
      </div>
    </div>
  );
}; 