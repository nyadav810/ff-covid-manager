import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { setSelectedUser } from 'app/appSlice';
import { RootState } from "app/rootReducer";
import { ROSTER, SIGN_UP } from 'app/routes';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import User from 'types/User';
import { loginUser } from './authSlice';
import { useStyles } from './styles';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  // State
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const users: User[] = useSelector(({ teams }: RootState) => teams.users);
  const cognitoUsername = useSelector(
    ({ auth }: RootState) => auth?.username,
  );

  if (cognitoUsername) {
    const authenticatedUser = users.find(user => user?.display_name?.toLowerCase() === cognitoUsername);

    if (authenticatedUser?.user_id) {
      dispatch(setSelectedUser({ selectedUserId: authenticatedUser.user_id }));

      return (
        <Redirect to={ROSTER} />
      );
    }
  }

  // Event Handlers

  const handleUsernameChange = ({ target: { value }}: React.ChangeEvent<HTMLInputElement>) => setUsername(value);

  const handlePasswordChange = ({ target: { value }}: React.ChangeEvent<HTMLInputElement>) => setPassword(value);

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (username && password) {
      const action = { username, password };

      dispatch(loginUser(action));
    }
  };

  // Sub-components

  const passwordInput = (
    <TextField
      fullWidth
      id="password"
      label="Password"
      margin="normal"
      name="password"
      onChange={handlePasswordChange}
      required
      type="password"
      value={password}
      variant="outlined"
    />
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            autoFocus
            fullWidth
            id="username"
            label="Username"
            margin="normal"
            name="username"
            onChange={handleUsernameChange}
            required
            value={username}
            variant="outlined"
          />
          {passwordInput}
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link to={FORGOT_PASSWORD}>
              Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link to={SIGN_UP}>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default LoginPage;
