import React from 'react';

import ResultItem from 'components/ResultItem';

const ResultsList = ({ results, categories }) => (
    <div className="results-list">
        {results.map((item, i) => <ResultItem key={i} item={item} category={categories[item.main_category_id]} />)}
    </div>
);

export default ResultsList