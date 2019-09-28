import { 
  ViewState,
  ViewActionTypes,
  TOGGLE_MENU_DRAWER,
  OPEN_MENU_DRAWER
} from './types';

const initState: ViewState = {
  isMenuDrawerOpen: false
}

export function configView(state = initState, action: ViewActionTypes) {
  switch (action.type) {
    case TOGGLE_MENU_DRAWER:
      return {
        ...state,
        isMenuDrawerOpen: !state.isMenuDrawerOpen
      };

    case OPEN_MENU_DRAWER:
      return {
        ...state,
        isMenuDrawerOpen: true
      }

    default:
      return state;
  }
}