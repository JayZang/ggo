import React, { Component } from 'react'
import { Box, Paper, Grid, Typography, TextField, Button } from '@material-ui/core'
import styled from 'styled-components'
import LockIcon from '@material-ui/icons/Lock';

import bkgImg from 'assets/images/login-bkg.png'
import { WithSnackbarProps, withSnackbar } from 'notistack';

type IProps = WithSnackbarProps & {
    className?: string,
    login: (account_id:string, password: string) => Promise<void>
}

type IState = {
    account_id: string
    password: string
    logging: boolean
}

class Login extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            account_id: '',
            password: '',
            logging: false
        }
    }

    handleLoginClick() {
        this.setState({ logging: true })
        this.props.login(
            this.state.account_id,
            this.state.password
        ).then(() => {
            this.props.enqueueSnackbar(`登入成功`, {
                variant: 'success'
            })
        }).catch(() => {
            this.setState({ logging: false })
            this.props.enqueueSnackbar('登入失敗，請輸入正確帳號密碼！', {
                variant: 'error'
            })
        })
    }

    render() {
        const {
            className
        } = this.props
        const {
            account_id,
            password,
            logging
        } = this.state

        return (
            <Paper className={className}>
                <Grid container>
                    <Grid item xs={6} className="left-area">
                        <Box className="lock-icon">
                            <LockIcon fontSize="large" />
                        </Box>
                        <Typography variant="h5" component="div">
                            <Box fontWeight="bold">登入</Box>
                        </Typography>
                        <Typography variant="body2" component="div">
                            <Box color="text.hint" fontWeight={500}>登入以執行內部系統功能</Box>
                        </Typography>
                        <TextField 
                            className="mt-3" 
                            label="帳號" 
                            variant="outlined" 
                            margin="dense" 
                            value={account_id}
                            onChange={event => this.setState({account_id:  event.target.value})}
                            fullWidth 
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
                    </Grid>
                    <Grid item xs={6} className="right-area" />
                </Grid>
            </Paper>
        )
    }
}

export default  styled(withSnackbar(Login))`
    width: 100%;
    max-width: 960px;

    & .left-area {
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
    }

    & .right-area {
        background-image: url(${bkgImg});
        background-size: cover;
        height: 430px;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
    }
`