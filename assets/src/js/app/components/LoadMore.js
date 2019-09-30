import React, { Component } from 'react';

import { getMissingArrayElements } from 'services/postsServices';

import DotsLoader from 'components/partials/DotsLoader';

class LoadMore extends Component {
    constructor(props) {
        super(props);

        this.loadMoreHandler = this.loadMoreHandler.bind(this);

        this.state = {
            isLoading: false,
            offset: this.props.offset,
            available: true
        }
    }

    async loadMoreHandler() {
        const {
            fetchIdsHandler,
            fetchPostsHandler,
            postsIds,
            postsType,
            slug,
            offset,
            amount,
            category,
            after,
            before,
            isCategory,
            isSearch
        } = this.props;

        this.setState({ isLoading: true });

        let newIds;

        if (isCategory) {
            newIds = await fetchIdsHandler(postsType, slug, amount, this.state.offset);
        } else if (isSearch) {
            newIds = await fetchIdsHandler(amount, this.state.offset, category, after, before);
        } else {
            newIds = await fetchIdsHandler(this.state.offset);
        }

        if (!newIds) {
            this.setState({ available: false });
        } else {
            const missingPostsIds = getMissingArrayElements(newIds, postsIds);
            await fetchPostsHandler(missingPostsIds);
        }

        if (this.props.scrollHandler) {
            this.props.scrollHandler();
        }

        this.setState({ isLoading: false });
        this.setState({ offset: this.state.offset + offset })
    }

    render() {
        const {
            isLoading,
            available
        } = this.state;

        return(
            <div className={`load-more ${isLoading ? 'loading' : ''} ${available ? '' : 'disabled'}`}>
                <button onClick={this.loadMoreHandler}>
                    {isLoading ? <DotsLoader/> : 'last mer'}
                </button>
            </div>
        )
    }
}

export default LoadMore