import { detailType, etfType } from "./type.d";
import { atom } from "recoil";
import { v1 } from "uuid";

export const darkmode = atom<boolean>({
  key: `state ${v1()}`,
  default: false,
});

export const etfList = atom<etfType[] | undefined>({
  key: `state ${v1()}`,
  default: undefined,
});

export const toggle = atom<boolean>({
  key: `state ${v1()}`,
  default: false,
});
