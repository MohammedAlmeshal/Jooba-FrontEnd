import {
  GET_PROFILE,
  ASK_QUESTION,
  PROFILE_LOADING,
  DELETE_POST,
  ANSWER_QUESTION,
} from "../actions/types";

const initialState = {
  profile: {
    posts: [],
  },
  isLoading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        isLoading: false,
      };
    // case ASK_QUESTION:
    //   return { ...state, posts: [action.payload, ...state.posts] };
    case DELETE_POST:
      return {
        ...state,
        profile: {
          ...state.profile,
          posts: state.profile.posts.filter(
            (post) => post._id !== action.payload
          ),
        },
      };
    case ANSWER_QUESTION:
      return {
        ...state,
        profile: {
          ...state.profile,
          posts: [
            action.payload.post,
            ...state.profile.posts.filter(
              (post) => post._id != action.payload.id
            ),
          ],
        },
      };
    case PROFILE_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}
