import { connect } from 'react-redux';

import MemberParticipantEditDialog from './MemberParticipantEditDialog'
import { RootState } from 'stores';
import { fetchMemberSelectionMenu, addProjectMemberParticipant, removeProjectMemberParticipant } from 'stores/project/action';

const mapStateToProps = (state: RootState) => ({
    memberSelection: state.project.editPanel.memberSelectionMenu || []
})

export default connect(mapStateToProps, {
    load: fetchMemberSelectionMenu,
    onAddBtnClick: addProjectMemberParticipant,
    onRemoveBtnClick: removeProjectMemberParticipant
})(MemberParticipantEditDialog)