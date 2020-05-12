import { ICustomer } from "contracts/customer";
import moment from "moment";
import defaultCompanyLogo from 'assets/svgs/default-company-logo.svg'
import { regularizeProjectData } from "stores/utils/regularizeProjectData";

export function regularizeCustomerData(data: any): ICustomer {
    return {
        ...data,
        logo: data.logo || defaultCompanyLogo,
        hasLogo: !!data.logo,
        projects: data.projects && data.projects.map((project: any) => regularizeProjectData(project)),
        create_at: moment(data.create_at)
    }
}