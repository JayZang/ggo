import React, { Component } from 'react'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'

import { Paper, IconButton } from '@material-ui/core'

class SearchBar extends Component {
    render() {
        return (
            <Paper className="px-1 mr-1">
                <IconButton size="small" >
                    <SearchIcon />
                </IconButton>
                <InputBase placeholder="搜尋成員" />
            </Paper>
        )
    }
}

export default SearchBar