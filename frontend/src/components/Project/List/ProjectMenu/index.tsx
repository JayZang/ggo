import React, { Component } from 'react'
import { Grid, Box } from '@material-ui/core'

import ProjectItem from './ProjectItem'
import { IProject } from 'contracts/project'
import ProjectEditDrawer from 'components/Project/ProjectEditPanel/ProjectEditDrawer'

type IProps = {
    projects: IProject[]
}

type IState = {
    projectToEdit: IProject | null
    openEditDrawer: boolean
}

class ProjectMenu extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.handleOpenEditDrawer = this.handleOpenEditDrawer.bind(this)
        this.state = {
            projectToEdit: null,
            openEditDrawer: false
        }
    }

    handleOpenEditDrawer(project: IProject) {
        this.setState({
            projectToEdit: project,
            openEditDrawer: true
        })
    }

    render() {
        const projects = this.props.projects
        const {
            openEditDrawer,
            projectToEdit
        } = this.state

        return (
            <Box>
                <Grid container direction="column">
                    {projects.map(project => (
                        <ProjectItem 
                            key={project.id} 
                            project={project} 
                            onEditBtnClick={() => this.handleOpenEditDrawer(project)}
                        />
                    ))}
                </Grid>
                <ProjectEditDrawer 
                    open={openEditDrawer}
                    project={projectToEdit || undefined}
                    onOpen={() => this.setState({ openEditDrawer: true })}
                    onClose={() => this.setState({ openEditDrawer: false, projectToEdit: null })}
                />
            </Box>
        )
    }
}

export default ProjectMenu