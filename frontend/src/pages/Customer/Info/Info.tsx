import React, { Component } from 'react'
import { Grid, Box, Typography, Card } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

import AppContent from 'pages/App/Content'
import MobileHeader from 'components/MobileHeader'
import CustomerInfoCard from 'components/Customer/Info/InfoCard'
import CustomerProjectList from 'components/Customer/Info/ProjectList'
import CustomerProjectsReview from 'components/Customer/Info/ProjectReview'
import AnnualProjectCountChart from 'components/Customer/Info/AnnualProjectCountChart'
import YearsProjectCountChart from 'components/Customer/Info/YearsProjectCountChart'
import { ICustomer } from 'contracts/customer'
import styled from 'styled-components'

class LabelInfoCard extends Component<{
    title: React.ReactNode
    info: React.ReactNode
}> {
    render() {
        const {
            title,
            info
        } = this.props

        return (
            <Card>
                <Box padding={2} minHeight={120} display="flex" alignItems="center">
                    <Grid container alignItems="center">
                        <Grid item xs>
                            <Typography variant="h6" component="div">{ title }</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" component="div">{ info }</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        )
    }
}

type IProps = {
    id: number | string
    className?: string
    customer: ICustomer | null
    statistic: {
        projectTotalCount: number | null
        projectCurrentYearCount: number | null
        projectAvgSpendTime: string | null
    }
}

class CustomerInfoPage extends Component<IProps> {
    render() {
        const {
            className,
            customer,
            statistic
        } = this.props

        return (
            <AppContent
                mobileHeader={(
                    <MobileHeader
                        title="客戶資訊"
                        defaultHidden={false}
                    />
                )}
            >
                <Grid container spacing={3} className={className}>
                    <Grid item xs={4} style={{ position: 'sticky', top: 0, height: '100%' }}>
                        <Box marginBottom={1}>
                            {customer ? (
                                <Typography>
                                    {customer.company_name}
                                </Typography>
                            ) : (
                                <Skeleton width={150} height={40} />
                            )}
                        </Box>
                        <CustomerInfoCard 
                            customer={customer}
                            hiddenCompanyName
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <Box  height={40} marginBottom={1} />
                        <Grid container direction="column" spacing={3}>
                            <Grid item>
                                <Grid container spacing={3}>
                                    <Grid item xs>
                                        <LabelInfoCard 
                                            title="專案總數" 
                                            info={statistic.projectTotalCount ? statistic.projectTotalCount : (
                                                <Skeleton width={80} height={40} />
                                            )} 
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <LabelInfoCard 
                                            title="今年專案數" 
                                            info={statistic.projectCurrentYearCount ? statistic.projectCurrentYearCount : (
                                                <Skeleton width={80} height={40} />
                                            )} 
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <LabelInfoCard 
                                            title={(
                                                <Box>平均專案<br />花費時長</Box>
                                            )} 
                                            info={statistic.projectAvgSpendTime ? statistic.projectAvgSpendTime : (
                                                <Skeleton width={80} height={40} />
                                            )} 
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <CustomerProjectList 
                                    projects={null}
                                /> 
                            </Grid>
                            <Grid item>
                                <CustomerProjectsReview 
                                    projects={null}
                                /> 
                            </Grid>
                            <Grid item>
                                <AnnualProjectCountChart 
                                    data={null}
                                /> 
                            </Grid>
                            <Grid item>
                                <YearsProjectCountChart 
                                    data={null}
                                /> 
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </AppContent>
        )
    }
}

export default styled(CustomerInfoPage)`
    height: 100%;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 0
    }
`