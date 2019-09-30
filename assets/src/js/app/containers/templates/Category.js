import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPostsIdsByCat } from 'storage/actions/main';
import { fetchPosts } from 'storage/actions/posts';

import { formPostsArray, checkPostsIdsLength } from 'services/postsServices';

import Ads from 'components/Ads';
import TemplateTitle from 'components/partials/TemplateTitle';
import PostListingWide from 'components/post-listing/PostListingWide';
import PostListing from 'components/post-listing/PostListing';
import PostsList from 'components/post-listing/PostsList';
import LoadMore from 'components/LoadMore';

class Category extends Component {
    render() {
        const {
            categories_by_ids,
            posts_by_ids,
            main,
            fetchPostsIdsByCat,
            fetchPosts
        } = this.props;

        const {
            articles = [],
            ads = [],
            current_object
        } = main;

        const {
            title,
            slug,
        } = current_object;

        const posts = posts_by_ids;
        const categories = categories_by_ids;
        const postsIds = Object.keys(posts);

        const loadMoreProps = {
            fetchIdsHandler: fetchPostsIdsByCat,
            fetchPostsHandler: fetchPosts,
            offset: 21,
            amount: 10,
            postsType: 'article',
            isCategory: true,
            postsIds,
            slug,
        };

        const articlesPosts = formPostsArray(posts, articles);

        return (
            <section className="category">
                <div className="wrapper">
                    <Ads ad={ads[0]}/>
                    <TemplateTitle title={title}/>
                    {checkPostsIdsLength(articles, 0, 3) &&
                        <PostListingWide posts={articlesPosts.slice(0, 3)}
                                         categories={categories} />}
                    {checkPostsIdsLength(articles, 3, 5) &&
                        <PostListing posts={articlesPosts.slice(3, 5)}
                                     categories={categories}
                                     size="m" />}
                    {checkPostsIdsLength(articles, 5, 8) &&
                        <PostListing posts={articlesPosts.slice(5, 8)}
                                     categories={categories}
                                     size="s"/>}
                    <Ads ad={ads[1]}/>
                    {checkPostsIdsLength(articles, 8, 11) &&
                        <PostListingWide posts={articlesPosts.slice(8, 11)}
                                         reversed
                                         categories={categories}/>}
                    {checkPostsIdsLength(articles, 11, 13) &&
                        <PostListing posts={articlesPosts.slice(11, 13)}
                                     categories={categories}
                                     size="m"/>}
                    {checkPostsIdsLength(articles, 13, 16) &&
                        <PostListing posts={articlesPosts.slice(13, 16)}
                                     categories={categories}
                                     size="s"/>}
                    {checkPostsIdsLength(articles, 16) &&
                        <PostsList posts={articlesPosts.slice(16)}
                                   categories={categories}/>}
                    {checkPostsIdsLength(articles, 20) &&
                        <LoadMore {...loadMoreProps}/>}
                    <Ads ad={ads[2]}/>
                </div>
            </section>
        )
    }
}

const mapStateToProps = ({ categories_by_ids, posts_by_ids, main }) => ({
    categories_by_ids,
    posts_by_ids,
    main
});

const mapDispatchToProps = dispatch => ({
    fetchPostsIdsByCat: (postsType, slug, amount, offset) => dispatch(fetchPostsIdsByCat(postsType, slug, amount, offset)),
    fetchPosts: (ids) => dispatch(fetchPosts(ids))
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);