import React, { Component } from 'react'
import { Box, Grid, Paper } from '@material-ui/core'

import AppContent from 'pages/App/Content'
import MobileHeader from 'components/MobileHeader'
import PolicyTable from 'components/IAM/Policy/Table'
import GroupTable from 'components/IAM/Group/Table'
import UserTable from 'components/IAM/User/Table'
import styled from 'styled-components'
import clsx from 'clsx'
import { IPolicy } from 'contracts/policy'
import { IGroup } from 'contracts/group'
import { IUser } from 'contracts/user'

enum TabType {
    user = 0,
    group = 1,
    policy = 2
}

type IProps = {
    className?: string
    load: () => Promise<void>
    allPolicies: IPolicy[]
    allGroups: IGroup[],
    users: IUser[]
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
            allPolicies,
            allGroups,
            users
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
                        <UserTable users={users} title="使用者列表" selectable={true} />
                    ) : (tabIndex === TabType.group ? (
                        <GroupTable groups={allGroups} selectable={true} />
                    ): (tabIndex === TabType.policy ? (
                        <PolicyTable title="權限列表" policies={allPolicies} selectable={false} />
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