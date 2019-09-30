import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Helmet } from 'react-helmet';
import { isMobile } from 'react-device-detect';

import {
    getMissingArrayFromObj,
    formMainIdsArray
} from 'services/postsServices';

import { toTop } from 'services/miscServices';

import { fetchHead } from 'storage/actions/head';
import { fetchPosts } from 'storage/actions/posts';
import {
    isLoading,
    updateArticleNavState,
    changePushMenuState
} from 'storage/actions/main';

import Loader from 'components/Loader';
import Header from 'components/Header';
import Footer from 'components/Footer';
import GdprRibbon from 'components/GdprRibbon';

class Layout extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidUpdate(prevProps) {
        const {
            posts_by_ids,
            isPushMenuOpen
        } = this.props;

        const {
            fetchHead,
            fetchPosts,
            loader,
            updateArticleNavState,
            changePushMenuState,
        } = this.props;

        const pathname = location.pathname;

        if (this.props.location.pathname === prevProps.location.pathname &&
            this.props.location.search === prevProps.location.search) {

            return
        }

        toTop();

        if (isMobile && isPushMenuOpen) {
            changePushMenuState(false);
        }

        updateArticleNavState(false);

        const newMain = await fetchHead(pathname);
        const mainIds = formMainIdsArray(newMain);
        const missingIds = getMissingArrayFromObj(mainIds, posts_by_ids);

        if (missingIds.length) {
            fetchPosts(missingIds)
        } else {
            loader(false)
        }
    }

    generateHeadTag (item, i) {
        let attrs = { ...item, key: i };

        for (let key in item) {
            if (!item[key] || key === 'tag') {
                delete attrs[key]
            }
        }

        return React.createElement(item.tag, attrs, item.text);
    }

    headLayout(head) {
        return head.map(this.generateHeadTag)
    }

    render() {
        const {
            head,
            header,
            footer,
            menus,
            categories_by_ids,
            isLoading,
            isPushMenuOpen
        } = this.props;

        const {
            changePushMenuState
        } = this.props;

        const {
            news_menu = [],
            footer_menu = []
        } = menus;

        return (
            <Fragment>
                <Helmet>
                    {this.headLayout(head)}
                </Helmet>
                <div className="global-wrapper">
                    <GdprRibbon/>
                    <Header menus={menus}
                            header={header}
                            categories={categories_by_ids}
                            isPushMenuOpen={isPushMenuOpen}
                            changePushMenuState={changePushMenuState} />
                    <div className="main-layout">
                        {this.props.children}
                        {isLoading && <Loader/>}
                    </div>
                </div>
                <Footer footer={footer}
                        categories={news_menu}
                        menu={footer_menu} />
            </Fragment>
        )
    }
}

const mapStateToProps = ({
    menus,
    header,
    footer,
    categories_by_ids,
    posts_by_ids,
    head,
    main,
    isArticleNavOpen,
    isLoading,
    isPushMenuOpen
}) => ({
    head,
    main,
    header,
    footer,
    menus,
    categories_by_ids,
    posts_by_ids,
    isArticleNavOpen,
    isLoading,
    isPushMenuOpen
});

const mapDispatchToProps = dispatch => ({
    fetchHead: payload => dispatch(fetchHead(payload)),
    fetchPosts: payload => dispatch(fetchPosts(payload)),
    loader: payload => dispatch(isLoading(payload)),
    updateArticleNavState: payload => dispatch(updateArticleNavState(payload)),
    changePushMenuState: payload => dispatch(changePushMenuState(payload))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));