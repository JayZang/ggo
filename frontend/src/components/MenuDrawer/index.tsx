import { connect } from 'react-redux';

import MenuDrawer from './MenuDrawer';
import { RootState } from 'stores';
import { Dispatch } from 'redux';
import { toggleMenuDrawer } from 'stores/view/action';

const mapStateToProps = (state: RootState) => ({
  open: state.view.isMenuDrawerOpen,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    toggleDrawer: () => {
      dispatch(toggleMenuDrawer());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuDrawer);

