
import receive from '../routes/messages/receive';
import fetchFromService from '../../../utils/fetchFromService';

export default function sendUserInviteMessage(userKey, gameKey, phone) {
  console.log('sendUserInviteMessage');
  if (!userKey) {
    throw new Error('You must provide a user key');
  }
  if (!phone) {
    throw new Error('You must provide a phone');
  }

  const message = `Invite ${phone}`;

  const payload = {
    userKey,
    gameKey,
    message,
  };

  console.log('here we go: receive function: ', receive);

  const response = receive({}, payload);
  console.log('response', response);
  return response;
}
