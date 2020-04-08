import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import TeamEditPanel from './TeamEditPanel'
import { createTeam, fetchEditPanelMemberSelection, updateTeam } from 'stores/team/action'
import { RootState } from 'stores'

const mapStateToProps = (state: RootState) => ({
    memberSelectionMenu: state.team.editPanel.memberSelectionMenu
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    load: async () => {
        await Promise.all([
            dispatch(fetchEditPanelMemberSelection())
        ])        
    },
    create: async (data: any) => {
        await dispatch(createTeam(data))
    },
    update: async (id: number | string, data: any) => {
        await dispatch(updateTeam(id, data))
    }
})

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(TeamEditPanel)