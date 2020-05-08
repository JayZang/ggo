import React, { Component } from 'react'
import { Dialog, DialogProps, DialogTitle, Divider, List, ListItem, ListItemSecondaryAction, IconButton, ListItemText, Box, Grid, Collapse, InputBase, Button, Paper, Tooltip } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'

import DownToUpSlideTransition from 'components/Transition/DownToUpSlideTransition'
import { IndustryCategory } from 'contracts/customer'

type IndustryCategoryItemProps = {
    industryCategory: IndustryCategory,
    update: (id: number | string, name: string) => void
    remove: (id: number | string) => void
    disableEdit: boolean
}

class IndustryCategoryItem extends Component<IndustryCategoryItemProps, {
    name: string
}> {
    constructor(props: IndustryCategoryItemProps) {
        super(props)

        this.state = {
            name: props.industryCategory.name
        }
    }

    update() {
        if (this.props.industryCategory.name === this.state.name)
            return
        else if (!this.state.name) {
            this.setState({ name: this.props.industryCategory.name })
            return
        }

        this.props.update(
            this.props.industryCategory.id,
            this.state.name
        )
    }

    remove() {
        this.props.remove(this.props.industryCategory.id)
    }

    handleKeyPress(event: React.KeyboardEvent) {
        if (event.key === 'Enter')
            this.update()
    }

    render() {
        const { disableEdit } = this.props
        const { name } = this.state

        return (
            <ListItem>
                <InputBase 
                    fullWidth
                    value={name}
                    placeholder="輸入類型名稱"
                    onChange={event => this.setState({ name: event.target.value })}
                    onKeyPress={this.handleKeyPress.bind(this)}
                    onBlur={this.update.bind(this)}
                />
                <ListItemSecondaryAction className="pr-2">
                    <IconButton 
                        edge="end" 
                        disabled={disableEdit}
                        onClick={this.remove.bind(this)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}

type IProps = DialogProps & {
    industryCategories: IndustryCategory[]
    create: (name: string) => Promise<void>
    update: (id: number | string, name: string) => Promise<void>
    remove: (id: number | string) => Promise<void>
}

type IState = {
    inputValue: string
    openCreationBar: boolean
    isRequesting: boolean
}

class CustomerIndustryEditDialog extends Component<IProps, IState> {
    state = {
        inputValue: '',
        openCreationBar: false,
        isRequesting: false
    }

    handleCreate() {
        const { inputValue, isRequesting } = this.state

        if (!inputValue || isRequesting) return

        this.setState({ isRequesting: true }, async () => {
            await this.props.create(inputValue)
            this.setState({ isRequesting: false, inputValue: '' })
        })
    }

    handleUpdate (id: number | string, name: string) {
        const { isRequesting } = this.state

        if (isRequesting || !name) return

        this.setState({ isRequesting: true }, async () => {
            await this.props.update(id, name)
            this.setState({ isRequesting: false })
        })
    }

    handleInputKeyPress(event: React.KeyboardEvent) {
        if (event.key === 'Enter')
            this.handleCreate()
    }

    handleRemove(id: number | string) {
        const { isRequesting } = this.state

        if (isRequesting) return

        this.setState({ isRequesting: true }, async () => {
            await this.props.remove(id)
            this.setState({ isRequesting: false })
        })
    }

    render() {
        const {
            industryCategories,
            create,
            update,
            remove,
            ...restProps
        } = this.props
        const {
            inputValue,
            isRequesting,
            openCreationBar
        } = this.state

        return (
            <Dialog 
                fullWidth
                maxWidth="xs"
                {...restProps}
                TransitionComponent={DownToUpSlideTransition}
            >
                <Box position="sticky" top={0} zIndex={1} bgcolor="white">
                    <Grid container alignItems="center">
                        <Grid item xs>
                            <DialogTitle >
                                客戶產業類型
                            </DialogTitle>
                        </Grid>
                        <Grid item style={{ marginRight: 12 }}>
                            <Tooltip title={openCreationBar ? '關閉新增' : '新增'}>
                                <IconButton 
                                    onClick={() => this.setState({ openCreationBar: !openCreationBar })}
                                    style={{ 
                                        transform: openCreationBar ? 'rotate(45deg)' : '', 
                                        transition: '.3s ease' 
                                    }}
                                >
                                    <AddIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                    <Collapse in={openCreationBar}>
                        <Box paddingX={2} paddingBottom={2}>
                            <Paper className="pl-3 pr-1 py-1">
                                <Grid container>
                                    <Grid item xs>
                                        <InputBase
                                            fullWidth
                                            placeholder="輸入類型名稱"
                                            inputProps={{
                                                style: {
                                                    fontSize: 14
                                                }
                                            }}
                                            value={inputValue}
                                            onChange={event => this.setState({ inputValue: event.target.value })}
                                            onKeyPress={this.handleInputKeyPress.bind(this)}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Button 
                                            size="small"
                                            color="primary" 
                                            onClick={this.handleCreate.bind(this)}
                                            disabled={isRequesting}
                                        >
                                            新增
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Box>
                    </Collapse>
                    <Divider />
                </Box>
                <Box paddingLeft={1}>
                    <List>
                        {industryCategories.length ? (
                            industryCategories.map(industryCategory => (
                                <IndustryCategoryItem
                                    key={industryCategory.id}
                                    industryCategory={industryCategory}
                                    update={this.handleUpdate.bind(this)}
                                    remove={this.handleRemove.bind(this)}
                                    disableEdit={isRequesting}
                                />
                            ))
                        ) : (
                            <ListItem>
                                <ListItemText primary="尚無客戶產業類型" />
                            </ListItem>
                        )}
                    </List>
                </Box>
            </Dialog>
        )
    }
}

export default CustomerIndustryEditDialog