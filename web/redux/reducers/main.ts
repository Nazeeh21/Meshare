import { FETCH_USERS } from "../types";
const initState: object = {
  users: [],
};

const main = (state = initState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, users: action.payload.popular };
    default:
      return {
        ...state,
      };
  }
};

export default main;
