import React from 'react';
import { Paper } from '@mui/material';
import { useModalVisible, useSelectedHousesValue, useModalType } from '../../../atoms/house-atoms';
import { Box, Button, Divider } from '@mui/material';
import Transfer from './Transfer';
import Keys from './Keys';

const Modal = () => {
  const [modalVisible, setModalVisible] = useModalVisible();
  const selectedHouse = useSelectedHousesValue();
  const modalType = useModalType();

  if (!modalVisible || !selectedHouse || !modalType) {
    return null;
  }

  const handleClose = () => {
    setModalVisible(false);
  };

  return (
    <Paper
      sx={{
        zIndex: 10,
        position: 'absolute',
        left: '0',
        right: '0',
        marginLeft: 'auto',
        marginRight: 'auto',
        top: '25%',
        width: '75%',
        minHeight: '250px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '10px',
          color: '#dedede',
          textTransform: 'capitalize',
        }}
      >
        {modalType}
      </Box>
      <Divider sx={{ padding: '8px' }} />
      {modalType === 'transfer' && <Transfer />}
      {modalType === 'keys' && <Keys />}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'flex-end',
          pb: '10px',
        }}
      >
        <Button
          variant="outlined"
          onClick={handleClose}
          color="error"
          size="small"
          sx={{ width: '150px', height: '45px', marginTop: '25px' }}
        >
          Close
        </Button>
      </Box>
    </Paper>
  );
};

export default Modal;
