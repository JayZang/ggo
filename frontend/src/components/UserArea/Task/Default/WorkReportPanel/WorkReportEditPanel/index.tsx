import React, { Component, ChangeEvent, FormEvent } from 'react'
import ScheduleIcon from '@material-ui/icons/Schedule';
import { Box, Button, TextField, InputAdornment } from '@material-ui/core'

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
                    <TextField
                        className="mt-4"
                        required
                        label="內容"
                        variant="outlined"
                        size="small"
                        fullWidth
                        multiline
                        rows={10}
                        value={fields.content}
                        onChange={this.handleInputChange.bind(this, 'content')}
                    />
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
                    <Button className="mt-4" color="primary" variant="outlined" fullWidth type="submit">
                        提交
                    </Button>
                </form>
            </Box>
        )
    }
}

export default WorkReportEditPanel