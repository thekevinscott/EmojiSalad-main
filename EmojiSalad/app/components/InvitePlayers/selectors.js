//import { bindActionCreators } from 'redux';

import {
  //invitePlayer,
  //removePlayer,
  //clearInvites,
  //addPlayer,
} from './actions';

//const getInvitedPlayers = ({
  //ui: {
    //InvitePlayers: {
      //invitedPlayers,
    //},
  //},
//}) => Object.keys(invitedPlayers).map(key => invitedPlayers[key]);

export function mapStateToProps(state) {
  //const invitedPlayers = getInvitedPlayers(state);

  return {
    //invitedPlayers,
  };
}

export function mapDispatchToProps() {
  return {
    actions: {
      //invitePlayer: bindActionCreators(invitePlayer, dispatch),
      //removePlayer: bindActionCreators(removePlayer, dispatch),
      //clearInvites: bindActionCreators(clearInvites, dispatch),
    },
  };
}
