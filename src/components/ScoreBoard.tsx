import { Team } from '@/types';
import { Trophy } from 'lucide-react';

interface ScoreBoardProps {
  teams: Team[];
}

export const ScoreBoard = ({ teams }: ScoreBoardProps) => {
  const sortedTeams = [...teams].sort((a, b) => (b.totalScore + b.currentRoundScore) - (a.totalScore + a.currentRoundScore));

  const getRankStyle = (index: number) => {
    if (index === 0) return 'rank-1 text-white border-2';
    if (index === 1) return 'rank-2 text-white border-2';
    if (index === 2) return 'rank-3 text-white border-2';
    return 'rank-default text-white border-2';
  };

  return (
    <div className="w-1/2 esports-card rounded-xl shadow-2xl p-6 overflow-y-auto border border-white/30">
      <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-6 uppercase tracking-wide text-center flex items-center justify-center gap-3">
        <Trophy size={24} className="text-teal-400" /> LEADERBOARD
      </h2>
              <div className="space-y-3">
          {sortedTeams.map((team, index) => {
            const currentTeamTotal = team.totalScore + team.currentRoundScore;
            const prevTeamTotal = index > 0 ? sortedTeams[index - 1].totalScore + sortedTeams[index - 1].currentRoundScore : 0;
            const nextTeamTotal = index < sortedTeams.length - 1 ? sortedTeams[index + 1].totalScore + sortedTeams[index + 1].currentRoundScore : 0;
            const scoreDiffUp = index > 0 ? prevTeamTotal - currentTeamTotal : 0;
            const scoreDiffDown = index < sortedTeams.length - 1 ? currentTeamTotal - nextTeamTotal : 0;

            return (
              <div
                key={team.id}
                className={`p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${getRankStyle(index)}`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl font-black uppercase tracking-wider">
                      #{index + 1}
                    </div>
                    <div>
                      <div className="text-lg font-bold uppercase tracking-wide">
                        {team.name}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-black mb-1">{team.totalScore + team.currentRoundScore}</div>
                    <div className="text-sm font-medium opacity-80">PTS</div>
                    
                    {/* 고정 영역: 점수차이 표시 */}
                    <div className="h-8 flex flex-col justify-center text-xs font-semibold opacity-70 mt-2">
                      {index > 0 && scoreDiffUp > 0 && (
                        <div>↑ {scoreDiffUp}pt behind</div>
                      )}
                      {index < sortedTeams.length - 1 && scoreDiffDown > 0 && (
                        <div>↓ {scoreDiffDown}pt ahead</div>
                      )}
                      {/* 빈 영역이어도 고정 높이 유지 */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
    </div>
  );
}; 