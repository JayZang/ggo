import React, { Component } from 'react'
import { Route, RouteComponentProps, withRouter } from 'react-router'

import TaskDefault from './Default'
import TaskDetail from './Detail'
import { Box } from '@material-ui/core'

class TaskPage extends Component<RouteComponentProps> {
    render() {
        const {
            match
        } = this.props

        return (
            <Box>
                <Route exact path={`${match.path}/tasks`} component={TaskDefault} />
                <Route exact path={`${match.path}/tasks/:id`} render={props => <TaskDetail  taskId={props.match.params.id} />} />
            </Box>
        )
    }
}

export default withRouter(TaskPage)