import React, { Component } from 'react'
import { Grid, Paper, WithStyles, withStyles, Typography, Button } from '@material-ui/core'

import styles from './style'
import { IProject, ProjectSrcType } from 'contracts/project'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

type IProps = WithStyles<typeof styles> & {
    project: IProject
}

class ProjectItem extends Component<IProps> {
    render() {
        const {
            classes,
            project
        } = this.props

        return (
            <Paper className={classes.root}>

                    <Grid item className={clsx(classes.fieldGrid, classes.fieldProjectName)}>
                        <Typography>
                            {project.name}
                        </Typography>
                        <Typography
                            className={classes.fieldHint}
                        >
                            專案名稱
                        </Typography>
                    </Grid>

                    <Grid item className={clsx(classes.fieldGrid, classes.fieldDate)}>
                        <Typography>
                            {project.start_datetime.format('YYYY-MM-DD')}
                        </Typography>
                        <Typography
                            className={classes.fieldHint}
                        >
                            起始日期
                        </Typography>
                    </Grid>

                    <Grid item className={clsx(classes.fieldGrid, classes.fieldDate)}>
                        <Typography>
                            {project.deadline_datetime.format('YYYY-MM-DD')}  
                        </Typography>
                        <Typography
                            className={classes.fieldHint}
                        >
                            最後期限日期
                        </Typography>
                    </Grid>

                    <Grid item className={clsx(classes.fieldGrid, classes.fieldDate)}>
                        <Typography>
                            {
                                project.finish_datetime ? 
                                    project.finish_datetime.format('YYYY-MM-DD') : 
                                    '----------'
                            }
                        </Typography>
                        <Typography
                            className={classes.fieldHint}
                        >
                            完成日期
                        </Typography>
                    </Grid>

                    <Grid item className={clsx(classes.fieldGrid, classes.fieldSrcType)}>
                        {(() => {
                            switch (project.source_type) {
                                case ProjectSrcType.Internal:
                                    return <Typography className="badge badge-primary shadow">內部專案</Typography>

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
                                                <Typography className={classes.fieldHint}>
                                                    { project.customer.contact } / { project.customer.phone }
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    )

                                default:
                                    return <Typography className="badge badge-danger shadow">錯誤</Typography>
                            }
                        })()}
                    </Grid>

                    <Grid item className="d-flex align-items-center">
                        <Link to={`/projects/${project.id}`}>
                            <Button variant="outlined" color="primary">查看</Button>
                        </Link>
                    </Grid>

            </Paper>
        )
    }
}

export default withStyles(styles)(ProjectItem)