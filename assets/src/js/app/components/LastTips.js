import React, { Component } from 'react'

import PostsSlider from 'components/PostsSlider';
import Tip from 'components/Tip';

class LastTips extends Component {
    render() {
        const { tips, title } = this.props;

        return (
            <section className="last-tips">
                <div className="wrapper">
                    {tips &&
                        <PostsSlider posts={tips}
                                     title={title}
                                     linkText="vis mer tips og spill"
                                     PostItem={Tip} />
                    }
                </div>
            </section>
        )
    }
}

export default LastTips;