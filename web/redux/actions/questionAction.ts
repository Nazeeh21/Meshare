import { SET_ACCEPTED_ANSWER } from "../actionTypes/types";

export const setAcceptedAnswer = (data) => {
  console.log('data from the store action', data)
  return async (dispatch) => {
    dispatch({
      type: SET_ACCEPTED_ANSWER,
      data: data
    })
  }
}