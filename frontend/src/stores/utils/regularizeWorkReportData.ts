import moment from "moment";
import { IWorkReport } from "contracts/workReport";
import { regularizeTaskData } from "stores/utils/regularizeTaskData";
import { regularizeMemberData } from "stores/utils/regularizeMemberData";

export function regularizeWorkReportData(data: any): IWorkReport {
    return {
        ...data,
        create_at: moment(data.create_at),
        start_time: moment(data.start_time),
        end_time: moment(data.end_time),
        spend_time: moment.duration(moment(data.end_time).diff(data.start_time)).humanize(),
        task: data.task && regularizeTaskData(data.task),
        submitter: data.submitter && regularizeMemberData(data.submitter)
    }
}