import React, { Component } from 'react'
import { WithStyles, withStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'

import styles from './styles'

interface IProps extends WithStyles<typeof styles> { }

class SearchBar extends Component<IProps> {
  render() {
    const classes = this.props.classes

    return (
      <div className={classes.wrapper}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search Name"
            classes={{
              root: classes.searchInputRoot,
              input: classes.searchInput
            }}
          />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(SearchBar)