import React, { Component } from 'react'
import styled from 'styled-components'
import { Box, Paper, Typography } from '@material-ui/core'
import { WithSnackbarProps, withSnackbar } from 'notistack'
import { withRouter, RouteComponentProps } from 'react-router'

import { linkLineAccount } from 'api/auth'
import LoginForm from 'components/Auth/LoginForm'

type IProps = WithSnackbarProps & RouteComponentProps & {
    className?: string
    linkToken?: string
}

class LineAccountLinkPage extends Component<IProps> {
    async handleLogin(account_id: string, password: string) {
        await linkLineAccount(account_id, password).then(res => {
            const nonce = res.data.nonce
            window.location.href = `https://access.line.me/dialog/bot/accountLink?linkToken=${this.props.linkToken}&nonce=${nonce}`
        }).catch(() => {
            this.props.enqueueSnackbar('登入失敗，請輸入正確帳號密碼！', {
                variant: 'error'
            })
        })
    }

    render() {
        const { linkToken } = this.props

        return (
            <Box>
                <Paper className={this.props.className}>
                    {linkToken ? (
                        <LoginForm
                            description="登入以綁定 Line 帳號及系統使用者"
                            login={this.handleLogin.bind(this)}
                        />
                    ) : (
                        <Box className="p-3 text-center">
                            <Typography variant="h4" className="font-weight-bold">
                                載入頁面錯誤
                            </Typography>
                        </Box>
                    )}
                </Paper>
            </Box>
        )
    }
}

export default styled(withSnackbar(withRouter(LineAccountLinkPage)))`
    width: calc(100% - 32px);
    max-width: 600px;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    position: fixed;
`