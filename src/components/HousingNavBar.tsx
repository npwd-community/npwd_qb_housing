import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Key } from '@mui/icons-material/';

const HousingNavBar: React.FC = () => {
  const { pathname } = useLocation();
  const [page, setPage] = useState(pathname);

  return (
    <BottomNavigation
      value={page}
      onChange={(event, newValue) => {
        setPage(newValue);
      }}
      showLabels
      sx={{
        width: '100%',
      }}
    >
      <BottomNavigationAction
        label="Houses"
        value="/housing"
        component={NavLink}
        icon={<Home />}
        to="/housing"
      />
      <BottomNavigationAction
        label="Keys"
        value="/housing/keys"
        color="secondary"
        component={NavLink}
        icon={<Key />}
        to="/housing/keys"
      />
    </BottomNavigation>
  );
};

export default HousingNavBar;
