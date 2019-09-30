import React from 'react';

import Post from 'components/Post';

const RelatedPosts = ({ posts, categories }) => {
    return (
        <section className="related-posts">
            <div className="wrapper">
                {posts.length ? <h3 className="section-title">Flere artikler du kanskje er interessert i</h3> : ''}
                <div className="grid-container">
                    {posts.map((post, i) => <Post key={i} categories={categories} post={post} size='s'/>)}
                </div>
            </div>
        </section>
    )
};

export default RelatedPosts;