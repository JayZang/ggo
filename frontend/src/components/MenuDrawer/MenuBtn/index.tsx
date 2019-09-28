import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import HeaderMenuBtn from './MenuBtn';
import { toggleMenuDrawer } from 'stores/view/action';

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onClick: () => {
      dispatch(toggleMenuDrawer())
    }
  }
}

export default connect(null, mapDispatchToProps)(HeaderMenuBtn);