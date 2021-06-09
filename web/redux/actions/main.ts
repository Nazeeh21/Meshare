import { FETCH_USERS } from '../actionTypes/types';

export const getUsers = (data, error) => {
  return async (dispatch) => {
    if (data?.getUser && !error) {
      dispatch({
        type: FETCH_USERS,
        userData: data.getUser,
      });
    }

    if (error) {
      console.log('error while fetching user data: ', error);
    }
  };
};
