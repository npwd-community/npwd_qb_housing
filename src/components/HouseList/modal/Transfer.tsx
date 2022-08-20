import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useHouseAPI } from '../../../hooks/useHouseAPI';
import { useSelectedHousesValue, useSetModalVisible } from '../../../atoms/house-atoms';

const Transfer = () => {
  const [transferId, setTransferId] = useState('');
  const { transferHouse } = useHouseAPI();
  const selectedHouse = useSelectedHousesValue();
  const setModalVisible = useSetModalVisible();

  const handleHouseTransfer = () => {
    transferHouse(selectedHouse.house, transferId).then(() => {
      setModalVisible(false);
    });
  };

  return (
    <>
      <Box
        sx={{
          marginTop: '25px',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <TextField label="CSN" variant="outlined" onChange={(e) => setTransferId(e.target.value)} />

        <Button
          variant="outlined"
          color="success"
          size="large"
          sx={{ width: '150px', height: '45px', marginTop: '12px' }}
          disabled={transferId.length !== 8} //check if 3 letters followed by 5 numbers
          onClick={() => handleHouseTransfer()}
        >
          Confirm
        </Button>
      </Box>
    </>
  );
};

export default Transfer;
