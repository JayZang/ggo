import React, { Component } from 'react'
import { ViewSwitcher } from '@devexpress/dx-react-scheduler'
import { MenuItem, Select } from '@material-ui/core'

export default class CustomViewSwitcher extends Component<ViewSwitcher.SwitcherProps> {
    render() {
        const {
            currentView,
            availableViews,
            onChange
        } = this.props

        return (
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={currentView.name}
                onChange={event => onChange(event.target.value as string)}
                variant="outlined"
                inputProps={{
                    className: "py-2"
                }}
            >
                {availableViews.map(view => (
                    <MenuItem value={view.name} key={view.name}>
                        {(() => {
                            if (view.displayName === 'Month')
                                return '月'
                            else if (view.displayName === 'Week')
                                return '周'
                           else
                                return '日'
                        })()}
                    </MenuItem>
                ))}
            </Select>
        )
    }
}