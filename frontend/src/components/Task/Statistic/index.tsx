import React, { Component } from 'react'
import { ITask, TaskStatus } from 'contracts/task'
import { Box, Grid, Typography, LinearProgress, Theme, createStyles, lighten, WithStyles, withStyles } from '@material-ui/core'
import moment from 'moment'

const styles = (theme: Theme) => createStyles({
    progressingBarContainer: {
        backgroundColor: lighten('#007bff', 0.9)
    },
    progressingBarIndicator: {
        backgroundColor: 'var(--primary)'
    },
    pauseBarContainer: {
        backgroundColor: lighten('#ffc107', 0.9)
    },
    pauseBarIndicator: {
        backgroundColor: 'var(--warning)'
    },
    terminatedBarContainer: {
        backgroundColor: lighten('#dc3545', 0.9)
    },
    terminatedBarIndicator: {
        backgroundColor: 'var(--danger)'
    },
    successBarContainer: {
        backgroundColor: lighten('#28a745', 0.9)
    },
    successBarIndicator: {
        backgroundColor: 'var(--success)'
    },
    expiredBarContainer: {
        backgroundColor: lighten('#6c757d', 0.9)
    },
    expiredBarIndicator: {
        backgroundColor: 'var(--secondary)'
    },
})

type IProps = WithStyles<typeof styles> & {
    tasks: ITask[]
}

class TasksStastic extends Component<IProps> {
    render() {
        const {
            tasks,
            classes
        } = this.props
        const totalCount = tasks.length
        let progressingCount = 0
        let pauseCount = 0
        let completedCount = 0
        let terminatedCount = 0
        let expiredCount = 0

        tasks.forEach(task => {
            if (task.status !== TaskStatus.Completed &&
                task.status !== TaskStatus.Terminated &&
                moment().isAfter(task.deadline_datetime))
                expiredCount++

            switch (task.status) {
                case TaskStatus.Normal:
                    progressingCount++
                    break

                case TaskStatus.Pause:
                    pauseCount++
                    break

                case TaskStatus.Completed:
                    completedCount++
                    break

                case TaskStatus.Terminated:
                    terminatedCount++
                    break

            }
        })

        let progressingRate = parseInt((progressingCount / totalCount * 100).toString()) || 0
        let pauseRate = parseInt((pauseCount / totalCount * 100).toString()) || 0
        let completedRate = parseInt((completedCount / totalCount * 100).toString()) || 0
        let terminatedRate = parseInt((terminatedCount / totalCount * 100).toString()) || 0
        let expiredRate = parseInt((expiredCount / totalCount * 100).toString()) || 0

        return (
            <Box className="p-4">
                <Grid container spacing={5}>
                    <Grid item xs={4}>
                        <Box display="flex" justifyContent="space-between" alignItems="baseline" marginBottom={1}>
                            <Typography variant="h6">工作任務總數</Typography>
                            <Typography variant="body2">{totalCount} 筆</Typography>
                        </Box>
                        <LinearProgress variant="determinate" value={100} color="primary" />
                    </Grid>
                    <Grid item xs={4}>
                        <Box display="flex" justifyContent="space-between" alignItems="baseline" marginBottom={1}>
                            <Typography variant="h6">執行中</Typography>
                            <Typography variant="body2">{progressingCount} 筆, {progressingRate}％</Typography>
                        </Box>
                        <LinearProgress variant="determinate" value={progressingRate} classes={{
                            root: classes.progressingBarContainer,
                            bar: classes.progressingBarIndicator
                        }} />
                    </Grid>
                    <Grid item xs={4}>
                        <Box display="flex" justifyContent="space-between" alignItems="baseline" marginBottom={1}>
                            <Typography variant="h6">暫停中</Typography>
                            <Typography variant="body2">{pauseCount} 筆, {pauseRate}％</Typography>
                        </Box>
                        <LinearProgress variant="determinate" value={pauseRate} classes={{
                            root: classes.pauseBarContainer,
                            bar: classes.pauseBarIndicator
                        }} />
                    </Grid>
                    <Grid item xs={4}>
                        <Box display="flex" justifyContent="space-between" alignItems="baseline" marginBottom={1}>
                            <Typography variant="h6">已終止</Typography>
                            <Typography variant="body2">{terminatedCount} 筆, {terminatedRate}％</Typography>
                        </Box>
                        <LinearProgress variant="determinate" value={terminatedRate} classes={{
                            root: classes.terminatedBarContainer,
                            bar: classes.terminatedBarIndicator
                        }} />
                    </Grid>
                    <Grid item xs={4}>
                        <Box display="flex" justifyContent="space-between" alignItems="baseline" marginBottom={1}>
                            <Typography variant="h6">已完成</Typography>
                            <Typography variant="body2">{completedCount} 筆, {completedRate}％</Typography>
                        </Box>
                        <LinearProgress variant="determinate" value={completedRate} classes={{
                            root: classes.successBarContainer,
                            bar: classes.successBarIndicator
                        }} />
                    </Grid>
                    <Grid item xs={4}>
                        <Box display="flex" justifyContent="space-between" alignItems="baseline" marginBottom={1}>
                            <Typography variant="h6">逾期未完成</Typography>
                            <Typography variant="body2">{expiredCount} 筆, {expiredRate}％</Typography>
                        </Box>
                        <LinearProgress variant="determinate" value={expiredRate} classes={{
                            root: classes.expiredBarContainer,
                            bar: classes.expiredBarIndicator
                        }} />
                    </Grid>
                </Grid>
            </Box>
        )
    }
}

export default withStyles(styles)(TasksStastic)