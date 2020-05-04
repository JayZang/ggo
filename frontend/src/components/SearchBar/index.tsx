import React, { Component } from 'react'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import ClearIcon from '@material-ui/icons/Clear';
import { Paper, IconButton, Box, Grid, Divider } from '@material-ui/core'
import styled from 'styled-components'

type IProps = {
    className?: string
    placeholder?: string
    search?: (text: string) => Promise<void>
}

type IState = {
    searchText: string
    inputStretch: boolean
    searching: boolean
}

class SearchBar extends Component<IProps, IState> {
    state = {
        searchText: '',
        inputStretch: false,
        searching: false
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ searchText: event.target.value || '' })
    }

    handleInputKeyPress(event: React.KeyboardEvent) {
        if (event.key === 'Enter')
            this.handleSearch()
    }

    handleSearch() {
        const { search } = this.props
        const { searchText, searching } = this.state

        if (search && !searching) {
            this.setState({ searching: true }, () => {
                search(searchText).finally(() => {
                    this.setState({ searching: false })
                })
            })
        }
    }

    render() {
        const {
            className,
            placeholder
        } = this.props
        const {
            searchText
        } = this.state
        const inputStretch = !!searchText || this.state.inputStretch

        return (
            <Paper className={`${className} px-1`}>
                <Grid container>
                    <Grid item>
                        <InputBase
                            value={searchText}
                            placeholder={placeholder} 
                            className="search-input pl-2"
                            style={{ width: inputStretch ? 300 : 150 }} 
                            onFocus={() => this.setState({ inputStretch: true })}
                            onBlur={() => this.setState({ inputStretch: false })}
                            onChange={this.handleInputChange.bind(this)}
                            onKeyPress={this.handleInputKeyPress.bind(this)}
                        />
                    </Grid>
                    <Grid item>
                        <Grid container>
                            {inputStretch ? (
                                <Box component="span" display="flex">
                                    <IconButton
                                        size="small"
                                        onClick={() => this.setState({ searchText: '' })}
                                    >
                                        <ClearIcon fontSize="small" />
                                    </IconButton>
                                    <Divider  orientation="vertical" />
                                </Box>
                            ) : null}

                            <IconButton
                                size="small"
                                color="primary"
                                onClick={this.handleSearch.bind(this)}
                            >
                                <Box
                                    className="search-icon"
                                    style={{ transform: `rotate(${inputStretch ? 90 : 0}deg)` }}
                                >
                                    <SearchIcon />
                                </Box>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default styled(SearchBar)`
    .search-icon,
    .search-input {
        transition: .3s ease
    }

    hr {
        margin: 0 4px;
        height: 70%;
        margin-top: 15%;
    }
`