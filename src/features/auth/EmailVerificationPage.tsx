import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { setSelectedUser } from 'app/appSlice';
import { RootState } from 'app/rootReducer';
import { ROSTER } from 'app/routes';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import User from 'types/User';
import { verifyEmailForUser } from './authSlice';
import { useStyles } from './styles';

const EmailVerificationPage: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  // State
  const [verificationCode, setVerificationCode] = useState<string>('');

  const users: User[] = useSelector(({ teams }: RootState) => teams.users);
  const {
    username: cognitoUsername,
    verificationResponse,
  } = useSelector(({ auth }: RootState) => auth);

  if (verificationResponse && cognitoUsername) {
    const authenticatedUser = users.find(user => user?.display_name?.toLowerCase() === cognitoUsername);
  
    if (authenticatedUser?.user_id) {
      dispatch(setSelectedUser({ selectedUserId: authenticatedUser.user_id }));

      return (
        <Redirect to={ROSTER} />
      );
    }
  }

  const handleVerificationCodeChange = ({ target: { value }}: React.ChangeEvent<HTMLInputElement>) => setVerificationCode(value);

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (verificationCode && cognitoUsername) {
      dispatch(verifyEmailForUser({
        username: cognitoUsername,
        code: verificationCode,
      }));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Verify your email address
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            autoFocus
            fullWidth
            id="verification"
            label="Verification Code"
            margin="normal"
            name="verification"
            onChange={handleVerificationCodeChange}
            required
            value={verificationCode}
            variant="outlined"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Verify
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default EmailVerificationPage;
