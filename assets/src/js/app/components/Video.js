import React from 'react';

import { toHumanFullDate, toISO } from 'services/dateServices';

import Link from 'components/InternalLink'
import Thumbnail from 'components/Thumbnail';
import PlayIcon from 'icons/play-icon.svg'

const Video = ({ post, size }) => {
    const {
        publish_date,
        thumbnails,
        link,
        title,
        excerpt,
    } = post;

    return (
        <article className="video-item">
            <div className="container">
                <Link className="thumbnail-container" to={link}>
                    <Thumbnail size={size} thumbnails={thumbnails} />
                    <PlayIcon/>
                </Link>
                <div className="text-container">
                        <time dateTime={toISO(publish_date)}>{toHumanFullDate(publish_date)}</time>
                    <Link to={link}>
                        <h3 className="title">{title}</h3>
                        {excerpt && (<p className="excerpt">{excerpt}</p>)}
                    </Link>
                </div>
            </div>
        </article>
    )
};

export default Video;