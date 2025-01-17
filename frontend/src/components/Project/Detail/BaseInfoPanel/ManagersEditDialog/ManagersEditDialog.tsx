import React, { Component } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { Dialog, DialogProps, DialogTitle, Divider, Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, Tooltip } from '@material-ui/core'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'

import { IProject } from 'contracts/project'
import DownToUpSlideTransition from 'components/Transition/DownToUpSlideTransition'
import { IMember } from 'contracts/member'

type IProps = DialogProps & {
    project: IProject
    memberSelection: IMember[]
    load?: () => Promise<void>
    onAddBtnClick: (projectId: number | string, memberId: number | string) => Promise<void>
    onRemoveBtnClick: (projectId: number | string, memberId: number | string) => Promise<void>
}

type IState = {
    tab: number
}

class ProjectManagerEditDialog extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.handleNextPage = this.handleNextPage.bind(this)
        this.handlePreviousPage = this.handlePreviousPage.bind(this)
        this.state = {
            tab: 0
        }
    }

    componentDidUpdate(prevProps: IProps) {
        if (this.props.open && !prevProps.open)
            this.props.load && this.props.load()
        else if (!this.props.open && prevProps.open)
            this.setState({ tab: 0 })
    }

    handleNextPage() {
        this.setState({ tab: 1 })
    }

    handlePreviousPage() {
        this.setState({ tab: 0 })
    }

    handleAddBtnClick(member: IMember) {
        this.props.onAddBtnClick(this.props.project.id, member.id)
    }
    handleRemoveBtnClick(member: IMember) {
        this.props.onRemoveBtnClick(this.props.project.id, member.id)
    }

    get selectableMembers() {
        const {memberSelection, project} = this.props
        return memberSelection.filter(member => {
            return project.managers ? 
                project.managers.findIndex(manager => manager.id === member.id) === -1 : 
                true
        })
    }

    render() {
        const {
            project,
            memberSelection,
            load,
            onAddBtnClick,
            onRemoveBtnClick,
            ...props
        } = this.props
        const {
            tab
        } = this.state

        return (
            <Dialog
                {...props}
                fullWidth
                maxWidth="xs"
                TransitionComponent={DownToUpSlideTransition}
            >
                <DialogTitle className="position-sticky bg-white" style={{ top: 0, zIndex: 1 }}>
                    {tab === 0 ? '專案管理者' : '新增管理者'}
                    <Box position="absolute" right={0} top="50%" style={{ transform: 'translate(-50%, -50%)' }}>
                        <Tooltip title={tab === 0 ? '前往新增列表' : '返回管理者列表'}>
                            <IconButton 
                                edge="end" 
                                onClick={tab === 0 ? this.handleNextPage : this.handlePreviousPage}
                            >
                                {tab === 0 ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                            </IconButton>
                        </Tooltip>
                    </Box>
                </DialogTitle>
                <Divider />
                <Box>
                    <SwipeableViews 
                        axis="x"
                        index={tab}
                        onChangeIndex={index => this.setState({ tab: index })}
                    >
                        <List className={tab === 0 ? '' : 'd-none'}>
                            {project.managers ? project.managers.map(manager => (
                                <ListItem key={manager.id}>
                                    <ListItemAvatar>
                                        <Avatar src={manager.avatar} />
                                    </ListItemAvatar>
                                    <ListItemText primary={manager.name} secondary={manager.email} />
                                    {project.managers!.length > 1 ? (
                                        <ListItemSecondaryAction className="pr-2">
                                            <IconButton edge="end" onClick={() => this.handleRemoveBtnClick(manager)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    ) : null}
                                </ListItem>
                            )) : null}
                        </List>

                        <List className={tab === 1 ? '' : 'd-none'}>
                            {this.selectableMembers.map(member => (
                                <ListItem key={member.id}>
                                    <ListItemAvatar>
                                        <Avatar src={member.avatar} />
                                    </ListItemAvatar>
                                    <ListItemText primary={member.name} secondary={member.email} />
                                    <ListItemSecondaryAction className="pr-2">
                                        <Box color="success.main">
                                            <IconButton edge="end" color="inherit" onClick={() => this.handleAddBtnClick(member)}>
                                                <AddIcon />
                                            </IconButton>
                                        </Box>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </SwipeableViews>
                </Box>
            </Dialog>
        )
    }
}

export default ProjectManagerEditDialog