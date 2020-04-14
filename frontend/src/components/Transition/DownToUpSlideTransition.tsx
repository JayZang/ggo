import React from 'react'
import { TransitionProps } from '@material-ui/core/transitions';
import { Slide } from '@material-ui/core';

export default  React.forwardRef(function Transition(
    props: TransitionProps , 
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});