import Player from "types/Player";

const PLAYERS_API_ENDPOINT = "http://localhost:3000";

export async function fetchPlayer(playerId: string): Promise<Player> {
  const response = await fetch(
    `${PLAYERS_API_ENDPOINT}/${playerId}`
  ).then((response) => response.json());

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
