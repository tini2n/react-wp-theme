import { apiUrl, apiEndpoints } from 'utils/config';
import http from './httpService';

export const getPostsByIds = ids =>
    http.get(`${apiUrl}${apiEndpoints.posts}`, { params: { ids } });
export const getPostsIdsByCat = (postsType, slug, amount, offset) =>
    http.get(`${apiUrl}${apiEndpoints.postsIdsByType}${postsType}&category_name=${slug}&posts_per_page=${amount}&offset=${offset}`);
export const getMoreHomeArticlesIds = offset =>
    http.get(`${apiUrl}${apiEndpoints.home}?offset=${offset}`);
export const getMoreSearchItemsIds = (amount, offset, category, after, before) =>
    http.get(`${apiUrl}${apiEndpoints.searchPostsIds}${location.search}&offset=${offset}&posts_per_page=${amount}${category ? `&cat_name=${category}` : ''}${after ? `&after=${after}` : ''}${before ? `&before=${before}` : ''}`);

export const getMissingArrayFromObj = (arr, obj) =>
    arr.filter(item => item in obj ? false : item);
export const getMissingArrayElements = (fromArr, trgtArr) =>
    fromArr.filter(item => trgtArr.includes(item) ? false : item);
export const checkPostsIdsLength = (arr, from, to) => !!arr.slice(from, to).length;

export const formMainIdsArray = main => {
    const mainKeys = Object.keys(main);
    let mainIds = [];

    mainKeys.map(key => {
        if (key === 'current_object' ||
            key === 'ads' ||
            key === 'instagram_feed') {
            return
        }

        if (key === 'nearest_feed') {
            mainIds.push(...main[key].before);
            mainIds.push(...main[key].after);
        } else {
            mainIds.push(...main[key]);
        }
    });

    return mainIds
};

export const formPostsArray = (posts, ids) => {
    let postsByIds = [];

    if (!ids) return [];

    ids.map((id) => {
        if (posts[id]) postsByIds.push(posts[id]);
    });

    return postsByIds
};

export default {
    formPostsArray,
    formMainIdsArray,
    getPostsByIds,
    getMissingArrayFromObj
}