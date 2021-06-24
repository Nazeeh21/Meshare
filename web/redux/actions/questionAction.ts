import { SET_ACCEPTED_ANSWER, SET_SEARCHED } from "../actionTypes/types";

export const setAcceptedAnswer = (data) => {
  console.log("data from the store action", data);
  return async (dispatch) => {
    dispatch({
      type: SET_ACCEPTED_ANSWER,
      data: data,
    });
  };
};

export const setSearchedValue = (searchedValue) => {
  return {
    type: SET_SEARCHED,
    data: searchedValue,
  };
};
