import { combineReducers } from 'redux';

import headerReducers from './header';
import footerReducers from './footer';
import mainReducers from './main';
import postsReducers from './posts';
import menusReducers from './menus';
import categoriesReducers from './categories';
import tagsReducers from './tags';
import headReducers from './head';
import isLoading from './isLoading';
import isPushMenuOpen from './isPushMenuOpen';
import articleNavReducer from './articleNav';
import searchReducer from './search';

const reducers = combineReducers({
    header: headerReducers,
    footer: footerReducers,
    main: mainReducers,
    menus: menusReducers,
    posts_by_ids: postsReducers,
    categories_by_ids: categoriesReducers,
    tags_by_ids: tagsReducers,
    head: headReducers,
    search: searchReducer,
    isArticleNavOpen: articleNavReducer,
    isLoading,
    isPushMenuOpen,
});

export default reducers;