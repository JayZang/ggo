import React, { Component } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { withStyles, WithStyles, Theme, createStyles } from '@material-ui/core/styles'
import LoadingBar from 'react-redux-loading-bar'
import axios from 'axios'

const styles = (theme: Theme) => createStyles({
    root: {
        zIndex: 10000,
        height: 3,
        position: 'fixed',
        backgroundColor: theme.palette.primary.main
    }
})

interface IProps extends WithStyles<typeof styles> {
    showLoading: () => void
    hideLoading: () => void
}

class RequestLoadingBar extends Component<IProps> {
    componentDidMount() {
        axios.interceptors.request.use(config => {
            this.props.showLoading()
            return config
        })
        axios.interceptors.response.use(response => {
            return new Promise(resolve => {
                setTimeout(() => {
                    this.props.hideLoading()
                    setTimeout(() => {
                        resolve(response)
                    }, 200);
                }, 1000)
            })
        }, (error) => {
            this.props.hideLoading()
            return Promise.reject(error);
        })
    }

    render() {
        const classes = this.props.classes

        return (
            <LoadingBar className={classes.root} />
        )
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        showLoading: () => {
            dispatch(showLoading())
        },
        hideLoading: () => {
            dispatch(hideLoading())
        }
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(RequestLoadingBar))