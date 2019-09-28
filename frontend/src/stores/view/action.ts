import {
  ViewActionTypes,
  TOGGLE_MENU_DRAWER,
  OPEN_MENU_DRAWER
} from './types';

/**
 * Toggle 抽屜選單
 */
export function toggleMenuDrawer(): ViewActionTypes {
  return {
    type: TOGGLE_MENU_DRAWER
  }
}

export function openMenuDrawer(): ViewActionTypes {
  return {
    type: OPEN_MENU_DRAWER
  }
}