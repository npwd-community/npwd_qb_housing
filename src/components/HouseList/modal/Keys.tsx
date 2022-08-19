import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import { useHouseAPI } from '../../../hooks/useHouseAPI';
import { useSelectedHousesValue } from '../../../atoms/house-atoms';
import { KeyHolder } from '../../../types/houses'

const Keys = () => {
  const { removeKey } = useHouseAPI();
  const selectedHouse = useSelectedHousesValue();

  const handleRemoveKey = (citizen: KeyHolder) => {
    removeKey(selectedHouse.house, citizen)
  };

  return (
    <>
      <List
        sx={{
          maxHeight: '150px',
          overflow: 'auto',
        }}
        disablePadding
      >
        {selectedHouse.keyholders.map((citizen) => (
          <ListItem divider key={citizen.citizenid}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              {citizen.name.length > 25 ? (
                <Typography>{citizen.name.slice(0, 25) + '...'}</Typography>
              ) : (
                <Typography>{citizen.name}</Typography>
              )}
              <IconButton sx={{ margin: '0px', padding: '0px' }}>
                <DeleteIcon onClick={() => handleRemoveKey(citizen)} />
                
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Keys;
