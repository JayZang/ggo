import React, { Component } from 'react'
import {
    withStyles,
    WithStyles,
    Card,
    CardHeader,
    CardContent,
    IconButton,
    Divider,
    List,
    ListItem,
    Collapse,
    Button
} from '@material-ui/core'
import {
    Add as AddIcon
} from '@material-ui/icons'
import { Skeleton } from '@material-ui/lab'

import styles from './styles'
import EmergencyContactEditor from './EmergencyContactEditor'
import EmergencyContactItem from './EmergencyContactItem'
import clsx from 'clsx'
import { IEmergencyContact } from 'contracts/member'

type IProps = WithStyles<typeof styles> & {
    memberId: number | string
    emergencyContacts: IEmergencyContact[] | null
}

type IState = {
    isOpenCreator: boolean
}

class EmergencyContactMenu extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            isOpenCreator: false
        }
    }

    render() {
        const {
            classes,
            memberId,
            emergencyContacts
        } = this.props
        const {
            isOpenCreator
        } = this.state

        return (
            <Card>
                <CardHeader
                    classes={{
                        root: classes.cardHeaderRoot,
                        action: classes.cardHeaderAction
                    }}
                    title="緊急聯絡人"
                    action={
                        <IconButton
                            className={classes.cardHeaderActionButton}
                            onClick={() => {
                                this.setState({ isOpenCreator: !isOpenCreator })
                            }}
                        >
                            <AddIcon className={clsx(classes.addIcon, {
                                [classes.addIconRotate]: isOpenCreator
                            })} />
                        </IconButton>
                    }
                    titleTypographyProps={{
                        variant: "h6"
                    }}
                />

                <Divider />

                <Collapse in={isOpenCreator}>
                    <EmergencyContactEditor
                        memberId={memberId}
                        onClose={() => this.setState({ isOpenCreator: false })}
                    />
                    <Divider />
                </Collapse>

                <Collapse in={emergencyContacts !== null && emergencyContacts.length === 0 && !isOpenCreator}>
                    <ListItem style={{ padding: 16 }}>
                        <Button 
                            variant="outlined" 
                            color="primary" 
                            fullWidth
                            onClick={() => this.setState({ isOpenCreator: true })}
                        >
                            新增緊急聯絡人
                        </Button>
                    </ListItem>
                </Collapse>

                <CardContent classes={{
                    root: classes.cardContentRoot
                }}>
                    <List disablePadding>
                        {(() => {
                            if (emergencyContacts === null)
                                return this.renderLoadingBar()
                             else {
                                return emergencyContacts.map(function (emergencyContact) {
                                    return <ListItem 
                                        key={emergencyContact.id}
                                        disableGutters={true}
                                        classes={{
                                            root: classes.cardItem
                                        }}
                                    >
                                        <EmergencyContactItem emergencyContact={emergencyContact} />
                                    </ListItem>
                                })
                            }
                        })()}
                    </List>
                </CardContent>
            </Card>
        )
    }

    renderLoadingBar() {
        const { classes } = this.props
        return (
            <div>
                <ListItem classes={{
                    root: classes.cardItem
                }}>
                    <div style={{ width: '100%', padding: '8px 16px' }}>
                        <Skeleton height={12} width="100%" />
                        <Skeleton height={12} width={150} />
                    </div>
                </ListItem>
            </div>
        )
    }
}

export default withStyles(styles)(EmergencyContactMenu)