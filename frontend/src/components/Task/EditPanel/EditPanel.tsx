import React, { Component, ChangeEvent } from 'react'
import { Grid, FormControl, TextField, FormHelperText, Button, Paper, FormLabel, RadioGroup, FormControlLabel, Radio, Box } from '@material-ui/core'
import { Moment } from 'moment'
import { DatePicker, MaterialUiPickersDate } from '@material-ui/pickers'
import { IProject } from 'contracts/project'
import { withSnackbar, WithSnackbarProps } from 'notistack'

import { TaskAssignType } from 'contracts/task'
import MemberSelectionMenu from './MemberSelectionMenu'
import TeamSelectionMenu from './TeamSelectionMenu'
import { IMember } from 'contracts/member'
import { ITeam } from 'contracts/team'

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

type Fields = {
    name?: string
    description?: string
    start_datetime?: Moment
    deadline_datetime?: Moment
    remark?: string,
    assign_type: TaskAssignType,
    assign_id?: string | number
}

type IProps = WithSnackbarProps & {
    project?: IProject
    createTask: (id: number | string, data: any) => Promise<void>
    onSubmitSuccess?: () => void
    onComponentUnMount?: () => void
}

type IState = {
    fields: Fields,
    errors: Record<keyof Fields, string>
    isSending: boolean
}

class TaskEditPanel extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            fields: {
                name: undefined,
                description: undefined,
                start_datetime: undefined,
                deadline_datetime: undefined,
                remark: undefined,
                assign_type: TaskAssignType.Member,
                assign_id: undefined
            },
            errors: {
                name: '',
                description: '',
                start_datetime: '',
                deadline_datetime: '',
                remark: '',
                assign_type: '',
                assign_id: ''
            },
            isSending: false
        }
    }

    componentWillUnmount() {
        this.props.onComponentUnMount && this.props.onComponentUnMount()
    }

    handleTextFieldChange(
        propertyName: keyof Fields, 
        event: ChangeEvent<HTMLInputElement>
    ) {
        const fields: any = this.state.fields

        fields[propertyName] = event.target.value || undefined

        this.setState({ fields })
        this.checkField(propertyName) 
    }

    handleDatetimeFieldChange(
        propertyName: keyof Pick<Fields, 'start_datetime' | 'deadline_datetime'>, 
        date: MaterialUiPickersDate
    ) {
        const fields: any = this.state.fields
        fields[propertyName] = date

        this.setState({ fields })
        this.checkField(propertyName)
    }

    handleAssignTypeChange(
        propertyName: keyof Pick<Fields, 'assign_type'>, 
        event: ChangeEvent<HTMLInputElement>
    ) {
        const fields: any = this.state.fields

        fields[propertyName] = parseInt(event.target.value)
        fields.assign_id = undefined

        this.setState({ fields })
    }

    handleMemberSelectionChange(member: IMember | IMember[] | null) {
        if (Array.isArray(member)) return

        const fields = this.state.fields
        fields.assign_id = member ? member.id : undefined
        this.setState({ fields })
        this.checkField('assign_id')
    }

    handleTeamSelectionChange(team: ITeam | ITeam[] | null) {
        if (Array.isArray(team)) return

        const fields = this.state.fields
        fields.assign_id = team ? team.id : undefined
        this.setState({ fields })
        this.checkField('assign_id')
    }

    handleSubmitClick() {
        let isAllValid = true
        const fields = this.state.fields
        Object.keys(fields).forEach((key: any) => {
            isAllValid = this.checkField(key) && isAllValid
        })

        if (!isAllValid || !this.props.project)
            return

        const action = '新增'

        this.setState({ isSending: true })
        this.props.createTask(
            this.props.project.id,
            this.state.fields
        ).then(() => {
            this.props.enqueueSnackbar(`${action}工作任務成功！`, {
                variant: 'success'
            })
            this.props.onSubmitSuccess && this.props.onSubmitSuccess()
        })
        .catch(() => {
            this.setState({ isSending: false })
            this.props.enqueueSnackbar(`${action}工作任務失敗！`, {
                variant: 'error'
            })
        })
    }

    checkField(propertyName: keyof Fields) {
        const {
            fields,
            errors
        } = this.state
        let errMsg = ''

        switch (propertyName) {
            case 'name':
                if (!this.state.fields.name)
                    errMsg = '任務名稱 不能為空'
                break
            
            case 'start_datetime':
                if (!fields.start_datetime)
                    errMsg = '起始日期 不能為空'
                else if (!fields.start_datetime.isValid())
                    errMsg = '起始日期 格式錯誤'
                break
            
            case 'deadline_datetime':
                if (!fields.deadline_datetime)
                    errMsg = '最後期限日期 不能為空'
                else if (!fields.deadline_datetime.isValid())
                    errMsg = '最後期限日期 格式錯誤'
                break
            
            case 'assign_id':
                if (!fields.assign_id)
                    errMsg = '必須選擇一個指派對象'
                break
        }

        errors[propertyName] = errMsg
        this.setState({ errors })

        return !errMsg
    }

    render() {
        const {
            fields,
            errors,
            isSending
        } = this.state

        return (
            <Grid container direction="column">
                
                <FieldItem
                    label="任務名稱 *"
                    value={fields.name}
                    hint={errors.name}
                    onChange={this.handleTextFieldChange.bind(this, 'name')}
                />
                
                <FieldItem
                    label="描述"
                    multiline
                    value={fields.description}
                    hint={errors.description}
                    onChange={this.handleTextFieldChange.bind(this, 'description')}
                />
                
                <DatePickerFieldItem 
                    label="起始日期 *"
                    value={fields.start_datetime}
                    hint={errors.start_datetime}
                    onChange={this.handleDatetimeFieldChange.bind(this, 'start_datetime')}
                    maxDate={fields.deadline_datetime && fields.deadline_datetime.clone().subtract(1, 'days')}
                />
                
                <DatePickerFieldItem 
                    label="最後期限日期 *"
                    value={fields.deadline_datetime}
                    hint={errors.deadline_datetime}
                    onChange={this.handleDatetimeFieldChange.bind(this, 'deadline_datetime')}
                    minDate={fields.start_datetime && fields.start_datetime.clone().add(1, 'days')}
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
                                        value={fields.assign_type}
                                        onChange={this.handleAssignTypeChange.bind(this, 'assign_type')}
                                    >
                                        <FormControlLabel control={<Radio color="primary" value={TaskAssignType.Member} />} label="成員"  />
                                        <FormControlLabel control={<Radio color="primary" value={TaskAssignType.Team} />} label="團隊"  />
                                        <FormControlLabel control={<Radio color="primary" value={TaskAssignType.Outsourcing} />} label="外包"  />
                                    </RadioGroup>
                                </Grid>
                            </Grid>
                        </FormControl>

                        {(() => {
                            switch (fields.assign_type) {
                                case TaskAssignType.Member:
                                    return (
                                        <Box>
                                            <MemberSelectionMenu 
                                                onChange={this.handleMemberSelectionChange.bind(this)}
                                            />
                                        </Box>
                                    )
                                
                                case TaskAssignType.Team:
                                    return (
                                        <Box>
                                            <TeamSelectionMenu 
                                                onChange={this.handleTeamSelectionChange.bind(this)}
                                            />
                                        </Box>
                                    )
                            }
                        })()}
                        {errors.assign_id ? (<FormHelperText>{errors.assign_id}</FormHelperText>) : null}
                    </Paper>
                </Grid>

                <FieldItem
                    label="備註"
                    multiline
                    value={fields.remark}
                    hint={errors.remark}
                    onChange={this.handleTextFieldChange.bind(this, 'remark')}
                />

                <Grid item>
                    <Button 
                        disabled={isSending}
                        color="primary"
                        variant="contained"
                        onClick={this.handleSubmitClick.bind(this)}
                        fullWidth 
                    >
                        儲存
                    </Button>
                </Grid>
            </Grid>
        )
    }
}

export default withSnackbar(TaskEditPanel)