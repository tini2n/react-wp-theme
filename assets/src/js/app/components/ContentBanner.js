import React, { Component } from 'react';

import TrackVisibility from 'react-on-screen';

import Thumbnail from 'components/Thumbnail'
import UniversalLink from 'components/UniversalLink';

class Ad extends Component {
    handleClick(id) {
        const { dataLayer } = window;

        dataLayer.push({
            event: 'AdBannerClick',
            Ad_banner: `site_banner_${id}`
        })
    }

    render() {
        const { dataLayer } = window;

        const {
            banner,
            isVisible
        } = this.props;

        const {
            id,
            url,
            image
        } = banner;

        if (isVisible) {
            dataLayer.push({
                event: 'AdBannerView',
                Ad_banner: `site_banner_${id}`
            })
        }

        return (
            <div className="post-element-banner" data-id={id} onClick={() => this.handleClick(id)}>
                <UniversalLink to={url} target="_blank">
                    <Thumbnail size="half-ad" thumbnails={image}/>
                </UniversalLink>
            </div>
        )
    }
}

const ContentBanner = ({ banner }) => (
    <TrackVisibility once>
        <Ad banner={banner}/>
    </TrackVisibility>
);

export default ContentBanner