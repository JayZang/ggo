import React, { Component } from 'react'
import { Card, CardContent, CardHeader, Table, TableBody, TableRow, TableCell, CardActions, Button, Divider, Box } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import EditIcon from '@material-ui/icons/Edit'

import { ICustomer } from 'contracts/customer'
import styled from 'styled-components'

type IProps = {
    className?: string
    customer: ICustomer | null
    hiddenCompanyName?: boolean
}

class CustomerInfoCard extends Component<IProps> {
    render() {
        const {
            className,
            customer,
            hiddenCompanyName
        } = this.props

        return (
            <Card className={className}>
                {hiddenCompanyName ? null : (
                    <CardHeader
                        title={ customer ? 
                            customer.company_name :
                            <Skeleton width="60%" height={40} /> 
                        }
                    />
                )}
                <CardContent>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className="field-title">
                                    聯絡人
                                </TableCell>
                                <TableCell>
                                    {customer ? customer.contact : <Skeleton height={30} />}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="field-title">
                                    聯絡電話
                                </TableCell>
                                <TableCell>
                                    {customer ? customer.phone : <Skeleton height={30} />}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="field-title">
                                    信箱
                                </TableCell>
                                <TableCell>
                                    {customer ? customer.phone : <Skeleton height={30} />}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="field-title">
                                    公司網站
                                </TableCell>
                                <TableCell>
                                    {customer ? customer.phone : <Skeleton height={30} />}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="field-title">
                                    公司地址
                                </TableCell>
                                <TableCell>
                                    {customer ? customer.phone : <Skeleton height={30} />}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
                {customer ? (
                    <Box>
                        <Divider />
                        <CardActions>
                            <Button fullWidth color="primary" startIcon={<EditIcon />}>
                                編輯
                            </Button>
                        </CardActions>
                    </Box>
                ) : null}
            </Card>
        )
    }
}

export default styled(CustomerInfoCard)`
    .field-title {
        width: 120px;
    }

    td.MuiTableCell-root {
        border-bottom: 0;
    }
`