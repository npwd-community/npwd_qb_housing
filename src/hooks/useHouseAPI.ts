import { useCallback } from 'react';
import { useSnackbar } from '../snackbar/useSnackbar';
import { ServerPromiseResp } from '../types/common';
import fetchNui from '../utils/fetchNui';
import { useHouseActions } from './useHouseActions';
import { KeyHolder } from '../types/houses';
import { HouseCoordsInt } from '../types/houses';

interface HouseAPIValue {
  transferHouse: (house: string, citizenid: string) => Promise<void>;
  removeKey: (house: string, keyholder: KeyHolder) => Promise<void>;
  setWaypoint: (coords: HouseCoordsInt) => Promise<void>;
}

export const useHouseAPI = (): HouseAPIValue => {
  const { addAlert } = useSnackbar();
  const { deleteLocalHouse, deleteKeyHolder } = useHouseActions();

  const setWaypoint = useCallback(
    async (coords: HouseCoordsInt) => {

      const resp = await fetchNui<ServerPromiseResp>('npwd:qb-housing:setWaypoint', {
        coords: coords.enter
      });

      if (resp.status !== 'ok') {
        return addAlert({
          message: 'Failed to set waypoint',
          type: 'error',
        });
      }

      addAlert({
        message: 'Successfully marked house',
        type: 'success',
      });
    },
    [addAlert],
  );


  const removeKey = useCallback(
    async (house: string, keyholder: KeyHolder) => {
      const splitName = keyholder.name.split(' ');
      const firstName = splitName[0];
      const lastName = splitName[1];

      const resp = await fetchNui<ServerPromiseResp>('npwd:qb-housing:removeKeyHolder', {
        house: house,
        HolderData: {
          citizenid: keyholder.citizenid,
          firstName: firstName,
          lastName: lastName,
        },
      });

      if (resp.status !== 'ok') {
        return addAlert({
          message: 'Failed to remove key',
          type: 'error',
        });
      } else {
        deleteKeyHolder(house, keyholder.citizenid); 
      }

      addAlert({
        message: 'Successfully removed key',
        type: 'success',
      });
    },
    [addAlert, deleteKeyHolder],
  );

  const transferHouse = useCallback(
    async (house: string, citizenid: string) => {
      const resp = await fetchNui<ServerPromiseResp>('npwd:qb-housing:transferHouse', {
        house,
        citizenid,
      });

      if (resp.status !== 'ok') {
        return addAlert({
          message: 'Failed to transfer house',
          type: 'error',
        });
      }

      deleteLocalHouse(house);

      addAlert({
        message: 'Successfully transfered house',
        type: 'success',
      });
    },
    [addAlert, deleteLocalHouse],
  );

  return { transferHouse, removeKey, setWaypoint };
};
