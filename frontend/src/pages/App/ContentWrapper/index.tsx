import { connect } from 'react-redux'

import { RootState } from 'stores'
import ContentWrapper from './ContentWrapper'

const mapStateToProps = (state: RootState) => {
  return {
    isLeftDrawerOpen: state.view.isMenuDrawerOpen
  }
}

export default connect(mapStateToProps)(ContentWrapper)