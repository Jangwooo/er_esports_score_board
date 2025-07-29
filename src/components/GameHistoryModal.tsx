import { GameHistory } from '@/types';
import { TrendingUp, X, Gamepad2, Trophy } from 'lucide-react';

interface GameHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedGames: GameHistory[];
  onDeleteGame: (gameId: string) => void;
}

export const GameHistoryModal = ({
  isOpen,
  onClose,
  savedGames,
  onDeleteGame
}: GameHistoryModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900 bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="esports-card rounded-2xl shadow-2xl border border-white/30 p-8 w-[95%] max-w-6xl max-h-[95%] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 uppercase tracking-wide flex items-center gap-3">
            <TrendingUp size={28} className="text-teal-400" /> MATCH HISTORY
          </h2>
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-wide transition-all duration-200 border border-red-500/30 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <X size={18} /> CLOSE
          </button>
        </div>

        {savedGames.length === 0 ? (
          <div className="text-center py-16">
            <div className="flex justify-center mb-6">
              <Gamepad2 size={96} className="text-slate-400" />
            </div>
            <p className="text-xl font-bold text-slate-600 uppercase tracking-wide">NO MATCHES RECORDED</p>
            <p className="text-sm text-slate-500 mt-2">Play some games to see match history!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {savedGames.map((game) => (
              <div key={game.gameId} className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{game.gameName}</h3>
                    <p className="text-sm text-gray-700">{game.date}</p>
                  </div>
                  <button
                    onClick={() => onDeleteGame(game.gameId)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs font-medium"
                  >
                    삭제
                  </button>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">최종 결과</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {game.finalResults.map((team, index) => (
                      <div
                        key={team.id}
                        className={`p-2 rounded text-sm border ${
                          index === 0 ? 'bg-yellow-100 border-yellow-400 font-bold' :
                          index === 1 ? 'bg-gray-100 border-gray-400' :
                          index === 2 ? 'bg-orange-100 border-orange-400' :
                          'bg-white border-gray-200'
                        }`}
                      >
                        <span className="font-semibold text-gray-800">
                          {index + 1}등: {team.name}
                        </span>
                        <br />
                        <span className="text-gray-700">{team.totalScore}점</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">라운드별 상세</h4>
                  <div className="space-y-3">
                    {game.rounds.map((round) => (
                      <div key={round.roundNumber} className="bg-white border border-gray-200 rounded p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-gray-800">
                            라운드 {round.roundNumber}
                          </span>
                          {round.winner && (
                            <span className="text-green-700 font-medium bg-green-100 px-2 py-1 rounded text-sm flex items-center gap-1">
                              <Trophy size={14} /> 우승: {round.winner.name}
                            </span>
                          )}
                        </div>
                        
                        {round.teamScores ? (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 text-xs">
                                                         {round.teamScores
                               .sort((a, b) => b.roundScore - a.roundScore)
                               .map((teamScore) => (
                                 <div key={teamScore.teamId} className="text-gray-700 p-1">
                                   {teamScore.teamName}: {teamScore.roundScore}점
                                 </div>
                               ))}
                          </div>
                        ) : (
                          <p className="text-gray-600 text-xs italic">
                            상세 점수 기록이 없습니다 (이전 버전 데이터)
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}; 