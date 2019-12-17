import moment from "moment";

import { IProject } from 'contracts/project'
import { regularizeCustomerData } from "stores/customer/utils";

export function regularizeProjectData(data: any): IProject {
    return {
        ...data,
        start_datetime: moment(data.start_datetime),
        deadline_datetime: moment(data.deadline_datetime),
        finish_datetime: data.finish_datetime ? moment(data.finish_datetime) : null,
        customer: data.customer && regularizeCustomerData(data.customer),
        create_at: moment(data.create_at)
    }
}