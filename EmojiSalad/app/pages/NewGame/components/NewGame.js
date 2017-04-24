import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  ListView,
  PushNotificationIOS,
  //RefreshControl,
} from 'react-native';

import * as styles from '../styles';

import InvitePlayers from '../../../components/InvitePlayers/';

import {
  mapStateToProps,
  mapDispatchToProps,
} from '../selectors';

class NewGame extends Component {
  render() {
    return (
      <InvitePlayers
        submit={phones => {
          this.props.actions.startGame(this.props.me.key, phones);
        }}
      >
        Start a new game by inviting players by their phone numbers above.
      </InvitePlayers>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewGame);