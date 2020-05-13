import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import CustomerInfoPage from './Info'
import { RootState } from 'stores';
import { fetchCustomerInfo } from 'stores/customer/action';

const mapStateToProps = (state: RootState) => ({
    customer: state.customer.infoPage.customer,
    projects: state.customer.infoPage.projects,
    projectsOfReview: state.customer.infoPage.projectsOfReview,
    statistic: {
        projectTotalCount: state.customer.infoPage.projectTotalCount,
        projectCurrentYearCount: state.customer.infoPage.projectCurrentYearCount,
        projectAvgSpendTime: state.customer.infoPage.projectAvgSpendTime
    }
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    load: async (id: number | string) => {
        await Promise.all([
            dispatch(fetchCustomerInfo(id))
        ])
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomerInfoPage)