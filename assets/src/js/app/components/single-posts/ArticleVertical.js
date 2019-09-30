import React, { Component, Fragment } from 'react';

import htmlParser from 'react-html-parser';

import { formPostsArray } from 'services/postsServices';
import { profile } from 'utils/config';

import Thumbnail from 'components/Thumbnail';
import ArticleLoader from 'components/content-loaders/ArticleLoader';
import ArticleNavigation from 'components/partials/ArticleNavigation';
import ArticleTitle from 'components/partials/ArticleTitle';
import ArticleLead from 'components/partials/ArticleLead';
import ArticleFooter from 'components/partials/ArticleFooter';
import ImageSlider from 'components/ImageSlider';
import RelatedPosts from 'components/partials/RelatedPosts';
import NextArticle from 'components/partials/NextArticle';
import Paywall from "components/Paywall";
import Ads from 'components/Ads';

class ArticleVertical extends Component {
    constructor(props) {
        super(props);

        this.contentRef = React.createRef();
    }

    componentDidUpdate(prevProps) {
        const { renderContentBanners } = this.props;

        if (this.props.ads !== prevProps.ads) {
            if (this.props.ads.content) {
                renderContentBanners(this.contentRef, this.props.ads.content)
            }
        }
    }

    componentDidMount() {
        const {
            post,
            renderImageSliders,
            renderContentBanners
        } = this.props;

        if (!post.paywall) {
            renderImageSliders(post);
        }

        if (!post.paywall && this.props.ads.content) {
            renderContentBanners(this.contentRef, this.props.ads.content)
        }
    }

    render() {
        const {
            post,
            ads,
            nextPost,
            posts,
            categories,
            tagsByIds,
            feed = {},
            fetchNearestFeedBefore,
            fetchNearestFeedAfter,
            fetchCategoryFeed,
            fetchAllFeed,
            fetchPosts,
            updateArticleNavState,
            isArticleNavOpen,
            isLoading
        } = this.props;

        const {
            thumbnails,
            title,
            link,
            tags,
            additional_images = [],
            meta = { subtitle, is_paid_content, text_by, photo_by, text_and_photo_by },
            content,
            publish_date,
            update_date,
            main_category_id,
            excerpt,
            related_ids,
            paywall
        } = post;

        const {
            subtitle = '',
            is_paid_content = false,
            text_by = '',
            photo_by = '',
            text_and_photo_by = ''
        } = meta;

        const articleTitleProps = {
            title,
            subtitle,
            isPaid: is_paid_content
        };

        const articleLeadProps = {
            excerpt: excerpt,
            published: publish_date,
            updated: update_date,
            textBy: text_by,
            photoBy: photo_by,
            bothBy: text_and_photo_by,
            category: categories[main_category_id],
            toContent: true,
            articleLink: link,
            articleTitle: title
        };

        const articleFooterProps = {
            published: publish_date,
            updated: update_date,
            category: categories[main_category_id],
            tags: formPostsArray(tagsByIds, tags),
            articleLink: link,
            articleTitle: title,
            paywall
        };

        const articleNavigationProps = {
            ...feed,
            currentTitle: title,
            currentTime: publish_date,
            postId: post.id,
            categoryId: post.main_category_id,
            category: categories[post.main_category_id],
            isArticleNavOpen,
            isLoading,
            updateArticleNavState,
            fetchNearestFeedBefore,
            fetchNearestFeedAfter,
            fetchCategoryFeed,
            fetchAllFeed,
            fetchPosts,
            posts,
        };

        return (
            <section className="article vertical">
                <div className={`vertical-hero ${!thumbnails || meta.hide_thumbnail_on_single ? 'wo-thumb' : ''}`}>
                    <ArticleNavigation {...articleNavigationProps}/>
                    <div className="wrapper">
                        {thumbnails && !meta.hide_thumbnail_on_single &&
                            <Fragment>
                                <div className="thumbnail-container">
                                    <Thumbnail thumbnails={thumbnails} size="article-vert"/>
                                </div>
                                <div className="caption-container mobile">
                                    {thumbnails.caption && <p className="caption">{thumbnails.caption}</p>}
                                </div>
                            </Fragment>
                        }
                        <div className="title-container">
                            <ArticleTitle {...articleTitleProps}/>
                            <ArticleLead {...articleLeadProps}/>
                        </div>
                    </div>
                </div>
                <div className="caption-container">
                    {thumbnails.caption && <p className="caption">{thumbnails.caption}</p>}
                </div>
                <div className="wrapper-outer">
                    {!paywall && <Ads ad={ads[0]} imgSize="tall-ad"/>}
                    {!paywall && <Ads ad={ads[1]} imgSize="tall-ad"/>}
                    <div className="content-wrapper">
                        {!!additional_images.length && !paywall && <ImageSlider images={additional_images}/>}
                        {paywall && (!profile.isLogged || !profile.isSubscribed) ?
                            <Paywall withTitle/> :
                            content || !isLoading ? <div className="content" ref={content => this.contentRef = content}>{htmlParser(content)}</div> :
                                <ArticleLoader/>
                        }
                        <ArticleFooter {...articleFooterProps}/>
                    </div>
                </div>
                <RelatedPosts posts={formPostsArray(posts, related_ids)}
                              categories={categories}/>

                {nextPost &&
                    <NextArticle post={nextPost}
                                 categories={categories}/>}
            </section>
        )
    }
}

export default ArticleVertical;

