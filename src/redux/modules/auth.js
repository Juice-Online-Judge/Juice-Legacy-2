import { createAction, handleActions } from 'redux-actions';
import api from 'lib/api';

export const SET_LOGIN_STATE = 'SET_LOGIN_STATE';

export const setLoginState = createAction(SET_LOGIN_STATE, (state = false) => state);

export const login = (username, password) => {
  return (dispatch) => {
    let body = { username, password };
    api.add('auth/signin', { body })
      .then((response) => {
        console.log(response);
        dispatch(setLoginState(true));
      });
  };
};

export let actions = {
  login,
  setLoginState
};

export default handleActions({
  [SET_LOGIN_STATE]: (_state, { payload }) => payload
}, false);
