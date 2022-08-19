export interface HouseCoordsInt {
  enter: {
    h: number;
    x: number;
    y: number;
    z: number;
  };
  cam: {
    h: number;
    yaw: number;
    x: number;
    y: number;
    z: number;
  };
}

export interface HouseGarageInt {
  h: number;
  x: number;
  y: number;
  z: number;
}

export interface KeyHolder {
  name: string;
  citizenid: string;
}

export interface HouseInt {
  tier: number;
  label: string;
  id: number;
  house: string;
  garage?: HouseGarageInt;
  coords: HouseCoordsInt;
  keyholders: KeyHolder[];
}

export interface IMyKeys {
  coords: HouseCoordsInt;
  id: number;
  label: string;
}
