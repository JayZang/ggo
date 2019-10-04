import { connect } from 'react-redux';

import MenuBtn from './MenuBtn';
import { toggleMenuDrawer } from 'stores/view/action';

export default connect(null, { 
  onClick: toggleMenuDrawer 
})(MenuBtn)