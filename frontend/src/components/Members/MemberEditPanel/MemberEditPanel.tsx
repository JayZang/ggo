import React, { Component, ChangeEvent } from 'react'
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import {  DatePicker, MaterialUiPickersDate } from '@material-ui/pickers'
import { withSnackbar, WithSnackbarProps }  from 'notistack'
import validator from 'validator'
import { Moment } from 'moment'

import { IMember, MemberGender } from 'contracts/member'

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    formControl: {
        marginBottom: theme.spacing(3)
    },
    storeBtn: {
        marginTop: theme.spacing(3)
    }
})

type IProps = WithStyles<typeof styles> & WithSnackbarProps & {
    member?: IMember
    createMember: (data: any) => Promise<void>
    updateMember: (id: number | string, data: any) => Promise<void>
    onSubmitSuccess?: () => void
}

type Fields = {
    name: string
    gender: MemberGender
    phone: string
    email: string
    birthday: Moment | undefined
    take_office_date: Moment | undefined
    leave_office_date: Moment | undefined
}

type IState = {
    fields: Fields
    errors: Record<keyof Fields, string>,
    isSending: boolean
}

class MemberEditPanel extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        const member = this.props.member

        this.state = {
            errors: {
                name: '',
                gender: '',
                phone: '',
                email: '',
                birthday: '',
                take_office_date: '',
                leave_office_date: ''
            },
            fields: {
                name:                          member ? member.name : '',
                gender:                       member ? member.gender : MemberGender.male,
                phone:                        member ? member.phone : '',
                email:                          member ? member.email : '',
                birthday:                    member ? member.birthday : undefined,
                take_office_date:   member ? member.take_office_date : undefined,
                leave_office_date: member ? (member.leave_office_date || undefined) : undefined
            },
            isSending: false
        }
    }

    onInputChange(propertyName: keyof Fields, event: ChangeEvent<HTMLInputElement>)  {
        const fields: any = this.state.fields
        fields[propertyName] = event.target.value.trimLeft()

        this.setState({ fields })
        this.checkFields(propertyName)
    }

    onDateInputChange(
        propertyName: keyof Pick<Fields, "birthday" | "take_office_date" | "leave_office_date">, 
        date: MaterialUiPickersDate
    ) {
        const fields: any = this.state.fields
        fields[propertyName] = date

        this.setState({ fields })
        this.checkFields(propertyName)
    }

    onSubmit() {
        let isAllValid = true

        Object.keys(this.state.fields).forEach((key: any) => {
            isAllValid = this.checkFields(key) && isAllValid
        })

        if (!isAllValid) return 
        
        if (this.props.member)
            this.processUpdateMember()
        else
            this.processCreateMember()
    }

    processCreateMember() {
        this.setState({ isSending: true })
        this.props.createMember(
            this.state.fields
        ).then(() => {
            this.setState({ isSending: false })
            this.props.enqueueSnackbar('新增成員成功！', {
                variant: 'success'
            })
            this.props.onSubmitSuccess && this.props.onSubmitSuccess()
        }).catch(() => {
            this.setState({ isSending: false })
            this.props.enqueueSnackbar('新增成員失敗！', {
                variant: 'error'
            })
        })
    }

    processUpdateMember() {
        if (!this.props.member) return 

        this.setState({ isSending: true })
        this.props.updateMember(
            this.props.member.id,
            this.state.fields
        ).then(() => {
            this.setState({ isSending: false })
            this.props.enqueueSnackbar('編輯成員成功！', {
                variant: 'success'
            })
            this.props.onSubmitSuccess && this.props.onSubmitSuccess()
        }).catch(() => {
            this.setState({ isSending: false })
            this.props.enqueueSnackbar('編輯成員失敗！', {
                variant: 'error'
            })
        })
    }

    checkFields(propertyName: keyof Fields) {
        const errors = this.state.errors
        let errMsg = ''

        switch (propertyName) {
            case 'name':
                if (!this.state.fields.name)
                    errMsg = '姓名不能空白'
                break
                
            case 'phone':
                if (!this.state.fields.phone)
                    errMsg = '電話不能空白'
                break

            case 'email':
                if (!this.state.fields.email)
                    errMsg = 'Email 不能空白'
                else if (!validator.isEmail(this.state.fields.email))
                    errMsg = 'Email 格式錯誤'
                break

            case 'birthday':
                if (!this.state.fields.birthday)
                    errMsg = '生日不能空白'
                else if (!this.state.fields.birthday.isValid())
                    errMsg = '日期格式錯誤'
                break

            case 'take_office_date':
                if (!this.state.fields.take_office_date)
                    errMsg = '到職日不能空白'
                else if (!this.state.fields.take_office_date.isValid())
                    errMsg = '日期格式錯誤'
                break

            case 'leave_office_date':
                if (!this.state.fields.leave_office_date)
                    break
                else if (!this.state.fields.leave_office_date.isValid())
                    errMsg = '日期格式錯誤'
                break
        }

        errors[propertyName] = errMsg
        this.setState({ errors })

        return !errMsg
    }

    render() {
        const fields = this.state.fields
        const errors = this.state.errors

        return (
            <div className={this.props.classes.root}>
                <FormControl className={this.props.classes.formControl}>
                    <TextField
                        error={!!errors.name} value={fields.name}
                        onChange={this.onInputChange.bind(this, 'name')}
                        label="姓名" type="text" variant="outlined" fullWidth
                        InputLabelProps={{
                            margin: 'dense',
                            style: { fontSize: 14 },
                        }}
                        InputProps={{  margin: "dense" }}
                    />
                    {errors.name ? (<FormHelperText>{errors.name}</FormHelperText>) : null}
                </FormControl>
                
                <FormControl className={this.props.classes.formControl}>
                    <FormLabel>性別</FormLabel>
                    <RadioGroup name="gender" row value={fields.gender.toString()} onChange={this.onInputChange.bind(this, 'gender')}>
                        <FormControlLabel value={MemberGender.male.toString()} control={<Radio color="primary" />} label="男" />
                        <FormControlLabel value={MemberGender.female.toString()} control={<Radio color="primary" />} label="女" />
                        <FormControlLabel value={MemberGender.other.toString()} control={<Radio color="primary" />} label="其他" />
                    </RadioGroup>
                </FormControl>

                <FormControl className={this.props.classes.formControl}>
                    <TextField
                        error={!!errors.phone} value={fields.phone}
                        onChange={this.onInputChange.bind(this, 'phone')}
                        label="電話" type="text" variant="outlined" fullWidth
                        InputLabelProps={{
                            margin: 'dense',
                            style: {  fontSize: 14  }
                        }}
                        InputProps={{  margin: "dense" }}
                    />
                    {errors.phone ? (<FormHelperText>{errors.phone}</FormHelperText>) : null}
                </FormControl>

                <FormControl className={this.props.classes.formControl}>
                    <TextField
                        error={!!errors.email} value={fields.email}
                        onChange={this.onInputChange.bind(this, 'email')}
                        label="Email" type="text" variant="outlined" fullWidth
                        InputLabelProps={{
                            margin: 'dense',
                            style: { fontSize: 14 }
                        }}
                        InputProps={{ margin: "dense" }}
                    />
                    {errors.email ? (<FormHelperText>{errors.email}</FormHelperText>) : null}
                </FormControl>

                <FormControl className={this.props.classes.formControl}>
                    <DatePicker
                        error={!!errors.birthday} value={fields.birthday || null}
                        onChange={this.onDateInputChange.bind(this, 'birthday')}
                        label="生日" format="YYYY-MM-DD" inputVariant="outlined" showTodayButton
                        InputLabelProps={{
                            margin: 'dense',
                            style: { fontSize: 14 }
                        }}
                        InputProps={{ margin: "dense" }}
                    />
                    {errors.birthday ? (<FormHelperText>{errors.birthday}</FormHelperText>) : null}
                </FormControl>

                <div style={{ display: 'flex' }}>
                    <FormControl className={this.props.classes.formControl} style={{ marginRight: 16 }}>
                        <DatePicker
                            error={!!errors.take_office_date} value={fields.take_office_date || null}
                            onChange={this.onDateInputChange.bind(this, 'take_office_date')}
                            label="到職日" format="YYYY-MM-DD" inputVariant="outlined" showTodayButton
                            InputLabelProps={{
                                margin: 'dense',
                                style: { fontSize: 14 }
                            }}
                            InputProps={{ margin: "dense" }}
                        />
                        {errors.take_office_date ? (<FormHelperText>{errors.take_office_date}</FormHelperText>) : null}
                    </FormControl>

                    <FormControl className={this.props.classes.formControl}>
                        <DatePicker
                            error={!!errors.leave_office_date} value={fields.leave_office_date || null}
                            onChange={this.onDateInputChange.bind(this, 'leave_office_date')}
                            label="離職日" format="YYYY-MM-DD" inputVariant="outlined" showTodayButton
                            InputLabelProps={{
                                margin: 'dense',
                                style: { fontSize: 14 }
                            }}
                            InputProps={{ margin: "dense" }}
                        />
                        {errors.leave_office_date ? (<FormHelperText>{errors.leave_office_date}</FormHelperText>) : null}
                    </FormControl>
                </div>

                <Button variant="contained" color="primary" 
                    disabled={this.state.isSending}
                    className={this.props.classes.storeBtn} onClick={this.onSubmit.bind(this)}
                >
                    {this.state.isSending ? '儲存中' : '儲存'}
                </Button>
            </div>
        )
    }
}

export default withSnackbar(
    withStyles(styles)(MemberEditPanel)
)