import { Moment } from "moment";

export type ICustomer = {
    id: number | string,
    company_name: string,
    logo: string,
    contact: string,
    phone: string,
    email: string | null,
    website: string | null,
    address: string | null,
    remark: string | null,
    create_at: Moment,
}