import React from 'react';

import config from 'utils/config';

const HestemarkedWidget = () => (
    <section className="hestemarked-widget">
        <iframe src={config.widgets.horsemarket}></iframe>
    </section>
);

export default HestemarkedWidget;