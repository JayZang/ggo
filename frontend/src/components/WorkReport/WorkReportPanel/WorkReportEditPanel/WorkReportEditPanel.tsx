import React, { Component, ChangeEvent, FormEvent } from 'react'
import { Box, Button, TextField, InputAdornment, Paper } from '@material-ui/core'
import { withSnackbar, WithSnackbarProps } from 'notistack'
import ScheduleIcon from '@material-ui/icons/Schedule';
import BraftEditor, { EditorState } from 'braft-editor'
import 'braft-editor/dist/index.css'
import moment, { Moment } from 'moment';

import { IWorkReport } from 'contracts/workReport';
import { TimePicker, MaterialUiPickersDate } from '@material-ui/pickers';

type Fields = {
    title: string
    content: string
    start_time: Moment | null
    end_time: Moment | null
}

type IProps = WithSnackbarProps & {
    taskId: number
    workReport?: IWorkReport | null
    create: (taskId: number, data: any) => Promise<void>
    update: (taskId: number, workReportId: number, data: any) => Promise<void>
    onSubmitSuccess?: () => void
}

type IState = {
    fields: Fields
    errors: Record<keyof Fields, string>
    editorState: EditorState
    isSubmitting: boolean
}

class WorkReportEditPanel extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this)
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this)
        this.state = {
            fields: {
                title: props.workReport ? props.workReport.title : '',
                content: props.workReport ? props.workReport.content : '',
                start_time: props.workReport ? props.workReport.start_time : null,
                end_time: props.workReport ? props.workReport.end_time : null
            },
            errors: {
                title: '',
                content: '',
                start_time: '',
                end_time: ''
            },
            editorState: BraftEditor.createEditorState(props.workReport ? props.workReport.content : null),
            isSubmitting: false
        }
    }

    handleInputChange(fieldName: keyof Fields, event: ChangeEvent<HTMLInputElement>) {
        const fields: any = this.state.fields
        fields[fieldName] = event.target.value
        this.setState({ fields })
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const submit = this.props.workReport ?
            this.props.update.bind(this, this.props.taskId, this.props.workReport.id) :
            this.props.create.bind(this, this.props.taskId)
        const action = this.props.workReport  ? '編輯' : '填寫'

        this.setState({ isSubmitting : true })
        submit({
            ...this.state.fields,
            content: this.state.editorState.toHTML()
        }).then(() => {
            this.props.enqueueSnackbar(`${action}工作報告成功！`, { variant: 'success' })
            this.setState({ isSubmitting: false })
            this.props.onSubmitSuccess && this.props.onSubmitSuccess()
        }).catch(() => {
            this.props.enqueueSnackbar(`${action}工作報告失敗！`, { variant: 'error' })
            this.setState({ isSubmitting: false })
        })
    }

    isSubmitable() {
        const { fields, editorState } = this.state
        return fields.title &&
            fields.start_time &&
            fields.end_time &&
            editorState.toHTML()
    }

    handleEditorChange = (editorState: EditorState) => {
        this.setState({ editorState })
    }

    handleStartTimeChange(date: MaterialUiPickersDate) {
        const { end_time } = this.state.fields

        if (date && end_time && date.isAfter(end_time))
            return

        this.setState({ fields: {
            ...this.state.fields,
            start_time: date
        }})
    }

    handleEndTimeChange(date: MaterialUiPickersDate) {
        const { start_time } = this.state.fields

        if (start_time && date && start_time.isAfter(date))
            return

        this.setState({ fields: {
            ...this.state.fields,
            end_time: date
        }})
    }

    render() {
        const {
            fields,
            errors,
            isSubmitting
        } = this.state

        return (
            <Box>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        required
                        label="標題"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={fields.title}
                        onChange={this.handleInputChange.bind(this, 'title')}
                    />

                    <Paper className="mt-3">
                        <BraftEditor
                            value={this.state.editorState}
                            language="zh-hant"
                            onChange={this.handleEditorChange}
                            contentStyle={{
                                height: 500
                            }}
                        />
                    </Paper>

                    <Box className="d-flex mt-4" alignItems="baseline">
                        <TimePicker
                            className="mr-3"
                            required
                            label="起"
                            value={fields.start_time}
                            onChange={this.handleStartTimeChange}
                            inputVariant="outlined"
                            invalidLabel={errors.start_time}
                            minutesStep={5}
                        />

                        <TimePicker 
                            required
                            label="訖"
                            value={fields.end_time}
                            onChange={this.handleEndTimeChange}
                            inputVariant="outlined"
                            invalidLabel={errors.end_time}
                            minutesStep={5}
                        />

                        <Button 
                            className="ml-auto px-5" 
                            color="primary" 
                            variant="contained" 
                            type="submit"
                            disabled={isSubmitting || !this.isSubmitable()}
                        >
                            提交
                        </Button>
                    </Box>
                </form>
            </Box>
        )
    }
}

export default withSnackbar(WorkReportEditPanel)