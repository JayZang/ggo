import React, { Component } from 'react'
import styled from 'styled-components'
import { WithSnackbarProps, withSnackbar } from 'notistack';
import { Paper, Grid } from '@material-ui/core'

import bkgImg from 'assets/images/login-bkg.png'
import LoginForm from 'components/Auth/LoginForm'

type IProps = WithSnackbarProps & {
    className?: string,
    login: (account_id:string, password: string) => Promise<void>
}

class Login extends Component<IProps> {
    constructor(props: IProps) {
        super(props)

        this.handleLogin = this.handleLogin.bind(this)
    }

    async handleLogin(account_id: string, password: string) {
        this.props.login(account_id, password).then(() => {
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

        return (
            <Paper className={className}>
                <Grid container>
                    <Grid item xs={6} className="left-area">
                        <LoginForm 
                            description="登入以執行內部系統功能"
                            login={this.handleLogin}
                        />
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

    & .right-area {
        background-image: url(${bkgImg});
        background-size: cover;
        height: 430px;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
    }
`