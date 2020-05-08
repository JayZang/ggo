import React, { Component } from 'react'
import { Box, Paper, Grid, IconButton, Divider, InputBase, List, ListItemText, Checkbox, ListItemSecondaryAction, Radio, ListItem, Chip } from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'
import { IndustryCategory } from 'contracts/customer'

type IProps = {
    listMaxHeight?: number
    industryCategories: IndustryCategory[]
    defaultIndustryCategories?: IndustryCategory[]
    multiple?: boolean
    onChange?: (industryCategories: IndustryCategory[] | IndustryCategory | null) => void
}

type IState = {
    checked: IndustryCategory[]
    searchInput: string
}

class IndustrySelectionMenu extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        const {
            industryCategories,
            defaultIndustryCategories
        } = this.props

        this.state = {
            searchInput: '',
            checked: defaultIndustryCategories ? industryCategories.filter(industryCategory => {
                return defaultIndustryCategories.findIndex(_industryCategory => _industryCategory.id === industryCategory.id) !== -1
            }) : [],
        }
    }

    get industryCategories() {
        if (!this.state.searchInput)
            return this.props.industryCategories

        return this.props.industryCategories.filter(industryCategory => 
            industryCategory.name.includes(this.state.searchInput)
        )
    }

    handleToggle(industryCategory: IndustryCategory) {
        const isMultiple = this.props.multiple
        const checked = this.state.checked
        const currentIndex = checked.indexOf(industryCategory);
        let newChecked = [...checked]

        if (currentIndex === -1) {
            if (isMultiple)
                newChecked.push(industryCategory)
            else 
                newChecked = [industryCategory]
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked
        }, () => {
            this.triggerChangeEvent()
        })
    }

    handleDelete(industryCategory: IndustryCategory) {
        const checked = this.state.checked
        const newChecked = [...checked]
        const index = checked.indexOf(industryCategory)

        if (index === -1) return

        newChecked.splice(index, 1)

        this.setState({
            checked: newChecked
        }, () => {
            this.triggerChangeEvent()
        })
    }

    triggerChangeEvent() {
        if (this.props.onChange) {
            if (this.props.multiple)
                this.props.onChange(this.state.checked)
            else if (this.state.checked.length)
                this.props.onChange(this.state.checked[0])
            else
                this.props.onChange(null)
        }
    }

    render() {
        const {
            multiple,
            listMaxHeight
        } = this.props
        const {
            checked,
            searchInput
        } = this.state

        return (
            <Box>
                <Grid container spacing={1} className="mb-1">
                    {checked.map(industryCategory => (
                        <Grid item key={industryCategory.id}>
                            <Chip
                                label={industryCategory.name}
                                onDelete={this.handleDelete.bind(this, industryCategory)}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Paper className="p-1">
                    <Grid container spacing={1}>
                        <IconButton className="p-1">
                            <SearchIcon />
                        </IconButton>
                        <Divider orientation="vertical" />
                        <Grid item>
                            <InputBase
                                placeholder="搜尋產業類型"
                                value={searchInput}
                                onChange={(event) => this.setState({ searchInput: event.target.value })}
                            />
                        </Grid>
                    </Grid>
                </Paper>
                <List style={{ maxHeight: listMaxHeight, overflowY: 'auto' }}>
                    {this.industryCategories.map(industryCategory => (
                        <ListItem 
                            button 
                            key={industryCategory.id}
                            onClick={this.handleToggle.bind(this, industryCategory)} 
                        >
                            <ListItemText primary={industryCategory.name} />
                            <ListItemSecondaryAction>
                                {multiple ? 
                                    <Checkbox
                                        edge="end"
                                        color="primary"
                                        onChange={this.handleToggle.bind(this, industryCategory)}
                                        checked={checked.includes(industryCategory)}
                                    /> :
                                    <Radio
                                        edge="end"
                                        color="primary"
                                        onChange={this.handleToggle.bind(this, industryCategory)}
                                        checked={checked.includes(industryCategory)}
                                    />
                                }
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Box>
        )
    }
}

export default IndustrySelectionMenu