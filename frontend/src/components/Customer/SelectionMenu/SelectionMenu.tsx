import React, { Component } from 'react'
import {
    List,
    ListItem,
    Checkbox,
    Radio,
    ListItemAvatar,
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

import { ICustomer } from 'contracts/customer'
import styles from './styles'

type IProps = WithStyles<typeof styles> & {
    customers: ICustomer[]
    multiple?: boolean
    onChange?: (customer: ICustomer[] | ICustomer | null) => void
    maxHeight?: number
}

type IState = {
    checked: ICustomer[]
    searchInput: string
}

class MemberSelectionMenu extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            searchInput: '',
            checked: []
        }
    }

    handleToggle(customer: ICustomer) {
        const isMultiple = this.props.multiple
        const checked = this.state.checked
        const currentIndex = checked.indexOf(customer);
        let newChecked = [...checked]

        if (currentIndex === -1) {
            if (isMultiple)
                newChecked.push(customer)
            else
                newChecked = [customer]
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

    filterCustomers() {
        return this.props.customers.filter(customer => {
            return customer.company_name.includes(this.state.searchInput) ||
                customer.contact.includes(this.state.searchInput) ||
                customer.phone.includes(this.state.searchInput)
        })
    }

    render() {
        const {
            classes,
            multiple,
            maxHeight
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
                        <Grid item className="flex-grow-1">
                            <InputBase
                                fullWidth
                                placeholder="公司名稱、聯絡人名稱、聯絡電話"
                                value={searchInput}
                                onChange={(event) => this.setState({ searchInput: event.target.value })}
                            />
                        </Grid>
                    </Grid>
                </Paper>
                <List className={classes.listWrapper} style={{ maxHeight }}>
                    {this.filterCustomers().map(customer => {
                        return (
                            <ListItem button onClick={this.handleToggle.bind(this, customer)} key={customer.id}>
                                <ListItemAvatar>
                                    <img
                                        alt="客戶 Logo"
                                        src={customer.logo}
                                        style={{ width: 40 }}
                                    />
                                </ListItemAvatar>
                                <ListItemText primary={
                                    <Grid container direction="column">
                                        <Grid item>{customer.company_name}</Grid>
                                        <Grid item>
                                            <Typography className={classes.email} variant="body2">
                                                {customer.contact} / {customer.phone}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                } />
                                <ListItemSecondaryAction>
                                    {multiple ?
                                        <Checkbox
                                            edge="end"
                                            color="primary"
                                            onChange={this.handleToggle.bind(this, customer)}
                                            checked={checked.includes(customer)}
                                        /> :
                                        <Radio
                                            edge="end"
                                            color="primary"
                                            onChange={this.handleToggle.bind(this, customer)}
                                            checked={checked.includes(customer)}
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

export default withStyles(styles)(MemberSelectionMenu)