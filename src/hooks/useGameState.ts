import { useState, useCallback } from 'react';
import { Team, RANK_SCORES } from '@/types';

export const useGameState = () => {
  const [teams, setTeams] = useState<Team[]>(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      name: `팀 ${i + 1}`,
      killScore: 0,
      currentRoundScore: 0,
      totalScore: 0,
    }))
  );
  
  const [currentRound, setCurrentRound] = useState(1);
  const [eliminationOrder, setEliminationOrder] = useState<number[]>([]);
  const [gameName, setGameName] = useState('이터널리턴 경기');

  const updateTeamName = useCallback((teamId: number, newName: string) => {
    setTeams(prev => prev.map(team => 
      team.id === teamId ? { ...team, name: newName } : team
    ));
  }, []);

  const adjustScore = useCallback((teamId: number, scoreChange: number) => {
    setTeams(prev => prev.map(team => {
      if (team.id === teamId) {
        const newKillScore = Math.max(0, Math.round((team.killScore + scoreChange) * 2) / 2);
        const rankScore = team.currentRoundScore - team.killScore; // 현재 순위 점수
        return { 
          ...team, 
          killScore: newKillScore,
          currentRoundScore: newKillScore + rankScore 
        };
      }
      return team;
    }));
  }, []);

  const handleElimination = useCallback((teamId: number) => {
    // 이미 사출된 팀인지 확인
    if (eliminationOrder.includes(teamId)) return;
    
    const newEliminationOrder = [...eliminationOrder, teamId];
    const eliminatedRank = 8 - eliminationOrder.length; // 8등부터 시작 (첫 사출 = 8등)
    
    // 사출 후 남은 팀 수
    const remainingTeams = 8 - newEliminationOrder.length;
    
    // 남은 팀들의 보장 순위 (남은 팀 수 = 보장 순위)
    const guaranteedRank = remainingTeams;
    const guaranteedScore = guaranteedRank > 0 ? RANK_SCORES[guaranteedRank - 1] || 0 : 0;
    
    // 이전 보장 순위 점수
    const prevGuaranteedRank = remainingTeams + 1;
    const prevGuaranteedScore = prevGuaranteedRank <= 8 ? RANK_SCORES[prevGuaranteedRank - 1] || 0 : 0;
    
    // 추가로 지급할 점수
    const additionalScore = Math.max(0, guaranteedScore - prevGuaranteedScore);
    
    setTeams(prev => prev.map(team => {
      if (team.id === teamId) {
        // 사출된 팀: 사출 순위만 기록, 점수는 변경하지 않음
        return {
          ...team,
          eliminationRank: eliminatedRank
        };
      } else if (!eliminationOrder.includes(team.id)) {
        // 아직 살아있는 팀들: 보장 순위 상승에 따른 추가 점수 지급
        return {
          ...team,
          currentRoundScore: team.killScore + (team.currentRoundScore - team.killScore) + additionalScore
        };
      }
      return team;
    }));
    
    setEliminationOrder(newEliminationOrder);
    
    // 마지막 1팀이 남았으면 1등 우승 처리
    if (remainingTeams === 1) {
      const winnerTeam = teams.find(team => 
        team.id !== teamId && !eliminationOrder.includes(team.id)
      );
      
      if (winnerTeam) {
        // 1등 우승팀에게 1등 점수 지급 (10점에서 이미 받은 점수 차감)
        const winnerScore = RANK_SCORES[0]; // 1등 = 10점
        const currentGuaranteedScore = guaranteedScore; // 현재 보장된 점수
        const finalAdditionalScore = winnerScore - currentGuaranteedScore;
        
        setTeams(prev => prev.map(team => 
          team.id === winnerTeam.id 
            ? { 
                ...team, 
                currentRoundScore: team.killScore + (team.currentRoundScore - team.killScore) + finalAdditionalScore,
                eliminationRank: 1 
              }
            : team
        ));
      }
    }
  }, [teams, eliminationOrder]);

  const nextRound = useCallback(() => {
    // 현재 라운드 총합 점수에 추가
    setTeams(prev => prev.map(team => ({
      ...team,
      totalScore: team.totalScore + team.currentRoundScore,
      killScore: 0,
      currentRoundScore: 0,
      eliminationRank: undefined
    })));
    
    setCurrentRound(prev => prev + 1);
    setEliminationOrder([]);
  }, []);

  const resetGame = useCallback(() => {
    setTeams(Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      name: `팀 ${i + 1}`,
      killScore: 0,
      currentRoundScore: 0,
      totalScore: 0,
    })));
    setCurrentRound(1);
    setEliminationOrder([]);
    setGameName('이터널리턴 경기');
  }, []);

  return {
    teams,
    setTeams,
    currentRound,
    eliminationOrder,
    gameName,
    setGameName,
    updateTeamName,
    adjustScore,
    handleElimination,
    nextRound,
    resetGame
  };
}; 