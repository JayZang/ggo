import { Dispatch } from "redux";

import * as iamApi from 'api/iam'
import { IAMActionTypes, GET_POLICIES } from "./types";
import { regularizePolicyData } from "./utils";

export const getPolicies = () => async (dispatch: Dispatch) => {
    const res = await iamApi.getPolicies()

    const action: IAMActionTypes = {
        type: GET_POLICIES,
        payload: {
            policies: res.data.map(policy => regularizePolicyData(policy))
        }
    }

    dispatch(action)
}