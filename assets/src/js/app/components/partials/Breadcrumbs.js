import React from 'react';

import Link from 'components/InternalLink';

const Breadcrumbs = ({
    parentId,
    parentPage,
    currentPage
}) => {

    return (
        <nav className="breadcrumbs">
            <Link to="/" >forsiden</Link>
            {parentId ? <Link to={parentPage.link}>{parentPage.title}</Link> : ''}
            <span>{currentPage.title}</span>
        </nav>
    )
};

export default Breadcrumbs;