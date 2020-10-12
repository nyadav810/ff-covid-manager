import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'app/rootReducer';
import User from 'types/User';
import TeamListItem from './TeamListItem';

const TeamList: React.FC = () => {
  const users: User[] = useSelector(({ teams }: RootState) => teams.users);
  const usersLoading: boolean = useSelector(({ teams }: RootState) => teams.loading);

  if (usersLoading) {
    return <CircularProgress />;
  }

  const userList = users.map(user => (
    <div key={`teams-list-item-${user?.user_id}`}>
      <TeamListItem user={user} />
      <Divider variant="inset" component="li" />
    </div>
  ));

  return (
    <List component='nav'>
      {userList}
    </List>
  );
};

export default TeamList;
