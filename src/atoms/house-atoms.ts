import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { HouseInt, IMyKeys } from '../types/houses';
import { MockHouses, MockMyKeys } from '../utils/constants';
import { isEnvBrowser } from '../utils/misc';
import fetchNui from '../utils/fetchNui';
import { ServerPromiseResp } from '../types/common';

export const houseStates = {
  houseItems: atom({
    key: 'houseItem',
    default: selector<HouseInt[]>({
      key: 'defaultHouseItems',
      get: async () => {
        try {
          const resp = await fetchNui<ServerPromiseResp<HouseInt[]>>(
            'npwd:qb-housing:getPlayerHouses',
          );
          if (!resp.data) {
            console.log('no response data');
            return [];
          }
          return resp.data;
        } catch (e) {
          if (isEnvBrowser()) {
            return MockHouses;
          }
          console.error(e);
          return [];
        }
      },
    }),
  }),
  myKeys: atom({
    key: 'myKeys',
    default: selector<IMyKeys[]>({
      key: 'defaultMyKeys',
      get: async () => {
        try {
          const resp = await fetchNui<ServerPromiseResp<IMyKeys[]>>(
            'npwd:qb-housing:getPlayerKeys',
          );
          if (!resp.data) {
            console.log('no response data');
            return [];
          }
          return resp.data;
        } catch (e) {
          if (isEnvBrowser()) {
            return MockMyKeys;
          }
          console.error(e);
          return [];
        }
      },
    }),
  }),
  selectedHouse: atom<HouseInt>({
    key: 'selectedHouse',
    default: null,
  }),
  houseListModal: atom({
    key: 'houseListModal',
    default: false,
  }),
  modalType: atom({
    key: 'modalType',
    default: '',
  }),
};

export const useHousesValue = () => useRecoilValue(houseStates.houseItems);
export const useSetHouses = () => useSetRecoilState(houseStates.houseItems);

export const useSetModalVisible = () => useSetRecoilState(houseStates.houseListModal);
export const useModalVisible = () => useRecoilState(houseStates.houseListModal);

export const useSelectedHousesValue = () => useRecoilValue(houseStates.selectedHouse);
export const useSetSelectedHouse = () => useSetRecoilState(houseStates.selectedHouse);

export const useSetModalType = () => useSetRecoilState(houseStates.modalType);
export const useModalType = () => useRecoilValue(houseStates.modalType);

export const useMyKeysValue = () => useRecoilValue(houseStates.myKeys);
export const useSetMyKeys = () => useSetRecoilState(houseStates.myKeys);
