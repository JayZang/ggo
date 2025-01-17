import { Moment } from "moment";
import { IProject } from "./project";

export type ICustomer = {
    id: number | string
    company_name: string
    logo: string
    contact: string
    phone: string
    email: string | null
    website: string | null
    address: string | null
    remark: string | null
    create_at: Moment
    industry_categories?: IndustryCategory[]
    projects?: IProject[]
} & {
    hasLogo: boolean
}

export type IndustryCategory = {
    id: number | string
    name: string
}