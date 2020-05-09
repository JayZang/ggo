import Customer from "@/entity/Customer";
import { resource } from '@/config'

export default class CustomerDataRegularizer {
    static regularize(customer: Customer) {
        if (customer.logo && !customer.logo.includes(resource.customerLogo.dest))
            customer.logo = customer.logo && `/${resource.customerLogo.dest}${customer.logo}`
    }
}