import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { getTeamNameForUser } from 'utils/userUtil';
import RosterList from './RosterList';
import { selectedUserSelector } from 'selectors/selectedUser';

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
