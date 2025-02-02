import {
  UPDATE_USER,
} from './types';

import {
  LOCAL_LOGOUT,
} from 'core/redux/middlewares/authenticationMiddleware/types';

export const updateSettings = (data, me) => dispatch => {
  return dispatch({
    type: UPDATE_USER,
    payload: {
      data: {
        ...data,
        key: me.key,
        registered: true,
      },
    },
  });
};

export const logout = () => {
  return {
    type: LOCAL_LOGOUT,
  };
};
