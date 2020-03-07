import React, { Component } from 'react'
import { Box, RadioGroup, FormControlLabel, Radio, TextField } from '@material-ui/core'

import accountIdValidate from 'utils/accountIdValidate'
import { Alert } from '@material-ui/lab'

enum RadiosEnum {
    default = '0',
    custom = '1'
}

type IProps = {
    defaultAccountID: string
    onChange?: (account_id: string, isDefault: boolean, isValid: boolean) => void
}

type IState = {
    account_id: string
    radioValue: RadiosEnum,
    errorMsg: string | null
}

class AccountSettingPanel extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            account_id: props.defaultAccountID,
            radioValue: RadiosEnum.default,
            errorMsg: null
        }

        props.onChange && props.onChange(
            props.defaultAccountID,
            true,
            true
        )
    }

    render() {
        const {
            radioValue,
            account_id,
            errorMsg
        } = this.state

        return (
            <Box>
                <RadioGroup className="flex-row" name="account-type-selection" value={radioValue} onChange={(event, value) => {
                    let _account_id = ''
                    let _errorMsg: string | null = null
                    let isDefault = false

                    if (value === RadiosEnum.default) {
                        _account_id = this.props.defaultAccountID
                        isDefault = true
                    } else {
                        _errorMsg = accountIdValidate(_account_id)
                        isDefault = false
                    }

                    this.setState({ 
                        radioValue: value as RadiosEnum, 
                        account_id: _account_id, 
                        errorMsg: _errorMsg 
                    })
                    this.props.onChange && this.props.onChange(account_id, isDefault, !_errorMsg)
                }}>
                    <FormControlLabel value={RadiosEnum.default} control={<Radio color="primary"/>} label="預設帳號" />
                    <FormControlLabel value={RadiosEnum.custom} control={<Radio color="primary"/>} label="自訂帳號" />
                </RadioGroup>

                <TextField 
                    variant="outlined" 
                    label="帳號" 
                    margin="dense" 
                    value={account_id} 
                    fullWidth 
                    disabled={radioValue === RadiosEnum.default}
                    onChange={event => {
                        const value =  event.target.value
                        const errorMessage = accountIdValidate(event.target.value)
                        this.setState({ 
                            account_id: value,
                            errorMsg: errorMessage
                         }, () => {
                            this.props.onChange && this.props.onChange(value, false, !errorMessage)
                         })
                    }}
                />
                
                {errorMsg && (
                    <Alert className="mt-1" severity="error">
                        {errorMsg}
                    </Alert>
                )}
            </Box>
        )
    }
}

export default AccountSettingPanel