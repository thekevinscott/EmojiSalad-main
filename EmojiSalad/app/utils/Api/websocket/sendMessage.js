import {
  Alert,
} from 'react-native';

import {
  fromTypeToApi,
} from './translate';

export default function sendMessage(websocket) {
  return (userKey, type, payload) => {
    if (websocket.isOpen) {
      const packet = JSON.stringify({
        type: fromTypeToApi(type),
        userKey,
        payload,
      });
      console.log('sending', packet);
      websocket.get('websocket').send(packet);
    } else {
      Alert.alert(
        'Websocket is not connected',
        'Wruh wroh, your message was thrown in the trash.'
      );
    }
  };
}
