import React, { Component } from 'react'
import { Box, Paper, Grid, Typography, TextField, Button } from '@material-ui/core'
import styled from 'styled-components'
import LockIcon from '@material-ui/icons/Lock';

import bkgImg from 'assets/images/login-bkg.png'

type IProps = {
    className?: string
}

class Login extends Component<IProps> {
    render() {
        const {
            className
        } = this.props

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
                        <TextField className="mt-3" label="帳號" variant="outlined" fullWidth margin="dense"  />
                        <TextField className="mt-3" label="密碼" variant="outlined" fullWidth  margin="dense" />
                        <Button className="mt-4 mb-1" disabled variant="contained" fullWidth>登入</Button>
                    </Grid>
                    <Grid item xs={6} className="right-area" />
                </Grid>
            </Paper>
        )
    }
}

export default  styled(Login)`
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