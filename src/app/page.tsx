"use client";

import { useGameState } from '@/hooks/useGameState';
import { Swords } from 'lucide-react';
import { useGameHistory } from '@/hooks/useGameHistory';
import { GameHeader } from '@/components/GameHeader';
import { TeamPanel } from '@/components/TeamPanel';
import { EliminationStatus } from '@/components/EliminationStatus';
import { ScoreBoard } from '@/components/ScoreBoard';
import { GameHistoryModal } from '@/components/GameHistoryModal';

export default function Home() {
  const {
    teams,
    currentRound,
    eliminationOrder,
    gameName,
    setGameName,
    updateTeamName,
    adjustScore,
    handleElimination,
    nextRound,
    resetGame
  } = useGameState();

  const {
    savedGames,
    isHistoryModalOpen,
    setIsHistoryModalOpen,
    saveRound,
    endGame,
    deleteGame
  } = useGameHistory();

  const handleNextRound = () => {
    // 라운드 데이터 저장
    saveRound(teams, currentRound);
    // 다음 라운드로 진행
    nextRound();
  };

  const handleEndGame = () => {
    // 현재 라운드 저장
    saveRound(teams, currentRound);
    // 게임 종료 및 저장
    endGame(teams, gameName);
    // 게임 초기화
    resetGame();
  };

  return (
    <div className="min-h-screen p-4">
      <GameHeader
        currentRound={currentRound}
        gameName={gameName}
        setGameName={setGameName}
        onShowHistory={() => setIsHistoryModalOpen(true)}
        onNextRound={handleNextRound}
        onEndGame={handleEndGame}
        onReset={resetGame}
      />

      <div className="flex gap-4 h-[calc(100vh-120px)]">
        {/* 왼쪽: 팀 관리 패널 */}
        <div className="w-1/2 esports-card rounded-xl shadow-2xl p-6 overflow-y-auto border border-white/30">
          <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-6 uppercase tracking-wide text-center flex items-center justify-center gap-3">
            <Swords size={24} className="text-teal-400" /> TEAM MANAGEMENT
          </h2>
          
          <EliminationStatus eliminationOrder={eliminationOrder} />
          
          <div className="space-y-3">
            {teams.map((team) => (
              <TeamPanel
                key={team.id}
                team={team}
                currentRound={currentRound}
                onUpdateName={updateTeamName}
                onAdjustScore={adjustScore}
                onElimination={handleElimination}
              />
            ))}
          </div>
        </div>

        {/* 오른쪽: 순위표 */}
        <ScoreBoard teams={teams} />
      </div>

      {/* 게임 기록 모달 */}
      <GameHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        savedGames={savedGames}
        onDeleteGame={deleteGame}
      />
    </div>
  );
}
