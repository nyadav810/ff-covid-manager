import User from 'types/User';

export const getTeamNameForUser = (user: User | undefined): string => {
  if (!user) return '';

  return user?.metadata?.team_name ?? `Team ${user?.display_name}`
};
