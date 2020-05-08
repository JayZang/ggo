import { connect } from "react-redux";

import CustomerList from './List'
import { RootState } from "stores";
import { ThunkDispatch } from "redux-thunk";
import { getCustomers, fetchIndustryCategories } from "stores/customer/action";

const mapStateToProps = (state: RootState) => ({
    customers: state.customer.customerMenu,
    industryCategories: state.customer.industryCategories || []
})

const mapActionToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    load: async () => {
        await Promise.all([
            dispatch(fetchIndustryCategories()),
            dispatch(getCustomers())
        ])
    }
})

export default connect(mapStateToProps, mapActionToProps)(CustomerList)