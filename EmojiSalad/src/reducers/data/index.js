import {
  combineReducers,
} from 'redux';

import games from './games';
import invites from './invites';
import users from './users';
import players from './players';
import messages from './messages';
import pendingMessages from './pendingMessages';
import me from './me';

export default combineReducers({
  me,
  messages,
  pendingMessages,
  games,
  users,
  players,
  invites,
});
