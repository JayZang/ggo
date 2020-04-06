import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import WorkReportListPage from './List'
import { fetchWorkReports, clearWorkReports } from 'stores/workReport/action';
import { RootState } from 'stores';

const mapStateToProps = (state: RootState) => ({
    workReports: state.workReport.listPage.workReports
})

const mapDispachToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    load: async () => {
        await dispatch(fetchWorkReports())
    },
    reload: async () => {
        dispatch(clearWorkReports())
        await dispatch(fetchWorkReports())
    },
    fetchWorkReports: async () => {
        await dispatch(fetchWorkReports())
    }
})

export default connect(mapStateToProps, mapDispachToProps)(WorkReportListPage)