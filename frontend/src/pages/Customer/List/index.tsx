import { connect } from "react-redux";

import CustomerList from './List'
import { RootState } from "stores";
import { ThunkDispatch } from "redux-thunk";
import { getCustomers } from "stores/customer/action";

const mapStateToProps = (state: RootState) => ({
    customers: state.customer.customerMenu
})

const mapActionToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    load: async () => {
        await dispatch(getCustomers())
    }
})

export default connect(mapStateToProps, mapActionToProps)(CustomerList)