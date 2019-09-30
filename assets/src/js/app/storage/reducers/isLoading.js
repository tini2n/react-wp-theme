import { IS_LOADING } from 'storage/actions/main';

const loadingReducer = (
    state = false,
    action
) => {
    switch (action.type) {
        case IS_LOADING: {
            return action.payload
        }
        default:
            return state;
    }
};

export default loadingReducer;