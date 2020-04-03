import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import WorkReportEditPanel from './WorkReportEditPanel'
import { createWorkReport, updateWorkReport } from 'stores/userArea/action';

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    create: async (taskId: number, data: any) => {
        await dispatch(createWorkReport(taskId, data))
    },
    update: async (taskId: number, workReportId: number, data: any) => {
        await dispatch(updateWorkReport(taskId, workReportId, data))
    }
})

export default connect(null, mapDispatchToProps)(WorkReportEditPanel)