import React, { Component } from 'react'
import { Box, Grid, Paper, Typography } from '@material-ui/core'
import { Route } from 'react-router'

import AppContent from 'pages/App/Content'
import MobileHeader from 'components/MobileHeader'
import styled from 'styled-components'
import clsx from 'clsx'

type IProps = {
    className?: string
}

type IState = {
    tabIndex: number
}

class IamPage extends Component<IProps,IState > {
    constructor(props: IProps) {
        super(props)

        this.state = {
            tabIndex: 0
        }
    }

    render() {
        const {
            className
        } = this.props
        const {
            tabIndex
        } = this.state

        return (
            <Route path="/iam">
                <AppContent
                    mobileHeader={(
                        <MobileHeader
                            title="使用者與權限"
                            defaultHidden={false}
                        />
                    )}
                >
                    <Box className={className}>
                        <Grid container spacing={4}>
                            <Grid item xs={4}>
                                <Paper 
                                    className={clsx('paper-item', {
                                        active: tabIndex === 0
                                    })}
                                    onClick={() => this.setState({ tabIndex: 0 })}
                                >
                                    使用者
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper 
                                    className={clsx('paper-item', {
                                        active: tabIndex === 1
                                    })}
                                    onClick={() => this.setState({ tabIndex: 1 })}
                                >
                                    群組
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper 
                                    className={clsx('paper-item', {
                                        active: tabIndex === 2
                                    })}
                                    onClick={() => this.setState({ tabIndex: 2 })}
                                >
                                    權限
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                </AppContent>
            </Route>
        )
    }
}

export default styled(IamPage)`
    & .paper-item {
        padding: 32px 24px;
        text-align: center;
        font-size: 24px;
        font-weight: 500;
        position: relative;
        cursor: pointer;
        
        &:after {
            content: '';
            display: block;
            width: 100%;
            height: 0px;
            bottom: 0;
            left: 0;
            position: absolute;
            background-color: currentColor;
            transition: height .3s ease;
        }

        &.active {
            color: #3f51b5;

            &:after {
                height: 3px;
            }
        }
    }
`