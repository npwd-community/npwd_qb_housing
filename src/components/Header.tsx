import React from 'react';
import { HOUSE_APP_PRIMARY_COLOR, HOUSE_APP_TEXT_COLOR } from '../app.theme';
import { Typography, Box } from '@mui/material';

const Header = () => {
  return (
    <Box
      px={2}
      pt={2}
      sx={{ width: '100%', textAlign: 'left', backgroundColor: HOUSE_APP_PRIMARY_COLOR }}
    >
      <Typography sx={{ color: HOUSE_APP_TEXT_COLOR }} paragraph variant={'h5'}>
        Properties
      </Typography>
    </Box>
  );
};

export default Header;
