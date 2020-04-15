import { connect } from 'react-redux';

import ProjectManagerEditDialog from './ManagersEditDialog'
import { RootState } from 'stores';
import { fetchMemberSelectionMenu, addProjectManager, removeProjectManager } from 'stores/project/action';

const mapStateToProps = (state: RootState) => ({
    memberSelection: state.project.editPanel.memberSelectionMenu || []
})

export default connect(mapStateToProps, {
    load: fetchMemberSelectionMenu,
    onAddBtnClick: addProjectManager,
    onRemoveBtnClick: removeProjectManager
})(ProjectManagerEditDialog)