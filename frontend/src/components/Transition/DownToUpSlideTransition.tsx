import React from 'react'
import { TransitionProps } from '@material-ui/core/transitions';
import { Slide } from '@material-ui/core';

export default  React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});