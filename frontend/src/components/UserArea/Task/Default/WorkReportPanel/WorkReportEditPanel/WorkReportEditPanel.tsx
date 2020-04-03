import React, { Component, ChangeEvent, FormEvent } from 'react'
import { Box, Button, TextField, InputAdornment, Paper } from '@material-ui/core'
import { withSnackbar, WithSnackbarProps } from 'notistack'
import ScheduleIcon from '@material-ui/icons/Schedule';
import BraftEditor, { EditorState } from 'braft-editor'
import 'braft-editor/dist/index.css'
import { IWorkReport } from 'contracts/workReport';

type Fields = {
    title: string
    content: string
    spend_time: string
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
        this.state = {
            fields: {
                title: props.workReport ? props.workReport.title : '',
                content: props.workReport ? props.workReport.content : '',
                spend_time: props.workReport ? props.workReport.spend_time : ''
            },
            errors: {
                title: '',
                content: '',
                spend_time: ''
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

    handleEditorChange = (editorState: EditorState) => {
        this.setState({ editorState })
    }

    render() {
        const {
            fields,
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

                    <Box className="d-flex" alignItems="baseline">
                        <TextField
                            className="mt-4"
                            required
                            label="花費時間"
                            variant="outlined"
                            size="medium"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <ScheduleIcon color="primary" />
                                    </InputAdornment>
                                )
                            }}
                            value={fields.spend_time}
                            onChange={this.handleInputChange.bind(this, 'spend_time')}
                        />

                        <Button 
                            className="ml-auto px-5" 
                            color="primary" 
                            variant="contained" 
                            type="submit"
                            disabled={isSubmitting}
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