import { USER_MOVIES_FETCH_REQUESTED } from "./actions";

export const reducer = (state = {
  movies: []
}, action) => {
  switch (action.type) {
    case USER_MOVIES_FETCH_REQUESTED: {
      const movies = action.payload.data
      return {
        ...state,
        movies
      }
    }
    default: {
      return state
    }
  }
}