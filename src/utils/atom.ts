import { atom } from "recoil";

export const darkmode = atom<boolean>({
  key: "darkModeState",
  default: false,
});
