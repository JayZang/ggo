import { connect } from 'react-redux'

import ProfileDefaultPage from './Default'
import { RootState } from 'stores'

const mapStateToProps = (state: RootState) => ({
    user: state.auth.user
})

export default connect(
    mapStateToProps
)(ProfileDefaultPage)