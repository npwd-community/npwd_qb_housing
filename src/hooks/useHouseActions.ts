import { useSetHouses, useSetSelectedHouse } from '../atoms/house-atoms';
import { useCallback } from 'react';

interface UseHouseActionsValue {
  deleteLocalHouse: (houseId: string) => void;
  deleteKeyHolder: (houseId: string, citizenid: string) => void;
}

export const useHouseActions = (): UseHouseActionsValue => {
  const setHouses = useSetHouses();
  const setSelectedHouse = useSetSelectedHouse();

  const deleteLocalHouse = useCallback((houseId: string) => {
    setHouses((curHouse) => [...curHouse].filter((house) => house.house !== houseId));
  }, []);

  const deleteKeyHolder = useCallback((houseId: string, citizenId: string) => {
    setHouses((curHouse) =>
      curHouse.map((house) => {
        if (house.house === houseId) {
          return {
            ...house,
            keyholders: house.keyholders.filter((keyHolder) => keyHolder.citizenid !== citizenId),
          };
        }
        return house;
      }),
    );

    setSelectedHouse((curHouse) => {
      if (curHouse.house === houseId) {
        return {
          ...curHouse,
          keyholders: curHouse.keyholders.filter((keyHolder) => keyHolder.citizenid !== citizenId),
        };
      }
      return curHouse;
    });
  }, []);

  return { deleteLocalHouse, deleteKeyHolder };
};
