import { bindActionCreators } from 'redux'
import {
  selectMe,
} from 'components/App/selectors';

import {
  startGame,
} from './actions';

export function mapStateToProps(state) {
  const me = selectMe(state);

  return {
    me,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    actions: {
      startGame: bindActionCreators(startGame, dispatch),
    },
  };
}