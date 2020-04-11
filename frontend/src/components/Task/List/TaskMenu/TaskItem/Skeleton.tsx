import React, { Component } from 'react'
import { Paper, Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

export default class TaskItemSkeleton extends Component {
    render() {
        return (
            <Paper>
                <Grid container className="py-3 px-4">
                    <Grid item className="flex-grow-1" >
                            <Skeleton variant="text" width="50%" height={20} />
                            <Skeleton variant="text" width="30%" height={20} />
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}