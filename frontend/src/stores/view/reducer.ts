import { 
  ViewState,
  ViewActionTypes,
  TOGGLE_LEFT_DRAWER
} from './types';

const initState: ViewState = {
  openLeftDrawer: false
}

export function configView(state = initState, action: ViewActionTypes) {
  switch (action.type) {
    case TOGGLE_LEFT_DRAWER:
      return {
        ...state,
        openLeftDrawer: !state.openLeftDrawer
      };
    default:
      return state;
  }
}