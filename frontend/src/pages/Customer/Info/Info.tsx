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
import CustomerEditDrawer from 'components/Customer/CustomerEditPanel/CustomerEditDrawer'
import { ICustomer } from 'contracts/customer'
import styled from 'styled-components'
import { IProject } from 'contracts/project'

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
    projects: IProject[] | null
    projectsOfReview: IProject[] | null
    statistic: {
        projectTotalCount: number | null
        projectCurrentYearCount: number | null
        projectAvgSpendTime: string | null
    },
    load: (id: number | string) => Promise<void>
}

type IState = {
    openEditPanel: boolean
    loaded: boolean
}

class CustomerInfoPage extends Component<IProps, IState> {
    state = {
        openEditPanel: false,
        loaded: false
    }

    async componentDidMount() {
        const { customer, id } = this.props
        if (!customer || customer.id != id)
            await this.props.load(id)
        this.setState({ loaded: true })
    }

    render() {
        const { className } = this.props
        const { loaded, openEditPanel } = this.state
        const customer = loaded ? this.props.customer : null
        const projects = loaded ? this.props.projects : null
        const projectsOfReview = loaded ? this.props.projectsOfReview : null
        const statistic = loaded ? this.props.statistic : {
            projectTotalCount: null,
            projectCurrentYearCount: null,
            projectAvgSpendTime: null,
        }

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
                                <Typography variant="h4">
                                    {customer.company_name}
                                </Typography>
                            ) : (
                                <Skeleton width={150} height={40} />
                            )}
                        </Box>
                        <CustomerInfoCard 
                            customer={customer}
                            hiddenCompanyName
                            onEditBtnClick={() => this.setState({ openEditPanel: true })}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <Box  height={40} marginBottom={1} />
                        <Grid container direction="column" spacing={3} wrap="nowrap">
                            <Grid item>
                                <Grid container spacing={3}>
                                    <Grid item xs>
                                        <LabelInfoCard 
                                            title="專案總數" 
                                            info={statistic.projectTotalCount !== null ? statistic.projectTotalCount : (
                                                <Skeleton width={80} height={40} />
                                            )} 
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <LabelInfoCard 
                                            title="今年專案數" 
                                            info={statistic.projectCurrentYearCount !== null ? statistic.projectCurrentYearCount : (
                                                <Skeleton width={80} height={40} />
                                            )} 
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <LabelInfoCard 
                                            title={(
                                                <Box>平均專案<br />花費時長</Box>
                                            )} 
                                            info={statistic.projectAvgSpendTime !== null ? statistic.projectAvgSpendTime : (
                                                <Skeleton width={80} height={40} />
                                            )} 
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <CustomerProjectList 
                                    projects={projects}
                                /> 
                            </Grid>
                            <Grid item>
                                <CustomerProjectsReview 
                                    projects={projectsOfReview}
                                /> 
                            </Grid>
                            <Grid item>
                                <AnnualProjectCountChart 
                                    data={loaded && projects ? 
                                        projects.reduce<{ year: number, count: number[] }[]>((data, project) => {
                                            if (!data[project.create_at.year()]) {
                                                const count: number[] = []
                                                count.length = 12
                                                count.fill(0)
                                                data[project.create_at.year()] = {
                                                    year: project.create_at.year(),
                                                    count
                                                }
                                            }
                                            data[project.create_at.year()].count[project.create_at.month()]++
                                            return data
                                        }, []).filter(data => data).sort((a, b) => b.year - a.year) : 
                                        null
                                    }
                                /> 
                            </Grid>
                            <Grid item>
                                <YearsProjectCountChart 
                                    data={loaded && projects ? 
                                        projects.reduce<{ year: number, count: number }[]>((data, project) => {
                                            if (!data[project.create_at.year()]) {
                                                data[project.create_at.year()] = {
                                                    year: project.create_at.year(),
                                                    count: 0
                                                }
                                            }
                                            data[project.create_at.year()].count++
                                            return data
                                        }, []).filter(data => data).sort((a, b) => b.year - a.year) : 
                                        null
                                    }
                                /> 
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                {customer && (
                    <CustomerEditDrawer
                        open={openEditPanel}
                        customer={customer}
                        onOpen={() => this.setState({ openEditPanel: true })}
                        onClose={() => this.setState({ openEditPanel: false })}
                    />
                )}
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