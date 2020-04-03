import React from 'react'
import moment from "moment";
import { Box } from "@material-ui/core";

import { ITask, ITaskAssignment, TaskAssignType, TaskStatus } from 'contracts/task'
import { regularizeProjectData } from "stores/project/utils";
import { regularizeMemberData } from "stores/member/utils";
import { regularizeTeamData } from "stores/team/utils";
import { regularizeWorkReportData } from 'stores/utils/regularizeWorkReportData';
import { IWorkReport } from 'contracts/workReport';

export function regularizeTaskData(data: any): ITask {
    return {
        ...data,
        start_datetime: moment(data.start_datetime),
        deadline_datetime: moment(data.deadline_datetime),
        finish_datetime: data.finish_datetime ? moment(data.finish_datetime) : null,
        project: data.project && regularizeProjectData(data.project),
        create_at: moment(data.create_at),
        assignment: data.assignment && regularizeTaskAssignmentData(data.assignment),
        workReports: data.workReports && data.workReports.map((workReport: IWorkReport) => regularizeWorkReportData(workReport)),
        get statusLabel() {
            if (this.status === TaskStatus.Normal) {
                return (
                    <Box className="badge badge-primary">
                        執行中
                    </Box>
                )
            }  else if (this.status === TaskStatus.Pause) { 
                return (
                    <Box className="badge badge-warning">
                        暫停中
                    </Box>
                )
            } else if (this.status === TaskStatus.Terminated) {
                return (
                    <Box className="badge badge-danger">
                        已終止
                    </Box>
                )
            } else if (this.status === TaskStatus.Completed) {
                return (
                    <Box className="badge badge-success">
                        已完成
                    </Box>
                )
            } else {
                return 'Something Wrong'
            }
        }
    }
}

export function regularizeTaskAssignmentData(data: any): ITaskAssignment {
    return {
        ...data,
        distributor: data.distributor && regularizeMemberData(data.distributor),
        target: data.target && (data.type === TaskAssignType.Member ? regularizeMemberData(data.target) :
            data.type === TaskAssignType.Team ? regularizeTeamData(data.target) :
            data.type === TaskAssignType.Outsourcing ? null : null)
    }
}