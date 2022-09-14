type IGoal = {
  at: number;
  player_id: {
    id: string;
    name: string;
    shirt: number;
    team_id: {
      id: string;
      country: string;
    };
  };
};

export function CheckWichTeamScored(player_id: string, goals: any) {
  const player = goals.find((goal: IGoal) => player_id === goal.player_id.id);

  return player?.player_id.team_id.id;
}
