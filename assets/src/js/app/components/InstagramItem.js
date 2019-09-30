import React, { Component } from 'react';

import UniversalLink from 'components/UniversalLink';

import PlayIcon from 'icons/play-icon.svg'

class InstagramItem extends Component {
    constructor(props) {
        super(props);

        this.instagram = React.createRef();
        this.caption = React.createRef();
    }

    componentDidMount() {
        if (this.caption.clientHeight > 65) {
            this.instagram.classList.add('is-read-more');
        }
    }

    render() {
        const {
            caption,
            images,
            type,
            link
        } = this.props.post;

        return (
            <article className="instagram-item" ref={instagram => this.instagram = instagram}>
                {images &&
                    <UniversalLink target="_blank" to={link} className="thumbnail-container">
                        <img src={images.low_resolution.url} alt={caption && caption.text}/>
                        {type === 'video' && <PlayIcon className="play-icon"/>}
                    </UniversalLink>
                }
                {caption &&
                    <div className="text-container">
                        <p ref={caption => this.caption = caption}>{caption.text}</p>
                    </div>
                }
                {<span className="read-more" onClick={() => this.instagram.classList.remove('is-read-more')}>les mer</span>}
            </article>
        )
    }
}

export default InstagramItem