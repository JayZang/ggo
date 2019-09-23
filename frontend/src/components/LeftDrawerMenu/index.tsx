import { connect } from 'react-redux';

import LeftDrawerMenu from './LeftDrawerMenu';
import { RootState } from 'stores';
import { Dispatch } from 'redux';
import { toggleLeftDrawer } from 'stores/view/action';

const mapStateToProps = (state: RootState) => ({
  open: state.view.openLeftDrawer,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    toggleDrawer: () => {
      dispatch(toggleLeftDrawer());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftDrawerMenu);

