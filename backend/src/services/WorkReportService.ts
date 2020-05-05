import { Service } from "typedi";
import { getCustomRepository, ObjectLiteral } from "typeorm";

import WorkReportRepo from "@/repository/WorkReportRepository";

@Service()
export default class WorkReportService {

    /**
     * get work reports
     */
    public async get(option: {
        skip: number,
        take: number,
    }, query?: ObjectLiteral) {
        try {
            const workReportRepo = getCustomRepository(WorkReportRepo)
                .initQueryBuilder()
                .withSubmitterRelation()
                .withTaskRelation()
                .withCreateAtOrder('DESC')
                .take(option.take)
                .skip(option.skip)

            query && this.setQueryConfig(workReportRepo, query)

            const [workReports, count] = await workReportRepo.getManyAndCount()
            
            return { workReports, count }
        } catch (err) {
            console.log('Get work reports fail')
            console.log(err.toString())
            return null
        }
    }

    private setQueryConfig(repo: WorkReportRepo, query: ObjectLiteral) {
        Object.keys(query).forEach(key => {
            if (['title'].includes(key))
                repo.withFieldLikeCondition(key, query[key])
            else if ([].includes(key))
                repo.withFieldCondition(key, query[key])
        })
    }
}