import Customer from "@/entity/Customer";
import { resource } from '@/config'

export function regularizeCustomerData(customer: Customer): Customer {
    return {
        ...customer,
        logo: customer.logo && `${resource.customerLogo.dest}${customer.logo}`
    } 
}