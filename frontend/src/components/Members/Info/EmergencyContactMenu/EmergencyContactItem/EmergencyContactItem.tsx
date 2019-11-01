import React, { Component } from 'react'
import {
    withStyles,
    WithStyles,
    Typography,
    IconButton,
    Button
} from '@material-ui/core'
import {
    Delete as DeleteIcon,
    ChevronRight as ChevronRightIcon
} from '@material-ui/icons'
import { withSnackbar, WithSnackbarProps } from 'notistack'

import { IEmergencyContact } from 'contracts/member'
import styles from './styles'
import clsx from 'clsx'

type IProps = WithStyles<typeof styles> & WithSnackbarProps & {
    emergencyContact: IEmergencyContact
    onDelete: (id: number | string) => Promise<void>
}

type IState = {
    isTransformLeft: boolean
    isDeleting: boolean
}

class EmergencyContactItem extends Component<IProps, IState> {
    state = {
        isTransformLeft: false,
        isDeleting: false
    }

    handleDeleteBtnClick() {
        const emergencyContact = this.props.emergencyContact

        this.setState({ isDeleting: true })
        this.props.onDelete(emergencyContact.id)
            .then(() => {
                this.props.enqueueSnackbar('刪除緊急聯絡人成功！', {
                    variant: 'success'
                })
            })
            .catch(() => {
                this.props.enqueueSnackbar('刪除緊急聯絡人失敗！', {
                    variant: 'error'
                })
            })
            .finally(() => {
                this.setState({ isDeleting: false })
            })
    }

    render() {
        const {
            emergencyContact,
            classes
        } = this.props
        const {
            isTransformLeft,
            isDeleting
        } = this.state

        return (
            <div className={classes.root}>
                <div className={clsx(classes.wrapper, {
                    [classes.wrapperTransform]: isTransformLeft
                })}>
                    <div className={classes.name}>
                        <Typography>
                            {emergencyContact.name}
                        </Typography>

                        <Typography className={classes.textHint}>
                            {emergencyContact.relationship}
                        </Typography>
                    </div>

                    <div className={classes.phone}>
                        <Typography>
                            {emergencyContact.phone}
                        </Typography>

                        <Typography className={classes.textHint}>
                            聯絡電話
                    </Typography>
                    </div>

                    <IconButton onClick={() => this.setState({ isTransformLeft: !isTransformLeft})}>
                        { isTransformLeft ? <ChevronRightIcon /> : <DeleteIcon /> }
                    </IconButton>
                </div>

                <div className={classes.deleteBtnWrapper} >
                    <Button 
                        className="bg-danger text-white"
                        onClick={this.handleDeleteBtnClick.bind(this)}
                        disabled={isDeleting}
                    >
                        刪除
                    </Button>
                </div>
            </div>
        )
    }
}

export default withSnackbar(
    withStyles(styles)(EmergencyContactItem)
)