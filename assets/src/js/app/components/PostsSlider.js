import React, { Component } from 'react';
import Slider from 'react-slick';

import config from 'utils/config'

import UniversalLink from 'components/UniversalLink';

class PostsSlider extends Component {
    constructor(props) {
        super(props);

        this.unCollapseNotes = this.unCollapseNotes.bind(this);

        this.slider = React.createRef();
    }

    unCollapseNotes() {
        const list = this.slider.innerSlider.list;
        const nodesList = list.querySelectorAll('article');
        const listArray = Array.from(nodesList);

        listArray.map(item => {
            if (!item.classList.contains('is-read-more')) {
                item.classList.add('is-read-more')
            }
        })
    }

    render() {
        const {
            posts,
            categories,
            title,
            PostItem,
            archiveLink,
            isOpenBlank,
            linkText,
            count = 3,
        } = this.props;

        const settings = {
            arrows: false,
            infinite: false,
            className: 'slide-item',
            dots: true,
            dotsClass: 'slider-nav',
            useTransform: false,
            slidesToShow: count,
            slidesToScroll: count,
            afterChange: () => {
                if (archiveLink === config.routes.notice_archive || title === 'instagram')
                    this.unCollapseNotes()
            },
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        return (
            <section className="posts-slider">
                <h2 className="section-title">{title}</h2>
                <Slider {...settings} ref={slider => this.slider = slider}>
                    {posts.map((post, i) => <PostItem key={i} post={post} categories={categories}/>)}
                </Slider>
                {archiveLink && <UniversalLink to={archiveLink} target={`${isOpenBlank ? '_blank' : ''}`} className="button">{linkText}</UniversalLink>}
            </section>
        )
    }
}

export default PostsSlider;