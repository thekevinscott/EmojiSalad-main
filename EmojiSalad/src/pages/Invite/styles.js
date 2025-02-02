import {
  Platform,
} from 'react-native';

export const invite = {
  flex: 1,
  marginTop: Platform.select({
    ios: 64,
    android: 33,
  }),
};

export const instructions = {
  flex: 1,
  //padding: 60,
  alignItems: 'center',
};

export const instructionsBody = {
  flex: 0,
  flexDirection: 'row',
};

export const text = {
  fontSize: 16,
  color: '#666',
  textAlign: 'center',
  marginRight: 10,
};

//const invitePlayersHeight = 40;

export const invitePlayers = {
  flex: 0,
  padding: 10,
  flexDirection: 'row',
  backgroundColor: '#EEE',
};

export const invitePlayer = {
  color: 'blue',
  flex: 1,
};

export const label = {
  flex: 0,
  marginRight: 10,
  alignItems: 'center',
  justifyContent: 'center',
};

export const labelText = {
  color: '#999',
};

export const invitedPlayer = {
  flex: 0,
  flexDirection: 'row',
  padding: 10,
  alignItems: 'center',
  borderBottomColor: '#DDD',
  borderBottomWidth: 1,
};

export const invitedPlayerText = {
  color: 'purple',
  paddingRight: 150,
  flex: 1,
};

export const invitedPlayers = {
  flex: 1,
};

export const startGame = {
  padding: 20,
  alignItems: 'center',
};

export const friend = {
  flexDirection: 'row',
};
