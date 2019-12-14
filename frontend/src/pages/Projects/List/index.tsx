import React, { Component } from 'react'
import {
    Grid, 
    Button, 
    Paper,
    IconButton,
    InputBase,
    WithStyles
} from '@material-ui/core'
import {
    Add as AddIcon,
    Search as SearchIcon
} from '@material-ui/icons'

import styles from './styles'
import AppContent from 'pages/App/Content'
import MobileHeader from 'components/MobileHeader'
import { withStyles } from '@material-ui/styles'
import ProjectMenu from 'components/Project/List/ProjectMenu'

type IProps = WithStyles<typeof styles>

 class ProjectList extends Component<IProps> {
    render() {
        const {
            classes
        } = this.props

        return (
            <AppContent
                mobileHeader={(
                    <MobileHeader
                        title="專案/案件列表"
                        defaultHidden={false}
                    />
                )}
            >
                <Grid container className="align-items-center mb-3">
                    <Grid item>
                        <h3>專案/案件管理</h3>
                        <Paper className={classes.searchPaper}>
                            <IconButton size="small" >
                                <SearchIcon />
                            </IconButton>
                            <InputBase
                                placeholder="搜尋專案/案件"
                            />
                        </Paper>
                    </Grid>
                    <Grid item className="ml-auto">
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={() => this.setState({ openEditPanel: true })}
                        >
                            新增專案/案件
                        </Button>
                    </Grid>
                </Grid>

                <ProjectMenu />

            </AppContent>
        )
    }
}

export default withStyles(styles)(ProjectList)