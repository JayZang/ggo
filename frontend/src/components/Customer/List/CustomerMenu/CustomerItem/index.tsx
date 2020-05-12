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
    Paper,
    Chip,
    Divider
} from '@material-ui/core'
import {
    ExpandMore as ExpandMoreIcon,
    LocationOn as LocationOnIcon,
    Description as DescriptionIcon,
    Language as WebIcon,
    OpenInNew as OpenInNewIcon,
    Edit as EditIcon,
    Delete as DeleteIcon
} from '@material-ui/icons';

import styles from './styles'
import { WithStyles } from '@material-ui/styles'
import { ICustomer } from 'contracts/customer';
import { indigo } from '@material-ui/core/colors';

type IProps = {
    className?: string
    customer: ICustomer
    onRemoveBtnClick?: () => void
    onEditBtnClick?: () => void
    onViewBtnClick?: () => void
} & WithStyles<typeof styles>

class CustomerItem extends Component<IProps> {
    render() {
        const {
            classes,
            customer,
            onRemoveBtnClick,
            onEditBtnClick,
            onViewBtnClick
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
                <ExpansionPanelDetails className="pb-3 pt-1">
                    <Box width="100%">
                        <Grid container spacing={1} className="mb-2">
                            {customer.industry_categories ? customer.industry_categories.map(industryCategory => (
                                <Grid item key={industryCategory.id}>
                                    <Chip
                                        label={industryCategory.name}
                                    />
                                </Grid>
                            )) : null}
                        </Grid>
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
                                            <Box whiteSpace="pre-line">
                                                {customer.remark || '無備註'}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                </ExpansionPanelDetails>
                <ExpansionPanelActions>
                    <Button size="small" color="secondary" startIcon={<DeleteIcon />}  onClick={onRemoveBtnClick}>
                        刪除
                    </Button>
                    <Divider orientation="vertical" flexItem />
                    <Button size="small" startIcon={<EditIcon />} onClick={onEditBtnClick}>
                        編輯
                    </Button>
                    <Button size="small" color="primary" onClick={onViewBtnClick}>
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