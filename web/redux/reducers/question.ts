import { SET_ACCEPTED_ANSWER } from '../actionTypes/types';

const initialState: object = {
  acceptedAnswer: null,
};

const questionResolver = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCEPTED_ANSWER:
      console.log('action.data from resolver: ', action.data)
      return { ...state, acceptedAnswer: action.data };
    default:
      return {
        ...state,
      };
  }
};

export default questionResolver;
