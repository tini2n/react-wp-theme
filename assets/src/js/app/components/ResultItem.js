import React from 'react';

import _get from 'lodash/get';

import { toHumanShortDate, toISO } from 'services/dateServices';

import Link from 'components/InternalLink';

const SearchResult = ({ item, category }) => {
    const {
        meta,
        title,
        link,
        publish_date,
        update_date
    } = item;

    return (
        <div className="result-item">
            {category &&
                <div className="category-line">
                    <h4 className="category-label"><Link to={category.url}>{category.title}</Link></h4>
                    {_get(meta, 'is_paid_content', false) && <span className="plus-label">pluss</span>}
                </div>
            }
            {_get(meta, 'subtitle', false) && <h3 className="subtitle"><Link to={link}>{meta.subtitle}</Link></h3>}
            <h2 className="title"><Link to={link}>{title}</Link></h2>
            {publish_date &&
                <div className="dateline">
                    <time className="published" dateTime={toISO(publish_date)}>{toHumanShortDate(publish_date)}</time>
                    {((update_date != publish_date) && update_date) && <time className="updated" dateTime={toISO(update_date)}>Oppdatert: {toHumanShortDate(update_date)}</time>}
                </div>
            }
        </div>
    )
};

export default SearchResult;