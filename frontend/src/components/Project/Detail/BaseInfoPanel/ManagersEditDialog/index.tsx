import { connect } from 'react-redux';

import ProjectManagerEditDialog from './ManagersEditDialog'
import { RootState } from 'stores';
import { fetchMemberSelectionMenu } from 'stores/project/action';

const mapStateToProps = (state: RootState) => ({
    memberSelection: state.project.editPanel.memberSelectionMenu || []
})

export default connect(mapStateToProps, {
    load: fetchMemberSelectionMenu
})(ProjectManagerEditDialog)