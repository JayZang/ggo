import React, { Component } from 'react' 
import { 
    List, 
    ListItem, 
    Checkbox, 
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
    Paper,
    Typography
} from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'

import { IMember } from 'contracts/member'
import styles from './styles'

type IProps =  WithStyles<typeof styles> & {
    members: IMember[]
    multiple?: boolean
    onChange?: (members: IMember[] | IMember | null) => void
}

type IState = {
    checked: IMember[]
    searchInput: string
}

class MemberSelectionMenu extends Component<IProps, IState> {
    constructor (props: IProps) {
        super(props)

        this.state = {
            checked: [],
            searchInput: ''
        }
    }

    handleToggle(member: IMember) {
        const isMultiple = this.props.multiple
        const checked = this.state.checked
        const currentIndex = checked.indexOf(member);
        let newChecked = [...checked]

        if (currentIndex === -1) {
            if (isMultiple)
                newChecked.push(member)
            else 
                newChecked = [member]
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked
        })

        if (this.props.onChange) {
            if (isMultiple)
                this.props.onChange(newChecked)
            else if (newChecked.length)
                this.props.onChange(member)
            else 
                this.props.onChange(null)
        }
    }

    filterMembers() {
        return this.props.members.filter(member => {
            return member.name.includes(this.state.searchInput) ||
                member.email.includes(this.state.searchInput)
        })
    }

    render() {
        const {
            classes,
            members
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
                                placeholder="搜尋成員名稱或 Email"
                                value={searchInput}
                                onChange={(event) => this.setState({ searchInput: event.target.value })}
                            />
                        </Grid>
                    </Grid>
                </Paper>
                <List>
                    {this.filterMembers().map(member => {
                        return (
                            <ListItem button onClick={this.handleToggle.bind(this, member)} key={member.id}>
                                <ListItemAvatar>
                                    <Avatar
                                        src={member.avatar}
                                    />
                                </ListItemAvatar>
                                <ListItemText primary={
                                    <Grid container direction="column">
                                        <Grid item>{member.name}</Grid>
                                        <Grid item>
                                            <Typography className={classes.email} variant="body2">{member.email}</Typography>
                                        </Grid>
                                    </Grid>
                                } />
                                <ListItemSecondaryAction>
                                    <Checkbox
                                        edge="end"
                                        color="primary"
                                        onChange={this.handleToggle.bind(this, member)}
                                        checked={checked.includes(member)}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    })}
                </List>
            </div>
        )
    }
}

export default withStyles(styles)(MemberSelectionMenu)