import React, { Component } from 'react'
import { Card, CardHeader, Divider, TableContainer, Table, TableHead, TableRow, TableCell, Tooltip, Typography, TableBody, Box } from '@material-ui/core'
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';
import ArrowRightOutlinedIcon from '@material-ui/icons/ArrowRightOutlined';
import { Skeleton } from '@material-ui/lab'

import { IProject } from 'contracts/project';

type IProps = {
    projects: IProject[] | null
}

class CustomerProjectsReview extends Component<IProps> {
    render() {
        const {
            projects
        } = this.props

        return (
            <Card>
                <CardHeader
                    title={(
                        <Box display="flex" alignItems="center">
                            歷年專案回顧
                            <Tooltip title="歷年今日相近的專案">
                                <Typography color="textSecondary" component="span" className="ml-1">
                                    <ContactSupportIcon fontSize="small" />
                                </Typography>
                            </Tooltip>
                        </Box>
                    )}
                    classes={{
                        action: 'm-0 align-self-center'
                    }}
                />
                <Divider />
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>專案名稱</TableCell>
                                <TableCell>專案期限</TableCell>
                                <TableCell>完成日期</TableCell>
                                <TableCell>預估比 
                                    <Tooltip title="完成日期 / 專案期限 X 100%">
                                        <Typography color="textSecondary" component="span">
                                            <ContactSupportIcon fontSize="small" />
                                        </Typography>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {projects ? (projects.length ? projects.map(project => (
                                <TableRow key={project.id}>
                                    <TableCell>
                                        {project.name}
                                    </TableCell>
                                    <TableCell>
                                        <Box className="d-flex align-items-center">
                                            <Typography>
                                                <TodayOutlinedIcon />
                                                {project.start_datetime.format('YYYY-MM-DD')}
                                            </Typography>
                                            <ArrowRightOutlinedIcon />
                                            <Typography>
                                                <TodayOutlinedIcon />
                                                {project.deadline_datetime.format('YYYY-MM-DD')}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        {project.finish_datetime && project.finish_datetime.format('YYYY-MM-DD')}
                                    </TableCell>
                                    <TableCell>
                                        {(() => {
                                            if (!project.finish_datetime)
                                                return null

                                            const {
                                                start_datetime,
                                                deadline_datetime,
                                                finish_datetime
                                            } = project
                                            
                                            return `${(finish_datetime.diff(start_datetime) / deadline_datetime.diff(start_datetime) * 100).toFixed(2)}%`
                                        })()}
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={99}>無專案資訊</TableCell>
                                </TableRow>
                            )) : new Array(3).fill(0).map((value, index) => (
                                <TableRow key={index}>
                                    <TableCell colSpan={99}>
                                        <Skeleton height={30} width="60%" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        )
    }
}

export default CustomerProjectsReview