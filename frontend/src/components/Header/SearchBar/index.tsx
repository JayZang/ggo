import React, { Component } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import styles from './styles';

interface IProps extends WithStyles<typeof styles> {}

class HeaderSearchBar extends Component<IProps> {
  render() {
    const classes = this.props.classes;
    
    return (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon fontSize="small" />
        </div>
        <InputBase
          placeholder="搜尋"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
    )
  }
}

export default withStyles(styles)(HeaderSearchBar);