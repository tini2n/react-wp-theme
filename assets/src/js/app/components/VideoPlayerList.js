import React, { Component } from 'react';
import VideoItem from 'components/VideoPlayerItem';

export default class VideoPlayerList extends Component {
    render() {
        const { videos, videoItemClickHandler, lastVideo, isLoading } = this.props;

        const renderVideos = videos.map(video =>
            <VideoItem key={video.id} video={video} size="xs" onClickHandler={videoItemClickHandler} isActive={lastVideo.id === video.id} />);

        return (
            <div className={`list grid-2-6 ${isLoading ? '' : ''}`}>
                {renderVideos}
            </div>
        )
    }
}