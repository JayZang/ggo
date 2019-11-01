import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import MemberEditDrawer from 'components/Members/MemberEditPanel/MemberEditDrawer'

interface IProps {
    useFabBtn: boolean,
    className: string
}

interface IState {
    isOpenDrawer: boolean
}

class AddMemberBtn extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            isOpenDrawer: false
        }

        this.openDrawer = this.openDrawer.bind(this)
        this.closeDrawer = this.closeDrawer.bind(this)
    }

    openDrawer() {
        this.setState({ isOpenDrawer: true })
    }

    closeDrawer() {
        this.setState({ isOpenDrawer: false })
    }

    render() {
        const className = this.props.className

        return (
            <div className={className}>
                {this.props.useFabBtn ? this.renderFabBtn() : this.renderNormalBtn()}

                <MemberEditDrawer
                    open={this.state.isOpenDrawer}
                    onOpen={this.openDrawer}
                    onClose={this.closeDrawer}
                />
            </div>
        )
    }

    renderNormalBtn() {
        return (
            <Button color="primary" variant="contained" onClick={this.openDrawer}>
                新增成員
            </Button>
        )
    }

    renderFabBtn() {
        return (
            <Fab color="primary" onClick={this.openDrawer}>
                <AddIcon />
            </Fab>
        )
    }
}

export default AddMemberBtn