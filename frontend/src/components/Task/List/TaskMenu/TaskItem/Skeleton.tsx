import React, { Component } from 'react'
import { Paper, Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

export default class TaskItemSkeleton extends Component {
    render() {
        return (
            <Paper>
                <Grid container className="py-2 px-4">
                    <Grid item className="flex-grow-1" >
                            <Skeleton variant="text" style={{ maxWidth: 300 }} height={12} />
                            <Skeleton variant="text" style={{ maxWidth: 170 }} height={12} />
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}