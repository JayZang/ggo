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
    count: number[]
}

class AnnualProjectCountChart extends Component<IProps, IState> {
    now: Moment

    constructor(props: IProps) {
        super(props)

        this.now = moment()

        this.state = {
            year: props.data && props.data.length ? props.data[0].year : this.now.year(),
            count: props.data && props.data.length ? props.data[0].count : []
        }
    }

    render() {
        const {
            className
        } = this.props
        const {
            year,
            count
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
                                year: event.target.value as number,
                                count: (() => {
                                    const index = this.props.data ? this.props.data.findIndex(d => d.year === event.target.value) : -1
                                    return index === -1 ? [] : this.props.data![index].count
                                })()
                             })}
                        >
                            {(() => {
                                let menu: React.ReactNode[] = []
                                for (let year = this.now.year(); year >= 2018; year--)
                                    menu.push(<MenuItem value={year} key={year}>{year}</MenuItem>)
                                return menu
                            })()}
                        </Select>
                    )}
                />
                <CardContent>
                    <ChartistGraph
                        type="Bar"
                        data={{
                            labels: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                            series: [
                                count
                            ]
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