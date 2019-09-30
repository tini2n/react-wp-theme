import React from 'react'

import _get from 'lodash/get';

import Link from 'components/InternalLink';

const NextArticle = ({ post, categories }) => {
    const category = _get(post, 'main_category_id', false) ? categories[post.main_category_id] : undefined;

    return (
        <section className="next-article">
            <div className="wrapper-thin">
                <h3>NESTE ARTIKKEL</h3>
                <Link to={post.link}>
                    <h2>{post.title}</h2>
                {post.excerpt &&
                    <p>{post.excerpt}</p>}
                </Link>
                {category &&
                    <Link to={category.url} className="category-label">{category.title}</Link>}
            </div>
        </section>
    )
}

export default NextArticle;

