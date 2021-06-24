import { SET_ACCEPTED_ANSWER, SET_SEARCHED } from "../actionTypes/types";

const initialState: object = {
  acceptedAnswer: null,
  searchedValue: "",
};

const questionResolver = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCEPTED_ANSWER:
      console.log("action.data from resolver: ", action.data);
      return { ...state, acceptedAnswer: action.data };
    case SET_SEARCHED:
      return { ...state, searchedValue: action.data };
    default:
      return {
        ...state,
      };
  }
};

export default questionResolver;
