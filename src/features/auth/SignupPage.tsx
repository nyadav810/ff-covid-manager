import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { RootState } from "app/rootReducer";
import { LOGIN, EMAIL_VERIFICATION } from 'app/routes';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { validEmail, validPassword } from 'utils/validationUtil';
import { signupUser } from './authSlice';
import { useStyles } from './styles';

const SignupPage: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  // State

  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const {
    username: cognitoUsername,
  } = useSelector(({ auth }: RootState) => auth);

  if (cognitoUsername) {
    return (
      <Redirect to={EMAIL_VERIFICATION} />
    );
  }

  // Event Handlers

  const handleEmailChange = ({ target: { value }}: React.ChangeEvent<HTMLInputElement>) => setEmail(value);

  const handleUsernameChange = ({ target: { value }}: React.ChangeEvent<HTMLInputElement>) => setUsername(value);

  const handlePasswordChange = ({ target: { value }}: React.ChangeEvent<HTMLInputElement>) => setPassword(value);

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (username && password && email && validEmail(email)) {
      const action = {
        username,
        password,
        email: email.toLowerCase(),
      };

      dispatch(signupUser(action));
    }

    return (
      <Redirect to={EMAIL_VERIFICATION} />
    );
  };

  // Sub-components

  const emailInputError = email !== '' && !validEmail(email);
  const emailInput = (
    <TextField
      autoFocus
      error={emailInputError}
      fullWidth
      helperText={emailInputError ? "Please enter a valid e-mail address (example@gmail.com)" : undefined}
      id="email"
      label="Email Address"
      margin="normal"
      name="email"
      onChange={handleEmailChange}
      required
      value={email}
      variant="outlined"
    />
  );

  const passwordInputError = password !== '' && !validPassword(password);
  const passwordInput = (
    <TextField
      error={passwordInputError}
      fullWidth
      helperText={passwordInputError ? "Password requirements: At least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number" : undefined}
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
          Sign Up
        </Typography>
        <form className={classes.form} noValidate>
          {emailInput}
          <TextField
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link to={LOGIN}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignupPage;
