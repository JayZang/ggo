import React, { Component } from 'react'
import { Box, Typography, Paper, Grid, WithStyles, withStyles, Divider, Button } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import {
    Edit as EditIcon
} from '@material-ui/icons'

import { IProject, ProjectSrcType } from 'contracts/project'
import ProjectEditDrawer from 'components/Project/ProjectEditPanel/ProjectEditDrawer'
import styles from './style'
import clsx from 'clsx'

type IProps = WithStyles<typeof styles> & {
    project: IProject | null
}

type IState = {
    openEditDrawer: boolean
}

class ProjectBaseInfoPanel extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state= {
            openEditDrawer: false
        }
    }

    render() {
        const {
            project,
            classes
        } = this.props

        return (
            <Box>
                <Grid container justify="space-between" alignItems="center" wrap="nowrap">
                    <Grid item>
                        {(() => {
                            if (project) return (
                                <Box>
                                    <Typography variant="h4" component="div" className="mb-1">
                                        <Box fontWeight={500}>
                                            {project.name}
                                        </Box>
                                    </Typography>
                                    <Typography variant="subtitle2" component="div">
                                        <Box whiteSpace="pre">
                                            {project.description}
                                        </Box>
                                    </Typography>
                                </Box>
                            ) 
                            else return (
                                <Skeleton width={300} />
                            )
                        })()}
                    </Grid>
                    <Grid item>
                        <Button 
                            color="primary" 
                            variant="contained" 
                            startIcon={<EditIcon />}
                            onClick={() => this.setState({ openEditDrawer: true})}
                        >
                            <Box whiteSpace="noWrap">編輯</Box>
                        </Button>
                    </Grid>
                </Grid>
                <Paper className="p-4 mt-2">
                    <Box className={clsx(classes.datesBoxRoot, 'shadow-sm')}>
                        <Grid container>
                            <Grid item className={classes.datesBoxItem}>
                                {(() => {
                                    if (project) return (
                                        <Typography align="center">
                                            {project.start_datetime.format('YYYY-MM-DD')}
                                        </Typography>
                                    ) 
                                    else return (
                                        <Box width={150} marginX="auto">
                                            <Skeleton />
                                        </Box>
                                    )
                                })()}
                                <Typography variant="h6" align="center">起始日期</Typography>
                            </Grid>
                            <Divider orientation="vertical" style={{height: 'auto'}} />
                            <Grid item className={classes.datesBoxItem}>
                                {(() => {
                                    if (project) return (
                                        <Typography align="center">
                                            {project.deadline_datetime.format('YYYY-MM-DD')}
                                        </Typography>
                                    ) 
                                    else return (
                                        <Box width={150} marginX="auto">
                                            <Skeleton />
                                        </Box>
                                    )
                                })()}
                                <Typography variant="h6" align="center">最後期限日期</Typography>
                            </Grid>
                            <Divider orientation="vertical" style={{height: 'auto'}} />
                            <Grid item className={classes.datesBoxItem}>
                                {(() => {
                                    if (project) {
                                        return (
                                            <Typography align="center">
                                                {project.finish_datetime ? project.finish_datetime.format('YYYY-MM-DD') : '尚未完成'}
                                            </Typography>
                                        )
                                    } else return (
                                        <Box width={150} marginX="auto">
                                            <Skeleton />
                                        </Box>
                                    )
                                })()}
                                <Typography variant="h6" align="center">完成日期</Typography>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box>
                        <Grid container wrap="nowrap">
                            <Box flexGrow={1} flexBasis={0} className="mr-4">
                                <Box>
                                    <Typography variant="h6">報價</Typography>
                                    {(() => {
                                        if (project) {
                                            return (
                                                <Typography>
                                                    <Box fontWeight={500} className="mr-1" component="span">$</Box>
                                                    {project.quote || '無報價'}
                                                </Typography>
                                            )
                                        } else return (
                                            <Box component="span" width="auto">
                                                <Skeleton width={150} />
                                            </Box>
                                        )
                                    })()}
                                </Box>
                                <Divider className="my-3" />
                                <Box>
                                    <Typography variant="h6">專案來源</Typography>
                                    <Box>
                                        {(() => {
                                            if (project) {
                                                switch (project.source_type) {
                                                    case ProjectSrcType.Internal:
                                                        return (
                                                            <Typography className="badge badge-primary shadow">內部專案</Typography>
                                                        )
                                                    
                                                    case ProjectSrcType.Customer:
                                                        if (!project.customer)
                                                            return <Typography className="badge badge-danger shadow">錯誤</Typography>
                                                        return (
                                                            <Grid container direction="row" alignItems="center" wrap="nowrap">
                                                                <Grid item className="mr-3">
                                                                    <img src={project.customer!.logo} style={{ width: 48 }} />
                                                                </Grid>
                                                                <Grid item>
                                                                    <Typography>{ project.customer.company_name }</Typography>
                                                                    <Typography className={classes.customerFieldHint}>
                                                                        { project.customer.contact } / { project.customer.phone }
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>
                                                        )
                                                }
                                            } else return (
                                                <Box component="span" width="auto">
                                                    <Skeleton width={150} />
                                                </Box>
                                            )
                                        })()}
                                    </Box>
                                </Box>
                            </Box>
                            <Box flexGrow={1} flexBasis={0}>
                                <Typography variant="h6">備註</Typography>
                                <Typography className={classes.remarkWrapper} component="div">
                                    <Box minHeight={100} whiteSpace="pre">{project && project.remark}</Box>
                                </Typography>
                            </Box>
                        </Grid>
                    </Box>
                </Paper>

                <ProjectEditDrawer 
                    project={project || undefined}
                    open={this.state.openEditDrawer}
                    onOpen={() => this.setState({ openEditDrawer: true })}
                    onClose={() => this.setState({ openEditDrawer: false })}
                />
            </Box>
        )
    }
}

export default withStyles(styles)(ProjectBaseInfoPanel)