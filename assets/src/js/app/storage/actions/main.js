import {
    getBeforeFeedIds,
    getAfterFeedIds,
    getCategoryFeedIds,
    getAllFeedIds
} from 'services/feedServices';

import {
    getMissingArrayFromObj,
    getMoreHomeArticlesIds,
    getPostsIdsByCat,
    getMoreSearchItemsIds
} from 'services/postsServices';

import { fetchPosts } from 'storage/actions/posts';

export const UPDATE_MAIN = 'UPDATE_MAIN';
export const IS_LOADING = 'IS_LOADING';
export const IS_ARTICLE_NAV_OPEN = 'IS_ARTICLE_NAV_OPEN';
export const UPDATE_ARTICLES_IDS = 'UPDATE_ARTICLES_IDS';
export const UPDATE_SEARCH_ITEMS_IDS = 'UPDATE_SEARCH_ITEMS_IDS';
export const UPDATE_TV_IDS = 'UPDATE_TV_IDS';
export const UPDATE_NOTE_IDS = 'UPDATE_NOTE_IDS';
export const UPDATE_NEAREST_FEED = 'UPDATE_NEAREST_FEED';
export const UPDATE_NEAREST_FEED_BEFORE = 'UPDATE_NEAREST_FEED_BEFORE';
export const UPDATE_NEAREST_FEED_AFTER = 'UPDATE_NEAREST_FEED_AFTER';
export const CHANGE_PUSH_MENU_STATE = 'CHANGE_PUSH_MENU_STATE';

export const isLoading = payload => ({
    type: IS_LOADING,
    payload
});

export const changePushMenuState = payload => ({
    type: CHANGE_PUSH_MENU_STATE,
    payload
});

export const updateArticleNavState = payload => ({
    type: IS_ARTICLE_NAV_OPEN,
    payload
});

export const updateMain = payload => ({
    type: UPDATE_MAIN,
    payload
});

export const updateArticlesIds = payload => ({
    type: UPDATE_ARTICLES_IDS,
    payload
});

export const updateSearchItemsIds = payload => ({
    type: UPDATE_SEARCH_ITEMS_IDS,
    payload
});

export const updateTvIds = payload => ({
    type: UPDATE_TV_IDS,
    payload
});

export const updateNoteIds = payload => ({
    type: UPDATE_NOTE_IDS,
    payload
});

export const updateNearestFeed = payload => ({
    type: UPDATE_NEAREST_FEED,
    payload
});

export const updateNearestFeedBefore = payload => ({
    type: UPDATE_NEAREST_FEED_BEFORE,
    payload
});

export const updateNearestFeedAfter = payload => ({
    type: UPDATE_NEAREST_FEED_AFTER,
    payload
});

export const fetchArticlesIds = (offset) => async dispatch => {
    try {
        const { data } = await getMoreHomeArticlesIds(offset);

        dispatch(updateArticlesIds(data));
        return data
    } catch (err) {
        console.log(err.response.statusText);
    }
};

export const fetchSearchItemsIds = (offset, amount, category, after, before) => async dispatch => {
    try {
        const { data } = await getMoreSearchItemsIds(offset, amount, category, after, before);

        dispatch(updateSearchItemsIds(data));
        return data
    } catch (err) {
        console.log(err);
    }
};

export const fetchPostsIdsByCat = (postsType, slug, amount, offset) => async dispatch => {
    try {
        const { data } = await getPostsIdsByCat(postsType, slug, amount, offset);

        switch (postsType) {
            case 'article':
                dispatch(updateArticlesIds(data));
                break;
            case 'tv':
                if (data) dispatch(updateTvIds(data));
                break;
            case 'note':
                if (data) dispatch(updateNoteIds(data));
                break;
            default:
                dispatch(updateArticlesIds(data));
        }

        return data
    } catch (err) {
        console.log(err.response.statusText);
    }
};

export const fetchCategoryFeed = (postId, categoryId) => async (dispatch, getState) => {
    try {
        const { data } = await getCategoryFeedIds(postId, categoryId);

        dispatch(updateNearestFeed(data));
        return Promise.resolve(getState().main)
    } catch (err) {
        console.log(err.response.statusText);
    }
};

export const fetchAllFeed = (postId) => async (dispatch, getState) => {
    try {
        const { data } = await getAllFeedIds(postId);

        dispatch(updateNearestFeed(data));
        return Promise.resolve(getState().main)
    } catch (err) {
        console.log(err.response.statusText);
    }
}

export const fetchNearestFeedBefore = (postId, categoryId, offset) => async (dispatch, getState) => {
    try {
        const { data } = await getBeforeFeedIds(postId, categoryId, offset);
        const posts = getState().posts_by_ids;

        dispatch(updateNearestFeedBefore(data));
        if (getMissingArrayFromObj(data, posts).length) {
            dispatch(fetchPosts(getMissingArrayFromObj(data, posts)))
        }
    } catch (err) {
        console.log(err.response.statusText);
    }
};

export const fetchNearestFeedAfter = (postId, categoryId, offset) => async (dispatch) => {
    try {
        const { data } = await getAfterFeedIds(postId, categoryId, offset);

        dispatch(updateNearestFeedAfter(data));
    } catch (err) {
        console.log(err.response.statusText);
    }
};