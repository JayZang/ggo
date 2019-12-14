import React, { Component } from 'react'
import { Grid } from '@material-ui/core'

import ProjectItem from './ProjectItem'

class ProjectMenu extends Component {
    render() {
        return (
            <Grid container direction="column">
                <ProjectItem />
                <ProjectItem />
                <ProjectItem />
            </Grid>
        )
    }
}

export default ProjectMenu