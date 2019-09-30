import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';

import { updateSearch } from 'storage/actions/search';
import { fetchPosts } from 'storage/actions/posts';
import { fetchSearchItemsIds } from 'storage/actions/main';

import { formPostsArray } from 'services/postsServices';

import ResultsList from 'components/ResultsList';
import CategoryFilter from 'components/CategoryFilter';
import DateFilter from 'components/DateFilter';
import LoadMore from 'components/LoadMore';
import CrossIcon from 'icons/cross-icon.svg';

class Search extends Component {
    constructor(props) {
        super(props);

        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.clearHandler = this.clearHandler.bind(this);

        this.filterContainer = React.createRef();

        this.state = {
            query: queryString.parse(location.search).s
        }
    }

    submitHandler(e) {
        e.preventDefault();
        const { history } = this.props;
        const { query } = this.state;

        const qr = queryString.parse(location.search);
        qr.s = query;

        history.push(`?${queryString.stringify(qr)}`);
    }

    changeHandler(e) {
        this.setState({ query: e.target.value })
    }

    clearHandler() {
        const { history } = this.props;

        this.setState({ query: '' });
        history.push(`?s=`);
    }

    componentDidMount() {
        this.filterContainer.style.height = document.querySelector('.category-filter').offsetHeight + document.querySelector('.date-filter').offsetHeight + 200 + 'px';
    }

    render() {
        const { query } = this.state;

        const {
            main,
            posts_by_ids,
            categories_by_ids,
            history
        } = this.props;

        const {
            fetchPosts,
            fetchSearchItemsIds
        } = this.props;

        const { items = [] } = main;

        const resultItems = formPostsArray(posts_by_ids, items);
        const postsIds = Object.keys(posts_by_ids);

        const {
            after,
            before,
            cat_name
        } = queryString.parse(location.search);

        const searchSettings = {
            offset: 8,
            amount: 8,
        };

        const loadMoreProps = {
            fetchIdsHandler: fetchSearchItemsIds,
            fetchPostsHandler: fetchPosts,
            isSearch: true,
            ...searchSettings,
            category: cat_name,
            after,
            before,
            postsIds
        };

        const searchLoadMoreRender = !(resultItems.length % searchSettings.amount) && <LoadMore {...loadMoreProps}/>;

        return (
            <section className="results-page">
                <div className="wrapper">
                    <div className="grid-container">
                        <div className="grid-4-6">
                            <div className="search-title">
                                <label htmlFor="results-search">Søkeresultater for:</label>
                                <form onSubmit={this.submitHandler}>
                                    <input type="search"
                                           id="results-search"
                                           value={query}
                                           onChange={this.changeHandler}/>
                                </form>
                                <span className="clear"
                                      onClick={this.clearHandler}>
                                    <CrossIcon/>
                                </span>
                            </div>
                            <ResultsList results={resultItems}
                                         categories={categories_by_ids}/>
                            {searchLoadMoreRender}
                        </div>
                        <div className="grid-2-6" ref={container => this.filterContainer = container}>
                            <CategoryFilter categories={categories_by_ids}
                                            history={history}/>
                            <DateFilter history={history}/>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = ({
    main,
    posts_by_ids,
    categories_by_ids
}) => ({
    main,
    posts_by_ids,
    categories_by_ids
});

const mapDispatchToProps = dispatch => ({
    updateSearch: search => dispatch(updateSearch(search)),
    fetchPosts: ids => dispatch(fetchPosts(ids)),
    fetchSearchItemsIds: (offset, amount) => dispatch(fetchSearchItemsIds(offset, amount))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));