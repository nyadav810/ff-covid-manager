import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { SLEEPER_AVATAR_THUMBNAIL_URL } from '../../constants';
import { setSelectedUser } from 'app/appSlice';
import User from 'types/User';
import { getTeamNameForUser } from 'utils/userUtil';

interface Props {
  user: User;
}

const TeamListItem: React.FC<Props> = ({
  user,
}: Props) => {
  const dispatch = useDispatch();

  const handleListItemClick = () => {
    if (user?.user_id) {
      dispatch(setSelectedUser({ selectedUserId: user.user_id }))
    }
  };

  return (
    <ListItem
      button
      onClick={handleListItemClick}
    >
      <ListItemAvatar>
        <Avatar
          alt={user?.display_name}
          src={`${SLEEPER_AVATAR_THUMBNAIL_URL}${user?.avatar}`}
        />
      </ListItemAvatar>
      <ListItemText
        primary={user?.display_name}
        secondary={getTeamNameForUser(user)}
      />
    </ListItem>
  );
};

export default TeamListItem;
