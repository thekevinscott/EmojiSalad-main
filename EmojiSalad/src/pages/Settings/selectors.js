import {
  updateSettings,
  logout,
} from './actions';

export const mapStateToProps = (state) => {
  return {
    me: state.data.me,
    pending: state.ui.Settings.pending,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      updateSettings: (form, me) => {
        return dispatch(updateSettings(form, me));
      },
      logout: () => {
        return dispatch(logout());
      },
    },
  };
};
