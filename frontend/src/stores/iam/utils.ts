import moment from "moment";
import { IPolicy } from "contracts/policy";
import { IGroup } from "contracts/group";
import { IUser, UserIdentityType } from "contracts/user";
import { regularizeMemberData } from "stores/utils/regularizeMemberData";

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
        policies: data.policies && data.policies.map((policy: IPolicy) => regularizePolicyData(policy))
    }
}

export function regularizeUserData(data: any): IUser {
    return {
        ...data,
        create_at: moment(data.create_at),
        update_at: moment(data.update_at),
        last_login_datetime: data.last_login_datetime && moment(data.update_at),
        policies: data.policies && data.policies.map((policy: IPolicy) => regularizePolicyData(policy)),
        groups: data.groups && data.groups.map((group: IGroup) => regularizeGroupData(group)),
        identity: data.identity && data.identity_type === UserIdentityType.member ?
            regularizeMemberData(data.identity) : undefined
    }
}