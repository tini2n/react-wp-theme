import { IS_ARTICLE_NAV_OPEN } from 'storage/actions/main';

const articleNavReducer = (
    state = false,
    action
) => {
    switch (action.type) {
        case IS_ARTICLE_NAV_OPEN: {
            return action.payload
        }
        default:
            return state;
    }
};

export default articleNavReducer;