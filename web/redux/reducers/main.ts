import { FETCH_USERS } from '../actionTypes/types';

const initState: object = {
  userdata: null,
  isLoggedIn: false,
};

const main = (state = initState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, userData: action.userData, isLoggedIn: true };
    default:
      return {
        ...state,
      };
  }
};

export default main;
