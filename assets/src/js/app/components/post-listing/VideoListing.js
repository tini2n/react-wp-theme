import React, { Component } from 'react';

import Video from 'components/Video';

class VideoListing extends Component {
    render() {
        const { videos } = this.props;

        return (
            <section className="video-listing">
                <div className="wrapper">
                    <div className="grid-container">
                        {videos.map((video, i) => <div key={i} className="grid-2-6"><Video post={video} size="grid-small-tv"/></div>)}
                    </div>
                </div>
            </section>
        )
    }
}

export default VideoListing;