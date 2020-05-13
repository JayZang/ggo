import { CustomerState, CustomerActionType, ADD_CUSTOMER, GET_CUSTOMERS, GET_CUSTOMER_INDUSTRY_CATEGORIES, ADD_CUSTOMER_INDUSTRY_CATEGORY, EDIT_CUSTOMER_INDUSTRY_CATEGORY, REMOVE_CUSTOMER_INDUSTRY_CATEGORY, UPDATE_CUSTOMER, REMOVE_CUSTOMER, GET_CUSTOMER_INFO } from "./types";

const initState: CustomerState = {
    customerMenu: null,
    infoPage: {
        customer: null,
        projects: null,
        projectTotalCount: null,
        projectCurrentYearCount: null,
        projectAvgSpendTime: null,
        projectsOfReview: null
    },
    industryCategories: null
}

export default function customerReducer(state: CustomerState = initState, action: CustomerActionType): CustomerState {
    switch (action.type) {
        case ADD_CUSTOMER:
            return {
                ...state,
                customerMenu: state.customerMenu && [
                    action.payload.customer,
                    ...state.customerMenu,
                ]
            }

        case UPDATE_CUSTOMER:
            return {
                ...state,
                customerMenu: state.customerMenu && state.customerMenu.map(customer => {
                    if (customer.id === action.payload.customer.id)
                        return action.payload.customer
                    return customer
                }),
                infoPage: {
                    ...state.infoPage,
                    customer: state.infoPage.customer && state.infoPage.customer.id === action.payload.customer.id ?
                        action.payload.customer :
                        state.infoPage.customer
                }
            }

        case GET_CUSTOMERS:
            return {
                ...state,
                customerMenu: action.payload.customers
            }

        case GET_CUSTOMER_INFO:
            return {
                ...state,
                infoPage: {
                    ...state.infoPage,
                    ...action.payload
                }
            }

        case REMOVE_CUSTOMER:
            return {
                ...state,
                customerMenu: state.customerMenu && state.customerMenu.filter(customer => {
                    return customer.id != action.payload.id
                })
            }

        case GET_CUSTOMER_INDUSTRY_CATEGORIES:
            return {
                ...state,
                industryCategories: action.payload.industryCategories
            }

        case ADD_CUSTOMER_INDUSTRY_CATEGORY:
            return {
                ...state,
                industryCategories: state.industryCategories && [
                    action.payload.industryCategory,
                    ...state.industryCategories
                ]
            }

        case EDIT_CUSTOMER_INDUSTRY_CATEGORY:
            return {
                ...state,
                industryCategories: state.industryCategories && state.industryCategories.map(industryCategory => {
                    if (industryCategory.id === action.payload.industryCategory.id)
                        return action.payload.industryCategory
                    return industryCategory
                })
            }

        case REMOVE_CUSTOMER_INDUSTRY_CATEGORY:
            return {
                ...state,
                industryCategories: state.industryCategories && state.industryCategories.filter(industryCategory => {
                    return industryCategory.id !== action.payload.id
                })
            }

        default:
            return state
    }
}