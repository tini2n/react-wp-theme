import { CHANGE_PUSH_MENU_STATE } from 'storage/actions/main';

const pushMenuResucer = (
    state = false,
    action
) => {
    switch (action.type) {
        case CHANGE_PUSH_MENU_STATE: {
            return action.payload
        }
        default:
            return state;
    }
};

export default pushMenuResucer;