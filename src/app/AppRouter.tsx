import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import EmailVerificationPage from 'features/auth/EmailVerificationPage';
import LoginPage from 'features/auth/LoginPage';
import SignupPage from 'features/auth/SignupPage';
import { fetchAllRosters } from 'features/roster/rosterSlice';
import { fetchAllUsers } from 'features/teams/teamsSlice';
import RosterPage from 'features/roster/RosterPage';
import {
  BASE,
  EMAIL_VERIFICATION,
  LOGIN,
  ROSTER,
  SIGN_UP,
} from './routes';

const AppRouter: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchAllRosters());
  }, []);
  
  return (
    <Router>
      <Switch>
        <Route path={ROSTER} component={RosterPage} />
        <Route path={LOGIN} component={LoginPage} />
        <Route path={SIGN_UP} component={SignupPage} />
        <Route path={EMAIL_VERIFICATION} component={EmailVerificationPage} />
        <Route path={BASE} component={LoginPage} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
