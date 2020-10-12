import { SLEEPER_LEAGUE_ID } from '../constants';
import User from 'types/User';

const SLEEPER_API_ENDPOINT = 'https://api.sleeper.app/v1';

export async function fetchUsersByLeague(): Promise<User[]> {
  const response = await fetch(`${SLEEPER_API_ENDPOINT}/league/${SLEEPER_LEAGUE_ID}/users`)
    .then(response => response.json());

  return response;
}

export async function fetchRostersByLeague() {
  const response = await fetch(`${SLEEPER_API_ENDPOINT}/league/${SLEEPER_LEAGUE_ID}/rosters`)
    .then(response => response.json());

  return response;
};