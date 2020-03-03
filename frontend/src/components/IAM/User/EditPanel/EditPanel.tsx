import React, { Component } from 'react'
import { WithSnackbarProps, withSnackbar } from 'notistack'
import { Grid, Box, Button, Stepper, Step, StepLabel, Paper, TableContainer, Table, TableRow, TableHead, TableCell, TableBody, Toolbar, Typography, Tooltip } from '@material-ui/core'
import RecentActorsIcon from '@material-ui/icons/RecentActors';

import GroupTable from 'components/IAM/Group/Table'
import PolicyTable from 'components/IAM/Policy/Table'
import { IGroup } from 'contracts/group'
import { IPolicy } from 'contracts/policy'
import { IUser } from 'contracts/user'

type IProps = WithSnackbarProps & {
    user: IUser | null
    totalGroups :IGroup[]
    totalPolicies: IPolicy[]
    update: (id: string | number, data: any) => Promise<void>
    onSubmitSuccess?: () => void
}

type IState = {
    activeStep: number
    selectedGroups: IGroup[]
    selectedPolicies: IPolicy[]
}

class UserEditPanel extends Component<IProps, IState> {
    steps = [
        '選擇群組及權限',
        '確認所有權限'
    ]

    constructor(props: IProps) {
        super(props)

        this.state = {
            activeStep: 0,
            selectedGroups: props.user ? props.user.groups : [],
            selectedPolicies: props.user ? props.user.policies : []
        }
    }

    nextStep() {
        this.setState({
            activeStep: this.state.activeStep + 1
        })
    }

    backStep() {
        this.setState({
            activeStep: this.state.activeStep - 1
        })
    }

    integratePolicies() {
        const user = this.props.user

        if (!user) return []

        const policies: {
            policy: IPolicy,
            source: string[]
        }[] = []
        
        this.state.selectedPolicies.forEach(policy => {
            policies[policy.id as any] = {
                policy,
                source: ['權限']
            }
        })

        this.state.selectedGroups.forEach(group => {
            group.policies.forEach(policy => {
                if (policies[policy.id as any]) {
                    policies[policy.id as any].source.push(group.name)
                    return
                } 
                policies[policy.id as any] = {
                    policy,
                    source: [group.name]
                }
            })
        })

        return policies.map(data => ({
            policy: data.policy,
            source: data.source.join('、')
        }))
    }

    handleSubmitBtnClick() {

    }

    render() {
        const {
            user,
            totalGroups,
            totalPolicies
        } = this.props
        const {
            activeStep,
            selectedGroups,
            selectedPolicies
        } = this.state

        return (
            <Box>
                <Tooltip title="帳號" placement="bottom-start">
                    <Box className="d-flex align-items-center">
                        <RecentActorsIcon color="primary" fontSize="large" className="mr-2" />
                        <Typography variant="h6">{user && user.account_id}</Typography>
                    </Box>
                </Tooltip>

                <Paper className="my-4">
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {this.steps.map(label => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Paper>

                {activeStep === 0 ? (
                    <Grid container direction="column">
                        <Grid item>
                            <GroupTable
                                groups={totalGroups}
                                selectable={true}
                                editable={false}
                                defaultSelectedGroups={selectedGroups}
                                title="選擇群組"
                                onChange={groups => this.setState({
                                    selectedGroups: groups
                                })}
                            />
                        </Grid>

                        <Grid item className="mt-4">
                            <PolicyTable
                                policies={totalPolicies}
                                selectable={true}
                                defaultSelectedPolicies={selectedPolicies}
                                title="選擇權限"
                                onChange={policies => this.setState({
                                    selectedPolicies: policies
                                })}
                            />
                        </Grid>
                    </Grid>
                ) : (activeStep === 1 ? (
                    <Paper>
                        <TableContainer>
                            <Toolbar>
                                <Typography variant="h6">所有權限</Typography>
                            </Toolbar>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>名稱</TableCell>
                                        <TableCell>描述</TableCell>
                                        <TableCell>來源</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(() => {
                                        const policiesData = this.integratePolicies()

                                        return policiesData.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={999}>無配置權限</TableCell>
                                            </TableRow>
                                        ) : policiesData.map(data => (
                                            <TableRow key={data.policy.id}>
                                                <TableCell>{data.policy.name}</TableCell>
                                                <TableCell>{data.policy.description}</TableCell>
                                                <TableCell>{data.source}</TableCell>
                                            </TableRow>
                                        ))
                                    })()}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                ) : null)}

                <Box className="mt-4">
                    <Grid container spacing={2} wrap="nowrap">
                        {activeStep === 0 ? null : (
                            <Grid item xs={12}>
                                <Button 
                                    color="default" 
                                    variant="contained" 
                                    fullWidth
                                    onClick={this.backStep.bind(this)}
                                >
                                    上一步
                                </Button>
                            </Grid>
                        )}
                        {activeStep === this.steps.length - 1 ? null : (
                            <Grid item xs={12}>
                                <Button 
                                    color="default" 
                                    variant="contained" 
                                    fullWidth
                                    onClick={this.nextStep.bind(this)}
                                >
                                    下一步
                                </Button>
                            </Grid>
                        )}
                        {activeStep === this.steps.length - 1 ? (
                            <Grid item xs={12}>
                                <Button 
                                    color="primary" 
                                    variant="contained" 
                                    fullWidth
                                    onClick={this.handleSubmitBtnClick.bind(this)}
                                >
                                    儲存
                                </Button>
                            </Grid>
                        ) : null}
                    </Grid>
                </Box>
            </Box>
        )
    }
}

export default withSnackbar(UserEditPanel)