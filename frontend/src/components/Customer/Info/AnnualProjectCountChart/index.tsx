import React, { Component } from 'react'
import { Card, CardHeader, Select, MenuItem, CardContent } from '@material-ui/core'
import moment, { Moment } from 'moment'
import ChartistGraph from 'react-chartist'
import 'chartist/dist/chartist.min.css'
import styled from 'styled-components'
import { blue } from '@material-ui/core/colors'

type IProps = {
    className?: string
    data: {
        year: number
        count: number[]
    }[] | null
}

type IState = {
    year: number
}

class AnnualProjectCountChart extends Component<IProps, IState> {
    now: Moment

    constructor(props: IProps) {
        super(props)

        this.now = moment()

        this.state = {
            year: this.years[0]
        }
    }

    componentDidUpdate(prevProps: IProps) {
        if (prevProps.data !== this.props.data)
            this.setState({
                year: this.years[0]
            })
    }

    get years() {
        return this.props.data && this.props.data.length ?
            this.props.data.map(d => d.year).sort((a, b) => b - a) : 
            [this.now.year()]
    }

    get count() {
        if (!this.props.data)
            return []
        const index = this.props.data ? this.props.data.findIndex(d => d.year === this.state.year) : -1
        return index === -1 ? [] : this.props.data![index].count
    }

    render() {
        const {
            className
        } = this.props
        const {
            year,
        } = this.state

        return (
            <Card className={className}>
                <CardHeader
                    title="年度專案數量圖"
                    classes={{
                        action: 'm-0 align-self-center'
                    }}
                    action={(
                        <Select
                            variant="outlined"
                            value={year}
                            inputProps={{
                                className: 'py-1'
                            }}
                            onChange={event => this.setState({ 
                                year: event.target.value as number
                             })}
                        >
                            {this.years.map(year => (
                                <MenuItem value={year} key={year}>{year}</MenuItem>
                            ))}}
                        </Select>
                    )}
                />
                <CardContent>
                    <ChartistGraph
                        type="Bar"
                        data={{
                            labels: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
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

export default styled(AnnualProjectCountChart)`
    .ct-series-a .ct-bar {
        stroke: ${blue[500]}
    }
`