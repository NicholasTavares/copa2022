export type ITeam = {
  id: string;
  country: string;
  coach: string;
  image: string;
  score: number;
  wins: number;
  draws: number;
  losses: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  players: [
    {
      id: string;
      name: string;
      shirt: number;
      created_at: Date;
      updated_at: Date;
      deleted_at: Date;
    },
  ];
  group_id: {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
  };
  games_as_team_one: [
    {
      id: string;
      description: string;
      judge: string;
      game_date: string;
      created_at: Date;
      updated_at: Date;
      deleted_at: Date;
    },
  ];
  games_as_team_two: [
    {
      id: string;
      description: string;
      judge: string;
      game_date: string;
      created_at: Date;
      updated_at: Date;
      deleted_at: Date;
    },
  ];
};
