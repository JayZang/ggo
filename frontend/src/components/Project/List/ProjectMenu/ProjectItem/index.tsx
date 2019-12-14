import React, { Component } from 'react'
import { Grid, Paper, WithStyles, withStyles, Typography, Button } from '@material-ui/core'

import styles from './style'

type IProps = WithStyles<typeof styles>

class ProjectItem extends Component<IProps> {
    render() {
        const {
            classes
        } = this.props

        return (
            <Paper className={classes.root}>
                <Grid container >

                    <Grid item className={classes.fieldGrid}>
                        <Typography>
                            國立臺北科技大學 GPSA 網站建置
                        </Typography>
                        <Typography
                            className={classes.fieldHint}
                        >
                            專案名稱
                        </Typography>
                    </Grid>

                    <Grid item className={classes.fieldGrid}>
                        <Typography>
                            2019/12/20
                        </Typography>
                        <Typography
                            className={classes.fieldHint}
                        >
                            起始日期
                        </Typography>
                    </Grid>

                    <Grid item className={classes.fieldGrid}>
                        <Typography>
                            2020/10/10
                        </Typography>
                        <Typography
                            className={classes.fieldHint}
                        >
                            最後期限日期
                        </Typography>
                    </Grid>

                    <Grid item className={classes.fieldGrid}>
                        <Typography>
                            ----------
                        </Typography>
                        <Typography
                            className={classes.fieldHint}
                        >
                            完成日期
                        </Typography>
                    </Grid>

                    <Grid item className={classes.fieldGrid}>
                        <Typography>
                            內部
                        </Typography>
                        <Typography
                            className={classes.fieldHint}
                        >
                            來源類型
                        </Typography>
                    </Grid>

                    <Grid item className="d-flex align-items-center">
                        <Button variant="outlined" color="primary">查看</Button>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default withStyles(styles)(ProjectItem)