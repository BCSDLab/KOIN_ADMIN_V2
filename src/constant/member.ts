export const TRACK_LIST = ['FrontEnd', 'BackEnd', 'Android', 'Game', 'UI/UX'] as const;
export const TRACK_MAPPER = {
  FrontEnd: 'FRONTEND',
  BackEnd: 'BACKEND',
  Android: 'ANDROID',
  Game: 'GAME',
  'UI/UX': 'UI_UX',
} as const;

export const SELECT_OPTIONS = {
  track: {
    Android: 'Android', BackEnd: 'BackEnd', FrontEnd: 'FrontEnd', Game: 'Game', 'UI/UX': 'UI/UX',
  },
  position: { Mentor: 'Mentor', Regular: 'Regular' },
};
