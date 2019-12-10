import React, { Component } from 'react'
import { Paper, Grid, Avatar } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

class CustomerItemSkeleton extends Component {
    render() {
        return (
            <Paper>
                <Grid container className="py-2 px-4">
                    <Grid item className="d-flex align-items-center mr-4">
                            <Skeleton variant="circle" width={40} height={40} />
                    </Grid>
                    <Grid item className="flex-grow-1" >
                            <Skeleton variant="text" style={{ maxWidth: 300 }} height={12} />
                            <Skeleton variant="text" style={{ maxWidth: 170 }} height={12} />
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default CustomerItemSkeleton