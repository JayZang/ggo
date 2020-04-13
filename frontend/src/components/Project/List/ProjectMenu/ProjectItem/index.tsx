import React, { Component } from 'react'
import { Grid, Paper, WithStyles, withStyles, Typography, Button, Box, Tooltip } from '@material-ui/core'
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';
import ArrowRightOutlinedIcon from '@material-ui/icons/ArrowRightOutlined';
import { Link } from 'react-router-dom'

import styles from './style'
import { IProject } from 'contracts/project'
import ProjectSourceLabel from 'components/Project/ProjectSourceLabel'


type IProps = WithStyles<typeof styles> & {
    project: IProject
    onEditBtnClick: () => void
}

class ProjectItem extends Component<IProps> {
    render() {
        const {
            classes,
            project
        } = this.props

        return (
            <Paper className={classes.root}>

                <Box className={classes.fieldGrid} flexGrow={1.5}>
                    <Typography component="div">
                        {project.name}
                        {project.finish_datetime ? (
                            <Box component="span">
                                <Box component="span" className="badge badge-success ml-1">已結案</Box>
                                <Box component="span" className="badge badge-success ml-1">{project.finish_datetime.format('YYYY-MM-DD')}</Box>
                            </Box>
                        ) : null}
                    </Typography>
                    <Typography className={classes.fieldHint}>
                        專案名稱
                    </Typography>
                </Box>

                <Box className={classes.fieldGrid} flexGrow={1} marginX={3} minWidth={250}>
                    <Tooltip title="專案期限" placement="bottom-start">
                        <Box className="d-flex align-items-center h-100">
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
                    </Tooltip>
                </Box>

                <Box className={classes.fieldGrid} flexGrow={1}>
                    <ProjectSourceLabel project={project} />
                </Box>

                <Box width={140} display="flex" justifyContent="flex-end" alignItems="center">
                    {project.finish_datetime ? null : (
                        <Button color="primary" onClick={this.props.onEditBtnClick}>編輯</Button>
                    )}
                    <Link to={`/projects/${project.id}`}>
                        <Button color="primary">查看</Button>
                    </Link>
                </Box>

            </Paper>
        )
    }
}

export default withStyles(styles)(ProjectItem)