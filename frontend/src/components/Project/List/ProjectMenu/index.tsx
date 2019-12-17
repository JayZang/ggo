import React, { Component } from 'react'
import { Grid } from '@material-ui/core'

import ProjectItem from './ProjectItem'
import { IProject } from 'contracts/project'

type IProps = {
    projects: IProject[]
}

class ProjectMenu extends Component<IProps> {
    render() {
        const projects = this.props.projects

        return (
            <Grid container direction="column">
                {projects.map(project => <ProjectItem key={project.id} project={project} />)}
            </Grid>
        )
    }
}

export default ProjectMenu