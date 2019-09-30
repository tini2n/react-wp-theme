import React, { Component } from 'react';

import { FacebookProvider, Like, Comments } from 'react-facebook';

import { toISO, toHumanShortDate } from 'services/dateServices';

import Link from 'components/InternalLink';
import UniversalLink from 'components/UniversalLink';
import Tags from 'components/partials/Tags';

import TwitterIcon from 'images/icons/twitter-icon.svg';

class ArticleFooter extends Component {

    render() {
        const {
            published,
            updated,
            category = { url: '' },
            tags = [],
            articleTitle,
            articleLink,
            paywall
        } = this.props;

        return (
            <div className="article-footer">
                <div className="dateline">
                    <div className="social-likes">
                        <div className="facebook-like">
                            <FacebookProvider appId="2320129771643814">
                                <Like href={location.href} showFaces={false} width={'70'} layout={'button_count'}/>
                            </FacebookProvider>
                        </div>
                        <UniversalLink className="twitter-share"
                                       target="_blank"
                           to={`https://twitter.com/intent/tweet?text=${encodeURIComponent(articleTitle)}&url=${articleLink}`}>
                            <TwitterIcon/>
                            Tweet
                        </UniversalLink>
                    </div>
                    <time className="published" dateTime={toISO(published)}>{toHumanShortDate(published)}</time>
                    {updated != published &&
                    <time className="updated" dateTime={toISO(published)}>Oppdatert: {toHumanShortDate(updated)}</time>}
                </div>
                <div className="tagline">
                    {category.url && <Link to={category.url} className="category-label">{category.title}</Link>}
                    <Tags tags={tags}/>
                </div>
                {!paywall &&
                    <FacebookProvider>
                        <Comments width="100%"/>
                    </FacebookProvider>
                }
            </div>
        )
    }
}


export default ArticleFooter;