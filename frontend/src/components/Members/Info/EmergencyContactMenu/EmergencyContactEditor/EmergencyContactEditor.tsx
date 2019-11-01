import React, { Component, ChangeEvent } from 'react'
import {
    withStyles,
    WithStyles,
    Grid,
    TextField,
    Button,
    FormControl,
    FormHelperText
} from '@material-ui/core'
import { withSnackbar, WithSnackbarProps } from 'notistack'

import styles from './styles'
import { IEmergencyContact, IEmergencyContactEditDTO } from 'contracts/member'

type IProps = WithStyles<typeof styles> & WithSnackbarProps & {
    memberId: number | string
    emergencyContact?: IEmergencyContact
    onClose?: () => void
    onCreate: (id: number | string, data: IEmergencyContactEditDTO) => Promise<void>
}

type Inputs = {
    name: string
    relationship: string
    phone: string
}

type IState = {
    inputs: Inputs
    errors: Record<keyof Inputs, string>
    isSubmitting: boolean
}

class EmergencyContactEditor extends Component<IProps, IState> {
    state = {
        inputs: {
            name: '',
            relationship: '',
            phone: ''
        },
        errors: {
            name: '',
            relationship: '',
            phone: ''
        },
        isSubmitting: false
    }

    handleInputChange(propertyName: keyof Inputs, event: ChangeEvent<HTMLInputElement>) {
        const inputs: any = this.state.inputs
        inputs[propertyName] = event.target.value.trimLeft()
        this.setState({ inputs })
        this.checkInputValid(propertyName)
    }

    checkInputValid(propertyName: keyof Inputs) {
        const errors = this.state.errors
        let errMsg = ''

        switch (propertyName) {
            case 'name':
                if (!this.state.inputs.name)
                    errMsg = '姓名 不能為空'
                break

            case 'relationship':
                if (!this.state.inputs.relationship)
                    errMsg = '關係 不能為空'
                break

            case 'phone':
                if (!this.state.inputs.phone)
                    errMsg = '聯絡電話 不能為空'
                break
        }

        errors[propertyName] = errMsg
        this.setState({ errors })

        return !errMsg
    }

    handleCloseClick() {
        this.props.onClose && this.props.onClose()
    }

    handleSubmitClick() {
        let isInputsValid = true 
        Object.keys(this.state.inputs).forEach((key: any) => {
            isInputsValid = this.checkInputValid(key) && isInputsValid
        })

        if (!isInputsValid)
            return

        this.setState({ isSubmitting: true })
        this.props.onCreate( this.props.memberId, {
                ...this.state.inputs
            }
        ).then(() => {
            this.handleCloseClick()
            this.props.enqueueSnackbar('新增緊急聯絡人成功！', {
                variant: 'success'
            })
        }).catch(() => {
            this.props.enqueueSnackbar('新增緊急聯絡人失敗！', {
                variant: 'error'
            })
        }).finally(() => {
            this.clearInputs()
            this.setState({ isSubmitting: false })
        })
    }

    clearInputs() {
        const inputs: any = this.state.inputs
        Object.keys(inputs).forEach((key: any) => {
            inputs[key] = ''
        })
        this.setState({ inputs })
    }

    render() {
        const {
            classes,
            emergencyContact
        } = this.props
        const {
            inputs,
            errors,
            isSubmitting
        } = this.state

        return (
            <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <FormControl>
                            <TextField
                                label="姓名"
                                variant="outlined"
                                margin="dense"
                                value={inputs.name}
                                onChange={this.handleInputChange.bind(this, 'name')}
                                error={!!errors.name}
                            />
                            {errors.name ? (<FormHelperText className="mb-2">{errors.name}</FormHelperText>) : null}
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl>
                            <TextField
                                label="關係"
                                variant="outlined"
                                margin="dense"
                                value={inputs.relationship}
                                onChange={this.handleInputChange.bind(this, 'relationship')}
                                error={!!errors.relationship}
                            />
                            {errors.relationship ? (<FormHelperText className="mb-2">{errors.relationship}</FormHelperText>) : null}
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                label="聯絡電話"
                                variant="outlined"
                                margin="dense"
                                fullWidth
                                value={inputs.phone}
                                onChange={this.handleInputChange.bind(this, 'phone')}
                                error={!!errors.phone}
                            />
                            {errors.phone ? (<FormHelperText className="mb-2">{errors.phone}</FormHelperText>) : null}
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={2} className={classes.controlBtnsWrapper}>
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            color="default"
                            fullWidth
                            onClick={this.handleCloseClick.bind(this)}
                        >
                            關閉
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={this.handleSubmitClick.bind(this)}
                            disabled={isSubmitting}
                        >
                            { emergencyContact ? '編輯' : '新增' }
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withSnackbar(
    withStyles(styles)(EmergencyContactEditor)
)