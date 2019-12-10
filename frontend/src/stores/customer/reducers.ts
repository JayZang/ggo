import { CustomerState, CustomerActionType, ADD_CUSTOMER, GET_CUSTOMERS } from "./types";

const initState: CustomerState = {
    customerMenu: null
}

export default function customerReducer(state: CustomerState = initState, action: CustomerActionType): CustomerState {
    switch (action.type) {
        case ADD_CUSTOMER:
            return {
                ...state,
                customerMenu: [
                    ...(state.customerMenu || []),
                    action.payload.customer
                ]
            }

        case GET_CUSTOMERS:
            return {
                ...state,
                customerMenu: action.payload.customers
            }

        default:
            return state
    }
}