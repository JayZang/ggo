import React, { Component, ChangeEvent } from 'react'
import { Box, FormControl, TextField, Grid, FormHelperText, Button } from '@material-ui/core'

import { IGroup } from 'contracts/group'
import PolicyTable from 'components/IAM/Policy/Table'
import { IPolicy } from 'contracts/policy'
import { WithSnackbarProps, withSnackbar } from 'notistack'

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

type IProps = WithSnackbarProps & {
    group? :IGroup
    totalPolicies: IPolicy[]
    create: (data: any) => Promise<void>
    update: (id: string | number, data: any) => Promise<void>
    onSubmitSuccess?: () => void
}

type Fields = {
    name?: string
    description?: string
    policies?: IPolicy[]
}

type IState = {
    fields: Fields
    errors: Record<keyof Fields, string>,
    isSubmitting: boolean
}

class GroupEditPanel extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        const group = props.group

        this.state = {
            fields: {
                name: group ? group.name : undefined,
                description: group && group.description ? group.description : undefined,
                policies: group? group.policies : []
            },
            errors: {
                name: '',
                description: '',
                policies: ''
            },
            isSubmitting: false
        }
    }

    handleFieldChange(
        propertyName: keyof Fields, 
        event: ChangeEvent<HTMLInputElement>
    ) {
        const fields: any = this.state.fields
        fields[propertyName] = event.target.value || undefined

        this.setState({ fields })
        this.checkField(propertyName)
    }

    handlePoliciesSelectionChange(policies: IPolicy[]) {
        this.setState({
            fields: {
                ...this.state.fields,
                policies
            }
        }, () => {
            this.checkField('policies')
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
                if (!fields.name)
                    errMsg = '不可為空'
                break

            case 'policies':
                if (!fields.policies || !fields.policies.length)
                    errMsg = '至少選擇一項'
                break
        }

        errors[propertyName] = errMsg
        this.setState({ errors })

        return !errMsg
    }

    handleSubmitBtnClick() {
        const group = this.props.group
        const fields = this.state.fields
        let isAllValid = true

        Object.keys(fields).forEach((key: any) => {
            isAllValid = this.checkField(key) && isAllValid
        })

        if (!isAllValid) return

        const action = group ? '編輯' : '新增'
        const submit = group ? 
            this.props.update.bind(this, group.id) :
            this.props.create

        this.setState({ isSubmitting: true })
        submit({
            name: fields.name,
            description: fields.description,
            policy_ids: fields.policies && fields.policies.map(policy => policy.id)
        }).then(() => {
            this.props.enqueueSnackbar(`${action}群組成功！`, {
                variant: 'success'
            })
            this.props.onSubmitSuccess && this.props.onSubmitSuccess()
        })
        .catch(() => {
            this.setState({ isSubmitting: false })
            this.props.enqueueSnackbar(`${action}群組失敗！`, {
                variant: 'error'
            })
        })
    }

    render() {
        const {
            totalPolicies,
            group
        } = this.props
        const {
            fields,
            errors,
            isSubmitting
        } = this.state

        return (
            <Grid container direction="column">

                <FieldItem
                    label="群組名稱"
                    value={fields.name}
                    hint={errors.name}
                    onChange={this.handleFieldChange.bind(this, 'name')}
                />

                <FieldItem
                    label="群組描述"
                    multiline={true}
                    value={fields.description}
                    hint={errors.description}
                    onChange={this.handleFieldChange.bind(this, 'description')}
                />

                <Grid item>
                    <PolicyTable 
                        title="權限選擇"
                        selectable={true}
                        policies={totalPolicies}
                        onChange={policies => this.handlePoliciesSelectionChange(policies)}
                        defaultSelectedPolicies={group ? group.policies : undefined}
                    />
                    {errors.policies ? (<FormHelperText>{errors.policies}</FormHelperText>) : null}
                </Grid>

                <Grid item className="mt-5">
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={this.handleSubmitBtnClick.bind(this)}
                        disabled={isSubmitting}
                    >
                        {group ? '編輯' : '新增'}
                    </Button>
                </Grid>
            </Grid>
        )
    }
}

export default withSnackbar(GroupEditPanel)