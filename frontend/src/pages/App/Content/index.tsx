import { connect } from 'react-redux'

import { RootState } from 'stores'
import AppWrapper from './Content'

const mapStateToProps = (state: RootState) => {
  return {
    isLeftDrawerOpen: state.view.isMenuDrawerOpen
  }
}

export default connect(mapStateToProps)(AppWrapper)