import React from 'react';

import { toHumanFullDate, toISO } from 'services/dateServices';

import Thumbnail from 'components/Thumbnail';
import PlayIcon from 'icons/play-icon.svg'
import LogoIcon from 'icons/mini-logo-icon.svg';

const VideoPlayerItem = ({ video, onClickHandler, isActive }) => {
    const {
        thumbnails,
        publish_date,
        title,
        excerpt,
    } = video;

    return(
        <article className={`video-item ${isActive ? 'active' : ''}`} onClick={() => onClickHandler(video)}>
            <div className="container">
                {thumbnails ?
                    <div className="thumbnail-container">
                        <Thumbnail size="xs" thumbnails={thumbnails}/>
                        <PlayIcon/>
                    </div>
                    :
                    <div className="thumbnail-container">
                        <LogoIcon className="placeholder-icon"/>
                    </div>
                }
                <div className="text-container">
                    <time dateTime={toISO(publish_date)}>{toHumanFullDate(publish_date)}</time>
                    {title && (<h3 className="title">{title}</h3>)}
                    {excerpt && (<p className="excerpt">{excerpt}</p>)}
                </div>
            </div>
        </article>
    )
};

export default VideoPlayerItem