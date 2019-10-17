import { IMember } from "contracts/member";
import moment from "moment";

export function regularizeMemberData(data: any): IMember {
    return {
        ...data,
        birthday: moment(data.birthday),
        take_office_date: moment(data.take_office_date),
        leave_office_date: data.leave_office_date !== null ? moment(data.leave_office_date) : null,
        create_at: moment(data.create_at),
        update_at: moment(data.update_at)
    }
}