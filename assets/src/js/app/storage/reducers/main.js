import {
    UPDATE_MAIN,
    UPDATE_ARTICLES_IDS,
    UPDATE_TV_IDS,
    UPDATE_NOTE_IDS,
    UPDATE_SEARCH_ITEMS_IDS,
    UPDATE_NEAREST_FEED,
    UPDATE_NEAREST_FEED_BEFORE,
    UPDATE_NEAREST_FEED_AFTER
} from 'storage/actions/main';

const mainReducers = (
    state = {},
    action
) => {
    switch (action.type) {
        case UPDATE_MAIN: {
            return {
                ...action.payload
            }
        }
        case UPDATE_ARTICLES_IDS: {
            return {
                ...state,
                articles: [ ...state.articles, ...action.payload ]
            }
        }
        case UPDATE_TV_IDS: {
            return {
                ...state,
                tvs: [ ...state.tvs, ...action.payload ]
            }
        }
        case UPDATE_NOTE_IDS: {
            return {
                ...state,
                notes: [ ...state.notes, ...action.payload ]
            }
        }
        case UPDATE_NEAREST_FEED: {
            return {
                ...state,
                nearest_feed: action.payload
            }
        }
        case UPDATE_NEAREST_FEED_BEFORE: {
            return {
                ...state,
                nearest_feed: { before: action.payload }
            }
        }
        case UPDATE_NEAREST_FEED_AFTER: {
            return {
                ...state,
                nearest_feed: { after: action.payload }
            }
        }
        case UPDATE_SEARCH_ITEMS_IDS: {
            return {
                ...state,
                items: [ ...state.items, ...action.payload ]
            }
        }
        default:
            return state;
    }
};

export default mainReducers;