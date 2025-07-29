import { useState, useEffect, useCallback } from 'react';
import { GameHistory, RoundHistory, Team } from '@/types';

export const useGameHistory = () => {
  const [savedGames, setSavedGames] = useState<GameHistory[]>([]);
  const [roundHistory, setRoundHistory] = useState<RoundHistory[]>([]);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  // 저장된 게임들 불러오기
  useEffect(() => {
    try {
      const saved = localStorage.getItem('eternalReturn_games');
      if (saved) {
        setSavedGames(JSON.parse(saved));
      }
    } catch (error) {
      console.error('게임 데이터 로드 실패:', error);
    }
  }, []);

  const saveRound = useCallback((
    teams: Team[],
    currentRound: number
  ) => {
    // 우승팀 찾기 (eliminationRank가 1인 팀)
    const winner = teams.find(team => team.eliminationRank === 1);
    
    // 각 팀의 라운드 점수 기록
    const teamScores = teams.map(team => ({
      teamId: team.id,
      teamName: team.name,
      roundScore: team.currentRoundScore
    }));

    const roundData: RoundHistory = {
      roundNumber: currentRound,
      teams: [...teams],
      winner: winner ? { ...winner } : undefined,
      teamScores
    };

    setRoundHistory(prev => [...prev, roundData]);
  }, []);

  const endGame = useCallback((
    teams: Team[],
    gameName: string
  ) => {
    const gameData: GameHistory = {
      gameId: Date.now().toString(),
      gameName,
      date: new Date().toLocaleString('ko-KR'),
      rounds: roundHistory,
      finalResults: [...teams].sort((a, b) => b.totalScore - a.totalScore)
    };

    const newSavedGames = [...savedGames, gameData];
    setSavedGames(newSavedGames);
    
    try {
      localStorage.setItem('eternalReturn_games', JSON.stringify(newSavedGames));
    } catch (error) {
      console.error('게임 저장 실패:', error);
    }

    // 라운드 기록 초기화
    setRoundHistory([]);
  }, [savedGames, roundHistory]);

  const deleteGame = useCallback((gameId: string) => {
    const filteredGames = savedGames.filter(game => game.gameId !== gameId);
    setSavedGames(filteredGames);
    
    try {
      localStorage.setItem('eternalReturn_games', JSON.stringify(filteredGames));
    } catch (error) {
      console.error('게임 삭제 실패:', error);
    }
  }, [savedGames]);

  return {
    savedGames,
    roundHistory,
    isHistoryModalOpen,
    setIsHistoryModalOpen,
    saveRound,
    endGame,
    deleteGame
  };
}; 