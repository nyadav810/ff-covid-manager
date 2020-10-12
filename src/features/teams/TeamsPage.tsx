import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { RootState } from 'app/rootReducer';
import { ROSTER } from 'app/routes';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import TeamList from './TeamList';

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

const TeamsPage: React.FC = () => {
  const classes = useStyles();

  const selectedUserId = useSelector(({ app }: RootState) => app.selectedUserId);

  if (selectedUserId !== '') {
    return (
      <Redirect to={ROSTER} />
    )
  }

  return (
    <div className={classes.root}>
      <Typography variant="h4">
        Select your team:
      </Typography>
      <TeamList />
    </div>
  );
};

export default TeamsPage;
