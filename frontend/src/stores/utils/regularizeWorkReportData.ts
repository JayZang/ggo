import moment from "moment";
import { IWorkReport } from "contracts/workReport";
import { regularizeTaskData } from "stores/task/utils";
import { regularizeMemberData } from "stores/utils/regularizeMemberData";

export function regularizeWorkReportData(data: any): IWorkReport {
    return {
        ...data,
        create_at: moment(data.create_at),
        task: data.task && regularizeTaskData(data.task),
        submitter: data.submitter && regularizeMemberData(data.submitter)
    }
}