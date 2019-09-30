import { UPDATE_HEAD } from 'storage/actions/head';

const headReducers = (
    state = [],
    action
) => {
    switch (action.type) {
        case UPDATE_HEAD: {
            return [ ...action.payload ]
        }
        default:
            return state;
    }
};

export default headReducers;