import React, { Component } from 'react';

import _get from 'lodash/get';

import Link from 'components/InternalLink'
import Thumbnail from 'components/Thumbnail';
import PlayIcon from 'icons/play-icon.svg'

class Post extends Component {
    getWrapperClass(size) {
        switch (size) {
            case 'l':
                return 'grid-4-6';
            case 'm':
                return 'grid-3-6';
            case 's':
                return 'grid-2-6';
            case 'xs':
                return 'list-item';
            default:
                return 'post-wrapper';
        }
    }

    render() {
        const { post, size, categories = {} } = this.props;
        const { meta, main_category_id = '' } = post;

        const category = categories ? categories[main_category_id] : '';

        return (
            <div className={this.getWrapperClass(size)}>
                <article className={`post-item ${meta ? meta.single : ''}`}>
                    <Link to={post.link} className="thumbnail-container">
                        {_get(meta, 'is_paid_content', false) && <span className="plus-label">pluss</span>}
                        {_get(meta, 'has_video', false) && <PlayIcon className="video-icon"/>}
                        <Thumbnail size={size} thumbnails={post.thumbnails}/>
                    </Link>
                    <div className="text-container">
                        <div className="category-wrapper">
                            {category && <h5 className="category-label"><Link to={category.url}>{category.title}</Link></h5>}
                            {(size === 'xs' && _get(meta, 'is_paid_content', false)) && <span className="plus-label">pluss</span>}
                        </div>
                        <Link to={post.link}>
                            {meta.subtitle && <h4 className="subtitle">{meta.subtitle}</h4>}
                            <h3 className="title">{post.title}</h3>
                            {post.excerpt && meta.show_excerpt_on_archives && <p className="excerpt">{post.excerpt}</p>}
                        </Link>
                    </div>
                </article>
            </div>
        )
    }

}

export default Post