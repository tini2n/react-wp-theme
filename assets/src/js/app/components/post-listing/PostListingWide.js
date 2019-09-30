import React from 'react'

import Post from 'components/Post';

const PostListingWide = ({ posts, categories, reversed }) => {

    return <section className="post-listing-wide">
        <div className="grid-container">
            {!reversed && posts[0] && <Post post={posts[0]} categories={categories} size="l"/>}
            <div className="grid-2-6">
                {posts[!reversed ? 1 : 0] && <Post post={posts[!reversed ? 1 : 0]} categories={categories} size="s"/>}
                {posts[!reversed ? 2 : 1] && <Post post={posts[!reversed ? 2 : 1]} categories={categories} size="s"/>}
            </div>
            {reversed && posts[2] && <Post post={posts[2]} categories={categories} size="l"/>}
        </div>
    </section>
};

export default PostListingWide