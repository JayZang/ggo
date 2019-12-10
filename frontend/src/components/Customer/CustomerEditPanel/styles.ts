import { Theme, createStyles } from "@material-ui/core";

export default (theme: Theme) => createStyles({
    avatar: {
        width: 150,
        height: 150,
    },
    defaultAvatarImg: {
        width: '50%',
        height: '50%'
    },
    editAvatar: {
        width: 16,
        height: 16,
        padding: 8,
        boxSizing: 'content-box',
        border: '2px solid white',
        cursor: 'pointer'
    }
})