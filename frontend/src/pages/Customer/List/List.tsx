import React, {  Component } from 'react'
import {
    Grid,
    Button,
    Paper,
    IconButton,
    InputBase,
    WithStyles,
    withStyles,
    Typography,
    Box
} from '@material-ui/core'
import {
    Add as AddIcon,
    Search as SearchIcon
} from '@material-ui/icons'

import styles from './styles'
import AppContent from 'pages/App/Content'
import MobileHeader from 'components/MobileHeader'
import CustomerMenu from 'components/Customer/List/CustomerMenu'
import CustomerEditDrawer from 'components/Customer/CustomerEditPanel/CustomerEditDrawer'
import CustomerItemSkeleton from 'components/Customer/List/CustomerMenu/CustomerItem/Skeleton'
import { ICustomer } from 'contracts/customer'

type IState = {
    openEditPanel: boolean
}

type IProps = WithStyles<typeof styles> & {
    load: () => Promise<void>
    customers: ICustomer[] | null
}

class CustomerList extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            openEditPanel: false
        }
    }

    componentDidMount() {
        !this.props.customers && this.props.load()
    }

    render() {
        const {
            classes,
            customers
        } = this.props
        const {
            openEditPanel
        } = this.state

        return (
            <AppContent
                mobileHeader={(
                    <MobileHeader
                        title="客戶列表"
                        defaultHidden={false}
                    />
                )}
            >
                <Grid container className="align-items-center mb-3">
                    <Grid item>
                        <Typography variant="h5" component="div">
                            <Box fontWeight={500}>客戶管理</Box>
                        </Typography>
                        <Paper className="px-1 mr-1 mt-1">
                            <IconButton size="small" >
                                <SearchIcon />
                            </IconButton>
                            <InputBase placeholder="搜尋客戶" />
                        </Paper>
                    </Grid>
                    <Grid item className="ml-auto">
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={() => this.setState({ openEditPanel: true })}
                        >
                            新增客戶
                        </Button>
                    </Grid>
                </Grid>

                {customers ?
                    <CustomerMenu customers={customers} /> : 
                    <CustomerItemSkeleton />}

                <CustomerEditDrawer 
                    open={openEditPanel}
                    onOpen={() => this.setState({ openEditPanel: true })}
                    onClose={() => this.setState({ openEditPanel: false })}
                />
            </AppContent>
        )
    }
}

export default withStyles(styles)(CustomerList)