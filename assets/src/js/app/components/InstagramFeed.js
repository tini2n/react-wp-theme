import React, { Component } from 'react'

import PostsSlider from 'components/PostsSlider';
import InstagramItem from 'components/InstagramItem';

class InstagramFeed extends Component {
    render() {
        const { feed } = this.props;

        const archiveLink = feed.length > 0 ? 'https://www.instagram.com/' + feed[0].user.username : '';

        return (
            <section className="instagram-feed">
                <div className="wrapper">
                    <PostsSlider posts={feed}
                                 count={5}
                                 title={'instagram'}
                                 linkText="instagram"
                                 archiveLink={archiveLink}
                                 isOpenBlank={true}
                                 PostItem={InstagramItem} />
                </div>
            </section>
        )
    }
}

export default InstagramFeed

