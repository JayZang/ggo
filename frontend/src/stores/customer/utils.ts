import { ICustomer } from "contracts/customer";
import moment from "moment";

export function regularizeCustomerData(data: any): ICustomer {
    return {
        ...data,
        create_at: moment(data.create_at)
    }
}