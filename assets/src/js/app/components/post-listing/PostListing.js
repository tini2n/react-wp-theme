import React, { Component } from 'react'

import Post from 'components/Post';

class PostListing extends Component {
    render() {
        const { posts, size, categories } = this.props;

        return (
            <section className="post-listing">
                <div className="grid-container">
                    {posts.map(post => <Post key={post.id} post={post} categories={categories} size={size}/>)}
                </div>
            </section>
        )
    }
}

export default PostListing;