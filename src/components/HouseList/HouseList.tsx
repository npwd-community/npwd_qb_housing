import React from 'react';
import { useHousesValue, useSetModalType, useSetModalVisible, useSetSelectedHouse } from '../../atoms/house-atoms';
import { Box, List, ListItem, ListItemText, IconButton, Tooltip } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import KeyIcon from '@mui/icons-material/Key';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import { HouseInt } from '../../types/houses';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

const HouseList = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const houses = useHousesValue();
  const setModalVisible = useSetModalVisible();
  const setModalType = useSetModalType();
  const setHouse = useSetSelectedHouse();

  const handleClick = (house: HouseInt, type: string) => {
    setModalVisible(true);
    setHouse(house);
    setModalType(type);
  };

  return (
    <List disablePadding sx={{overflow: 'auto'}}>
      {houses.map((house) => (
        <ListItem key={house.id} divider>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Box
              sx={{
                borderRadius: '5px',
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                gap: '20px',
                alignItems: 'center',
                paddingY: '2px',
              }}
            >
              <HomeIcon sx={{ fontSize: 32, color: isDarkMode ? '#fff' : '#000' }} />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '2px',
                  gap: '4px',
                }}
              >
                <ListItemText
                  primaryTypographyProps={{
                    color: isDarkMode ? '#fff' : '#000',
                    fontSize: '17px',
                  }}
                >
                  {house.label}
                </ListItemText>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center' }}
                  >
                    <KeyIcon sx={{ fontSize: 20, color: isDarkMode ? '#fff' : '#000' }} />
                    <ListItemText
                      primaryTypographyProps={{
                        color: isDarkMode ? '#fff' : '#000',
                        fontSize: '15px',
                      }}
                    >
                      {house.keyholders.length}
                    </ListItemText>
                  </Box>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center' }}
                  >
                    <HouseSidingIcon sx={{ fontSize: 20, color: isDarkMode ? '#fff' : '#000' }} />
                    {(house.garage && house.garage.x === 0 && house.garage.z === 0) || !house.garage ? (
                      <CloseIcon
                        sx={{ fontSize: 16, strokeWidth: 2, color: isDarkMode ? '#fff' : '#000' }}
                      />
                    ) : (
                      <DoneIcon
                        sx={{ fontSize: 16, strokeWidth: 2, color: isDarkMode ? '#fff' : '#000' }}
                      />
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
            <Tooltip arrow title="Key List">
              <IconButton onClick={() => {handleClick(house, "keys")}}>
                <KeyIcon />
              </IconButton>
            </Tooltip>
            <Tooltip arrow title="Transfer">
              <IconButton onClick={() => {handleClick(house, "transfer")}}>
                <SwapHorizIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default HouseList;
