import React, { Component } from 'react'
import { Route, RouteComponentProps, withRouter } from 'react-router'
import { Box } from '@material-ui/core'

import ProjectListPage from './List'


class ProjectPage extends Component<RouteComponentProps> {
    render() {
        const {
            match
        } = this.props

        return (
            <Box>
                <Route exact path={`${match.path}`} component={ProjectListPage} />
                {/* <Route exact path={`${match.path}/tasks/:id`} render={props => <TaskDetail taskId={props.match.params.id} />} /> */}
            </Box>
        )
    }
}

export default withRouter(ProjectPage)