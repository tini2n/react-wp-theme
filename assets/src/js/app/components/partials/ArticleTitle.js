import React from 'react';

import ToContent from 'components/partials/ToContent';
import PlusLabel from 'components/partials/PlusLabel';

const ArticleTitle = ({
    toContent,
    title,
    subtitle,
    isPaid
}) => {

    return (
        <div className={`article-title ${!subtitle ? 'w-sub' : ''}`}>
            <div className="wrapper">
                {isPaid && <PlusLabel withLogo/>}
                {subtitle && <div className="subtitle-label">{subtitle}</div>}
                <h1>{title}</h1>
                {toContent && <ToContent/>}
            </div>
        </div>
    )
};

export default ArticleTitle;