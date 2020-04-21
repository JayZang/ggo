import React, { Component } from 'react'
import { Route, RouteComponentProps, withRouter } from 'react-router'
import { Box } from '@material-ui/core'

import ProjectTaskInfoPage from './Task'
import ProjectListPage from './List'
import ProjectInfo from './Info'

class ProjectPage extends Component<RouteComponentProps> {
    render() {
        const {
            match
        } = this.props

        return (
            <Box>
                <Route exact path={`${match.path}`} component={ProjectListPage} />
                <Route exact path={`${match.path}/:id`} render={props => <ProjectInfo id={props.match.params.id} />} />
                <Route exact path={`${match.path}/:id/tasks/:taskId`} 
                    render={props => <ProjectTaskInfoPage projectId={props.match.params.id} taskId={props.match.params.taskId} />} 
                />
            </Box>
        )
    }
}

export default withRouter(ProjectPage)