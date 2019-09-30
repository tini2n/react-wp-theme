import { getPostsByIds } from 'services/postsServices';

export const UPDATE_POSTS = 'UPDATE_POSTS';
export const UPDATE_POST = 'UPDATE_POST';

import { isLoading } from 'storage/actions/main';

export const updatePosts = payload => ({
    type: UPDATE_POSTS,
    payload
});

export const updatePost = payload => ({
    type: UPDATE_POST,
    payload
});

export const fetchPosts = ids => async dispatch => {
    const { data } = await getPostsByIds(ids);

    dispatch(updatePosts(data));
    dispatch(isLoading(false));
};
