import React, { Component } from 'react'

import CustomerItem from './CustomerItem'
import { ICustomer } from 'contracts/customer'
import { Box } from '@material-ui/core'

type IProps = {
    customers: ICustomer[]
}

class CustomerMenu extends Component<IProps> {
    render() {
        return (
            <Box>
                {this.props.customers.map(customer => (
                    <Box key={customer.id} marginBottom={2}>
                        <CustomerItem customer={customer} />
                    </Box>
                ))}
            </Box>
        )
    }
}

export default CustomerMenu