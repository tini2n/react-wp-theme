import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import GTM from 'react-gtm-module';

import { Provider } from 'react-redux';
import store from 'storage/store';

import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from 'history';

import config from 'utils/config';
const { routes, gtm_key } = config;

import Layout from 'containers/Layout';
import Loader from 'components/Loader';

const FrontPage = lazy(() => import('containers/templates/FrontPage'));
const DailyNotes = lazy(() => import('containers/templates/DailyNotes'));
const Category = lazy(() => import('containers/templates/Category'));
const SinglePost = lazy(() => import('containers/templates/SinglePost'));
const TgnTV = lazy(() => import('containers/templates/TgnTV'));
const Page = lazy(() => import('containers/templates/Page'));
const BookSubscription = lazy(() => import('containers/templates/BookSubscription'));

const history = createBrowserHistory();
const GTMargs = { gtmId: gtm_key };

GTM.initialize(GTMargs);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Layout>
                <Suspense fallback={<Loader/>}>
                    <Switch>
                        <Route exact path={routes.home} component={FrontPage}/>
                        <Route path={routes.article} component={SinglePost}/>
                        <Route path={routes.tv} component={SinglePost}/>
                        <Route path={routes.category} component={Category}/>
                        <Route path={routes.tag} component={Category}/>
                        <Route path={routes.tv_archive} component={TgnTV}/>
                        <Route path={routes.notice_archive} component={DailyNotes}/>
                        <Route path={routes.subscription} component={BookSubscription}/>
                        <Route component={Page}/>
                    </Switch>
                </Suspense>
            </Layout>
        </Router>
    </Provider>, document.getElementById('app'));