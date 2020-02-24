import moment from "moment";
import { IPolicy } from "contracts/policy";

export function regularizePolicyData(data: any): IPolicy {
    return {
        ...data,
        create_at: moment(data.create_at)
    }
}