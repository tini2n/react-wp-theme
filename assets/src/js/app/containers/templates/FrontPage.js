import React, { Component, lazy } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import queryString from 'query-string';

import { fetchArticlesIds } from 'storage/actions/main';
import { fetchPosts } from 'storage/actions/posts';

import { formPostsArray, checkPostsIdsLength } from 'services/postsServices';
import config from 'utils/config';

import Page from "containers/templates/Page";
import PostListingWide from 'components/post-listing/PostListingWide';
import PostListing from 'components/post-listing/PostListing';
import PostWithList from 'components/post-listing/PostWithList'
import PostsWithWidget from 'components/post-listing/PostsWithWidget';
import HestemarkedWidget from 'components/HestemarkedWidget.js'
import PostsSlider from 'components/PostsSlider';
import LastVideos from 'components/LastVideos';
import LastTips from 'components/LastTips';
import InstagramFeed from 'components/InstagramFeed';
import Ads from 'components/Ads';
import Note from 'components/Note';
import LoadMore from 'components/LoadMore';

const Search = lazy(() => import('containers/templates/Search'));
const SinglePost = lazy(() => import('containers/templates/SinglePost'));

class FrontPage extends Component {
    render() {
        const {
            posts_by_ids,
            categories_by_ids,
            main,
            location
        } = this.props;

        const {
            fetchArticlesIds,
            fetchPosts
        } = this.props;

        const {
            articles = [],
            notes = [],
            tvs = [],
            tips = [],
            instagram_feed = [],
            ads = []
        } = main;

        if ('s' in queryString.parse(location.search)) {
            return <Search />;
        }

        if (queryString.parse(location.search).post_type === 'article' ||
            queryString.parse(location.search).post_type === 'tv') {
            return <SinglePost />
        }

        if (queryString.parse(location.search).page_id) {
            return <Page/>
        }

        const posts = posts_by_ids;
        const postsIds = Object.keys(posts);
        const categories = categories_by_ids;

        const loadMoreProps = {
            fetchIdsHandler: fetchArticlesIds,
            fetchPostsHandler: fetchPosts,
            offset: 26,
            postsIds
        };

        const articlesPosts = formPostsArray(posts, articles);
        const tvsPosts = formPostsArray(posts, tvs);
        const notesPosts = formPostsArray(posts, notes);

        return (
            <section className="front-page">
                <div className="wrapper">
                    <Ads ad={ads[0]} size="wide"/>
                    {checkPostsIdsLength(articles, 0, 3) &&
                        <PostListingWide posts={articlesPosts.slice(0, 3)}
                                         categories={categories}/>
                    }
                    {checkPostsIdsLength(notes, 0, 9) &&
                        <PostsSlider posts={notesPosts.slice(0, 9)}
                                     categories={categories}
                                     PostItem={Note}
                                     archiveLink={config.routes.notice_archive}
                                     linkText="Vis alle"
                                     title="Smånytt"/>
                    }
                    {checkPostsIdsLength(articles, 3, 6) &&
                        <PostListing posts={articlesPosts.slice(3, 6)}
                                     categories={categories}
                                     size="s"/>
                    }
                    {checkPostsIdsLength(articles, 6, 8) &&
                        <PostsWithWidget posts={articlesPosts.slice(6, 8)}
                                         categories={categories}
                                         btnLink="https://www.facebook.com/travoggaloppnytt/"
                                         btnTitle="Trav og Galopp-nytt på Facebook"
                                         title="Travsporten i sosiale medier"/>
                    }
                    {checkPostsIdsLength(articles, 8, 12) &&
                        <PostWithList posts={articlesPosts.slice(8, 12)}
                                      categories={categories}/>
                    }
                    <HestemarkedWidget/>
                    {checkPostsIdsLength(articles, 12, 14) &&
                        <PostListing posts={articlesPosts.slice(12, 14)}
                                     categories={categories}
                                     size="m"/>
                    }
                    {!!tips.length &&
                        <LastTips tips={tips}
                                  title="SISTE FRA tips og spill"/>
                    }
                    {checkPostsIdsLength(articles, 14, 17) &&
                        <PostListing posts={articlesPosts.slice(14, 17)}
                                     categories={categories}
                                     size="s"/>
                    }
                    <Ads ad={ads[1]} size="wide"/>
                    {checkPostsIdsLength(articles, 17, 20) &&
                        <PostListingWide posts={articlesPosts.slice(17, 20)}
                                         categories={categories}/>
                    }
                    {checkPostsIdsLength(tvs, 0, 9) &&
                        <LastVideos videos={tvsPosts.slice(0, 9)}
                                    linkToTV={config.routes.tv_archive}
                                    title="Siste fra TGN TV"/>
                    }
                    {checkPostsIdsLength(articles, 20, 22) &&
                        <PostListing posts={articlesPosts.slice(20, 22)}
                                     categories={categories}
                                     size="m"/>
                    }
                    <Ads ad={ads[2]} size="wide"/>
                    {checkPostsIdsLength(articles, 22) &&
                        <PostListing posts={articlesPosts.slice(22)}
                                     categories={categories}
                                     size="s"/>
                    }
                    <LoadMore {...loadMoreProps} />
                    {!!instagram_feed.length &&
                        <InstagramFeed feed={instagram_feed}/>
                    }
                </div>
            </section>
        )
    }
}

const mapStateToProps = ({
    posts_by_ids,
    categories_by_ids,
    main,
    header
}) => ({
    posts_by_ids,
    categories_by_ids,
    main,
    header,
});

const mapDispatchToProps = dispatch => ({
    fetchArticlesIds: (offset) => dispatch(fetchArticlesIds(offset)),
    fetchPosts: (ids) => dispatch(fetchPosts(ids))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FrontPage));