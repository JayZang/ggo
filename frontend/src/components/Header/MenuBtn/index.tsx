import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import HeaderMenuBtn from './MenuBtn';
import { toggleLeftDrawer } from 'stores/view/action';

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onClick: () => {
      dispatch(toggleLeftDrawer())
    }
  }
}

export default connect(null, mapDispatchToProps)(HeaderMenuBtn);