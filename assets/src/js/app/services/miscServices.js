import _debounce from 'lodash/debounce';

export const toTop = _debounce(() => window.scrollTo(0, 0), 1000, { 'leading': true, 'trailing': false });
export const linkStringToInternal = str => str.split(window.location.origin)[1];