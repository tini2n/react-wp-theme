import React, { Component, Fragment } from 'react';

import TrackVisibility from 'react-on-screen';
import { isMobile } from 'react-device-detect';

import UniversalLink from 'components/UniversalLink';
import Thumbnail from 'components/Thumbnail';

const Ad = ({ isVisible, ad, size, isMobile, handleClick }) => {
    const { dataLayer } = window;
    const imgSize = size === 'wide' ? `wide-ad${isMobile ? '-mob' : ''}` : 'tall-ad';

    const attrs = {
        class: isMobile ? 'ad-mobile' : 'ad-desktop',
        imgSize
    };

    if (isVisible) {
        dataLayer.push({
            event: 'AdBannerView',
            Ad_banner: `site_banner_${ad.id}`
        })
    }

    return (
        <Fragment>
            <div className={attrs.class} onClick={() => handleClick(ad.id)}>
                <UniversalLink to={ad.url} target="_blank">
                    <Thumbnail size={attrs.imgSize} thumbnails={ad.image}/>
                </UniversalLink>
            </div>
        </Fragment>
    )
};

class Ads extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(id) {
        const { dataLayer } = window;

        dataLayer.push({
            event: 'AdBannerClick',
            Ad_banner: `site_banner_${id}`
        })
    }

    render() {
        const {
            ad = {},
            size,
        } = this.props;

        return (
            <section className="ads-container">
                {ad.desk && !Array.isArray(ad.desk) && !isMobile &&
                    <TrackVisibility once>
                        <Ad ad={ad.desk} size={size} isMobile={false} handleClick={this.handleClick}/>
                    </TrackVisibility>
                }
                {ad.desk && !Array.isArray(ad.desk) && isMobile &&
                    <TrackVisibility once>
                        <Ad ad={ad.mob} size={size} isMobile={true} handleClick={this.handleClick}/>
                    </TrackVisibility>
                }
            </section>
        )
    }
}

export default Ads;