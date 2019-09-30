import React, { Component } from 'react';

import queryString from 'query-string';
import _remove from 'lodash/remove';

import CheckboxItem from 'components/CheckboxItem';

class CategoryFilter extends Component {
    constructor(props) {
        super(props);

        this.filterHandler = this.filterHandler.bind(this);

        this.state = {
            query: queryString.parse(location.search)
        }
    }

    filterHandler(event) {
        const { history } = this.props;

        const query = queryString.parse(location.search);
        const checked = event.target.checked;

        const queryCats = query.cat_name ? query.cat_name.split(',') : [];

        if (event.target.name === 'tv') {
            query.post_type = checked ? event.target.name : '';
        } else {
            if (checked) {
                queryCats.push(event.target.name)
            } else {
                _remove(queryCats, el => el === event.target.name)
            }

            query.cat_name = queryCats.join(',');
        }

        if (!query.cat_name)
            delete query.cat_name;

        if (!query.post_type)
            delete query.post_type;

        history.push(`?${queryString.stringify(query)}`);
    }

    render() {
        const { categories = [] } = this.props;

        const {
            cat_name = '',
            post_type = ''
        } = queryString.parse(location.search);

        const catIDs = Object.keys(categories);
        const queryCats = cat_name.split(',');

        return (
            <div className="category-filter">
                <span className="title">Filter på kategori</span>
                {catIDs.map(id => {
                    const checked = queryCats.includes(categories[id].slug);

                    return <CheckboxItem key={id} checked={checked} handler={this.filterHandler} item={categories[id]} />
                })}
                <CheckboxItem checked={post_type === 'tv'} handler={this.filterHandler} item={{ title: 'tgn tv', name: 'tv' }}/>
            </div>
        )
    }
}

export default CategoryFilter