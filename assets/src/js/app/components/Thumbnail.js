import React, { Component } from 'react';

import LogoIcon from 'icons/mini-logo-icon-grey.svg';

const thumbAttrs = ({
    thumbnails,
    size
}) => {
    let props;

    switch (size) {
        case 'l':
            props = thumbnails.sizes['grid-big'];
            break;
        case 'm':
            props = thumbnails.sizes['grid-half'];
            break;
        case 'wide-ad':
            props = thumbnails.sizes['wide-ad'];
            break;
        case 'tall-ad':
            props = thumbnails.sizes['tall-ad'];
            break;
        case 'wide-ad-mob':
            props = thumbnails.sizes['wide-ad-mob'];
            break;
        case 'half-ad':
            props = thumbnails.sizes['half-ad'];
            break;
        case 's':
            props = thumbnails.sizes['grid-small'];
            break;
        case 'xs':
            props = thumbnails.sizes['tiny'];
            break;
        case 'article-thumb':
            props = thumbnails.sizes['content-wrap'];
            break;
        case 'article-vert':
            props = thumbnails.sizes['vertical'];
            break;
        case 'grid-small-tv':
            props = thumbnails.sizes['grid-small-tv'];
            break;
        default:
            props = thumbnails.sizes['original'];
            break;
    }

    if (!props)
        props = thumbnails.sizes['original'];

    return {
        width: props.width,
        height: props.height,
        src: props.url,
        srcSet: props.srcset,
        sizes: props.sizes,
        key: thumbnails.id,
        alt: thumbnails.alt
    };
};

class Thumbnail extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { thumbnails, size } = this.props;
        const attrs = thumbnails ? thumbAttrs({ thumbnails, size }) : undefined;

        return (thumbnails ? <img {...attrs} /> : <LogoIcon className="placeholder-icon"/>)
    }
}

export default Thumbnail;