import { Service } from "typedi";
import { getCustomRepository } from "typeorm";

import WorkReportRepo from "@/repository/WorkReportRepository";

@Service()
export default class WorkReportService {

    /**
     * get work reports
     */
    public async get(option: {
        skip: number,
        take: number,
    }) {
        try {
            const workReportRepo = getCustomRepository(WorkReportRepo)

            const [workReports, count] =await workReportRepo
                .initQueryBuilder()
                .withSubmitterRelation()
                .withTaskRelation()
                .withCreateAtOrder('DESC')
                .limit(option.take)
                .offset(option.skip)
                .getManyAndCount()
            
            return { workReports, count }
        } catch (err) {
            console.log('Get work reports fail')
            console.log(err.toString())
            return null
        }
    }
}