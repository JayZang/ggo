import {
  ViewActionTypes,
  TOGGLE_LEFT_DRAWER
} from './types';

/**
 * Toggle 左方抽屜選單
 */
export function toggleLeftDrawer(): ViewActionTypes {
  return {
    type: TOGGLE_LEFT_DRAWER
  }
}