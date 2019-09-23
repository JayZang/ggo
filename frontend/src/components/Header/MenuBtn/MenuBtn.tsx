import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

interface IProps {
  onClick: () => void
}

class HeaderMenuBtn extends Component<IProps> {
  render() {
    return (
      <IconButton
        edge="start"
        color="primary"
        aria-label="open drawer"
        onClick={this.props.onClick}
      >
        <MenuIcon />
      </IconButton>
    )
  }
}

export default HeaderMenuBtn;