import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import CustomerInfoPage from './Info'
import { RootState } from 'stores';
import { fetchCustomerInfo } from 'stores/customer/action';

const mapStateToProps = (state: RootState) => ({
    customer: state.customer.infoPage.customer,
    projects: state.customer.infoPage.projects,
    statistic: {
        projectTotalCount: null,
        projectCurrentYearCount: null,
        projectAvgSpendTime: null
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