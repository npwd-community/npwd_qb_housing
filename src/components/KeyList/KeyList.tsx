import { List, ListItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { useMyKeysValue } from '../../atoms/house-atoms';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import KeyIcon from '@mui/icons-material/Key';
import { HouseCoordsInt } from '../../types/houses';
import { useHouseAPI } from '../../hooks/useHouseAPI';

const KeyList = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const keys = useMyKeysValue();
  const { setWaypoint } = useHouseAPI();

  const handleSetWaypoint = (coords: HouseCoordsInt) => {
    setWaypoint(coords);
  };

  return (
    <List disablePadding>
      {keys.map((key) => (
        <ListItem
          key={key.id}
          divider
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="waypoint"
              onClick={() => handleSetWaypoint(key.coords)}
            >
              <LocationOnIcon />
            </IconButton>
          }
        >
          <ListItemIcon sx={{minWidth: "0px", marginRight: "8px"}}>
            <KeyIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              color: isDarkMode ? '#fff' : '#000',
            }}
            primary={key.label}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default KeyList;
