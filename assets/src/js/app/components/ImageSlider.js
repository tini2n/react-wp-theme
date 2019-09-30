import React, { Component } from 'react';
import Slider from 'react-slick';

import Thumbnail from 'components/Thumbnail';
import ArrowIcon from 'icons/arrow-icon.svg';
import CrossIcon from 'icons/cross-icon.svg';
import FullwidthIcon from'icons/fullwidth-icon.svg';

const NavArrow = ({ currentSlide, slideCount, children, ...props }) => ( // eslint-disable-line
    <div {...props}>{children}</div>
);

class ImageSlider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lightboxOpen: false,
            lightboxSlide: 0
        };

        this.slider = React.createRef();
        this.lightbox = React.createRef();
    }

    render() {
        const { images } = this.props;
        const {
            lightboxOpen,
            lightboxSlide
        } = this.state;
        const {
            slider
        } = this;

        const sliderSettings = {
            centerMode: false,
            dots: true,
            fade: true,
            beforeChange: (o, n) => {
                const timer = setTimeout(() => {
                    this.setState({ lightboxSlide: n });
                    clearTimeout(timer);
                }, 10)
            },
            prevArrow: (
                <NavArrow>
                    <ArrowIcon/>
                </NavArrow>
            ),
            nextArrow: (
                <NavArrow>
                    <ArrowIcon/>
                </NavArrow>
            ),
        };

        const lightboxSettings = {
            centerMode: false,
            fade: true,
            initialSlide: lightboxSlide,
            beforeChange: (o, n) => {
                slider.current.slickGoTo(n)
            },
            prevArrow: (
                <NavArrow>
                    <ArrowIcon/>
                </NavArrow>
            ),
            nextArrow: (
                <NavArrow>
                    <ArrowIcon/>
                </NavArrow>
            ),
        };

        lightboxOpen ? document.body.classList.add('no-scroll') : document.body.classList.remove('no-scroll');

        return(
            <div className="image-slider">
                <Slider {...sliderSettings} ref={this.slider}>
                    {images.map(image => (
                        <div className="slide-item" key={image.id}>
                            <div className="thumbnail-container">
                                <Thumbnail size="article-thumb" thumbnails={image}/>
                            </div>
                            {image.caption && <div className="caption">{image.caption}</div>}
                        </div>
                    ))}
                </Slider>
                <button className="lightbox-toggler" onClick={() => this.setState({ lightboxOpen: true })}>
                    <FullwidthIcon/>
                </button>
                {lightboxOpen &&
                    <Slider {...lightboxSettings} className={`lightbox open`} ref={this.lightbox}>
                        {images.map(image => (
                            <div className="lightbox-item" key={image.id}>
                                <div className="thumbnail-container">
                                    <Thumbnail thumbnails={image}/>
                                </div>
                                {image.caption && <div className="caption">{image.caption}</div>}
                            </div>
                        ))}
                    </Slider>
                }
                <button className="lightbox-close" onClick={() => this.setState({ lightboxOpen: false })}>
                    <CrossIcon/>
                </button>
            </div>
        )
    }
}

export default ImageSlider;