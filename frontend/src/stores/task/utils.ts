import moment from "moment";

import { ITask } from 'contracts/task'
import { regularizeProjectData } from "stores/project/utils";

export function regularizeTaskData(data: any): ITask {
    return {
        ...data,
        start_datetime: moment(data.start_datetime),
        deadline_datetime: moment(data.deadline_datetime),
        finish_datetime: data.finish_datetime ? moment(data.finish_datetime) : null,
        project: data.project && regularizeProjectData(data.project),
        create_at: moment(data.create_at)
    }
}