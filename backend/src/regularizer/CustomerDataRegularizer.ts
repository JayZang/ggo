import Customer from "@/entity/Customer";
import { resource } from '@/config'

export default class CustomerDataRegularizer {
    static regularize(customer: Customer) {
        customer.logo = customer.logo && `/${resource.customerLogo.dest}${customer.logo}`
    }
}