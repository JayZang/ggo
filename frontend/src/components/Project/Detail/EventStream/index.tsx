import React, { Component } from 'react'
import { Paper, Box, Divider, Typography } from '@material-ui/core'
import {
    EventNote as EventNoteIcon
} from '@material-ui/icons'

class ProjectEventStream extends Component {
    render() {
        return (
            <Paper>
                <Box className="py-3 px-4">
                    <Typography variant="h5" component="div">
                        <EventNoteIcon className="mr-1" />
                        <Box component="span">事件流</Box>
                    </Typography>
                </Box>
                <Divider />
                <Divider />
                <Box className="py-3">

                </Box>
            </Paper>
        )
    }
}

export default ProjectEventStream