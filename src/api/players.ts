import { API } from "aws-amplify";
import Player from "types/Player";

const apiName = "playerApi";

export async function fetchPlayer(playerId: string): Promise<Player> {
  const response = await API.get(apiName, `/players/${playerId}`, {})
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.response);
    });

  return response;
}

export async function fetchPlayers(playerIds: string[]): Promise<Player[]> {
  return Promise.allSettled(
    playerIds.map((playerId) => fetchPlayer(playerId))
  ).then((results: PromiseSettledResult<Player>[]) => {
    const allPlayers: Player[] = [];

    results.forEach((result) => {
      if (result?.status === "fulfilled") {
        allPlayers.push((result as PromiseFulfilledResult<Player>).value);
      }
    });

    return allPlayers;
  });
}
