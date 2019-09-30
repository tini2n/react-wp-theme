import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import _find from 'lodash/find';

import { formPostsArray } from 'services/postsServices';

import {
    fetchNearestFeedBefore,
    fetchNearestFeedAfter,
    fetchCategoryFeed,
    fetchAllFeed,
    updateArticleNavState
} from 'storage/actions/main';

import {
    fetchPosts,
    updatePosts,
    updatePost
} from 'storage/actions/posts';

import ArticleSpecial from 'components/single-posts/ArticleSpecial';
import ArticleVertical from 'components/single-posts/ArticleVertical';
import Article from 'components/single-posts/Article';
import ImageSlider from 'components/ImageSlider';
import ContentBanner from 'components/ContentBanner';

const renderSlider = (id, images) => {
    ReactDOM.render(<ImageSlider images={images[id]}/>, document.querySelector(`[data-js-object="${id}"]`))
};

const renderBanner = (banner, container) => {
    ReactDOM.render(<ContentBanner banner={banner}/>, container)
};

class SinglePost extends Component {
    constructor(props) {
        super(props);

        this.navigationKeyboardHandler = this.navigationKeyboardHandler.bind(this);
        this.cntrlPressedRemoveHandler = this.cntrlPressedRemoveHandler.bind(this);

        this.state = {
            cntrlIsPressed: false
        }
    }

    componentDidUpdate(prevProps) {
        const {
            posts_by_ids,
            main
        } = this.props;

        const { updatePost } = this.props;

        const {
            current_object,
        } = main;

        if (current_object.id !== prevProps.main.current_object.id) {
            if (posts_by_ids[current_object.id].load_state === 'part') {
                updatePost(current_object)
            }
        }
    }

    componentDidMount() {
        const {
            posts_by_ids,
            main,
            updatePosts
        } = this.props;

        const post = [];
        const posts = posts_by_ids;

        const {
            current_object,
        } = main;

        if (!posts[current_object.id]) {
            post[current_object.id] = current_object;
            updatePosts(post)
        }

        document.addEventListener('keydown', this.navigationKeyboardHandler);
        document.addEventListener('keyup', this.cntrlPressedRemoveHandler);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.navigationKeyboardHandler);
        document.removeEventListener('keyup', this.cntrlPressedRemoveHandler);
    }

    cntrlPressedRemoveHandler(e) {
        if (e.keyCode === 91) {
            this.setState({ cntrlIsPressed: false })
        }
    }

    navigationKeyboardHandler(e) {
        const {
            history,
            isLoading
        } = this.props;

        const { cntrlIsPressed } = this.state;

        if (isLoading) {
            return;
        }

        const {
            beforeFeed,
            afterFeed
        } = this.feed;

        const beforeLink = beforeFeed.length ? beforeFeed[0].link.split(location.origin).pop() : null;
        const afterLink = afterFeed.length ? afterFeed[afterFeed.length - 1].link.split(location.origin).pop() : null;

        const key = e.keyCode;

        if (key === 91) {
            this.setState({ cntrlIsPressed: true });
        }

        if (key === 37) {
            if (afterLink && !cntrlIsPressed)
                history.push({ pathname: afterLink });
        }

        if (key === 39) {
            if (beforeLink && !cntrlIsPressed)
                history.push({ pathname: beforeLink });
        }
    }

    renderImageSliders(post) {
        const galleriesImages = post.gallery_objects ? post.gallery_objects : {};
        const galleriesIds = Object.keys(galleriesImages);

        galleriesIds.map(id => renderSlider(id, galleriesImages));
    }

    renderContentBanners(content, ads) {
        const banners = content.getElementsByClassName('bnr-post-element');

        [].forEach.call(banners, bannerDom => {
            if (ads.hasOwnProperty(bannerDom.dataset.jsObject)) {
                const ad = ads[bannerDom.dataset.jsObject];

                renderBanner(ad, bannerDom);
            }
        });
    }

    renderPostType () {
        const {
            current_object,
            ads = [],
            nearest_feed = []
        } = this.props.main;

        const {
            categories_by_ids,
            tags_by_ids,
            posts_by_ids,
            isArticleNavOpen,
            isLoading
        } = this.props;

        const {
            fetchNearestFeedBefore,
            fetchNearestFeedAfter,
            fetchCategoryFeed,
            fetchAllFeed,
            updateArticleNavState
        } = this.props;

        const href = location.href;
        const toPost = _find(posts_by_ids, { link: href });
        const currentObj = current_object;

        this.feed = {
            beforeFeed: formPostsArray(posts_by_ids, nearest_feed.before),
            afterFeed: formPostsArray(posts_by_ids, nearest_feed.after)
        };

        let post;

        if (!toPost) {
            post = currentObj;
        } else if (toPost.id !== currentObj.id) {
            post = toPost
        } else if (!currentObj.id) {
            post = toPost
        } else {
            post = currentObj
        }

        const postProps = {
            post,
            ads,
            nextPost: this.feed.beforeFeed[0],
            posts: posts_by_ids,
            categories: categories_by_ids,
            tagsByIds: tags_by_ids,
            feed: this.feed,
            isArticleNavOpen,
            isLoading,
            updateArticleNavState,
            fetchNearestFeedBefore,
            fetchNearestFeedAfter,
            fetchCategoryFeed,
            fetchAllFeed,
            fetchPosts,
            renderImageSliders: this.renderImageSliders,
            renderContentBanners: this.renderContentBanners
        };

        const { meta = {} } = post;

        switch (meta.single_style) {
            case 'special':
                return (<ArticleSpecial {...postProps} />);
            case 'vertical':
                return (<ArticleVertical {...postProps} />);
            default:
                return (<Article {...postProps} />)
        }
    }

    render() {
        return (
            <section className="single-post">
                {this.renderPostType()}
            </section>
        )
    }
}

const mapStateToProps = ({
    main,
    categories_by_ids,
    posts_by_ids,
    tags_by_ids,
    isArticleNavOpen,
    isLoading
}) => ({
    main,
    categories_by_ids,
    posts_by_ids,
    tags_by_ids,
    isArticleNavOpen,
    isLoading
});

const mapDispatchToProps = dispatch => ({
    fetchNearestFeedBefore: (postId, categoryId, offset) => dispatch(fetchNearestFeedBefore(postId, categoryId, offset)),
    fetchNearestFeedAfter: (postId, categoryId, offset) => dispatch(fetchNearestFeedAfter(postId, categoryId, offset)),
    fetchCategoryFeed: (postId, categoryId) => dispatch(fetchCategoryFeed(postId, categoryId)),
    fetchAllFeed: (postId) => dispatch(fetchAllFeed(postId)),
    fetchPosts: (ids) => dispatch(fetchPosts(ids)),
    updateArticleNavState: (payload) => dispatch(updateArticleNavState(payload)),
    updatePosts: posts => dispatch(updatePosts(posts)),
    updatePost: post => dispatch(updatePost(post))
});

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);