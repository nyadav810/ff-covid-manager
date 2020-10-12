import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import PersonIcon from '@material-ui/icons/Person';
import SwapHorizontalCircleIcon from '@material-ui/icons/SwapHorizontalCircle';
import { RootState } from 'app/rootReducer';
import * as React from 'react';
import { useSelector } from 'react-redux';

interface Props {
  playerId: string;
  isStarter: boolean;
}

const RosterListItem: React.FC<Props> = ({
  playerId,
  isStarter,
}: Props) => {
  const player = useSelector(({ players }: RootState) => players.players.find(({ player_id }) => player_id === playerId));

  const secondaryAction = (
    <ListItemSecondaryAction>
      <Tooltip title='Select Replacement Player'>
        <IconButton edge="end" aria-label="Select Replacement Player">
          <SwapHorizontalCircleIcon />
        </IconButton>
      </Tooltip>
    </ListItemSecondaryAction>
  );

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <PersonIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={player?.full_name}
        secondary={`${player?.position} - ${player?.team}`}
      />
      {isStarter && secondaryAction}
    </ListItem>
  );
};

export default RosterListItem;
