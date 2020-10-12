import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import TeamsPage from 'features/teams/TeamsPage';
import { fetchAllUsers } from 'features/teams/teamsSlice';
import { fetchAllRosters } from 'features/roster/rosterSlice';
import RosterPage from 'features/roster/RosterPage';
import {
  BASE,
  ROSTER,
  TEAMS,
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
        <Route exact path={TEAMS} component={TeamsPage} />
        <Route exact path={ROSTER} component={RosterPage} />
        <Route path={BASE} component={TeamsPage} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
