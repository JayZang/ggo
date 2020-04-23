import { connect } from 'react-redux';

import MemberProfilePanel from './MemberPanel'
import { updateAvatar } from 'stores/auth/action';

export default connect(null, {
    storeAvatar: updateAvatar
})(MemberProfilePanel)