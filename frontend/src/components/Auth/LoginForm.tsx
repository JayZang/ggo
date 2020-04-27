import React, { Component } from 'react'
import { Box, Button, TextField, Typography } from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock';
import styled from 'styled-components';

type IProps = {
    className?: string
    description?: string
    login: (account_id:string, password: string) => Promise<void>
}

type IState = {
    account_id: string
    password: string
    logging: boolean
}

class LoginForm extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.handleInputKeyDown = this.handleInputKeyDown.bind(this)

        this.state = {
            account_id: '',
            password: '',
            logging: false
        }
    }

    handleInputKeyDown(event: React.KeyboardEvent) {
        if (!this.state.account_id || 
            !this.state.password ||
            this.state.logging ||
            event.keyCode !== 13)
            return

        this.handleLoginClick()
    }

    handleLoginClick() {
        this.setState({ logging: true })
        this.props.login(
            this.state.account_id,
            this.state.password
        ).finally(() => {
            this.setState({ logging: false })
        })
    }

    render() {
        const { className, description } = this.props
        const {logging, account_id, password} = this.state

        return (
            <Box className={className}>
                <Box className="lock-icon">
                    <LockIcon fontSize="large" />
                </Box>
                <Typography variant="h5" component="div">
                    <Box fontWeight="bold">登入</Box>
                </Typography>
                <Typography variant="body2" component="div">
                    <Box color="text.hint" fontWeight={500}>{description}</Box>
                </Typography>
                <TextField 
                    className="mt-3" 
                    label="帳號" 
                    variant="outlined" 
                    margin="dense" 
                    value={account_id}
                    onChange={event => this.setState({account_id:  event.target.value})}
                    fullWidth 
                    onKeyDown={this.handleInputKeyDown}
                    />
                <TextField
                    className="mt-3" 
                    type="password" 
                    label="密碼" 
                    variant="outlined" 
                    margin="dense" 
                    value={password} 
                    onChange={event => this.setState({password:  event.target.value})}
                    fullWidth  
                    onKeyDown={this.handleInputKeyDown}
                />
                <Button
                    className="mt-4 mb-1" 
                    variant="contained" 
                    fullWidth
                    disabled={logging || !password || !account_id}
                    onClick={this.handleLoginClick.bind(this)}
                >
                    登入
                </Button>
            </Box>
        )
    }
}

export default styled(LoginForm)`
    width: 100%;
    height: 100%;
    padding: 64px 32px 24px 32px;
    position: relative;

    & .lock-icon {
        top: -32px;
        left: 24px;
        color: #fff;
        width: 64px;
        height: 64px;
        padding: 8px;
        position: absolute;
        font-size: 32px;
        border-radius: 4px;
        background-image: linear-gradient(180deg, #66bb6a 0%, #43a047 100%);
        text-align: center;
    }
`