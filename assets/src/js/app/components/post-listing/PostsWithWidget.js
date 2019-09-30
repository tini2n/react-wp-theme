import React from 'react';

import Link from 'components/UniversalLink';
import Post from 'components/Post';

import config from 'utils/config';

const PostsWithWidget = ({ posts, title, categories, btnLink, btnTitle }) => (
    <section className="posts-with-widget">
        <div className="grid-container">
            <div className="grid-3-6">
                {posts.map((post, i) => <Post key={i} post={posts[i]} categories={categories} size="m"/>)}
            </div>
            <div className="grid-3-6">
                <h2 className="section-title">{title}</h2>
                <iframe frameBorder="0" src={config.widgets.superlocal}></iframe>
                <Link to={btnLink} target="_blank" className="button">{btnTitle}</Link>
            </div>
        </div>
    </section>
)

export default PostsWithWidget;