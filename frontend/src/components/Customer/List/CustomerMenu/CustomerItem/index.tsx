import React, { Component } from 'react'
import styled from 'styled-components'
import { 
    withStyles, 
    Grid, 
    Typography, 
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Button,
    Box,
    ExpansionPanelActions,
    Paper
} from '@material-ui/core'
import {
    ExpandMore as ExpandMoreIcon,
    LocationOn as LocationOnIcon,
    Description as DescriptionIcon,
    Language as WebIcon,
    OpenInNew as OpenInNewIcon
} from '@material-ui/icons';

import styles from './styles'
import { WithStyles } from '@material-ui/styles'
import { ICustomer } from 'contracts/customer';
import { indigo } from '@material-ui/core/colors';

type IProps = {
    className?: string
    customer: ICustomer
} & WithStyles<typeof styles>

type IState = {
    expand: boolean
}

class CustomerItem extends Component<IProps, IState> {
    state = {
        expand: false
    }

    handleClose() {
        this.setState({ expand: false })
    }

    render() {
        const {
            classes,
            customer
        } = this.props
        const {
            expand
        } = this.state

        return (
            <ExpansionPanel 
                expanded={expand} 
                onChange={(event, expanded) => this.setState({ expand: expanded })}
            >
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
                <ExpansionPanelDetails className="py-3">
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Paper className="p-3 mb-3" style={{ borderLeft: '4px solid', borderLeftColor: indigo[500] }}>
                                <Grid container alignItems="center" spacing={1}>
                                    <Grid item>
                                        <WebIcon />
                                    </Grid>
                                    <Grid item>
                                        {customer.website ?
                                            <a
                                                className="d-flex"
                                                target="_blank"
                                                href={`//${customer.website}`}
                                            >
                                                <Box className="mr-1" component="span">{customer.website}</Box>
                                                <OpenInNewIcon fontSize="small"/>
                                            </a> :
                                            '無網站'}
                                    </Grid>
                                </Grid>
                            </Paper>
                            <Paper className="p-3" style={{ borderLeft: '4px solid', borderLeftColor: indigo[500] }}>
                                <Grid container alignItems="center" spacing={1}>
                                    <Grid item>
                                        <LocationOnIcon />
                                    </Grid>
                                    <Grid item>
                                        {customer.address ? 
                                            <a
                                                className="d-flex"
                                                target="_blank"
                                                href={`https://www.google.com.tw/maps/search/${customer.address}`}
                                            >
                                                <Box className="mr-1" component="span">{customer.address}</Box>
                                                <OpenInNewIcon fontSize="small"/>
                                            </a> :
                                            '無地址'}
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className="p-3 h-100">
                                <Grid container alignItems="flex-start" wrap="nowrap" spacing={1}>
                                    <Grid item>
                                        <DescriptionIcon />
                                    </Grid>
                                    <Grid item style={{ paddingTop: 6 }}>
                                        {customer.remark || '無備註'}
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </ExpansionPanelDetails>
                <ExpansionPanelActions>
                    <Button size="small" onClick={this.handleClose.bind(this)}>
                        關閉
                    </Button>
                    <Button size="small" color="primary">
                        查看更多
                    </Button>
                </ExpansionPanelActions>
            </ExpansionPanel>    
        )
    }
}

export default styled(withStyles(styles)(CustomerItem))`
    padding: 8px;
`