import React from 'react';

import Link from 'components/InternalLink';
import ArrowIcon from 'icons/arrow-icon.svg';

const TemplateTitle = ({ title }) => (
    <div className="template-title">
        <h1>{title}</h1>
        <Link to="/">{<ArrowIcon/>}tilbake til forsiden</Link>
    </div>
);

export default TemplateTitle;