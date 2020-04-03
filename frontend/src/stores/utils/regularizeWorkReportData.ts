import { IWorkReport } from "contracts/workReport";
import moment from "moment";
import { regularizeTaskData } from "stores/task/utils";
import { regularizeMemberData } from "stores/member/utils";

export function regularizeWorkReportData(data: any): IWorkReport {
    return {
        ...data,
        create_at: moment(data.create_at),
        task: data.task && regularizeTaskData(data.task),
        submitter: data.submitter && regularizeMemberData(data.submitter)
    }
}