import React from 'react';

import config, { profile, isInApp } from 'utils/config';

import UniversalLink from 'components/UniversalLink';

const LogIn = () => {
    const authLink = profile.connectIdAuth.replace('%23%23', encodeURIComponent(location.href));
    const subscriptionUrl = config.routes.subscription;

    return (
        <div className="log-in">
            {!isInApp &&
                <UniversalLink to={subscriptionUrl} className="item cta">Bli abonnent</UniversalLink>
            }
            {profile.isLogged ?
                <a href={authLink} className="item">Logg ut</a> :
                <UniversalLink to={authLink} className="item">Logg inn</UniversalLink>
            }
        </div>
    )
};

export default LogIn;