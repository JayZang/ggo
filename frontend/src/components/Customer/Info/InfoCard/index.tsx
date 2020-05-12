import React, { Component } from 'react'
import { Card, CardContent, CardHeader, Table, TableBody, TableRow, TableCell, CardActions, Button, Divider, Box } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import EditIcon from '@material-ui/icons/Edit'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'

import { ICustomer } from 'contracts/customer'
import styled from 'styled-components'

type IProps = {
    className?: string
    customer: ICustomer | null
    hiddenCompanyName?: boolean
    onEditBtnClick?: () => void
}

class CustomerInfoCard extends Component<IProps> {
    render() {
        const {
            className,
            customer,
            hiddenCompanyName,
            onEditBtnClick
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
                                    {customer ? customer.email : <Skeleton height={30} />}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="field-title">
                                    公司網站
                                </TableCell>
                                <TableCell>
                                    {customer ? (customer.website && (
                                        <a
                                            className="d-flex"
                                            target="_blank"
                                            href={`//${customer.website}`}
                                        >
                                            <Box className="mr-1" component="span">{customer.website}</Box>
                                            <OpenInNewIcon fontSize="small" />
                                        </a>
                                    )) : <Skeleton height={30} />}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="field-title">
                                    公司地址
                                </TableCell>
                                <TableCell>
                                    {customer ? (customer.address && (
                                        <a
                                            className="d-flex"
                                            target="_blank"
                                            href={`https://www.google.com.tw/maps/search/${customer.address}`}
                                        >
                                            <Box className="mr-1" component="span">{customer.address}</Box>
                                            <OpenInNewIcon fontSize="small" />
                                        </a>
                                    )) : <Skeleton height={30} />}
                                </TableCell>
                            </TableRow>
                            {customer && customer.remark ? (
                                <TableRow>
                                    <TableCell colSpan={99}>
                                        <Box>備註</Box>
                                        <Divider className="mt-1 mb-2" />
                                        <Box whiteSpace="pre-line">{customer.remark}</Box>
                                    </TableCell>
                                </TableRow>
                            ) : null}
                        </TableBody>
                    </Table>
                </CardContent>
                {customer ? (
                    <Box>
                        <Divider />
                        <CardActions>
                            <Button fullWidth color="primary" startIcon={<EditIcon />} onClick={onEditBtnClick}>
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