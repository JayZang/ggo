import { connect } from 'react-redux';

import MenuDrawer from './MenuDrawer';
import { RootState } from 'stores';
import { Dispatch } from 'redux';
import { toggleMenuDrawer } from 'stores/view/action';
import { UserIdentityType } from 'contracts/user';

const mapStateToProps = (state: RootState) => ({
  open: state.view.isMenuDrawerOpen,
  permissions: state.auth.user && state.auth.user.permissions ? state.auth.user.permissions : {} as any,
  isIAMAvailable: state.auth.user ? state.auth.user.identity_type === UserIdentityType.admin : false
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    toggleDrawer: () => {
      dispatch(toggleMenuDrawer());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuDrawer);

