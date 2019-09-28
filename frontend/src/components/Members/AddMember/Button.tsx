import React, { Component } from 'react'
import { WithStyles, Theme, withStyles, createStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import BackIcon from '@material-ui/icons/ChevronLeft'

import RightDrawerContainer from 'components/RightDrawerContainer'
import MobileHeader from 'components/MobileHeader'

const styles = (theme: Theme) => createStyles({

})

interface IProps extends WithStyles<typeof styles> {
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

        <RightDrawerContainer
          open={this.state.isOpenDrawer} 
          onOpen={this.openDrawer}
          onClose={this.closeDrawer}
          headComponent={(
            <MobileHeader
              title="Add Member"
              defaultHidden={true}
              leftComponent={(
                <BackIcon onClick={this.closeDrawer} />
              )}
            />
          )}
        >
          {this.renderFilterMenu()}
        </RightDrawerContainer>
      </div>
    )
  }

  renderNormalBtn() {
    return (
      <Button color="primary" variant="contained" onClick={this.openDrawer}>
        Add Member
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

  renderFilterMenu() {
    const classes = this.props.classes

    return (
      <div>
        
      </div>
    )
  }
}

export default withStyles(styles)(AddMemberBtn)