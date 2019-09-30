import React, { Component } from 'react';
import { connect } from 'react-redux';

import { formPostsArray } from 'services/postsServices';

import { fetchPostsIdsByCat } from 'storage/actions/main';
import { fetchPosts } from 'storage/actions/posts';

import VideoPlayer from 'components/VideoPlayer';
import VideoListing from 'components/post-listing/VideoListing';
import LoadMore from 'components/LoadMore';

class TgnTV extends  Component {
    render() {
        const {
            posts_by_ids,
            main,
            fetchPostsIdsByCat,
            fetchPosts
        } = this.props;

        const posts = posts_by_ids;
        const postsIds = Object.keys(posts);
        const { tvs = [] } = main;

        const loadMoreProps = {
            fetchIdsHandler: fetchPostsIdsByCat,
            fetchPostsHandler: fetchPosts,
            offset: formPostsArray(posts, tvs).length,
            amount: 9,
            postsType: 'tv',
            slug: '',
            isCategory: true,
            postsIds,
        };

        return (
            <section className="tgn-tv">
                <VideoPlayer videos={formPostsArray(posts, tvs).slice(0, 9)}/>
                <VideoListing videos={formPostsArray(posts, tvs).slice(0)}/>
                <LoadMore {...loadMoreProps}/>
            </section>
        )
    }
}

const mapStateToProps = ({ main, posts_by_ids }) => ({
    main,
    posts_by_ids
});

const mapDispatchToProps = dispatch => ({
    fetchPostsIdsByCat: (postsType, slug, amount, offset) => dispatch(fetchPostsIdsByCat(postsType, slug, amount, offset)),
    fetchPosts: (ids) => dispatch(fetchPosts(ids))
});

export default connect(mapStateToProps, mapDispatchToProps)(TgnTV);