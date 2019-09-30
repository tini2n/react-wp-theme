import React, { Component } from 'react';
import Vimeo from '@u-wave/react-vimeo';

import { isMobile } from 'react-device-detect';
import { animateScroll as scroll } from 'react-scroll'

import { toHumanFullDate, toISO } from 'services/dateServices';

import TemplateTitle from 'components/partials/TemplateTitle';
import VideoPlayerList from 'components/VideoPlayerList';

export default class VideoPlayer extends Component {
    constructor(props) {
        super(props);

        const { videos } = this.props;
        const lastVideo = videos.length ? videos[0] : {};

        this.videoItemClickHandler = this.videoItemClickHandler.bind(this);
        this.onReady = this.onReady.bind(this);

        this.state = {
            lastVideo,
            isLoading: true
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.videos !== this.props.videos) {
            this.setState({ lastVideo: this.props.videos[0] })
        }
    }

    videoItemClickHandler(video) {
        this.setState({ isLoading: !!video.meta.vimeo_video_link, lastVideo: video });

        if (isMobile) {
            scroll.scrollToTop({ duration: 400 });
        }
    }

    onReady() {
        this.setState({ isLoading: false });
    }

    render() {
        const { videos } = this.props;
        const { lastVideo, isLoading } = this.state;

        const {
            meta = {},
            title,
            publish_date,
            excerpt
        } = lastVideo;

        return (
            <section className="video-player">
                <div className="wrapper">
                    <TemplateTitle title="TGN TV"/>
                    <div className="grid-container">
                        <div className="player grid-4-6">
                            {lastVideo && meta.vimeo_video_link &&
                                <Vimeo video={meta.vimeo_video_link}/>
                            }
                            <div className="text-container">
                                <time dateTime={toISO(publish_date)}>{toHumanFullDate(publish_date)}</time>
                                <h2 className="title">{title}</h2>
                                <p className="excerpt">{excerpt}</p>
                            </div>
                        </div>
                        <h2 className="list-title">SISTE FRA TGN TV</h2>
                        <VideoPlayerList videos={videos}
                                         lastVideo={lastVideo}
                                         isLoading={isLoading}
                                         videoItemClickHandler={this.videoItemClickHandler} />
                    </div>
                </div>
            </section>
        )
    }
}