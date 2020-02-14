import React, { Component } from 'react'
import { Box, Avatar, Typography, Button } from '@material-ui/core'
import { IMember } from 'contracts/member'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

type IProps = {
    className?: string
    member: IMember
}

class TeamMemberListItem extends Component<IProps> {
    render() {
        const {
            className,
            member
        } = this.props
        
        return (
            <Box className={className}>
                <Box className="field-wrapper">
                    <Avatar className="mr-2" src={member.avatar} />
                    <Typography component="div">
                        {member.name}
                        <Box color="text.hint" className="field-hint">
                            姓名
                        </Box>
                    </Typography>
                </Box>

                <Typography component="div">
                    {member.email}
                    <Box color="text.hint" className="field-hint">
                        電子郵件
                        </Box>
                </Typography>

                <Typography component="div">
                    {member.phone}
                    <Box color="text.hint" className="field-hint">
                        聯絡電話
                        </Box>
                </Typography>

                <Link to={`/members/${member.id}`}>
                    <Button
                        color="primary"
                        variant="outlined"
                        size="small"
                    >
                        查看
                    </Button>
                </Link>
            </Box>
        )
    }
}

export default styled(TeamMemberListItem)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 24px;

    + * {
        margin-top: 8px
    }

    & .field-wrapper {
        display: flex;
    }

    & .field-hint {
        font-size: 14px;
    }
`