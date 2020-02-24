import React, { Component } from 'react'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Toolbar, Typography, Checkbox, Box } from '@material-ui/core'
import { IPolicy } from 'contracts/policy'

type ITableToolbarProps = {
    numSelected: number
}

class TableToolbar extends Component<ITableToolbarProps> {
    render() {
        const {
            numSelected
        } = this.props

        return (
            <Toolbar>
                <Typography variant="h6">
                    權限列表
                </Typography>
                {numSelected > 0 ? (
                    <Box marginLeft="auto">
                        <Typography>
                            {numSelected} 個項目已選擇
                        </Typography>
                    </Box>
                ): null}
            </Toolbar>
        )
    }
}

type IPolicyTableProps = {
    policies: IPolicy[],
    selectable: boolean
}

type IPolicyTableState = {
    selectedPolicies: IPolicy[]
}

class PolicyTable extends Component<IPolicyTableProps, IPolicyTableState> {
    constructor(props: IPolicyTableProps) {
        super(props)

        this.state = {
            selectedPolicies: []
        }
    }

    handleSelectAllClick() {
        if (this.state.selectedPolicies.length !== this.props.policies.length)
            this.setState({
                selectedPolicies: [
                    ...this.props.policies
                ]
            })
        else 
            this.setState({
                selectedPolicies: []
            })
    }

    handleSelectOne(policy: IPolicy) {
        const selectedPolicies = this.state.selectedPolicies
        const index = selectedPolicies.indexOf(policy)

        if (index === -1)
            this.setState({
                selectedPolicies: [
                    ...selectedPolicies,
                    policy
                ]
            })
        else {
            selectedPolicies.splice(index, 1)
            this.setState({ selectedPolicies })
        }
    }

    render() {
        const {
            policies,
            selectable
        } = this.props
        const {
            selectedPolicies
        } = this.state

        return (
            <Paper>
                <TableContainer>
                    <TableToolbar numSelected={selectedPolicies.length} />
                    <Table>
                        <TableHead>
                            <TableRow>
                                {selectable ? (
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            indeterminate={selectedPolicies.length > 0 && selectedPolicies.length < policies.length}
                                            checked={policies.length > 0 && selectedPolicies.length === policies.length}
                                            onClick={this.handleSelectAllClick.bind(this)}
                                        />
                                    </TableCell>
                                ) : null}
                                <TableCell>名稱</TableCell>
                                <TableCell>描述</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {policies.map(policy =>{
                                const selected = selectedPolicies.indexOf(policy) !== -1

                                return  (
                                    <TableRow 
                                        hover
                                        key={policy.id}
                                        onClick={selectable ? event => this.handleSelectOne(policy) : undefined}
                                        selected={selectable ? selected : undefined}
                                    >
                                        {selectable ? (
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={selected}
                                                />
                                            </TableCell>
                                        ) : null}
                                        <TableCell>{policy.name}</TableCell>
                                        <TableCell>{policy.description}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        )
    }
}

export default PolicyTable