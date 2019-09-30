import React from 'react'

import PostsSlider from 'components/PostsSlider';
import Video from 'components/Video';

const LastVideos = ({ videos, title, linkToTV }) => {
    return (
        <section className="last-videos">
            <div className="wrapper">
                <PostsSlider posts={videos}
                             title={title}
                             linkText="vis mer fra tgn tv"
                             archiveLink={linkToTV}
                             PostItem={Video}/>
            </div>
        </section>
    )
};

export default LastVideos;