import React, { Component } from 'react'
import { Paper, Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

class CustomerItemSkeleton extends Component {
    render() {
        return (
            <Paper>
                <Grid container className="py-3 px-4">
                    <Grid item className="d-flex align-items-center mr-4">
                            <Skeleton variant="circle" width={40} height={40} />
                    </Grid>
                    <Grid item className="flex-grow-1" >
                            <Skeleton variant="text" width="50%" height={20} />
                            <Skeleton variant="text" width="25%" height={20} />
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default CustomerItemSkeleton