import React, { Component } from 'react'
import { IProject, ProjectSrcType } from 'contracts/project'
import { Grid, Typography, WithStyles, withStyles } from '@material-ui/core'

import { Theme, createStyles } from "@material-ui/core";
import clsx from 'clsx';

const styles = (theme: Theme) => createStyles({
    fieldGrid: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'start',
    },
    fieldHint: {
        color: theme.palette.text.hint,
        fontSize: 14
    }
})

class ProjectSourceLabel extends Component<WithStyles<typeof styles> & {
    project: IProject,
    className?: string
}> {
    render() {
        const {
            project,
            classes,
            className
        } = this.props

        return (
            <Grid item className={clsx(classes.fieldGrid, className)}>
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
        )
    }
}

export default  withStyles(styles)(ProjectSourceLabel)