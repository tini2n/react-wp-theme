import React from 'react';

import Post from 'components/Post';
import PostList from 'components/post-listing/PostsList';

const PostWithList = ({ posts, categories }) => (
    <section className="post-with-list">
        <div className="grid-container">
            {posts[0] && <Post post={posts[0]} categories={categories} size="m"/>}
            <PostList posts={posts.filter((post, i) => (i > 0) && post)} categories={categories}/>
        </div>
    </section>
);

export default PostWithList;