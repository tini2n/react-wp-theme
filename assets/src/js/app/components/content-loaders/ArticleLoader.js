import React from 'react';
import ContentLoader from 'react-content-loader';

import colors from 'constants/colors';

const ArticleLoader = props => {
    const settings = {
        height: 290,
        width: 800,
        speed: 1,
        primaryColor: colors.lightGray,
        secondaryColor: colors.semiLightGray
    };

    return (
        <ContentLoader {...settings} {...props}>
            <rect x="0" y="0" rx="4" ry="4" width="90%" height="14" />
            <rect x="0" y="32" rx="3" ry="3" width="45%" height="14" />
            <rect x="0" y="64" rx="3" ry="3" width="65%" height="14" />
            <rect x="0" y="96" rx="3" ry="3" width="75%" height="14" />
            <rect x="0" y="128" rx="3" ry="3" width="80%" height="14" />
            <rect x="0" y="160" rx="3" ry="3" width="35%" height="14" />
            <rect x="0" y="192" rx="3" ry="3" width="45%" height="14" />
            <rect x="0" y="224" rx="3" ry="3" width="15%" height="14" />
            <rect x="0" y="256" rx="3" ry="3" width="55%" height="14" />
        </ContentLoader>
    )
};

export default ArticleLoader;