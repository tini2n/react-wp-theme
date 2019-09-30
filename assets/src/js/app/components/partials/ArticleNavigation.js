import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import { toISO, toHumanTime } from 'services/dateServices';
import { linkStringToInternal } from 'services/miscServices';
import { getMissingArrayFromObj, formMainIdsArray } from 'services/postsServices';

import Toggler from 'components/partials/Toggler';

import ArrowIcon from 'icons/arrow-icon.svg';
import NavIcon from 'icons/article-nav-icon.svg';
import CrossIcon from 'icons/cross-icon.svg';

class ArticleNavigation extends Component {
    constructor(props) {
        super(props);

        this.throughCategoriesHandler = this.throughCategoriesHandler.bind(this);
        this.openCloseHandler = this.openCloseHandler.bind(this);
        this.feedRender = this.feedRender.bind(this);

        this.state = {
            isLoading: false,
            isCategory: false,
            isOpen: false
        };
    }

    feedRender(feed) {

        return feed.map(post => {
            const link = linkStringToInternal(post.link);

            return (
                <Link key={post.id} to={link}>
                    <time dateTime={toISO(post.publish_date)}>{toHumanTime(post.publish_date)}</time>
                    {post.title}
                </Link>
            )
        });
    }

    async throughCategoriesHandler(e) {
        const {
            postId,
            categoryId,
            posts
        } = this.props;

        const {
            fetchCategoryFeed,
            fetchAllFeed,
            fetchPosts
        } = this.props;

        const checked = e.target.checked;
        const isCategory = checked ? true : false;

        let newMain;

        this.setState({ isLoading: true });
        this.setState({ isCategory: isCategory });

        if (checked) {
            newMain = await fetchCategoryFeed(postId, categoryId);
        } else {
            newMain = await fetchAllFeed(postId);
        }

        const mainIds = formMainIdsArray(newMain);
        const missingIds = getMissingArrayFromObj(mainIds, posts);

        if (missingIds.length) {
            await fetchPosts(missingIds)
        }

        this.setState({ isLoading: false });
    }

    openCloseHandler() {
        const { isArticleNavOpen, updateArticleNavState } = this.props;
        // const { isOpen } = this.state;

        updateArticleNavState(!isArticleNavOpen);
        // this.setState({ isOpen: !isOpen })
    }

    componentDidCatch(error, errorInfo) {
        console.log('catch:', error, errorInfo.componentStack)
    }

    render() {
        const {
            isLoading,
            isCategory,
        } = this.state;

        const {
            beforeFeed = [],
            afterFeed = [],
            currentTitle = '',
            currentTime = 0,
            category = { url: '/' },
            isArticleNavOpen
        } = this.props;

        const navLinks = {
            before: '/',
            after: '/',
            category: '/'
        };

        if (beforeFeed.length) {
            navLinks.before = linkStringToInternal(beforeFeed[0].link)
        }
        if (afterFeed.length) {
            navLinks.after = linkStringToInternal(afterFeed[afterFeed.length - 1].link)
        }
        if (isCategory) {
            navLinks.category = linkStringToInternal(category.url)
        }

        const toCategoryLinkStr = `se alle artikler fra ${category.title}`;
        const renderArchiveLink = isCategory ?
            <Link className="button" to={navLinks.category}>{toCategoryLinkStr}</Link> :
            <Link className="button" to="/">tilbake til forsiden</Link>;

        return (
            <div className={`article-navigation ${isArticleNavOpen ? 'opened' : ''} ${isLoading || this.props.isLoading ? 'loading' : ''}`}>
                <div className="heading">
                    <label className="category-toggler">
                        <div>
                            <small>se bare fra</small>
                            {category &&
                                <span>{category.title}</span>}
                        </div>
                        <Toggler handler={this.throughCategoriesHandler}/>
                    </label>
                    <div className="controls">
                        <Link className={`previous ${afterFeed.length ? '' : 'inactive'}`}
                              to={navLinks.after}>
                            <ArrowIcon/>
                            {isArticleNavOpen ? <span></span> : <span>forrige</span>}
                        </Link>
                        <button className="open-close"
                                onClick={this.openCloseHandler}>
                            {isArticleNavOpen ? <CrossIcon/> : <NavIcon/>}
                        </button>
                        <Link className={`next ${beforeFeed.length ? '' : 'inactive'}`}
                              to={navLinks.before}>
                            <span>neste</span>
                            <ArrowIcon/>
                        </Link>
                    </div>
                </div>
                <div className="container">
                    <nav>
                        {this.feedRender(afterFeed)}
                        <span className="active">
                            <time dateTime={toISO(currentTime)}>{toHumanTime(currentTime)}</time>
                            {currentTitle}
                        </span>
                        {this.feedRender(beforeFeed)}
                    </nav>
                    {renderArchiveLink}
                </div>
            </div>
        )
    }
}

export default ArticleNavigation;