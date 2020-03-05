import React, { Component } from 'react'
import { Box, RadioGroup, FormControlLabel, Radio, TextField } from '@material-ui/core'

enum RadiosEnum {
    default = '0',
    custom = '1'
}

type IProps = {
    defaultAccountID: string
    onChange?: (account_id: string) => void
}

type IState = {
    account_id: string
    radioValue: RadiosEnum
}

class AccountSettingPanel extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            account_id: props.defaultAccountID,
            radioValue: RadiosEnum.default
        }
    }

    render() {
        const {
            radioValue,
            account_id
        } = this.state

        return (
            <Box>
                <RadioGroup className="flex-row" name="account-type-selection" value={radioValue} onChange={(event, value) => {
                    let account_id = ''

                    if (value === RadiosEnum.default) {
                        account_id = this.props.defaultAccountID
                        this.props.onChange && this.props.onChange(
                            this.props.defaultAccountID
                        )
                    }

                    this.setState({ radioValue: value as RadiosEnum, account_id })
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
                        this.setState({ account_id: event.target.value })
                        this.props.onChange && this.props.onChange(
                            event.target.value
                        )
                    }}
                />
            </Box>
        )
    }
}

export default AccountSettingPanel