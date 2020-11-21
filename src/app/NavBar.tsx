import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { selectedUserSelector } from 'selectors/selectedUser';
import { SLEEPER_AVATAR_THUMBNAIL_URL } from '../constants';

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

  const user = useSelector(selectedUserSelector);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Justice League | COVID Player Manager
          </Typography>
          {
            user &&
            <div>
              <Avatar
                alt={user?.display_name}
                src={`${SLEEPER_AVATAR_THUMBNAIL_URL}${user?.avatar}`}
              />
            </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
