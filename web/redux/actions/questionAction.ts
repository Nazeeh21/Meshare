import { SET_ACCEPTED_ANSWER, SET_BOUNTY_AMOUNT, SET_QUESTION_CREATOR_ID, SET_SEARCHED } from "../actionTypes/types";

export const setAcceptedAnswer = (data) => {
  console.log("data from the store action", data);
  return async (dispatch) => {
    dispatch({
      type: SET_ACCEPTED_ANSWER,
      data: data,
    });
  };
};

export const setCurrentQuestionCreatorId = (data) => {
  return async (dispatch) => {
    dispatch({
      type: SET_QUESTION_CREATOR_ID,
      data: data,
    });
  };
}

export const setBountyAmount = (bountyAmount) => {
  return async (dispatch) => {
    dispatch({
      type: SET_BOUNTY_AMOUNT,
      data: bountyAmount,
    });
  };
};

export const setSearchedValue = (searchedValue) => {
  return {
    type: SET_SEARCHED,
    data: searchedValue,
  };
};
