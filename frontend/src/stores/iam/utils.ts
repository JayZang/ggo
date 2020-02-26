import moment from "moment";
import { IPolicy } from "contracts/policy";
import { IGroup } from "contracts/group";

export function regularizePolicyData(data: any): IPolicy {
    return {
        ...data,
        create_at: moment(data.create_at)
    }
}

export function regularizeGroupData(data: any): IGroup {
    return {
        ...data,
        create_at: moment(data.create_at),
        policies: data.policies.map((policy: IPolicy) => regularizePolicyData(policy))
    }
}