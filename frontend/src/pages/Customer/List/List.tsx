import React, {  Component } from 'react'
import {
    Grid,
    Button,
    WithStyles,
    withStyles,
    Typography,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@material-ui/core'
import {
    Add as AddIcon,
    Settings as SettingsIcon
} from '@material-ui/icons'

import styles from './styles'
import AppContent from 'pages/App/Content'
import MobileHeader from 'components/MobileHeader'
import CustomerSearchBar from 'components/SearchBar'
import CustomerMenu from 'components/Customer/List/CustomerMenu'
import CustomerRemoveHintDialog from 'components/Customer/RemoveHintDialog'
import CustomerIndustryEditDialog from 'components/Customer/IndustryEditDialog'
import CustomerEditDrawer from 'components/Customer/CustomerEditPanel/CustomerEditDrawer'
import CustomerItemSkeleton from 'components/Customer/List/CustomerMenu/CustomerItem/Skeleton'
import { ICustomer, IndustryCategory } from 'contracts/customer'
import { withRouter, RouteComponentProps } from 'react-router'

type IState = {
    searchText: string
    openEditPanel: boolean
    openCustomerRemoveHintDialog: boolean
    openIndustryEditDialog: boolean
    customerToEdit: ICustomer | null
    customerToRemove: ICustomer | null
}

type IProps = WithStyles<typeof styles> & RouteComponentProps & {
    load: () => Promise<void>
    customers: ICustomer[] | null
    industryCategories: IndustryCategory[]
}

class CustomerList extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            searchText: '',
            openEditPanel: false,
            openCustomerRemoveHintDialog: false,
            openIndustryEditDialog: false,
            customerToRemove: null,
            customerToEdit: null
        }
    }

    componentDidMount() {
        !this.props.customers && this.props.load()
    }

    async handleSearch(text: string) {
        this.setState({ searchText: text })
    }

    get customers() {
        const { customers } = this.props
        const { searchText } = this.state

        return customers && customers.filter(customer => 
            !searchText || 
            customer.company_name.toLowerCase().includes(searchText.toLowerCase()) ||
            customer.contact.toLowerCase().includes(searchText.toLowerCase())
        )
    }

    render() {
        const { 
            openEditPanel, 
            openIndustryEditDialog, 
            openCustomerRemoveHintDialog, 
            customerToRemove,
            customerToEdit
        } = this.state
        const { industryCategories } = this.props
        const customers = this.customers

        return (
            <AppContent
                mobileHeader={(
                    <MobileHeader
                        title="客戶列表"
                        defaultHidden={false}
                    />
                )}
            >
                <Grid container  alignItems="flex-end" className="mb-3">
                    <Grid item>
                        <Typography variant="h5" component="div">
                            <Box fontWeight={500}>客戶管理</Box>
                        </Typography>
                        <CustomerSearchBar 
                            className="mt-1"
                            placeholder="搜尋客戶"
                            search={this.handleSearch.bind(this)}
                        />
                    </Grid>
                    <Grid item className="ml-auto">
                        <Grid container spacing={2}>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    startIcon={<SettingsIcon />}
                                    onClick={() => this.setState({ openIndustryEditDialog: true })}
                                >
                                    客戶產業類型
                                </Button>
                            </Grid>
                            <Grid item>
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
                    </Grid>
                </Grid>

                {customers ?
                    <CustomerMenu 
                        customers={customers} 
                        onEdit={customer => this.setState({ 
                            openEditPanel: true,
                            customerToEdit: customer
                        })} 
                        onRemove={customer => this.setState({
                            openCustomerRemoveHintDialog: true,
                            customerToRemove: customer
                        })}
                        onView={customer => this.props.history.push(`${this.props.match.url}/${customer.id}`)}
                    /> : 
                    <CustomerItemSkeleton />}

                <CustomerEditDrawer
                    open={openEditPanel}
                    customer={customerToEdit}
                    industryCategories={industryCategories}
                    onOpen={() => this.setState({ openEditPanel: true })}
                    onClose={() => this.setState({ openEditPanel: false, customerToEdit: null })}
                />

                <CustomerIndustryEditDialog 
                    open={openIndustryEditDialog}
                    onClose={() => this.setState({ openIndustryEditDialog: false })}
                    industryCategories={industryCategories}
                />

                {customerToRemove ? (
                    <CustomerRemoveHintDialog
                        customer={customerToRemove}
                        open={openCustomerRemoveHintDialog}
                        onClose={() => this.setState({ openCustomerRemoveHintDialog: false })}
                    />
                ) : null}
            </AppContent>
        )
    }
}

export default withStyles(styles)(
    withRouter(CustomerList)
)