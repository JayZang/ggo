import React, { Component } from 'react'
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core'

import DownToUpSlideTransition from 'components/Transition/DownToUpSlideTransition'
import ProjectGanttChart from './index'
import { IProject } from 'contracts/project'

type IProps = {
    projects: IProject[]
    open: boolean
    onClose: () => void
}

class ProjectsGanttChartDialog extends Component<IProps> {
    render() {
        const { projects } = this.props

        return (
            <Dialog
                fullWidth
                maxWidth="lg"
                open={this.props.open}
                onClose={this.props.onClose}
                TransitionComponent={DownToUpSlideTransition}
            >
                <DialogTitle>
                    專案/案件甘特圖
                    </DialogTitle>
                <DialogContent>
                    <ProjectGanttChart projects={projects || []} />
                </DialogContent>
            </Dialog>
        )
    }
}

export default ProjectsGanttChartDialog