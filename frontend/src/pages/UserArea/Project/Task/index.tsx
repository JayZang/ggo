import { connect } from 'react-redux';

import ProjectTask from './Task'
import { RootState } from 'stores';
import { ThunkDispatch } from 'redux-thunk';

const mapStateToProps = (state: RootState) => ({
    task: null
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    load: async (id: number | string) => {

    }
}) 

export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectTask)