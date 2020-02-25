import React, { Component } from 'react'
import { Box, Grid, Paper } from '@material-ui/core'

import AppContent from 'pages/App/Content'
import MobileHeader from 'components/MobileHeader'
import PolicyTable from 'components/IAM/Policy/Table'
import styled from 'styled-components'
import clsx from 'clsx'
import { IPolicy } from 'contracts/policy'

enum TabType {
    user = 0,
    group = 1,
    policy = 2
}

type IProps = {
    className?: string
    load: () => Promise<void>
    allPolicies: IPolicy[]
}

type IState = {
    tabIndex: TabType
}

class IamMain extends Component<IProps,IState > {
    constructor(props: IProps) {
        super(props)

        this.state = {
            tabIndex: TabType.user
        }
    }

    componentDidMount() {
        this.props.load()
    }

    render() {
        const {
            className,
            allPolicies
        } = this.props
        const {
            tabIndex
        } = this.state

        return (
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
                                    active: tabIndex === TabType.user
                                })}
                                onClick={() => this.setState({ tabIndex: TabType.user })}
                            >
                                使用者
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper 
                                className={clsx('paper-item', {
                                    active: tabIndex === TabType.group
                                })}
                                onClick={() => this.setState({ tabIndex: TabType.group })}
                            >
                                群組
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper 
                                className={clsx('paper-item', {
                                    active: tabIndex === TabType.policy
                                })}
                                onClick={() => this.setState({ tabIndex: TabType.policy })}
                            >
                                權限
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>

                <Box className="mt-4">
                    {tabIndex === TabType.user ? (
                        <Box />
                    ) : (tabIndex === TabType.group ? (
                        <Box />
                    ): (tabIndex === TabType.policy ? (
                        <PolicyTable policies={allPolicies} selectable={false} />
                    ): null))}
                </Box>
            </AppContent>
        )
    }
}

export default styled(IamMain)`
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