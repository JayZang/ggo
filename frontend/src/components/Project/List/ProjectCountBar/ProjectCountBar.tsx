import React, { Component } from 'react'
import { Box, Paper, Grid, WithStyles, withStyles, Typography, Avatar } from '@material-ui/core'
import {
    BusinessCenter as ProjectIcon,
    Assessment as AssessmentIcon
} from '@material-ui/icons';

import styles from './styles'
import clsx from 'clsx';

class StatisticsItem extends Component<WithStyles<typeof styles> & {
    color?: string
    className?: string
    title: string
    value: string | number
}> {
    render() {
        const {
            className,
            classes,
            color,
            title,
            value
        } = this.props

        return (
            <Box 
                style={{ color }}
                className={clsx(className, classes.statisticItemRoot)} 
            >
                <Grid container alignItems="center">
                    <Grid item className="mr-3">
                        <Box 
                            className={classes.statisticItemIconWrapper}
                        >
                            <ProjectIcon style={{ color: 'white' }} />
                        </Box>
                    </Grid>
                    <Grid item>
                        <Typography component="div" variant="inherit" className={classes.statisticItemTitle} >{ title }</Typography>
                        <Typography component="div" className={classes.statisticItemTitleValue}>{ value }</Typography>
                    </Grid>
                </Grid>
            </Box>
        )
    }
}

const StyledStatisticsItem = withStyles(styles)(StatisticsItem)

type IProps = WithStyles<typeof styles> &  {
    className?: string
    totalCount: number
    srcTypeInternalCount: number
    srcTypeCustomerCount: number
}

class ProjectCountBar extends Component<IProps> {
    render() {
        const {
            className,
            totalCount,
            srcTypeInternalCount,
            srcTypeCustomerCount
        } = this.props

        return (
            <Box className={className}>
                <Paper className="py-3 px-4">
                    <Box className="mb-1">
                        <Typography variant="h6" className="d-flex align-items-center">
                            <AssessmentIcon color="primary" className="mr-1" />
                            <span>數量統計</span>
                        </Typography>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <StyledStatisticsItem 
                                title="總數"
                                value={totalCount}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <StyledStatisticsItem 
                                className="text-success"
                                title="內部專案"
                                value={srcTypeInternalCount}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <StyledStatisticsItem 
                                className="text-warning" 
                                title="客戶來源"
                                value={srcTypeCustomerCount}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        )
    }
}

export default withStyles(styles)(ProjectCountBar)