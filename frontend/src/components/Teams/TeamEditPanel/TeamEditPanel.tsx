import React, { Component, ChangeEvent, FormEvent } from 'react'
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
import { withSnackbar, WithSnackbarProps } from 'notistack'
import clsx from 'clsx'

import styles from './styles'
import { ITeam } from 'contracts/team'
import { IMember } from 'contracts/member'
import MemberSelectionMenu from 'components/Members/SelectionMenu'

type IProps = WithStyles<typeof styles> &  WithSnackbarProps & {
    team?: ITeam | null
    load: () => Promise<void>
    create: (data: any) => Promise<void>
    update: (id: number | string, data: any) => Promise<void>
    onSubmitSuccess?: () => void
    memberSelectionMenu: IMember[] | null
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

        const team = this.props.team

        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            fields: {
                name: team ? team.name :'',
                description: team ? team.description : '',
                leader: team ? team.leader! : null,
                members: team ? team.members! : []
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
                return member.id !== leader.id
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

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const {
            fields
        } = this.state
        const {
            team
        } = this.props
        let isAllPass = true

        Object.keys(fields).forEach((key: any) => {
            isAllPass = this.checkFields(key) && isAllPass
        })

        if (!isAllPass)
            return

        const actionFunc = team ? this.props.update.bind(this, team.id) : this.props.create
        const actionName = team ? '編輯' : '新增'

        this.setState({ isSubmitting: true })
        actionFunc({
            name: fields.name,
            description: fields.description,
            leader: fields.leader!.id,
            members: this.members.map(member => member.id)
        }).then(() => {
            this.props.enqueueSnackbar(`${actionName}團隊成功！`, {
                variant: 'success'
            })
            this.props.onSubmitSuccess && this.props.onSubmitSuccess()
            this.setState({ isSubmitting: false })
        }).catch(() => {
            this.props.enqueueSnackbar(`${actionName}團隊失敗！`, {
                variant: 'error'
            })
            this.setState({ isSubmitting: false })
        })
    }

    componentDidMount() {
        this.props.memberSelectionMenu || this.props.load()
    }

    render() {
        const {
            team,
            classes,
            memberSelectionMenu
        } = this.props
        const {
            fields,
            errors
        } = this.state
        
        return (
            <form onSubmit={this.handleSubmit}>
                <Grid container direction="column" spacing={2}>
                    <Grid item className={classes.gridItem}>
                        <FormControl fullWidth>
                            <TextField
                                required
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
                                required
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
                                {memberSelectionMenu ? (
                                    <MemberSelectionMenu
                                        defaultMembers={team? [team.leader!] : null}
                                        members={memberSelectionMenu}
                                        onChange={this.handleLeaderSelectionChange.bind(this)!}
                                    />
                                ) : ''}
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
                                {memberSelectionMenu ? (
                                    <MemberSelectionMenu 
                                        defaultMembers={team? team.members! : null}
                                        members={memberSelectionMenu || []}
                                        multiple 
                                        filtered={fields.leader ? [fields.leader] : undefined}
                                        onChange={this.handleMembersSelectionChange.bind(this)}
                                    />
                                ) : ''}
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
                            disabled={this.state.isSubmitting}
                            type="submit"
                        >
                            {team ? '編輯' : '新增'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        )
    }
}

export default withSnackbar(
    withStyles(styles)(TeamEditPanel)
)