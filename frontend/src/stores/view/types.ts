export const TOGGLE_MENU_DRAWER = 'TOGGLE_MENU_DRAWER';
export const OPEN_MENU_DRAWER   = 'OPEN_MENU_DRAWER';

export interface ViewState {
  isMenuDrawerOpen: boolean
}

interface ToggleMenuDrawerAction {
  type: typeof TOGGLE_MENU_DRAWER
}

interface OpenMenuDrawerAction {
  type: typeof OPEN_MENU_DRAWER
}

export type ViewActionTypes = ToggleMenuDrawerAction | OpenMenuDrawerAction;