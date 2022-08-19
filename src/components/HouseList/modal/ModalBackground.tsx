import React from 'react';
import { memo } from 'react';
import { useModalVisible } from '../../../atoms/house-atoms';
import Backdrop from '../../Backdrop';

const ModalBackground = () => {
 const [modalVisible, setModalVisible] = useModalVisible();

  return modalVisible && <Backdrop />;
};

export default memo(ModalBackground);