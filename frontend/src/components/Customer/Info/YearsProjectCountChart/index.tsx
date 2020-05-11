import React, { Component } from 'react'
import { Card, CardHeader, CardContent } from '@material-ui/core'
import moment, { Moment } from 'moment'
import ChartistGraph from 'react-chartist'
import 'chartist/dist/chartist.min.css'
import styled from 'styled-components'
import { blue } from '@material-ui/core/colors'

type IProps = {
    className?: string
    data: {
        year: number
        count: number
    }[] | null
}

class YearsProjectCountChart extends Component<IProps> {
    now: Moment

    constructor(props: IProps) {
        super(props)

        this.now = moment()
    }

   get  years() {
        const years: number[] = []
        for (let year = 2018; year <=  this.now.year(); year++)
            years.push(year)
        return years
    }

    get count() {
        const count: number[] = []

        if (!this.props.data) 
            return count

        for (let year = 2018; year <=  this.now.year(); year++) {
            const index = this.props.data.findIndex(data => data.year === year)
            count.push(index === -1 ? 0 : this.props.data[index].count)
        }
        return count
    }

    render() {
        const {
            className
        } = this.props

        return (
            <Card className={className}>
                <CardHeader title="歷年專案數量圖"/>
                <CardContent>
                    <ChartistGraph
                        type="Bar"
                        data={{
                            labels: this.years,
                            series: [
                                this.count
                            ]
                        }}
                    />
                </CardContent>
            </Card>
        )
    }
}

export default styled(YearsProjectCountChart)`
    .ct-series-a .ct-bar {
        stroke: ${blue[500]}
    }
`