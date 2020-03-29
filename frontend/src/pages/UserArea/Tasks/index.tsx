import React, { Component } from 'react'
import { Route, RouteComponentProps, withRouter } from 'react-router'

import TaskDefault from './Default'
import { Box } from '@material-ui/core'

class TaskPage extends Component<RouteComponentProps> {
    render() {
        const {
            match
        } = this.props

        return (
            <Box>
                <Route exact path={`${match.path}/tasks`} component={TaskDefault} />
            </Box>
        )
    }
}

export default withRouter(TaskPage)