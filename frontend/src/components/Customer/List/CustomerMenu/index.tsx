import React, { Component } from 'react'

import CustomerItem from './CustomerItem'
import { ICustomer } from 'contracts/customer'

type IProps = {
    customers: ICustomer[]
}

class CustomerMenu extends Component<IProps> {
    render() {
        return (
            <div>
                {this.props.customers.map(customer => {
                    return <CustomerItem key={customer.id} customer={customer} />
                })}
            </div>
        )
    }
}

export default CustomerMenu