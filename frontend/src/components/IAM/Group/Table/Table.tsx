import React, { Component } from 'react'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Toolbar, Typography, Checkbox, Box, Dialog, Button, Slide, IconButton, Tooltip } from '@material-ui/core'

import { IGroup } from 'contracts/group'
import PolicyTable from 'components/IAM/Policy/Table'
import GroupEditDrawer from 'components/IAM/Group/EditPanel/EditDrawer'
import { TransitionProps } from '@material-ui/core/transitions'
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { withSnackbar, WithSnackbarProps } from 'notistack'

type ITableToolbarProps = {
    numSelected: number,
    onCreateBtnClick: () => void
    onDelete: () => Promise<void>
}

type ITableToolbarState = {
    isSubmitting: boolean
}

class TableToolbar extends Component<ITableToolbarProps, ITableToolbarState> {
    constructor(props: ITableToolbarProps) {
        super(props)

        this.state= {
            isSubmitting: false
        }
    }

    handleDeleteBtnClick() {
        this.setState({ isSubmitting: true })
        this.props.onDelete().then(() => {
            this.setState({ isSubmitting: false })
        })
    }

    render() {
        const {
            numSelected
        } = this.props
        const {
            isSubmitting
        } = this.state

        return (
            <Toolbar>
                <Typography variant="h6">
                    權限群組列表
                </Typography>
                <Box marginLeft="auto">
                     {numSelected > 0 ? (
                        <Box  className="d-flex align-items-center">
                            <Typography>
                                {numSelected} 個項目已選擇
                            </Typography>
                            <Tooltip title="刪除">
                                <Button  
                                    className="ml-3 bg-danger text-white" 
                                    component="span" 
                                    startIcon={<DeleteIcon />}
                                    variant="contained"
                                    onClick={this.handleDeleteBtnClick.bind(this)}
                                    disabled={isSubmitting}
                                >
                                    刪除
                                </Button>
                            </Tooltip>
                        </Box>
                    ): (
                        <Button
                            color="primary"
                            startIcon={<AddIcon />}
                            variant="contained"
                            onClick={this.props.onCreateBtnClick}
                        >
                            新增
                        </Button>
                    )}
                </Box>
            </Toolbar>
        )
    }
}

type IGroupTableProps = WithSnackbarProps & {
    groups: IGroup[],
    selectable: boolean
    delete: (ids: string[] | number[]) => Promise<void>
}

type IGroupTableState = {
    selectedGroups: IGroup[],
    groupToDisplayPolicies: IGroup | null,
    openEditDrawer: boolean
}

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

class GroupTable extends Component<IGroupTableProps, IGroupTableState> {
    constructor(props: IGroupTableProps) {
        super(props)

        this.openEditDrawer = this.openEditDrawer.bind(this)
        this.closeEditDrawer = this.closeEditDrawer.bind(this)

        this.state = {
            selectedGroups: [],
            groupToDisplayPolicies: null,
            openEditDrawer: false
        }
    }

    handleSelectAllClick() {
        if (this.state.selectedGroups.length !== this.props.groups.length)
            this.setState({
                selectedGroups: [
                    ...this.props.groups
                ]
            })
        else 
            this.setState({
                selectedGroups: []
            })
    }

    handleSelectOne(group: IGroup) {
        const selectedGroups = this.state.selectedGroups
        const index = selectedGroups.indexOf(group)

        if (index === -1)
            this.setState({
                selectedGroups: [
                    ...selectedGroups,
                    group
                ]
            })
        else {
            selectedGroups.splice(index, 1)
            this.setState({ selectedGroups })
        }
    }

    handleDisplayGroupPoliciesBtnClick(event: React.MouseEvent<HTMLButtonElement>, group: IGroup) {
        event.stopPropagation()
        this.setState({
            groupToDisplayPolicies: group
        })
    }

    async handleDeleteBtnClick() {
        await this.props.delete(
            this.state.selectedGroups.map(group => group.id.toString())
        ).then(() => {
            this.setState({
                selectedGroups: []
            })
        }).then(() => {
            this.props.enqueueSnackbar(`刪除群組成功！`, {
                variant: 'success'
            })
        })
        .catch(() => {
            this.props.enqueueSnackbar(`刪除群組失敗！`, {
                variant: 'error'
            })
        })
    }

    openEditDrawer(group?: IGroup) {
        this.setState({
            openEditDrawer: true
        })
    }

    closeEditDrawer() {
        this.setState({
            openEditDrawer: false
        })
    }

    render() {
        const {
            groups,
            selectable,
            delete: deleteGroup
        } = this.props
        const {
            selectedGroups,
            groupToDisplayPolicies,
            openEditDrawer
        } = this.state

        return (
            <Paper className="w-100">
                <TableContainer>
                    <TableToolbar 
                        numSelected={selectedGroups.length} 
                        onCreateBtnClick={this.openEditDrawer}
                        onDelete={this.handleDeleteBtnClick.bind(this)}
                    />
                    <Table>
                        <TableHead>
                            <TableRow>
                                {selectable ? (
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            indeterminate={selectedGroups.length > 0 && selectedGroups.length < groups.length}
                                            checked={groups.length > 0 && selectedGroups.length === groups.length}
                                            onClick={this.handleSelectAllClick.bind(this)}
                                        />
                                    </TableCell>
                                ) : null}
                                <TableCell>名稱</TableCell>
                                <TableCell>描述</TableCell>
                                <TableCell>權限數量</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {groups.map(group =>{
                                const selected = selectedGroups.indexOf(group) !== -1

                                return  (
                                    <TableRow 
                                        hover
                                        key={group.id}
                                        onClick={selectable ? event => this.handleSelectOne(group) : undefined}
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
                                        <TableCell>{group.name}</TableCell>
                                        <TableCell>{group.description}</TableCell>
                                        <TableCell>{group.policies.length}</TableCell>
                                        <TableCell align="right">
                                            <Button 
                                                color="primary"
                                                onClick={event => this.handleDisplayGroupPoliciesBtnClick(event, group)}
                                            >
                                                查看權限
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Dialog
                    open={groupToDisplayPolicies !== null}
                    onClose={() => this.setState({ groupToDisplayPolicies: null })}
                    TransitionComponent={Transition}
                    fullWidth
                >
                    <PolicyTable 
                        title={`${groupToDisplayPolicies && groupToDisplayPolicies.name} - 權限列表`}
                        policies={groupToDisplayPolicies ? groupToDisplayPolicies.policies : []} 
                        selectable={false} 
                    />
                </Dialog>

                <GroupEditDrawer 
                    open={openEditDrawer}
                    onOpen={this.openEditDrawer}
                    onClose={this.closeEditDrawer}
                />

            </Paper>
        )
    }
}

export default withSnackbar(GroupTable)