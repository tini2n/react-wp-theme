import { UPDATE_SEARCH } from 'storage/actions/search';

const searchReducer = (
    state = '',
    action
) => {
    switch (action.type) {
        case UPDATE_SEARCH: {
            return action.payload
        }
        default:
            return state;
    }
};

export default searchReducer