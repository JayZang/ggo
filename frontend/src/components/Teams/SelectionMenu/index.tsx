import React, { Component } from 'react' 
import { 
    List, 
    ListItem, 
    Checkbox, 
    Radio,
    ListItemAvatar, 
    Avatar, 
    ListItemText, 
    ListItemSecondaryAction, 
    WithStyles,
    withStyles,
    Grid,
    IconButton,
    Divider,
    InputBase,
    Paper
} from '@material-ui/core'
import { 
    Search as SearchIcon ,
    Group as GroupIcon
} from '@material-ui/icons'

import { ITeam } from 'contracts/team'
import styles from './styles'

type IProps =  WithStyles<typeof styles> & {
    teams: ITeam[]
    multiple?: boolean
    defaultTeams?: ITeam[]
    onChange?: (teams: ITeam[] | ITeam | null) => void
    fetchTeam?: () => Promise<void>
}

type IState = {
    checked: ITeam[]
    searchInput: string
}

class TeamSelectionMenu extends Component<IProps, IState> {
    constructor (props: IProps) {
        super(props)

        this.state = {
            searchInput: '',
            checked: props.defaultTeams ? props.teams.filter(team =>{
                return props.defaultTeams!.findIndex(defaultTeam => defaultTeam.id === team.id) !== -1
            }) : []
        }
    }

    componentDidMount() {
        this.props.fetchTeam && !this.props.teams.length && this.props.fetchTeam()
    }

    handleToggle(team: ITeam) {
        const isMultiple = this.props.multiple
        const checked = this.state.checked
        const currentIndex = checked.indexOf(team);
        let newChecked = [...checked]

        if (currentIndex === -1) {
            if (isMultiple)
                newChecked.push(team)
            else 
                newChecked = [team]
        } else {
            newChecked.splice(currentIndex, 1);
        }

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

    filterTeams() {
        return this.props.teams.filter(team => {
            return team.name.includes(this.state.searchInput)
        })
    }

    render() {
        const {
            classes,
            multiple
        } = this.props
        const {
            checked,
            searchInput
        } = this.state

        return (
            <div className={classes.root}>
                <Paper className={classes.searchBarPaper}>
                    <Grid container spacing={1}>
                        <IconButton className={classes.searchBarIcon}>
                            <SearchIcon />
                        </IconButton>
                        <Divider orientation="vertical" />
                        <Grid item>
                            <InputBase
                                placeholder="搜尋團隊名稱"
                                value={searchInput}
                                onChange={(event) => this.setState({ searchInput: event.target.value })}
                            />
                        </Grid>
                    </Grid>
                </Paper>
                <List className={classes.listWrapper}>
                    {this.filterTeams().map(team => {
                        return (
                            <ListItem button onClick={this.handleToggle.bind(this, team)} key={team.id}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <GroupIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={
                                    <Grid container direction="column">
                                        <Grid item>{team.name}</Grid>
                                    </Grid>
                                } />
                                <ListItemSecondaryAction>
                                    {multiple ? 
                                        <Checkbox
                                            edge="end"
                                            color="primary"
                                            onChange={this.handleToggle.bind(this, team)}
                                            checked={checked.findIndex(checkedTeam => checkedTeam.id === team.id) !== -1}
                                        /> :
                                        <Radio 
                                            edge="end"
                                            color="primary"
                                            onChange={this.handleToggle.bind(this, team)}
                                            checked={checked.findIndex(checkedTeam => checkedTeam.id === team.id) !== -1}
                                        />
                                    }
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    })}
                </List>
            </div>
        )
    }
}

export default withStyles(styles)(TeamSelectionMenu)