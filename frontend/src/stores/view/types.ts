export const TOGGLE_LEFT_DRAWER = 'TOGGLE_LEFT_DRAWER';

export interface ViewState {
  openLeftDrawer: boolean
}

interface ToggleLeftDrawerAction {
  type: typeof TOGGLE_LEFT_DRAWER
}

export type ViewActionTypes = ToggleLeftDrawerAction;