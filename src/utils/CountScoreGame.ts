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

export function CountScoreGame(goals: any, team_one: any, team_two: any) {
  const team_one_score = goals.filter(
    (goal: IGoal) => goal.player_id.team_id.id === team_one.id,
  );

  const team_two_score = goals.filter(
    (goal: IGoal) => goal.player_id.team_id.id === team_two.id,
  );

  return {
    game_score: {
      team_one: {
        country: team_one.country,
        goals: team_one_score.length,
      },
      team_two: {
        country: team_two.country,
        goals: team_two_score.length,
      },
    },
  };
}
