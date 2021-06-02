import { FETCH_USERS } from "../types";

export const getUsers = () => async (dispatch) => {
  dispatch({
    type: FETCH_USERS,
    payload: {},
  });
};
