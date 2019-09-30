import React, { Component } from 'react';
import Vimeo from '@u-wave/react-vimeo';

import htmlParser from 'react-html-parser';

import { formPostsArray } from 'services/postsServices';
import { profile } from 'utils/config';

import ArticleTitle from 'components/partials/ArticleTitle';
import ArticleNavigation from 'components/partials/ArticleNavigation';
import ArticleLead from 'components/partials/ArticleLead';
import Thumbnail from 'components/Thumbnail';
import ArticleFooter from 'components/partials/ArticleFooter';
import RelatedPosts from 'components/partials/RelatedPosts';
import NextArticle from 'components/partials/NextArticle';
import ImageSlider from 'components/ImageSlider';
import ArticleLoader from 'components/content-loaders/ArticleLoader';
import Paywall from "components/Paywall";
import Ads from 'components/Ads';

class Article extends Component {
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
            isLoading,
        } = this.props;

        const {
            title,
            link,
            excerpt,
            tags,
            main_category_id,
            meta = { subtitle, is_paid_content, text_by, photo_by, text_and_photo_by },
            publish_date = 0,
            update_date = 0,
            content,
            thumbnails,
            additional_images = [],
            related_ids,
            type,
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
            <section className="article">
                <div className="article-hero">
                    <ArticleTitle {...articleTitleProps}/>
                    {type !== 'tv' && <ArticleNavigation {...articleNavigationProps}/>}
                    <div className="wrapper-thin">
                        <ArticleLead {...articleLeadProps} />
                        <div className="hero-container">
                            {type !== 'tv' ?
                                (!!additional_images.length && !paywall) ?
                                    <ImageSlider images={additional_images}/> :
                                    (thumbnails && !meta.hide_thumbnail_on_single &&
                                        <div className="thumbnail-container">
                                            <Thumbnail size="article-thumb" thumbnails={thumbnails}/>
                                            {thumbnails.caption && <p className="caption">{thumbnails.caption}</p>}
                                        </div>
                                    )
                                :
                                <Vimeo className="video-container" video={meta.vimeo_video_link}/>
                            }
                        </div>
                    </div>
                </div>
                <div className="wrapper-outer">
                    {!paywall && <Ads ad={ads[0]} imgSize="tall-ad"/>}
                    {!paywall && <Ads ad={ads[1]} imgSize="tall-ad"/>}
                    <div className="content-wrapper">
                        {paywall && (!profile.isLogged || !profile.isSubscribed) ?
                            <Paywall withTitle/> :
                            content || !isLoading ? <div className="content" ref={content => this.contentRef = content}>{htmlParser(content)}</div> :
                                <ArticleLoader/>
                        }
                        <ArticleFooter {...articleFooterProps}/>
                    </div>
                </div>
                {related_ids &&
                    <RelatedPosts posts={formPostsArray(posts, related_ids)}
                                  categories={categories}/>}
                {nextPost &&
                    <NextArticle post={nextPost}
                                 categories={categories}/>}
            </section>
        )
    }
}

export default Article;