import React, { Component, ChangeEvent, FormEvent } from 'react'
import ScheduleIcon from '@material-ui/icons/Schedule';
import { Box, Button, TextField, InputAdornment, Paper } from '@material-ui/core'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

type Fields = {
    title: string
    content: string
    spend_time: string
}

type IProps = {

}

type IState = {
    fields: Fields
    errors: Record<keyof Fields, string>
}

class WorkReportEditPanel extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            fields: {
                title: '',
                content: '',
                spend_time: ''
            },
            errors: {
                title: '',
                content: '',
                spend_time: ''
            }
        }
    }

    handleInputChange(fieldName: keyof Fields, event: ChangeEvent<HTMLInputElement>) {
        const fields: any = this.state.fields
        fields[fieldName] = event.target.value
        this.setState({ fields })
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        console.log(13)
    }

    handleEditorChange = (content: any, editor: any) => {
        console.log('Content was updated:', content);
      }

    render() {
        const {
            fields
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
                            value={null}
                            language="zh-hant"
                            // onChange={this.handleEditorChange}
                            // onSave={this.submitContent}
                        />
                    </Paper>

                    <Box className="d-flex" alignItems="baseline">
                        <TextField
                            className="mt-4"
                            required
                            label="花費時長"
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

                        <Button className="ml-auto px-5" color="primary" variant="contained" type="submit">
                            提交
                        </Button>
                    </Box>
                </form>
            </Box>
        )
    }
}

export default WorkReportEditPanel