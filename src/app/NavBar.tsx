import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      'margin-bottom': '1.5rem',
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const NavBar: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Justice League | COVID Player Manager
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
