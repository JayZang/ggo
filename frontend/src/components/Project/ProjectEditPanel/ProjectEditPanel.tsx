import React, { Component, ChangeEvent, FormEvent } from 'react'
import { Grid, FormControl, TextField, FormHelperText, Button, FormLabel, RadioGroup, FormControlLabel, Radio, Paper, Typography, Box, Stepper, Step, StepLabel, Tabs, Tab, Divider } from '@material-ui/core'
import { DatePicker, MaterialUiPickersDate } from '@material-ui/pickers'
import { withSnackbar, WithSnackbarProps } from 'notistack'
import { Moment } from 'moment'

import CustomerSelectionMenu from 'components/Customer/SelectionMenu/SelectionMenu'
import MemberSelectionMenu from 'components/Members/SelectionMenu'
import TeamSelectionMenu from 'components/Teams/SelectionMenu'
import { ProjectSrcType, IProject } from 'contracts/project'
import { ICustomer } from 'contracts/customer'
import { IMember } from 'contracts/member'
import { ITeam } from 'contracts/team'

class FieldItem extends Component<{
    label: string,
    value?: string | number,
    required?: boolean
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
                        required={this.props.required}
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
    required?: boolean
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
                        required={this.props.required}
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
    quote?: number
    source_type?: ProjectSrcType
    customer?: ICustomer | null
    managers?: IMember[] | null
    member_participants?: IMember[] | null
    team_participants?: ITeam[] | null
    remark?: string
}

type IProps = WithSnackbarProps & {
    load: () => void
    createProject: (data: any) => Promise<void>
    updateProject: (id: string | number, data: any) => Promise<void>
    onSubmitSuccess?: () => void
    customerSelections: ICustomer[] | null,
    memberSelections: IMember[] | null,
    teamSelections: ITeam[] | null,
    project?: IProject
}

type IState = {
    step: number
    paritcipantSelectionTabIndex: number
    fields: Fields
    errors: Record<keyof Fields, string>,
    isSending: boolean
}

class ProjectEditPanel extends Component<IProps, IState> {
    steps = [
        '專案資訊',
        '專案來源',
        '專案管理者',
        '專案參與者'
    ]

    constructor(props: IProps) {
        super(props)

        const project = props.project

        this.nextStep = this.nextStep.bind(this)
        this.backStep = this.backStep.bind(this)
        this.state = {
            step: 0,
            paritcipantSelectionTabIndex: 0,
            fields: {
                name: project ? project.name : undefined,
                description: project && project.description ? project.description : undefined,
                start_datetime: project ? project.start_datetime : undefined,
                deadline_datetime: project ? project.deadline_datetime : undefined,
                quote: project && project.quote ? project.quote : undefined,
                source_type: project ? project.source_type : ProjectSrcType.Internal,
                customer: project ? project.customer : null,
                managers: null,
                member_participants: null,
                team_participants: null,
                remark: project && project.remark ? project.remark : undefined,
            },
            errors: {
                name: '',
                description: '',
                start_datetime: '',
                deadline_datetime: '',
                quote: '',
                source_type: '',
                customer: '',
                managers: '',
                member_participants: '',
                team_participants: '',
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

    handleSubmit(event: FormEvent) {
        event.preventDefault()

        let isAllValid = true
        const fields = this.state.fields
        Object.keys(fields).forEach((key: any) => {
            isAllValid = this.checkField(key) && isAllValid
        })

        if (!isAllValid)
            return

        this.setState({ isSending: true })
        let submitFunction = null
        let action = ''

        if (this.props.project) {
            submitFunction = this.props.updateProject.bind(this, this.props.project.id)
            action = '編輯'
        } else {
            submitFunction = this.props.createProject
            action = '新增'
        }

        submitFunction({
            ...fields,
            customer: undefined,
            managers: undefined,
            member_participants: undefined,
            team_participants: undefined,
            customer_id: fields.customer ? fields.customer.id : undefined,
            manager_ids: fields.managers ? fields.managers.map(manager => manager.id) : undefined,
            member_participant_ids: fields.member_participants ? 
                fields.member_participants.map(member_participant => member_participant.id) : undefined,
            team_participant_ids: fields.team_participants ? 
                fields.team_participants.map(team_participant => team_participant.id) : undefined
        }).then(() => {
            this.props.enqueueSnackbar(`${action}專案/案件成功！`, {
                variant: 'success'
            })
            this.props.onSubmitSuccess && this.props.onSubmitSuccess()
        })
        .catch(() => {
            this.setState({ isSending: false })
            this.props.enqueueSnackbar(`${action}專案/案件失敗！`, {
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
                if (fields.source_type === ProjectSrcType.Customer && !fields.customer)
                    errMsg = '請選擇一位客戶'
                break
        }

        errors[propertyName] = errMsg
        this.setState({ errors })

        return !errMsg
    }

    nextStep() {
        this.setState({ step: this.state.step + 1 })
    }

    backStep() {
        this.setState({ step: this.state.step - 1 })
    }

    renderStep0() {
        const {
            fields,
            errors
        } = this.state

        return (
            <Grid container direction="column">
                    
                <FieldItem
                    required
                    label="專案名稱"
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
                    label="起始日期"
                    required
                    value={fields.start_datetime}
                    hint={errors.start_datetime}
                    onChange={this.handleDatetimeFieldChange.bind(this, 'start_datetime')}
                    maxDate={fields.deadline_datetime && fields.deadline_datetime.clone().subtract(1, 'days')}
                />

                <DatePickerFieldItem
                    label="最後期限日期"
                    required
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

                <FieldItem
                    label="備註"
                    multiline={true}
                    value={fields.remark}
                    hint={errors.remark}
                    onChange={this.handleFieldChange.bind(this, 'remark')}
                />

            </Grid>
        )
    }

    renderStep1() {
        const {
            fields,
            errors
        } = this.state

        return (
            <Paper className="p-3">
                <FormControl fullWidth>
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item>
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
                        </Grid>
                        <Grid item>
                            {(() => {
                                if (fields.source_type === ProjectSrcType.Customer && fields.customer) return (
                                    <Box
                                        p={1}
                                        marginBottom={2}
                                        borderRadius={8}
                                        border="1px solid rgba(0, 0, 0, .1)"
                                    >
                                        <Grid container direction="row" alignItems="center" wrap="nowrap">
                                            <Grid item className="mr-3">
                                                <img src={fields.customer!.logo} style={{ width: 48 }} alt="客戶 Logo" />
                                            </Grid>
                                            <Grid item>
                                                <Typography>{ fields.customer.company_name }</Typography>
                                                <Box color="text.hint">
                                                    { fields.customer.contact } / { fields.customer.phone }
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                )
                            })()}
                        </Grid>
                    </Grid>
                    
                </FormControl>

                {fields.source_type === ProjectSrcType.Customer ? 
                    <CustomerSelectionMenu
                        maxHeight={300}
                        customers={this.props.customerSelections || []}
                        onChange={this.handleCustomerSelect.bind(this)}
                    /> : 
                    null}

                {errors.source_type ? (<FormHelperText>{errors.source_type}</FormHelperText>) : null}
            </Paper>
        )
    }

    renderStep2() {
        const { fields } = this.state

        return (
            <Paper className="p-3">
                <FormLabel className="mb-3">專案管理者 *</FormLabel>
                <MemberSelectionMenu
                    defaultMembers={fields.managers || null}
                    members={this.props.memberSelections || []}
                    onChange={members => this.setState({
                        fields: {
                            ...fields,
                            managers: members && (Array.isArray(members) ? members : [members])
                        }
                    })}
                    listMaxHeight={350}
                    multiple
                />
            </Paper>
        )
    }

    renderStep3() {
        const { fields, paritcipantSelectionTabIndex } = this.state

        return (
            <Paper className="pb-3">
                <Tabs
                    value={paritcipantSelectionTabIndex}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={(event, index) => this.setState({ paritcipantSelectionTabIndex: index })}
                >
                    <Tab label="成員" className="flex-grow-1" />
                    <Tab label="團隊" className="flex-grow-1" />
                </Tabs>
                <Divider className="mb-3" />

                <Box className="px-3 pt-2">
                    {paritcipantSelectionTabIndex === 0 ? (
                        <MemberSelectionMenu
                            multiple
                            // defaultMembers={team? [team.leader!] : null}
                            members={this.props.memberSelections || []}
                            filtered={fields.managers || undefined}
                            onChange={members => this.setState({
                                fields: {
                                    ...fields,
                                    member_participants: members && (Array.isArray(members) ? members : [members])
                                }
                            })}
                            listMaxHeight={350}
                        />
                    ) : (
                        <TeamSelectionMenu 
                            multiple
                            teams={this.props.teamSelections || []}
                            onChange={teams => this.setState({
                                fields: {
                                    ...fields,
                                    team_participants: teams && (Array.isArray(teams) ? teams : [teams])
                                }
                            })}
                        />
                    )}
                </Box>
            </Paper>
        )
    }

    validateStep0() {
        const { fields } = this.state

        return  fields.name && 
            fields.start_datetime && 
            fields.start_datetime!.isValid() &&
            fields.deadline_datetime && 
            fields.deadline_datetime!.isValid()
    }

    validateStep1() {
        const { fields } = this.state

        if (fields.source_type === ProjectSrcType.Internal)
            return true
        else if (fields.source_type === ProjectSrcType.Customer)
            return !!fields.customer
        return false
    }

    validateStep2() {
        const { fields } = this.state

        return !!fields.managers && !!fields.managers.length
    }

    isAvailableToNextStep() {
        const { step } = this.state

        if (step === 0)
            return this.validateStep0()
        else if (step === 1)
            return this.validateStep1()
        else if (step === 2)
            return this.validateStep2()
        return false
    }

    render() {
        const {
            step,
            isSending
        } = this.state

        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <Box>
                    <Paper>
                        <Stepper activeStep={step} alternativeLabel>
                            {this.steps.map(label => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>    
                    </Paper>

                    <Box marginY={3}>
                        {step === 0 ? this.renderStep0() : (
                            step === 1 ? this.renderStep1() : (
                            step === 2 ? this.renderStep2() : (
                            step === 3 ? this.renderStep3() : null
                        )))}
                    </Box>

                    <Grid container spacing={2}>
                        {step !== 0 ? (
                            <Grid item className="flex-grow-1">
                                <Button 
                                    onClick={this.backStep} 
                                    variant="contained" 
                                    color="default" 
                                    fullWidth
                                >
                                    上一步
                                </Button>
                            </Grid>
                        ) : null}
                        {step < this.steps.length - 1 ? (
                            <Grid item className="flex-grow-1">
                                <Button 
                                    onClick={this.nextStep} 
                                    variant="contained" 
                                    color="default" 
                                    fullWidth
                                    disabled={!this.isAvailableToNextStep()}
                                >
                                    下一步
                                </Button>
                            </Grid>
                        ) : null}
                        {step >= this.steps.length - 1 ? (
                            <Grid item className="flex-grow-1">
                                <Button 
                                    type="submit"
                                    color="primary" 
                                    variant="contained" 
                                    fullWidth
                                    disabled={isSending}
                                >
                                    儲存
                                </Button>
                            </Grid>
                        ) : null}
                    </Grid>
                </Box>

            </form>
        )

    }
}

export default withSnackbar(ProjectEditPanel)