import { atom } from 'recoil';

export const currentTrackIdStateAtom = atom({
  key: 'currentTrackIdState',
  default: null,
});

export const isPlayingStateAtom = atom({
  key: 'isPlayingState',
  default: false,
});