import React, { Component } from 'react'
import { Dialog, DialogProps, DialogTitle, Divider, List, ListItem, ListItemSecondaryAction, IconButton, ListItemText, Box, Grid, Collapse, InputBase, Button, Paper, Tooltip } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'

import DownToUpSlideTransition from 'components/Transition/DownToUpSlideTransition'

type IProps = DialogProps & {

}

type IState = {
    openCreationBar: boolean
}

class CustomerIndustryEditDialog extends Component<IProps, IState> {
    state = {
        openCreationBar: false
    }

    render() {
        const {
            ...restProps
        } = this.props
        const {
            openCreationBar
        } = this.state

        return (
            <Dialog 
                fullWidth
                maxWidth="xs"
                {...restProps}
                TransitionComponent={DownToUpSlideTransition}
            >
                <Box position="sticky" top={0} zIndex={1} bgcolor="white">
                    <Grid container alignItems="center">
                        <Grid item xs>
                            <DialogTitle >
                                客戶產業類型
                            </DialogTitle>
                        </Grid>
                        <Grid item style={{ marginRight: 12 }}>
                            <Tooltip title={openCreationBar ? '關閉新增' : '新增'}>
                                <IconButton 
                                    onClick={() => this.setState({ openCreationBar: !openCreationBar })}
                                    style={{ 
                                        transform: openCreationBar ? 'rotate(45deg)' : '', 
                                        transition: '.3s ease' 
                                    }}
                                >
                                    <AddIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                    <Collapse in={openCreationBar}>
                        <Box paddingX={2} paddingBottom={2}>
                            <Paper className="pl-3 pr-1 py-1">
                                <Grid container>
                                    <Grid item xs>
                                        <InputBase
                                            fullWidth
                                            placeholder="輸入類型名稱"
                                            inputProps={{
                                                style: {
                                                    fontSize: 14
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Button color="primary" size="small">新增</Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Box>
                    </Collapse>
                    <Divider />
                </Box>
                <Box paddingLeft={1}>
                    <List>
                        <ListItem>
                            <ListItemText primary="產業類型1" />
                            <ListItemSecondaryAction className="pr-2">
                                <IconButton edge="end">
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="產業類型2" />
                            <ListItemSecondaryAction className="pr-2">
                                <IconButton edge="end">
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                </Box>
            </Dialog>
        )
    }
}

export default CustomerIndustryEditDialog