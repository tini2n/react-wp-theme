import {
    UPDATE_POSTS,
    UPDATE_POST
} from 'storage/actions/posts';

const postsReducers = (
    state = {},
    action
) => {
    switch (action.type) {
        case UPDATE_POSTS: {
            return { ...state, ...action.payload }
        }
        case UPDATE_POST: {
            return { ...state, [action.payload.id]: action.payload }
        }
        default:
            return state;
    }
};

export default postsReducers;