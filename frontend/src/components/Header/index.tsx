import { connect } from 'react-redux';

import Header from './Header';
import { RootState } from 'stores'
import { logout } from 'stores/auth/action';

const mapStateToProps = (state: RootState) => {
    return {
        openLeftArea: state.view.isMenuDrawerOpen,
    }
}

export default connect(mapStateToProps, {
    logout
})(Header);