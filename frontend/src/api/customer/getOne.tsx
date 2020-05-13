import axios from 'axios'

const URL = '/api/customers/:id'

export function getOne(id: number | string) {
    return axios.get<{
        customer: {
            id: string
            logo: string | null
            company_name: string
            contact: string
            phone: string
            email: string | null
            website: string | null
            address: string | null
            remark: string | null
            proejcts: Object[]
        }
        projectTotalCount: number
        projectCurrentYearCount: number
        projectAvgSpendTime: number
        projectsOfReview: Object[]
    }>(URL.replace(':id', id.toString()))
}