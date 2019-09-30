import React from 'react';

import Post from 'components/Post';

const PostsList = ({ posts, categories }) => (
    <div className="posts-list">
        {posts.map((post, i) => <Post key={i} post={post} categories={categories} size="xs"/>)}
    </div>
)

export default PostsList;