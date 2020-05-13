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
        return this.props.data && this.props.data.length ?
            this.props.data.map(d => d.year).sort((a, b) => a - b) :
            [this.now.year()]
    }

    get count() {
        return this.props.data ?
            this.props.data.sort((a, b) => a.year - b.year).map(d => d.count) :
            []
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
                        options={{
                            axisY: {
                                onlyInteger: true
                            }
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