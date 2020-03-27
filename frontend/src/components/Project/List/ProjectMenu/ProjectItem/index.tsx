import React, { Component } from 'react'
import { Grid, Paper, WithStyles, withStyles, Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

import styles from './style'
import { IProject, ProjectSrcType } from 'contracts/project'
import ProjectSourceLabel from 'components/Project/ProjectSourceLabel'

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

                    <ProjectSourceLabel 
                        className={classes.fieldSrcType}
                        project={project}
                    />

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