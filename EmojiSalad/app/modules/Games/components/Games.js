/**
 * @flow
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  Text,
  View,
  TouchableHighlight,
  ListView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import * as styles from '../styles';

import {
  fetchGames,
} from '../actions';

import {
  selectGames,
  selectUI,
} from '../selectors';

import {
  selectMe,
} from '../../App/selectors';

function mapStateToProps(state) {
  return {
    games: selectGames(state),
    me: selectMe(state),
    ui: selectUI(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      fetchGames: (userKey) => {
        return dispatch(fetchGames(userKey));
      },
    },
  };
}

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
});

function getPlayerString(players) {
  const playerString = players.map(player => `${player.nickname}`).join(', ');

  const characterLimit = 30;

  if (playerString.length > characterLimit) {
    return `${playerString.substring(0, characterLimit - 3)}...`;
  }
  return playerString;
}

function parseTimestamp(timestamp) {
  const date = moment(timestamp * 1000);
  console.log('date', date);
  return date.fromNow();
}

class Games extends Component {
  componentWillMount() {
    this.props.actions.fetchGames(this.props.me.key);
  }

  _renderRow(game, sectionId, rowId, highlightRow) {
    console.log(highlightRow);
    const message = (game.messages[game.messages.length - 1] || {});
    return (
      <TouchableHighlight
        onPress={() => {
          Actions.game({
            game,
          });
        }}
        key={`${rowId}`}
      >
        <View
          style={styles.row}
        >
          <View style={styles.rowHeader}>
            <Text
              style={
                styles.players
              }
              numberOfLines={1}
            >
              {getPlayerString(game.players)}
            </Text>
            <Text style={styles.timestamp}>
              {parseTimestamp(message.timestamp)}
            </Text>
          </View>
          <Text
            style={styles.message}
            numberOfLines={2}
          >
            {message.body}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  _renderSeperator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={styles.rowSeparator(adjacentRowHighlighted)}
      />
    );
  }

  getGames() {
    return ds.cloneWithRows(this.props.games);
  }

  render() {
    //console.log(this.props);
    return (
      <View style={{ flex: 1 }}>
        <Spinner visible={this.props.ui.fetching && !this.props.games.length} />
        <ListView
          dataSource={this.getGames()}
          renderRow={this._renderRow}
          renderSeparator={this._renderSeperator}
          style={styles.container}
        />
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Games);
