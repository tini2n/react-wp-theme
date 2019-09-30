import React, { Component } from 'react';
import { connect } from 'react-redux';

import config from 'utils/config';

import { fetchPostsIdsByCat } from 'storage/actions/main';
import { fetchPosts } from 'storage/actions/posts';

import { formPostsArray } from 'services/postsServices';

import Ads from 'components/Ads';
import NotesList from 'components/NotesList';

class DailyNotes extends Component {
    constructor(props) {
        super(props);

        this.notesList = React.createRef();

        this.scrollHandler = this.scrollHandler.bind(this);
    }

    scrollHandler() {
        const listDom = this.notesList.list;

        listDom.scrollTop = listDom.scrollHeight;
    }

    render() {
        const {
            posts_by_ids,
            categories_by_ids,
            main
        } = this.props;

        const {
            fetchPostsIdsByCat,
            fetchPosts
        } = this.props;

        const {
            notes = [],
            ads = []
        } = main;

        const posts = posts_by_ids;
        const postsIds = Object.keys(posts);
        const categories = categories_by_ids;

        const loadMoreProps = {
            fetchIdsHandler: fetchPostsIdsByCat,
            fetchPostsHandler: fetchPosts,
            scrollHandler: this.scrollHandler,
            offset: 9,
            amount: 9,
            isCategory: true,
            postsType: 'note',
            slug: '',
            postsIds
        };

        return (
            <section className="daily-notes">
                <div className="wrapper">
                    <Ads ad={ads[0]}/>
                    <div className="grid-container">
                        <div className="grid-3-6 notes">
                            <NotesList notes={formPostsArray(posts, notes)}
                                       ref={list => this.notesList = list}
                                       categories={categories}
                                       loadMoreProps={loadMoreProps}
                                       isArchive={true}/>
                        </div>
                        <div className="grid-3-6 widget">
                            <h2 className="section-title">Travsporten i sosiale medier</h2>
                            <iframe frameBorder="0" src={config.widgets.superlocal}></iframe>
                        </div>
                    </div>
                    <Ads ad={ads[1]}/>
                </div>
            </section>
        )
    }
}

const mapStateToProps = ({ posts_by_ids, categories_by_ids, main }) => ({
    posts_by_ids,
    categories_by_ids,
    main
});

const mapDispatchToProps = dispatch => ({
    fetchPostsIdsByCat: (postsType, slug, amount, offset) => dispatch(fetchPostsIdsByCat(postsType, slug, amount, offset)),
    fetchPosts: (ids) => dispatch(fetchPosts(ids))
});

export default connect(mapStateToProps, mapDispatchToProps)(DailyNotes);