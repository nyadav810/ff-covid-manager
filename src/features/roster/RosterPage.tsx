import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'app/rootReducer';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { getTeamNameForUser } from 'utils/userUtil';
import RosterList from './RosterList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '0 auto',
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

const selectedUserSelector = createSelector(
  ({ app, teams }: RootState) => ({ users: teams.users, userId: app.selectedUserId }),
  ({ users, userId })  => users.find(user => user?.user_id === userId),
);

const RosterPage: React.FC = () => {
  const classes = useStyles();

  const user = useSelector(selectedUserSelector);

  return (
    <div className={classes.root}>
      <Typography variant="h4">
        {getTeamNameForUser(user)}
      </Typography>
      <RosterList />
    </div>
  );
};

export default RosterPage;
