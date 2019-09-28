import {} from 'redux'
import { connect } from 'react-redux'

import { RootState } from 'stores'
import AppWrapper from './AppWrapper'

const mapStateToProps = (state: RootState) => {
  return {
    isLeftDrawerOpen: state.view.isMenuDrawerOpen
  }
}

export default connect(mapStateToProps)(AppWrapper)