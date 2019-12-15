import React, { Component } from 'react'
import styled from 'styled-components'
import { 
    withStyles, 
    Grid, 
    Typography, 
    Avatar,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Button
} from '@material-ui/core'
import {
    AccountBox as AccountBoxIcon,
    ExpandMore as ExpandMoreIcon,
    LocationOn as LocationOnIcon,
    Description as DescriptionIcon,
    Language as WebIcon,
    Edit as EditIcon,
    Delete as DeleteIcon
} from '@material-ui/icons';

import styles from './styles'
import { WithStyles } from '@material-ui/styles'
import { ICustomer } from 'contracts/customer';

type IProps = {
    className?: string
    customer: ICustomer
} & WithStyles<typeof styles>

class CustomerItem extends Component<IProps> {
    render() {
        const {
            classes,
            customer
        } = this.props

        return (
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon color="primary" />}
                >
                    <Grid item
                        className={classes.avatar}
                    >
                        <img src={customer.logo} style={{ width: '100%' }} />
                    </Grid>

                    <Grid container alignItems="center" justify="space-between">
                        <Grid item
                            className={classes.fieldsWrapper}
                        >
                            <Typography>
                                {customer.company_name}
                            </Typography>
                            <Typography
                                className={classes.fieldHint}
                            >
                                公司名稱
                            </Typography>
                        </Grid>
                        
                        <Grid item
                            className={classes.fieldsWrapper}
                        >
                            <Typography>
                                {customer.contact}
                            </Typography>
                            <Typography
                                className={classes.fieldHint}
                            >
                                聯絡人
                            </Typography>
                        </Grid>
                        
                        <Grid item
                            className={classes.fieldsWrapper}
                        >
                            <Typography>
                                {customer.phone}
                            </Typography>
                            <Typography
                                className={classes.fieldHint}
                            >
                                聯絡電話
                            </Typography>
                        </Grid>
                        
                        <Grid item
                            className={classes.fieldsWrapper}
                        >
                            <Typography>
                                {customer.email || '無'}
                            </Typography>
                            <Typography
                                className={classes.fieldHint}
                            >
                                信箱
                            </Typography>
                        </Grid>

                    </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item>
                                    <WebIcon />
                                </Grid>
                                <Grid item>
                                    {customer.website ?
                                        <a href={customer.website} target="_blank">
                                            {customer.website}
                                        </a> :
                                        '無網站'}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item>
                                    <LocationOnIcon />
                                </Grid>
                                <Grid item>
                                    {customer.address ? 
                                        <a 
                                            target="_blank"
                                            href={`https://www.google.com.tw/maps/search/${customer.address}`}
                                        >
                                            {customer.address}
                                        </a> :
                                        '無地址'}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item>
                                    <DescriptionIcon />
                                </Grid>
                                <Grid item>
                                    {customer.remark || '無備註'}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}

export default styled(withStyles(styles)(CustomerItem))`
    padding: 8px;
`