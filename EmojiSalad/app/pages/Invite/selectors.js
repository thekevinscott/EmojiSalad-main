//import { bindActionCreators } from 'redux'
import {
  selectMe,
} from 'components/App/selectors';

import {
  //invite,
  //getUserFriends,
} from './actions';

const selectContacts = (contacts, game = { players: [], invites: [], }) => {
  const gamePlayers = game.players.map(player => player.key);
  const pendingInvites = game.invites.map(invite => invite.invited_user);
  const exclude = gamePlayers.concat(pendingInvites);

  return Object.keys(contacts).map(id => {
    return contacts[id];
  }).sort((a, b) => {
    return a.order - b.order;
  }).filter(contact => {
    return exclude.indexOf(contact.key) === -1;
  });
};

export function mapStateToProps(state, { game }) {
  const me = selectMe(state);

  const {
    fetching,
  } = state.ui.Invite;

  return {
    me,
    friends: selectContacts(me.contacts.friends, game),
    //invitableFriends: selectContacts(invitableFriends, game),
    invitableFriends: [],
    fetching,
  };
}

export function mapDispatchToProps() {
  return {
    actions: {
      //invite: bindActionCreators(invite, dispatch),
      //getUserFriends: bindActionCreators(getUserFriends, dispatch),
    },
  };
}

