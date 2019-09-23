import { connect } from 'react-redux';

import Header from './Header';
import { RootState } from 'stores'

const mapStateToProps = (state: RootState) => {
  return {
    openLeftArea: state.view.openLeftDrawer
  }
}

export default connect(mapStateToProps)(Header);