import React, { Component, ChangeEvent } from 'react'
import { Grid, FormControl, TextField, FormHelperText, Button, FormLabel, RadioGroup, FormControlLabel, Radio, Paper } from '@material-ui/core'
import { DatePicker, MaterialUiPickersDate } from '@material-ui/pickers'
import { withSnackbar, WithSnackbarProps } from 'notistack'

import CustomerSelectionMenu from 'components/Customer/SelectionMenu/SelectionMenu'
import { Moment } from 'moment'
import { ICustomer } from 'contracts/customer'
import { ProjectSrcType } from 'contracts/project'

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
    quote?: string
    source_type?: ProjectSrcType
    customer?: ICustomer | null
    remark?: string
}

type IProps = WithSnackbarProps & {
    load: () => void
    createProject: (data: any) => Promise<void>
    onSubmitSuccess?: () => void
    customers: ICustomer[] | null
}

type IState = {
    fields: Fields
    errors: Record<keyof Fields, string>,
    isSending: boolean
}

class ProjectEditPanel extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            fields: {
                name: undefined,
                description: undefined,
                start_datetime: undefined,
                deadline_datetime: undefined,
                quote: undefined,
                source_type: ProjectSrcType.Internal,
                customer: null,
                remark: undefined,
            },
            errors: {
                name: '',
                description: '',
                start_datetime: '',
                deadline_datetime: '',
                quote: '',
                source_type: '',
                customer: '',
                remark: '',
            },
            isSending: false
        }
    }

    componentDidMount() {
        this.props.load()
    }

    handleFieldChange(
        propertyName: keyof Fields, 
        event: ChangeEvent<HTMLInputElement>
    ) {
        const fields: any = this.state.fields
        
        if (propertyName === 'source_type')
            fields[propertyName] = parseInt(event.target.value)
        else if (propertyName === 'quote')
            fields[propertyName] = parseInt(event.target.value) || undefined
        else 
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

    handleCustomerSelect(customer: ICustomer | ICustomer[] | null) {
        if (Array.isArray(customer))
            return

        const fields = this.state.fields
        fields.customer = customer
        this.setState({ fields })
        this.checkField('source_type')
    }

    handleSubmitClick() {
        let isAllValid = true
        const fields = this.state.fields
        Object.keys(fields).forEach((key: any) => {
            isAllValid = this.checkField(key) && isAllValid
        })

        if (!isAllValid)
            return

        this.setState({ isSending: true })
        this.props.createProject({
            ...fields,
            customer: undefined,
            customer_id: fields.customer ? fields.customer.id : undefined
        }).then(() => {
            this.props.enqueueSnackbar('新增專案/案件成功！', {
                variant: 'success'
            })
            this.props.onSubmitSuccess && this.props.onSubmitSuccess()
        })
        .catch(() => {
            this.setState({ isSending: false })
            this.props.enqueueSnackbar('新增專案/案件失敗！', {
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
                    errMsg = '專案名稱 不能為空'
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
            
            case 'source_type':
                if (fields.source_type == ProjectSrcType.Customer && !fields.customer)
                    errMsg = '請選擇一位客戶'
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
                label="專案名稱 *"
                value={fields.name}
                hint={errors.name}
                onChange={this.handleFieldChange.bind(this, 'name')}
            />

            <FieldItem
                label="描述"
                value={fields.description}
                multiline={true}
                hint={errors.description}
                onChange={this.handleFieldChange.bind(this, 'description')}
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

            <FieldItem
                label="報價"
                value={fields.quote}
                hint={errors.quote}
                type="number"
                onChange={this.handleFieldChange.bind(this, 'quote')}
            />

            <Grid item className="mb-3">
                <Paper className="p-3">
                    <FormControl fullWidth>
                        <FormLabel>專案來源 *</FormLabel>
                        <RadioGroup 
                            row 
                            name="project_source" 
                            value={fields.source_type} 
                            onChange={this.handleFieldChange.bind(this, 'source_type')}
                        >
                            <FormControlLabel control={<Radio color="primary" />} label="內部" value={ProjectSrcType.Internal} />
                            <FormControlLabel control={<Radio color="primary" />} label="客戶" value={ProjectSrcType.Customer} />
                        </RadioGroup>
                    </FormControl>

                    {fields.source_type == ProjectSrcType.Customer ? 
                        <CustomerSelectionMenu 
                            maxHeight={300}
                            customers={this.props.customers || []}
                            onChange={this.handleCustomerSelect.bind(this)}
                        /> : 
                        null}

                    {errors.source_type ? (<FormHelperText>{errors.source_type}</FormHelperText>) : null}
                </Paper>
            </Grid>

            <FieldItem
                label="備註"
                multiline={true}
                value={fields.remark}
                hint={errors.remark}
                onChange={this.handleFieldChange.bind(this, 'remark')}
            />

            <Grid item className="mt-1">
                <Button 
                    color="primary" 
                    variant="contained" 
                    fullWidth
                    onClick={this.handleSubmitClick.bind(this)}
                    disabled={isSending}
                >
                    儲存
                </Button>
            </Grid>
        </Grid>
        )
    }
}

export default withSnackbar(ProjectEditPanel)