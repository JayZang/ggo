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

type IProps = WithStyles<typeof styles> & {
    load: () => Promise<void>
}

type Fields = {
    name: string
    description: string
    leader: IMember | null,
    members: IMember[]
}

type IState = {
    fields: Fields
    errors: Record<keyof Fields, string>
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
            }
        }
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
    }

    handleMembersSelectionChange(members: IMember[] | IMember | null) {
        if (!Array.isArray(members))
            return

        const fields = this.state.fields
        fields.members = members
        this.setState({ fields })
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
                            error={!!errors.name} value={fields.name}
                            onChange={this.onInputChange.bind(this, 'name')}
                            label="團隊名稱" type="text" variant="outlined" fullWidth
                            InputLabelProps={{
                                margin: 'dense',
                                style: { fontSize: 14 },
                            }}
                            InputProps={{ margin: "dense" }}
                        />
                        {errors.name ? (<FormHelperText>{errors.name}</FormHelperText>) : null}
                    </FormControl>
                </Grid>
                
                <Grid item className={classes.gridItem}>
                    <FormControl fullWidth className="form-group">
                        <label className={classes.label}>描述</label>
                        <textarea className={clsx("form-control", classes.textarea)} rows={3}></textarea>
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
                </Grid>

                <Grid item className={classes.gridItem}>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography>團隊成員 <span>{fields.members.length}</span> 人</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails classes={{
                            root: classes.memberSelectionWrapper
                        }}>
                            <MemberSelectionMenu multiple 
                                onChange={this.handleMembersSelectionChange.bind(this)}
                            />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </Grid>

                <Grid item className={classes.gridItem}></Grid>

                <Grid item className={classes.gridItem}>
                    <Button variant="contained" color="primary" fullWidth>儲存</Button>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(TeamEditPanel)