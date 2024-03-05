import { createContext } from 'react';

import type { Settings } from 'src/types/settings';

export const defaultSettings: Settings = {
  colorPreset: 'indigo',
  contrast: 'normal',
  direction: 'ltr',
  layout: 'vertical',
  navColor: 'evident',
  paletteMode: 'light',
  responsiveFontSizes: true,
  stretch: false,
};

export interface State extends Settings {
  openDrawer: boolean;
  isInitialized: boolean;
}

export const initialState: State = {
  ...defaultSettings,
  isInitialized: false,
  openDrawer: false,
};

export interface SettingsContextType extends State {
  handleDrawerClose: () => void;
  handleDrawerOpen: () => void;
  handleReset: () => void;
  handleUpdate: (settings: Settings) => void;
  isCustom: boolean;
}

export const SettingsContext = createContext<SettingsContextType>({
  ...initialState,
  handleDrawerClose: () => {},
  handleDrawerOpen: () => {},
  handleReset: () => {},
  handleUpdate: () => {},
  isCustom: false,
});

// src/
//  --pages /
//    --projects /
//      --index.tsx;
//      components / // ! like search bar , table list and more...
//      services / // ! here whene we can add our own services like total projects or if we have other calculations
//      --get-all-projects.tsx;
//      --get-single-project.tsx;
//  --api /
//    --projects /
//      --index.tsx; // ! here when we will fetch all the projects apis
