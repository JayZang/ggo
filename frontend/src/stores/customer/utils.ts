import { ICustomer } from "contracts/customer";
import moment from "moment";
import defaultCompanyLogo from 'assets/svgs/default-company-logo.svg'

export function regularizeCustomerData(data: any): ICustomer {
    return {
        ...data,
        logo: data.logo || defaultCompanyLogo,
        hasLogo: !!data.logo,
        create_at: moment(data.create_at)
    }
}