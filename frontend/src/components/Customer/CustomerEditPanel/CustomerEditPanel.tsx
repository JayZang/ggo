import React, { Component, ChangeEvent } from 'react'
import { Grid, FormControl, TextField, Button, Avatar, WithStyles, withStyles, Badge, Tooltip, FormHelperText } from '@material-ui/core'
import {
    AccountBox as AccountBoxIcon,
    Edit as EditIcon
} from '@material-ui/icons'
import validator from 'validator'
import { withSnackbar, WithSnackbarProps } from 'notistack'

import styles from './styles'
import fileValidate from 'utils/fileValidate'

class FieldItem extends Component<{
    label: string,
    value?: string|number,
    type?: string
    multiline?: boolean,
    onChange?: any,
    hint?: string
}> {
    render() {
        return (
            <Grid item className="mb-3">
                <FormControl fullWidth>
                    <TextField variant="outlined"  label={this.props.label}
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

type IProps = WithStyles<typeof styles> & WithSnackbarProps & {
    createCustomer: (data: any) => Promise<void>
    onSubmitSuccess?: () => void
}

type Fields = {
    logo?: File
    company_name?: string
    contact?: string
    phone?: string
    email?: string
    website?: string
    address?: string
    remark?: string
}

type IState = {
    logo: string | null
    fields: Fields
    errors: Record<keyof Fields, string>
    isSending: boolean
}

class CustomerEditPanel extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            logo: null,
            fields: {
                logo: undefined,
                company_name: undefined,
                contact: undefined,
                phone: undefined,
                email: undefined,
                website: undefined,
                address: undefined,
                remark: undefined,
            },
            errors: {
                logo: '',
                company_name: '',
                contact: '',
                phone: '',
                email: '',
                website: '',
                address: '',
                remark: '',
            },
            isSending: false
        }
    }

    handleFieldChange(propertyName: keyof Fields, event: ChangeEvent<HTMLInputElement>) {
        const fields: any = this.state.fields
        fields[propertyName] = event.target.value.trim() || undefined

        this.setState({ fields })
        this.checkFields(propertyName)
    }

    handleLogoChange(event: ChangeEvent<HTMLInputElement>) {
        const fields = this.state.fields

        if (fileValidate(event.target, ['.jpg', '.jpeg', '.png']))
            fields.logo = event.target.files ? event.target.files[0] : undefined
        else
            fields.logo = undefined

        this.setState({ 
            fields,
            logo: fields.logo ? URL.createObjectURL(fields.logo) : null
         })
    }

    checkFields(propertyName: keyof Fields) {
        const errors = this.state.errors
        let errMsg = ''

        switch (propertyName) {
            case 'company_name':
            case 'contact':
            case 'phone':
                if (!this.state.fields[propertyName])
                    errMsg = '不能為空'
                break

            case 'email':
                if (this.state.fields.email &&
                    !validator.isEmail(this.state.fields.email))
                    errMsg = '必須為 email 格式'
                break

            case 'website':
                if (this.state.fields.website &&
                    !validator.isURL(this.state.fields.website))
                    errMsg = '必須為網址格式'
                break
        }

        errors[propertyName] = errMsg
        this.setState({ errors })

        return !errMsg
    }

    handleSubmitClick() {
        let isAllValid = true

        Object.keys(this.state.fields).forEach((key: any) => {
            isAllValid = this.checkFields(key) && isAllValid
        })

        if (!isAllValid) return 

        this.setState({ isSending: true })
        this.props.createCustomer(this.state.fields)
            .then(() => {
                this.props.enqueueSnackbar('新增成員成功！', {
                    variant: 'success'
                })
                this.props.onSubmitSuccess && this.props.onSubmitSuccess()
            })
            .catch(() => {
                this.setState({ isSending: false })
                this.props.enqueueSnackbar('新增成員失敗！', {
                    variant: 'error'
                })
            })
    }

    render() {
        const {
            classes
        } = this.props
        const {
            logo,
            fields,
            errors
        } = this.state

        return (
            <Grid container direction="column">
                    <Grid item className="mb-3 text-center">
                        <Badge
                            overlap="circle"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            badgeContent={
                                <span>
                                    <input type="file" id="logo-img-input" className="d-none" onChange={this.handleLogoChange.bind(this)} accept="image/*" />
                                    <Tooltip title="上傳圖檔">
                                        <label htmlFor="logo-img-input">
                                            <Avatar className={classes.editAvatar}>
                                                <EditIcon />
                                            </Avatar>
                                        </label>
                                    </Tooltip>
                                </span>
                            }
                        >
                            {
                                logo ?
                                    <Avatar className={classes.avatar} src={logo} /> :
                                    <Avatar className={classes.avatar}>
                                        <AccountBoxIcon  className={classes.defaultAvatarImg} />
                                    </Avatar>
                            }
                        </Badge>
                    </Grid>

                    <FieldItem 
                        label="公司名稱" 
                        value={fields.company_name}
                        onChange={this.handleFieldChange.bind(this, 'company_name')}
                        hint={errors.company_name}
                    />
                    <FieldItem 
                        label="聯絡人" 
                        value={fields.contact}
                        onChange={this.handleFieldChange.bind(this, 'contact')}
                        hint={errors.contact}
                    />
                    <FieldItem 
                        label="聯絡電話" 
                        value={fields.phone}
                        onChange={this.handleFieldChange.bind(this, 'phone')}
                        hint={errors.phone}
                    />
                    <FieldItem 
                        label="信箱" 
                        value={fields.email}
                        onChange={this.handleFieldChange.bind(this, 'email')}
                        hint={errors.email}
                    />
                    <FieldItem 
                        label="公司網站" 
                        value={fields.website}
                        onChange={this.handleFieldChange.bind(this, 'website')}
                        hint={errors.website}
                    />
                    <FieldItem 
                        label="公司地址" 
                        value={fields.address}
                        onChange={this.handleFieldChange.bind(this, 'address')}
                        hint={errors.address}
                    />
                    <FieldItem 
                        label="備註" 
                        value={fields.remark}
                        multiline
                        onChange={this.handleFieldChange.bind(this, 'remark')}
                        hint={errors.remark}
                    />

                    <Grid item className="mt-1">
                        <Button 
                            fullWidth
                            color="primary" 
                            variant="contained"
                            onClick={this.handleSubmitClick.bind(this)}
                            disabled={this.state.isSending}
                        >
                            儲存
                        </Button>
                    </Grid>
            </Grid>
        )
    }
}

export default withSnackbar(
    withStyles(styles)(CustomerEditPanel)
)