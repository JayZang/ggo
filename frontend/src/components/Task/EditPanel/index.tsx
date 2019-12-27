import React, { Component } from 'react'
import { Grid, FormControl, TextField, FormHelperText, Button, Paper, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import { Moment } from 'moment'
import { DatePicker } from '@material-ui/pickers'

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
                        value={this.props.value || ''}
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
    label: string
    value?: string | number | Moment
    onChange?: any
    hint?: string
    minDate?: string | number | Moment
    maxDate?: string | number | Moment
}> {
    render() {
        return (
            <Grid item className="mb-3">
                <FormControl fullWidth>
                    <DatePicker label={this.props.label}
                        format="YYYY-MM-DD" 
                        inputVariant="outlined" 
                        showTodayButton
                        value={this.props.value || null}
                        InputProps={{ margin: "dense" }}
                        InputLabelProps={{
                            margin: 'dense',
                            style: { fontSize: 14 },
                        }}
                        onChange={this.props.onChange}
                        minDate={this.props.minDate}
                        maxDate={this.props.maxDate}
                    />
                    {this.props.hint ? (<FormHelperText>{this.props.hint}</FormHelperText>) : null}
                </FormControl>
            </Grid>
        )
    }
}

class TaskEditPanel extends Component {
    render() {
        return (
            <Grid container direction="column">
                
                <FieldItem
                    label="任務名稱 *"
                />
                
                <FieldItem
                    label="描述"
                    multiline
                />
                
                <DatePickerFieldItem 
                    label="起始日期 *"
                />
                
                <DatePickerFieldItem 
                    label="最後期限日期 *"
                />

                <Grid item className="mb-3">
                    <Paper className="p-3">
                        <FormControl fullWidth>
                            <Grid container justify="space-between" alignItems="center">
                                <Grid item>
                                    <FormLabel>指派對象 *</FormLabel>
                                    <RadioGroup 
                                        row 
                                        name="project_source" 
                                    >
                                        <FormControlLabel control={<Radio color="primary" />} label="單一成員"  />
                                        <FormControlLabel control={<Radio color="primary" />} label="團隊"  />
                                        <FormControlLabel control={<Radio color="primary" />} label="外包"  />
                                    </RadioGroup>
                                </Grid>
                            </Grid>
                        </FormControl>

                        {/* {errors.source_type ? (<FormHelperText>{errors.source_type}</FormHelperText>) : null} */}
                    </Paper>
                </Grid>


                <FieldItem
                    label="備註"
                    multiline
                />

                <Grid item>
                    <Button color="primary" fullWidth variant="contained">儲存</Button>
                </Grid>
            </Grid>
        )
    }
}

export default TaskEditPanel