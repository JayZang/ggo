import {} from 'redux'
import { connect } from 'react-redux'

import { RootState } from 'stores'
import AppContentContainer from './AppContentContainer'

const mapStateToProps = (state: RootState) => {
  return {
    isLeftDrawerOpen: state.view.openLeftDrawer
  }
}

export default connect(mapStateToProps)(AppContentContainer)