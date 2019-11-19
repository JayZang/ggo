import React, { Component, ChangeEvent } from 'react'
import {
    FormControl,
    Grid,
    TextField,
    FormHelperText,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Typography,
    withStyles,
    WithStyles,
    Button,
    Avatar
} from '@material-ui/core'
import {
    ExpandMore as ExpandMoreIcon
} from '@material-ui/icons'

import { IMember } from 'contracts/member'
import MemberSelectionMenu from 'components/Members/SelectionMenu'
import styles from './styles'
import clsx from 'clsx'
import { withSnackbar, WithSnackbarProps } from 'notistack'

type IProps = WithStyles<typeof styles> &  WithSnackbarProps & {
    load: () => Promise<void>
    create: (data: any) => Promise<void>
    onSubmitSuccess?: () => void
}

type Fields = {
    name: string
    description: string
    leader: IMember | null,
    members: IMember[]
}

type IState = {
    fields: Fields
    errors: Record<keyof Fields, string>,
    isSubmitting: boolean
}

class TeamEditPanel extends Component<IProps, IState> {
    constructor (props: IProps) {
        super(props)

        this.state = {
            fields: {
                name: '',
                description: '',
                leader: null,
                members: []
            },
            errors: {
                name: '',
                description: '',
                leader: '',
                members: ''
            },
            isSubmitting: false
        }
    }

    get members() {
        const {
            leader,
            members
        } = this.state.fields

        if (!leader)
            return members
        else
            return members.filter(member => {
                return member !== leader
            })
    }

    onInputChange(propertyName: keyof Fields, event: ChangeEvent<HTMLInputElement>) {
        const fields: any = this.state.fields
        fields[propertyName] = event.target.value.trimLeft()

        this.setState({ fields })
    }

    handleLeaderSelectionChange(member: IMember[] | IMember | null) {
        if (Array.isArray(member))
            return

        const fields = this.state.fields
        fields.leader = member
        this.setState({ fields })
        this.checkFields('leader')
    }

    handleMembersSelectionChange(members: IMember[] | IMember | null) {
        if (!Array.isArray(members))
            return

        const fields = this.state.fields
        fields.members = members
        this.setState({ fields })
        this.checkFields('members')
    }

    checkFields(propertyName: keyof Fields) {
        const errors = this.state.errors
        let errMsg = ''

        switch (propertyName) {
            case 'name':
            case 'description':
                if (!this.state.fields[propertyName])
                    errMsg = '不能為空'
                break

            case 'leader':
                if (!this.state.fields.leader)
                    errMsg = '必須指派團隊負責人'
                break

            case 'members':
                if (this.members.length === 0)
                    errMsg = '至少選擇一位團隊成員'
                break
        }

        errors[propertyName] = errMsg
        this.setState({ errors })

        return !errMsg
    }

    handleSubmitClick() {
        const {
            fields
        } = this.state
        let isAllPass = true

        Object.keys(fields).forEach((key: any) => {
            isAllPass = this.checkFields(key) && isAllPass
        })

        if (!isAllPass)
            return

        this.setState({ isSubmitting: true })
        this.props.create({
            name: fields.name,
            description: fields.description,
            leader: fields.leader!.id,
            members: fields.members.map(member => member.id)
        }).then(() => {
            this.props.enqueueSnackbar('新增團隊成功！', {
                variant: 'success'
            })
            this.props.onSubmitSuccess && this.props.onSubmitSuccess()
            this.setState({ isSubmitting: false })
        }).catch(() => {
            this.props.enqueueSnackbar('新增團隊失敗！', {
                variant: 'error'
            })
            this.setState({ isSubmitting: false })
        })
    }

    componentDidMount() {
        this.props.load()
    }

    render() {
        const {
            classes
        } = this.props
        const {
            fields,
            errors
        } = this.state
        
        return (
            <Grid container direction="column" spacing={2}>
                <Grid item className={classes.gridItem}>
                    <FormControl fullWidth>
                        <TextField
                            value={fields.name}
                            label="團隊名稱" type="text" variant="outlined" fullWidth
                            InputProps={{ margin: "dense" }}
                            InputLabelProps={{
                                margin: 'dense',
                                style: { fontSize: 14 },
                            }}
                            onChange={(event) => {
                                this.setState({
                                    fields: {
                                        ...this.state.fields,
                                        name: event.target.value.trimLeft()
                                    }
                                }, () => {
                                    this.checkFields('name')
                                })
                            }}
                        />
                        {errors.name ? (<FormHelperText>{errors.name}</FormHelperText>) : null}
                    </FormControl>
                </Grid>
                
                <Grid item className={classes.gridItem}>
                    <FormControl fullWidth className="form-group">
                        <label className={classes.label}>描述</label>
                        <textarea 
                            rows={3}
                            className={clsx("form-control", classes.textarea)}
                            value={fields.description}
                            onChange={(event) => {
                                this.setState({
                                    fields: {
                                        ...this.state.fields,
                                        description: event.target.value.trimLeft()
                                    }
                                }, () => {
                                    this.checkFields('description')
                                })
                            }}
                        />
                        {errors.description ? (<FormHelperText>{errors.description}</FormHelperText>) : null}
                    </FormControl>
                </Grid>

                <Grid item className={classes.gridItem}>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            {!fields.leader && <Typography noWrap>團隊負責人</Typography> }
                            {fields.leader && (function () {
                                return (
                                    <Grid container alignItems="center" spacing={2}>
                                        <Avatar src={fields.leader.avatar} />
                                        <Grid item>
                                            <Grid container direction="column">
                                                <Typography className={classes.leaderName}>{fields.leader.name}</Typography>
                                                <Typography  variant="body2" className={classes.leaderHint}>團隊負責人</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                )
                            })()}
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails classes={{
                            root: classes.memberSelectionWrapper
                        }}>
                            <MemberSelectionMenu
                                onChange={this.handleLeaderSelectionChange.bind(this)!}
                            />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    {errors.leader ? (<FormHelperText>{errors.leader}</FormHelperText>) : null}
                </Grid>

                <Grid item className={classes.gridItem}>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography>團隊成員 <span>{this.members.length}</span> 人</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails classes={{
                            root: classes.memberSelectionWrapper
                        }}>
                            <MemberSelectionMenu multiple 
                                filtered={fields.leader ? [fields.leader] : undefined}
                                onChange={this.handleMembersSelectionChange.bind(this)}
                            />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    {errors.members ? (<FormHelperText>{errors.members}</FormHelperText>) : null}
                </Grid>

                <Grid item className={classes.gridItem}></Grid>

                <Grid item className={classes.gridItem}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        fullWidth
                        onClick={this.handleSubmitClick.bind(this)}
                        disabled={this.state.isSubmitting}
                    >
                        儲存
                    </Button>
                </Grid>
            </Grid>
        )
    }
}

export default withSnackbar(
    withStyles(styles)(TeamEditPanel)
)