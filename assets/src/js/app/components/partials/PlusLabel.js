import React from 'react';

import MiniLogo from 'images/icons/mini-logo-icon.svg';

const PlusLabel = ({ withLogo }) => (
    <div className="plus-label">
        {withLogo &&
            <div className="icon">
                <MiniLogo/>
            </div>
        }
        <span>pluss</span>
    </div>
);

export default PlusLabel;