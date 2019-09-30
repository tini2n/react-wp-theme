import { apiUrl, apiEndpoints } from 'utils/config';
import http from './httpService';

export const getBeforeFeedIds = (postId, categoryId, offset = 0) => http.get(`${apiUrl}${apiEndpoints.feed}/${postId}?before=1&offset=${offset}&category_id=${categoryId}`);
export const getAfterFeedIds = (postId, categoryId, offset = 0) => http.get(`${apiUrl}${apiEndpoints.feed}/${postId}?after=1&offset=${offset}&category_id=${categoryId}`);
export const getCategoryFeedIds = (postId, categoryId) => http.get(`${apiUrl}${apiEndpoints.feed}/${postId}?after=1&before=1&category_id=${categoryId}`);
export const getAllFeedIds = postId => http.get(`${apiUrl}${apiEndpoints.feed}/${postId}`);