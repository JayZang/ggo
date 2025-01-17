import React, { Component } from 'react'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Toolbar, Typography, Checkbox, Box, Dialog, Button, Slide, Tooltip } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { withSnackbar, WithSnackbarProps } from 'notistack'

import { IGroup } from 'contracts/group'
import PolicyTable from 'components/IAM/Policy/Table'
import GroupEditDrawer from 'components/IAM/Group/EditPanel/EditDrawer'
import DownToUpSlideTransition from 'components/Transition/DownToUpSlideTransition'

type ITableToolbarProps = {
    title: string
    numSelected: number,
    hideBtn: boolean
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
            title,
            numSelected,
            hideBtn
        } = this.props
        const {
            isSubmitting
        } = this.state

        return (
            <Toolbar>
                <Typography variant="h6">
                    {title}
                </Typography>
                <Box marginLeft="auto">
                     {numSelected > 0 ? (
                        <Box  className="d-flex align-items-center">
                            <Typography>
                                {numSelected} 個項目已選擇
                            </Typography>
                            {hideBtn ? null : (
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
                            )}
                        </Box>
                    ): (hideBtn ? null : (
                        <Button
                            color="primary"
                            startIcon={<AddIcon />}
                            variant="contained"
                            onClick={this.props.onCreateBtnClick}
                        >
                            新增
                        </Button>
                    ))}
                </Box>
            </Toolbar>
        )
    }
}

type IGroupTableProps = WithSnackbarProps & {
    title?: string
    groups: IGroup[],
    selectable: boolean
    editable: boolean
    defaultSelectedGroups?: IGroup[]
    delete: (ids: string[] | number[]) => Promise<void>
    onChange?: (groups: IGroup[]) => void
}

type IGroupTableState = {
    selectedGroups: IGroup[],
    groupToDisplayPolicies: IGroup | null,
    groupToUpdate: IGroup | null,
    openEditDrawer: boolean
}

class GroupTable extends Component<IGroupTableProps, IGroupTableState> {
    constructor(props: IGroupTableProps) {
        super(props)

        this.openEditDrawer = this.openEditDrawer.bind(this)
        this.closeEditDrawer = this.closeEditDrawer.bind(this)

        const {
            groups,
            defaultSelectedGroups
        } = this.props

        this.state = {
            selectedGroups: defaultSelectedGroups ? groups.filter(group => {
                return defaultSelectedGroups.findIndex(_group => _group.id === group.id) !== -1
            }) : [],
            groupToDisplayPolicies: null,
            groupToUpdate: null,
            openEditDrawer: false
        }
    }

    handleSelectAllClick() {
        let selectedGroups = this.state.selectedGroups

        if (selectedGroups.length !== this.props.groups.length)
            selectedGroups = [
                ...this.props.groups
            ]
        else 
            selectedGroups = []

        this.setState({ selectedGroups })
        this.props.onChange && this.props.onChange(selectedGroups)
    }

    handleSelectOne(group: IGroup) {
        let selectedGroups = this.state.selectedGroups
        const index = selectedGroups.indexOf(group)

        if (index === -1)
            selectedGroups.push(group)
        else
            selectedGroups.splice(index, 1)

        this.setState({ selectedGroups })
        this.props.onChange && this.props.onChange(selectedGroups)
    }

    handleDisplayGroupPoliciesBtnClick(event: React.MouseEvent<HTMLButtonElement>, group: IGroup) {
        event.stopPropagation()
        this.setState({
            groupToDisplayPolicies: group
        })
    }

    handleUpdateGroupBtnClick(event: React.MouseEvent<HTMLButtonElement>, group: IGroup) {
        event.stopPropagation()
        this.openEditDrawer(group)
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
            openEditDrawer: true,
            groupToUpdate: group || null
        })
    }

    closeEditDrawer() {
        this.setState({
            openEditDrawer: false,
            groupToUpdate: null
        })
    }

    render() {
        const {
            title,
            groups,
            selectable,
            editable
        } = this.props
        const {
            selectedGroups,
            groupToDisplayPolicies,
            groupToUpdate,
            openEditDrawer
        } = this.state

        return (
            <Paper className="w-100">
                <TableContainer>
                    {title && (
                        <TableToolbar 
                            title={title}
                            hideBtn={!editable}
                            numSelected={selectedGroups.length} 
                            onCreateBtnClick={() => this.openEditDrawer()}
                            onDelete={this.handleDeleteBtnClick.bind(this)}
                        />
                    )}
                    
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
                                {editable ?  <TableCell>權限數量</TableCell> : null}
                                {editable ?  <TableCell></TableCell> : null}
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
                                        {editable ? <TableCell>{group.policies && group.policies.length}</TableCell> : null}
                                        {editable ? (
                                            <TableCell align="right">
                                                <Button 
                                                    color="primary"
                                                    onClick={event => this.handleDisplayGroupPoliciesBtnClick(event, group)}
                                                >
                                                    查看權限
                                                </Button>
                                                <Button 
                                                    color="primary"
                                                    onClick={event => this.handleUpdateGroupBtnClick(event, group)}
                                                >
                                                    編輯
                                                </Button>
                                            </TableCell>
                                        ) : null}
                                    </TableRow>
                                )
                            })}
                            {groups.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={999} align="center">無群組資料</TableCell>
                                </TableRow>
                            ) : null}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Dialog
                    open={groupToDisplayPolicies !== null}
                    onClose={() => this.setState({ groupToDisplayPolicies: null })}
                    TransitionComponent={DownToUpSlideTransition}
                    fullWidth
                >
                    <PolicyTable 
                        title={`${groupToDisplayPolicies && groupToDisplayPolicies.name} - 權限列表`}
                        policies={groupToDisplayPolicies && groupToDisplayPolicies.policies ? groupToDisplayPolicies.policies : []} 
                        selectable={false} 
                    />
                </Dialog>

                <GroupEditDrawer 
                    open={openEditDrawer}
                    onOpen={this.openEditDrawer}
                    onClose={this.closeEditDrawer}
                    group={groupToUpdate || undefined}
                />

            </Paper>
        )
    }
}

export default withSnackbar(GroupTable)