import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'app/rootReducer';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Roster from 'types/Roster';
import RosterListItem from './RosterListItem';
import { fetchAllPlayers } from 'features/players/playersSlice';

const rosterSelector = createSelector(
  ({ app, roster }: RootState) => ({ rosters: roster.rosters, userId: app.selectedUserId }),
  ({ rosters, userId })  => rosters.find(roster => roster.owner_id === userId) ?? {},
);

const RosterList: React.FC = () => {
  const dispatch = useDispatch();

  const roster: Roster = useSelector(rosterSelector);
  const rostersLoading: boolean = useSelector(({ roster }: RootState) => roster.loading);
  const {
    players,
    loading: playersLoading
  } = useSelector(({ players }: RootState) => players);

  useEffect(() => {
    if (roster?.players) {
      dispatch(fetchAllPlayers(roster.players));
    }
  }, [dispatch, roster]);

  if (rostersLoading || playersLoading || players.length === 0) {
    return <CircularProgress />;
  }

  const starterList = [];

  if (roster?.starters) {
    const startersList = roster.starters
    .filter(player => player)
    .map(player => (
      <div key={`roster-list-item-${player}`}>
        <RosterListItem
            playerId={player}
            isStarter={true}
          />
        <Divider variant="inset" component="li" />
      </div>
    ));

    starterList.push(...startersList);
  }

  const benchList = [];

  if (roster?.players) {
    const bench = roster.players
      .filter(player => !roster?.starters?.includes(player))
      .map(player => (
        <div key={`roster-list-item-${player}`}>
          <RosterListItem
            playerId={player}
            isStarter={false}
          />
          <Divider variant="inset" component="li" />
        </div>
      ));

    benchList.push(...bench);
  }

  return (
    <List component='nav'>
      <ListSubheader disableSticky>Starters</ListSubheader>
      {starterList}
      <ListSubheader disableSticky>Bench</ListSubheader>
      {benchList}
    </List>
  );
};

export default RosterList;
