import { createAction, handleActions } from 'redux-actions';
import Immutable from 'immutable';
import api from 'lib/api';

let initialState = Immutable.fromJS({
  valid: false,
  state: false,
  user: {
    id: 0,
    email: null,
    username: null
  }
});

export const SET_LOGIN_STATE = 'SET_LOGIN_STATE';
export const SET_USER_INFO = 'SET_USER_INFO';

export const setLoginState = createAction(SET_LOGIN_STATE, (state = false) => state);
export const setUserInfo = createAction(SET_USER_INFO, (info) => info);

export const login = (username, password) => {
  return (dispatch) => {
    let body = { username, password };
    api.add('auth/signin', { body })
      .then((response) => {
        dispatch(setLoginState(true));
      })
      .catch((error) => {
        console.warn(error);
        if (error instanceof Error) {
          throw error;
        }
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    api.destroy('auth/logout')
      .then((response) => {
        if (response.success) {
          dispatch(setLoginState(false));
        }
      })
      .catch((error) => {
        console.warn(error);
        if (error instanceof Error) {
          throw error;
        }
      });
  };
};

export const fetchUserInfo = () => {
  return (dispatch) => {
    api.browse('auth/user')
      .then((response) => {
        if (response.user) {
          dispatch(setUserInfo(response.user));
        } else {
          dispatch(setLoginState(false));
        }
      })
      .catch((error) => {
        console.warn(error);
        if (error instanceof Error) {
          throw error;
        }
      });
  };
};

export let actions = {
  login,
  setLoginState,
  setUserInfo,
  fetchUserInfo,
  logout
};

export default handleActions({
  [SET_LOGIN_STATE]: (state, { payload }) => state.merge({valid: true, state: payload}),
  [SET_USER_INFO]: (state, { payload }) => {
    if (payload === {}) {
      return state.merge({valid: true, state: false});
    } else {
      return state.merge({valid: true, state: true, user: payload});
    }
  }
}, initialState);
