import React, { Component } from 'react'
import { Grid, FormControl, TextField, FormHelperText, Button, FormLabel, RadioGroup, FormControlLabel, Radio, Paper } from '@material-ui/core'
import { DatePicker } from '@material-ui/pickers'

import CustomerSelectionMenu from 'components/Customer/SelectionMenu'

class FieldItem extends Component<{
    label: string,
    value?: string | number,
    type?: string
    multiline?: boolean,
    onChange?: any,
    hint?: string
}> {
    render() {
        return (
            <Grid item className="mb-3">
                <FormControl fullWidth>
                    <TextField variant="outlined" label={this.props.label}
                        value={this.props.value}
                        type={this.props.type}
                        multiline={this.props.multiline}
                        rows={5}
                        InputProps={{ margin: "dense" }}
                        InputLabelProps={{
                            margin: 'dense',
                            style: { fontSize: 14 },
                        }}
                        onChange={this.props.onChange}
                    />
                    {this.props.hint ? (<FormHelperText>{this.props.hint}</FormHelperText>) : null}
                </FormControl>
            </Grid>
        )
    }
}

class DatePickerFieldItem extends Component<{
    label: string,
    value?: string | number,
    onChange?: any,
    hint?: string
}> {
    render() {
        return (
            <Grid item className="mb-3">
                <FormControl fullWidth>
                    <DatePicker label={this.props.label}
                        format="YYYY-MM-DD" 
                        inputVariant="outlined" 
                        showTodayButton
                        value={this.props.value}
                        InputProps={{ margin: "dense" }}
                        InputLabelProps={{
                            margin: 'dense',
                            style: { fontSize: 14 },
                        }}
                        onChange={this.props.onChange}
                    />
                    {this.props.hint ? (<FormHelperText>{this.props.hint}</FormHelperText>) : null}
                </FormControl>
            </Grid>
        )
    }
}

class ProjectEditPanel extends Component {
    render() {
        return (
        <Grid container direction="column">

                <FieldItem
                    label="專案名稱"
                />

                <FieldItem
                    label="描述"
                    multiline={true}
                />

                <DatePickerFieldItem
                    label="起始日期"
                />

                <DatePickerFieldItem
                    label="最後期限日期"
                />

                <FieldItem
                    label="報價"
                />

                <Grid item className="mb-3">
                    <Paper className="p-3">
                        <FormControl fullWidth>
                            <FormLabel>來源</FormLabel>
                            <RadioGroup name="project_source" row>
                                <FormControlLabel control={<Radio color="primary" />} label="內部" />
                                <FormControlLabel control={<Radio color="primary" />} label="客戶" />
                            </RadioGroup>
                        </FormControl>

                        <CustomerSelectionMenu />
                    </Paper>
                </Grid>

                <FieldItem
                    label="備註"
                    multiline={true}
                />

                <Grid item className="mt-1">
                    <Button color="primary" variant="contained" fullWidth>儲存</Button>
                </Grid>
        </Grid>
        )
    }
}

export default ProjectEditPanel