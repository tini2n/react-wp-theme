import http from 'services/httpService';

export const UPDATE_HEAD = 'UPDATE_HEAD';

import { updateMain, isLoading } from 'storage/actions/main';

export const updateHead = payload => ({
    type: UPDATE_HEAD,
    payload
});

export const fetchHead = (pathname) => async (dispatch, getState) => {
    dispatch(isLoading(true));

    const origin = location.origin;
    const search = location.search;
    const prefix = search ? '&' : '?';

    try {
        const { data } = await http.get(`${origin}${pathname}${search}${prefix}format=json`);
        const { head, main } = data;

        dispatch(updateHead(head));
        dispatch(updateMain(main));

        return Promise.resolve(getState().main)
    } catch (err) {
        dispatch(isLoading(false));
        console.log(err.response.statusText);
    }
};