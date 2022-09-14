export type IGame = {
  id: string;
  description: string;
  judge: string;
  game_date: Date;
  team_one_id: {
    id: string;
    country: string;
    coach: string;
    image: string;
  };
  team_two_id: {
    id: string;
    country: string;
    coach: string;
    image: string;
  };
  goals: [
    {
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
    },
  ];
  red_cards: [
    {
      at: number;
      player_id: {
        id: string;
        name: string;
        shirt: number;
        team_id: {
          country: string;
        };
      };
    },
  ];
  yellow_cards: [
    {
      at: number;
      player_id: {
        id: string;
        name: string;
        shirt: number;
        team_id: {
          country: string;
        };
      };
    },
  ];
};
