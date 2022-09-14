/* eslint-disable prettier/prettier */
export function CheckIncrementeOrDecrementScore(
  team_scored_id: string,
  team_one_id: string,
  team_two_id: string,
  score_team_one: number,
  points_team_one: number,
  wins_team_one: number,
  draws_team_one: number,
  losses_team_one: number,
  score_team_two: number,
  points_team_two: number,
  wins_team_two: number,
  draws_team_two: number,
  losses_team_two: number,
) {

  if(team_scored_id === team_one_id) {
    // if team one is winning now and the game was tied
    //  now                                        past
    if ((score_team_one > score_team_two) && ((score_team_one - 1) - score_team_two === 0)) {
      return {
        team_one: {
          team_one_id: team_one_id,
          score: points_team_one + 2,
          wins: wins_team_one + 1,
          draws: draws_team_one - 1,
          losses: losses_team_one,
        },
        team_two: {
          team_two_id: team_two_id,
          score: points_team_two -1,
          wins: wins_team_two,
          draws: draws_team_two -1,
          losses: losses_team_two + 1,
        }
      };
    }

    // if team one was losing and now the game is tied
    //  now                                       past
    if ((score_team_one === score_team_two) && ((score_team_one - 1) - score_team_two !== 0)) {
      return {
        team_one: {
          team_one_id: team_one_id,
          score: points_team_one + 1,
          wins: wins_team_one,
          draws: draws_team_one + 1,
          losses: losses_team_one - 1,
        },
        team_two: {
          team_two_id: team_two_id,
          score: points_team_two - 2,
          wins: wins_team_two - 1,
          draws: draws_team_two + 1,
          losses: losses_team_two,
        }
      }
    }
  }

  if (team_scored_id === team_two_id) {
    // if team two is winning now and the game was tied
    //  now                                        past
    if ((score_team_two > score_team_one) && (score_team_one - (score_team_two - 1) === 0)) {
      return {
        team_two: {
          team_two_id: team_two_id,
          score: points_team_two + 2,
          wins: wins_team_two + 1,
          draws: draws_team_two - 1,
          losses: losses_team_two,
        },
        team_one: {
          team_one_id: team_one_id,
          score: points_team_one -1,
          wins: wins_team_one,
          draws: draws_team_one -1,
          losses: losses_team_one + 1,
        }
      };
    }

    // if team two was losing and now the game is tied
    //  now                                     past
    if ((score_team_two === score_team_one) && (score_team_one - (score_team_two - 1) !== 0)) {
      return {
        team_two: {
          team_two_id: team_two_id,
          score: points_team_two + 1,
          wins: wins_team_two,
          draws: draws_team_two + 1,
          losses: losses_team_two - 1,
        },
        team_one: {
          team_one_id: team_one_id,
          score: points_team_one - 2,
          wins: wins_team_one - 1,
          draws: draws_team_one + 1,
          losses: losses_team_one,
        }
      }
    }
  }

  return false;
  
}
