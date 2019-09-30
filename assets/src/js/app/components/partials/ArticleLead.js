import React  from 'react'

import { toISO, toHumanShortDate } from 'services/dateServices';

import ToContent from 'components/partials/ToContent';
import Link from 'components/InternalLink';
import UniversalLink from 'components/UniversalLink';
import FacebookIcon from 'images/icons/facebook-icon.svg';
import TwitterIcon from 'images/icons/twitter-icon.svg';

const ArticleLead = ({
    excerpt,
    published,
    updated,
    photoBy,
    textBy,
    bothBy,
    category = { url: '' },
    toContent,
    articleLink,
    articleTitle
}) => {

    const TextPhotoBy = function() {
        return (
            <div>
                {textBy && <p>tekst av <strong>{textBy}</strong></p>}
                {photoBy && <p>foto av <strong>{photoBy}</strong></p>}
            </div>
        )
    };

    return (
        <div className="article-lead">
            {excerpt && <p>{excerpt}</p>}
            <div className="dateline">
                <time className="published" dateTime={toISO(published)}>{toHumanShortDate(published)}</time>
                {updated != published && <time className="updated" dateTime={toISO(updated)}>Oppdatert: {toHumanShortDate(updated)}</time>}
                <div className="social-share">
                    <span>DEL:</span>
                    <UniversalLink to={`https://www.facebook.com/sharer/sharer.php?u=${articleLink}`} target="_blank">
                        <FacebookIcon/>
                    </UniversalLink>
                    <UniversalLink to={`http://twitter.com/share?text=${encodeURIComponent(articleTitle)}&url=${articleLink}`} target="_blank">
                        <TwitterIcon/>
                    </UniversalLink>
                </div>
            </div>
            <div className="byline">
                {category.url && <Link to={category.url} className="category-label">{category.title}</Link>}
                <div className="text-photo-by">
                    {bothBy ?
                        <p>tekst og foto av <strong>{bothBy}</strong></p> :
                        <TextPhotoBy/>
                    }
                </div>
                {toContent && <ToContent/>}
            </div>
        </div>
    )
};

export default ArticleLead;