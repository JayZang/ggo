import { connect } from 'react-redux';

import CustomerInfoPage from './Info'
import { RootState } from 'stores';

const mapStateToProps = (state: RootState) => ({
    customer: null,
    statistic: {
        projectTotalCount: null,
        projectCurrentYearCount: null,
        projectAvgSpendTime: null
    }
})

export default connect(
    mapStateToProps
)(CustomerInfoPage)